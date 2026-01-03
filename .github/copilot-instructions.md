# GitHub Copilot Instructions - Petsgram

> **Note**: Please update this file as project patterns and conventions evolve. Last updated: January 3, 2026

## Project Overview

Petsgram is a modern pet-focused social media platform built with Nuxt 4, Vue 3, and TypeScript. The application features user authentication, profile management, and is designed with a composables-first architecture for maximum code reusability and maintainability.

## Tech Stack

- **Framework**: Nuxt 4.2.2 (Vue 3 with Composition API)
- **Language**: TypeScript 5.9 (strict mode enabled)
- **Backend**: Supabase (authentication, database, storage)
- **State Management**: Pinia stores for shared application state
- **UI Library**: Nuxt UI 4.3 with Iconify icons (Lucide, Simple Icons)
- **Validation**: Joi for form and data validation
- **Linting**: ESLint 9 with Nuxt-specific configuration

## Architectural Patterns

### Composables-First Approach

Business logic should be encapsulated in composables located in `app/composables/`. Each composable should:
- Live in its own directory (e.g., `useRegister/`, `useUser/`)
- Have a separate `.types.ts` file for type definitions
- Use the `use` prefix for naming (e.g., `useRegister`, `useAuth`)
- Return an object with methods and reactive state
- Handle its own error states

**Note**: See `app/composables/.copilot-instructions.md` for detailed composable patterns and examples.

### State Management

- **Local component state**: Use `ref()` or `reactive()` from Vue 3
- **Shared application state**: Use Pinia stores in `app/stores/`
- **Composable state**: Always use `ref()` for primitive values
- **Form state**: Prefer `reactive()` for complex form objects

### Error Handling

- Create custom error classes in `app/errors/` for domain-specific errors
- Extend the base `Error` class and set a descriptive `name` property
- Use `instanceof` checks to differentiate error types
- Expose error state via refs rather than throwing to calling code
- Always provide user-friendly error messages

### Type Safety

- Use TypeScript for all files (`.ts`, `.vue` with `<script setup lang="ts">`)
- Create separate `.types.ts` files for type definitions
- Use `export type` for type exports
- Leverage database types from `app/types/database.types.ts`
- Create mapper utilities in `app/utils/mappers/` to convert between database and application types

## Component Conventions

### Vue Components

- Use Composition API with `<script setup lang="ts">`
- Organize components by feature in subdirectories (e.g., `components/Login/`, `components/Register/`)
- Use PascalCase for component names and file names (e.g., `HeroBanner.vue`)
- Keep components focused and single-purpose
- Extract reusable logic into composables

### Component Structure

```vue
<script setup lang="ts">
// 1. Imports
// 2. Props and emits
// 3. Composables
// 4. Local state
// 5. Computed properties
// 6. Methods/functions
// 7. Lifecycle hooks
</script>

<template>
  <!-- Template code -->
</template>

<style scoped>
  /* Component-specific styles */
</style>
```

## Styling and Linting

### ESLint Configuration

- **No comma-dangle**: Trailing commas are not used
- **Brace style**: 1tbs (one true brace style)
- **Quotes**: Single quotes for strings
- **Semi**: Required semicolons
- **Indentation**: 2 spaces

### CSS and Styling

- Use Tailwind CSS classes via Nuxt UI
- Scoped styles for component-specific CSS
- Global styles in `app/assets/css/main.css`
- Light mode is the default preference

## Supabase Integration

### Authentication

- Use `useSupabaseClient()` composable to access Supabase client
- Authentication methods: `supabaseClient.auth.signUp()`, `signIn()`, `signOut()`
- Store user metadata during sign up in the `options.data` object
- Redirect authenticated users from login/register pages
- Use middleware for route protection (`middleware/auth.ts`)

### Database Queries

- Use the fluent query API: `supabaseClient.from('table_name').select()`
- Chain query builders: `.eq()`, `.or()`, `.filter()` for conditions
- Always check for errors in the destructured response: `const { data, error } = await query`
- Handle errors appropriately (log, throw, or set error state)

### Type Safety with Supabase

- Import database types from `app/types/database.types.ts`
- Use mappers to convert between snake_case (database) and camelCase (application)
- Type your query responses appropriately

## Path Aliases

- `@/` - Alias for the `app/` directory
- Use absolute imports for better refactoring: `import { useRegister } from '@/composables/useRegister/useRegister'`

## Placeholder Sections (To Be Completed)

### Authentication Rules

<!-- TODO: Document authentication flows, token refresh, session management -->

### API Patterns

<!-- TODO: Document API endpoint conventions, request/response patterns, error handling -->

### Testing Strategy

<!-- TODO: Document testing approach, unit tests, integration tests, E2E tests -->

### Deployment

<!-- TODO: Document deployment process, environment variables, CI/CD pipeline -->

### Performance Optimization

<!-- TODO: Document lazy loading, code splitting, caching strategies -->

### Accessibility

<!-- TODO: Document a11y standards, ARIA labels, keyboard navigation -->

---

**Remember**: Keep this file updated as the project evolves. These instructions help GitHub Copilot generate code that matches your project's patterns and conventions.
