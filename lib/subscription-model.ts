export type PlanKey = "starter" | "pro" | "team" | "enterprise";

export type Entitlement = {
  key: string;
  title: string;
  description: string;
};

export const entitlementMatrix: Record<PlanKey, Entitlement[]> = {
  starter: [
    { key: "core_modules", title: "Core modules", description: "Access Dork Explorer, Dark Web Intelligence, and utility flows." },
    { key: "basic_history", title: "Basic history", description: "Keep a short rolling history of saved work and reports." }
  ],
  pro: [
    { key: "core_modules", title: "Core modules", description: "All standard modules unlocked." },
    { key: "extended_reports", title: "Extended reports", description: "Longer report retention and richer export packaging." },
    { key: "priority_monitoring", title: "Priority monitoring", description: "More saved monitoring packs and workflow automation." }
  ],
  team: [
    { key: "shared_workspaces", title: "Shared workspaces", description: "Collaborative investigations and role-aware team access." },
    { key: "member_admin", title: "Member controls", description: "Seat-aware governance, team invites, and manager review flows." },
    { key: "reporting_depth", title: "Reporting depth", description: "Operational history and internal-ready reporting views." }
  ],
  enterprise: [
    { key: "custom_roles", title: "Custom roles", description: "Granular governance, internal approval, and custom access models." },
    { key: "private_rollout", title: "Private rollout", description: "Deployment and onboarding support tuned for internal security teams." },
    { key: "extended_integrations", title: "Extended integrations", description: "Provider, billing, and operational controls matched to enterprise needs." }
  ]
};
