import { Activity, Server, Users } from 'lucide-react';
import { Section } from '@/components/landing/section';
import { Shot } from '@/components/landing/shot';
import { cardClass } from '@/components/landing/foundation';
import { cn } from '@/lib/utils';

/**
 * P3 — Product proof.
 *
 * Claim: you run the whole business from one console. Proof: the two screens the
 * operator actually lives in — the admin overview and the client dashboard —
 * shown as the real product pictures carried over from the older site.
 */

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
			<div className="grid gap-5 lg:grid-cols-2">
				<Shot
					src="/img/fullscreen.svg"
					alt="CtrlPanel admin panel: servers, customers and billing in one view"
					width={13269}
					height={7324}
					caption="Admin side — nodes, plans, users, payments and tickets in one panel."
				/>
				<Shot
					src="/img/servers.svg"
					alt="The servers and plans a customer owns, shown in the CtrlPanel client portal"
					width={14980}
					height={7801}
					caption="Client side — one login for servers, credit balance, invoices and support."
				/>
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
