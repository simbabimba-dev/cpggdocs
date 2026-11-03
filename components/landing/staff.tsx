import { Bell, ScrollText, ShieldCheck } from 'lucide-react';
import { Section } from '@/components/landing/section';
import { AccessMark, AppWindow, ListRow, Pill, uiLabelClass } from '@/components/landing/app-ui';
import { bodyClass, splitClass } from '@/components/landing/foundation';

/**
 * P7 — Staff and permissions.
 *
 * Claim: run a team, not a solo account. Proof: a permission matrix drawn from
 * the real permission tree, the activity log it writes to, and broadcasts.
 */

const roles = ['Support', 'Moderator', 'Admin'];

const permissions = [
	{ name: 'View users', grants: [true, true, true] },
	{ name: 'Adjust credits', grants: [false, false, true] },
	{ name: 'Read tickets', grants: [true, true, true] },
	{ name: 'Reply to tickets', grants: [true, true, true] },
	{ name: 'Manage products', grants: [false, true, true] },
	{ name: 'View payments', grants: [false, true, true] },
	{ name: 'Edit settings', grants: [false, false, true] },
];

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
				<div data-reveal>
					<AppWindow label="ctrlpanel / roles" right={<Pill>3 roles</Pill>} bodyClassName="p-0">
						<table className="w-full border-collapse text-sm">
							<caption className="sr-only">Example permission matrix for three staff roles</caption>
							<thead>
								<tr className="border-b border-fd-border text-left">
									<th scope="col" className="px-3 py-2.5 text-[11px] font-medium text-fd-muted-foreground">
										Permission
									</th>
									{roles.map(role => (
										<th
											key={role}
											scope="col"
											className="px-3 py-2.5 text-center text-[11px] font-medium text-fd-muted-foreground"
										>
											{role}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{permissions.map(row => (
									<tr key={row.name} className="border-b border-fd-border last:border-b-0">
										<th scope="row" className="px-3 py-2.5 text-left font-normal text-fd-foreground">
											{row.name}
										</th>
										{row.grants.map((granted, index) => (
											<td key={roles[index]} className="px-3 py-2.5 text-center">
												<AccessMark
													allowed={granted}
													label={`${row.name} for ${roles[index]}: ${granted ? 'allowed' : 'not allowed'}`}
												/>
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</AppWindow>
				</div>

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