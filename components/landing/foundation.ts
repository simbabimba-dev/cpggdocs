/**
 * Landing foundations — the shared vocabulary the rebuilt sections are built from.
 *
 * Everything here is defined on the docs theme tokens (`fd-*`) so the landing and
 * the docs read as one product, in light and dark. Sections must not declare their
 * own colours, spacing scale or heading sizes; they compose these primitives.
 *
 * Rules this file enforces:
 * - One container, one vertical rhythm, used by every section.
 * - Type roles only (display / title / lede / body / minor). No per-section sizes.
 * - No eyebrows or tiny tracked caps: a section opens with its title.
 * - ASCII artwork is a brand device, spent at most twice on the whole page.
 */

/* ---------------------------------------------------------------- layout --- */

/** Default page container. Matches the docs wide content measure. */
export const containerClass = 'mx-auto w-full max-w-[1120px] px-4 sm:px-6';

/** Narrower measure for reading-width blocks. */
export const containerNarrowClass = 'mx-auto w-full max-w-[760px] px-4 sm:px-6';

/** Vertical rhythm between sections. Sits inside a container. */
export const sectionClass = 'py-14 md:py-20 lg:py-24';

/** First section under the header can pull up a little. */
export const sectionLeadClass = 'pb-14 pt-10 md:pb-20 md:pt-14 lg:pb-24 lg:pt-16';

/** The section's opening stack: title, then its supporting line. */
export const sectionHeadClass = 'flex flex-col gap-3';

/** Paragraph flow inside a section. Matches the docs `gap-4`. */
export const stackClass = 'flex flex-col gap-4';

/** A row of actions (buttons/links). */
export const actionRowClass = 'flex flex-wrap items-center gap-3';

/* ------------------------------------------------------------------ type --- */

/** Hero headline. The one very large thing on the page. */
export const displayClass = 'text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl';

/** Section title. */
export const titleClass = 'text-2xl leading-tight font-semibold tracking-tight md:text-3xl';

/** Supporting line directly under a title. */
export const ledeClass = 'max-w-[52ch] text-lg leading-relaxed text-pretty text-fd-muted-foreground md:text-xl';

/** Running copy. */
export const bodyClass = 'max-w-[62ch] text-base leading-relaxed text-pretty text-fd-muted-foreground';

/** Secondary note. */
export const minorClass = 'text-sm leading-relaxed text-fd-muted-foreground';

/** A quiet field label (sentence case, never uppercase tracking). */
export const labelClass = 'text-sm font-medium text-fd-muted-foreground';

/* ------------------------------------------------------------- surfaces --- */

/** The docs panel: rounded card on the page background. */
export const panelClass = 'rounded-2xl border border-fd-border bg-fd-card shadow-sm';

/** A panel's padded inner region. */
export const panelBodyClass = `${panelClass} p-6 md:p-8`;

/** A single card inside a section (mirrors `docs-card`). */
export const cardClass = 'rounded-xl border border-fd-border bg-fd-card p-5';

/** Muted inset surface for figures/previews inside a panel. */
export const insetClass = 'rounded-xl border border-fd-border bg-fd-muted';

/** Divider between stacked rows. */
export const dividerClass = 'h-px w-full bg-fd-border';

/* ---------------------------------------------------------------- figures --- */

/** Two-column figure/analysis grid used by most sections. */
export const splitClass = 'grid items-start gap-8 lg:grid-cols-2 lg:gap-12';

/** Grid of small supporting facts. */
export const factGridClass = 'grid gap-x-8 gap-y-6 sm:grid-cols-2';

/** Tabular figures for anything counted or priced. */
export const figureClass = 'tabular-nums';

/** Monospace, reserved for code and console fragments (never labels). */
export const monoClass = 'font-mono text-[13px] leading-relaxed';

/** Section anchor offset for the sticky header. */
export const anchorClass = 'scroll-mt-20';

/** A quiet inline detail line. */
export const metaClass = 'text-[13px] leading-relaxed text-fd-muted-foreground';
