-- Run in your OWN Supabase SQL Editor after creating a private project.
create extension if not exists pgcrypto;
create table if not exists public.crm_leads (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id) on delete cascade,
 name varchar(150) not null check(length(trim(name))>0),
 city varchar(100) not null default '',
 sector varchar(100) not null default '',
 status varchar(40) not null default 'Por investigar'
 check(status in ('Por investigar','Pendiente de enviar','Enviado','Esperando respuesta','Interesado','Cliente','Descartado','No contactar')),
 email varchar(254) not null default '',
 phone varchar(50) not null default '',
 website text,
 source_url text,
 contacted_at date,
 next_followup date,
 notes varchar(5000) not null default '',
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
alter table public.crm_leads enable row level security;
revoke all on public.crm_leads from anon;
grant select,insert,update,delete on public.crm_leads to authenticated;
drop policy if exists "owner_select" on public.crm_leads;
drop policy if exists "owner_insert" on public.crm_leads;
drop policy if exists "owner_update" on public.crm_leads;
drop policy if exists "owner_delete" on public.crm_leads;
create policy "owner_select" on public.crm_leads for select to authenticated using (auth.uid()=owner_id);
create policy "owner_insert" on public.crm_leads for insert to authenticated with check (auth.uid()=owner_id);
create policy "owner_update" on public.crm_leads for update to authenticated using (auth.uid()=owner_id) with check(auth.uid()=owner_id);
create policy "owner_delete" on public.crm_leads for delete to authenticated using (auth.uid()=owner_id);
create index if not exists crm_leads_owner_created on public.crm_leads(owner_id,created_at desc);
-- Disable public signup in Supabase Auth settings and manually invite/create only authorized users.
