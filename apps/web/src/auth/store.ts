// apps/web/src/auth/store.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { supabase } from "../lib/supabase";
import type { Session } from "@supabase/supabase-js";
import type {
  AuthResponse,
  AuthStore,
  AuthUser,
  SignInParams,
  SignUpParams,
  UpdateProfileParams,
} from "./types";
import {
  isAuthUser,
  isEmailVerified,
  isOnboardingComplete,
  mapAuthError,
  storage,
} from "./utils";

// ========================================
// INITIAL STATE
// ========================================

const initialState = {
  // Core auth state
  user: null,
  session: null,
  loading: true,

  // Auth status flags
  isAuthenticated: false,
  isEmailVerified: false,
  isOnboardingComplete: false,

  // Error handling
  error: null,

  // UI state
  isSigningIn: false,
  isSigningUp: false,
  isSigningOut: false,
  isUpdatingProfile: false,
};

// ========================================
// ZUSTAND STORE
// ========================================

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // ========================================
        // AUTHENTICATION METHODS
        // ========================================

        signUp: async (params: SignUpParams): Promise<AuthResponse> => {
          set({ isSigningUp: true, error: null });

          try {
            const { email, password, metadata, options } = params;

            // If no password provided, use magic link
            if (!password) {
              const { data, error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                  shouldCreateUser: true,
                  data: metadata || {},
                  ...options,
                },
              });

              if (error) {
                const mappedError = mapAuthError(error);
                set({ error: mappedError.message });
                return { data: null, error };
              }

              return { data, error: null };
            }

            // Sign up with email and password
            const { data, error } = await supabase.auth.signUp({
              email,
              password,
              options: {
                data: metadata || {},
                ...options,
              },
            });

            if (error) {
              const mappedError = mapAuthError(error);
              set({ error: mappedError.message });
              return { data: null, error };
            }

            return { data, error: null };
          } catch (error: any) {
            const errorMessage = "Error inesperado durante el registro";
            set({ error: errorMessage });
            return { data: null, error: { message: errorMessage } as any };
          } finally {
            set({ isSigningUp: false });
          }
        },

        signIn: async (params: SignInParams): Promise<AuthResponse> => {
          set({ isSigningIn: true, error: null });

          try {
            const { email, password, options } = params;

            const { data, error } = await supabase.auth.signInWithPassword({
              email,
              password,
            });

            if (error) {
              const mappedError = mapAuthError(error);
              set({ error: mappedError.message });
              return { data: null, error };
            }

            return { data, error: null };
          } catch (error: any) {
            const errorMessage = "Error inesperado durante el inicio de sesión";
            set({ error: errorMessage });
            return { data: null, error: { message: errorMessage } as any };
          } finally {
            set({ isSigningIn: false });
          }
        },

        signInWithGoogle: async (
          redirectTo?: string
        ): Promise<AuthResponse> => {
          set({ isSigningIn: true, error: null });

          try {
            const { data, error } = await supabase.auth.signInWithOAuth({
              provider: "google",
              options: {
                redirectTo:
                  redirectTo || `${window.location.origin}/auth/welcome`,
                queryParams: {
                  access_type: "offline",
                  prompt: "consent",
                },
              },
            });

            if (error) {
              const mappedError = mapAuthError(error);
              set({ error: mappedError.message });
              return { data: null, error };
            }

            return { data, error: null };
          } catch (error: any) {
            const errorMessage = "Error inesperado con Google";
            set({ error: errorMessage });
            return { data: null, error: { message: errorMessage } as any };
          } finally {
            set({ isSigningIn: false });
          }
        },

        signOut: async (): Promise<AuthResponse> => {
          set({ isSigningOut: true, error: null });

          try {
            const { error } = await supabase.auth.signOut();

            if (error) {
              const mappedError = mapAuthError(error);
              set({ error: mappedError.message });
              return { data: null, error };
            }

            // Clear local storage
            storage.clear();

            return { data: null, error: null };
          } catch (error: any) {
            const errorMessage = "Error inesperado al cerrar sesión";
            set({ error: errorMessage });
            return { data: null, error: { message: errorMessage } as any };
          } finally {
            set({ isSigningOut: false });
          }
        },

        // ========================================
        // PROFILE MANAGEMENT
        // ========================================

        updateProfile: async (
          params: UpdateProfileParams
        ): Promise<AuthResponse> => {
          set({ isUpdatingProfile: true, error: null });

          try {
            const { password, email, data: userData } = params;

            const updateData: any = {};
            if (password) updateData.password = password;
            if (email) updateData.email = email;
            if (userData) updateData.data = userData;

            const { data, error } = await supabase.auth.updateUser(updateData);

            if (error) {
              const mappedError = mapAuthError(error);
              set({ error: mappedError.message });
              return { data: null, error };
            }

            return { data, error: null };
          } catch (error: any) {
            const errorMessage = "Error inesperado al actualizar perfil";
            set({ error: errorMessage });
            return { data: null, error: { message: errorMessage } as any };
          } finally {
            set({ isUpdatingProfile: false });
          }
        },

        uploadAvatar: async (file: File): Promise<AuthResponse<string>> => {
          set({ isUpdatingProfile: true, error: null });

          try {
            const { user } = get();
            if (!user) {
              set({ error: "Usuario no autenticado" });
              return {
                data: null,
                error: { message: "Usuario no autenticado" } as any,
              };
            }

            const fileExt = file.name.split(".").pop();
            const fileName = `${user.id}-${Date.now()}.${fileExt}`;

            const { data: uploadData, error: uploadError } =
              await supabase.storage
                .from("avatars")
                .upload(fileName, file, { upsert: true });

            if (uploadError) {
              const mappedError = mapAuthError(uploadError as any);
              set({ error: mappedError.message });
              return { data: null, error: uploadError as any };
            }

            const {
              data: { publicUrl },
            } = supabase.storage.from("avatars").getPublicUrl(fileName);

            // Update user profile with new avatar URL
            await get().updateProfile({ data: { avatar_url: publicUrl } });

            return { data: publicUrl, error: null };
          } catch (error: any) {
            const errorMessage = "Error inesperado al subir avatar";
            set({ error: errorMessage });
            return { data: null, error: { message: errorMessage } as any };
          } finally {
            set({ isUpdatingProfile: false });
          }
        },

        // ========================================
        // EMAIL MANAGEMENT
        // ========================================

        resendVerification: async (): Promise<AuthResponse> => {
          set({ error: null });

          try {
            const { user } = get();
            if (!user?.email) {
              const errorMessage = "No se encontró el email del usuario";
              set({ error: errorMessage });
              return { data: null, error: { message: errorMessage } as any };
            }

            const { data, error } = await supabase.auth.resend({
              type: "signup",
              email: user.email,
            });

            if (error) {
              const mappedError = mapAuthError(error);
              set({ error: mappedError.message });
              return { data: null, error };
            }

            return { data, error: null };
          } catch (error: any) {
            const errorMessage = "Error inesperado al reenviar verificación";
            set({ error: errorMessage });
            return { data: null, error: { message: errorMessage } as any };
          }
        },

        resetPassword: async (email: string): Promise<AuthResponse> => {
          set({ error: null });

          try {
            const { data, error } = await supabase.auth.resetPasswordForEmail(
              email,
              {
                redirectTo: `${window.location.origin}/auth/reset-password`,
              }
            );

            if (error) {
              const mappedError = mapAuthError(error);
              set({ error: mappedError.message });
              return { data: null, error };
            }

            return { data, error: null };
          } catch (error: any) {
            const errorMessage = "Error inesperado al resetear contraseña";
            set({ error: errorMessage });
            return { data: null, error: { message: errorMessage } as any };
          }
        },

        // ========================================
        // STATE MANAGEMENT
        // ========================================

        clearError: () => {
          set({ error: null });
        },

        setLoading: (loading: boolean) => {
          set({ loading });
        },

        // ========================================
        // INTERNAL METHODS
        // ========================================

        initialize: async (): Promise<void> => {
          try {
            const {
              data: { session },
            } = await supabase.auth.getSession();
            get().handleAuthStateChange("INITIAL_SESSION", session);
          } catch (error) {
            console.error("Error initializing auth:", error);
          } finally {
            set({ loading: false });
          }
        },

        handleAuthStateChange: (event: string, session: Session | null) => {
          const user = toAuthUser(session?.user || null);

          set({
            user,
            session,
            isAuthenticated: Boolean(user),
            isEmailVerified: isEmailVerified(user),
            isOnboardingComplete: isOnboardingComplete(user),
            loading: false,
          });

          console.log("Auth state changed:", event, user?.email);
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          // Only persist specific parts of state
          user: state.user,
          session: state.session,
        }),
      }
    ),
    { name: "auth-store" }
  )
);

// ========================================
// SETUP AUTH LISTENER
// ========================================

// Initialize auth listener
supabase.auth.onAuthStateChange((event, session) => {
  useAuthStore.getState().handleAuthStateChange(event, session);
});

// Initialize the store
useAuthStore.getState().initialize();
