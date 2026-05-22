# `instruction.md`

# Antigravity WebApp Engineering Standards

This document defines the coding standards, architecture guidelines, design principles, and development workflow for building scalable, maintainable, and production-ready web applications using Next.js.

---

# Tech Stack

## Core Framework
- Next.js (App Router)
- React
- TypeScript

## Styling
- Tailwind CSS
- shadcn/ui
- Framer Motion

## State Management
- Zustand (preferred for global state)
- React Query / TanStack Query (server state)

## Forms & Validation
- React Hook Form
- Zod

## API & Data
- REST or GraphQL
- Axios or Fetch API
- Server Actions where appropriate

## Authentication
- NextAuth.js or Clerk (if required)

## Database
- PostgreSQL (preferred)
- Prisma ORM

## Deployment
- Vercel

---

# Core Development Principles

## 1. Write Production-Level Code
Every code written should be:
- Scalable
- Reusable
- Maintainable
- Type-safe
- Modular
- Performant

Avoid quick hacks or temporary solutions.

---

## 2. Always Use TypeScript Strict Mode

Never use:
- `any`
- unsafe casting
- loosely typed objects

Prefer:
- Interfaces
- Utility types
- Generics
- Proper schema validation

Example:
```ts
interface User {
  id: string
  name: string
  email: string
}
## 3. Component Design Rules

### Keep Components:

* Small
* Focused
* Reusable
* Testable

### Avoid:

* Massive components
* Business logic inside UI components
* Duplicate UI patterns

### Preferred Structure

```txt
components/
  ui/
  shared/
  forms/
  layouts/
  feature-specific/
```

---

# Folder Structure

Use the following scalable folder structure:

```txt
src/
│
├── app/
│   ├── (marketing)/
│   ├── (dashboard)/
│   ├── api/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   ├── shared/
│   ├── forms/
│   └── layouts/
│
├── features/
│   ├── auth/
│   ├── users/
│   ├── dashboard/
│   └── ...
│
├── services/
│   ├── api/
│   ├── http/
│   └── server/
│
├── hooks/
│
├── lib/
│   ├── utils/
│   ├── constants/
│   ├── validators/
│   └── helpers/
│
├── store/
│
├── types/
│
├── styles/
│
├── config/
│
├── providers/
│
├── middleware/
│
└── tests/
```

---

# Architecture Guidelines

## Feature-Based Architecture

Each feature should contain:

```txt
features/
  auth/
    components/
    hooks/
    services/
    types/
    schemas/
    utils/
```

Keep business logic isolated within features.

---

# API Layer Standards

## Never Call APIs Directly Inside Components

Bad:

```ts
useEffect(() => {
  fetch('/api/users')
}, [])
```

Good:

```ts
services/users/get-users.ts
```

Use dedicated service layers.

---

## API Structure

```txt
services/
  api/
    auth.api.ts
    user.api.ts
