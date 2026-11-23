'use client';

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useHomeLayout } from 'fumadocs-ui/layouts/home';
import { useTheme } from 'next-themes';
import { Portal, PortalBackdrop } from '@/components/portal';
import { useScroll } from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';
import { AnimatedThemeToggler } from '@/components/landing/animated-theme-toggler';

/** Nav-bar theme toggle: MagicUI's view-transition reveal, driven by next-themes. */
const themeToggleClass = cn(
	'inline-flex size-9 shrink-0 items-center justify-center rounded-lg',
	'text-[var(--landing-foreground)] cursor-pointer transition-colors duration-150',
	'hover:bg-[color-mix(in_srgb,var(--landing-foreground)_8%,transparent)]',
	'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27a9e1]',
	'[&_svg]:size-[18px]',
);

gsap.registerPlugin(useGSAP);

type Card = { title: string; description: string; href: string; meta: string };
type NavLink = { key: string; label: string; href: string; external?: true };
type NavMenu = { key: string; label: string; href: string; cards: Card[] };
type NavEntry = NavLink | NavMenu;

const isMenu = (entry: NavEntry): entry is NavMenu => 'cards' in entry;
const isExternal = (href: string) => /^https?:/.test(href);

const NAV: NavEntry[] = [
	{
		key: 'docs',
		label: 'Documentation',
		href: '/docs',
		cards: [
			{ meta: '01', title: 'Getting started', description: 'Install on Debian or Ubuntu and reach the panel.', href: '/docs/getting-started/' },
			{ meta: '02', title: 'Guides', description: 'Backups, migrations, themes and uninstallation.', href: '/docs/guides/' },
			{ meta: '03', title: 'Development', description: 'Work on the panel and ship your own changes.', href: '/docs/development/' },
			{ meta: '04', title: 'Updating', description: 'Move between releases without losing data.', href: '/docs/updating/' },
		],
	},
	{
		key: 'api',
		label: 'API Reference',
		href: '/docs/api',
		cards: [
			{ meta: '01', title: 'User management', description: 'Create, update, suspend and credit users.', href: '/docs/api/user-management/' },
			{ meta: '02', title: 'Server management', description: 'Create, suspend and resize servers.', href: '/docs/api/server-management/' },
			{ meta: '03', title: 'Product management', description: 'Define the plans your customers buy.', href: '/docs/api/product-management/' },
			{ meta: '04', title: 'Role management', description: 'Grant granular permissions to staff.', href: '/docs/api/role-management/' },
		],
	},
	{ key: 'blog', label: 'Blog', href: '/blog' },
	{ key: 'market', label: 'Extensions', href: 'https://market.ctrlpanel.gg', external: true },
	{ key: 'discord', label: 'Discord', href: 'https://discord.gg/ctrlpanel-gg-787829714483019826', external: true },
];

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), Math.max(min, max));

/** Internal links go through Next, external ones get a plain anchor. */
function SmartLink({
	href,
	className,
	children,
	onClick,
	...rest
}: { href: string; className?: string; children: ReactNode; onClick?: React.MouseEventHandler<HTMLAnchorElement> } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children' | 'onClick'>) {
	if (isExternal(href)) {
		return <a href={href} className={className} onClick={onClick} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>;
	}
	return <Link href={href} className={className} onClick={onClick} {...rest}>{children}</Link>;
}

/** Corner ticks that frame a card the way the ASCII artwork suggests. */
function Frame({ children }: { children: ReactNode }) {
	return (
		<span
			className={cn(
				'relative grid gap-1.5 border border-dashed border-b-0 border-[var(--sn-border)] px-4 pt-3.5 pb-[15px]',
				'transition-colors duration-150',
				'after:absolute after:-left-px after:-right-3 after:bottom-0 after:h-0 after:border-t after:border-dashed after:border-[var(--sn-border)] after:content-[""]',
				'group-hover:bg-[color-mix(in_srgb,var(--landing-foreground)_4%,transparent)]',
				'group-focus-visible:outline-2 group-focus-visible:outline-offset-[3px] group-focus-visible:outline-[#27a9e1]',
			)}
		>
			<span className="absolute -left-1 -top-[7px] bg-[var(--landing-background)] font-mono text-xs leading-none font-medium text-[var(--landing-muted)]" aria-hidden="true">+</span>
			<span className="absolute -right-1 -top-[7px] bg-[var(--landing-background)] font-mono text-xs leading-none font-medium text-[var(--landing-muted)]" aria-hidden="true">+</span>
			<span className="absolute -bottom-1.5 -left-1 bg-[var(--landing-background)] font-mono text-xs leading-none font-medium text-[var(--landing-muted)]" aria-hidden="true">+</span>
			<span className="absolute -right-3.5 -bottom-1.5 bg-[var(--landing-background)] font-mono text-xs leading-none font-medium text-[var(--landing-muted)]" aria-hidden="true">+</span>
			{children}
		</span>
	);
}

