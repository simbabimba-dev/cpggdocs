import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { SiteNav } from '@/components/landing/site-nav';
import { LandingFooter } from '@/components/landing/landing-footer';
import { Hero, TrustStrip } from '@/components/landing/hero';
import { OneConsole } from '@/components/landing/one-console';
import { BillingEngine } from '@/components/landing/billing-engine';
import { Payments } from '@/components/landing/payments';
import { Storefront } from '@/components/landing/storefront';
import { Staff } from '@/components/landing/staff';
import { Community } from '@/components/landing/community';
import { Themes } from '@/components/landing/themes';
import { Api } from '@/components/landing/api';
import { Install } from '@/components/landing/install';
import { landingLayoutClass } from '@/components/landing/landing-styles';

/**
 * Landing page.
 *
 * One argument, in order: the product exists and is adopted (hero + proof), you
 * run it from one console, the billing engine is the differentiator, payments
 * and revenue, the client storefront, staff access, community, theming and
 * languages, automation, and finally the install path. The footer closes.
 *
 * Every section composes `foundation.ts` and `app-ui.tsx`; no section declares
 * its own palette, spacing scale or heading size.
 */
export default function Home() {
	return (
		<HomeLayout {...baseOptions()} slots={{ header: SiteNav }} className={landingLayoutClass}>
			<div id="nd-page" tabIndex={-1} className="relative">
				<Hero />
				<TrustStrip />

				<OneConsole />
				<BillingEngine />
				<Payments />
				<Storefront />
				<Staff />
				<Community />
				<Themes />
				<Api />
				<Install />

				<LandingFooter />
			</div>
		</HomeLayout>
	);
}