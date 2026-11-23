import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Boxes, Check, Clock, Database, Server, Terminal } from 'lucide-react';
import { PillButtonContent } from '@/components/react-bits/PillButtonContent';
import { Section } from '@/components/landing/section';
import { AppWindow, Pill, uiLabelClass } from '@/components/landing/app-ui';
import { actionRowClass, bodyClass, metaClass, monoClass, splitClass } from '@/components/landing/foundation';
import { landingButtonClass, landingButtonSecondaryClass } from '@/components/landing/landing-styles';
import { cn } from '@/lib/utils';

/**
 * P11 — Install and close.
 *
 * Claim: self-host it without a vendor. Proof: the real install steps, the cron
 * and queue work the billing engine needs, and the requirements it runs on.
 */

const steps = [
	{ cmd: 'git clone https://github.com/Ctrlpanel-gg/panel.git ./', note: 'into /var/www/ctrlpanel' },
	{ cmd: 'COMPOSER_ALLOW_SUPERUSER=1 composer install --no-dev --optimize-autoloader', note: 'dependencies' },
	{ cmd: 'php artisan storage:link', note: 'public storage' },
	{ cmd: '* * * * * php /var/www/ctrlpanel/artisan schedule:run', note: 'every minute: billing + suspensions' },
	{ cmd: 'php artisan queue:work --sleep=3 --tries=3', note: 'run as a service' },
];

const requirements = [
	{ icon: Server, label: 'Pterodactyl panel + wings' },
	{ icon: Database, label: 'MySQL 5.7.22+ or MariaDB 10.2+' },
	{ icon: Terminal, label: 'PHP 8.2–8.4 with intl + redis' },
	{ icon: Clock, label: 'Cron every minute, queue worker' },
];

export function Install() {
	return (
		<Section
			id="install"
			title="Self-hosted in an afternoon."
			lede="Clone it, install the dependencies, point it at your Pterodactyl panel. The billing engine runs on one cron entry and a queue worker."
		>
			<div className={cn(splitClass, 'lg:grid-cols-[0.9fr_1.1fr]')}>
				<div className="flex flex-col gap-6" data-reveal>
					<p className={bodyClass}>
						CtrlPanel is a Laravel application you own. No licence fee, no hosted dependency, no seat
						count. The code is MPL-2.0, and the install guide covers Debian and Ubuntu end to end.
					</p>

					<div>
						<p className={cn(uiLabelClass, 'mb-2')}>You need first</p>
						<ul className="flex flex-col divide-y divide-fd-border border-y border-fd-border">
							{requirements.map(item => (
								<li key={item.label} className="flex items-center gap-3 py-3 text-sm">
									<item.icon className="size-4 shrink-0 text-fd-muted-foreground" aria-hidden="true" />
									<span className="min-w-0 flex-1">{item.label}</span>
									<Check className="size-4 shrink-0 text-fd-primary-text" aria-hidden="true" />
								</li>
							))}
						</ul>
					</div>

					<div className="flex items-start gap-3 rounded-xl border border-fd-border p-4">
						<Boxes className="mt-0.5 size-4 shrink-0 text-fd-muted-foreground" aria-hidden="true" />
						<div>
							<p className="text-sm font-medium">Docker image (beta)</p>
							<p className="mt-0.5 text-[13px] leading-relaxed text-fd-muted-foreground">
								A container image is in beta for people who would rather not manage PHP by hand. The
								documented install is still the supported path.
							</p>
						</div>
					</div>

					<p className={metaClass}>
						CtrlPanel is built for Pterodactyl only. It is not a generic billing panel wearing a game-host
						skin — nests, eggs, nodes and locations are part of the product model.
					</p>
				</div>

				<div className="flex flex-col gap-3" data-reveal>
					<AppWindow label="ctrlpanel / install" right={<Pill tone="primary">MPL-2.0</Pill>} bodyClassName="p-0">
						<div className="flex flex-col">
							{steps.map((step, index) => (
								<div key={step.cmd} className="flex gap-3 border-b border-fd-border px-4 py-3 last:border-b-0">
									<span className="shrink-0 pt-0.5 font-mono text-[11px] text-fd-muted-foreground tabular-nums">
										{String(index + 1).padStart(2, '0')}
									</span>
									<div className="min-w-0">
										<pre className={cn(monoClass, 'overflow-x-auto whitespace-pre-wrap break-words text-fd-foreground')}>
											<span className="text-fd-muted-foreground">$ </span>
											{step.cmd}
										</pre>
										<p className="mt-1 text-[11px] text-fd-muted-foreground">{step.note}</p>
									</div>
								</div>
							))}
						</div>
					</AppWindow>
					<p className={metaClass}>
						The cron entry is what charges hourly plans and suspends empty wallets. Without it, billing does
						not run.
					</p>
				</div>
			</div>

			<div className={cn(actionRowClass, 'pt-2')} data-reveal>
				<Link href="/docs/getting-started/install/" className={landingButtonClass}>
					<PillButtonContent>
						<ArrowRight aria-hidden="true" />
						<span>Read the install guide</span>
					</PillButtonContent>
				</Link>
				<a
					href="https://demo.ctrlpanel.gg"
					target="_blank"
					rel="noopener noreferrer"
					className={landingButtonSecondaryClass}
				>
					<PillButtonContent>
						<ArrowUpRight aria-hidden="true" />
						<span>Try the live demo</span>
					</PillButtonContent>
				</a>
				<a
					href="https://discord.gg/ctrlpanel-gg-787829714483019826"
					target="_blank"
					rel="noopener noreferrer"
					className={landingButtonSecondaryClass}
				>
					<PillButtonContent>
						<span>Join Discord</span>
					</PillButtonContent>
				</a>
			</div>
		</Section>
	);
}