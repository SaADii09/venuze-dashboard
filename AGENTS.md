# AGENTS.md - Venuze Dashboard

> **Project:** Venuze Dashboard - Hashed System Technical Assessment
> **Status:** Not started (documentation phase only)
> **Time Limit:** 24 hours from receipt
> **Figma:** https://www.figma.com/design/yHjRKVXHcf4E6mDj5khXQJ/Hashed-System-NEXTJS-TYPESCRIPT-Assignment?node-id=0-1&p=f&t=HegO7UF7LLPUdGHN-0

---

## Tech Stack (MUST USE)

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 15+ | App Router ONLY, not Pages Router |
| Language | TypeScript | Strict mode, no `any` |
| Styling | Tailwind CSS | No CSS Modules, no styled-components |
| Server State | TanStack Query | Caching, mutations, invalidation |
| Global State | Zustand | Auth, UI state - NOT Redux, NOT Context |
| Forms | React Hook Form | All forms, with Zod validation |
| HTTP | Axios or Fetch | Consistent pattern |
| Deployment | Vercel | Required |

## Tech Stack (DO NOT USE)

- CSS Modules, styled-components, or any CSS-in-JS
- Redux or React Context for global state
- UI component libraries (shadcn, MUI, etc.) unless already in project
- External icon libraries unless necessary

---

## File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `UserProfile.tsx` |
| Hooks | camelCase + `use` prefix | `useAuth.ts` |
| Services | camelCase | `auth.ts` |
| Types | PascalCase | `User.ts` |
| Utils | camelCase | `formatDate.ts` |
| Constants | UPPER_SNAKE_CASE | `API_ROUTES.ts` |

---

## Folder Structure

```
src/
├── app/                 # Next.js App Router
│   ├── (public)/        # Public routes
│   │   ├── layout.tsx   # Public layout
│   │   └── page.tsx     # Landing page
│   ├── (auth)/          # Login page
│   │   ├── layout.tsx   # Auth layout
│   │   └── login/       # Login page
│   ├── (dashboard)/     # Protected routes
│   │   ├── layout.tsx   # Dashboard layout (sidebar, nav)
│   │   └── page.tsx     # Dashboard home
│   ├── layout.tsx       # Root layout
│   ├── globals.css      # Global styles
│   └── not-found.tsx    # 404 page
├── components/          # Shared UI components
│   ├── ui/              # Primitives (Button, Input, Modal)
│   ├── forms/           # Form components
│   └── layout/          # Header, Sidebar, Footer
├── hooks/               # Custom React hooks
├── lib/                 # Utilities
│   ├── api.ts           # Axios instance / API config
│   └── utils.ts         # Utility functions
├── services/            # API service functions
│   └── auth.ts          # Auth API calls
├── stores/              # Zustand stores
│   └── auth.store.ts    # Authentication state
├── types/               # TypeScript type definitions
└── middleware.ts        # Next.js middleware (route protection)
```

---

## Code Rules

### TypeScript

- No `any` types - use proper interfaces/types
- Define types in `src/types/` directory
- Use type-safe API patterns

### Components

- Server Components by default
- Add `"use client"` only when needed (interactivity, hooks, browser APIs)
- One component per file
- Component names match file names (PascalCase)
- Co-locate component styles with the component

### State Management

- **Zustand:** auth state, UI state, global app state
- **TanStack Query:** API data, caching, mutations
- NEVER store API response data in Zustand (use React Query cache)

### Forms

- React Hook Form for ALL forms
- Zod or native validation for form schemas
- Show field-level validation errors
- Handle submission states (loading, success, error)

### Error Handling

- Always handle API errors in mutations/queries
- Show user-friendly error messages via notifications
- Never expose raw error messages to UI
- Use try/catch blocks in service functions

### Performance

- Use `next/dynamic` for heavy components
- Optimize images with `next/image`
- Minimize client-side JavaScript
- Use React.memo only when measurably beneficial
- Lazy load off-screen content

### Security

- Never store secrets in client-side code
- Use environment variables for API URLs
- Sanitize any user input
- Use middleware for route protection (never client-side only)

---

## Application Flow

```
Public Pages → Login → Authenticated Dashboard
     ↑                      ↓
     └──── Logout ──────────┘
```

### Route Protection (middleware.ts)

1. Check auth token/cookie
2. Public routes → allow access
3. Protected routes → redirect to `/login` if not authenticated
4. Auth routes → redirect to dashboard if already authenticated

### API Integration Pattern

```
Component → useQuery/useMutation → Service Function → Axios Instance → API
                                  ↓
                            Zustand Store (auth state)
```

---

