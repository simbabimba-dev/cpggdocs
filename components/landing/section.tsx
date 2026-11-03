'use client';

import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import { anchorClass, sectionClass, sectionHeadClass, titleClass, ledeClass } from '@/components/landing/foundation';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * A landing section.
 *
 * Wraps every section with the shared container, vertical rhythm and heading
 * rules, and runs one restrained entrance: children marked `data-reveal` rise
 * and fade in, staggered, once the section enters the viewport. With reduced
 * motion (or no JavaScript) the content is simply visible.
 */
export function Section({
	id,
	title,
	lede,
	children,
	className,
	headingClassName,
}: {
	id: string;
	title: ReactNode;
	lede?: ReactNode;
	children: ReactNode;
	className?: string;
	headingClassName?: string;
}) {
	const ref = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			const targets = ref.current?.querySelectorAll('[data-reveal]');
			if (!targets || targets.length === 0) return;

			if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
				gsap.set(targets, { autoAlpha: 1, y: 0 });
				return;
			}

			gsap.set(targets, { autoAlpha: 0, y: 22 });
			ScrollTrigger.create({
				trigger: ref.current,
				start: 'top 78%',
				once: true,
				onEnter: () => {
					gsap.to(targets, {
						autoAlpha: 1,
						y: 0,
						duration: 0.6,
						ease: 'power2.out',
						stagger: 0.07,
						overwrite: true,
					});
				},
			});
		},
		{ scope: ref },
	);

	return (
		<section id={id} ref={ref} aria-labelledby={`${id}-title`} className={cn(anchorClass, className)}>
			<div className={cn('mx-auto w-full max-w-[1120px] px-4 sm:px-6', sectionClass)}>
				<div className="flex flex-col gap-8 md:gap-10">
					<div className={sectionHeadClass} data-reveal>
						<h2 id={`${id}-title`} className={cn(titleClass, headingClassName)}>
							{title}
						</h2>
						{lede ? <p className={ledeClass}>{lede}</p> : null}
					</div>
					{children}
				</div>
			</div>
		</section>
	);
}

/** A titled figure inside a section (the thing that proves the claim). */
export function Figure({ children, className, label }: { children: ReactNode; className?: string; label?: string }) {
	return (
		<figure data-reveal className={cn('m-0 flex flex-col gap-3', className)}>
			{children}
			{label ? (
				<figcaption className="text-[13px] leading-relaxed text-fd-muted-foreground">{label}</figcaption>
			) : null}
		</figure>
	);
}
