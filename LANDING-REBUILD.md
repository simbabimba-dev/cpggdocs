# CtrlPanel landing rebuild — plan

Status: **done** — P0, P2, and P3–P11 all built on branch `feat/landing-rebuild`. Page mounts in order: hero + trust strip, one console, billing engine, payments & revenue, storefront, staff, community, themes & i18n, API & extensions, install, footer.

Locked decisions:
- ASCII is a brand device, spent **twice max** on the page (hero + footer close).
- Product visuals are built as **HTML/Tailwind UI fragments** (`app-ui.tsx`), not external screenshots.
- Old section components are deleted (done: `administration-*`, `payments-section`, `payment-wheel-*`, `themes-section`, `theme-editor`, `dashboard-preview`, `ascii-rails`).
- **No webhooks claim**: the admin webhooks feature is unshipped WIP; the API section says API + application keys + marketplace only. (Payment gateways still use their own provider webhooks — that is a gateway detail, not the admin webhooks feature.)
- Languages = **23** (counted from `lang/*.json`), not "~30". Per-plan billing cycles = hourly, daily, weekly, monthly, quarterly, half-yearly, annually.
Source of truth for features: `/var/www/ctrlpanel` (Laravel/PHP panel).
Surface: `app/page.tsx` + `components/landing/*`. Mode: **Persuade** (marketing landing).
Shell: `SiteNav` (Tailwind, scroll-blur + drawer) and `LandingFooter` (PR #170) are done.

---

## 1. Verdict on the current page

The page is not one page; it is three generations stacked.

- **Identity drift.** The hero, `administration-section`, `payments-section` and `themes-section` each draw their own ASCII "wordmark heading" — the device is used as a section eyebrow four times, so it stops meaning anything. `dashboard-preview` has no heading at all.
- **Styling drift.** Half the sections are Tailwind (`site-nav`, `landing-styles.ts`), half are CSS modules (`payments-section`, `themes-section`, `administration-overview`). Spacing/rhythm differs per section (`py-8` vs a `mt-[clamp(40px,4.2vw,64px)]`), so vertical rhythm varies.
- **Argument drift.** The order is hero → dashboard → admin → payments → themes. There is no trust anchor, no "who this is for", and the strongest differentiators (credits, hourly→yearly billing, Discord, referrals, self-hosted/OSS) are missing or buried.
- **Asset gap.** Everything leans on the ASCII treatment because there are no real product screenshots wired in.

Fix = one identity (keep the ASCII/console world, spend it once), one rhythm (shared section primitive), one argument (below).

---

## 2. Positioning — what we say, and what only we can say

One line: **Free, open-source billing for Pterodactyl** — clients buy servers from your plans, pay by the hour or the year, and manage themselves.

### Definitive features (grounded in the panel source)

| Area | Definitive capability | Evidence |
| --- | --- | --- |
| Pterodactyl-native | Sell real Pterodactyl servers; manage nests, eggs, nodes, locations; product↔egg/node/location mapping; deployment-variable validation; server upgrade | `ProductController`, `products.{locations,eggs,nodes}`, `servers.upgrade`, `validateDeploymentVariables` |
| Credit wallet | Prepaid credits; buy, top up, spend | `update_credits_*` migrations, `Voucher`/`Coupon` credit columns |
| Dynamic billing | Hourly → yearly cycles; last-billed, billing priority, cancellation, auto-suspend at zero credits, suspension warnings | `add_billing_period_to_products`, `last_billed`, `servers.{resume,suspend,cancel,updateBillingPriority}`, `ServerSuspensionWarningNotification` |
| Payments | PayPal, Stripe, Mollie, MercadoPago built in; tax + fees; multi-currency; invoices with email + download | `PaymentController`, `config/currency_codes.php`, `add_tax_to_paymentlogs`, `add_fee_to_payments`, `InvoiceNotification`, `invoices.download*` |
| Coupons & vouchers | Distinct systems; min product price, max uses per user, min credits | `create_coupons_table`, `create_vouchers_table`, `coupon.redeem`, `voucher.redeem` |
| Referrals & partners | Referral codes + rewards; partner discounts | `PartnerDiscount`, `user_referrals`, `ReferralNotification` |
| Roles & permissions | Granular permission tree, role power, readable names, role API | `permission` config, `create_permission_tables`, `role_power`, `Api/RoleController` |
| Discord | Verify users, auto-assign roles, handle join failures | `DiscordUser`, `discord_verified_at`, `DiscordJoinFailed` |
| Support tickets | Categories, statuses, comments, blacklist | `TicketsController`, `TicketCategory`, `TicketBlacklist` |
| Security | 2FA (Google2FA) per profile; email verification; one account per IP; IP/last-seen tracking | `config/google2fa.php`, `create_two_factor_core_tables`, `add_ip_and_last_seen_to_users_table` |
| Extensibility | HTTP API + application API keys + webhooks + Scribe docs; marketplace extensions | `application_apis`, `create_webhooks_table`, `config/scribe.php`, `Admin/ApplicationApiController` |
| Theming & i18n | Themes (default, BlueInfinity) + theme editor + icon upload; ~30 locales | `config/theme.php`, `settings.updateIcons`, `themes/`, `lang/*` |
| Admin operations | Activity log / audit trail, broadcast notifications, useful links, sync jobs | `ActivityLogController`, `notifications.sendToAll`, `useful_links_on_top_navbar`, `overview.sync` |
| Delivery | Docker image (beta), install lock, multi-distro Linux, free & MPL-2.0, 8000+ installs, Pterodactyl-only | `README.md`, `.github/docker`, `install.lock` |

**Explicit constraint to turn into a selling point:** CtrlPanel is Pterodactyl-only (no Pelican). "Purpose-built" beats "works with everything".

**Competitor test:** swap in Paymenter/WHMCS and the feature list mostly still reads. The sentences that survive are the ones about the **credit wallet + hourly billing + native Pterodactyl + free/OSS**. Those set the page's spine.

---

## 3. Direction (one POV, not four)

- **World:** the panel is a control surface; the page borrows its language — figures, cycles, ledgers — set in the existing console palette. The ASCII wordmark is spent **twice max** (hero + one divider), never as a section eyebrow.
- **Type:** one sans (Red Hat Display already loaded) for prose/headings; **tabular figures** for prices/percentages (not full monospace — reserve mono for the wordmark/divider and real code).
- **Idea sentence:** *On this page, the panel's **billing cycles and credit ledger** become the **pricing and section rhythm**.*
- **One live thing:** a **billing-cycle control** in the hero or billing section — drag hourly → monthly → yearly on a sample plan and watch the price and the ledger update. Real math, thumb-sized, plain-text fallback.
- **Fullness over restraint:** each section carries its full content; no empty screens; sections 120–240px apart.
- **Assets:** we need real shots (admin dashboard, storefront, checkout, invoice, roles, Discord settings, theme editor). Until then, build the interface fragments in HTML/Tailwind (`data-ui`), never grey placeholder bars.

---

## 4. The page, divided into parts we can work on

Ordered as the argument reads. Each part = one shippable PR-shaped unit.

| # | Part | Job (the claim it must prove) | Proof from the panel | Skills |
| --- | --- | --- | --- | --- |
| **P0** | **Foundations** | Make one page, not five. One container/rhythm primitive + tokens; migrate CSS modules to Tailwind; decide the single ASCII usage; section spacing + heading rules | — | impeccable `layout`/`document`, taste-skill house rules |
| **P1** | **Shell** | Nav + footer frame the page | ✅ done (`site-nav`, `LandingFooter`) | better-ui, emil |
| **P2** | **Hero + trust strip** ✅ | "Free, OSS billing for Pterodactyl" + proof it is real and adopted | 8000+ installs, GitHub stars, MPL-2.0, Pterodactyl-only, live demo | frontend-design, taste-skill, `heroinspo` refs |

P2 detail: hero backdrop is React Bits **Pattern Waves** (`components/landing/pattern-waves.tsx`, `ogl@1.0.11`), brand-tinted `#27a9e1`, transparent background, edges fade, reduced-motion + intersection handled by the component. Wrapper halves opacity below `md` so copy stays legible. Footer's large top padding (`pt-[clamp(250px,20vw,280px)]`) is intentional and will be filled by P3–P12.
| **P3** | **Product proof** | You run it all from one console — show the real panels | Admin overview, client dashboard, server list | taste-skill imagery, better-ui |
| **P4** | **Billing engine** | Hours to years, prepaid credits, auto-suspend, upgrades | billing_period, last_billed, suspend/resume/upgrade, credits | impeccable `shape`, emil (live control) |
| **P5** | **Payments** | Get paid your way; books stay clean | PayPal/Stripe/Mollie/MercadoPago, tax, fees, currency, invoices | (rewrite `payments-section`) |
| **P6** | **Storefront & client flow** | Clients buy and manage themselves | store, checkout, order, upgrade, cancel, tickets | impeccable `onboard` |
| **P7** | **Staff power** | Run a team, not a solo account | granular roles/permissions, activity log, broadcasts | (`administration-section`) |
| **P8** | **Community** | Discord verify + roles; support tickets | DiscordUser, role sync, ticket system | — |
| **P9** | **Grow revenue** | Referrals and partners pay for themselves | referral rewards, partner discounts, coupons/vouchers | — |
| **P10** | **Themes & i18n** | Make it yours, in your language | BlueInfinity, theme editor, icon upload, ~30 locales | (rewrite `themes-section`) |
| **P11** | **API & extensions** | Automate and extend it | HTTP API, app keys, webhooks, marketplace | — |
| **P12** | **Close** | Final CTA + install path | install docs, Docker (beta), roadmap | taste-skill (footer as designed close) |

Trim if long: P7 merges into P3, P9 into P4, P11 into P10 → **9 sections** is the target ceiling. "No section without a claim."

---

## 5. Build order & definition of done

**Milestones**

1. **M1 — Foundations + shell** (P0, P1). Outcome: consistent container, rhythm, tokens, nav, footer.
2. **M2 — Above the fold** (P2, P3). Outcome: hero + trust + real proof screens. This is the page's verdict.
3. **M3 — The money story** (P4, P5, P6). Outcome: the differentiators the competitor test survives on.
4. **M4 — Breadth** (P7, P8, P10, P11). Outcome: the full feature surface, no thin sections.
5. **M5 — Close + polish** (P12 + full-page pass). Outcome: one scroll, one identity.

**Definition of done per part**

- One claim, stated, with its proof shown (real feature, not adjectives).
- Every heading names its section; margins equal; no empty half-screen.
- Responsive at 390 / 768 / 1440; keyboard + focus states; `prefers-reduced-motion` respected.
- Tailwind-only (no new CSS module); tokens from `landing-styles.ts`.
- No invented customers/quotes/stats; screenshots are real or drawn as real UI.

**Immediate blockers**

- Real product screenshots (or a decision to build HTML fragments).
- Confirm direction (console/technical) vs a softer marketing look.

---

## 6. Current state

All sections built. Shared kit: `components/landing/section.tsx` (section shell + GSAP reveal) and `components/landing/app-ui.tsx` (window, pill, stat, bar, access mark, sparkline). One live control: `billing-demo.tsx`.

Polish pass applied after screenshot review: staff supporting points moved from a cramped 3-up grid to a divided list; locale chips use Latin names for Hindi/Hebrew to avoid glyph fallback; billing link points at `/docs/` (no billing guide exists).

Remaining before merge: push `feat/landing-rebuild`, then merge upstream PR #170 when the user approves.
