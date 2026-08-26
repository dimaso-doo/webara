# Webara

## Live product

https://www.webara.site

## Product

Webara is a full-stack web platform with responsive public journeys, protected administration, structured content, API routes and production deployment.

## My role

I defined the product structure and UX/UI, directed AI-assisted implementation, reviewed the protected administration and content workflow, tested the complete product and managed deployment.

## Stack

Next.js, React, TypeScript, Supabase-ready storage and Vercel.

Next.js website for Webara with a small AI-style admin panel for editing content.

## Technologies

- Next.js
- React
- TypeScript
- CSS
- Supabase-ready content storage
- Local JSON fallback for development

## Run Locally

1. Copy `.env.example` to `.env.local`.
2. Change `ADMIN_PASSWORD` and `AUTH_SECRET`.
3. Install packages:

```bash
pnpm install
```

4. Start the development server:

```bash
pnpm dev
```

The admin panel is available at `/admin`.

In production, `ADMIN_PASSWORD` and `AUTH_SECRET` are required. The admin login will not accept the local fallback password on Vercel.

## Content

Website content can be stored in Supabase. Without Supabase environment variables, the app falls back to `content/site.json` for local development. The admin panel updates content through a protected API route.

## Supabase

Run `supabase/schema.sql` in the Supabase SQL editor, then set these environment variables:

```bash
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

Seed current local content:

```bash
pnpm seed:supabase
```

When Supabase env vars are present, site content and contact submissions use Supabase. Without them, the app falls back to local JSON files.

## Vercel

Set these environment variables in Vercel before deploying:

```bash
ADMIN_PASSWORD=
AUTH_SECRET=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

Recommended build command:

```bash
pnpm build
```
