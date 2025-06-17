// apps/web/src/routing/index.ts

// Main router export
export { default as AppRouter } from "./AppRouter";

// Route configuration exports
export { routeGroups, getAllRoutes, findRouteByPath } from "./config";

// Route constants exports
export { ROUTES, AUTH_ROUTES, PROTECTED_ROUTES, PUBLIC_ROUTES } from "./routes";

// Guards exports
export {
  ProtectedRoute,
  PublicRoute,
  AuthRoute,
  EmailVerificationRoute,
  OnboardingRoute,
} from "./guards";

// Types exports
export type {
  RouteConfig,
  AuthState,
  RouteGuardProps,
  NavigationState,
  RouteType,
  RouteGroup,
} from "./types";
