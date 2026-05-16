import { PanelCard } from "@/components/panel-card";
import { SiteShell } from "@/components/site-shell";

export default function ReportsPage() {
  return (
    <SiteShell
      current="/reports"
      title="Reports that carry operational context forward."
      subtitle="Saved reports, audit history, and export-ready deliverables help users prove value and keep investigations understandable for future review."
    >
      <section className="stackSection">
        <div className="cardGrid">
          <PanelCard title="How to use">
            <p>
              Convert saved findings into structured reports with target details, severity,
              defensive guidance, timestamps, and ownership so a search session turns into a
              reusable artifact.
            </p>
          </PanelCard>
          <PanelCard title="Benefits">
            <p>
              Users get professional-looking outputs, searchable history, and a stronger sense
              that the platform protects the value of their work rather than letting it vanish.
            </p>
          </PanelCard>
          <PanelCard title="What belongs here">
            <ul className="plainList">
              <li>Recon summaries and saved dork collections</li>
              <li>Breach exposure reviews and monitoring outcomes</li>
              <li>Internal handoff notes and remediation guidance</li>
            </ul>
          </PanelCard>
        </div>
      </section>
    </SiteShell>
  );
}
