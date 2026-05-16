import { PanelCard } from "@/components/panel-card";
import { SiteShell } from "@/components/site-shell";
import { StatsRow } from "@/components/stats-row";
import { adminStats } from "@/lib/platform-data";

export default function AdminPage() {
  return (
    <SiteShell
      current="/admin"
      title="Admin panel for governance, moderation, and platform trust."
      subtitle="The admin experience is built to help operators review abuse, manage subscriptions, supervise team workspaces, and maintain a professional cybersecurity product posture."
      aside={<StatsRow stats={adminStats} />}
    >
      <section className="stackSection">
        <div className="tripleGrid">
          <PanelCard title="Moderation Queue">
            <p>
              Review flagged investigations, abusive usage reports, and risky content before it
              damages trust in the platform.
            </p>
          </PanelCard>
          <PanelCard title="Subscription Ops">
            <p>
              Monitor plan distribution, failed renewals, team provisioning, and entitlement
              overrides from a single governance surface.
            </p>
          </PanelCard>
          <PanelCard title="Audit and Compliance">
            <p>
              Keep audit events, access history, deletion requests, and admin actions visible
              for internal accountability.
            </p>
          </PanelCard>
        </div>
      </section>

      <section className="stackSection">
        <PanelCard title="How to use and value">
          <div className="splitGrid">
            <div>
              <h3>How to use</h3>
              <p>
                Triage moderation items first, review unusual activity, then manage users,
                organizations, and subscription health before handling escalations.
              </p>
            </div>
            <div>
              <h3>Benefits</h3>
              <p>
                The admin panel helps the platform feel trustworthy to both users and paying
                teams because governance is visible and operationally mature.
              </p>
            </div>
          </div>
        </PanelCard>
      </section>
    </SiteShell>
  );
}
