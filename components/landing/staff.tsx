import { Bell, ScrollText, ShieldCheck } from 'lucide-react';
import { Section } from '@/components/landing/section';
import { Shot } from '@/components/landing/shot';
import { AppWindow, ListRow, uiLabelClass } from '@/components/landing/app-ui';
import { bodyClass, splitClass } from '@/components/landing/foundation';

/**
 * P7 — Staff and permissions.
 *
 * Claim: run a team, not a solo account. Proof: the real role-management picture
 * from the older site, the activity log it writes to, and broadcasts.
 */

const log = [
	{ who: 'mia', what: 'adjusted credits for arun', when: '2m' },
	{ who: 'jordi', what: 'suspended creative-hub', when: '14m' },
	{ who: 'system', what: 'role Moderator created', when: '1h' },
	{ who: 'mia', what: 'broadcast to 412 users', when: '3h' },
];

const points = [
	{
		icon: ShieldCheck,
		title: 'Roles from a permission tree',
		body: 'Build a role from readable permissions, set its power, and give it a name that means something to your team.',
	},
	{
		icon: ScrollText,
		title: 'Activity log',
		body: 'Every credit adjustment, suspension and settings change is recorded, with who did it and when.',
	},
	{
		icon: Bell,
		title: 'Broadcasts',
		body: 'Send a notification to every customer or a single account — maintenance windows, renewals, incidents.',
	},
];

export function Staff() {
	return (
		<Section
			id="staff"
			title="Give staff exactly the access they need."
			lede="Roles are built from a permission tree, with role power and readable names. Every change is written to the activity log."
		>
			<div className={splitClass}>
				<Shot
					src="/img/panel-permissions.svg"
					alt="CtrlPanel role management: a permission tree with the grants each staff role receives"
					width={28404}
					height={14638}
					caption="Roles are built from the panel’s own permission tree — not a single admin flag."
				/>

				<div className="flex flex-col gap-6" data-reveal>
					<p className={bodyClass}>
						Start from the roles that ship with the panel, then split them until each person sees only
						their job. A support agent can read and answer tickets without ever touching a credit balance.
					</p>

					<AppWindow label="ctrlpanel / activity log" bodyClassName="p-0">
						<div>
							{log.map(entry => (
								<ListRow key={`${entry.who}-${entry.what}`} className="gap-2">
									<span className="min-w-0 truncate">
										<span className="font-medium">{entry.who}</span>{' '}
										<span className="text-fd-muted-foreground">{entry.what}</span>
									</span>
									<span className="ml-auto shrink-0 text-[11px] text-fd-muted-foreground tabular-nums">
										{entry.when}
									</span>
								</ListRow>
							))}
						</div>
					</AppWindow>

					<ul className="flex flex-col divide-y divide-fd-border border-y border-fd-border">
						{points.map(point => (
							<li key={point.title} className="flex gap-4 py-4">
								<point.icon className="mt-0.5 size-5 shrink-0 text-fd-primary-text" aria-hidden="true" />
								<div className="flex flex-col gap-1">
									<p className="text-sm font-medium">{point.title}</p>
									<p className="text-[13px] leading-relaxed text-fd-muted-foreground">{point.body}</p>
								</div>
							</li>
						))}
					</ul>

					<p className={uiLabelClass}>
						Roles are exposed over the API too, so your own tooling can provision access.
					</p>
				</div>
			</div>
		</Section>
	);
}
