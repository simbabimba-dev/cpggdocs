import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { SiteNav } from '@/components/landing/site-nav';
import { LandingFooter } from '@/components/landing/landing-footer';
import { Hero } from '@/components/landing/hero';
import { DashboardPreview } from '@/components/landing/dashboard-preview';
import { AdministrationSection } from '@/components/landing/administration-section';
import { PaymentsSection } from '@/components/landing/payments-section';
import { ThemesSection } from '@/components/landing/themes-section';
import './landing.css';

/** A band of the column: content closed by a hairline rule with square nodes. */
function Band({ children }: { children: ReactNode }) {
  return (
    <div className="landing-band">
      {children}
      <span className="landing-frame-mark landing-frame-mark-left" aria-hidden="true" />
      <span className="landing-frame-mark landing-frame-mark-right" aria-hidden="true" />
    </div>
  );
}

/**
 * Landing page: the hero, the live panel, then administration, payments and
 * themes, laid on a hairline grid.
 */
export default function Home() {
  return (
    <HomeLayout {...baseOptions()} slots={{ header: SiteNav }} className="landing-layout">
      <div id="nd-page" tabIndex={-1} className="relative">
        <div className="landing-grid">
          <Band><Hero /></Band>

          <Band>
            <section className="landing-product" aria-label="CtrlPanel dashboard preview">
              <DashboardPreview />
            </section>
          </Band>

          <Band><AdministrationSection /></Band>
          <Band><PaymentsSection /></Band>
          <Band><ThemesSection /></Band>
        </div>

        <LandingFooter />
      </div>
    </HomeLayout>
  );
}
