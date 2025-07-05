# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a T3 Stack application built with create-t3-app (v7.39.3), featuring:
- Next.js 15 with App Router
- TypeScript with strict type checking
- tRPC for type-safe APIs
- Prisma ORM with PostgreSQL (default SQLite for development)
- NextAuth.js for authentication
- Tailwind CSS v4 for styling
- React Query for data fetching

## Essential Commands

### Development
```bash
npm run dev          # Start development server with Turbo
npm run build        # Build for production
npm run start        # Start production server
npm run preview      # Build and start production preview
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix
npm run typecheck    # Run TypeScript type checking
npm run check        # Run both lint and typecheck
npm run format:check # Check code formatting
npm run format:write # Auto-format code
```

### Database
```bash
npm run db:push      # Push schema changes to database (development)
npm run db:generate  # Generate Prisma migrations
npm run db:migrate   # Apply migrations to production
npm run db:studio    # Open Prisma Studio GUI
```

### Testing
No test commands are currently configured. Add testing framework as needed.

## Architecture

### Project Structure
- `/src/app/` - Next.js App Router pages and layouts
- `/src/server/` - Backend code (tRPC, auth, database)
  - `/api/` - tRPC routers and procedures
  - `/auth/` - NextAuth.js configuration
  - `/db.ts` - Prisma client instance
- `/src/trpc/` - tRPC client configuration
- `/src/styles/` - Global CSS files
- `/prisma/` - Database schema and migrations

### Key Architectural Patterns

#### tRPC Setup
- Router definition: `/src/server/api/root.ts`
- Procedure types: `publicProcedure` (unauthenticated) and `protectedProcedure` (authenticated)
- Context includes database client and session
- Timing middleware adds artificial delay in development to catch waterfalls

#### Authentication Flow
- NextAuth.js with Prisma adapter
- Discord provider configured by default
- Session augmented with user ID
- Protected procedures check session validity

#### Type Safety
- Environment variables validated with zod in `/src/env.js`
- tRPC provides end-to-end type safety
- Path aliases: `~/*` maps to `./src/*`

#### Data Fetching
- React Query integrated with tRPC
- Server-side and client-side rendering supported
- Streaming responses with `httpBatchStreamLink`

## Environment Setup

Required environment variables (see `.env.example`):
- `DATABASE_URL` - Database connection string
- `AUTH_SECRET` - NextAuth.js secret (generate with `npx auth secret`)
- `AUTH_DISCORD_ID` - Discord OAuth app ID (if using Discord auth)
- `AUTH_DISCORD_SECRET` - Discord OAuth app secret (if using Discord auth)

## Development Workflow

1. Set up environment variables by copying `.env.example` to `.env`
2. Install dependencies: `npm install`
3. Push database schema: `npm run db:push`
4. Start development server: `npm run dev`

Always run `npm run check` before committing to ensure code quality.