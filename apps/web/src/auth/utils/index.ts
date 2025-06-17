// apps/web/src/auth/utils/index.ts

// Helper functions exports
export {
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
} from "./helpers";

// Validator exports
export {
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
} from "./validators";

// Note: Form types are now exported from ../types.ts
