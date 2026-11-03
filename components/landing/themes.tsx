import { ArrowUpRight, Languages, Paintbrush, Upload } from 'lucide-react';
import { Section } from '@/components/landing/section';
import { AppWindow, ListRow, Pill, uiLabelClass } from '@/components/landing/app-ui';
import { bodyClass, metaClass, splitClass } from '@/components/landing/foundation';
import { cn } from '@/lib/utils';

/**
 * P9 — Themes and i18n.
 *
 * Claim: make it yours, in your language. Proof: the two shipped themes, the
 * theme editor controls, and the locale set that actually lives in the repo.
 */

const themes = [
	{ name: 'Default', note: 'The panel out of the box', chips: ['bg-fd-primary', 'bg-fd-foreground', 'bg-fd-muted'], active: true },
	{ name: 'BlueInfinity', note: 'Deeper blue, darker chrome', chips: ['bg-[#1d4ed8]', 'bg-[#0f172a]', 'bg-[#334155]'], active: false },
];

const editor = [
	{ label: 'Accent', value: '#27a9e1' },
	{ label: 'Layout', value: 'Sidebar' },
	{ label: 'Typography', value: 'Theme CSS' },
	{ label: 'Logo', value: 'icon uploaded' },
];

const locales = [
	'English', 'Deutsch', 'Español', 'Français', 'Italiano', 'Nederlands', 'Polski', 'Português',
	'Română', 'Русский', 'Українська', 'Српски', 'Hrvatski', 'Bosanski', 'Čeština', 'Slovenčina',
	'Magyar', 'Svenska', 'Türkçe', 'Български', 'Hindi', 'Hebrew', '中文',
];

export function Themes() {
	return (
		<Section
			id="themes"
			title="Make the panel look like your brand."
			lede="Two themes ship in the box, a theme editor handles the rest, and the interface speaks the languages your customers do."
		>
			<div className={splitClass}>
				<div className="flex flex-col gap-4" data-reveal>
					<AppWindow label="ctrlpanel / appearance" right={<Pill tone="primary">theme editor</Pill>}>
						<div className="flex flex-col gap-4 p-4">
							<div className="grid grid-cols-2 gap-2">
								{themes.map(theme => (
									<div
										key={theme.name}
										className={cn(
											'flex flex-col gap-2 rounded-xl border p-3',
											theme.active ? 'border-fd-primary bg-fd-primary/5' : 'border-fd-border',
										)}
									>
										<div className="flex items-center justify-between gap-2">
											<p className="text-sm font-medium">{theme.name}</p>
											{theme.active ? <Pill tone="primary">active</Pill> : null}
										</div>
										<div className="flex gap-1.5" aria-hidden="true">
											{theme.chips.map(chip => (
												<span key={chip} className={cn('size-5 rounded-md border border-fd-border', chip)} />
											))}
										</div>
										<p className="text-[11px] leading-relaxed text-fd-muted-foreground">{theme.note}</p>
									</div>
								))}
							</div>

							<div>
								<p className={cn(uiLabelClass, 'mb-1.5')}>Theme editor</p>
								<div className="overflow-hidden rounded-lg border border-fd-border">
									{editor.map(row => (
										<ListRow key={row.label} className="justify-between py-2">
											<span className="text-fd-muted-foreground">{row.label}</span>
											<span className="font-medium">{row.value}</span>
										</ListRow>
									))}
								</div>
							</div>

							<div className="rounded-xl border border-dashed border-fd-border p-3">
								<div className="flex items-center gap-2">
									<Paintbrush className="size-4 text-fd-primary-text" aria-hidden="true" />
									<p className="text-sm font-medium">Preview</p>
									<Pill className="ml-auto">Default</Pill>
								</div>
								<div className="mt-3 rounded-lg border border-fd-border bg-fd-card">
									<div className="flex items-center gap-2 border-b border-fd-border px-3 py-2">
										<span className="size-2 rounded-[3px] bg-fd-primary" aria-hidden="true" />
										<span className="h-2 w-16 rounded-full bg-fd-muted" aria-hidden="true" />
										<span className="ml-auto h-2 w-8 rounded-full bg-fd-primary/40" aria-hidden="true" />
									</div>
									<div className="grid grid-cols-3 gap-2 p-3">
										<span className="h-8 rounded-md bg-fd-muted" aria-hidden="true" />
										<span className="h-8 rounded-md bg-fd-muted" aria-hidden="true" />
										<span className="h-8 rounded-md bg-fd-primary/15" aria-hidden="true" />
									</div>
								</div>
							</div>
						</div>
					</AppWindow>
				</div>

				<div className="flex flex-col gap-6" data-reveal>
					<p className={bodyClass}>
						Themes are ordinary Laravel Themer packages: Blade layouts, CSS and assets. Start from the
						generator, change the layout and type, and ship it without forking the panel.
					</p>

					<div className="flex flex-col gap-3 rounded-xl border border-fd-border p-4">
						<div className="flex items-center gap-2">
							<Upload className="size-4 text-fd-muted-foreground" aria-hidden="true" />
							<p className="text-sm font-medium">Icons and assets</p>
						</div>
						<p className="text-[13px] leading-relaxed text-fd-muted-foreground">
							Upload the panel icon from settings, then keep the rest of the assets in the theme. The
							active theme is a config value, so it can be switched per environment.
						</p>
						<a
							href="/docs/guides/themes/"
							className="inline-flex items-center gap-1 text-sm font-medium text-fd-primary-text hover:underline"
						>
							Create a theme
							<ArrowUpRight className="size-3.5" aria-hidden="true" />
						</a>
					</div>

					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-2">
							<Languages className="size-4 text-fd-muted-foreground" aria-hidden="true" />
							<p className="text-sm font-medium">23 languages</p>
							<Pill className="ml-auto">community translated</Pill>
						</div>
						<ul className="flex flex-wrap gap-1.5" aria-label="Included languages">
							{locales.map(locale => (
								<li
									key={locale}
									className="rounded-md border border-fd-border bg-fd-card px-2 py-1 text-[11px] text-fd-muted-foreground"
								>
									{locale}
								</li>
							))}
						</ul>
						<p className={metaClass}>
							Not all locales are complete. Translations live in the repo and are always open to
							corrections.
						</p>
					</div>
				</div>
			</div>
		</Section>
	);
}