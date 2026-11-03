import { Check, RefreshCw, Rocket, SlidersHorizontal, Store, Wallet } from 'lucide-react';
import { Section } from '@/components/landing/section';
import { AppWindow, Pill, uiLabelClass } from '@/components/landing/app-ui';
import { bodyClass, metaClass } from '@/components/landing/foundation';
import { cn } from '@/lib/utils';

/**
 * P6 — Storefront and client flow.
 *
 * Claim: clients buy and manage servers themselves. Proof: a storefront fragment
 * with real configuration fields (location, egg, memory, CPU, disk), then the
 * four steps and the self-service actions behind them.
 */

const plans = [
	{ name: 'Starter', specs: '2 GB · 100% CPU · 10 GB', price: '$7.20', selected: false },
	{ name: 'Survival', specs: '4 GB · 200% CPU · 20 GB', price: '$14.40', selected: true },
	{ name: 'Network', specs: '8 GB · 300% CPU · 40 GB', price: '$28.80', selected: false },
];

const config = [
	{ label: 'Location', value: 'Frankfurt' },
	{ label: 'Egg', value: 'Paper 1.21' },
	{ label: 'Memory', value: '4096 MB' },
	{ label: 'CPU', value: '200%' },
	{ label: 'Disk', value: '20 GB' },
	{ label: 'Allocation', value: 'Auto' },
];

const steps = [
	{
		icon: Store,
		title: 'Pick a plan',
		body: 'Price, memory, CPU and disk are visible before anyone signs up. No quote request.',
	},
	{
		icon: SlidersHorizontal,
		title: 'Configure',
		body: 'Choose a location, egg and node. Deployment variables are validated before the order is accepted.',
	},
	{
		icon: Wallet,
		title: 'Pay',
		body: 'Credits or a gateway. The invoice is issued at the same moment the order is created.',
	},
	{
		icon: Rocket,
		title: 'Deploy',
		body: 'The server is created in Pterodactyl with the chosen egg, node and resources.',
	},
];

const selfService = [
	{ title: 'Upgrade', body: 'Move to a bigger plan without opening a ticket.' },
	{ title: 'Renew', body: 'Top up the wallet; the next cycle is covered automatically.' },
	{ title: 'Cancel', body: 'Stop the plan and the server at the end of the paid cycle.' },
];

export function Storefront() {
	return (
		<Section
			id="storefront"
			title="A storefront your clients can finish alone."
			lede="They pick a plan, choose a location and egg, pay, and the server appears in Pterodactyl. Upgrades, renewals and cancellations are self-service."
		>
			<div data-reveal>
				<AppWindow label="ctrlpanel / store" right={<Pill tone="primary">3 plans</Pill>}>
					<div className="flex flex-col gap-4 p-4">
						<div className="grid gap-2 sm:grid-cols-3">
							{plans.map(plan => (
								<div
									key={plan.name}
									className={cn(
										'relative flex flex-col gap-1 rounded-xl border p-3',
										plan.selected
											? 'border-fd-primary bg-fd-primary/5'
											: 'border-fd-border bg-fd-card',
									)}
								>
									{plan.selected ? (
										<span className="absolute top-3 right-3 inline-flex text-fd-primary-text">
											<Check className="size-4" aria-hidden="true" />
											<span className="sr-only">Selected</span>
										</span>
									) : null}
									<p className="text-[11px] text-fd-muted-foreground">{plan.name}</p>
									<p className="text-xl leading-none font-semibold tracking-tight tabular-nums">
										{plan.price}
										<span className="text-[11px] font-normal text-fd-muted-foreground"> /mo</span>
									</p>
									<p className="mt-1 text-[11px] leading-relaxed text-fd-muted-foreground">{plan.specs}</p>
								</div>
							))}
						</div>

						<div className="grid gap-2 sm:grid-cols-3">
							{config.map(field => (
								<div key={field.label} className="rounded-lg border border-fd-border bg-fd-muted/40 px-3 py-2">
									<p className={uiLabelClass}>{field.label}</p>
									<p className="mt-0.5 text-xs font-medium">{field.value}</p>
								</div>
							))}
						</div>

						<div className="flex flex-wrap items-center gap-3 rounded-xl border border-fd-border bg-fd-muted/50 px-3 py-2.5">
							<div className="min-w-0">
								<p className={uiLabelClass}>Order total</p>
								<p className="text-sm font-semibold tabular-nums">$14.40 / month</p>
							</div>
							<span className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-fd-border bg-fd-card px-3 py-1.5 text-xs text-fd-muted-foreground">
								<Check className="size-3.5 text-fd-primary-text" aria-hidden="true" />
								Deployment variables valid
							</span>
							<span className="rounded-lg bg-fd-primary px-3 py-1.5 text-xs font-semibold text-fd-primary-foreground">
								Pay with credits
							</span>
						</div>
					</div>
				</AppWindow>
			</div>

			<div className="grid gap-px overflow-hidden rounded-2xl border border-fd-border bg-fd-border sm:grid-cols-2 lg:grid-cols-4" data-reveal>
				{steps.map((step, index) => (
					<div key={step.title} className="flex flex-col gap-2 bg-fd-card p-5">
						<div className="flex items-center gap-2">
							<step.icon className="size-4 text-fd-primary-text" aria-hidden="true" />
							<span className="ml-auto font-mono text-[11px] text-fd-muted-foreground">
								{String(index + 1).padStart(2, '0')}
							</span>
						</div>
						<p className="font-medium">{step.title}</p>
						<p className="text-sm leading-relaxed text-fd-muted-foreground">{step.body}</p>
					</div>
				))}
			</div>

			<div className="flex flex-col gap-4" data-reveal>
				<p className={bodyClass}>
					The client portal is not a read-only mirror. It is where renewals, upgrades and cancellations
					happen, backed by the same billing engine that runs the admin side.
				</p>
				<div className="grid gap-4 md:grid-cols-3">
					{selfService.map(item => (
						<div key={item.title} className="flex items-start gap-3 rounded-xl border border-fd-border p-4">
							<RefreshCw className="mt-0.5 size-4 shrink-0 text-fd-muted-foreground" aria-hidden="true" />
							<div>
								<p className="text-sm font-medium">{item.title}</p>
								<p className="mt-0.5 text-[13px] leading-relaxed text-fd-muted-foreground">{item.body}</p>
							</div>
						</div>
					))}
				</div>
				<p className={metaClass}>
					CtrlPanel is built for Pterodactyl, not adapted to it. Nests, eggs, nodes and locations are
					first-class fields on the plan.
				</p>
			</div>
		</Section>
	);
}