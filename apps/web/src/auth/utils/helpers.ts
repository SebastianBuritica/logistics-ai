// apps/web/src/auth/utils/helpers.ts
import type { AuthError, User } from "@supabase/supabase-js";
import type {
  AuthErrorDetails,
  AuthErrorType,
  AuthUser,
  AuthUserWithOptionalMetadata,
  UserMetadata,
} from "../types";

// ========================================
// USER HELPERS
// ========================================

/**
 * Type guard to check if user exists and has required properties
 */
export const isValidUser = (user: User | null): user is User => {
  return user !== null && typeof user === "object" && "id" in user;
};

/**
 * Convert Supabase User to our AuthUser format
 */
export const toAuthUser = (user: User | null): AuthUser | null => {
  if (!user) return null;

  return {
    id: user.id,
    aud: user.aud,
    role: user.role,
    email: user.email,
    email_confirmed_at: user.email_confirmed_at,
    phone: user.phone,
    confirmed_at: user.confirmed_at,
    last_sign_in_at: user.last_sign_in_at,
    app_metadata: user.app_metadata || {},
    user_metadata: user.user_metadata || {}, // Ensure it's always an object
    identities: user.identities,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
};

/**
 * Type guard to check if user is our AuthUser type
 */
export const isAuthUser = (user: any): user is AuthUser => {
  return (
    user !== null &&
    typeof user === "object" &&
    "id" in user &&
    "user_metadata" in user
  );
};

/**
 * Get user's full name from metadata
 */
export const getUserFullName = (user: AuthUser | null): string => {
  if (!user?.user_metadata) return "";

  const { full_name, first_name, last_name } = user.user_metadata;

  if (full_name) return full_name;
  if (first_name && last_name) return `${first_name} ${last_name}`;
  if (first_name) return first_name;

  return "";
};

/**
 * Get user's initials for avatar
 */
export const getUserInitials = (user: AuthUser | null): string => {
  const fullName = getUserFullName(user);

  if (!fullName) {
    return user?.email?.charAt(0).toUpperCase() || "?";
  }

  const names = fullName.split(" ");
  if (names.length === 1) return names[0].charAt(0).toUpperCase();

  return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
};

/**
 * Check if user has completed email verification
 */
export const isEmailVerified = (user: AuthUser | null): boolean => {
  return Boolean(user?.email_confirmed_at);
};

/**
 * Check if user has completed onboarding
 */
export const isOnboardingComplete = (user: AuthUser | null): boolean => {
  return Boolean(user?.user_metadata?.onboarding_completed);
};

/**
 * Check if user is fully authenticated and ready
 */
export const isUserReady = (user: AuthUser | null): boolean => {
  return isEmailVerified(user) && isOnboardingComplete(user);
};

/**
 * Extract user metadata safely
 */
export const getUserMetadata = (user: AuthUser | null): UserMetadata => {
  return user?.user_metadata || {};
};

// ========================================
// ERROR HELPERS
// ========================================

/**
 * Map Supabase auth errors to our error types
 */
export const mapAuthError = (error: AuthError): AuthErrorDetails => {
  const { message, status } = error;

  // Common auth error mappings
  const errorMappings: Record<string, AuthErrorType> = {
    "Invalid login credentials": "INVALID_CREDENTIALS",
    "Email not confirmed": "EMAIL_NOT_VERIFIED",
    "User not found": "USER_NOT_FOUND",
    "User already registered": "EMAIL_ALREADY_EXISTS",
    "Password should be at least": "WEAK_PASSWORD",
    "Unable to validate email": "EMAIL_NOT_VERIFIED",
  };

  // Find matching error type
  const errorType =
    Object.entries(errorMappings).find(([key]) => message.includes(key))?.[1] ||
    "UNKNOWN_ERROR";

  return {
    code: errorType,
    message: getUserFriendlyMessage(errorType, message),
    details: { originalMessage: message, status },
  };
};

/**
 * Get user-friendly error messages
 */
export const getUserFriendlyMessage = (
  errorType: AuthErrorType,
  originalMessage: string
): string => {
  const messages: Record<AuthErrorType, string> = {
    INVALID_CREDENTIALS:
      "Email o contraseña incorrectos. Por favor, verifica tus datos.",
    EMAIL_NOT_VERIFIED:
      "Tu email no ha sido verificado. Revisa tu bandeja de entrada.",
    USER_NOT_FOUND:
      "No encontramos una cuenta con ese email. ¿Quieres crear una cuenta?",
    EMAIL_ALREADY_EXISTS:
      "Ya existe una cuenta con este email. ¿Quieres iniciar sesión?",
    WEAK_PASSWORD:
      "La contraseña debe tener al menos 12 caracteres, una minúscula y un número.",
    NETWORK_ERROR:
      "Error de conexión. Verifica tu internet e intenta de nuevo.",
    UNKNOWN_ERROR: "Ocurrió un error inesperado. Por favor, intenta de nuevo.",
  };

  return messages[errorType] || originalMessage;
};

// ========================================
// VALIDATION HELPERS
// ========================================

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validate password strength
 */
export const validatePassword = (
  password: string
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 12) {
    errors.push("Debe tener al menos 12 caracteres");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Debe contener al menos una letra minúscula");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Debe contener al menos un número");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Calculate password strength score
 */
export const getPasswordStrength = (
  password: string
): { score: number; text: string; color: string } => {
  if (!password) return { score: 0, text: "", color: "" };

  let score = 0;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score < 2) return { score, text: "Débil", color: "text-red-500" };
  if (score < 4) return { score, text: "Media", color: "text-yellow-500" };
  return { score, text: "Fuerte", color: "text-green-500" };
};

/**
 * Validate phone number (Colombian format)
 */
export const isValidPhone = (phone: string): boolean => {
  // Colombian phone format: +57 (XXX) XXX-XXXX or variations
  const phoneRegex = /^(\+57\s?)?(\(?\d{3}\)?\s?)?\d{3}[-\s]?\d{4}$/;
  return phoneRegex.test(phone.trim());
};

// ========================================
// STORAGE HELPERS
// ========================================

/**
 * Safe localStorage operations
 */
export const storage = {
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  set: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch {
      console.warn(`Failed to save ${key} to localStorage`);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch {
      console.warn(`Failed to remove ${key} from localStorage`);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch {
      console.warn("Failed to clear localStorage");
    }
  },
};

// ========================================
// REDIRECT HELPERS
// ========================================

/**
 * Get redirect URL after authentication
 */
export const getRedirectUrl = (defaultUrl: string = "/dashboard"): string => {
  if (typeof window === "undefined") return defaultUrl;

  const urlParams = new URLSearchParams(window.location.search);
  const returnUrl = urlParams.get("returnUrl");
  const storedUrl = storage.get("auth_redirect_url");

  // Clear stored URL
  storage.remove("auth_redirect_url");

  return returnUrl || storedUrl || defaultUrl;
};

/**
 * Store redirect URL for after authentication
 */
export const storeRedirectUrl = (url: string): void => {
  storage.set("auth_redirect_url", url);
};