```

---

# Reusable UI Standards

## Use shadcn/ui as Base

Create reusable wrappers around components when needed.

Example:

```txt
components/ui/button.tsx
components/shared/page-header.tsx
components/shared/empty-state.tsx
```

---

# Styling Standards

## Tailwind Rules

### Prefer:

* Utility classes
* Design tokens
* Consistent spacing scale

### Avoid:

* Random pixel values
* Inline styles
* Excessive custom CSS

---

## Design System

Maintain consistency for:

* Colors
* Typography
* Spacing
* Radius
* Shadows
* Animations

Use CSS variables.

Example:

```css
--primary
--secondary
--background
--foreground
```

---

# UI/UX Standards

## Design Philosophy

The UI should feel:

* Premium
* Modern
* Minimal
* Fast
* Clean

---

## Required UX Principles

### Every screen must have:

* Proper spacing
* Visual hierarchy
* Loading states
* Empty states
* Error states
* Responsive behavior

---

## Animations

Use Framer Motion carefully.

Rules:

* Subtle animations only
* No distracting motion
* Prioritize smooth transitions

---

# Responsive Design Rules

Must support:

* Mobile
* Tablet
* Desktop

Always use:

```txt
sm:
md:
lg:
xl:
2xl:
```

Mobile-first design is mandatory.

---

# Accessibility Standards

Must follow:

* Semantic HTML
* Keyboard navigation
* Proper labels
* ARIA attributes where needed
* Contrast accessibility

---

# Performance Best Practices

## Use:

* Server Components by default
* Client Components only when necessary
* Dynamic imports
* Image optimization
* Route-level code splitting

---

## Avoid:

* Unnecessary re-renders
* Large client bundles
* Overfetching
* Heavy animations

---

# State Management Rules

## Use Local State For:

* UI interactions
* Form state

## Use Zustand For:

* Shared global state

## Use React Query For:

* API caching
* Server state

Avoid prop drilling.

---

# Form Standards

Every form should include:

* Validation
* Error handling
* Loading state
* Disabled state
* Proper accessibility

Use:

* React Hook Form
* Zod schemas

---

# Error Handling

Always implement:

* Try/catch
* Error boundaries
* Toast notifications
* Graceful fallback UI

Never expose raw server errors.

---

# Environment Variables

Rules:

* Never hardcode secrets
* Use `.env.local`
* Validate environment variables

Example:

```ts
import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
})
```

---

# Naming Conventions

## Components

```txt
PascalCase
```

Example:

```txt
UserCard.tsx
```

---

## Hooks

```txt
useSomething
```

Example:

```txt
useAuth.ts
```

---

## Files

```txt
kebab-case
```

Example:

```txt
user-profile-card.tsx
```

---

# Clean Code Rules

## Functions Should:

* Do one thing
* Be small
* Have meaningful names

---

## Avoid:

* Nested conditionals
* Magic values
* Repeated logic
* Large files

---

# Reusability Rules

Before creating a new component:

1. Check existing components
2. Reuse patterns
3. Avoid duplicate UI

---

# Logging Standards

Use:

* Structured logging
* Centralized logger

Never leave:

```ts
console.log()
```

in production.

---

# Security Best Practices

Always:

* Sanitize inputs
* Validate data
* Protect API routes
* Avoid exposing secrets
* Use secure headers

---

# Git Standards

## Branch Naming

```txt
feature/
fix/
refactor/
hotfix/
```

Example:

```txt
feature/dashboard-redesign
```

---

## Commit Message Format

```txt
feat:
fix:
refactor:
style:
docs:
```

Example:

```txt
feat: add dashboard analytics cards
```

---

# Testing Standards

## Use:

* Vitest or Jest
* React Testing Library
* Playwright (E2E)

---

## Test:

* Critical business logic
* Forms
* API calls
* Edge cases

---

# SEO Standards

Always include:

* Metadata
* Open Graph tags
* Proper headings
* Semantic HTML

Use Next.js metadata API.

---

# Code Review Checklist

Before merging:

* Code is reusable
* No duplicate logic
* Proper typing exists
* Accessibility checked
* Responsive design verified
* Performance considered
* No console logs
* No unused imports
* Proper error handling added

---

# Preferred Development Workflow

## Build in This Order

1. Layout structure
2. Design system
3. Reusable components
4. Feature modules
5. API integration
6. State management
7. Optimization
8. Testing

---

# Important Engineering Rules

## Always Prefer:

* Composition over inheritance
* Server Components over Client Components
* Reusable abstractions
* Declarative patterns
* Simplicity over cleverness

---

# Final Goal

The application should feel:

* Fast
* Elegant
* Premium
* Scalable
* Maintainable
* Production-ready

Every feature should be built as if it will scale to millions of users.

---

# Developer Mindset

Before writing code ask:

* Is this reusable?
* Is this scalable?
* Is this maintainable?
* Is this accessible?
* Is this performant?
* Is this the simplest clean solution?

Build like a senior engineer.

```
```
