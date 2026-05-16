import { PanelCard } from "@/components/panel-card";
import { SiteShell } from "@/components/site-shell";
import { StatsRow } from "@/components/stats-row";
import { dashboardStats } from "@/lib/platform-data";

const workflowCards = [
  {
    title: "How to use",
    description:
      "Start from your saved workspaces, continue into investigations, and package key findings into reports so your work stays connected instead of scattered."
  },
  {
    title: "What users get",
    description:
      "Returning users gain continuity across dork research, dark web monitoring, saved targets, exports, and billing-aware access to premium workflows."
  },
  {
    title: "Recommended next action",
    description:
      "Pin active targets, reopen high-priority monitoring packs, and convert notable findings into internal-ready reports with ownership and timestamps."
  }
];

export default function DashboardPage() {
  return (
    <SiteShell
      current="/dashboard"
      title="User Panel built for continuity, not one-time sessions."
      subtitle="This dashboard is where saved work, active targets, investigations, and subscription-aware features come together in one command center."
      aside={<StatsRow stats={dashboardStats} />}
    >
      <section className="stackSection">
        <div className="cardGrid">
          {workflowCards.map((card) => (
            <PanelCard key={card.title} title={card.title}>
              <p>{card.description}</p>
            </PanelCard>
          ))}
        </div>
      </section>

      <section className="stackSection">
        <div className="tripleGrid">
          <PanelCard title="Workspace Queue">
            <ul className="plainList">
              <li>Resume saved Dork Explorer investigations by target, tag, or urgency.</li>
              <li>Reopen saved Dark Web monitoring packs tied to named entities.</li>
              <li>Track what was reviewed, exported, or escalated.</li>
            </ul>
          </PanelCard>
          <PanelCard title="Investigation Flow">
            <ul className="plainList">
              <li>Promote saved observations into formal investigations.</li>
              <li>Attach notes, severity, ownership, and due dates.</li>
              <li>Move from evidence gathering to team-visible reporting.</li>
            </ul>
          </PanelCard>
          <PanelCard title="Security Center">
            <ul className="plainList">
              <li>Manage MFA, verified email state, and session hygiene.</li>
              <li>Review recent account activity and access events.</li>
              <li>Understand which subscription features are active for your account.</li>
            </ul>
          </PanelCard>
        </div>
      </section>
    </SiteShell>
  );
}
