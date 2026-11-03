import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Terminal } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GitHubStars } from '@/components/landing/github-stars';
import { AsciiWordmark } from '@/components/landing/ascii-wordmark';
import PatternWaves from '@/components/landing/pattern-waves';
import {
	actionRowClass,
	containerClass,
	displayClass,
	ledeClass,
	panelClass,
} from '@/components/landing/foundation';

/**
 * P2 — hero + trust strip.
 *
 * The ASCII wordmark is the page's brand device and is spent here, once. It is
 * decorative (`aria-hidden` inside `AsciiWordmark`); the accessible page title is
 * the real `<h1>`. Everything else composes the `foundation.ts` primitives.
 */

const proof: Array<{ label: string; value: string }> = [
	{ label: 'Active installations', value: '8,000+' },
	{ label: 'Payment gateways', value: '4' },
	{ label: 'Languages', value: '23' },
	{ label: 'License', value: 'MPL-2.0' },
];

function BrandStrip() {
	return (
		<div className={cn(panelClass, 'overflow-hidden')}>
			<div className="flex items-center gap-2 border-b border-fd-border px-4 py-2.5 sm:px-6">
				<Terminal aria-hidden="true" className="size-3.5 text-fd-muted-foreground" />
				<span className="font-mono text-xs text-fd-muted-foreground">ctrlpanel</span>
				<span className="ml-auto text-xs text-fd-muted-foreground">self-hosted · MPL-2.0</span>
			</div>
			<div className="overflow-x-auto px-4 py-5 sm:px-6">
				<AsciiWordmark />
			</div>
		</div>
	);
}

export function Hero() {
	return (
		<section className="relative isolate overflow-hidden" aria-labelledby="hero-title">
			<div className="pointer-events-none absolute inset-0 -z-10 opacity-50 md:opacity-100" aria-hidden="true">
				<PatternWaves
					preset="silk"
					color="#27a9e1"
					backgroundColor="transparent"
					opacity={0.72}
					fade="edges"
					fadeSize={0.62}
					spacing={10}
					markSize={0.85}
					depth={1}
					shine={0.95}
					contrast={1.35}
					speed={0.24}
				/>
			</div>
			<div
				className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-fd-background md:h-44"
				aria-hidden="true"
			/>

			<div className={cn(containerClass, 'pt-10 pb-10 md:pt-14 md:pb-14 lg:pt-16 lg:pb-16')}>
				<div className="flex flex-col gap-8 md:gap-10">
					<BrandStrip />

					<div className="flex max-w-[46rem] flex-col gap-4">
						<h1 id="hero-title" className={displayClass}>
							Free, open-source billing for Pterodactyl
						</h1>
						<p className={ledeClass}>
							Clients buy servers from plans you define, pay by the hour or the year, and
							manage themselves. You run the numbers from one console.
						</p>
						<div className={cn(actionRowClass, 'pt-2')}>
							<Link href="/docs/getting-started/install/" className={buttonVariants({ variant: 'primary' })}>
								<ArrowRight aria-hidden="true" className="size-4" />
								<span>Install CtrlPanel</span>
							</Link>
							<a
								href="https://demo.ctrlpanel.gg"
								target="_blank"
								rel="noopener noreferrer"
								className={buttonVariants({ variant: 'outline' })}
							>
								<ArrowUpRight aria-hidden="true" className="size-4" />
								<span>Live demo</span>
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