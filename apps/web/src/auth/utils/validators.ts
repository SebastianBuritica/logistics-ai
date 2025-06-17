// apps/web/src/auth/utils/validators.ts
import { z } from "zod";
import { isValidEmail, isValidPhone, validatePassword } from "./helpers";

// ========================================
// BASE VALIDATORS
// ========================================

export const emailValidator = z
  .string()
  .min(1, "El email es requerido")
  .refine(isValidEmail, "Por favor ingresa un email válido");

export const passwordValidator = z
  .string()
  .min(1, "La contraseña es requerida")
  .refine((password) => {
    const { isValid } = validatePassword(password);
    return isValid;
  }, "La contraseña debe tener al menos 12 caracteres, una minúscula y un número");

export const nameValidator = z
  .string()
  .min(2, "El nombre debe tener al menos 2 caracteres")
  .max(100, "El nombre debe tener menos de 100 caracteres")
  .regex(
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    "El nombre solo puede contener letras y espacios"
  );

export const phoneValidator = z
  .string()
  .optional()
  .refine(
    (phone) => !phone || isValidPhone(phone),
    "Por favor ingresa un número de teléfono válido"
  );

export const companyNameValidator = z
  .string()
  .min(2, "El nombre de la empresa debe tener al menos 2 caracteres")
  .max(200, "El nombre de la empresa debe tener menos de 200 caracteres");

export const nitValidator = z
  .string()
  .optional()
  .refine((nit) => {
    if (!nit) return true;
    // Colombian NIT format validation
    const cleanNit = nit.replace(/[^0-9]/g, "");
    return cleanNit.length >= 8 && cleanNit.length <= 15;
  }, "Por favor ingresa un NIT válido");

// ========================================
// FORM SCHEMAS
// ========================================

export const signUpSchema = z.object({
  email: emailValidator,
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, "Debes aceptar los términos y condiciones"),
});

export const signInSchema = z.object({
  email: emailValidator,
  password: z.string().min(1, "La contraseña es requerida"),
  rememberMe: z.boolean().optional(),
});

export const welcomeSchema = z.object({
  fullName: nameValidator,
  password: passwordValidator,
  phoneNumber: phoneValidator,
  agreeToMarketing: z.boolean().optional(),
});

export const companySetupSchema = z.object({
  companyName: companyNameValidator,
  nit: nitValidator,
  industry: z.string().min(1, "Por favor selecciona una industria"),
  companySize: z
    .string()
    .min(1, "Por favor selecciona el tamaño de la empresa"),
  address: z
    .string()
    .max(500, "La dirección debe tener menos de 500 caracteres")
    .optional(),
  phone: phoneValidator,
});

export const forgotPasswordSchema = z.object({
  email: emailValidator,
});

export const resetPasswordSchema = z
  .object({
    password: passwordValidator,
    confirmPassword: z.string().min(1, "Por favor confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const updateProfileSchema = z
  .object({
    fullName: nameValidator.optional(),
    phoneNumber: phoneValidator,
    currentPassword: z.string().optional(),
    newPassword: passwordValidator.optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.currentPassword) {
        return false;
      }
      if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message:
        "Para cambiar la contraseña, debes proporcionar la contraseña actual y confirmar la nueva",
      path: ["newPassword"],
    }
  );

// ========================================
// TYPE EXPORTS FROM SCHEMAS (reference only)
// ========================================

// Note: These types are now defined in ../types.ts
// export type SignUpFormData = z.infer<typeof signUpSchema>;
// export type SignInFormData = z.infer<typeof signInSchema>;
// etc...

// ========================================
// VALIDATION UTILITIES
// ========================================

export const validateForm = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: boolean; data?: T; errors?: z.ZodError } => {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
};

export const getFieldError = (
  errors: z.ZodError | undefined,
  fieldName: string
): string | undefined => {
  if (!errors) return undefined;

  const fieldError = errors.errors.find((error) =>
    error.path.includes(fieldName)
  );

  return fieldError?.message;
};

// ========================================
// BUSINESS LOGIC VALIDATORS
// ========================================

/**
 * Validate if user can proceed to next onboarding step
 */
export const canProceedToStep = (
  step: "welcome" | "company" | "dashboard",
  user: any
): boolean => {
  if (!user) return false;

  switch (step) {
    case "welcome":
      return Boolean(user.email_confirmed_at);
    case "company":
      return Boolean(
        user.email_confirmed_at &&
          user.user_metadata?.full_name &&
          user.user_metadata?.onboarding_completed
      );
    case "dashboard":
      return Boolean(
        user.email_confirmed_at &&
          user.user_metadata?.onboarding_completed &&
          user.user_metadata?.company_id
      );
    default:
      return false;
  }
};
