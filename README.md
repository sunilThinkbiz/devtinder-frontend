# DevTinder Frontend

A modern developer networking platform built with React and Vite.

## Tech Stack

- **React 19** - UI library
- **Vite 7** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS component library
- **ESLint** - Code linting

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory (optional):
   ```env
   VITE_API_URL=http://localhost:3000/api
   VITE_ENV=development
   ```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

### Linting

Run ESLint to check for code issues:

```bash
npm run lint
```

## Project Structure

```
src/
├── App.jsx          # Main app component
├── main.jsx         # Entry point
├── index.css        # Global styles
├── NavBar.jsx       # Navigation component
├── Body.jsx         # Main body component
├── Footer.jsx        # Footer component
├── Login.jsx        # Login page
└── Profile.jsx      # Profile page
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT
