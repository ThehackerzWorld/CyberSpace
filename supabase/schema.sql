-- Digital Chirkut Platform
-- Supabase starter schema for user accounts, teams, reports, subscriptions, and governance.

create extension if not exists "pgcrypto";

create type public.plan_tier as enum ('starter', 'pro', 'team', 'enterprise');
create type public.subscription_status as enum ('trialing', 'active', 'past_due', 'canceled', 'incomplete');
create type public.workspace_role as enum ('owner', 'admin', 'analyst', 'viewer');
create type public.report_status as enum ('draft', 'ready', 'archived');
create type public.investigation_status as enum ('open', 'monitoring', 'contained', 'closed');
create type public.severity_level as enum ('low', 'medium', 'high', 'critical');
create type public.moderation_status as enum ('pending', 'reviewing', 'resolved', 'rejected');
create type public.auth_event_type as enum ('signup', 'signin', 'mfa_challenge', 'mfa_success', 'password_reset', 'session_revoked');

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text unique not null,
  full_name text,
  avatar_url text,
  company_name text,
  job_title text,
  role_label text default 'member',
  plan public.plan_tier not null default 'starter',
  is_email_verified boolean not null default false,
  is_mfa_required boolean not null default true,
  is_disposable_blocked boolean not null default true,
  marketing_opt_in boolean not null default false,
  last_seen_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  slug text unique,
  description text,
  plan public.plan_tier not null default 'starter',
  is_personal boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.workspace_memberships (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  role public.workspace_role not null default 'viewer',
  invited_by uuid references public.profiles (id) on delete set null,
  joined_at timestamptz not null default timezone('utc', now()),
  unique (workspace_id, user_id)
);

