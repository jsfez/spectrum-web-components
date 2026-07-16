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

import { html } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import {
  INFIELD_BUTTON_VALID_SIZES,
  type InfieldButtonSize,
} from '@spectrum-web-components/core/components/infield-button';

import '@adobe/spectrum-wc/components/infield-button/swc-infield-button.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-infield-button');

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: INFIELD_BUTTON_VALID_SIZES,
};

// ────────────────────
//    HELPERS
// ────────────────────

const sizeLabels = {
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'Extra-large',
} as const satisfies Record<InfieldButtonSize, string>;

// Chevron disclosure icon — the canonical Figma reference icon for infield buttons
const chevronIconSvg = `<svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" aria-hidden="true" focusable="false"><path d="M5 7.376 1.281 3.656l.875-.875L5 5.625l2.844-2.844.875.875Z"/></svg>`;

// Add/Dash icons for stepper demonstration
const addIconSvg = `<svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" aria-hidden="true" focusable="false"><path d="M16 16V4.5a2 2 0 0 1 4 0V16h11.5a2 2 0 0 1 0 4H20v11.5a2 2 0 0 1-4 0V20H4.5a2 2 0 0 1 0-4Z"/></svg>`;
const removeIconSvg = `<svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" aria-hidden="true" focusable="false"><rect x="4" y="16" width="28" height="4" rx="2"/></svg>`;

// Cross (clear) icon
const crossIconSvg = `<svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" aria-hidden="true" focusable="false"><path d="M20.5 18l8.2-8.2a1.8 1.8 0 1 0-2.5-2.5L18 15.5 9.8 7.3a1.8 1.8 0 0 0-2.5 2.5L15.5 18l-8.2 8.2a1.8 1.8 0 1 0 2.5 2.5L18 20.5l8.2 8.2a1.8 1.8 0 1 0 2.5-2.5Z"/></svg>`;

/**
 * A compact icon button embedded inside a form field. Infield buttons are clickable via
 * pointer only; keyboard behavior and the visible focus ring are owned by the parent field.
 * Common affordances include disclosure (picker/combobox), clear (search/text field), and
 * increment/decrement (number field stepper pair).
 */
const meta: Meta = {
  title: 'Infield Button',
  component: 'swc-infield-button',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: 'Icon button embedded inside a form field',
    },
    // TODO: add Figma and Stackblitz links
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  args: {
    'accessible-label': 'Open picker',
    'icon-slot': chevronIconSvg,
    size: 'm',
  },
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

