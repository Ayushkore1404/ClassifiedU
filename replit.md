# ClassifiedU - Campus Marketplace

## Overview

ClassifiedU is a full-stack web application designed as a marketplace for college students. It allows students to buy, sell, and rent academic materials, as well as find compatible roommates within their university community. The application is built using modern web technologies with a focus on user experience and community building.

## Recent Changes

### Migration to Replit Environment (July 27, 2025)
- Successfully migrated project from Replit Agent to standard Replit environment
- Verified all dependencies are properly installed and functioning
- Confirmed Express server runs on port 5000 with API endpoints responding correctly
- Project is now ready for continued development in the Replit environment

### Database Integration (July 27, 2025)
- Created PostgreSQL database using Replit's database service
- Implemented database connection layer using Neon serverless PostgreSQL driver
- Replaced in-memory storage with DatabaseStorage class using Drizzle ORM
- Successfully pushed database schema with all tables (users, listings, roommate_profiles, messages)
- All API endpoints now persist data to PostgreSQL instead of memory

### Windows Compatibility (July 28, 2025)
- Added cross-env package for Windows environment variable support
- Created start-windows.bat for one-click startup on Windows
- Added VS Code workspace configuration with recommended extensions
- Created comprehensive Windows setup documentation (README.md, WINDOWS_SETUP.md)
- Optimized for both VS Code and command line development on Windows

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and developer experience
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Context for authentication state, TanStack Query for server state
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent design
- **Styling**: Tailwind CSS with CSS variables for theming support (light/dark modes)
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript for API development
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL database storage with Drizzle ORM
- **API Design**: RESTful API with consistent error handling and logging

### Monorepo Structure
- `client/` - React frontend application
- `server/` - Express.js backend API
- `shared/` - Common TypeScript types and schemas
- Root level configuration files for build tools and development

## Key Components

### Authentication System
- User registration and login functionality
- Password-based authentication (stored in plain text for development)
- Session management using context providers
- Protected routes and user state persistence

### Marketplace Features
- **Listings Management**: Create, read, update, delete marketplace listings
- **Categories**: Textbooks, Electronics, Study Notes, and general items
- **Search & Filter**: Search by title/description, filter by category and price range
- **University-based**: Listings are scoped to specific universities

### Roommate Finder
- **Profile Creation**: Students can create roommate profiles with preferences
- **Matching System**: Browse compatible roommates based on university and preferences
- **Messaging Placeholder**: UI prepared for future messaging functionality

### User Profiles
- Personal information management (name, university, major, year)
- Avatar support and bio sections
- Listing history and activity tracking

## Data Flow

### Client-Server Communication
- REST API calls using fetch with TanStack Query for caching and state management
- Centralized API request handling with error management
- Consistent response formats with proper HTTP status codes

### Database Operations
- Drizzle ORM provides type-safe database queries
- Schema-first approach with Zod validation
- Migrations handled through Drizzle Kit
- UUID primary keys for all entities

### State Management
- Authentication state managed through React Context
- Server state cached and synchronized via TanStack Query
- Form state handled by React Hook Form with Zod validation
- Local storage for authentication persistence

## External Dependencies

### Core Technologies
- **Neon Database**: Serverless PostgreSQL hosting
- **Radix UI**: Headless UI components for accessibility
- **TanStack Query**: Server state management and caching
- **Wouter**: Lightweight routing library
- **Zod**: Schema validation and type inference

### Development Tools
- **Vite**: Build tool with HMR and optimizations
- **TypeScript**: Type safety across the entire stack
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast JavaScript bundling for production

### UI & UX Libraries
- **Lucide React**: Icon library
- **Class Variance Authority**: Component variant management
- **Date-fns**: Date manipulation utilities
- **React Hook Form**: Form handling and validation

## Deployment Strategy

### Development Environment
- Vite dev server for frontend with HMR
- Express server with automatic restarts using tsx
- Integrated development setup with shared TypeScript configuration
- Environment variable management for database connections

### Production Build
- Frontend built to static assets via Vite
- Backend bundled using ESBuild for Node.js deployment
- Single deployment artifact with both frontend and backend
- Static file serving integrated into Express server

### Database Management
- Drizzle migrations for schema versioning
- Environment-based configuration for different deployment stages
- Connection pooling through Neon's serverless architecture

## Security Considerations

### Authentication
- Password storage is currently plain text (development only)
- Session management through localStorage (client-side)
- No JWT or token-based authentication implemented yet

### Data Validation
- Comprehensive Zod schemas for all data inputs
- Server-side validation for all API endpoints
- Type safety enforced throughout the application stack

### Future Security Enhancements Needed
- Password hashing (bcrypt or similar)
- JWT-based authentication
- CSRF protection
- Rate limiting
- Input sanitization for XSS prevention