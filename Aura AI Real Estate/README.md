# Real Estate AI Concierge

A luxury real estate website built with SvelteKit and Skeleton UI.

## Features

- **Dark Luxury Aesthetics**: Custom Tailwind theme with glassmorphism and cinematic interactions.
- **SvelteKit + Skeleton UI**: High performance, clean component architecture.
- **Interactive Elements**:
    - Cinematic Hero Selector
    - AI Concierge Orb
    - Parallax Property Showcase
    - Amenities Reveal Grid

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173).

## Project Structure

- `src/lib/components`: UI Components (Navbar, Hero, PropertyShowcase, etc.)
- `src/lib/data.ts`: Mock property data
- `src/routes`: SvelteKit routes
    - `/`: Landing page
    - `/properties`: Property explorer
    - `/property/[id]`: Property details
