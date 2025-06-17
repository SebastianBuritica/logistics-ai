// apps/web/src/auth/hooks/index.ts

// Main auth hook export
export { useAuth, default as defaultUseAuth } from "./useAuth";

// Specific auth hooks exports
export { useAuthActions, useAuthState, useAuthUser } from "./useAuthActions";

// Re-export the store for advanced use cases
export { useAuthStore } from "../store";
