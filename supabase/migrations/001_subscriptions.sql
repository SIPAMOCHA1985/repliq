-- Run this in your Supabase SQL editor
create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  stripe_customer_id text unique not null,
  stripe_subscription_id text unique,
  email text,
  plan text not null default 'starter',
  status text not null default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index for fast lookups by email
create index if not exists idx_subscriptions_email on subscriptions(email);

-- Allow service role full access
alter table subscriptions enable row level security;
create policy "Service role full access" on subscriptions
  using (true)
  with check (true);
