# REPLIQ

AI chatbot builder for local businesses. Create a custom chatbot in 10 minutes. No code required.

## Setup

1. Install dependencies: `npm install`
2. Copy `.env.local.example` to `.env.local` and fill in your keys
3. Run dev server: `npm run dev`

## Environment Variables

```
ANTHROPIC_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=
```

## Supabase Schema

```sql
create table bots (
  id uuid primary key default gen_random_uuid(),
  business_name text,
  industry text,
  system_prompt text,
  bot_name text,
  tone text,
  widget_color text,
  welcome_message text,
  contact_info jsonb,
  onboarding_data jsonb,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table conversations (
  id uuid primary key default gen_random_uuid(),
  bot_id uuid references bots(id),
  visitor_message text,
  bot_reply text,
  created_at timestamptz default now()
);
```
