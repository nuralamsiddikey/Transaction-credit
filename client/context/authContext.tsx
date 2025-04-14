"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ReactNode } from "react";

type AuthContextType = {
  user: any | null;
  login: (token: any, userData: any) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  getToken: () => string | undefined;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: () => false,
  getToken: () => undefined,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on initial load
    const token = Cookies.get("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = (token: any, userData: any) => {
    Cookies.set("token", token, { expires: 7, path: "/" });
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove("token", { path: "/" });
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  // Function to check if token is valid (useful for protected routes)
  const isAuthenticated = () => {
    return !!Cookies.get("token");
  };

  // Function to get the token for API requests
  const getToken = () => {
    return Cookies.get("token");
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        getToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