function CardLink({ card, onNavigate }: { card: Card; onNavigate: () => void }) {
	return (
		<SmartLink href={card.href} className="group block text-[var(--landing-foreground)] no-underline focus-visible:outline-none" data-card onClick={onNavigate}>
			<Frame>
				<span className="flex items-baseline gap-2">
					<span className="font-mono text-[10px] leading-none font-medium text-[var(--landing-muted)]">{card.meta}</span>
					<span className="text-sm font-semibold tracking-[-0.01em]">{card.title}</span>
				</span>
				<span className="block text-[12.5px] leading-[1.5] text-[var(--landing-muted)] [text-wrap:pretty]">{card.description}</span>
				<span className="absolute right-3.5 bottom-3 text-[13px] text-[var(--landing-muted)] transition-[transform,color] duration-150 group-hover:translate-x-[3px] group-hover:text-[var(--landing-foreground)]" aria-hidden="true">→</span>
			</Frame>
		</SmartLink>
	);
}

export function SiteNav() {
	const { navItems, slots } = useHomeLayout();
	const { resolvedTheme, setTheme } = useTheme();
	const root = useRef<HTMLElement>(null);
	const wrap = useRef<HTMLDivElement>(null);
	const list = useRef<HTMLUListElement>(null);
	const pill = useRef<HTMLSpanElement>(null);
	const popup = useRef<HTMLDivElement>(null);
	const content = useRef<HTMLDivElement>(null);
	const lastIndex = useRef<number | null>(null);
	const direction = useRef(1);
	const isOpen = useRef(false);
	const closeTimer = useRef<number | undefined>(undefined);
	const popupId = useId();
	const [openKey, setOpenKey] = useState<string | null>(null);
	const [activeKey, setActiveKey] = useState<string | null>(null);
	const [mobileOpen, setMobileOpen] = useState(false);
	const burger = useRef<HTMLButtonElement>(null);
	const drawer = useRef<HTMLDivElement>(null);

	// Scroll-reactive header chrome (borrowed from efferd header-3).
	const scrolled = useScroll(10);

	const activeMenu = NAV.find((entry): entry is NavMenu => isMenu(entry) && entry.key === activeKey);
	const open = openKey !== null;

	const { contextSafe } = useGSAP(() => {
		if (pill.current) gsap.set(pill.current, { autoAlpha: 0 });
		if (popup.current) gsap.set(popup.current, { autoAlpha: 0 });
	}, { scope: root });

	const movePill = contextSafe((target: HTMLElement) => {
		const l = list.current;
		const p = pill.current;
		if (!l || !p) return;
		const lr = l.getBoundingClientRect();
		const tr = target.getBoundingClientRect();
		gsap.to(p, { x: tr.left - lr.left, width: tr.width, autoAlpha: 1, duration: reducedMotion() ? 0 : 0.28, ease: 'power4.out', overwrite: 'auto' });
	});

	const hidePill = contextSafe(() => {
		if (!pill.current) return;
		gsap.to(pill.current, { autoAlpha: 0, duration: reducedMotion() ? 0 : 0.15, ease: 'power1.out', overwrite: 'auto' });
	});

	/** Position (and, while open, glide) the single popup under the hovered trigger. */
	const positionPopup = contextSafe((trigger: HTMLElement, animate: boolean) => {
		const w = wrap.current;
		const p = popup.current;
		if (!w || !p) return;
		const wr = w.getBoundingClientRect();
		const tr = trigger.getBoundingClientRect();
		const width = p.offsetWidth || 560;
		const x = clamp(tr.left - wr.left, 8, wr.width - width - 8);
		const origin = clamp(tr.left + tr.width / 2 - wr.left - x, 16, width - 16);
		const vars = { x, transformOrigin: `${origin}px top` };
		if (animate && !reducedMotion()) gsap.to(p, { ...vars, duration: 0.38, ease: 'power4.out', overwrite: 'auto' });
		else gsap.set(p, vars);
	});

	const openPanel = contextSafe((trigger: HTMLElement, index: number) => {
		const entry = NAV[index];
		if (!entry || !isMenu(entry)) return;
		const alreadyOpen = isOpen.current;
		direction.current = lastIndex.current === null || index >= lastIndex.current ? 1 : -1;
		lastIndex.current = index;
		isOpen.current = true;
		setOpenKey(entry.key);
		setActiveKey(entry.key);

		positionPopup(trigger, alreadyOpen);
		const p = popup.current;
		if (!p || alreadyOpen) return;
		gsap.killTweensOf(p);
		if (reducedMotion()) { gsap.set(p, { autoAlpha: 1 }); return; }
		gsap.fromTo(p, { autoAlpha: 0, y: -8, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.3, ease: 'power4.out' });
	});

	// Cards mount after the state commit, so the content slide runs in an effect keyed on the active menu.
	const animateCards = contextSafe(() => {
		const cards = content.current?.querySelectorAll('[data-card]');
		if (!cards || cards.length === 0) return;
		if (reducedMotion()) { gsap.set(cards, { autoAlpha: 1, x: 0 }); return; }
		gsap.fromTo(cards, { autoAlpha: 0, x: 20 * direction.current }, { autoAlpha: 1, x: 0, duration: 0.34, stagger: 0.04, ease: 'power2.out', delay: 0.05 });
	});

	useEffect(() => { if (activeKey) animateCards(); }, [activeKey, animateCards]);

	const closePanel = contextSafe(() => {
		const p = popup.current;
		isOpen.current = false;
		lastIndex.current = null;
		setOpenKey(null);
		hidePill();
		if (!p) { setActiveKey(null); return; }
		gsap.killTweensOf(p);
		if (reducedMotion()) { gsap.set(p, { autoAlpha: 0 }); setActiveKey(null); return; }
		gsap.to(p, { autoAlpha: 0, y: -6, scale: 0.98, duration: 0.16, ease: 'power2.out', onComplete: () => setActiveKey(null) });
	});

	const scheduleClose = () => {
		window.clearTimeout(closeTimer.current);
		closeTimer.current = window.setTimeout(() => closePanel(), 140);
	};
	const cancelClose = () => { window.clearTimeout(closeTimer.current); };

	useEffect(() => () => { window.clearTimeout(closeTimer.current); }, []);

	useEffect(() => {
		if (!open) return;
		const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') closePanel(); };
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [open, closePanel]);

	const closeMobile = useCallback(() => {
		setMobileOpen(false);
		requestAnimationFrame(() => burger.current?.focus());
	}, []);

	// Mobile drawer: return focus to the trigger, escape to close, and keep Tab inside.
	useEffect(() => {
		if (!mobileOpen) return;
		const panel = drawer.current;
		const focusables = () => Array.from(
			panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])') ?? [],
		).filter(el => el.offsetParent !== null);

		focusables()[0]?.focus();

		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') { event.preventDefault(); closeMobile(); return; }
			if (event.key !== 'Tab') return;
			const items = focusables();
			if (items.length === 0) return;
			const first = items[0];
			const last = items[items.length - 1];
			if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
			else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
		};

		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [mobileOpen, closeMobile]);

	// Collapse the drawer if the viewport grows back to the desktop breakpoint.
	useEffect(() => {
		const mq = window.matchMedia('(min-width: 1024px)');
		const onChange = () => { if (mq.matches) setMobileOpen(false); };
		mq.addEventListener('change', onChange);
		return () => mq.removeEventListener('change', onChange);
	}, []);

	const linkClass = cn(
		'relative z-[1] inline-flex h-9 items-center gap-1 rounded-[10px] px-3 text-sm leading-none font-medium',
		'whitespace-nowrap text-[var(--landing-muted)] no-underline transition-colors duration-150',
		'group [-webkit-tap-highlight-color:transparent]',
		'hover:text-[var(--landing-foreground)] aria-expanded:text-[var(--landing-foreground)]',
		'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27a9e1]',
	);

	return (
		<header id="nd-nav" ref={root} className="sticky top-0 z-40 h-14">
			<div
				ref={wrap}
				className={cn(
					'relative border-b border-transparent bg-transparent',
					'transition-[background-color,border-color,backdrop-filter] duration-300 motion-reduce:transition-none',
					scrolled && 'border-b-[color-mix(in_srgb,var(--landing-foreground)_12%,transparent)] bg-[color-mix(in_srgb,var(--landing-background)_85%,transparent)] backdrop-blur-lg',
				)}
				onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) scheduleClose(); }}
			>
				<div className="mx-auto flex h-14 w-full max-w-(--fd-layout-width) items-center gap-2 px-4">
					<slots.navTitle className="inline-flex shrink-0 items-center gap-2.5 font-semibold" />

					<ul ref={list} className="relative mx-3 flex list-none items-center gap-0.5 max-lg:hidden"
						onPointerLeave={() => { if (!isOpen.current) hidePill(); scheduleClose(); }}>
						<span ref={pill} className="invisible absolute left-0 top-1/2 -mt-[18px] h-9 rounded-[10px] bg-[color-mix(in_srgb,var(--landing-foreground)_7%,transparent)] shadow-[0_0_0_1px_color-mix(in_srgb,var(--landing-foreground)_10%,transparent)] pointer-events-none" aria-hidden="true" />
						{NAV.map((entry, index) => (
							<li key={entry.key}>
								{isMenu(entry) ? (
									<Link href={entry.href} className={linkClass} aria-haspopup="true" aria-expanded={openKey === entry.key} aria-controls={popupId}
										onPointerEnter={event => { movePill(event.currentTarget); cancelClose(); openPanel(event.currentTarget, index); }}
										onFocus={event => { movePill(event.currentTarget); openPanel(event.currentTarget, index); }}>
										{entry.label}<ChevronDown aria-hidden="true" className="size-3 shrink-0 opacity-70 transition-transform duration-200 group-aria-expanded:rotate-180" />
									</Link>
								) : (
									<SmartLink href={entry.href} className={linkClass}
										onPointerEnter={event => { movePill(event.currentTarget); scheduleClose(); }}
										onFocus={event => movePill(event.currentTarget)}>{entry.label}</SmartLink>
								)}
							</li>
						))}
					</ul>

					<div className="ml-auto flex items-center justify-end gap-1.5">
						{slots.searchTrigger && (
							<slots.searchTrigger.full hideIfDisabled className="hidden w-full max-w-[220px] rounded-full ps-2.5 lg:flex" />
						)}
						{navItems.filter(item => item.type === 'icon').map((item, index) => (
							<SmartLink key={index} href={item.url} aria-label={item.label}
								{...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
								className="inline-flex items-center rounded-md p-2 text-fd-muted-foreground transition-colors hover:text-fd-foreground [&_svg]:size-[18px]">{item.icon}</SmartLink>
						))}
						<AnimatedThemeToggler
							theme={resolvedTheme === 'light' ? 'light' : 'dark'}
							onThemeChange={value => setTheme(value)}
							aria-label="Toggle theme"
							className={themeToggleClass}
						/>
						<button ref={burger} type="button" className="inline-flex size-9 items-center justify-center rounded-lg border-0 bg-transparent text-[var(--landing-foreground)] cursor-pointer [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27a9e1] lg:hidden"
							aria-expanded={mobileOpen} aria-controls={`${popupId}-mobile`}
							onClick={() => setMobileOpen(value => !value)}>
							<span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
							<span className="relative grid size-[18px] place-items-center" aria-hidden="true">
								<Menu className={cn('col-start-1 row-start-1 size-[18px] transition-[opacity,transform] duration-150 motion-reduce:transition-none', mobileOpen ? 'scale-[0.6] opacity-0' : 'scale-100 opacity-100')} />
								<X className={cn('col-start-1 row-start-1 size-[18px] transition-[opacity,transform] duration-150 motion-reduce:transition-none', mobileOpen ? 'scale-100 opacity-100' : 'scale-[0.6] opacity-0')} />
							</span>
						</button>
					</div>
				</div>

				<div ref={popup} id={popupId} role="region" aria-label={activeMenu ? `${activeMenu.label} menu` : 'Menu'}
					className="invisible absolute left-0 top-full z-50 w-[min(560px,calc(100vw-32px))] pt-2.5 opacity-0 max-lg:hidden [--sn-border:color-mix(in_srgb,var(--landing-foreground)_20%,transparent)]"
					onPointerEnter={cancelClose} onPointerLeave={scheduleClose}>
					<div ref={content} className="border border-[color-mix(in_srgb,var(--landing-foreground)_14%,transparent)] bg-[color-mix(in_srgb,var(--landing-background)_94%,transparent)] p-4 backdrop-blur-md shadow-[0_24px_48px_-28px_rgb(0_0_0_/_0.55)]">
						<p className="mb-3 font-mono text-[11px] leading-none font-medium tracking-[0.12em] text-[var(--landing-muted)] uppercase">{activeMenu?.label ?? ''}</p>
						<div className="grid grid-cols-2 gap-2.5 max-[640px]:grid-cols-1">
							{activeMenu?.cards.map(card => (
								<CardLink key={card.title} card={card} onNavigate={() => closePanel()} />
							))}
						</div>
					</div>
				</div>
			</div>

			{mobileOpen && (
				<Portal style={{ top: '3.5rem', zIndex: 50 }}>
					<PortalBackdrop className="bg-[color-mix(in_srgb,var(--landing-background)_94%,transparent)] backdrop-blur-md opacity-100 transition-opacity duration-300 starting:opacity-0 motion-reduce:transition-none" onClick={closeMobile} />
					<div ref={drawer} id={`${popupId}-mobile`} role="dialog" aria-modal="true" aria-label="Menu"
						className="flex flex-1 flex-col gap-5 overflow-y-auto overscroll-contain bg-[var(--landing-background)] px-5 pt-5 pb-7 opacity-100 transition duration-300 ease-[cubic-bezier(0.2,0,0,1)] starting:scale-[0.97] starting:opacity-0 motion-reduce:scale-100 motion-reduce:transition-none">
						<nav className="grid gap-5">
							{NAV.map(entry => isMenu(entry) ? (
								<section key={entry.key} className="grid gap-1.5">
									<SmartLink href={entry.href} onClick={() => setMobileOpen(false)}
										className="text-[13px] font-semibold tracking-[-0.01em] text-[var(--landing-foreground)] no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27a9e1]">{entry.label}</SmartLink>
									<ul className="m-0 grid list-none gap-0.5 p-0">
										{entry.cards.map(card => (
											<li key={card.title}>
												<SmartLink href={card.href} onClick={() => setMobileOpen(false)}
													className="block rounded-md px-0.5 py-2 text-[15px] font-medium text-[var(--landing-muted)] no-underline transition-colors duration-150 hover:text-[var(--landing-foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27a9e1]">{card.title}</SmartLink>
											</li>
										))}
									</ul>
								</section>
							) : (
								<SmartLink key={entry.key} href={entry.href} onClick={() => setMobileOpen(false)}
									className="block rounded-md px-0.5 py-2 text-[15px] font-medium text-[var(--landing-muted)] no-underline transition-colors duration-150 hover:text-[var(--landing-foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27a9e1]">{entry.label}</SmartLink>
							))}
						</nav>
						<div className="mt-auto flex items-center gap-3">
							{slots.searchTrigger && (
								<slots.searchTrigger.full hideIfDisabled className="flex-1" />
							)}
							<AnimatedThemeToggler
								theme={resolvedTheme === 'light' ? 'light' : 'dark'}
								onThemeChange={value => setTheme(value)}
								aria-label="Toggle theme"
								className={themeToggleClass}
							/>
						</div>
					</div>
				</Portal>
			)}
		</header>
	);
}
