import { cn } from '@/lib/utils';

/**
 * Framed screenshot figure: a light plate so panel captures and SVGs read the
 * same on either theme, with an optional caption beneath the frame.
 */
export function Shot({
	src,
	alt,
	width,
	height,
	caption,
	className,
}: {
	src: string;
	alt: string;
	width: number;
	height: number;
	caption?: string;
	className?: string;
}) {
	return (
		<figure className={cn('m-0 flex flex-col gap-2.5', className)}>
			<div className="overflow-hidden rounded-2xl border border-fd-border bg-fd-card">
				<img
					src={src}
					alt={alt}
					width={width}
					height={height}
					loading="lazy"
					decoding="async"
					className="block h-auto w-full"
				/>
			</div>
			{caption ? (
				<figcaption className="text-[12.5px] leading-[1.55] text-fd-muted-foreground [text-wrap:pretty]">
					{caption}
				</figcaption>
			) : null}
		</figure>
	);
}
