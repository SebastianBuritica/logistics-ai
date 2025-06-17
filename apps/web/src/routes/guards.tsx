// apps/web/src/routing/guards.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from './routes';
import type { RouteGuardProps } from './types';
import useAuth from '@/auth';

// Loading component
const RouteLoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

// Protected Route Guard
export const ProtectedRoute = ({ 
  children, 
  requiresEmailVerification = true,
  requiresOnboarding = true,
  redirectTo 
}: RouteGuardProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <RouteLoadingSpinner />;
  }

  // Not authenticated - redirect to login
  if (!user) {
    return (
      <Navigate 
        to={redirectTo || ROUTES.AUTH.LOGIN} 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // Email not verified - redirect to verification
  if (requiresEmailVerification && !user.email_confirmed_at) {
    return <Navigate to={ROUTES.AUTH.VERIFY_EMAIL} replace />;
  }

  // Onboarding not complete - redirect to welcome
  if (requiresOnboarding && !user.user_metadata?.onboarding_completed) {
    return <Navigate to={ROUTES.AUTH.WELCOME} replace />;
  }

  return <>{children}</>;
};

// Public Route Guard (redirect authenticated users)
export const PublicRoute = ({ children }: RouteGuardProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <RouteLoadingSpinner />;
  }

  // Authenticated and fully onboarded - redirect to dashboard
  if (user?.email_confirmed_at && user?.user_metadata?.onboarding_completed) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
};

// Auth Route Guard (for signup/login/etc)
export const AuthRoute = ({ children }: RouteGuardProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <RouteLoadingSpinner />;
  }

  // Fully authenticated and onboarded - redirect to dashboard
  if (user?.email_confirmed_at && user?.user_metadata?.onboarding_completed) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
};

// Email Verification Guard
export const EmailVerificationRoute = ({ children }: RouteGuardProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <RouteLoadingSpinner />;
  }

  // Not authenticated - redirect to signup
  if (!user) {
    return <Navigate to={ROUTES.AUTH.SIGNUP} replace />;
  }

  // Already verified - redirect to next step
  if (user.email_confirmed_at) {
    if (!user.user_metadata?.onboarding_completed) {
      return <Navigate to={ROUTES.AUTH.WELCOME} replace />;
    }
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
};

// Welcome/Onboarding Guard
export const OnboardingRoute = ({ children }: RouteGuardProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <RouteLoadingSpinner />;
  }

  // Not authenticated - redirect to signup
  if (!user) {
    return <Navigate to={ROUTES.AUTH.SIGNUP} replace />;
  }

  // Email not verified - redirect to verification
  if (!user.email_confirmed_at) {
    return <Navigate to={ROUTES.AUTH.VERIFY_EMAIL} replace />;
  }

  // Already onboarded - redirect to dashboard
  if (user.user_metadata?.onboarding_completed) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
};