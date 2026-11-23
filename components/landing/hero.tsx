import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PillButtonContent } from '@/components/react-bits/PillButtonContent';
import { GitHubStars } from '@/components/landing/github-stars';
import { AsciiWordmark } from '@/components/landing/ascii-wordmark';
import PatternWaves from '@/components/landing/pattern-waves';
import {
	actionRowClass,
	containerClass,
	displayClass,
	ledeClass,
} from '@/components/landing/foundation';
import { landingButtonClass, landingButtonSecondaryClass } from '@/components/landing/landing-styles';

/**
 * P2 — hero + trust strip.
 *
 * The ASCII wordmark is the page's brand device and is spent here, once, bare on
 * the page with no panel of its own. It is decorative (`aria-hidden` inside
 * `AsciiWordmark`); the accessible page title is the real `<h1>`.
 *
 * The dot field sits behind everything and rises out of a wash of the page
 * background under the navbar, then fades into the page. Actions use the
 * landing pill buttons (`landing-styles.ts` + `PillButtonContent`).
 */

const proof: Array<{ label: string; value: string }> = [
	{ label: 'Active installations', value: '8,000+' },
	{ label: 'Payment gateways', value: '4' },
	{ label: 'Languages', value: '23' },
	{ label: 'License', value: 'MPL-2.0' },
];

export function Hero() {
	return (
		<section className="relative isolate overflow-hidden" aria-labelledby="hero-title">
			{/* Pixel field, tall and veiled under the navbar so it rises out of the page. */}
			<div className="pointer-events-none absolute inset-x-0 -top-px -z-10 h-[680px] md:h-[860px] lg:h-[1000px]" aria-hidden="true">
				<PatternWaves
					preset="silk"
					color="#27a9e1"
					backgroundColor="transparent"
					opacity={0.72}
					fade="bottom"
					fadeSize={0.5}
					spacing={10}
					markSize={0.85}
					depth={1}
					shine={0.95}
					contrast={1.35}
					speed={0.24}
				/>
			</div>
			<div className="landing-hero-veil pointer-events-none absolute inset-x-0 top-0 -z-10 h-[clamp(220px,34vh,460px)]" aria-hidden="true" />

			<div className="w-full px-5 pt-12 pb-12 sm:px-8 md:pt-16 md:pb-16 lg:px-12 lg:pt-24 lg:pb-24">
				<div className="flex flex-col gap-8 md:gap-10">
					<div className="overflow-x-auto">
						<AsciiWordmark />
					</div>

					<div className="flex max-w-[46rem] flex-col gap-5">
						<h1 id="hero-title" className={cn(displayClass, 'max-w-[20ch]')}>
							Free, open-source billing for Pterodactyl
						</h1>
						<p className={ledeClass}>
							Clients buy servers from plans you define, pay by the hour or the year, and
							manage themselves. You run the numbers from one console.
						</p>
						<div className={cn(actionRowClass, 'pt-1')}>
							<Link href="/docs/getting-started/install/" className={landingButtonClass}>
								<PillButtonContent>
									<ArrowRight aria-hidden="true" />
									<span>Install CtrlPanel</span>
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
									<span>Live demo</span>
								</PillButtonContent>
							</a>
							<GitHubStars />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export function TrustStrip() {
	return (
		<section className={cn(containerClass, 'pb-14 md:pb-20 lg:pb-24')} aria-label="CtrlPanel at a glance">
			<dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-fd-border bg-fd-border lg:grid-cols-4">
				{proof.map(item => (
					<div key={item.label} className="flex flex-col gap-1 bg-fd-card p-5">
						<dt className="text-sm leading-snug text-fd-muted-foreground">{item.label}</dt>
						<dd className="text-2xl leading-none font-semibold tracking-tight tabular-nums">
							{item.value}
						</dd>
					</div>
				))}
			</dl>
		</section>
	);
}
