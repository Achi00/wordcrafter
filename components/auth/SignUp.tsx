"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const SignUp = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  console.log("Component render", { error });

  useEffect(() => {
    // Check if a toast has already been shown for the current session
    const toastShown = sessionStorage.getItem("toastShown");

    if (error && !toastShown) {
      toast.error("Authentication failed. Please try again.");
      // Mark that the toast has been shown by setting a flag in session storage
      sessionStorage.setItem("toastShown", "true");
    }

    // Cleanup function to remove the flag when the component unmounts
    // This is optional depending on whether you want the message to show once per session or once per component mount
    return () => {
      sessionStorage.removeItem("toastShown");
    };
  }, [error]);

  return (
    <div className="flex w-full items-center justify-center h-screen">
      <a href="http://localhost:8080/auth/google">Login with Google</a>
    </div>
  );
};

export default SignUp;
