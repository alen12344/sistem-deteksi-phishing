// Supabase client configuration
// If environment variables are not yet configured, provide mock handlers
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mock-phish-detector.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "mock-anon-key";

export interface UserSession {
  email: string;
  name: string;
  role: string;
}

export const getStoredSession = (): UserSession | null => {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("phish_user_session");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
};

export const setStoredSession = (session: UserSession | null) => {
  if (typeof window === "undefined") return;
  if (session) {
    localStorage.setItem("phish_user_session", JSON.stringify(session));
  } else {
    localStorage.removeItem("phish_user_session");
  }
};

export const supabase = {
  url: supabaseUrl,
  anonKey: supabaseAnonKey,
  auth: {
    getSession: () => getStoredSession(),
    signInWithPassword: async ({ email, password }: { email: string; password?: string }) => {
      const mockUser: UserSession = {
        email,
        name: email.split("@")[0].toUpperCase() + " (Analyst)",
        role: "SecOps Specialist"
      };
      setStoredSession(mockUser);
      return { data: { user: mockUser }, error: null };
    },
    signUp: async ({ email, password }: { email: string; password?: string }) => {
      const mockUser: UserSession = {
        email,
        name: email.split("@")[0].toUpperCase() + " (Analyst)",
        role: "SecOps Specialist"
      };
      setStoredSession(mockUser);
      return { data: { user: mockUser }, error: null };
    },
    signOut: async () => {
      setStoredSession(null);
      return { error: null };
    }
  }
};
