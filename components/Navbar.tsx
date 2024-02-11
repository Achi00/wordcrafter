"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext.js";
import Logout from "./auth/Logout";
import { Button } from "./ui/button";
import { FaGoogle } from "react-icons/fa";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const Navbar = () => {
  const { isLoggedIn, loading } = useAuth();

  //   useEffect(() => {
  //     const fetchUserInfo = async () => {
  //       try {
  //         const response = await fetch("http://localhost:8080/v1/users", {
  //           method: "GET",
  //           credentials: "include", // Important for sessions
  //         });
  //         if (response.ok) {
  //           const data = await response.json();
  //           console.log(data); // Do something with user data
  //         } else {
  //           throw new Error("Failed to fetch user info");
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user info:", error);
  //       }
  //     };
  //     fetchUserInfo();
  //   }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <nav>
      <div>
        {isLoggedIn ? (
          <Logout />
        ) : (
          <Button>
            <FaGoogle className="mr-2 h-4 w-4" />{" "}
            <a href="http://localhost:8080/auth/google">Login with Google</a>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
