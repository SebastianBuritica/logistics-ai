export interface RouteConfig {
  path: string;
  element: React.ComponentType;
  requiresAuth?: boolean;
  redirectTo?: string;
  meta?: {
    title?: string;
    description?: string;
    requiresEmailVerification?: boolean;
    requiresOnboarding?: boolean;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  isEmailVerified: boolean;
  isOnboardingComplete: boolean;
  loading: boolean;
}

export interface RouteGuardProps {
  children: React.ReactNode;
  requiresAuth?: boolean;
  requiresEmailVerification?: boolean;
  requiresOnboarding?: boolean;
  redirectTo?: string;
}

export interface NavigationState {
  from?: string;
  returnUrl?: string;
}

export type RouteType = "public" | "auth" | "protected" | "redirect";

export interface RouteGroup {
  type: RouteType;
  basePath?: string;
  routes: RouteConfig[];
}
