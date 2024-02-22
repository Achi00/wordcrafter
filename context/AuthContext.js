"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/auth/status", {
        credentials: "include", // Include this line
      });
      const data = await response.json();
      setIsLoggedIn(data.isLoggedIn);
      setUser(data);
    } catch (error) {
      console.error("Failed to check authentication status", error);
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push("/auth");
    }
  }, [isLoggedIn, loading, router]);

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/logout", {
        method: "GET",
        credentials: "include", // Ensure credentials are included for session-based auth
      });
      if (response.ok) {
        // Only update state and redirect if the logout was successful
        setIsLoggedIn(false);
        router.push("/"); // Redirect to the home page or login page
      } else {
        // Handle failure or add error handling as needed
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
