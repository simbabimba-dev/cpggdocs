import { Activity, CreditCard, Server, ShieldCheck, Users } from 'lucide-react';
import { Section } from '@/components/landing/section';
import { AppWindow, Bar, ListRow, Pill, Spark, Stat, uiLabelClass, uiMonoClass } from '@/components/landing/app-ui';
import { cardClass, metaClass } from '@/components/landing/foundation';
import { cn } from '@/lib/utils';

/**
 * P3 — Product proof.
 *
 * Claim: you run the whole business from one console. Proof: the two screens the
 * operator actually lives in — the admin overview and the client dashboard —
 * drawn as real UI on the docs tokens.
 */

const adminServers = [
	{ name: 'survival-prod', owner: 'mia', plan: '4 GB · monthly', state: 'Running' as const },
	{ name: 'creative-hub', owner: 'arun', plan: '2 GB · hourly', state: 'Running' as const },
	{ name: 'modded-valheim', owner: 'jordi', plan: '6 GB · quarterly', state: 'Suspended' as const },
];

const revenue = [18, 22, 20, 26, 24, 31, 29, 34, 33, 38, 36, 42, 40, 46];

const facts = [
	{
		icon: Server,
		title: 'Admin side',
		body: 'Nodes, nests, eggs, plans, users, payments and tickets — the operator’s whole surface in one panel.',
	},
	{
		icon: Users,
		title: 'Client side',
		body: 'Each customer gets one login for servers, credit balance, invoices, upgrades and support.',
	},
	{
		icon: Activity,
		title: 'Same records',
		body: 'A server, its owner and its next invoice are one set of rows. No export, no second tool, no drift.',
	},
];

export function OneConsole() {
	return (
		<Section
			id="console"
			title="One console runs the whole business."
			lede="Billing, servers, customers and revenue share the same database. The admin panel and the client portal are two sides of it."
		>
			<div className="grid gap-4 lg:grid-cols-[1.12fr_0.88fr]" data-reveal>
				<AppWindow label="ctrlpanel / admin" right={<Pill tone="success">Live</Pill>}>
					<div className="grid grid-cols-3 divide-x divide-fd-border border-b border-fd-border">
						<Stat className="p-4" label="Active servers" value="128" hint="3 suspended" />
						<Stat className="p-4" label="Customers" value="412" hint="+9 this week" />
						<Stat className="p-4" label="Revenue / mo" value="$4,860" hint="all cycles" />
					</div>

					<div className="grid gap-4 border-b border-fd-border p-4 sm:grid-cols-[1fr_168px]">
						<div>
							<p className={uiLabelClass}>Revenue, last 30 days</p>
							<Spark points={revenue} className="mt-2" />
						</div>
						<div className="flex flex-col gap-2">
							<p className={uiLabelClass}>Billing queue</p>
							<ListRow className="justify-between rounded-lg px-2.5 py-2">
								<span className="text-fd-muted-foreground">Due now</span>
								<span className="tabular-nums">14</span>
							</ListRow>
							<ListRow className="justify-between rounded-lg px-2.5 py-2">
								<span className="text-fd-muted-foreground">Credit covered</span>
								<span className="tabular-nums">132</span>
							</ListRow>
						</div>
					</div>

					<div>
						<div className="flex items-center gap-2 px-3 pt-3 pb-1">
							<span className={cn(uiMonoClass, 'uppercase tracking-wide')}>servers</span>
							<span className="ml-auto text-[11px] text-fd-muted-foreground">3 of 128</span>
						</div>
						{adminServers.map(server => (
							<ListRow key={server.name}>
								<Server className="size-4 shrink-0 text-fd-muted-foreground" aria-hidden="true" />
								<span className="min-w-0 truncate font-medium">{server.name}</span>
								<span className="hidden truncate text-fd-muted-foreground sm:block">{server.owner}</span>
								<span className="ml-auto hidden text-fd-muted-foreground md:block">{server.plan}</span>
								<Pill tone={server.state === 'Running' ? 'success' : 'warning'}>{server.state}</Pill>
							</ListRow>
						))}
					</div>
				</AppWindow>

				<AppWindow label="ctrlpanel / dashboard" right={<Pill>client</Pill>}>
					<div className="flex flex-col gap-4 p-4">
						<div className="rounded-xl border border-fd-border bg-fd-muted/50 p-4">
							<p className={uiLabelClass}>Credit balance</p>
							<p className="mt-1 text-3xl leading-none font-semibold tracking-tight tabular-nums">$24.60</p>
							<p className={cn(metaClass, 'mt-2')}>Covers 1 monthly server · auto-suspend at $0.00</p>
						</div>

						<div className="rounded-xl border border-fd-border p-4">
							<div className="flex items-start justify-between gap-3">
								<div className="min-w-0">
									<p className="truncate font-medium">survival-prod</p>
									<p className="text-[11px] text-fd-muted-foreground">4 GB RAM · 200% CPU · 20 GB disk</p>
								</div>
								<Pill tone="success">Online</Pill>
							</div>
							<div className="mt-3 flex flex-col gap-2">
								<div className="flex items-center gap-2 text-[11px] text-fd-muted-foreground">
									<span className="w-12">CPU</span>
									<Bar value={42} />
									<span className="tabular-nums">42%</span>
								</div>
								<div className="flex items-center gap-2 text-[11px] text-fd-muted-foreground">
									<span className="w-12">Memory</span>
									<Bar value={61} />
									<span className="tabular-nums">61%</span>
								</div>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-2">
							<div className="flex items-center gap-2 rounded-lg border border-fd-border px-3 py-2 text-xs text-fd-muted-foreground">
								<CreditCard className="size-3.5" aria-hidden="true" /> Next invoice · 12d
							</div>
							<div className="flex items-center gap-2 rounded-lg border border-fd-border px-3 py-2 text-xs text-fd-muted-foreground">
								<ShieldCheck className="size-3.5" aria-hidden="true" /> 2FA on
							</div>
						</div>
					</div>
				</AppWindow>
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