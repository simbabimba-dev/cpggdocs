import { ArrowUpRight, BadgeDollarSign, Gift, Receipt, Tag } from 'lucide-react';
import { Section } from '@/components/landing/section';
import { AppWindow, ListRow, Pill, uiLabelClass } from '@/components/landing/app-ui';
import { bodyClass, cardClass, metaClass, splitClass } from '@/components/landing/foundation';
import { cn } from '@/lib/utils';

/**
 * P5 — Payments and revenue.
 *
 * Claim: get paid your way and keep the books clean. Proof: the four built-in
 * gateways, the checkout maths (tax + fee + currency) and the invoice, then the
 * three levers that grow revenue without another tool.
 */

const gateways = [
	{
		name: 'Stripe',
		body: 'Card checkout with Stripe Checkout.',
		detail: 'The signed confirmation is verified before credits land.',
	},
	{
		name: 'PayPal',
		body: 'PayPal balance or card.',
		detail: 'Webhook, captured amount and currency are checked.',
	},
	{
		name: 'Mollie',
		body: 'Local methods across Europe and the UK.',
		detail: 'Webhook token, then amount and currency are verified.',
	},
	{
		name: 'MercadoPago',
		body: 'Local payments across Latin America.',
		detail: 'Signature, payment reference and approval status are verified.',
	},
];

const revenue = [
	{
		icon: Tag,
		title: 'Coupons',
		body: 'Discount a plan with a minimum price, a maximum number of uses per customer, and a minimum credit balance.',
	},
	{
		icon: Gift,
		title: 'Vouchers',
		body: 'Redeemable codes that top up the credit wallet — useful for giveaways, refunds and partner payouts.',
	},
	{
		icon: BadgeDollarSign,
		title: 'Referrals & partners',
		body: 'Referral codes pay a reward on signup. Partner discounts give resellers a rate without a second price list.',
	},
];

const lines = [
	{ label: 'Plan · monthly', value: '$14.40' },
	{ label: 'Tax · 20%', value: '$2.88' },
	{ label: 'Processing fee', value: '$0.59' },
];

export function Payments() {
	return (
		<Section
			id="payments"
			title="Get paid your way. Keep the books clean."
			lede="PayPal, Stripe, Mollie and MercadoPago are built in. Tax, fees, currencies and invoices are settled before the money reaches your ledger."
		>
			<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
				{gateways.map(gateway => (
					<div key={gateway.name} className={cn(cardClass, 'flex flex-col gap-2')}>
						<div className="flex items-center justify-between gap-2">
							<p className="font-medium">{gateway.name}</p>
							<Pill tone="primary">built in</Pill>
						</div>
						<p className="text-sm leading-relaxed text-fd-muted-foreground">{gateway.body}</p>
						<p className="mt-auto text-[11px] leading-relaxed text-fd-muted-foreground">{gateway.detail}</p>
					</div>
				))}
			</div>

			<div className={cn(splitClass, 'lg:grid-cols-[1fr_0.9fr]')}>
				<div className="flex flex-col gap-4" data-reveal>
					<AppWindow label="ctrlpanel / checkout" right={<Pill tone="warning">awaiting payment</Pill>}>
						<div className="flex flex-col gap-4 p-4">
							<div className="flex items-center justify-between gap-3">
								<div>
									<p className="font-medium">survival-prod</p>
									<p className="text-[11px] text-fd-muted-foreground">4 GB · 200% CPU · monthly</p>
								</div>
								<Pill>USD</Pill>
							</div>

							<div className="overflow-hidden rounded-lg border border-fd-border">
								{lines.map(line => (
									<ListRow key={line.label} className="justify-between py-2">
										<span className="text-fd-muted-foreground">{line.label}</span>
										<span className="tabular-nums">{line.value}</span>
									</ListRow>
								))}
								<ListRow className="justify-between bg-fd-muted/50 py-2.5">
									<span className="font-medium">Total</span>
									<span className="font-semibold tabular-nums">$17.87</span>
								</ListRow>
							</div>

							<div className="flex items-center justify-between gap-3 rounded-lg border border-fd-border bg-fd-muted/50 px-3 py-2.5">
								<div className="flex items-center gap-2">
									<Receipt className="size-4 text-fd-muted-foreground" aria-hidden="true" />
									<div>
										<p className="text-xs font-medium">INV-2026-0418</p>
										<p className="text-[11px] text-fd-muted-foreground">Emailed and downloadable</p>
									</div>
								</div>
								<Pill tone="success">paid</Pill>
							</div>

							<p className={metaClass}>
								Each gateway verifies its own confirmation before the credit is written. A webhook that does
								not match the order is ignored.
							</p>
						</div>
					</AppWindow>
				</div>

				<div className="flex flex-col gap-6" data-reveal>
					<p className={bodyClass}>
						Prices, tax and processing fees are handled at checkout, in the currency each gateway supports.
						Clients get an invoice they can keep; you get a payment row you can reconcile.
					</p>

					<ul className="flex flex-col divide-y divide-fd-border border-y border-fd-border">
						{revenue.map(item => (
							<li key={item.title} className="flex gap-4 py-4">
								<item.icon className="mt-0.5 size-5 shrink-0 text-fd-primary-text" aria-hidden="true" />
								<div className="flex flex-col gap-1">
									<p className="font-medium">{item.title}</p>
									<p className="text-sm leading-relaxed text-fd-muted-foreground">{item.body}</p>
								</div>
							</li>
						))}
					</ul>

					<div className="flex flex-col gap-2">
						<p className={uiLabelClass}>Another gateway?</p>
						<a
							href="https://market.ctrlpanel.gg"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1 text-sm font-medium text-fd-primary-text hover:underline"
						>
							Install a payment extension
							<ArrowUpRight className="size-3.5" aria-hidden="true" />
						</a>
					</div>
				</div>
			</div>
		</Section>
	);
}