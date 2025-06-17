// apps/web/src/routing/AppRouter.tsx
import { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { routeGroups } from './config';
import { ROUTES } from './routes';

// Global loading component for lazy-loaded routes
const GlobalLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

// Route renderer component
const RouteRenderer = () => (
  <Routes>
    {routeGroups.map((group) => 
      group.routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.element />}
        />
      ))
    )}
  </Routes>
);

// Main App Router
export const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<GlobalLoader />}>
        <RouteRenderer />
      </Suspense>
    </Router>
  );
};

export default AppRouter;