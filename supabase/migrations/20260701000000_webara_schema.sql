create table if not exists public.site_content (
  key text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_submissions (
  id uuid primary key,
  created_at timestamptz not null,
  name text not null,
  email text not null,
  phone text,
  message text not null
);

alter table public.site_content enable row level security;
alter table public.contact_submissions enable row level security;

-- Server-side writes use SUPABASE_SERVICE_ROLE_KEY and bypass RLS.
-- Do not expose the service role key in browser code.
