import { PanelCard } from "@/components/panel-card";
import { SiteShell } from "@/components/site-shell";
import { AnalysisTool } from "@/components/analysis-tool";

const intelligenceModules = [
  {
    title: "Dork Explorer Pro",
    howToUse:
      "Choose a target or theme, launch guided audit packs, save high-value queries, and convert your working set into report-ready evidence.",
    benefits:
      "Users get faster discovery, better organization, and less repeated manual work every time they return."
  },
  {
    title: "Dark Web Monitoring",
    howToUse:
      "Define a company, domain, executive, or email pattern, then create monitoring packs that keep searches and breach triage connected to the same target.",
    benefits:
      "Visitors understand the value immediately because the outcome is framed as exposure awareness, continuity, and prioritized investigation."
  },
  {
    title: "Workflow Automation",
    howToUse:
      "Use saved templates, repeatable tags, and subscription-aware automation triggers to cut down repetitive setup steps.",
    benefits:
      "Operators spend more time reviewing signals and less time rebuilding the same searches."
  }
];

export default function IntelligencePage() {
  return (
    <SiteShell
      current="/intelligence"
      title="Threat intelligence workflows that explain themselves clearly."
      subtitle="This section turns your strongest tools into guided product experiences so users know how to use them and why the output matters."
    >
      <section className="stackSection">
        <AnalysisTool />
      </section>

      <section className="stackSection">
        <div className="cardGrid">
          {intelligenceModules.map((module) => (
            <PanelCard key={module.title} title={module.title}>
              <h3>How to use</h3>
              <p>{module.howToUse}</p>
              <h3>Benefits</h3>
              <p>{module.benefits}</p>
            </PanelCard>
          ))}
        </div>
      </section>

      <section className="stackSection">
        <div className="splitGrid">
          <PanelCard title="Monitoring Board">
            <ul className="plainList">
              <li>Target-based monitoring packs for domains, brands, and people.</li>
              <li>Severity scoring and owner assignment for meaningful hits.</li>
              <li>Saved launch patterns across dark web and open-source workflows.</li>
            </ul>
          </PanelCard>
          <PanelCard title="Investigation Outcomes">
            <ul className="plainList">
              <li>Report-ready notes, screenshots, evidence links, and exports.</li>
              <li>Subscription-gated premium workflows for advanced monitoring.</li>
              <li>Team-aware sharing and review escalation for collaborative work.</li>
            </ul>
          </PanelCard>
        </div>
      </section>
    </SiteShell>
  );
}
