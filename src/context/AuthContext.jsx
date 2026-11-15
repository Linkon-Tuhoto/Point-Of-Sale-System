import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser, loginRequest, logoutRequest, registerRequest } from "../api/authApi";

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    async function load() {
      if (!localStorage.getItem("accessToken")) { if (active) setLoading(false); return; }
      try { const current = await getCurrentUser(); if (active) setUser(current); }
      catch { logoutRequest(); if (active) setUser(null); }
      finally { if (active) setLoading(false); }
    }
    load(); return () => { active = false; };
  }, []);
  const value = useMemo(() => ({
    user, loading,
    login: async (credentials) => { const returned = await loginRequest(credentials); const current = returned || await getCurrentUser(); setUser(current); return current; },
    register: registerRequest,
    logout: () => { logoutRequest(); setUser(null); }
  }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() { const value = useContext(AuthContext); if (!value) throw new Error("useAuth must be used inside AuthProvider"); return value; }
