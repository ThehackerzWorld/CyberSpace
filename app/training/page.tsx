import { PanelCard } from "@/components/panel-card";
import { SiteShell } from "@/components/site-shell";

export default function TrainingPage() {
  return (
    <SiteShell
      current="/training"
      title="Mind sharpening games that support better operator thinking."
      subtitle="Training is part of the product value, not a side distraction. Short drills and cyber-themed challenges help visitors stay engaged while improving the habits that make the rest of the platform more useful."
    >
      <section className="stackSection">
        <div className="cardGrid">
          <PanelCard title="How to use">
            <p>
              Use short games between research sessions to reset attention, improve recognition
              speed, and keep users returning to the platform for both learning and operations.
            </p>
          </PanelCard>
          <PanelCard title="Benefits">
            <p>
              Visitors feel there is more value here than a set of tools because the platform
              also helps sharpen thinking, not just run workflows.
            </p>
          </PanelCard>
          <PanelCard title="Suggested game categories">
            <ul className="plainList">
              <li>Pattern recognition and anomaly spotting</li>
              <li>Memory drills for indicators and evidence trails</li>
              <li>Timed decision challenges for triage thinking</li>
            </ul>
          </PanelCard>
        </div>
      </section>
    </SiteShell>
  );
}
