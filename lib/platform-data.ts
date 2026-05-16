import type { Route } from "next";

export const platformNavigation = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "User Panel" },
  { href: "/intelligence", label: "Threat Intel" },
  { href: "/training", label: "Training Lab" },
  { href: "/reports", label: "Reports" },
  { href: "/billing", label: "Subscription" },
  { href: "/settings", label: "Settings" },
  { href: "/admin", label: "Admin Panel" }
] satisfies ReadonlyArray<{ href: Route; label: string }>;

export const productModules = [
  {
    title: "Dork Explorer Workspace",
    summary: "Guided recon, saved dorks, report packaging, and target-based audit flows for authorized search-engine intelligence work.",
    benefits: ["Saved workspaces", "Report studio", "Exposure-focused workflows"]
  },
  {
    title: "Dark Web Intelligence",
    summary: "Breach triage, monitoring packs, onion-aware launch workflows, and investigation pipelines tied to named targets.",
    benefits: ["Exposure triage", "Monitoring packs", "Investigation continuity"]
  },
  {
    title: "Utility and Automation Studio",
    summary: "Creator and developer helpers that support security operations with faster content, formatting, previewing, and asset generation.",
    benefits: ["Faster publishing", "Operator utility", "Lower-friction workflows"]
  },
  {
    title: "Mind Sharpening Training Lab",
    summary: "Short cyber-themed games and drills keep users engaged while reinforcing observation, speed, memory, and analytical thinking.",
    benefits: ["Retention loops", "Training value", "Visitor engagement"]
  }
];

export const visitorValuePillars = [
  {
    title: "Immediate value",
    description: "Visitors understand what each module does, how to use it, and what they will get before they click into a workflow."
  },
  {
    title: "Account continuity",
    description: "Users keep saved work, investigations, reports, and billing state across sessions instead of starting over."
  },
  {
    title: "Cyber product posture",
    description: "The interface is designed to feel credible to security-conscious users through structured workflows, role separation, and defensive guidance."
  }
];

export const securityFocusAreas = [
  "Role-aware user and admin panels",
  "Email verification and step-up authentication flows",
  "Subscription entitlements tied to plan access",
  "Audit history, moderation queues, and workspace ownership",
  "Progressive web app shell for repeat operators"
];

export const subscriptionPlans = [
  {
    name: "Starter",
    price: "$0",
    audience: "Visitors exploring the platform",
    highlights: ["Limited saved workspaces", "Core intelligence modules", "Single-user history"],
    cta: "Start Free"
  },
  {
    name: "Pro",
    price: "$29/mo",
    audience: "Researchers and freelancers",
    highlights: ["Expanded saved reports", "Priority monitoring workflows", "Export-ready operational history"],
    cta: "Upgrade to Pro"
  },
  {
    name: "Team",
    price: "$99/mo",
    audience: "Boutique teams and small security groups",
    highlights: ["Shared investigations", "Team workspaces", "Admin moderation and access controls"],
    cta: "Launch Team Workspace"
  },
  {
    name: "Enterprise",
    price: "Custom",
    audience: "Organizations with stronger governance needs",
    highlights: ["Dedicated environments", "Custom entitlements", "Assisted rollout and governance support"],
    cta: "Talk to Sales"
  }
];

export const dashboardStats = [
  { label: "Saved Workspaces", value: "18" },
  { label: "Active Investigations", value: "4" },
  { label: "Open Monitoring Packs", value: "11" },
  { label: "Security Score", value: "A-" }
];

export const adminStats = [
  { label: "Active Subscribers", value: "124" },
  { label: "Pending Moderation", value: "7" },
  { label: "High-Risk Signals Today", value: "19" },
  { label: "Org Workspaces", value: "21" }
];
