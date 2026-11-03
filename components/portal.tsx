'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

/**
 * Full-viewport overlay rendered into <body>, so it escapes the header's
 * stacking context and clipping. Locks body scroll (compensating for the
 * scrollbar) while mounted.
 */
function Portal({ className, ...props }: React.ComponentProps<'div'>) {
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);

		const originalOverflow = document.body.style.overflow;
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		const originalPaddingRight = document.body.style.paddingRight;

		document.body.style.overflow = 'hidden';
		if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

		return () => {
			document.body.style.overflow = originalOverflow;
			document.body.style.paddingRight = originalPaddingRight;
		};
	}, []);

	if (!mounted) return null;

	return createPortal(
		<div className={cn('fixed inset-0 isolate z-40 flex flex-col', className)} {...props} />,
		document.body,
	);
}

function PortalBackdrop({ className, ...props }: React.ComponentProps<'div'>) {
	return <div className={cn('fixed inset-0 -z-1', className)} {...props} />;
}

export { Portal, PortalBackdrop };
