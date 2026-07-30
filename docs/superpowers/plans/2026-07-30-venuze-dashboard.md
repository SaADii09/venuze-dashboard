# Venuze Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-quality Next.js 15+ dashboard application with authentication, responsive design, and pixel-perfect Figma implementation for the Hashed System technical assessment.

**Architecture:** Next.js 15+ App Router with TypeScript, Tailwind CSS for styling, TanStack Query for server state, Zustand for client state, React Hook Form for forms. Route protection via Next.js middleware. API integration with reqres.in for authentication.

**Tech Stack:** Next.js 15+, TypeScript, Tailwind CSS, TanStack Query, Zustand, React Hook Form, Axios, Vercel deployment

## Global Constraints

- Next.js 15+ with App Router ONLY (not Pages Router)
- TypeScript strict mode, no `any` types
- Tailwind CSS only (no CSS Modules, styled-components, or CSS-in-JS)
- TanStack Query for server state, Zustand for client state (never mix)
- React Hook Form for ALL forms with Zod validation
- Server Components by default, `"use client"` only when needed
- Pixel-perfect Figma implementation required
- 24-hour time limit - prioritize core features
- API endpoint: POST `https://reqres.in/api/login` with body `{"email":"eve.holt@reqres.in","password":"cityslicka"}`

---

## File Structure

### Project Root Files
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration (strict mode)
- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration with custom theme
- `postcss.config.js` - PostCSS configuration
- `.eslintrc.json` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `middleware.ts` - Route protection middleware

### Source Files (`src/`)
```
src/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── globals.css             # Global styles and Tailwind directives
│   ├── not-found.tsx           # 404 page
│   ├── (public)/
│   │   ├── layout.tsx          # Public layout (header, footer)
│   │   └── page.tsx            # Landing page
│   ├── (auth)/
│   │   ├── layout.tsx          # Auth layout
│   │   └── login/
│   │       └── page.tsx        # Login page
│   └── (dashboard)/
│       ├── layout.tsx          # Dashboard layout (sidebar, nav)
│       └── page.tsx            # Dashboard home
├── components/
│   ├── ui/
│   │   ├── Button.tsx          # Button component with variants
│   │   ├── Input.tsx           # Input component with validation
│   │   ├── Modal.tsx           # Modal/Dialog component
│   │   ├── Card.tsx            # Card component
│   │   ├── Skeleton.tsx        # Skeleton loader
│   │   ├── Toast.tsx           # Toast notification
│   │   ├── Spinner.tsx         # Loading spinner
│   │   ├── EmptyState.tsx      # Empty state component
│   │   └── ErrorState.tsx      # Error state component
│   ├── forms/
│   │   └── LoginForm.tsx       # Login form with React Hook Form
│   └── layout/
│       ├── Header.tsx          # Public header
│       ├── Footer.tsx          # Public footer
│       ├── Sidebar.tsx         # Dashboard sidebar
│       └── TopNav.tsx          # Dashboard top navigation
├── hooks/
│   └── useAuth.ts              # Authentication hook
├── lib/
│   ├── api.ts                  # Axios instance configuration
│   └── utils.ts                # Utility functions
├── services/
│   └── auth.ts                 # Auth API service functions
├── stores/
│   └── auth.store.ts           # Zustand auth store
└── types/
    ├── api.ts                  # API response types
    └── user.ts                 # User types
```

---

