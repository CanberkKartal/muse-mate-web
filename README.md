# MuseMate

## System Architecture Overview

MuseMate implements a domain-driven web application architecture that facilitates personalized museum exploration through optimized tour generation. The system employs a layered architectural pattern with clear separation of concerns to ensure maintainability, extensibility, and scalability.

## Core Domain Capabilities

The application offers five primary functional domains:

- **Museum Exploration**: Comprehensive browsing and detailed examination of museum collections, with indexing by location, theme, and content.
- **Section Analysis**: Granular inspection of museum organizational structure with floor-based navigation and key artifact identification.
- **Tour Generation**: Algorithmic creation of optimized visitation paths based on user-selected points of interest, implementing floor-based routing optimization.
- **Tour Persistence**: Secure storage and management of personalized tour configurations with full CRUD capabilities.
- **User Preference Management**: Consistent preference persistence across sessions with theme and language configuration.

## Technical Architecture

### Technology Stack Implementation

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend Framework** | Next.js (App Router) | Server component architecture for optimal rendering strategy |
| **UI Component System** | shadcn/ui (Radix UI) | Accessible component primitives with consistent styling |
| **Styling Implementation** | Tailwind CSS | Utility-first approach for constraint-based design system |
| **State Management** | Context API + Custom Hooks | Decoupled state logic with domain-specific encapsulation |
| **Data Synchronization** | React Query | Declarative server state with caching and synchronization |
| **Persistence Layer** | Supabase (PostgreSQL) | Relational integrity for complex domain relationships |
| **Authentication System** | Supabase Auth | JWT-based authentication with secure session management |
| **Deployment Infrastructure** | Vercel | Integrated CI/CD with optimized edge delivery |

### Domain Model Architecture

The system implements a structured domain model with defined relationships and invariants:

1. **Museum Entity**
   - Primary institution container with metadata and geographical context
   - Maintains one-to-many relationship with Section entities
   - Invariant: Must contain at least one valid Section for tour generation

2. **Section Entity**
   - Discrete museum area with spatial positioning (floor) and thematic grouping
   - Maintains one-to-many relationship with KeyObject entities
   - Participates in many-to-many relationship with Tour entities

3. **KeyObject Entity**
   - Notable artifact with cultural significance identifiers
   - Contains descriptive metadata and visual representation references
   - Bounded within exactly one Section context

4. **Tour Entity**
   - User-generated visitation plan with path optimization
   - Maintains many-to-one relationship with Museum entity
   - Maintains many-to-many relationship with Section entities
   - Invariant: Must contain at least one Section and reference exactly one Museum

5. **User Entity**
   - Application user with authentication credentials and preferences
   - Maintains one-to-many relationship with Tour entities
   - Maintains consistent theme and localization preferences

### Data Flow Architecture

The application implements a unidirectional data flow architecture across four distinct layers:

1. **Presentation Layer**: 
   - React components with server/client segmentation
   - Optimized rendering lifecycle with selective hydration
   - Event delegation to application layer

2. **Application Layer**: 
   - Custom hooks implementing use-case specific logic
   - Context providers for cross-cutting state management
   - Domain event coordination

3. **Domain Layer**:
   - Business rule enforcement
   - Entity relationship management
   - Invariant validation

4. **Infrastructure Layer**:
   - Repository implementations for data access
   - Authentication service integration
   - External API communication

### Project Structure Schema

