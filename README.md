# Interledger Developer Experience Challenge – Documentation Platform

This is my submission for the Developer Experience Engineer role at the Interledger Foundation.

## Overview

This project is a **Jamstack documentation platform** that includes:

- ✅ OpenAPI documentation viewer
- ✅ A tutorial section with embedded code samples
- ✅ A blog section powered by a CMS
- ✅ Branding support to generate white-labeled builds
- ✅ Optimized performance with **Core Web Vitals > 80**

The platform is deployed on **Netlify** and uses build-time branding selection.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) with App Router (Static Export mode)
- **CMS**: [Contentful](https://contentful.com) for Blog posts
- **API Docs**: [Redoc](https://github.com/Redocly/redoc) for OpenAPI rendering
- **Code Blocks**: [prism-react-renderer](https://github.com/FormidableLabs/prism-react-renderer)
- **Styling**: TailwindCSS, with dynamic theming based on brand
- **Deployment**: Netlify (Static Export)

## 🧩 Branding System

The platform supports building brand-specific versions of the site by using the `NEXT_PUBLIC_BRAND` environment variable.

Each brand can define:

- `name`
- `description`
- `primaryColor`, `accentColor`, `textColor`, `backgroundColor`
- `logo`
- `favicon`
- Code theme (`github`, `dracula`, etc.)

Example:

```ts
export const brands = {
  default: {
    name: 'PetStore Docs',
    logo: '/logo-default.png',
    primaryColor: '#0F172A',
    accentColor: '#6366F1',
    backgroundColor: '#FFFFFF',
    textColor: '#0F172A', 
    description: 'Official documentation for the Swagger PetStore API. Manage pets, users, and store orders efficiently.',
    codeBlockTheme: 'dracula',
    favicon: '/favicon-default.ico'
  },
};
```
## 🧪 Running Locally

git clone https://github.com/tatarodriguez11/documentation-platform.git
cd documentation-platform

# Set the brand you want to preview
export NEXT_PUBLIC_BRAND=default

npm install
npm run build
npm run start


If you have any questions, I’ll be happy to walk you through the code in the live session.
