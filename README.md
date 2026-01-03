# 🐾 Petsgram

A modern pets social platform built as a side project to explore and learn AI-assisted development workflows. This project focuses on leveraging AI coding tools like GitHub Copilot to build a full-stack application where users can create accounts, manage pet profiles, and share posts.

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)](https://www.typescriptlang.org/)

## 🎯 Project Goals

- **Learn AI-Assisted Development**: Explore how AI coding assistants can accelerate development and improve code quality
- **Build a Social Platform**: Create a space for pet lovers to share and connect
- **Modern Tech Stack**: Use cutting-edge technologies and best practices

## ✨ Current Features

- 🔐 **User Authentication**: Secure registration and login powered by Supabase Auth
- 👤 **Profile Management**: Centralized user state management with Pinia
- 🛡️ **Protected Routes**: Middleware-based authentication guards
- ✅ **Form Validation**: Robust client-side validation using Joi
- 🎨 **Modern UI**: Beautiful, responsive interface with Nuxt UI and Tailwind CSS
- 🌙 **Type Safety**: Full TypeScript support with auto-generated database types

## 🛠️ Tech Stack

### Frontend
- **Nuxt 4.2.2** - Full-stack Vue.js framework with SSR/SSG capabilities
- **Vue 3** - Progressive JavaScript framework
- **TypeScript 5.9.3** - Type-safe development

### UI & Styling
- **Nuxt UI 4.3.0** - Pre-built Vue component library
- **Tailwind CSS** - Utility-first CSS framework
- **Iconify** - Icon library with Lucide icons
- **Custom Color Palette**: Fiery terracotta primary, espresso secondary

### Backend & Database
- **Supabase** - Backend-as-a-Service (BaaS)
  - PostgreSQL database
  - Authentication & authorization
  - Auto-generated TypeScript types

### State Management
- **Pinia 3.0.4** - Official Vue state management
- **Composables Pattern** - Reusable business logic with TypeScript

### Validation
- **Joi 18.0.2** - Schema validation for forms
  - Username: 3-20 characters
  - Email: Valid email format
  - Password: Minimum 6 characters

### Development Tools
- **ESLint 9.39.2** - Code linting with Nuxt ESLint config
- **vue-tsc 3.2.1** - Vue TypeScript type checking
- **Nuxt DevTools** - Enhanced development experience
- **Renovate** - Automated dependency updates

## 📁 Project Structure

```
petsgram/
├── app/
│   ├── assets/           # Global styles and CSS files
│   ├── components/       # Vue components organized by feature
│   ├── composables/      # Reusable logic and business logic with TypeScript types
│   ├── errors/           # Custom error classes
│   ├── layouts/          # Application layouts
│   ├── middleware/       # Route guards and navigation middleware
│   ├── pages/            # File-based routing pages
│   ├── stores/           # Pinia state management stores
│   ├── types/            # TypeScript type definitions and interfaces
│   └── utils/            # Utility functions and helper methods
└── public/               # Static assets and public files
```

## 🚀 Setup

### Prerequisites
- Node.js (v18 or higher)
- npm package manager
- Supabase account (for backend services)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd petsgram
```

2. Install dependencies:
```bash
npm install
```

3. Configure Supabase:
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Set up your environment variables (see Supabase documentation)
   - Create the `profiles` table with the required schema

## 💻 Development

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## 🏗️ Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## 📄 License

MIT License - see LICENSE file for details
