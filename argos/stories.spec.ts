/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { argosScreenshot } from '@argos-ci/playwright';
import { test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

type StoryIndex = {
  entries: Record<
    string,
    { id: string; title: string; name: string; type: string }
  >;
};

const indexPath = fileURLToPath(
  new URL(
    '../2nd-gen/packages/swc/storybook-static/index.json',
    import.meta.url
  )
);
const index: StoryIndex = JSON.parse(readFileSync(indexPath, 'utf-8'));

const only = process.env.ARGOS_ONLY?.split(',').map((s) => s.trim());

const stories = Object.values(index.entries).filter(
  (entry) => entry.type === 'story' && (!only || only.includes(entry.id))
);

// Loading indicators legitimately keep `aria-busy='true'` for as long as they
// are on screen, so waiting for it to clear would never resolve. Keep the
// wait everywhere else, where it catches genuinely unfinished renders.
const LOADER_PATTERN = /load(ing|er)|skeleton|spinner|progress|busy/i;

for (const story of stories) {
  const isLoader =
    LOADER_PATTERN.test(story.title) || LOADER_PATTERN.test(story.name);

  test(`${story.title} › ${story.name}`, async ({ page }) => {
    await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);

    // Wait for Storybook's own render cycle. Storybook 8+ exposes the
    // active renders on `__STORYBOOK_PREVIEW__.storyRenders`; match the
    // one for this story (fall back to the latest). Some stories render
    // in a portal and leave #storybook-root empty, so don't wait on the
    // root itself.
    await page.waitForFunction((id) => {
      const renders =
        (
          window as unknown as {
            __STORYBOOK_PREVIEW__?: {
              storyRenders?: Array<{ id?: string; phase?: string }>;
            };
          }
        ).__STORYBOOK_PREVIEW__?.storyRenders ?? [];
      const render = renders.find((r) => r.id === id) ?? renders.at(-1);
      return render?.phase === 'completed' || render?.phase === 'finished';
    }, story.id);

    // Respect the repo's own `chromatic: { disableSnapshot: true }` story
    // parameters, so a story opted out of Chromatic stays opted out here.
    const disableSnapshot = await page.evaluate((id) => {
      const renders =
        (
          window as unknown as {
            __STORYBOOK_PREVIEW__?: {
              storyRenders?: Array<{
                id?: string;
                story?: {
                  parameters?: {
                    chromatic?: { disableSnapshot?: boolean };
                  };
                };
              }>;
            };
          }
        ).__STORYBOOK_PREVIEW__?.storyRenders ?? [];
      const render = renders.find((r) => r.id === id) ?? renders.at(-1);
      return render?.story?.parameters?.chromatic?.disableSnapshot === true;
    }, story.id);
    test.skip(
      disableSnapshot,
      'story opts out of snapshots (chromatic parameter)'
    );

    // Web components render inside shadow roots, which `querySelectorAll`
    // does not reach — walk the whole tree, shadow roots included, to:
    // - pin SVG SMIL animations (`<animateTransform>`), which run on the
    //   SVG animation clock rather than CSS, so neither reduced motion nor
    //   CSS-level stabilizations stop them;
    // - pin scroll positions, which may settle on a non-deterministic
    //   offset in scrolling lists.
    await page.evaluate(() => {
      const visit = (root: Document | ShadowRoot | Element) => {
        for (const el of root.querySelectorAll('*')) {
          if (el instanceof SVGSVGElement) {
            if (typeof el.pauseAnimations === 'function') {
              el.setCurrentTime(0);
              el.pauseAnimations();
            }
          }
          if (el.scrollLeft !== 0) {
            el.scrollLeft = 0;
          }
          if (el.scrollTop !== 0) {
            el.scrollTop = 0;
          }
          if (el.shadowRoot) {
            visit(el.shadowRoot);
          }
        }
      };
      visit(document);
    });

    await argosScreenshot(page, story.id, {
      stabilize: { waitForAriaBusy: !isLoader },
    });
  });
}
