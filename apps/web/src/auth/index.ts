// apps/web/src/auth/index.ts

// ========================================
// MAIN EXPORTS
// ========================================

// Primary hook export (most commonly used)
export { useAuth } from "./hooks";

// Store export for advanced use cases
export { useAuthStore } from "./store";

// ========================================
// HOOK EXPORTS
// ========================================

export {
  useAuthActions,
  useAuthState,
  useAuthUser,
  defaultUseAuth,
} from "./hooks";

// ========================================
// TYPE EXPORTS
// ========================================

export type {
  // Core types
  AuthUser,
  AuthUserWithOptionalMetadata,
  UserMetadata,
  AuthState,
  AuthStore,
  AuthActions,

  // Parameter types
  SignUpParams,
  SignInParams,
  UpdateProfileParams,
  AuthResponse,

  // Form types
  SignUpFormData,
  SignInFormData,
  WelcomeFormData,
  CompanySetupFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  UpdateProfileFormData,

  // Utility types
  AuthEvent,
  AuthProvider,
  AuthConfig,
  AuthErrorType,
  AuthErrorDetails,
} from "./types";

// ========================================
// UTILITY EXPORTS
// ========================================

export {
  // Helper functions
  isValidUser,
  toAuthUser,
  isAuthUser,
  getUserFullName,
  getUserInitials,
  isEmailVerified,
  isOnboardingComplete,
  isUserReady,
  getUserMetadata,
  mapAuthError,
  getUserFriendlyMessage,
  isValidEmail,
  validatePassword,
  getPasswordStrength,
  isValidPhone,
  storage,
  getRedirectUrl,
  storeRedirectUrl,

  // Validators
  emailValidator,
  passwordValidator,
  nameValidator,
  phoneValidator,
  companyNameValidator,
  nitValidator,
  signUpSchema,
  signInSchema,
  welcomeSchema,
  companySetupSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema,
  validateForm,
  getFieldError,
  canProceedToStep,
} from "./utils";

// ========================================
// DEFAULT EXPORT
// ========================================

// Default export is the main useAuth hook
export { useAuth as default } from "./hooks";
