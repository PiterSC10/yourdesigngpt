-- Apply AFTER schema.sql. Run as the Supabase database administrator.
-- No credentials or commercial data belong in this migration.
begin;
create schema if not exists crm_private;
revoke all on schema crm_private from public;
grant usage on schema crm_private to authenticated;
create or replace function crm_private.is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
 select exists(select 1 from auth.users u where u.id = auth.uid()
 and lower(u.email) = 'iampetersc@gmail.com' and u.email_confirmed_at is not null);
$$;
revoke all on function crm_private.is_admin() from public;
grant execute on function crm_private.is_admin() to authenticated;
-- RESTRICTIVE policy also covers the existing permissive owner policies.
drop policy if exists admin_only on public.crm_leads;
create policy admin_only on public.crm_leads as restrictive for all to authenticated
using(crm_private.is_admin()) with check(crm_private.is_admin());
alter table public.crm_leads add column if not exists review_status text not null default 'Pendiente'
 check (review_status in ('Pendiente','Revisado','Revisados sin contacto'));
alter table public.crm_leads add column if not exists latitude double precision check(latitude between -90 and 90);
alter table public.crm_leads add column if not exists longitude double precision check(longitude between -180 and 180);
alter table public.crm_leads add column if not exists location_verified_at timestamptz;
alter table public.crm_leads add column if not exists location_source text;
create table if not exists public.crm_verifications (
 id uuid primary key default gen_random_uuid(), lead_id uuid not null references public.crm_leads(id) on delete cascade,
 kind text not null check(kind in ('email','website','activity','location','permission')),
 result text not null, source_url text, evidence text not null,
 verified_at timestamptz not null default now()
);
create table if not exists public.crm_followups (
 id uuid primary key default gen_random_uuid(), lead_id uuid not null references public.crm_leads(id) on delete cascade,
 title text not null check(length(trim(title))>0), due_at timestamptz not null,
 completed_at timestamptz, created_at timestamptz not null default now()
);
create table if not exists public.crm_notes (
 id uuid primary key default gen_random_uuid(), lead_id uuid not null references public.crm_leads(id) on delete cascade,
 body text not null check(length(trim(body))>0), created_at timestamptz not null default now()
);
create table if not exists public.crm_proposals (
 id uuid primary key default gen_random_uuid(), lead_id uuid not null references public.crm_leads(id) on delete cascade,
 title text not null, sector text, body text not null default '', mockup_path text,
 status text not null default 'Borrador' check(status in ('Borrador','Revisada','Aceptada','Descartada')),
 created_at timestamptz not null default now()
);
create table if not exists public.crm_communications (
 id uuid primary key default gen_random_uuid(), lead_id uuid not null references public.crm_leads(id) on delete cascade,
 provider text not null default 'gmail', provider_message_id text unique, provider_thread_id text,
 direction text not null check(direction in ('draft','inbound','outbound')),
 subject text not null default '', occurred_at timestamptz not null,
 read_at timestamptz, created_at timestamptz not null default now()
);
create table if not exists public.crm_history (
 id uuid primary key default gen_random_uuid(), lead_id uuid references public.crm_leads(id) on delete set null,
 actor_id uuid, action text not null, occurred_at timestamptz not null default now()
);
do $block$
declare t text;
begin
 foreach t in array array['crm_verifications','crm_followups','crm_notes','crm_proposals','crm_communications'] loop
 execute format('alter table public.%I enable row level security', t);
 execute format('revoke all on public.%I from anon, authenticated', t);
 execute format('grant select,insert,update,delete on public.%I to authenticated', t);
 execute format('drop policy if exists admin_owner on public.%I', t);
 execute format('create policy admin_owner on public.%I for all to authenticated using (crm_private.is_admin() and exists(select 1 from public.crm_leads l where l.id=lead_id and l.owner_id=auth.uid())) with check(crm_private.is_admin() and exists(select 1 from public.crm_leads l where l.id=lead_id and l.owner_id=auth.uid()))', t);
 execute format('create index if not exists %I on public.%I(lead_id)',t||'_lead_idx',t);
 end loop;
end $block$;
alter table public.crm_history enable row level security;
revoke all on public.crm_history from anon, authenticated;
grant select on public.crm_history to authenticated;
drop policy if exists admin_history_read on public.crm_history;
create policy admin_history_read on public.crm_history for select to authenticated using(crm_private.is_admin());
create or replace function crm_private.audit_lead() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
 insert into public.crm_history(lead_id,actor_id,action)
 values(case when TG_OP='DELETE' then null else NEW.id end,auth.uid(),lower(TG_OP));
 if TG_OP='DELETE' then return OLD; end if; return NEW;
end; $$;
revoke all on function crm_private.audit_lead() from public;
drop trigger if exists crm_lead_audit on public.crm_leads;
create trigger crm_lead_audit after insert or update or delete on public.crm_leads
for each row execute function crm_private.audit_lead();
create index if not exists crm_followups_pending on public.crm_followups(due_at) where completed_at is null;
create index if not exists crm_communications_unread on public.crm_communications(occurred_at) where direction='inbound' and read_at is null;
commit;
