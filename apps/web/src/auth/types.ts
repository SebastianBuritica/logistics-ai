// apps/web/src/auth/types.ts
import type { AuthError, Session, User } from "@supabase/supabase-js";

// ========================================
// USER TYPES
// ========================================

export interface UserMetadata {
  full_name?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  avatar_url?: string;
  company_id?: string;
  company_name?: string;
  onboarding_completed?: boolean;
  marketing_consent?: boolean;
  preferred_language?: "es" | "en";
  timezone?: string;
}

// Fix: Don't extend User, create our own interface that matches Supabase User structure
export interface AuthUser {
  id: string;
  aud: string;
  role?: string;
  email?: string;
  email_confirmed_at?: string;
  phone?: string;
  confirmed_at?: string;
  last_sign_in_at?: string;
  app_metadata: Record<string, any>;
  user_metadata: UserMetadata; // Now it's required, not optional
  identities?: any[];
  created_at: string;
  updated_at?: string;
}

// Helper type for when user might be null or have optional metadata
export type AuthUserWithOptionalMetadata = Omit<AuthUser, "user_metadata"> & {
  user_metadata?: UserMetadata;
};

// ========================================
// AUTH STATE TYPES
// ========================================

export interface AuthState {
  // Core auth state
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;

  // Auth status flags
  isAuthenticated: boolean;
  isEmailVerified: boolean;
  isOnboardingComplete: boolean;

  // Error handling
  error: string | null;

  // UI state
  isSigningIn: boolean;
  isSigningUp: boolean;
  isSigningOut: boolean;
  isUpdatingProfile: boolean;
}

// ========================================
// AUTH ACTION TYPES
// ========================================

export interface SignUpParams {
  email: string;
  password?: string;
  metadata?: Partial<UserMetadata>;
  options?: {
    redirectTo?: string;
    shouldCreateUser?: boolean;
  };
}

export interface SignInParams {
  email: string;
  password: string;
  options?: {
    redirectTo?: string;
  };
}

export interface UpdateProfileParams {
  password?: string;
  email?: string;
  data?: Partial<UserMetadata>;
}

export interface AuthResponse<T = any> {
  data: T | null;
  error: AuthError | null;
}

// ========================================
// AUTH ACTIONS INTERFACE
// ========================================

export interface AuthActions {
  // Authentication methods
  signUp: (params: SignUpParams) => Promise<AuthResponse>;
  signIn: (params: SignInParams) => Promise<AuthResponse>;
  signInWithGoogle: (redirectTo?: string) => Promise<AuthResponse>;
  signOut: () => Promise<AuthResponse>;

  // Profile management
  updateProfile: (params: UpdateProfileParams) => Promise<AuthResponse>;
  uploadAvatar: (file: File) => Promise<AuthResponse<string>>;

  // Email management
  resendVerification: () => Promise<AuthResponse>;
  resetPassword: (email: string) => Promise<AuthResponse>;

  // State management
  clearError: () => void;
  setLoading: (loading: boolean) => void;

  // Internal methods
  initialize: () => Promise<void>;
  handleAuthStateChange: (event: string, session: Session | null) => void;
}

// ========================================
// COMBINED AUTH STORE TYPE
// ========================================

export interface AuthStore extends AuthState, AuthActions {}

// ========================================
// UTILITY TYPES
// ========================================

export type AuthEvent =
  | "SIGNED_IN"
  | "SIGNED_OUT"
  | "TOKEN_REFRESHED"
  | "USER_UPDATED"
  | "PASSWORD_RECOVERY";

export type AuthProvider = "google" | "email";

export interface AuthConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  redirectUrls: {
    signIn: string;
    signUp: string;
    emailVerification: string;
    passwordReset: string;
  };
}

// ========================================
// FORM TYPES (moved from validators)
// ========================================

export interface SignUpFormData {
  email: string;
  agreeToTerms: boolean;
}

export interface SignInFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface WelcomeFormData {
  fullName: string;
  password: string;
  phoneNumber?: string;
  agreeToMarketing?: boolean;
}

export interface CompanySetupFormData {
  companyName: string;
  nit?: string;
  industry: string;
  companySize: string;
  address?: string;
  phone?: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export interface UpdateProfileFormData {
  fullName?: string;
  phoneNumber?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

// ========================================
// ERROR TYPES
// ========================================

export interface AuthErrorDetails {
  code: string;
  message: string;
  details?: any;
}

export type AuthErrorType =
  | "INVALID_CREDENTIALS"
  | "EMAIL_NOT_VERIFIED"
  | "USER_NOT_FOUND"
  | "EMAIL_ALREADY_EXISTS"
  | "WEAK_PASSWORD"
  | "NETWORK_ERROR"
  | "UNKNOWN_ERROR";