// Overview: picker context — the most common infield button affordance
export const Overview: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 4px; align-items: flex-start;">
      <label for="overview-picker" style="font-family: inherit; font-size: var(--swc-font-size-100, 14px);">Color</label>
      <div style="display: inline-flex; align-items: stretch; border: 1px solid var(--swc-gray-300, #bbb); border-radius: var(--swc-corner-radius-100, 4px); overflow: hidden; background-color: var(--swc-gray-100, #fff);">
        <input
          id="overview-picker"
          type="text"
          readonly
          value="Ultramarine"
          style="border: none; outline: none; background: transparent; padding-inline: 8px; font-size: var(--swc-font-size-100, 14px); font-family: inherit; min-inline-size: 120px;"
        />
        ${template({ ...args, 'accessible-label': 'Open color picker', 'icon-slot': chevronIconSvg })}
      </div>
    </div>
  `,
  args: { size: 'm' },
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

// Anatomy: the three canonical affordances, each shown in field context
export const Anatomy: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
      <div style="display: flex; flex-direction: column; gap: 4px; align-items: flex-start;">
        <label for="anatomy-picker" style="font-family: inherit; font-size: var(--swc-font-size-100, 14px);">Category</label>
        <div style="display: inline-flex; align-items: stretch; border: 1px solid var(--swc-gray-300, #bbb); border-radius: var(--swc-corner-radius-100, 4px); overflow: hidden; background-color: var(--swc-gray-100, #fff);">
          <input
            id="anatomy-picker"
            type="text"
            readonly
            value="Option A"
            style="border: none; outline: none; background: transparent; padding-inline: 8px; font-size: var(--swc-font-size-100, 14px); font-family: inherit; min-inline-size: 120px;"
          />
          ${template({ ...args, 'accessible-label': 'Open category picker', 'icon-slot': chevronIconSvg })}
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 4px; align-items: flex-start;">
        <label for="anatomy-search" style="font-family: inherit; font-size: var(--swc-font-size-100, 14px);">Search</label>
        <div style="display: inline-flex; align-items: stretch; border: 1px solid var(--swc-gray-300, #bbb); border-radius: var(--swc-corner-radius-100, 4px); overflow: hidden; background-color: var(--swc-gray-100, #fff);">
          <input
            id="anatomy-search"
            type="search"
            value="Query text"
            style="border: none; outline: none; background: transparent; padding-inline: 8px; font-size: var(--swc-font-size-100, 14px); font-family: inherit; min-inline-size: 120px;"
          />
          ${template({ ...args, 'accessible-label': 'Clear search', 'icon-slot': crossIconSvg })}
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 4px; align-items: flex-start;">
        <label for="anatomy-qty" style="font-family: inherit; font-size: var(--swc-font-size-100, 14px);">Quantity</label>
        <div style="display: inline-flex; align-items: stretch; border: 1px solid var(--swc-gray-300, #bbb); border-radius: var(--swc-corner-radius-100, 4px); overflow: hidden; background-color: var(--swc-gray-100, #fff);">
          ${template({ ...args, 'accessible-label': 'Decrease quantity', 'icon-slot': removeIconSvg })}
          <input
            id="anatomy-qty"
            type="number"
            value="1"
            min="0"
            max="100"
            style="border: none; outline: none; background: transparent; padding-inline: 8px; font-size: var(--swc-font-size-100, 14px); font-family: inherit; text-align: center; min-inline-size: 60px;"
          />
          ${template({ ...args, 'accessible-label': 'Increase quantity', 'icon-slot': addIconSvg })}
        </div>
      </div>
    </div>
  `,
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: (args) => html`
    ${INFIELD_BUTTON_VALID_SIZES.map(
      (size) => html`
        <div style="display: flex; flex-direction: column; gap: 4px; align-items: flex-start;">
          <label for="size-${size}" style="font-family: inherit; font-size: var(--swc-font-size-100, 14px);">${sizeLabels[size]}</label>
          <div style="display: inline-flex; align-items: stretch; border: 1px solid var(--swc-gray-300, #bbb); border-radius: var(--swc-corner-radius-100, 4px); overflow: hidden; background-color: var(--swc-gray-100, #fff);">
            <input
              id="size-${size}"
              type="text"
              readonly
              value="Option A"
              style="border: none; outline: none; background: transparent; padding-inline: 8px; font-size: var(--swc-font-size-100, 14px); font-family: inherit; min-inline-size: 100px;"
            />
            ${template({
              ...args,
              size,
              'accessible-label': `Open ${sizeLabels[size].toLowerCase()} picker`,
              'icon-slot': chevronIconSvg,
            })}
          </div>
        </div>
      `
    )}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'row-wrap' },
};

export const Quiet: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 4px; align-items: flex-start;">
      <label for="quiet-default" style="font-family: inherit; font-size: var(--swc-font-size-100, 14px);">Category (default)</label>
      <div style="display: inline-flex; align-items: stretch; border: 1px solid var(--swc-gray-300, #bbb); border-radius: var(--swc-corner-radius-100, 4px); overflow: hidden; background-color: var(--swc-gray-100, #fff);">
        <input
          id="quiet-default"
          type="text"
          readonly
          value="Option A"
          style="border: none; outline: none; background: transparent; padding-inline: 8px; font-size: var(--swc-font-size-100, 14px); font-family: inherit; min-inline-size: 120px;"
        />
        ${template({ ...args, quiet: false, 'accessible-label': 'Open picker', 'icon-slot': chevronIconSvg })}
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 4px; align-items: flex-start;">
      <label for="quiet-on" style="font-family: inherit; font-size: var(--swc-font-size-100, 14px);">Category (quiet)</label>
      <div style="display: inline-flex; align-items: stretch; border: 1px solid transparent; border-radius: var(--swc-corner-radius-100, 4px); overflow: hidden; background-color: transparent;">
        <input
          id="quiet-on"
          type="text"
          readonly
          value="Option A"
          style="border: none; outline: none; background: transparent; padding-inline: 8px; font-size: var(--swc-font-size-100, 14px); font-family: inherit; min-inline-size: 120px;"
        />
        ${template({ ...args, quiet: true, 'accessible-label': 'Open picker (quiet)', 'icon-slot': chevronIconSvg })}
      </div>
    </div>
  `,
  tags: ['options'],
  parameters: { flexLayout: 'row-wrap' },
};

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

