# Project Folder Structure

This document describes the folder structure of the DevTinder Frontend application.

```
src/
├── components/          # Reusable UI components
│   ├── NavBar.jsx      # Navigation bar component
│   ├── Footer.jsx      # Footer component
│   └── Layout.jsx      # Main layout wrapper component
│
├── pages/              # Page components (routes)
│   ├── Login.jsx       # Login page
│   └── Profile.jsx     # Profile page
│
├── services/           # API services and external integrations
│   ├── api.js          # Axios instance with interceptors
│   └── authService.js  # Authentication service
│
├── hooks/              # Custom React hooks
│   └── useAuth.js      # Authentication hook
│
├── utils/              # Utility functions
│   ├── validation.js   # Form validation utilities
│   └── helpers.js      # Helper functions
│
├── store/              # Redux store configuration
│   ├── slices/         # Redux slices
│   │   └── authSlice.js # Authentication slice
│   └── store.js        # Store configuration
│
├── constants/          # Application constants
│   └── api.js          # API endpoints and configuration
│
├── App.jsx             # Main App component with routing
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## Folder Descriptions

### `/components`
Reusable UI components that can be used across multiple pages.
- **NavBar**: Top navigation bar with search and user menu
- **Footer**: Page footer with copyright and social links
- **Layout**: Main layout wrapper that includes NavBar and Footer

### `/pages`
Page-level components that represent different routes in the application.
- **Login**: User login page
- **Profile**: User profile page

### `/services`
API services and external service integrations.
- **api.js**: Configured axios instance with request/response interceptors
- **authService.js**: Authentication-related API calls (login, register, logout)

### `/hooks`
Custom React hooks for reusable logic.
- **useAuth**: Hook for managing authentication state


### `/utils`
Utility functions and helpers.
- **validation.js**: Form validation functions
- **helpers.js**: General helper functions (date formatting, text truncation, etc.)

### `/constants`
Application-wide constants and configuration.
- **api.js**: API base URL and endpoint definitions

### `/store`
Redux store configuration and state management.
- **store.js**: Redux store setup with all reducers
- **slices/authSlice.js**: Authentication state slice with actions and reducers

## Best Practices

1. **Components**: Keep components small and focused on a single responsibility
2. **Pages**: Each page should be self-contained and handle its own state
3. **Services**: All API calls should go through services for consistency
4. **Hooks**: Extract reusable logic into custom hooks
5. **Utils**: Keep utility functions pure and testable
6. **Constants**: Store all magic strings and configuration in constants

## Adding New Features

- **New Page**: Add to `/pages` and update routes in `App.jsx`
- **New Component**: Add to `/components` if reusable, or keep in page if specific
- **New API Endpoint**: Add method to appropriate service in `/services`
- **New Utility**: Add to `/utils` if it's a general-purpose function

