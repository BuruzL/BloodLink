import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { setAuthToken } from "../api/client";

// Minimal local “session” to make UI usable even before backend is ready.
const AuthContext = createContext(null);

const LS_KEY = "bloodlink_session_v1";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, name, email, role: "requester"|"donor", donorEnabled: boolean }
  const [token, setToken] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed.user || null);
      setToken(parsed.token || null);
      setAuthToken(parsed.token || null);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ user, token }));
    setAuthToken(token);
  }, [user, token]);

  const auth = useMemo(() => {
    const loginMock = async ({ email, password }) => {
      // Replace with AuthAPI.login later.
      if (!email || !password) throw new Error("Missing credentials");
      const fakeToken = "mock-token";
      const fakeUser = {
        id: "u_" + Math.random().toString(16).slice(2),
        name: email.split("@")[0],
        email,
        donorEnabled: true,
        role: "requester",
        bloodGroup: "O+",
      };
      setToken(fakeToken);
      setUser(fakeUser);
      toast.success("Logged in!");
      return fakeUser;
    };

    const registerMock = async ({ name, email, password, donorEnabled }) => {
      if (!name || !email || !password) throw new Error("Missing fields");
      const fakeToken = "mock-token";
      const fakeUser = {
        id: "u_" + Math.random().toString(16).slice(2),
        name,
        email,
        donorEnabled: !!donorEnabled,
        role: donorEnabled ? "donor" : "requester",
        bloodGroup: "O+",
      };
      setToken(fakeToken);
      setUser(fakeUser);
      toast.success("Account created!");
      return fakeUser;
    };

    const logout = () => {
      setUser(null);
      setToken(null);
      toast("Logged out");
    };

    const updateUser = (patch) => setUser((u) => ({ ...u, ...patch }));

    return { user, token, loginMock, registerMock, logout, updateUser };
  }, []);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
