import { ArrowUpRight, Braces, KeyRound, Plug } from 'lucide-react';
import { Section } from '@/components/landing/section';
import { AppWindow, ListRow, Pill } from '@/components/landing/app-ui';
import { bodyClass, metaClass, monoClass, splitClass } from '@/components/landing/foundation';
import { cn } from '@/lib/utils';

/**
 * P10 — API and extensions.
 *
 * Claim: automate it or extend it. Proof: a real endpoint + response shape, the
 * application keys, the API reference, and the marketplace for everything else.
 *
 * Webhooks are deliberately absent: they are not a shipped feature.
 */

const response = `{
  "data": [
    {
      "id": "X8BK1rMUV4qF3lo-ROWIl",
      "name": "survival-prod",
      "suspended": false,
      "identifier": "a1b2c3d4",
      "billing_priority": 0
    }
  ]
}`;

export function Api() {
	return (
		<Section
			id="api"
			title="Automate it, or extend it."
			lede="A documented HTTP API, application keys and a marketplace mean CtrlPanel fits the rest of your stack."
		>
			<div className={splitClass}>
				<div className="flex flex-col gap-4" data-reveal>
					<AppWindow
						label="ctrlpanel / api"
						right={
							<>
								<Pill tone="primary">GET</Pill>
								<Pill tone="success">200</Pill>
							</>
						}
						bodyClassName="p-0"
					>
						<div className="border-b border-fd-border px-4 py-3">
							<p className={cn(monoClass, 'text-fd-foreground')}>
								<span className="text-fd-muted-foreground">GET</span> /api/servers
							</p>
							<p className="mt-1 text-[11px] text-fd-muted-foreground">
								Authorization: Bearer &lt;application-key&gt;
							</p>
						</div>
						<pre className={cn(monoClass, 'overflow-x-auto p-4 text-[12px] text-fd-muted-foreground')}>
							{response}
						</pre>
					</AppWindow>
					<p className={metaClass}>
						Users, servers, products, vouchers, roles and notifications are all exposed. OAuth2 is
						available for third-party clients.
					</p>
				</div>

				<div className="flex flex-col gap-6" data-reveal>
					<p className={bodyClass}>
						Provision accounts from your own control plane, reconcile payments in your accounting tool, or build
						a dashboard for your staff. The panel is a service, not a silo.
					</p>

					<div className="flex flex-col gap-3">
						<div className="flex items-center gap-2">
							<KeyRound className="size-4 text-fd-muted-foreground" aria-hidden="true" />
							<p className="text-sm font-medium">Application keys</p>
						</div>
						<div className="overflow-hidden rounded-xl border border-fd-border">
							<ListRow className="justify-between">
								<span className="min-w-0 truncate font-mono text-[12px]">ci_deploy</span>
								<span className="text-[11px] text-fd-muted-foreground">used 2m ago</span>
								<Pill tone="primary">read + write</Pill>
							</ListRow>
							<ListRow className="justify-between">
								<span className="min-w-0 truncate font-mono text-[12px]">billing-sync</span>
								<span className="text-[11px] text-fd-muted-foreground">used 1h ago</span>
								<Pill>read</Pill>
							</ListRow>
						</div>
					</div>

					<div className="flex flex-col gap-2 rounded-xl border border-fd-border p-4">
						<div className="flex items-center gap-2">
							<Plug className="size-4 text-fd-muted-foreground" aria-hidden="true" />
							<p className="text-sm font-medium">Extensions</p>
						</div>
						<p className="text-[13px] leading-relaxed text-fd-muted-foreground">
							Themes, payment gateways and add-ons are distributed through the community marketplace. Install
							one and follow its own setup guide.
						</p>
						<a
							href="https://market.ctrlpanel.gg"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1 text-sm font-medium text-fd-primary-text hover:underline"
						>
							Browse the marketplace
							<ArrowUpRight className="size-3.5" aria-hidden="true" />
						</a>
					</div>

					<div className="flex items-center gap-2 text-[11px] text-fd-muted-foreground">
						<Braces className="size-3.5" aria-hidden="true" />
						<span>API reference generated with Scribe, in the docs.</span>
					</div>
				</div>
			</div>
		</Section>
	);
}