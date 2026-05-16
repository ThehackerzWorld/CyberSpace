import { PanelCard } from "@/components/panel-card";
import { SiteShell } from "@/components/site-shell";
import { featureFlags } from "@/lib/env";

export default function SettingsPage() {
  return (
    <SiteShell
      current="/settings"
      title="Security settings centered on trust, account recovery, and safe access."
      subtitle="This area explains account controls clearly so users know what to do, why it matters, and what protection they get in return."
      aside={
        <div className="signalBoard">
          <div className="signalRow">
            <span>Email Delivery</span>
            <strong>{featureFlags.hasEmail ? "Ready for MFA and Recovery" : "SMTP Needed"}</strong>
          </div>
          <div className="signalRow">
            <span>Supabase Auth</span>
            <strong>{featureFlags.hasSupabase ? "Ready to Connect" : "Credentials Needed"}</strong>
          </div>
        </div>
      }
    >
      <section className="stackSection">
        <div className="cardGrid">
          <PanelCard title="How to use">
            <p>
              Review your verified email, enable mandatory step-up verification, and manage
              recovery paths so every future session is easier to trust.
            </p>
          </PanelCard>
          <PanelCard title="Benefits">
            <p>
              Visitors feel safer using the platform because identity checks, alerts, and
              recovery options are visible and understandable instead of hidden.
            </p>
          </PanelCard>
          <PanelCard title="Security Controls">
            <ul className="plainList">
              <li>Email MFA for sign-in and recovery</li>
              <li>Trusted device and active session review</li>
              <li>Export and deletion controls for compliance-aware users</li>
            </ul>
          </PanelCard>
        </div>
      </section>
    </SiteShell>
  );
}
