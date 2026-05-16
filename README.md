# Digital Chirkut Platform App

This folder contains the new Vercel-ready React/Node framework for the Digital Chirkut platform.

## Stack

- Next.js App Router
- React 19
- Supabase-ready data/auth integration
- PWA shell with service worker registration
- User panel, admin panel, billing panel, and subscription-ready architecture

## Why this app exists

The legacy PHP site stays untouched while this new framework is prepared for:

- Vercel deployment
- Supabase auth and database
- subscription and entitlement management
- role-based user/admin panels
- stronger cybersecurity product positioning

## Local setup

1. Copy `.env.example` to `.env.local`
2. Fill in the Supabase and SMTP values
3. Install dependencies:

```bash
npm install
```

4. Start the dev server:

```bash
npm run dev
```

## Key routes

- `/` marketing and platform value page
- `/dashboard` user home
- `/intelligence` threat workflows
- `/reports` saved reports and audit history
- `/billing` plans, entitlements, and subscription controls
- `/settings` security and profile controls
- `/admin` platform operations and moderation view
- `/verify` email-MFA verification handoff
- `/api/status` runtime status probe
- `/api/subscriptions/checkout` checkout integration handoff
- `/api/subscriptions/portal` customer portal integration handoff

## Supabase

The starter schema lives in `supabase/schema.sql`.

Core data domains already modeled:

- profiles and security preferences
- personal and team workspaces
- saved targets and monitoring packs
- reports and investigations
- subscriptions and entitlements
- moderation and audit events
- export requests for governance-aware users

## Product direction baked into the scaffold

- PWA-ready shell with manifest and service worker registration
- clear "How to use" and "Benefits" framing for visitors and users
- role-aware user panel and admin panel foundations
- subscription model structured for Starter, Pro, Team, and Enterprise
- governance-aware schema design with RLS starter policies

## What still needs live credentials

- Supabase project URL, anon key, service role key
- SMTP credentials for email flows
- subscription provider secrets such as Stripe, if you want live billing checkout

If you share the GitHub repo and Supabase credentials, this scaffold can be wired into the real database and deployment flow directly.
