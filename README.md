# Hana Cards 🌸

A boutique, minimalist e-commerce application for premium greeting cards, designed for the Melbourne, Australia market. Inspired by the clean aesthetic of [shorttalk.co](https://shorttalk.co).

## Features

- **Minimalist Design**: High-end typography (Inter), generous whitespace, and a grid-based gallery.
- **Interactive Experience**: Product cards with subtle fluid animations (Framer Motion) and hover image reveals.
- **Local Ready**: Configured for Melbourne, Australia with **AUD (A$)** pricing and local shipping placeholders.
- **Lightweight State**: Shopping cart managed globally with Zustand.
- **Fully Responsive**: Optimized for desktop, tablet, and mobile views.

## Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Deployment**: [Firebase Hosting](https://firebase.google.com/docs/hosting)

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is configured for **Firebase Hosting** using a static export (`output: 'export'`).

To deploy:

1. **Build the project**:

   ```bash
   npm run build
   ```

2. **Deploy to Firebase**:
   ```bash
   npx firebase deploy
   ```

Live Site: [https://hana-card.web.app](https://hana-card.web.app)
