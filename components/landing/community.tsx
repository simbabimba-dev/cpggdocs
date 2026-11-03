import { Ban, LifeBuoy, MessageCircle, UserCheck } from 'lucide-react';
import { Section } from '@/components/landing/section';
import { AppWindow, ListRow, Pill, uiLabelClass } from '@/components/landing/app-ui';
import { cardClass } from '@/components/landing/foundation';
import { cn } from '@/lib/utils';

/**
 * P8 — Community.
 *
 * Claim: Discord and the support desk are part of the panel, not a bolt-on.
 * Proof: the verification + role-sync fragment, the ticket queue and thread, and
 * the abuse controls that keep both usable.
 */

const roleSync = [
	{ from: 'Verified', to: 'Customer' },
	{ from: 'Booster', to: 'Priority' },
	{ from: 'Staff', to: 'Support' },
];

const tickets = [
	{ id: '#482', subject: 'Invoice for March', category: 'Billing', status: 'Open' as const },
	{ id: '#481', subject: 'Server will not start', category: 'Technical', status: 'Pending' as const },
	{ id: '#479', subject: 'Refund request', category: 'Billing', status: 'Closed' as const },
];

const facts = [
	{
		icon: UserCheck,
		title: 'Verify once',
		body: 'A client links Discord and is verified. Roles are assigned from the mapping you set, not by hand.',
	},
	{
		icon: MessageCircle,
		title: 'Tickets that hold context',
		body: 'Categories, statuses and comments keep a thread readable. Staff can reply without leaving the panel.',
	},
	{
		icon: Ban,
		title: 'Abuse controls',
		body: 'A ticket blacklist stops repeated bad-faith accounts, and failed Discord joins are recorded instead of lost.',
	},
];

export function Community() {
	return (
		<Section
			id="community"
			title="Your Discord and your support desk, in sync."
			lede="Clients verify with Discord and get their roles automatically. Support runs on categories, statuses and comments — with a blacklist when someone abuses it."
		>
			<div className="grid gap-4 lg:grid-cols-2">
				<div data-reveal>
					<AppWindow label="ctrlpanel / discord" right={<Pill tone="success">connected</Pill>}>
						<div className="flex flex-col gap-4 p-4">
							<div className="flex items-center gap-3 rounded-xl border border-fd-border bg-fd-muted/50 p-3">
								<div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-fd-primary/15 text-sm font-semibold text-fd-primary-text">
									C
								</div>
								<div className="min-w-0">
									<p className="truncate text-sm font-medium">Your community</p>
									<p className="text-[11px] text-fd-muted-foreground">Discord server · verification on</p>
								</div>
								<Pill tone="success" className="ml-auto">
									linked
								</Pill>
							</div>

							<div className="flex items-center gap-3 rounded-xl border border-fd-border p-3">
								<div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-fd-muted text-sm font-semibold">
									M
								</div>
								<div className="min-w-0">
									<p className="truncate text-sm font-medium">mia</p>
									<p className="text-[11px] text-fd-muted-foreground">discord id · 1842…</p>
								</div>
								<div className="ml-auto flex shrink-0 gap-1.5">
									<Pill tone="primary">Verified</Pill>
									<Pill>Customer</Pill>
								</div>
							</div>

							<div>
								<p className={cn(uiLabelClass, 'mb-1.5')}>Role sync</p>
								<div className="overflow-hidden rounded-lg border border-fd-border">
									{roleSync.map(role => (
										<ListRow key={role.from} className="justify-between py-2">
											<span className="text-fd-muted-foreground">{role.from}</span>
											<span className="font-medium">{role.to}</span>
										</ListRow>
									))}
								</div>
							</div>

							<p className="text-[11px] leading-relaxed text-fd-muted-foreground">
								If someone cannot join, the failure is recorded with the reason. Verification is not a
								silent dead end.
							</p>
						</div>
					</AppWindow>
				</div>

				<div data-reveal>
					<AppWindow label="ctrlpanel / tickets" right={<Pill tone="warning">2 open</Pill>} bodyClassName="p-0">
						<div>
							{tickets.map(ticket => (
								<ListRow key={ticket.id} className="gap-2.5">
									<span className="shrink-0 font-mono text-[11px] text-fd-muted-foreground">{ticket.id}</span>
									<span className="min-w-0 flex-1 truncate">{ticket.subject}</span>
									<span className="hidden shrink-0 text-[11px] text-fd-muted-foreground sm:block">
										{ticket.category}
									</span>
									<Pill
										tone={
											ticket.status === 'Open' ? 'primary' : ticket.status === 'Pending' ? 'warning' : 'neutral'
										}
									>
										{ticket.status}
									</Pill>
								</ListRow>
							))}
						</div>

						<div className="border-t border-fd-border p-4">
							<div className="flex items-center gap-2">
								<LifeBuoy className="size-4 text-fd-muted-foreground" aria-hidden="true" />
								<p className="text-sm font-medium">#482 · Invoice for March</p>
								<Pill tone="primary" className="ml-auto">
									Open
								</Pill>
							</div>
							<div className="mt-3 flex flex-col gap-2">
								<div className="max-w-[90%] rounded-xl rounded-tl-sm border border-fd-border bg-fd-muted/50 px-3 py-2 text-[13px] leading-relaxed">
									Hi — the invoice in my account shows the old plan. Can you reissue it for March?
								</div>
								<div className="ml-auto max-w-[90%] rounded-xl rounded-tr-sm border border-fd-primary/30 bg-fd-primary/10 px-3 py-2 text-[13px] leading-relaxed">
									Reissued and emailed. The March line now matches your upgrade.
								</div>
							</div>
							<div className="mt-3 flex items-center gap-2 rounded-lg border border-fd-border px-3 py-2 text-[11px] text-fd-muted-foreground">
								<span className="min-w-0 flex-1 truncate">Write a reply…</span>
								<span className="rounded-md bg-fd-primary px-2 py-1 font-medium text-fd-primary-foreground">
									Reply
								</span>
							</div>
						</div>
					</AppWindow>
				</div>
			</div>

			<div className="grid gap-4 md:grid-cols-3">
				{facts.map(fact => (
					<div key={fact.title} className={cn(cardClass, 'flex flex-col gap-2')} data-reveal>
						<fact.icon className="size-5 text-fd-primary-text" aria-hidden="true" />
						<p className="font-medium">{fact.title}</p>
						<p className="text-sm leading-relaxed text-fd-muted-foreground">{fact.body}</p>
					</div>
				))}
			</div>
		</Section>
	);
}