## Implementation Phases

### Phase 1: Project Setup & Foundation

- [ ] Initialize Next.js 15+ project with TypeScript
- [ ] Configure Tailwind CSS
- [ ] Set up project folder structure (see Architecture.md)
- [ ] Install dependencies: TanStack Query, Zustand, React Hook Form, Axios
- [ ] Configure TypeScript strict mode
- [ ] Set up ESLint and Prettier
- [ ] Create global CSS and Tailwind config
- [ ] Define base TypeScript types

### Phase 2: UI Component Library

- [ ] Button component (variants, sizes, states)
- [ ] Input component (with validation states)
- [ ] Modal/Dialog component
- [ ] Card component
- [ ] Skeleton loader component
- [ ] Toast/Notification component
- [ ] Loading spinner/indicator
- [ ] Empty state component
- [ ] Error state component

### Phase 3: Layout & Navigation

- [ ] Root layout with providers (QueryClient, Zustand)
- [ ] Public layout (header, footer)
- [ ] Dashboard layout (sidebar, top nav)
- [ ] Responsive sidebar (mobile hamburger menu)
- [ ] Navigation links and active states
- [ ] Footer component

### Phase 4: Authentication

- [ ] Zustand auth store (token, user state, actions)
- [ ] Login page (email/password form with React Hook Form)
- [ ] Form validation (email format, password required)
- [ ] Login API integration with TanStack Query mutation
- [ ] Token persistence (localStorage/cookies)
- [ ] Next.js middleware for route protection
- [ ] Redirect logic (unauthenticated → login, authenticated → dashboard)
- [ ] Logout functionality
- [ ] Error handling for failed login

### Phase 5: Public Pages

- [ ] Landing/home page
- [ ] Any additional public pages from Figma
- [ ] Responsive implementation
- [ ] Hover states and transitions

### Phase 6: Dashboard & Authenticated Pages

- [ ] Dashboard home page
- [ ] Dashboard data visualization/cards
- [ ] Any additional authenticated screens from Figma
- [ ] Data fetching with TanStack Query
- [ ] Loading states (skeleton loaders)
- [ ] Empty states
- [ ] Error states
- [ ] Responsive layouts

### Phase 7: Polish & Optimization

- [ ] Responsive fine-tuning across all breakpoints
- [ ] Animation and transition polish
- [ ] Hover states on all interactive elements
- [ ] Loading state consistency
- [ ] Error boundary implementation
- [ ] Performance optimization (dynamic imports, image optimization)
- [ ] Accessibility pass (aria labels, keyboard nav)
- [ ] Cross-browser testing

### Phase 8: Documentation & Deployment

- [ ] Update README with setup instructions
- [ ] Document technical decisions
- [ ] Document state management approach
- [ ] List assumptions and challenges
- [ ] Deploy to Vercel
- [ ] Verify live deployment

---

## Key Gotchas

1. **24-hour time limit** - Prioritize core features (auth, dashboard) over polish
2. **Pixel-perfect Figma** - Extract design tokens (colors, fonts, spacing) from Figma early
3. **API endpoint:** POST `https://reqres.in/api/login` with body `{"email":"eve.holt@reqres.in","password":"cityslicka"}`
4. **Route protection** - Must use Next.js middleware, not client-side checks
5. **No UI libraries** - Build all components from scratch with Tailwind
6. **Server Components** - Default to Server Components, add `"use client"` only when needed
7. **State split** - TanStack Query for server state, Zustand for client state (never mix)
8. **Design tokens TBD** - Colors, fonts, spacing need extraction from Figma (see Design.md)

---

## Reference Documents

| Document | Purpose | Path |
|----------|---------|------|
| PRD | Requirements, features, evaluation criteria | `docs/PRD.md` |
| Architecture | Folder structure, state management, flow | `docs/Architecture.md` |
| Rules | Tech constraints, code quality rules | `docs/Rules.md` |
| Design | Visual guidelines, design tokens | `docs/Design.md` |
| Phases | Implementation plan with checklists | `docs/Phases.md` |
| Memory | Progress tracker, decisions, blockers | `docs/Memory.md` |
| Technical Assessment | Full assignment details | `docs/Technical Assessment - Hashed System.md` |

---

## Evaluation Weights

| Category | Weight |
|----------|--------|
| Figma Accuracy & UI Quality | 25% |
| Responsive Implementation | 15% |
| Next.js & React Knowledge | 15% |
| Engineering Decisions & Organization | 15% |
| TypeScript Quality | 10% |
| State Management | 8% |
| API Integration | 7% |
| Performance & Optimization | 3% |
| Documentation & Deployment | 2% |
