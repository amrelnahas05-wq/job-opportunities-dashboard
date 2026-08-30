# Design Brainstorm

## Approach 1

**Theme Name:** Desert Signal

**Very Brief Intro:** A warm, editorial dashboard that treats job listings like a curated field guide: parchment neutrals, ink typography, and a sharp saffron signal color. It feels grounded, human, and useful rather than corporate.

**Probability:** 0.07

## Approach 2

**Theme Name:** Night Shift Grid

**Very Brief Intro:** A dark operations-console direction with electric cyan and amber highlights, intended to make new opportunities feel like live signals arriving in real time. It is focused, technical, and high-contrast.

**Probability:** 0.04

## Approach 3

**Theme Name:** Coastal Ledger

**Very Brief Intro:** A cool, airy interface inspired by maritime charts and modern public-service portals, combining blue-green ink, soft sand panels, and precise table-like information architecture. It feels calm, trustworthy, and highly legible.

**Probability:** 0.09

## Chosen Direction: Desert Signal

### Design Movement

Contemporary editorial design with references to independent magazines, Arabic newspaper mastheads, and wayfinding systems. The dashboard should feel like a working desk for opportunity discovery: tactile, structured, and intentionally local.

### Core Principles

1. **Editorial hierarchy over dashboard sameness.** Use a strong lead story, supporting cards, and quiet metadata instead of a wall of identical widgets.
2. **Arabic-first readability.** Respect RTL reading flow, generous line height, and visible source/date context.
3. **Warm utility.** Use color and texture to create confidence without making the page decorative or noisy.
4. **Evidence stays visible.** Preserve source links, original post context, and processing state so each opportunity can be trusted.

### Color Philosophy

The palette is built around deep ink `#20251F`, sun-baked paper `#F6F0E5`, pale sand `#E9DDC8`, and an ownable saffron signal `#E29A32`. Ink gives the page authority; paper makes long scanning comfortable; sand separates layers without hard borders; saffron marks live opportunities, filters, and action states. Muted eucalyptus `#75877A` acts as the calm secondary color for status and provenance.

### Layout Paradigm

A split editorial workspace: a slim left rail anchors brand and navigation, a wide content field holds the day’s signal and opportunity stream, and a right-side context rail keeps filters, sources, and system health visible. On mobile, the rail becomes a compact top bar and the context rail becomes a horizontal filter tray.

### Signature Elements

1. A saffron vertical signal bar that marks fresh or high-confidence opportunities.
2. Small “field notes” metadata rows with source, date, and category rather than generic stat chips.
3. A faint topographic contour texture used sparingly in the hero and empty states.

### Interaction Philosophy

Every interaction should help the user narrow uncertainty: filters immediately update the stream, saved states are explicit, source links open in a new context, and empty states explain what will happen next. Hover states should feel like paper lifting slightly from a desk; buttons respond with a quick pressed scale and a clear color shift.

### Animation

Use short 160–220ms ease-out transitions for filters, tabs, and hover states. On first load, stagger the lead panel and opportunity cards by 45ms with a subtle upward translation of 8px. Do not animate the entire page on every filter change; crossfade only the result count and use a brief highlight on newly surfaced cards. Respect `prefers-reduced-motion` by disabling entrance movement.

### Typography System

Use **Noto Serif Arabic** for the display masthead and major section headings, paired with **Noto Sans Arabic** for body text, controls, metadata, and tables. Latin fallback uses Georgia for display and system sans for UI. Headings use confident weight contrast; body copy stays at 16px minimum with 1.75 line height in Arabic. Numbers and timestamps use tabular numerals where possible.

### Brand Essence

A quiet command center for finding credible Arabic job opportunities before they disappear into the scroll. Personality adjectives: **grounded, discerning, alert**.

### Brand Voice

Headlines are concise and observant. CTAs sound like useful actions, never hype. Microcopy explains provenance and uncertainty directly.

Example lines:

- “فرص تستحق وقتك — مرتبة حسب الأحدث والأوضح.”
- “افتح المصدر وتحقق من التفاصيل قبل التقديم.”

### Wordmark & Logo

A custom Arabic wordmark built from a compact editorial masthead with a saffron vertical signal cut through the first letterform. The standalone mark is a geometric compass-signal: a sand-colored square with an ink diagonal notch and a saffron vertical beam, used in the header and favicon.

### Signature Brand Color

**Saffron Signal `#E29A32`** — a warm, ownable alert color that feels regional and human, reserved for freshness, active filters, and moments that deserve attention.
