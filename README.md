# Mireo Health Patient Frontend

![Image description](.github/assets/project-logo.png)

## About

This is the **patient frontend repository** for **Mireo Health**, an AI-powered health tech platform that helps simplify and make basic healthcare available to people in developing and unreached areas. This interface is designed for patients and non-medical users to access healthcare services, consultations, and health management tools. Our mission is to democratize healthcare access through innovative technology solutions.

## 🚀 Technologies Used

This application is built with modern technologies for optimal performance, scalability, and developer experience:

### Core Framework & Language

- **[Next.js 15](https://nextjs.org/)** - React framework with App Directory for optimal performance
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript with enhanced developer experience
- **[React 18](https://reactjs.org/)** - UI library with concurrent features

### Styling & UI Components

- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautifully designed React components
- **[CVA (Class Variance Authority)](http://cva.style/)** - Component variant management

### Development Tools

- **[ESLint 9](https://eslint.org/)** - Code linting and error prevention
- **[Prettier](https://prettier.io/)** - Code formatting
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[Corepack](https://github.com/nodejs/corepack)** - Package manager management

### Testing

- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[React Testing Library](https://testing-library.com/react)** - React component testing
- **[Playwright](https://playwright.dev/)** - End-to-end testing

### Development & Documentation

- **[Storybook](https://storybook.js.org/)** - Component development and documentation
- **[T3 Env](https://env.t3.gg/)** - Environment variable management

### DevOps & Automation

- **[GitHub Actions](https://github.com/features/actions)** - CI/CD workflows
- **[Conventional Commits](https://www.conventionalcommits.org/)** - Standardized commit messages
- **[Semantic Release](https://github.com/semantic-release/semantic-release)** - Automated versioning and changelog
- **[Renovate](https://www.whitesourcesoftware.com/free-developer-tools/renovate)** - Automated dependency updates

### Monitoring & Performance

- **[OpenTelemetry](https://opentelemetry.io/)** - Observability and monitoring
- **[Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)** - Bundle size optimization

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **pnpm** (recommended) or npm/yarn
- **Git**

## 🛠 Installation

1. **Clone the repository**

   ```bash
   git clone <your-repository-url>
   cd mireo-patient-fe
   ```

2. **Install dependencies**

   ```bash
   # Using pnpm (recommended)
   pnpm install

   # Or using npm
   npm install

   # Or using yarn
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   # Copy the example environment file
   cp .env.example .env.local

   # Edit the environment variables
   nano .env.local  # or use your preferred editor
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📝 Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues
pnpm type-check   # Run TypeScript checks

# Testing
pnpm test         # Run unit tests
pnpm test:watch   # Run tests in watch mode
pnpm test:ui      # Run tests with UI
pnpm test:e2e     # Run end-to-end tests

# Storybook
pnpm storybook    # Start Storybook development server
pnpm build-storybook  # Build Storybook for production

# Bundle Analysis
pnpm analyze      # Analyze bundle size
```

## 🏗 Project Structure

```
├── app/                    # Next.js App Directory
│   ├── (auth)/            # Authentication routes
│   ├── dashboard/         # Patient dashboard pages
│   ├── account/           # User profile management
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── forms/            # Form components
│   └── ...               # Custom components
├── lib/                   # Utility functions and configurations
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── public/                # Static assets
└── stories/               # Storybook stories
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Configure environment variables** in the Vercel dashboard
3. **Deploy automatically** on every push to main branch

## 📞 Support

For support, please contact the development team or create an issue in this repository.

---

**Mireo Health** - Making healthcare accessible to everyone, everywhere.
