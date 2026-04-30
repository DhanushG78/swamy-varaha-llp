# Real Estate Platform

## Project Overview

A modern, premium luxury real estate platform built with Next.js and Contentstack. This platform features a high-end UI design with a dark charcoal aesthetic, smooth property detail carousels, and dynamic content integration. It serves as a comprehensive property listing site that elegantly presents homes, categories, and real estate agents.

## Features

- **Dynamic Content Management:** Seamlessly fetches properties, categories, and agent data from Contentstack Headless CMS.
- **Premium Luxury UI:** Sophisticated design system utilizing dark charcoal navbars, accent red CTAs, and alternating light-gray/white sections.
- **Interactive Property Carousels:** Smooth image sliders for property details using Embla Carousel.
- **Localized Filtering:** Price ranges and financial formatting localized to Indian Rupees (INR).
- **Responsive Layout:** Fully responsive, mobile-first design powered by Tailwind CSS v4.
- **Modern Architecture:** Utilizes Next.js App Router for optimal performance, server-side rendering, and dynamic routing.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (v16 App Router)
- **Library:** [React](https://react.dev/) (v19)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4)
- **Language:** TypeScript
- **Carousels/Animations:** Embla Carousel React

## CMS Used

- **[Contentstack](https://www.contentstack.com/):** A headless CMS used to manage and deliver content (Properties, Categories, Agents, Media) across the platform.

## Deployment Link

https://swamy-varaha-llp.contentstackapps.com/


## How to Run Locally

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd real-estate-platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project and add your Contentstack credentials:

```env
CONTENTSTACK_API_KEY=your_api_key
CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
CONTENTSTACK_ENVIRONMENT=your_environment
CONTENTSTACK_REGION=your_region
```

### 4. Run the Development Server

```bash
npm run dev
```

### 5. View the App

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.