export const States: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 4px; align-items: flex-start;">
      <label for="state-default" style="font-family: inherit; font-size: var(--swc-font-size-100, 14px);">Default</label>
      <div style="display: inline-flex; align-items: stretch; border: 1px solid var(--swc-gray-300, #bbb); border-radius: var(--swc-corner-radius-100, 4px); overflow: hidden; background-color: var(--swc-gray-100, #fff);">
        <input
          id="state-default"
          type="text"
          readonly
          value="Option A"
          style="border: none; outline: none; background: transparent; padding-inline: 8px; font-size: var(--swc-font-size-100, 14px); font-family: inherit; min-inline-size: 120px;"
        />
        ${template({ ...args, 'accessible-label': 'Open picker', 'icon-slot': chevronIconSvg })}
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 4px; align-items: flex-start;">
      <label for="state-disabled" style="font-family: inherit; font-size: var(--swc-font-size-100, 14px);">Disabled</label>
      <div style="display: inline-flex; align-items: stretch; border: 1px solid var(--swc-gray-300, #bbb); border-radius: var(--swc-corner-radius-100, 4px); overflow: hidden; background-color: var(--swc-gray-100, #fff); opacity: 0.4;">
        <input
          id="state-disabled"
          type="text"
          readonly
          value="Option A"
          disabled
          style="border: none; outline: none; background: transparent; padding-inline: 8px; font-size: var(--swc-font-size-100, 14px); font-family: inherit; min-inline-size: 120px;"
        />
        ${template({ ...args, disabled: true, 'accessible-label': 'Open picker (disabled)', 'icon-slot': chevronIconSvg })}
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 4px; align-items: flex-start;">
      <label for="state-quiet" style="font-family: inherit; font-size: var(--swc-font-size-100, 14px);">Quiet</label>
      <div style="display: inline-flex; align-items: stretch; border: 1px solid transparent; border-radius: var(--swc-corner-radius-100, 4px); overflow: hidden; background-color: transparent;">
        <input
          id="state-quiet"
          type="text"
          readonly
          value="Option A"
          style="border: none; outline: none; background: transparent; padding-inline: 8px; font-size: var(--swc-font-size-100, 14px); font-family: inherit; min-inline-size: 120px;"
        />
        ${template({ ...args, quiet: true, 'accessible-label': 'Open picker (quiet)', 'icon-slot': chevronIconSvg })}
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 4px; align-items: flex-start;">
      <label for="state-quiet-disabled" style="font-family: inherit; font-size: var(--swc-font-size-100, 14px);">Quiet disabled</label>
      <div style="display: inline-flex; align-items: stretch; border: 1px solid transparent; border-radius: var(--swc-corner-radius-100, 4px); overflow: hidden; background-color: transparent; opacity: 0.4;">
        <input
          id="state-quiet-disabled"
          type="text"
          readonly
          value="Option A"
          disabled
          style="border: none; outline: none; background: transparent; padding-inline: 8px; font-size: var(--swc-font-size-100, 14px); font-family: inherit; min-inline-size: 120px;"
        />
        ${template({ ...args, quiet: true, disabled: true, 'accessible-label': 'Open picker (quiet disabled)', 'icon-slot': chevronIconSvg })}
      </div>
    </div>
  `,
  tags: ['states'],
  parameters: { flexLayout: 'row-wrap' },
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

// Accessibility: stepper — demonstrates full field context with labels and ARIA
export const Accessibility: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 4px; align-items: flex-start;">
      <label for="a11y-qty" style="font-family: inherit; font-size: var(--swc-font-size-100, 14px);">Quantity</label>
      <div style="display: inline-flex; align-items: stretch; border: 1px solid var(--swc-gray-300, #bbb); border-radius: var(--swc-corner-radius-100, 4px); overflow: hidden; background-color: var(--swc-gray-100, #fff);">
        ${template({ ...args, 'accessible-label': 'Decrease quantity', 'icon-slot': removeIconSvg })}
        <input
          id="a11y-qty"
          type="number"
          value="1"
          min="0"
          max="100"
          style="border: none; outline: none; background: transparent; padding-inline: 8px; font-size: var(--swc-font-size-100, 14px); font-family: inherit; text-align: center; min-inline-size: 60px;"
        />
        ${template({ ...args, 'accessible-label': 'Increase quantity', 'icon-slot': addIconSvg })}
      </div>
    </div>
  `,
  args: { size: 'm' },
  tags: ['a11y'],
};
