import { RefreshCw, Rocket, SlidersHorizontal, Store, Wallet } from 'lucide-react';
import { Section } from '@/components/landing/section';
import { Shot } from '@/components/landing/shot';
import { bodyClass, metaClass } from '@/components/landing/foundation';

/**
 * P6 — Storefront and client flow.
 *
 * Claim: clients buy and manage servers themselves. Proof: the real product
 * configuration screen — price, memory, CPU, disk, nodes and eggs — carried over
 * from the older site, then the four steps and the self-service actions behind it.
 */

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
			<Shot
				src="/img/userguides/product-page.png"
				alt="CtrlPanel product editor: plan name, price, memory, CPU, disk, backups and the nodes and eggs the product is available on"
				width={1647}
				height={737}
				caption="A plan is just a product: resources, a price, and the nodes and eggs it may deploy to."
			/>

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