create table if not exists public.saved_targets (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  created_by uuid not null references public.profiles (id) on delete cascade,
  target_name text not null,
  target_type text not null,
  notes text,
  tags text[] not null default '{}',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.monitoring_packs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  created_by uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  target_value text not null,
  module_key text not null,
  severity public.severity_level not null default 'medium',
  config jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.report_entries (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  target_summary text,
  module_key text not null,
  status public.report_status not null default 'draft',
  severity public.severity_level not null default 'medium',
  body_markdown text not null default '',
  evidence jsonb not null default '[]'::jsonb,
  exported_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.investigations (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  owner_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  summary text,
  status public.investigation_status not null default 'open',
  severity public.severity_level not null default 'medium',
  linked_target_id uuid references public.saved_targets (id) on delete set null,
  due_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.investigation_notes (
  id uuid primary key default gen_random_uuid(),
  investigation_id uuid not null references public.investigations (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  note_markdown text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  provider text not null default 'stripe',
  provider_customer_id text,
  provider_subscription_id text,
  tier public.plan_tier not null default 'starter',
  status public.subscription_status not null default 'trialing',
  seats integer not null default 1,
  renews_at timestamptz,
  cancel_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.subscription_entitlements (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid not null references public.subscriptions (id) on delete cascade,
  key text not null,
  value jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  unique (subscription_id, key)
);

create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles (id) on delete set null,
  workspace_id uuid references public.workspaces (id) on delete cascade,
  event_type text not null,
  event_context jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.auth_security_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  event_type public.auth_event_type not null,
  ip_address inet,
  user_agent text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.moderation_queue (
  id uuid primary key default gen_random_uuid(),
  created_by uuid references public.profiles (id) on delete set null,
  workspace_id uuid references public.workspaces (id) on delete cascade,
  source_type text not null,
  source_id uuid,
  reason text not null,
  status public.moderation_status not null default 'pending',
  resolution_notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.data_export_requests (
  id uuid primary key default gen_random_uuid(),
  requested_by uuid not null references public.profiles (id) on delete cascade,
  workspace_id uuid references public.workspaces (id) on delete cascade,
  status text not null default 'pending',
  artifact_url text,
  created_at timestamptz not null default timezone('utc', now()),
  completed_at timestamptz
);

create or replace function public.handle_profile_created()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    coalesce(new.email, new.raw_user_meta_data ->> 'email'),
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  )
  on conflict (id) do nothing;

  insert into public.workspaces (owner_id, name, slug, is_personal)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'full_name', ''), split_part(coalesce(new.email, 'member'), '@', 1)) || ' Workspace',
    lower(replace(gen_random_uuid()::text, '-', '')),
    true
  );

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_profile_created();

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch before update on public.profiles for each row execute procedure public.touch_updated_at();
drop trigger if exists workspaces_touch on public.workspaces;
create trigger workspaces_touch before update on public.workspaces for each row execute procedure public.touch_updated_at();
drop trigger if exists saved_targets_touch on public.saved_targets;
create trigger saved_targets_touch before update on public.saved_targets for each row execute procedure public.touch_updated_at();
drop trigger if exists monitoring_packs_touch on public.monitoring_packs;
create trigger monitoring_packs_touch before update on public.monitoring_packs for each row execute procedure public.touch_updated_at();
drop trigger if exists report_entries_touch on public.report_entries;
create trigger report_entries_touch before update on public.report_entries for each row execute procedure public.touch_updated_at();
drop trigger if exists investigations_touch on public.investigations;
create trigger investigations_touch before update on public.investigations for each row execute procedure public.touch_updated_at();
drop trigger if exists subscriptions_touch on public.subscriptions;
create trigger subscriptions_touch before update on public.subscriptions for each row execute procedure public.touch_updated_at();
drop trigger if exists moderation_queue_touch on public.moderation_queue;
create trigger moderation_queue_touch before update on public.moderation_queue for each row execute procedure public.touch_updated_at();

alter table public.profiles enable row level security;
alter table public.workspaces enable row level security;
alter table public.workspace_memberships enable row level security;
alter table public.saved_targets enable row level security;
alter table public.monitoring_packs enable row level security;
alter table public.report_entries enable row level security;
alter table public.investigations enable row level security;
alter table public.investigation_notes enable row level security;
alter table public.subscriptions enable row level security;
alter table public.subscription_entitlements enable row level security;
alter table public.audit_events enable row level security;
alter table public.auth_security_events enable row level security;
alter table public.moderation_queue enable row level security;
alter table public.data_export_requests enable row level security;

create or replace function public.user_in_workspace(target_workspace uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.workspace_memberships wm
    where wm.workspace_id = target_workspace
      and wm.user_id = auth.uid()
  )
  or exists (
    select 1
    from public.workspaces w
    where w.id = target_workspace
      and w.owner_id = auth.uid()
  );
$$;

create policy "profiles are viewable by owner"
on public.profiles for select
using (id = auth.uid());

create policy "profiles are updateable by owner"
on public.profiles for update
using (id = auth.uid());

create policy "workspace read by members"
on public.workspaces for select
using (owner_id = auth.uid() or public.user_in_workspace(id));

create policy "workspace insert by owner"
on public.workspaces for insert
with check (owner_id = auth.uid());

create policy "workspace memberships read by members"
on public.workspace_memberships for select
using (user_id = auth.uid() or public.user_in_workspace(workspace_id));

create policy "member content read"
on public.saved_targets for select
using (public.user_in_workspace(workspace_id));
create policy "member content write"
on public.saved_targets for all
using (public.user_in_workspace(workspace_id))
with check (public.user_in_workspace(workspace_id));

create policy "monitoring pack access"
on public.monitoring_packs for all
using (public.user_in_workspace(workspace_id))
with check (public.user_in_workspace(workspace_id));

create policy "report access"
on public.report_entries for all
using (public.user_in_workspace(workspace_id))
with check (public.user_in_workspace(workspace_id));

create policy "investigation access"
on public.investigations for all
using (public.user_in_workspace(workspace_id))
with check (public.user_in_workspace(workspace_id));

create policy "investigation note access"
on public.investigation_notes for all
using (
  exists (
    select 1
    from public.investigations i
    where i.id = investigation_id
      and public.user_in_workspace(i.workspace_id)
  )
)
with check (
  exists (
    select 1
    from public.investigations i
    where i.id = investigation_id
      and public.user_in_workspace(i.workspace_id)
  )
);

create policy "subscription access"
on public.subscriptions for select
using (public.user_in_workspace(workspace_id));

create policy "entitlement access"
on public.subscription_entitlements for select
using (
  exists (
    select 1
    from public.subscriptions s
    where s.id = subscription_id
      and public.user_in_workspace(s.workspace_id)
  )
);

create policy "audit access"
on public.audit_events for select
using (workspace_id is null or public.user_in_workspace(workspace_id));

create policy "auth security owner access"
on public.auth_security_events for select
using (user_id = auth.uid());

create policy "moderation own workspace read"
on public.moderation_queue for select
using (workspace_id is null or public.user_in_workspace(workspace_id));

create policy "export requests owner access"
on public.data_export_requests for all
using (requested_by = auth.uid())
with check (requested_by = auth.uid());

create index if not exists idx_workspace_memberships_user on public.workspace_memberships (user_id);
create index if not exists idx_saved_targets_workspace on public.saved_targets (workspace_id);
create index if not exists idx_monitoring_packs_workspace on public.monitoring_packs (workspace_id);
create index if not exists idx_reports_workspace on public.report_entries (workspace_id, status);
create index if not exists idx_investigations_workspace on public.investigations (workspace_id, status);
create index if not exists idx_subscriptions_workspace on public.subscriptions (workspace_id, status);
create index if not exists idx_audit_events_workspace on public.audit_events (workspace_id, created_at desc);
