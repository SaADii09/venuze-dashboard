# Venuze Dashboard

A production-quality venue booking dashboard built with Next.js 15+, TypeScript, and Tailwind CSS.

## Live Demo

[https://venuze-dashboard.vercel.app](https://venuze-dashboard.vercel.app)

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 15+ | React framework with App Router |
| TypeScript | Type-safe development |
| Tailwind CSS v4 | Utility-first styling with custom design tokens |
| TanStack Query | Server state management (login mutations, user queries) |
| Zustand | Client state management (auth state persistence) |
| React Hook Form | Form handling with validation |
| Zod | Schema-based form validation |
| Axios | HTTP client with interceptors |

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
git clone <repository-url>
cd venuze-dashboard
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm run start
```

### Lint & Type Check

```bash
npm run lint
npx tsc --noEmit
```

## Demo Credentials

| Field | Value |
|-------|-------|
| Email | eve.holt@reqres.in |
| Password | cityslicka |

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Auth pages (login)
│   ├── (dashboard)/     # Protected dashboard pages
│   ├── (public)/        # Public pages (home, venues, about, contact)
│   ├── globals.css      # Tailwind v4 theme tokens
│   ├── layout.tsx       # Root layout with providers
│   └── providers.tsx    # TanStack Query provider
├── components/
│   ├── forms/           # Form components (LoginForm)
│   ├── layout/          # Layout components (Header, Footer, Sidebar, TopNav)
│   └── ui/              # Reusable UI primitives (Button, Input, Card, etc.)
├── hooks/               # Custom hooks (useAuth, useLogin, useUser)
├── lib/                 # Utilities (api client, cn helper)
├── services/            # API service functions (authService)
├── stores/              # Zustand stores (auth.store)
└── types/               # TypeScript type definitions
```

## Routes

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Landing page with venue categories | No |
| `/venues` | Venue listing with filters | No |
| `/about` | About page | No |
| `/contact` | Contact form | No |
| `/login` | Login page | No |
| `/dashboard` | Dashboard home with stats | Yes |
| `/dashboard/analytics` | Revenue and performance analytics | Yes |
| `/dashboard/bookings` | Bookings management table | Yes |
| `/dashboard/users` | Users management grid | Yes |
| `/dashboard/settings` | Account settings | Yes |

## Design Tokens

Extracted from Figma and defined in `src/app/globals.css`:

| Token | Value | Usage |
|-------|-------|-------|
| `primary-500` | `#ff5037` | Primary brand color |
| `dark-brown` | `#372320` | Text, sidebar background |
| `accent-beige` | `#fdf5e8` | Light backgrounds |
| `rounded-card` | `20px` | Card border radius |
| `rounded-button` | `10px` | Button border radius |
| `rounded-pill` | `999px` | Pill-shaped elements |

## Architecture Decisions

- **State separation**: Zustand handles client state (auth), TanStack Query handles server state (API data)
- **Route groups**: `(public)`, `(auth)`, `(dashboard)` separate layout concerns
- **Design tokens**: All colors, fonts, and radii defined in CSS `@theme` for consistency
- **Form validation**: Zod schemas with React Hook Form for type-safe validation
- **API layer**: Axios with interceptors for auth token management and 401 handling

## License

MIT
