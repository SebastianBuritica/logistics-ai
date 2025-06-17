// apps/web/src/auth/hooks/useAuth.ts
import { useAuthStore } from "../store";
import type { AuthState, AuthUser } from "../types";

// ========================================
// MAIN AUTH HOOK
// ========================================

/**
 * Main auth hook that provides all authentication functionality
 * This is the primary hook that components should use
 */
export const useAuth = () => {
  // Get entire store state and actions
  const store = useAuthStore();

  // Destructure for easier access
  const {
    // State
    user,
    session,
    loading,
    isAuthenticated,
    isEmailVerified,
    isOnboardingComplete,
    error,
    isSigningIn,
    isSigningUp,
    isSigningOut,
    isUpdatingProfile,

    // Actions
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    updateProfile,
    uploadAvatar,
    resendVerification,
    resetPassword,
    clearError,
    setLoading,
  } = store;

  // ========================================
  // COMPUTED VALUES
  // ========================================

  /**
   * Check if user is fully ready (authenticated, verified, onboarded)
   */
  const isUserReady =
    isAuthenticated && isEmailVerified && isOnboardingComplete;

  /**
   * Check if any auth operation is in progress
   */
  const isLoading =
    loading || isSigningIn || isSigningUp || isSigningOut || isUpdatingProfile;

  /**
   * Get user's display name
   */
  const userDisplayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.first_name ||
    user?.email?.split("@")[0] ||
    "Usuario";

  /**
   * Get user's initials for avatar
   */
  const userInitials = (() => {
    if (user?.user_metadata?.full_name) {
      const names = user.user_metadata.full_name.split(" ");
      if (names.length === 1) return names[0].charAt(0).toUpperCase();
      return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
    }
    return user?.email?.charAt(0).toUpperCase() || "?";
  })();

  /**
   * Get current auth step for onboarding flow
   */
  const currentAuthStep = (() => {
    if (!user) return "signin";
    if (!isEmailVerified) return "verify-email";
    if (!isOnboardingComplete) return "welcome";
    return "complete";
  })();

  // ========================================
  // HELPER METHODS
  // ========================================

  /**
   * Quick sign up with email only (magic link)
   */
  const signUpWithEmail = (email: string) => {
    return signUp({ email });
  };

  /**
   * Quick sign up with email and password
   */
  const signUpWithPassword = (
    email: string,
    password: string,
    metadata?: any
  ) => {
    return signUp({ email, password, metadata });
  };

  /**
   * Quick sign in with email and password
   */
  const signInWithPassword = (email: string, password: string) => {
    return signIn({ email, password });
  };

  /**
   * Check if user has specific permission or role
   */
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    // Implement permission logic based on your needs
    const userRole = user.user_metadata?.role || "user";

    // Basic role-based permissions
    const permissions: Record<string, string[]> = {
      admin: ["*"], // Admin has all permissions
      manager: ["view_analytics", "manage_fleet", "manage_routes"],
      user: ["view_dashboard", "create_shipments"],
    };

    return (
      permissions[userRole]?.includes(permission) ||
      permissions[userRole]?.includes("*") ||
      false
    );
  };

  /**
   * Get user's company information
   */
  const userCompany = {
    id: user?.user_metadata?.company_id,
    name: user?.user_metadata?.company_name,
  };

  /**
   * Check if user belongs to a company
   */
  const hasCompany = Boolean(userCompany.id);

  // ========================================
  // RETURN OBJECT
  // ========================================

  return {
    // ===== CORE STATE =====
    user: user as AuthUser | null,
    session,
    loading: isLoading,
    error,

    // ===== AUTH STATUS =====
    isAuthenticated,
    isEmailVerified,
    isOnboardingComplete,
    isUserReady,
    currentAuthStep,

    // ===== LOADING STATES =====
    isSigningIn,
    isSigningUp,
    isSigningOut,
    isUpdatingProfile,

    // ===== USER INFO =====
    userDisplayName,
    userInitials,
    userCompany,
    hasCompany,

    // ===== CORE ACTIONS =====
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    updateProfile,
    uploadAvatar,
    resendVerification,
    resetPassword,

    // ===== HELPER ACTIONS =====
    signUpWithEmail,
    signUpWithPassword,
    signInWithPassword,
    clearError,
    setLoading,

    // ===== UTILITY METHODS =====
    hasPermission,

    // ===== COMPUTED VALUES =====
    authState: {
      user,
      session,
      loading: isLoading,
      isAuthenticated,
      isEmailVerified,
      isOnboardingComplete,
      error,
    } as AuthState,
  };
};

export default useAuth;
