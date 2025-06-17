// apps/web/src/routing/config.tsx
import { lazy } from 'react';
import { ROUTES } from './routes';
import { 
  AuthRoute, 
  EmailVerificationRoute, 
  OnboardingRoute, 
  ProtectedRoute,
  PublicRoute 
} from './guards';
import type { RouteGroup } from './types';

// Lazy load components for better performance
const Landing = lazy(() => import('../pages/Landing'));
const SignUp = lazy(() => import('../pages/auth/SignUp'));
const Login = lazy(() => import('../pages/auth/Login'));
const EmailVerification = lazy(() => import('../pages/auth/EmailVerification'));
const Welcome = lazy(() => import('../pages/auth/Welcome'));
const CompanySetup = lazy(() => import('../pages/auth/CompanySetup'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Route configurations organized by type
export const routeGroups: RouteGroup[] = [
  // Public routes
  {
    type: 'public',
    routes: [
      {
        path: ROUTES.HOME,
        element: () => (
          <PublicRoute>
            <Landing />
          </PublicRoute>
        ),
        meta: {
          title: 'LogiAI Pro - AI-Powered Logistics Platform',
          description: 'Optimize your logistics operations with AI-powered route planning, demand forecasting, and fleet management.',
        },
      },
    ],
  },

  // Auth routes (signup, login, etc.)
  {
    type: 'auth',
    basePath: ROUTES.AUTH.BASE,
    routes: [
      {
        path: ROUTES.AUTH.SIGNUP,
        element: () => (
          <AuthRoute>
            <SignUp />
          </AuthRoute>
        ),
        meta: {
          title: 'Sign Up - LogiAI Pro',
          description: 'Create your free LogiAI Pro account and start optimizing your logistics operations.',
        },
      },
      {
        path: ROUTES.AUTH.LOGIN,
        element: () => (
          <AuthRoute>
            <Login />
          </AuthRoute>
        ),
        meta: {
          title: 'Sign In - LogiAI Pro',
          description: 'Sign in to your LogiAI Pro account.',
        },
      },
      {
        path: ROUTES.AUTH.VERIFY_EMAIL,
        element: () => (
          <EmailVerificationRoute>
            <EmailVerification />
          </EmailVerificationRoute>
        ),
        meta: {
          title: 'Verify Email - LogiAI Pro',
          description: 'Please verify your email address to continue.',
        },
      },
      {
        path: ROUTES.AUTH.WELCOME,
        element: () => (
          <OnboardingRoute>
            <Welcome />
          </OnboardingRoute>
        ),
        meta: {
          title: 'Welcome - LogiAI Pro',
          description: 'Complete your profile to get started.',
        },
      },
      {
        path: ROUTES.AUTH.COMPANY_SETUP,
        element: () => (
          <OnboardingRoute>
            <CompanySetup />
          </OnboardingRoute>
        ),
        meta: {
          title: 'Company Setup - LogiAI Pro',
          description: 'Set up your company profile.',
        },
      },
    ],
  },

  // Protected routes
  {
    type: 'protected',
    routes: [
      {
        path: ROUTES.DASHBOARD,
        element: () => (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        meta: {
          title: 'Dashboard - LogiAI Pro',
          description: 'Your logistics operations dashboard.',
        },
      },
      // Add more protected routes here as we build them
      // {
      //   path: ROUTES.FLEET,
      //   element: () => (
      //     <ProtectedRoute>
      //       <Fleet />
      //     </ProtectedRoute>
      //   ),
      //   meta: {
      //     title: 'Fleet Management - LogiAI Pro',
      //   },
      // },
    ],
  },

  // Fallback routes
  {
    type: 'redirect',
    routes: [
      {
        path: ROUTES.NOT_FOUND,
        element: () => <NotFound />,
        meta: {
          title: 'Page Not Found - LogiAI Pro',
        },
      },
      {
        path: '*',
        element: () => <NotFound />,
        meta: {
          title: 'Page Not Found - LogiAI Pro',
        },
      },
    ],
  },
];

// Helper to get all routes flattened
export const getAllRoutes = () => {
  return routeGroups.reduce((acc, group) => {
    return [...acc, ...group.routes];
  }, [] as RouteGroup['routes']);
};

// Helper to find route by path
export const findRouteByPath = (path: string) => {
  const allRoutes = getAllRoutes();
  return allRoutes.find(route => route.path === path);
};