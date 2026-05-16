import { PanelCard } from "@/components/panel-card";
import { SiteShell } from "@/components/site-shell";
import { subscriptionPlans } from "@/lib/platform-data";
import { entitlementMatrix } from "@/lib/subscription-model";
import { featureFlags } from "@/lib/env";

export default function BillingPage() {
  return (
    <SiteShell
      current="/billing"
      title="Subscription controls that feel transparent and worth paying for."
      subtitle="Billing is framed around clear entitlements, user value, and upgrade logic so visitors understand what changes when they move from free to paid plans."
      aside={
        <div className="signalBoard">
          <div className="signalRow">
            <span>Billing Provider</span>
            <strong>{featureFlags.hasBilling ? "Ready to Wire" : "Awaiting Live Price IDs"}</strong>
          </div>
        </div>
      }
    >
      <section className="stackSection">
        <div className="cardGrid wide">
          {subscriptionPlans.map((plan) => (
            <PanelCard key={plan.name} title={`${plan.name} · ${plan.price}`}>
              <p>{plan.audience}</p>
              <ul className="plainList">
                {plan.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </PanelCard>
          ))}
        </div>
      </section>

      <section className="stackSection">
        <div className="cardGrid wide">
          {Object.entries(entitlementMatrix).map(([plan, entitlements]) => (
            <PanelCard key={plan} title={`${plan.toUpperCase()} Entitlements`}>
              <ul className="plainList">
                {entitlements.map((entitlement) => (
                  <li key={entitlement.key}>
                    <strong>{entitlement.title}:</strong> {entitlement.description}
                  </li>
                ))}
              </ul>
            </PanelCard>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
