'use client';

import { useState } from 'react';
import { ArrowUpRight, Wallet } from 'lucide-react';
import { AppWindow, Bar, ListRow, Pill, uiLabelClass } from '@/components/landing/app-ui';
import { cn } from '@/lib/utils';

/**
 * The page's one live control.
 *
 * A sample plan that is priced on every cycle CtrlPanel supports. The maths is
 * the panel's own derivation (`Product::getHourlyPrice()` / `getMonthlyPrice()`):
 * a product stores one price and one billing period; the rest are derived.
 * Keyboard users get the same thing as pointers — the cycle buttons are real
 * buttons with `aria-pressed`, and the price is announced politely.
 */

const MONTHLY_PRICE = 14.4;
const WALLET = 24.6;

const cycles = [
	{ key: 'hourly', label: 'Hourly', divisor: 720, next: 'in one hour' },
	{ key: 'daily', label: 'Daily', divisor: 30, next: 'tomorrow' },
	{ key: 'weekly', label: 'Weekly', divisor: 4, next: 'in 7 days' },
	{ key: 'monthly', label: 'Monthly', divisor: 1, next: 'in 30 days' },
	{ key: 'quarterly', label: 'Quarterly', divisor: 1 / 3, next: 'in 90 days' },
	{ key: 'half-annually', label: 'Half-yearly', divisor: 1 / 6, next: 'in 180 days' },
	{ key: 'annually', label: 'Annually', divisor: 1 / 12, next: 'in 365 days' },
] as const;

const ledger = [
	{ label: 'Wallet top-up', amount: '+$25.00', tone: 'text-fd-success' },
	{ label: 'survival-prod · monthly', amount: '−$14.40', tone: 'text-fd-foreground' },
	{ label: 'Referral reward', amount: '+$2.50', tone: 'text-fd-success' },
];

const money = (value: number) =>
	new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export function BillingDemo() {
	const [cycleKey, setCycleKey] = useState<string>('monthly');
	const cycle = cycles.find(item => item.key === cycleKey) ?? cycles[3];
	const price = MONTHLY_PRICE / cycle.divisor;
	const covered = Math.floor(WALLET / price);
	const walletPercent = Math.min(100, (WALLET / price) * 100);

	return (
		<AppWindow label="ctrlpanel / server billing" right={<Pill>sample plan</Pill>}>
			<div className="flex flex-col gap-4 p-4">
				<div className="flex items-start justify-between gap-3">
					<div className="min-w-0">
						<p className="truncate font-medium">survival-prod</p>
						<p className="text-[11px] text-fd-muted-foreground">4 GB RAM · 200% CPU · 20 GB disk</p>
					</div>
					<Pill tone="success">Running</Pill>
				</div>

				<div>
					<p className={cn(uiLabelClass, 'mb-1.5')}>Billing cycle</p>
					<div role="group" aria-label="Sample plan billing cycle" className="flex flex-wrap gap-1 rounded-xl border border-fd-border bg-fd-muted p-1">
						{cycles.map(item => {
							const active = item.key === cycle.key;
							return (
								<button
									key={item.key}
									type="button"
									aria-pressed={active}
									onClick={() => setCycleKey(item.key)}
									className={cn(
										'rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors motion-reduce:transition-none',
										active
											? 'bg-fd-card text-fd-foreground shadow-sm'
											: 'text-fd-muted-foreground hover:text-fd-foreground',
									)}
								>
									{item.label}
								</button>
							);
						})}
					</div>
				</div>

				<div className="rounded-xl border border-fd-border bg-fd-muted/50 p-4" aria-live="polite">
					<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
						<span className="text-sm text-fd-muted-foreground">Charge per {cycle.label.toLowerCase()}</span>
						<span className="text-2xl leading-none font-semibold tracking-tight tabular-nums">{money(price)}</span>
					</div>
					<p className="mt-2 text-[13px] leading-relaxed text-fd-muted-foreground">
						Next invoice {cycle.next}.{' '}
						{covered === 0
							? 'The wallet does not cover this cycle yet.'
							: `Wallet covers ${covered.toLocaleString('en-US')} ${covered === 1 ? 'cycle' : 'cycles'}.`}
					</p>
					<div className="mt-3 flex items-center gap-2">
						<Wallet className="size-3.5 text-fd-muted-foreground" aria-hidden="true" />
						<Bar value={walletPercent} className="h-1" />
						<span className="shrink-0 text-[11px] text-fd-muted-foreground tabular-nums">{money(WALLET)}</span>
					</div>
				</div>

				<div>
					<div className="mb-1 flex items-center justify-between">
						<p className={uiLabelClass}>Wallet ledger</p>
						<span className="text-[11px] text-fd-muted-foreground">Auto-suspend at $0.00</span>
					</div>
					<div className="overflow-hidden rounded-lg border border-fd-border">
						{ledger.map(entry => (
							<ListRow key={entry.label} className="justify-between py-2">
								<span className="truncate text-fd-muted-foreground">{entry.label}</span>
								<span className={cn('shrink-0 text-[13px] font-medium tabular-nums', entry.tone)}>{entry.amount}</span>
							</ListRow>
						))}
					</div>
				</div>

				<a
					href="/docs/"
					className="inline-flex items-center gap-1 text-[13px] font-medium text-fd-primary-text hover:underline"
				>
					Read the docs
					<ArrowUpRight className="size-3.5" aria-hidden="true" />
				</a>
			</div>
		</AppWindow>
	);
}