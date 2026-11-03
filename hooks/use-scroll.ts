'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks whether the window has scrolled past a threshold.
 * Hysteresis (a lower threshold on the way up) prevents flicker
 * when the page sits right on the boundary.
 */
export function useScroll(downThreshold: number, upThreshold?: number) {
	const [scrolled, setScrolled] = useState(false);
	const scrollUpThreshold = upThreshold ?? downThreshold / 2;

	useEffect(() => {
		const handleScroll = () => {
			const y = window.scrollY;
			setScrolled(prev => {
				if (prev) return y > scrollUpThreshold;
				return y > downThreshold;
			});
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	}, [downThreshold, scrollUpThreshold]);

	return scrolled;
}
