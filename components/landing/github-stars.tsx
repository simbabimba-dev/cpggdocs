'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import snapshot from '@/lib/github-stars.json';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/** Live GitHub star count, styled with the same button as the rest of the page. */
export function GitHubStars() {
	const [stars, setStars] = useState(snapshot.count);

	useEffect(() => {
		const controller = new AbortController();
		fetch('https://api.github.com/repos/Ctrlpanel-gg/panel', {
			headers: { Accept: 'application/vnd.github+json' },
			signal: controller.signal,
		})
			.then(response => response.ok ? response.json() : null)
			.then(data => {
				if (!controller.signal.aborted && Number.isSafeInteger(data?.stargazers_count) && data.stargazers_count >= 0) {
					setStars(data.stargazers_count);
				}
			})
			.catch(() => { /* Keep the verified count if GitHub is unavailable or rate limited. */ });
		return () => controller.abort();
	}, []);

	return (
		<a
			href="https://github.com/Ctrlpanel-gg/panel"
			target="_blank"
			rel="noopener noreferrer"
			className={cn(buttonVariants({ variant: 'outline' }), 'group')}
		>
			<Star aria-hidden="true" className="size-4" />
			<span>Star on GitHub</span>
			<span
				className="ml-1 border-l border-fd-border pl-2 text-xs font-semibold tabular-nums text-fd-muted-foreground"
				aria-label={`${stars.toLocaleString('en-US')} stars`}
			>
				{stars.toLocaleString('en-US')}
			</span>
		</a>
	);
}