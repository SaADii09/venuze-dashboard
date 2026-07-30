# Architecture - Venuze Dashboard

## Application Flow

```
Public Pages → Login → Authenticated Dashboard
     ↑                      ↓
     └──── Logout ──────────┘
```

## Technical Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16+ (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Data Fetching | TanStack Query (React Query) |
| Global State | Zustand |
| Forms | React Hook Form + Zod |
| HTTP Client | Axios |
| Testing | Vitest + React Testing Library |
| Deployment | Vercel |

## Folder Structure

```
venuze-dashboard/
├── docs/                    # Project documentation
├── public/                  # Static assets
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (public)/        # Public route group
│   │   │   ├── layout.tsx   # Public layout
│   │   │   ├── page.tsx     # Landing page
│   │   │   └── error.tsx    # Error boundary
│   │   ├── (auth)/          # Auth route group
│   │   │   ├── layout.tsx   # Auth layout
│   │   │   ├── login/       # Login page
│   │   │   ├── error.tsx    # Error boundary
│   │   │   └── loading.tsx  # Loading state
│   │   ├── (dashboard)/     # Protected route group
│   │   │   ├── layout.tsx   # Dashboard layout (sidebar, nav)
│   │   │   ├── page.tsx     # Dashboard home
│   │   │   ├── error.tsx    # Error boundary
│   │   │   └── loading.tsx  # Loading state
│   │   ├── layout.tsx       # Root layout
│   │   ├── providers.tsx    # Theme + Query + Toast providers
│   │   ├── globals.css      # Global styles + animations
│   │   └── not-found.tsx    # 404 page
│   ├── components/          # Shared UI components
│   │   ├── ui/              # Primitives (Button, Input, Modal, Toast, etc.)
│   │   ├── forms/           # Form components
│   │   └── layout/          # Layout components (Header, Sidebar, Footer)
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and helpers
│   │   ├── api.ts           # Axios instance / API config
│   │   └── utils.ts         # Utility functions
│   ├── services/            # API service functions
│   │   └── auth.ts          # Auth API calls
│   ├── stores/              # Zustand stores
│   │   ├── auth.store.ts    # Authentication state
│   │   └── theme.store.ts   # Theme state (dark/light/system)
│   ├── types/               # TypeScript type definitions
│   │   ├── index.ts         # Type exports
│   │   ├── user.ts          # User types
│   │   ├── venue.ts         # Venue types
│   │   ├── booking.ts       # Booking types
│   │   ├── dashboard.ts     # Dashboard types
│   │   └── api.ts           # API response types
│   └── middleware.ts        # Next.js middleware (route protection)
├── vitest.config.ts         # Vitest configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── next.config.ts           # Next.js configuration
└── package.json
```

## State Management Architecture

### Zustand Stores
- **Auth Store:** User authentication state, token, login/logout actions, cookie management
- **Theme Store:** Dark/light/system theme with localStorage persistence

### TanStack Query
- Server state management (API data)
- Caching and background refetching
- Query invalidation on mutations
- Loading/error states per query

## Route Protection

```
middleware.ts
├── Check auth token/cookie
├── Public routes → allow access
├── Protected routes → redirect to /login if not authenticated
└── Auth routes → redirect to dashboard if already authenticated
```

## API Integration Pattern

```
Component → useQuery/useMutation → Service Function → Axios Instance → API
                                  ↓
                            Zustand Store (auth state)
```

## Error Handling

- Route-level error boundaries (`error.tsx`)
- Global error handling with Toast notifications
- Axios interceptor for API error responses
- Loading states for all route groups

## Theme System

- CSS variables for dark/light modes
- Tailwind `darkMode: "class"` support
- System preference detection
- localStorage persistence
- ThemeToggle component in Header

## Testing

- Unit tests for hooks, components, and utilities
- Vitest + React Testing Library
- Test setup with mocked localStorage and matchMedia
