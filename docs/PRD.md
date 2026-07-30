# PRD - Venuze Dashboard

## Project Overview

**Project Name:** Venuze Dashboard
**Type:** Production-quality frontend dashboard application
**Tech Stack:** Next.js 15+ (App Router), TypeScript, Tailwind CSS
**Deployment:** Vercel

## Target Users

Authenticated dashboard users who need to manage and visualize data through a modern web interface.

## Core Features

### 1. Authentication Module
- Email/password login with validation
- Authentication persistence (tokens/cookies)
- Protected routes via middleware
- Redirect unauthenticated users to login
- Logout functionality
- Error handling for invalid credentials

**API Endpoint:**
- POST `https://reqres.in/api/login`
- Body: `{ "email": "eve.holt@reqres.in", "password": "cityslicka" }`

### 2. Public Pages
- Landing/home page
- Navigation (public-facing)
- Footer
- Any other public screens from the Figma design

### 3. Dashboard (Authenticated Area)
- Post-login dashboard view
- Data visualization and management screens
- All authenticated screens from the Figma design

### 4. UI/UX Requirements
- Fully responsive (mobile, tablet, desktop)
- Skeleton loaders for data fetching
- Loading indicators
- Empty states
- Error states
- Success/error notifications
- Smooth modal interactions
- Transitions and animations
- Hover states where applicable

## Success Criteria

- Pixel-perfect Figma implementation
- Production-ready feel
- Clean, maintainable codebase
- Successful Vercel deployment
- Passes evaluation criteria (see evaluation weights below)

## Evaluation Weights

| Category | Weight |
| --- | --- |
| Figma Accuracy & UI Quality | 25% |
| Responsive Implementation | 15% |
| Next.js & React Knowledge | 15% |
| Engineering Decisions & Organization | 15% |
| TypeScript Quality | 10% |
| State Management | 8% |
| API Integration | 7% |
| Performance & Optimization | 3% |
| Documentation & Deployment | 2% |

## Bonus Features (Optional)
- Dark mode support
- Unit testing
- End-to-end testing
- Custom hooks
- Accessibility improvements
- Error boundaries
- Optimistic updates
- Advanced form handling patterns
- Additional performance optimizations
