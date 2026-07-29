# Rules - AI Boundaries & Constraints

## Technology Decisions

### Must Use
- Next.js 15+ with App Router (NOT Pages Router)
- TypeScript (strict mode)
- Tailwind CSS for all styling
- TanStack Query for server state
- Zustand for global state
- React Hook Form for forms
- Axios or native Fetch API

### Do NOT Use
- CSS Modules or styled-components (use Tailwind only)
- Redux (use Zustand instead)
- React Context for global state (use Zustand)
- Any UI component library (shadcn, MUI, etc.) unless already in project
- External icon libraries unless necessary

## Code Quality Rules

### TypeScript
- No `any` types — use proper interfaces/types
- Define types in `src/types/` directory
- Use type-safe API patterns

### Components
- Server Components by default — only add `"use client"` when needed
- One component per file
- Component names match file names (PascalCase)
- Co-locate component styles with the component

### Error Handling
- Always handle API errors in mutations/queries
- Show user-friendly error messages via notifications
- Never expose raw error messages to UI
- Use try/catch blocks in service functions

### State Management
- Zustand for: auth state, UI state, global app state
- TanStack Query for: API data, caching, mutations
- Never store API response data in Zustand (use React Query cache)

### Forms
- React Hook Form for all forms
- Zod or native validation for form schemas
- Show field-level validation errors
- Handle form submission states (loading, success, error)

## File Naming Conventions

| Type | Convention | Example |
| --- | --- | --- |
| Components | PascalCase | `UserProfile.tsx` |
| Hooks | camelCase with `use` prefix | `useAuth.ts` |
| Services | camelCase | `auth.ts` |
| Types | PascalCase | `User.ts` |
| Utils | camelCase | `formatDate.ts` |
| Constants | UPPER_SNAKE_CASE | `API_ROUTES.ts` |

## Layout Rules

- Responsive design is mandatory (mobile-first)
- Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`)
- Test breakpoints: mobile (< 640px), tablet (640-1024px), desktop (> 1024px)

## Performance Rules

- Use Next.js dynamic imports for heavy components
- Optimize images with `next/image`
- Minimize client-side JavaScript
- Use React.memo only when measurably beneficial
- Lazy load off-screen content

## Security Rules

- Never store secrets in client-side code
- Use environment variables for API URLs
- Sanitize any user input
- Use middleware for route protection (never client-side only)
