# PetFinder (Fetch Frontend Take-Home Exercise)

Welcome to the Dog Finder App! This app allows dog lovers to search through a database of shelter dogs, filter by breed, and find their perfect furry friend. The app also lets users log in, save their favorite dogs, and generate a match based on their favorites.

## Features

- **User Authentication**: Log in with your name and email and log out functionality.
- **Search Dogs**: Filter and search for available shelter dogs by breed, age, and location.
- **Sort Breeds**: sort available dogs by breed in ascending or descending order.
- **Paginated Results**: Browse through results with pagination.
- **Favorites**: Select your favorite dogs from the search results.
- **Match Generation**: Get a match based on all favorited dogs.
- **Dog Info**: View detailed information about each dog including their name, breed, age, and location.

## Technologies Used

- **Next.js 15**: React framework for server-side rendering and static site generation
- **React**: JavaScript library for building user interfaces
- **TailwindCSS**: For styling the app
- **Fetch API**: For communicating with the backend and getting data about dogs and locations
- **ShadcnUI**: Component library with beautiful and ready to use components out-the-box

## Getting Started

Follow these steps to run the app locally:

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or later)
- **Yarn** or **npm** (for dependency management)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/sonhoang95/fetch-frontend-take-home-exercise.git
   cd fetch-frontend-take-home-exercise
   ```

### Getting Started

1. **First, run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the app in development.

2. **First, build from development server:**

```bash
npm run build && npm run start
# or
yarn build && yarn start
# or
pnpm build && pnpm start
# or
bun build && bun start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the app fully built in development.

3. **Preview Link**:

Open [https://fetch-frontend-take-home-exercise-app.vercel.app/](https://fetch-frontend-take-home-exercise-app.vercel.app/) for a fully deployed and working version of the app hosted in Vercel.
