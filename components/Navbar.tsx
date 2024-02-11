"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext.js";
import Logout from "./auth/Logout";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const Navbar = () => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <nav>
      <div>
        {isLoggedIn ? <div>Welcome back! You are logged in.</div> : <Logout />}
      </div>
    </nav>
  );
};

export default Navbar;
