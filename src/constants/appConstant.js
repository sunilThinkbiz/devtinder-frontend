// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/login",
    LOGOUT: "/logout",
    REGISTER: "/register",
    REFRESH: "/refresh",
  },
  USERS: {
    BASE: "/users",
    PROFILE: "/users/profile",
    UPDATE: "/users/update",
  },
  // Add more endpoints as needed
};

// Application Routes
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  PROFILE: "/profile",
};

// Default Avatar
export const DEFAULT_AVATAR = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

