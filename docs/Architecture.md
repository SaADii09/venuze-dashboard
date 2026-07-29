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
| Framework | Next.js 15+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Data Fetching | TanStack Query (React Query) |
| Global State | Zustand |
| Forms | React Hook Form |
| HTTP Client | Axios or Fetch API |
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
│   │   │   └── page.tsx     # Landing page
│   │   ├── (auth)/          # Auth route group
│   │   │   ├── layout.tsx   # Auth layout
│   │   │   └── login/       # Login page
│   │   ├── (dashboard)/     # Protected route group
│   │   │   ├── layout.tsx   # Dashboard layout (sidebar, nav)
│   │   │   └── page.tsx     # Dashboard home
│   │   ├── layout.tsx       # Root layout
│   │   ├── globals.css      # Global styles
│   │   └── not-found.tsx    # 404 page
│   ├── components/          # Shared UI components
│   │   ├── ui/              # Primitives (Button, Input, Modal, etc.)
│   │   ├── forms/           # Form components
│   │   └── layout/          # Layout components (Header, Sidebar, Footer)
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and helpers
│   │   ├── api.ts           # Axios instance / API config
│   │   └── utils.ts         # Utility functions
│   ├── services/            # API service functions
│   │   └── auth.ts          # Auth API calls
│   ├── stores/              # Zustand stores
│   │   └── auth.store.ts    # Authentication state
│   ├── types/               # TypeScript type definitions
│   └── middleware.ts        # Next.js middleware (route protection)
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── next.config.ts           # Next.js configuration
└── package.json
```

## State Management Architecture

### Zustand Stores
- **Auth Store:** User authentication state, token, login/logout actions
- **UI Store (if needed):** Sidebar state, theme preferences

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
