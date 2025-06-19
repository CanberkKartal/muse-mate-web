# CLAUDE.md - MuseMate Project Guidelines

This file provides comprehensive guidance to Claude Code when working with the MuseMate museum exploration application.

## Project Overview

MuseMate is a domain-driven web application for personalized museum exploration with optimized tour generation. The system uses a layered architecture pattern with clear separation of concerns.

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend Framework | Next.js 14+ (App Router) | Server component architecture with selective hydration |
| UI Components | shadcn/ui (Radix UI) | Accessible, unstyled component primitives |
| Styling | Tailwind CSS | Utility-first CSS with constraint-based design |
| State Management | Context API + Custom Hooks | Domain-specific state encapsulation |
| Data Fetching | React Query (TanStack Query) | Server state management with caching |
| Database | Supabase (PostgreSQL) | Relational data with row-level security |
| Authentication | Supabase Auth | JWT-based auth with secure sessions |
| Deployment | Vercel | Edge-optimized delivery with CI/CD |

## Architecture Principles

### Domain-Driven Design
- Implement clear domain boundaries between Museum, Section, KeyObject, Tour, and User entities
- Enforce business invariants at the domain layer
- Use repository pattern for data access abstraction

### Layered Architecture
1. **Presentation Layer**: React components with server/client separation
2. **Application Layer**: Custom hooks and use-case implementations
3. **Domain Layer**: Business logic and entity relationships
4. **Infrastructure Layer**: External service integrations

### Data Flow
- Unidirectional data flow from infrastructure → domain → application → presentation
- Server components for initial data fetching
- Client components only for interactivity
- React Query for client-side cache management

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth route group
│   │   ├── login/
│   │   └── register/
│   ├── (main)/            # Main app routes
│   │   ├── museums/
│   │   │   ├── [id]/
│   │   │   └── page.tsx
│   │   ├── tours/
│   │   │   ├── [id]/
│   │   │   ├── create/
│   │   │   └── page.tsx
│   │   └── profile/
│   ├── api/               # API routes (minimal use)
│   └── layout.tsx         # Root layout with providers
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── museum/            # Museum domain components
│   ├── tour/              # Tour domain components
│   └── layout/            # Layout components
├── lib/
│   ├── services/          # Data access services
│   ├── utils/             # Utility functions
│   ├── hooks/             # Custom React hooks
│   └── types/             # TypeScript definitions
└── context/               # Global state providers
```

## Code Style Guidelines

### TypeScript
- Enable strict mode in tsconfig.json
- Define explicit return types for all functions
- Use interface for object shapes, type for unions/primitives
- Implement proper error types, never use `any`

### React Components
```typescript
// Use arrow functions with explicit typing
export const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
  // Component logic
};

// Server components (default)
// app/page.tsx
export default async function Page() {
  const data = await fetchData(); // Direct async/await
  return <div>{/* UI */}</div>;
}

// Client components (only when needed)
'use client';
export const InteractiveComponent = () => {
  // Client-side logic
};
```

### State Management
```typescript
// Context pattern for global state
export const MuseumContext = createContext<MuseumContextType | undefined>(undefined);

// Custom hook pattern
export function useMuseums() {
  const context = useContext(MuseumContext);
  if (!context) throw new Error('useMuseums must be used within MuseumProvider');
  return context;
}
```

### Data Services
```typescript
// Repository pattern with consistent interface
export const museumService = {
  async findAll(): Promise<Museum[]> { },
  async findById(id: string): Promise<Museum | null> { },
  async create(data: CreateMuseumDTO): Promise<Museum> { },
  async update(id: string, data: UpdateMuseumDTO): Promise<Museum> { },
  async delete(id: string): Promise<void> { }
};
```

## Database Schema

```sql
-- Core tables with relationships
museums (id, name, city, description, theme, official_page)
sections (id, museum_id, name, floor, description)
key_objects (id, section_id, name, description, image_url)
tours (id, user_id, museum_id, name)
tour_sections (tour_id, section_id, display_order)

-- All tables include created_at, updated_at timestamps
-- Use UUID for all primary keys
-- Implement row-level security policies
```

## Component Patterns

### Loading States
```typescript
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorDisplay error={error} />;
if (!data) return <EmptyState />;
```

### Error Boundaries
Implement error boundaries for each major section to prevent cascading failures.

### Accessibility
- All interactive elements must have proper ARIA labels
- Maintain WCAG 2.1 AA compliance
- Test with screen readers

## API Integration

### Supabase Client
```typescript
// lib/supabase/client.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// lib/supabase/server.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
```

### React Query Setup
```typescript
// Consistent query key structure
export const queryKeys = {
  museums: {
    all: ['museums'] as const,
    detail: (id: string) => ['museums', id] as const,
  },
  tours: {
    all: ['tours'] as const,
    byUser: (userId: string) => ['tours', 'user', userId] as const,
  },
};
```

## Testing Guidelines

- Unit tests for utility functions and hooks
- Component tests focusing on user interactions
- Integration tests for critical user flows
- E2E tests for complete user journeys

## Security Considerations

- Never expose database credentials
- Implement proper input validation
- Use Supabase RLS for data access control
- Sanitize user inputs before display
- Implement CSRF protection

## Performance Guidelines

- Use dynamic imports for code splitting
- Implement image optimization with next/image
- Minimize client-side JavaScript
- Use React.memo judiciously
- Implement virtual scrolling for long lists

## Build Commands

```bash
# Development
npm run dev          # Start dev server on http://localhost:3000

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
npm run test         # Run test suite

# Database
npm run db:migrate   # Run migrations
npm run db:seed      # Seed development data
```

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
```

## Git Workflow

- Feature branches: `feature/description`
- Commit format: `type(scope): message`
- Types: feat, fix, docs, style, refactor, test, chore
- Always create PRs, never push to main directly

## Common Patterns

### Form Handling
Use react-hook-form with zod validation for all forms.

### Date Handling
Use date-fns for all date operations.

### Styling Priority
1. Tailwind utility classes
2. CSS modules for complex styles
3. Never use inline styles

## Error Messages

Provide user-friendly error messages with actionable next steps.

## Documentation

- Document complex business logic
- Add JSDoc comments for service methods
- Maintain README with setup instructions