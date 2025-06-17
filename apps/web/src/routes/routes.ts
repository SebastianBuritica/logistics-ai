export const ROUTES = {
  // Public routes
  HOME: "/",

  // Auth routes
  AUTH: {
    BASE: "/auth",
    SIGNUP: "/auth/signup",
    LOGIN: "/auth/login",
    VERIFY_EMAIL: "/auth/verify-email",
    WELCOME: "/auth/welcome",
    COMPANY_SETUP: "/auth/company-setup",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },

  // Protected routes
  DASHBOARD: "/dashboard",
  FLEET: "/fleet",
  ROUTES: "/routes",
  SHIPMENTS: "/shipments",
  ANALYTICS: "/analytics",
  SETTINGS: "/settings",

  // Fallback
  NOT_FOUND: "/404",
} as const;

export const AUTH_ROUTES = [
  ROUTES.AUTH.SIGNUP,
  ROUTES.AUTH.LOGIN,
  ROUTES.AUTH.VERIFY_EMAIL,
  ROUTES.AUTH.WELCOME,
  ROUTES.AUTH.COMPANY_SETUP,
  ROUTES.AUTH.FORGOT_PASSWORD,
  ROUTES.AUTH.RESET_PASSWORD,
] as const;

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.FLEET,
  ROUTES.ROUTES,
  ROUTES.SHIPMENTS,
  ROUTES.ANALYTICS,
  ROUTES.SETTINGS,
] as const;

export const PUBLIC_ROUTES = [ROUTES.HOME] as const;
