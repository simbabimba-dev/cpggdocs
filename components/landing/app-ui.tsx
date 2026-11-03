import type { ReactNode } from 'react';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Interface fragments.
 *
 * The product visuals on this page are drawn as real HTML/Tailwind, never as
 * grey placeholder bars or third-party screenshots. Everything here composes the
 * docs theme tokens so an "app window" reads as the same product as the docs.
 *
 * Rules:
 * - One chrome (`AppWindow`), one row rhythm (`ListRow`), one status language
 *   (`Pill`), one numeric treatment (`tabular-nums`).
 * - No fake customer names or logos; sample data is labelled as a sample.
 */

/* ---------------------------------------------------------------- shell --- */

/** The window surface shared by every product fragment. */
export const uiWindowClass = 'overflow-hidden rounded-2xl border border-fd-border bg-fd-card shadow-sm';

/** A window's title bar. */
export const uiBarClass = 'flex min-h-9 items-center gap-2 border-b border-fd-border bg-fd-muted/60 px-3 py-2';

/** A window's working area. */
export const uiBodyClass = 'p-3 sm:p-4';

/** A hairline row: list items, ledger entries, settings. */
export const uiRowClass = 'flex items-center gap-3 border-b border-fd-border px-3 py-2.5 text-sm last:border-b-0';

/** Small mono label, reserved for app chrome and console text. */
export const uiMonoClass = 'font-mono text-[11px] leading-relaxed text-fd-muted-foreground';

/** Quiet label inside a fragment. */
export const uiLabelClass = 'text-[11px] leading-snug text-fd-muted-foreground';

/** Numeric emphasis. */
export const uiValueClass = 'font-semibold tabular-nums tracking-tight';

export function AppWindow({
	label,
	children,
	className,
	bodyClassName,
	right,
}: {
	label: string;
	children: ReactNode;
	className?: string;
	bodyClassName?: string;
	right?: ReactNode;
}) {
	return (
		<div className={cn(uiWindowClass, className)}>
			<div className={uiBarClass}>
				<span className="size-2 shrink-0 rounded-[3px] bg-fd-primary" aria-hidden="true" />
				<span className={cn(uiMonoClass, 'truncate')}>{label}</span>
				{right ? <span className="ml-auto flex shrink-0 items-center gap-2">{right}</span> : null}
			</div>
			<div className={cn(bodyClassName)}>{children}</div>
		</div>
	);
}

/** A row of window tabs. Purely presentational. */
export function AppTabs({ items, active, className }: { items: string[]; active: string; className?: string }) {
	return (
		<div className={cn('flex gap-1 overflow-x-auto border-b border-fd-border bg-fd-card px-2 py-1.5', className)}>
			{items.map(item => (
				<span
					key={item}
					className={cn(
						'rounded-md px-2.5 py-1 text-xs whitespace-nowrap',
						item === active
							? 'bg-fd-muted font-medium text-fd-foreground'
							: 'text-fd-muted-foreground',
					)}
				>
					{item}
				</span>
			))}
		</div>
	);
}

/* ---------------------------------------------------------------- pieces --- */

const pillTones = {
	neutral: 'border-fd-border bg-fd-muted text-fd-muted-foreground',
	primary: 'border-fd-primary/30 bg-fd-primary/10 text-fd-primary-text',
	success: 'border-fd-success/30 bg-fd-success/10 text-fd-success',
	warning: 'border-fd-warning/35 bg-fd-warning/10 text-fd-warning',
	danger: 'border-fd-error/30 bg-fd-error/10 text-fd-error',
} as const;

export function Pill({
	children,
	tone = 'neutral',
	className,
}: {
	children: ReactNode;
	tone?: keyof typeof pillTones;
	className?: string;
}) {
	return (
		<span
			className={cn(
				'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] leading-[1.5] font-medium whitespace-nowrap',
				pillTones[tone],
				className,
			)}
		>
			{children}
		</span>
	);
}

export function Stat({
	label,
	value,
	hint,
	className,
}: {
	label: string;
	value: ReactNode;
	hint?: string;
	className?: string;
}) {
	return (
		<div className={cn('flex min-w-0 flex-col gap-0.5', className)}>
			<span className={uiLabelClass}>{label}</span>
			<span className={cn('text-lg leading-tight', uiValueClass)}>{value}</span>
			{hint ? <span className="text-[11px] text-fd-muted-foreground">{hint}</span> : null}
		</div>
	);
}

export function ListRow({ children, className }: { children: ReactNode; className?: string }) {
	return <div className={cn(uiRowClass, className)}>{children}</div>;
}

/** A compact progress meter. */
export function Bar({ value, className }: { value: number; className?: string }) {
	const clamped = Math.max(0, Math.min(100, value));
	return (
		<span className={cn('block h-1.5 w-full overflow-hidden rounded-full bg-fd-muted', className)} aria-hidden="true">
			<span className="block h-full rounded-full bg-fd-primary" style={{ width: `${clamped}%` }} />
		</span>
	);
}

/** A check / dash for permission matrices. */
export function AccessMark({ allowed, label }: { allowed: boolean; label: string }) {
	return allowed ? (
		<span className="inline-flex text-fd-primary-text">
			<Check className="size-4" aria-hidden="true" />
			<span className="sr-only">{label}</span>
		</span>
	) : (
		<span className="inline-flex text-fd-border">
			<Minus className="size-4" aria-hidden="true" />
			<span className="sr-only">{label}</span>
		</span>
	);
}

/**
 * A deterministic sparkline. No data fetching, no invented trend claims — it is
 * a surface for a labelled figure that sits beside it.
 */
export function Spark({ points, className }: { points: number[]; className?: string }) {
	const max = Math.max(...points);
	const min = Math.min(...points);
	const span = max - min || 1;
	const coords = points.map((point, index) => {
		const x = (index / (points.length - 1)) * 100;
		const y = 30 - ((point - min) / span) * 26 - 2;
		return `${x.toFixed(2)},${y.toFixed(2)}`;
	});
	const line = coords.join(' ');
	const area = `0,30 ${line} 100,30`;

	return (
		<svg
			viewBox="0 0 100 30"
			preserveAspectRatio="none"
			className={cn('h-14 w-full', className)}
			aria-hidden="true"
			focusable="false"
		>
			<polygon points={area} className="fill-fd-primary/10" />
			<polyline
				points={line}
				fill="none"
				className="stroke-fd-primary"
				strokeWidth="1.4"
				strokeLinecap="round"
				strokeLinejoin="round"
				vectorEffect="non-scaling-stroke"
			/>
		</svg>
	);
}