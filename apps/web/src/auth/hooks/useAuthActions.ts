// apps/web/src/auth/hooks/useAuthActions.ts
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";
import { getRedirectUrl, storeRedirectUrl } from "../utils";
import { ROUTES } from "../../routes";
import type { SignInParams, SignUpParams, UpdateProfileParams } from "../types";

/**
 * Hook that provides auth actions with navigation logic
 */
export const useAuthActions = () => {
  const navigate = useNavigate();
  const {
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    updateProfile,
    uploadAvatar,
    resendVerification,
    resetPassword,
    clearError,
  } = useAuthStore();

  // ========================================
  // SIGN UP ACTIONS
  // ========================================

  const handleSignUp = useCallback(
    async (params: SignUpParams) => {
      const result = await signUp(params);

      if (!result.error) {
        // Navigate to email verification page
        navigate(ROUTES.AUTH.VERIFY_EMAIL, {
          state: { email: params.email },
        });
      }

      return result;
    },
    [signUp, navigate]
  );

  const handleGoogleSignUp = useCallback(async () => {
    const redirectUrl = `${window.location.origin}${ROUTES.AUTH.WELCOME}`;
    return await signInWithGoogle(redirectUrl);
  }, [signInWithGoogle]);

  // ========================================
  // SIGN IN ACTIONS
  // ========================================

  const handleSignIn = useCallback(
    async (params: SignInParams) => {
      const result = await signIn(params);

      if (!result.error) {
        // Get redirect URL or default to dashboard
        const redirectUrl = getRedirectUrl(ROUTES.DASHBOARD);
        navigate(redirectUrl, { replace: true });
      }

      return result;
    },
    [signIn, navigate]
  );

  const handleGoogleSignIn = useCallback(async () => {
    const redirectUrl = getRedirectUrl(ROUTES.DASHBOARD);
    const fullRedirectUrl = `${window.location.origin}${redirectUrl}`;
    return await signInWithGoogle(fullRedirectUrl);
  }, [signInWithGoogle]);

  // ========================================
  // SIGN OUT ACTION
  // ========================================

  const handleSignOut = useCallback(async () => {
    const result = await signOut();

    if (!result.error) {
      // Navigate to home page
      navigate(ROUTES.HOME, { replace: true });
    }

    return result;
  }, [signOut, navigate]);

  // ========================================
  // PROFILE ACTIONS
  // ========================================

  const handleUpdateProfile = useCallback(
    async (params: UpdateProfileParams) => {
      const result = await updateProfile(params);

      // If onboarding was completed, navigate to next step
      if (!result.error && params.data?.onboarding_completed) {
        navigate(ROUTES.AUTH.COMPANY_SETUP);
      }

      return result;
    },
    [updateProfile, navigate]
  );

  const handleUploadAvatar = useCallback(
    async (file: File) => {
      return await uploadAvatar(file);
    },
    [uploadAvatar]
  );

  // ========================================
  // EMAIL ACTIONS
  // ========================================

  const handleResendVerification = useCallback(async () => {
    return await resendVerification();
  }, [resendVerification]);

  const handleResetPassword = useCallback(
    async (email: string) => {
      const result = await resetPassword(email);

      if (!result.error) {
        // Show success message or navigate to success page
        navigate(ROUTES.AUTH.LOGIN, {
          state: {
            message: "Se ha enviado un enlace de recuperación a tu email.",
          },
        });
      }

      return result;
    },
    [resetPassword, navigate]
  );

  // ========================================
  // NAVIGATION HELPERS
  // ========================================

  const redirectAfterAuth = useCallback(
    (fallback: string = ROUTES.DASHBOARD) => {
      const redirectUrl = getRedirectUrl(fallback);
      navigate(redirectUrl, { replace: true });
    },
    [navigate]
  );

  const storeReturnUrl = useCallback((url: string) => {
    storeRedirectUrl(url);
  }, []);

  const navigateToSignUp = useCallback(() => {
    navigate(ROUTES.AUTH.SIGNUP);
  }, [navigate]);

  const navigateToSignIn = useCallback(() => {
    navigate(ROUTES.AUTH.LOGIN);
  }, [navigate]);

  const navigateToForgotPassword = useCallback(() => {
    navigate(ROUTES.AUTH.FORGOT_PASSWORD);
  }, [navigate]);

  // ========================================
  // ERROR HANDLING
  // ========================================

  const handleClearError = useCallback(() => {
    clearError();
  }, [clearError]);

  return {
    // Sign up actions
    handleSignUp,
    handleGoogleSignUp,

    // Sign in actions
    handleSignIn,
    handleGoogleSignIn,

    // Sign out action
    handleSignOut,

    // Profile actions
    handleUpdateProfile,
    handleUploadAvatar,

    // Email actions
    handleResendVerification,
    handleResetPassword,

    // Navigation helpers
    redirectAfterAuth,
    storeReturnUrl,
    navigateToSignUp,
    navigateToSignIn,
    navigateToForgotPassword,

    // Error handling
    handleClearError,
  };
};

// ========================================
// STATE-ONLY HOOK
// ========================================

/**
 * Hook that provides only auth state (no actions)
 * Useful for components that only need to read state
 */
export const useAuthState = () => {
  const {
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
  } = useAuthStore();

  return {
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

    // Computed values
    isUserReady: isAuthenticated && isEmailVerified && isOnboardingComplete,
    isLoading:
      loading ||
      isSigningIn ||
      isSigningUp ||
      isSigningOut ||
      isUpdatingProfile,
    currentAuthStep: (() => {
      if (!user) return "signin";
      if (!isEmailVerified) return "verify-email";
      if (!isOnboardingComplete) return "welcome";
      return "complete";
    })(),
  };
};

// ========================================
// USER-SPECIFIC HOOKS
// ========================================

/**
 * Hook that provides user-specific utilities
 */
export const useAuthUser = () => {
  const { user } = useAuthStore();

  const getUserDisplayName = useCallback(() => {
    return (
      user?.user_metadata?.full_name ||
      user?.user_metadata?.first_name ||
      user?.email?.split("@")[0] ||
      "Usuario"
    );
  }, [user]);

  const getUserInitials = useCallback(() => {
    if (user?.user_metadata?.full_name) {
      const names = user.user_metadata.full_name.split(" ");
      if (names.length === 1) return names[0].charAt(0).toUpperCase();
      return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
    }
    return user?.email?.charAt(0).toUpperCase() || "?";
  }, [user]);

  const getUserRole = useCallback(() => {
    return user?.user_metadata?.role || "user";
  }, [user]);

  const getUserCompany = useCallback(() => {
    return {
      id: user?.user_metadata?.company_id,
      name: user?.user_metadata?.company_name,
    };
  }, [user]);

  const hasPermission = useCallback(
    (permission: string) => {
      if (!user) return false;

      const userRole = getUserRole();
      const permissions: Record<string, string[]> = {
        admin: ["*"],
        manager: ["view_analytics", "manage_fleet", "manage_routes"],
        user: ["view_dashboard", "create_shipments"],
      };

      return (
        permissions[userRole]?.includes(permission) ||
        permissions[userRole]?.includes("*") ||
        false
      );
    },
    [user, getUserRole]
  );

  return {
    user,
    getUserDisplayName,
    getUserInitials,
    getUserRole,
    getUserCompany,
    hasPermission,
    isUserReady:
      user &&
      user.email_confirmed_at &&
      user.user_metadata?.onboarding_completed,
  };
};