```
src/
  app/                  # Next.js App Router implementation
    (auth)/             # Authentication route group
      login/            # Login page implementation
      register/         # Registration page implementation
      layout.tsx        # Auth-specific layout
    (main)/             # Primary application route group
      museums/          # Museum discovery and detail routes
        [id]/           # Dynamic museum detail route
        page.tsx        # Museum index page
      tours/            # Tour management routes
        [id]/           # Dynamic tour detail route
        create/         # Tour creation workflow
        page.tsx        # Tour index page
      profile/          # User profile management
        page.tsx        # Profile page implementation
      layout.tsx        # Main application layout
    api/                # API route handlers (when required)
    layout.tsx          # Root layout with provider initialization
    
  components/           # Reusable UI components
    ui/                 # shadcn/ui component library integration
    museum/             # Museum-specific component implementations
      museum-card.tsx   # Museum summary display component
      section-list.tsx  # Section visualization component
      key-object.tsx    # Key object presentation component
    tour/               # Tour-specific component implementations
      tour-creator.tsx  # Tour generation interface
      section-selector.tsx # Section selection component
      tour-card.tsx     # Tour summary display component
    profile/            # Profile-specific component implementations
    layout/             # Layout component implementations
    
  lib/                  # Core utilities and services
    services/           # API and data access service layer
      museum-service.ts # Museum data access implementation
      tour-service.ts   # Tour management implementation
      user-service.ts   # User data management implementation
    utils/              # Utility function implementations
      path-optimizer.ts # Tour path optimization algorithm
      validation.ts     # Input validation utilities
    hooks/              # Custom React hooks
      use-museums.ts    # Museum data access hook
      use-tours.ts      # Tour management hook
      use-theme.ts      # Theme management hook
    types/              # TypeScript type definitions
      museum.types.ts   # Museum domain type definitions
      tour.types.ts     # Tour domain type definitions
      user.types.ts     # User domain type definitions
  
  context/              # Global state management
    theme-provider.tsx  # Theme context provider implementation
    auth-provider.tsx   # Authentication context provider
    app-provider.tsx    # Application state management
```

## Development Environment Configuration

### Prerequisites

- Node.js (v18.17.0 or later)
- npm (v9.6.0 or later) or yarn (v1.22.0 or later)
- Supabase account for backend services

### Installation Process

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/musemate.git
   cd musemate
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials and configuration parameters
   ```

4. Initialize Supabase schema:
   ```bash
   # Execute the schema.sql script in your Supabase project
   # This can be done through the Supabase dashboard or CLI
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Access the application:
   - Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema Implementation

The system implements a relational schema with the following primary tables:

```sql
-- Core domain tables
CREATE TABLE museums (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  description TEXT,
  theme TEXT,
  official_page TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  museum_id UUID NOT NULL REFERENCES museums(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  floor INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE key_objects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  museum_id UUID NOT NULL REFERENCES museums(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tour_sections (
  tour_id UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  display_order INTEGER NOT NULL,
  PRIMARY KEY (tour_id, section_id)
);

-- Add database functions and triggers for maintaining updated_at values
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_museums_updated_at
BEFORE UPDATE ON museums
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Similar triggers for other tables
```

## Authentication Implementation

The system implements a secure authentication flow using Supabase Auth with the following characteristics:

1. **Authentication Methods**:
   - Email/Password authentication for the MVP
   - JWT-based session management
   - Secure HTTP-only cookie implementation

2. **Authorization Model**:
   - Resource-based access control (RBAC)
   - Tour ownership verification
   - Row-level security in database tables

## Contributing Guidelines

### Development Workflow

1. **Branch Strategy**:
   - `main`: Production-ready code
   - `develop`: Integration branch for feature development
   - `feature/*`: Individual feature implementations
   - `bugfix/*`: Issue resolution implementations

2. **Code Standards**:
   - TypeScript strict mode enabled
   - ESLint configuration with Next.js recommended rules
   - Prettier for consistent code formatting
   - Component documentation with JSDoc standards

3. **Testing Requirements**:
   - Unit tests for utility functions and hooks
   - Component tests with React Testing Library
   - Integration tests for critical user flows
   - Minimum test coverage: 70%

4. **Pull Request Process**:
   - Feature branch → Develop → Main
   - Required code review by at least one team member
   - All tests passing
   - No ESLint warnings or errors

## Deployment Architecture

The application implements a continuous deployment pipeline with the following characteristics:

1. **Development Environment**:
   - Local development with hot reloading
   - Supabase local development setup

2. **Staging Environment**:
   - Vercel preview deployments
   - Automated deployment from `develop` branch
   - Integration testing environment

3. **Production Environment**:
   - Vercel production deployment
   - Automated deployment from `main` branch
   - Performance monitoring and analytics

## Roadmap

### Phase 1: Foundation Implementation
- Core authentication system
- Museum and section data models
- Basic UI component library

### Phase 2: Core Functionality
- Museum browsing and detailed view
- Tour creation with section selection
- Profile management

### Phase 3: Enhancement
- Path optimization algorithms
- Offline capability
- Performance optimization

### Phase 4: Expansion
- Advanced search capabilities
- Social sharing features
- Museum API integrations

## License

[MIT License](LICENSE) - see the LICENSE file for details.