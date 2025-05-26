import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import type { Session } from "@supabase/supabase-js";

// Define possible role types
type SponsorRole = {
  type: "sponsor";
  companyName: string;
};

export type RoleType = string | SponsorRole | null;

interface AuthContextType {
  session: Session | null;
  role: RoleType;
  loading: boolean;
  setSession: (user: Session | null) => void;
  setRole: (role: RoleType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<RoleType>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to sync user with backend and fetch role
 

  useEffect(() => {
    // Check session on mount
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        setSession(session);

        if (session?.access_token) {
          setRole("user");
          setSession(session)
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, newSession) => {
        setSession(newSession);

        if (newSession?.access_token) {
          setRole("user");
          setSession(newSession)
          setLoading(false);
        } else {
          setRole(null);
          setLoading(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, role, loading, setSession, setRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
