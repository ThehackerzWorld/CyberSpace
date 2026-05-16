import { PanelCard } from "@/components/panel-card";
import { SiteShell } from "@/components/site-shell";
import {
  productModules,
  securityFocusAreas,
  subscriptionPlans,
  visitorValuePillars
} from "@/lib/platform-data";
import { featureFlags } from "@/lib/env";

export default function HomePage() {
  return (
    <SiteShell
      current="/"
      title="A progressive cyber workspace that turns visitors into returning operators."
      subtitle="Digital Chirkut Platform is designed as a PWA-first security product with guided recon, dark web monitoring, saved investigations, admin governance, and subscription-aware user journeys."
      aside={
        <div className="signalBoard">
          <div className="signalRow">
            <span>Deployment Model</span>
            <strong>Vercel + Supabase</strong>
          </div>
          <div className="signalRow">
            <span>PWA Readiness</span>
            <strong>Enabled</strong>
          </div>
          <div className="signalRow">
            <span>Supabase Wiring</span>
            <strong>{featureFlags.hasSupabase ? "Configured" : "Awaiting Credentials"}</strong>
          </div>
          <div className="signalRow">
            <span>Email Delivery</span>
            <strong>{featureFlags.hasEmail ? "Configured" : "Awaiting SMTP"}</strong>
          </div>
        </div>
      }
    >
      <section id="value-proposition" className="stackSection">
        <div className="sectionHeading">
          <p className="eyebrow">Why Visitors Stay</p>
          <h2>Value is clear before a user signs in.</h2>
          <p>
            Each area is framed around what the user can do, how they use it, and what
            operational benefit they get from returning to the platform.
          </p>
        </div>
        <div className="cardGrid">
          {visitorValuePillars.map((pillar) => (
            <PanelCard key={pillar.title} title={pillar.title}>
              <p>{pillar.description}</p>
            </PanelCard>
          ))}
        </div>
      </section>

      <section id="platform-modules" className="stackSection">
        <div className="sectionHeading">
          <p className="eyebrow">Platform Modules</p>
          <h2>Built around real cybersecurity workflows.</h2>
        </div>
        <div className="cardGrid wide">
          {productModules.map((module) => (
            <PanelCard key={module.title} title={module.title}>
              <p>{module.summary}</p>
              <ul className="plainList">
                {module.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </PanelCard>
          ))}
        </div>
      </section>

      <section id="security-posture" className="stackSection">
        <div className="sectionHeading">
          <p className="eyebrow">Security Posture</p>
          <h2>Designed for credibility, governance, and repeat use.</h2>
        </div>
        <PanelCard title="Cybersecurity-first feature direction">
          <div className="splitGrid">
            <div>
              <h3>How to use</h3>
              <p>
                Move from guided tool use into saved reports, investigations, subscriptions,
                and team workflows without losing operational context between sessions.
              </p>
            </div>
            <div>
              <h3>Benefits</h3>
              <p>
                The platform feels more trustworthy because user continuity, access control,
                governance, and reporting are built into the product model instead of being
                treated as afterthoughts.
              </p>
            </div>
          </div>
          <ul className="plainList twoCol">
            {securityFocusAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </PanelCard>
      </section>

      <section id="subscription-model" className="stackSection">
        <div className="sectionHeading">
          <p className="eyebrow">Subscription Model</p>
          <h2>Clear paths from first visit to team-scale usage.</h2>
        </div>
        <div className="cardGrid wide">
          {subscriptionPlans.map((plan) => (
            <PanelCard key={plan.name} title={`${plan.name} · ${plan.price}`}>
              <p className="mutedLabel">{plan.audience}</p>
              <ul className="plainList">
                {plan.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <div className="tagPill">{plan.cta}</div>
            </PanelCard>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
