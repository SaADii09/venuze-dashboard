# Venuze Dashboard

A production-quality venue booking dashboard built with Next.js 16, TypeScript, and Tailwind CSS.

## Live Demo

[https://venuze-dashboard.vercel.app](https://venuze-dashboard.vercel.app)

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | React framework with App Router |
| TypeScript | Type-safe development (strict mode) |
| Tailwind CSS v4 | Utility-first styling with custom design tokens |
| TanStack Query | Server state management (login mutations, user queries) |
| Zustand | Client state management (auth state, theme persistence) |
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

### Testing

```bash
npm run test
```

## Demo Credentials

| Field | Value |
|-------|-------|
| Email | eve.holt@reqres.in |
| Password | cityslicka |

## Technical Decisions

### State Management Approach

The application uses a clear separation between **client state** and **server state**:

- **Zustand** manages client-side state that persists across page navigations:
  - Authentication state (token, user info) with cookie persistence
  - Theme preference (light/dark/system) with localStorage persistence
  - Zustand was chosen over Context API for its simplicity, built-in middleware (persist, devtools), and no provider boilerplate

- **TanStack Query** manages all server-side state:
  - Login mutations with automatic retry and error handling
  - User profile fetching with stale-while-revalidate caching
  - Query invalidation patterns for data consistency
  - TanStack Query was chosen for its robust caching, background refetching, and deduplication of requests

### Route Protection Strategy

- **Middleware-based** route protection using Next.js middleware
- Cookie-based token storage (accessible from both client and server)
- Three route groups with separate layouts:
  - `(public)` — accessible without auth (landing, venues, about, contact)
  - `(auth)` — login page, redirects to dashboard if already authenticated
  - `(dashboard)` — protected pages, redirects to login if unauthenticated

### Form Handling

- React Hook Form for uncontrolled form state (performance optimization)
- Zod schemas for runtime validation with TypeScript inference
- Unified error handling with toast notifications

### API Integration

- Axios instance with request interceptor for automatic auth token injection
- Axios response interceptor for 401 detection and automatic redirect
- All API calls centralized in `src/services/` for single source of truth

### Design Implementation

- Tailwind CSS v4 with CSS-based configuration (`@theme` blocks)
- Custom design tokens extracted from Figma (colors, typography, spacing, radii)
- Dark mode via `@custom-variant dark` for Tailwind v4 class-based detection
- Responsive design with mobile-first approach

## Assumptions

1. **Authentication is token-based**: The reqres.in API returns a token; we store it in cookies for middleware access
2. **No real backend**: All data is mocked or fetched from reqres.in; dashboard data uses sample/mock data
3. **Single-page feel**: Route groups with shared layouts provide SPA-like transitions while maintaining SSR benefits
4. **Poppins font**: The Figma design uses Poppins; loaded via `next/font/google` for optimal performance
5. **Vietnamese locale**: Currency formatting uses VND format as per the design context
6. **Dark mode is additive**: Dark mode classes are added to existing components; light mode remains the default

## Challenges Faced

1. **Tailwind v4 migration**: Tailwind v4 uses CSS-based configuration instead of `tailwind.config.ts`. The `darkMode: "class"` setting in the JS config was being ignored, requiring `@custom-variant dark` in CSS
2. **Cookie-based auth in middleware**: Next.js middleware runs on the Edge runtime with limited API access; cookies had to be read using `next/headers` on the server side and `document.cookie` on the client
3. **Route group layouts**: Ensuring error boundaries and loading states work correctly within route groups required careful placement of `error.tsx` and `loading.tsx` files
4. **Zustand hydration**: The theme store uses `persist` middleware with localStorage; the initial render must handle the hydration mismatch between server and client
5. **Dark mode component coverage**: Adding `dark:` variants to all existing components required systematic updates across the entire UI

## Project Organization

```
src/
├── app/
│   ├── (auth)/          # Auth route group (login)
│   │   ├── error.tsx    # Auth error boundary
│   │   ├── loading.tsx  # Auth loading state
│   │   └── login/       # Login page
│   ├── (dashboard)/     # Protected route group
│   │   ├── error.tsx    # Dashboard error boundary
│   │   ├── loading.tsx  # Dashboard loading state
│   │   └── page.tsx     # Dashboard home with stats
│   ├── (public)/        # Public route group
│   │   ├── error.tsx    # Public error boundary
│   │   ├── loading.tsx  # Public loading state
│   │   └── page.tsx     # Landing page
│   ├── globals.css      # Tailwind v4 theme, dark mode, animations
│   ├── layout.tsx       # Root layout with fonts and providers
│   └── providers.tsx    # TanStack Query + Theme + Toast providers
├── components/
│   ├── forms/           # Form components (LoginForm)
│   ├── layout/          # Layout components (Header, Footer, Sidebar, TopNav)
│   └── ui/              # Reusable UI primitives (Button, Input, Card, Modal, Toast, ThemeToggle)
├── hooks/               # Custom hooks (useAuth, useLogin, useUser, useDebounce, useLocalStorage, useMediaQuery)
├── lib/                 # Utilities (api client, cn helper, formatCurrency, formatDate, slugify, getInitials)
├── services/            # API service functions (authService)
├── stores/              # Zustand stores (auth.store, theme.store)
└── types/               # TypeScript type definitions (user, venue, booking, dashboard, api)
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

## License

MIT