## Task 1: Project Initialization & Configuration

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.js`, `.eslintrc.json`, `.prettierrc`
- Create: `src/app/globals.css`, `src/app/layout.tsx`

**Interfaces:**
- Consumes: None (initial setup)
- Produces: Configured Next.js project with TypeScript, Tailwind, and base layout

- [ ] **Step 1: Initialize Next.js project**

Run: `npx create-next-app@latest venuze-dashboard --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`

Expected: Next.js project created with TypeScript, Tailwind, ESLint, App Router, src directory

- [ ] **Step 2: Install additional dependencies**

Run: `npm install @tanstack/react-query zustand react-hook-form @hookform/resolvers zod axios`

Expected: Dependencies installed successfully

- [ ] **Step 3: Configure TypeScript strict mode**

Edit: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Configure Tailwind with custom theme**

Edit: `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#TBD",
          100: "#TBD",
          200: "#TBD",
          300: "#TBD",
          400: "#TBD",
          500: "#TBD",
          600: "#TBD",
          700: "#TBD",
          800: "#TBD",
          900: "#TBD",
        },
        // Extract actual colors from Figma
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Extract from Figma
      },
      spacing: {
        // Use Tailwind defaults, override if Figma differs
      },
      borderRadius: {
        // Extract from Figma
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 5: Create global CSS**

Edit: `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gray-50 text-gray-900 antialiased;
  }
}

@layer components {
  .btn-primary {
    @apply bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors;
  }
  
  .btn-secondary {
    @apply border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors;
  }
}
```

- [ ] **Step 6: Create root layout with providers**

Edit: `src/app/layout.tsx`

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Venuze Dashboard",
  description: "Production-quality dashboard application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

- [ ] **Step 7: Create providers component**

Create: `src/app/providers.tsx`

```typescript
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

- [ ] **Step 8: Verify project runs**

Run: `npm run dev`

Expected: Development server starts without errors

- [ ] **Step 9: Commit initial setup**

Run: `git add . && git commit -m "feat: initialize Next.js project with TypeScript, Tailwind, and providers"`

---

## Task 2: TypeScript Types & API Configuration

**Files:**
- Create: `src/types/api.ts`, `src/types/user.ts`, `src/lib/api.ts`, `src/lib/utils.ts`, `src/services/auth.ts`

**Interfaces:**
- Consumes: Task 1 (project setup)
- Produces: Type definitions, API client, utility functions, auth service

- [ ] **Step 1: Create API response types**

Create: `src/types/api.ts`

```typescript
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface PaginationParams {
  page?: number;
  per_page?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}
```

- [ ] **Step 2: Create user types**

Create: `src/types/user.ts`

```typescript
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
```

- [ ] **Step 3: Create Axios instance**

Create: `src/lib/api.ts`

```typescript
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://reqres.in/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Clear auth state and redirect to login
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
```

- [ ] **Step 4: Create utility functions**

Create: `src/lib/utils.ts`

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```

- [ ] **Step 5: Create auth service**

Create: `src/services/auth.ts`

```typescript
import api from "@/lib/api";
import type { LoginRequest, LoginResponse, User } from "@/types/user";

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/login", credentials);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>("/users/2"); // Example user endpoint
    return response.data;
  },

  async logout(): Promise<void> {
    // Clear local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }
  },
};
```

- [ ] **Step 6: Install utility dependencies**

Run: `npm install clsx tailwind-merge`

Expected: Dependencies installed

- [ ] **Step 7: Verify types compile**

Run: `npm run build`

Expected: No TypeScript errors

- [ ] **Step 8: Commit types and API setup**

Run: `git add . && git commit -m "feat: add TypeScript types, API client, and auth service"`

---

## Task 3: Zustand Auth Store

**Files:**
- Create: `src/stores/auth.store.ts`, `src/hooks/useAuth.ts`

**Interfaces:**
- Consumes: Task 2 (types, auth service)
- Produces: Zustand auth store, useAuth hook

- [ ] **Step 1: Create Zustand auth store**

Create: `src/stores/auth.store.ts`

```typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/user";
import { authService } from "@/services/auth";

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login({ email, password });
          localStorage.setItem("auth_token", response.token);
          
          // Fetch user data after successful login
          const user = await authService.getCurrentUser();
          
          set({
            token: response.token,
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          const errorMessage = error.response?.data?.error || "Login failed. Please try again.";
          set({
            isLoading: false,
            error: errorMessage,
          });
          throw error;
        }
      },

      logout: () => {
        authService.logout();
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      setUser: (user: User) => {
        set({ user });
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
```

- [ ] **Step 2: Create useAuth hook**

Create: `src/hooks/useAuth.ts`

```typescript
"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuth() {
  const router = useRouter();
  const { 
    token, 
    user, 
    isAuthenticated, 
    isLoading, 
    error, 
    login, 
    logout, 
    clearError 
  } = useAuthStore();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (error) {
      // Error is already handled in the store
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const requireAuth = () => {
    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated, isLoading, router]);
  };

  return {
    token,
    user,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    logout: handleLogout,
    clearError,
    requireAuth,
  };
}
```

- [ ] **Step 3: Verify store compiles**

Run: `npm run build`

Expected: No TypeScript errors

- [ ] **Step 4: Commit auth store**

Run: `git add . && git commit -m "feat: add Zustand auth store and useAuth hook"`

---

## Task 4: UI Component Library - Primitives

**Files:**
- Create: `src/components/ui/Button.tsx`, `src/components/ui/Input.tsx`, `src/components/ui/Modal.tsx`, `src/components/ui/Card.tsx`, `src/components/ui/Skeleton.tsx`, `src/components/ui/Toast.tsx`, `src/components/ui/Spinner.tsx`, `src/components/ui/EmptyState.tsx`, `src/components/ui/ErrorState.tsx`

**Interfaces:**
- Consumes: Task 1 (Tailwind config), Task 2 (utils)
- Produces: Reusable UI component library

- [ ] **Step 1: Create Button component**

Create: `src/components/ui/Button.tsx`

```typescript
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary:
        "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
      ghost: "text-gray-700 hover:bg-gray-100 focus:ring-blue-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
```

- [ ] **Step 2: Create Input component**

Create: `src/components/ui/Input.tsx`

```typescript
import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm transition-colors",
              "focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
              "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="mt-1 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
export type { InputProps };
```

- [ ] **Step 3: Create Modal component**

Create: `src/components/ui/Modal.tsx`

```typescript
"use client";

import { Fragment, ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
}: ModalProps) {
  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={cn(
            "relative w-full transform rounded-lg bg-white p-6 shadow-xl transition-all",
            sizes[size]
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between mb-4">
              {title && (
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create Card component**

Create: `src/components/ui/Card.tsx`

```typescript
import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "bordered" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({
  children,
  className,
  variant = "default",
  padding = "md",
  ...props
}: CardProps) {
  const variants = {
    default: "bg-white border border-gray-200",
    bordered: "bg-white border-2 border-gray-200",
    elevated: "bg-white shadow-lg",
  };

  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={cn("rounded-lg", variants[variant], paddings[padding], className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  );
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export function CardTitle({ children, className, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn("text-lg font-semibold text-gray-900", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardContent({
  children,
  className,
  ...props
}: CardContentProps) {
  return (
    <div className={cn("text-gray-600", className)} {...props}>
      {children}
    </div>
  );
}
```

- [ ] **Step 5: Create Skeleton component**

Create: `src/components/ui/Skeleton.tsx`

```typescript
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  variant = "text",
  width,
  height,
}: SkeletonProps) {
  const variants = {
    text: "h-4 w-full rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  };

  return (
    <div
      className={cn("animate-pulse bg-gray-200", variants[variant], className)}
      style={{ width, height }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center space-x-4 mb-4">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1">
          <Skeleton className="h-4 w-1/4 mb-2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-2" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <Skeleton className="h-6 w-1/4" />
      </div>
      <div className="p-4 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton variant="circular" width={40} height={40} />
            <div className="flex-1">
              <Skeleton className="h-4 w-1/3 mb-2" />
              <Skeleton className="h-3 w-1/4" />
            </div>
            <Skeleton className="h-8 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Install heroicons for Modal**

Run: `npm install @heroicons/react`

Expected: Heroicons installed

- [ ] **Step 7: Verify components compile**

Run: `npm run build`

Expected: No TypeScript errors

- [ ] **Step 8: Commit UI primitives**

Run: `git add . && git commit -m "feat: add UI primitive components (Button, Input, Modal, Card, Skeleton)"`

---

## Task 5: UI Component Library - Feedback Components

**Files:**
- Create: `src/components/ui/Toast.tsx`, `src/components/ui/Spinner.tsx`, `src/components/ui/EmptyState.tsx`, `src/components/ui/ErrorState.tsx`

**Interfaces:**
- Consumes: Task 4 (Button component)
- Produces: Toast, Spinner, EmptyState, ErrorState components

- [ ] **Step 1: Create Toast component**

Create: `src/components/ui/Toast.tsx`

```typescript
"use client";

import { useEffect, useState } from "react";
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface ToastProps {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  onClose: (id: string) => void;
  duration?: number;
}

export function Toast({ id, type, message, onClose, duration = 5000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id, onClose]);

  const icons = {
    success: <CheckCircleIcon className="h-5 w-5 text-green-400" />,
    error: <ExclamationCircleIcon className="h-5 w-5 text-red-400" />,
    info: <InformationCircleIcon className="h-5 w-5 text-blue-400" />,
    warning: <ExclamationCircleIcon className="h-5 w-5 text-yellow-400" />,
  };

  const backgrounds = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    info: "bg-blue-50 border-blue-200",
    warning: "bg-yellow-50 border-yellow-200",
  };

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 flex items-center p-4 rounded-lg border shadow-lg transition-all duration-300",
        backgrounds[type],
        isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      )}
    >
      <div className="flex items-center space-x-3">
        {icons[type]}
        <p className="text-sm font-medium text-gray-900">{message}</p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose(id), 300);
        }}
        className="ml-4 text-gray-400 hover:text-gray-500"
      >
        <XMarkIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

// Toast Container and hook
interface ToastItem {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
}

export function ToastContainer({
  toasts,
  onClose,
}: {
  toasts: ToastItem[];
  onClose: (id: string) => void;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (
    type: "success" | "error" | "info" | "warning",
    message: string
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return { toasts, addToast, removeToast };
}
```

- [ ] **Step 2: Create Spinner component**

Create: `src/components/ui/Spinner.tsx`

```typescript
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Spinner({ size = "md", className }: SpinnerProps) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <svg
      className={cn("animate-spin text-blue-600", sizes[size], className)}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export function PageSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create EmptyState component**

Create: `src/components/ui/EmptyState.tsx`

```typescript
import { ReactNode } from "react";
import { Button } from "./Button";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      {icon && (
        <div className="mx-auto h-12 w-12 text-gray-400 mb-4">{icon}</div>
      )}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      )}
      {action && (
        <Button onClick={action.onClick} variant="primary">
          {action.label}
        </Button>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Create ErrorState component**

Create: `src/components/ui/ErrorState.tsx`

```typescript
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "./Button";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="text-center py-12">
      <ExclamationCircleIcon className="mx-auto h-12 w-12 text-red-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="secondary">
          Try again
        </Button>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Verify components compile**

Run: `npm run build`

Expected: No TypeScript errors

- [ ] **Step 6: Commit feedback components**

Run: `git add . && git commit -m "feat: add feedback components (Toast, Spinner, EmptyState, ErrorState)"`

---

## Task 6: Layout Components - Public

**Files:**
- Create: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`
- Modify: `src/app/(public)/layout.tsx`, `src/app/(public)/page.tsx`

**Interfaces:**
- Consumes: Task 4 (Button), Task 2 (utils)
- Produces: Public header and footer, public layout

- [ ] **Step 1: Create Header component**

Create: `src/components/layout/Header.tsx`

```typescript
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Venuze
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="primary" size="sm">
                Get started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  pathname === item.href
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2 space-y-1">
              <Link href="/login" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                Sign in
              </Link>
              <Link href="/login" className="block px-3 py-2 text-base font-medium text-blue-600 hover:bg-blue-50">
                Get started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Create Footer component**

Create: `src/components/layout/Footer.tsx`

```typescript
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Venuze
            </Link>
            <p className="mt-4 text-gray-600 text-sm">
              Production-quality dashboard application built with Next.js.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Product
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/features" className="text-gray-600 hover:text-gray-900 text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900 text-sm">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900 text-sm">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900 text-sm">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm text-center">
            © {currentYear} Venuze. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Install heroicons for layout components**

Run: `npm install @heroicons/react`

Expected: Already installed in Task 4

- [ ] **Step 4: Create public layout**

Edit: `src/app/(public)/layout.tsx`

```typescript
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 5: Create landing page**

Edit: `src/app/(public)/page.tsx`

```typescript
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">Venuze</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A production-quality dashboard application built with Next.js, 
            TypeScript, and Tailwind CSS.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/login">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="lg">Sign In</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Modern Tech Stack
              </h3>
              <p className="text-gray-600">
                Built with Next.js 15+, TypeScript, and Tailwind CSS.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Responsive Design
              </h3>
              <p className="text-gray-600">
                Fully responsive across mobile, tablet, and desktop.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Production Ready
              </h3>
              <p className="text-gray-600">
                Deployed on Vercel with best practices.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 6: Verify layout compiles**

Run: `npm run build`

Expected: No TypeScript errors

- [ ] **Step 7: Commit public layout**

Run: `git add . && git commit -m "feat: add public layout with Header, Footer, and landing page"`

---

## Task 7: Layout Components - Dashboard

**Files:**
- Create: `src/components/layout/Sidebar.tsx`, `src/components/layout/TopNav.tsx`
- Modify: `src/app/(dashboard)/layout.tsx`, `src/app/(dashboard)/page.tsx`

**Interfaces:**
- Consumes: Task 6 (Header), Task 4 (Button), Task 3 (useAuth)
- Produces: Dashboard layout with sidebar and top nav

- [ ] **Step 1: Create Sidebar component**

Create: `src/components/layout/Sidebar.tsx`

```typescript
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  HomeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "Analytics", href: "/dashboard/analytics", icon: ChartBarIcon },
    { name: "Users", href: "/dashboard/users", icon: UsersIcon },
    { name: "Settings", href: "/dashboard/settings", icon: Cog6ToothIcon },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <Link href="/dashboard" className="text-xl font-bold text-blue-600">
              Venuze
            </Link>
            <button
              onClick={onClose}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
                onClick={onClose}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              © {new Date().getFullYear()} Venuze
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
```

- [ ] **Step 2: Create TopNav component**

Create: `src/components/layout/TopNav.tsx`

```typescript
"use client";

import { useState } from "react";
import { Bars3Icon, BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";

interface TopNavProps {
  onMenuClick: () => void;
}

export function TopNav({ onMenuClick }: TopNavProps) {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6">
      {/* Left side */}
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-500 hover:text-gray-700 mr-4"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="text-gray-500 hover:text-gray-700 relative">
          <BellIcon className="h-6 w-6" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <UserCircleIcon className="h-8 w-8" />
            <span className="hidden md:block text-sm font-medium">
              {user?.first_name || "User"}
            </span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <div className="px-4 py-2 border-b">
                <p className="text-sm font-medium text-gray-900">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Create dashboard layout**

Edit: `src/app/(dashboard)/layout.tsx`

```typescript
"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PageSpinner } from "@/components/ui/Spinner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, isLoading, requireAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <PageSpinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create dashboard home page**

Edit: `src/app/(dashboard)/page.tsx`

```typescript
"use client";

import { useAuth } from "@/hooks/useAuth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { SkeletonCard } from "@/components/ui/Skeleton";

export default function DashboardPage() {
  const { user } = useAuth();

  // Mock data - replace with real API calls
  const stats = [
    { name: "Total Users", value: "1,234", change: "+12%" },
    { name: "Revenue", value: "$45,678", change: "+8%" },
    { name: "Orders", value: "567", change: "+23%" },
    { name: "Conversion", value: "3.2%", change: "-2%" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome message */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.first_name || "User"}!
        </h1>
        <p className="text-gray-600">Here's what's happening with your dashboard.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent>
              <p className="text-sm text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p
                className={`text-sm ${
                  stat.change.startsWith("+") ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-200" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Activity item {i}
                  </p>
                  <p className="text-sm text-gray-500">
                    Description of activity {i}
                  </p>
                </div>
                <span className="text-sm text-gray-500">2h ago</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

- [ ] **Step 5: Create protected route middleware**

Edit: `src/middleware.ts`

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/", "/login", "/features", "/pricing", "/about", "/contact"];
const authRoutes = ["/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check for auth token in localStorage (can't access in middleware, so we'll handle client-side)
  // Middleware runs on server, so we need a different approach for token checking
  
  // For now, we'll handle auth checks client-side in the layout
  // This middleware mainly handles public vs protected route groups
  
  // Allow public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Allow API routes and static files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // For all other routes, let them through (auth check happens client-side)
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

- [ ] **Step 6: Install heroicons for layout components**

Run: `npm install @heroicons/react`

Expected: Already installed

- [ ] **Step 7: Verify dashboard layout compiles**

Run: `npm run build`

Expected: No TypeScript errors

- [ ] **Step 8: Commit dashboard layout**

Run: `git add . && git commit -m "feat: add dashboard layout with Sidebar, TopNav, and home page"`

---

## Task 8: Authentication - Login Page & Form

**Files:**
- Create: `src/components/forms/LoginForm.tsx`, `src/app/(auth)/layout.tsx`, `src/app/(auth)/login/page.tsx`

**Interfaces:**
- Consumes: Task 3 (useAuth, auth store), Task 4 (Button, Input), Task 2 (types)
- Produces: Complete login flow

- [ ] **Step 1: Create LoginForm component**

Create: `src/components/forms/LoginForm.tsx`

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login, isLoading, error, clearError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    clearError();
    await login(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <Input
        label="Email"
        type="email"
        placeholder="eve.holt@reqres.in"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password")}
      />

      <Button
        type="submit"
        className="w-full"
        isLoading={isLoading}
      >
        Sign in
      </Button>

      <p className="text-sm text-center text-gray-600">
        Demo credentials: eve.holt@reqres.in / cityslicka
      </p>
    </form>
  );
}
```

- [ ] **Step 2: Create auth layout**

Edit: `src/app/(auth)/layout.tsx`

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - Venuze",
  description: "Sign in to your Venuze account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-bold text-blue-600">Venuze</h1>
        <h2 className="mt-2 text-center text-xl text-gray-600">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create login page**

Edit: `src/app/(auth)/login/page.tsx`

```typescript
"use client";

import { LoginForm } from "@/components/forms/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto" />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return <LoginForm />;
}
```

- [ ] **Step 4: Verify auth pages compile**

Run: `npm run build`

Expected: No TypeScript errors

- [ ] **Step 5: Test login flow manually**

Run: `npm run dev`

Steps:
1. Navigate to http://localhost:3000
2. Click "Sign in" or navigate to http://localhost:3000/login
3. Enter demo credentials: eve.holt@reqres.in / cityslicka
4. Click "Sign in"
5. Should redirect to /dashboard
6. Should see welcome message with user's name

- [ ] **Step 6: Commit authentication flow**

Run: `git add . && git commit -m "feat: add complete authentication flow with login page and form"`

---

## Task 9: Protected Routes & Auth Persistence

**Files:**
- Modify: `src/stores/auth.store.ts`, `src/hooks/useAuth.ts`, `src/app/(dashboard)/layout.tsx`

**Interfaces:**
- Consumes: Task 8 (login flow)
- Produces: Auth persistence, protected routes

- [ ] **Step 1: Update auth store for persistence**

The auth store already has `persist` middleware from Task 3. Verify it's working by:
1. Login
2. Refresh page
3. Should remain logged in

- [ ] **Step 2: Test route protection**

Test cases:
1. Unauthenticated user visits /dashboard → redirected to /login
2. Authenticated user visits /login → redirected to /dashboard
3. Authenticated user can access /dashboard and sub-routes
4. Logout redirects to /login

- [ ] **Step 3: Add session timeout handling**

Update `src/lib/api.ts` to handle 401 errors:

```typescript
// Add to response interceptor
if (error.response?.status === 401) {
  // Clear auth state
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth-storage");
    window.location.href = "/login";
  }
}
```

- [ ] **Step 4: Commit auth persistence**

Run: `git add . && git commit -m "feat: add auth persistence and route protection"`

---

## Task 10: Responsive Design & Polish

**Files:**
- Modify: All layout and page files for responsive adjustments

**Interfaces:**
- Consumes: Tasks 1-9
- Produces: Fully responsive application

- [ ] **Step 1: Test mobile responsiveness**

Test on:
- iPhone SE (375px)
- iPhone 12 (390px)
- iPad (768px)
- Desktop (1024px+)

- [ ] **Step 2: Fix mobile sidebar behavior**

Ensure sidebar:
- Opens with hamburger menu on mobile
- Closes when clicking outside or on links
- Smooth transitions

- [ ] **Step 3: Add responsive breakpoints**

Verify all components use appropriate breakpoints:
- Mobile: default styles
- Tablet: `md:` prefix
- Desktop: `lg:` prefix

- [ ] **Step 4: Test hover states**

Verify all interactive elements have hover states:
- Buttons
- Links
- Navigation items
- Cards

- [ ] **Step 5: Add transitions**

Add smooth transitions to:
- Sidebar open/close
- Dropdown menus
- Button hover effects
- Card hover effects (if applicable)

- [ ] **Step 6: Commit responsive polish**

Run: `git add . && git commit -m "feat: add responsive design and polish"`

---

## Task 11: Performance Optimization

**Files:**
- Modify: Various components for optimization

**Interfaces:**
- Consumes: Tasks 1-10
- Produces: Optimized application

- [ ] **Step 1: Add dynamic imports for heavy components**

Use `next/dynamic` for:
- Modal components
- Any large components not needed on initial load

- [ ] **Step 2: Optimize images**

If there are images, use `next/image` with:
- Proper `width` and `height`
- `priority` for above-the-fold images
- Lazy loading for below-the-fold

- [ ] **Step 3: Minimize client-side JavaScript**

Ensure components that don't need interactivity are Server Components:
- Landing page sections
- Static content

- [ ] **Step 4: Add loading states**

Implement skeleton loaders for:
- Dashboard data
- User profile
- Any data fetching

- [ ] **Step 5: Commit performance optimizations**

Run: `git add . && git commit -m "feat: add performance optimizations"`

---

## Task 12: Final Testing & Deployment

**Files:**
- Modify: `README.md` (if needed)

**Interfaces:**
- Consumes: Tasks 1-11
- Produces: Deployed application

- [ ] **Step 1: Run full build**

Run: `npm run build`

Expected: No errors

- [ ] **Step 2: Run linting**

Run: `npm run lint`

Expected: No errors (warnings acceptable)

- [ ] **Step 3: Test complete flow**

Test:
1. Visit landing page
2. Navigate to login
3. Login with demo credentials
4. Access dashboard
5. Navigate through dashboard sections
6. Logout
7. Verify can't access dashboard without auth

- [ ] **Step 4: Deploy to Vercel**

Run: `npx vercel`

Or connect GitHub repository to Vercel for automatic deployment

- [ ] **Step 5: Verify deployment**

- [ ] **Step 6: Final commit**

Run: `git add . && git commit -m "feat: complete Venuze Dashboard implementation"`

---

## Summary

**Total Tasks:** 12
**Estimated Time:** 8-12 hours (within 24-hour limit)

**Task Dependencies:**
1. Task 1 → Tasks 2-12
2. Task 2 → Tasks 3-8
3. Task 3 → Tasks 4-8
4. Task 4 → Tasks 5-8
5. Task 5 → Tasks 6-8
6. Task 6 → Tasks 7-8
7. Task 7 → Task 8
8. Task 8 → Tasks 9-12
9. Tasks 9-12 are sequential polish tasks

**Critical Path:**
1-2-3-4-5-6-7-8-9-10-11-12

**Key Deliverables:**
- Next.js 15+ project with TypeScript
- Tailwind CSS styling
- TanStack Query for data fetching
- Zustand for state management
- React Hook Form for forms
- Complete authentication flow
- Responsive dashboard
- Deployed to Vercel
