import { CalendarClock, Repeat, Wallet } from 'lucide-react';
import { Section } from '@/components/landing/section';
import { BillingDemo } from '@/components/landing/billing-demo';
import { bodyClass, metaClass, splitClass } from '@/components/landing/foundation';
import { cn } from '@/lib/utils';

/**
 * P4 — Billing engine.
 *
 * Claim: the billing engine is the differentiator. Proof: the one live control
 * (a plan priced on every supported cycle) plus the mechanics that make it a
 * billing system rather than a checkout button.
 */

const mechanics = [
	{
		icon: Repeat,
		title: 'A cycle per plan',
		body: 'Products are priced hourly, daily, weekly, monthly, quarterly, half-yearly or annually. The other cycles are derived from the one you set.',
	},
	{
		icon: Wallet,
		title: 'Wallet first',
		body: 'Charges come out of prepaid credits. At zero the server suspends; a top-up resumes it — no card retries, no failed-invoice limbo.',
	},
	{
		icon: CalendarClock,
		title: 'Changes mid-cycle',
		body: 'Upgrade a server, cancel a plan, set billing priority and last-billed. Clients get a warning before a suspension, not after.',
	},
];

export function BillingEngine() {
	return (
		<Section
			id="billing"
			title="Bill by the hour, the month, or the year."
			lede="Each plan carries its own price and cycle. CtrlPanel charges the credit wallet, sets the next invoice, and suspends at zero — then resumes the moment the client tops up."
		>
			<div className={splitClass}>
				<div className="flex flex-col gap-6" data-reveal>
					<p className={bodyClass}>
						Hosting margins move. A plan can be sold by the hour for trial traffic and by the year for
						customers who commit. The engine keeps both honest: it derives every other cycle from the one
						price you enter, so the books never disagree with the store.
					</p>

					<ul className="flex flex-col divide-y divide-fd-border border-y border-fd-border">
						{mechanics.map(item => (
							<li key={item.title} className="flex gap-4 py-4">
								<item.icon className="mt-0.5 size-5 shrink-0 text-fd-primary-text" aria-hidden="true" />
								<div className="flex flex-col gap-1">
									<p className="font-medium">{item.title}</p>
									<p className="text-sm leading-relaxed text-fd-muted-foreground">{item.body}</p>
								</div>
							</li>
						))}
					</ul>

					<p className={cn(metaClass)}>
						Try the control: switch the cycle on the sample plan on the right and the charge, the next
						invoice and the wallet coverage all update. The maths is CtrlPanel’s own.
					</p>
				</div>

				<div data-reveal>
					<BillingDemo />
				</div>
			</div>
		</Section>
	);
}