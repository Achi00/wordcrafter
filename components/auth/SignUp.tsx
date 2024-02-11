"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";
import Logo from "../../assets/wordcrafter.png";
import Image from "next/image";
import Link from "next/link";

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
    <>
      <div className="flex flex-col gap-5 w-full items-center justify-center h-screen bg-white text-center">
        <h1 className="scroll-m-20 text-4xl tracking-tight lg:text-3xl p-4">
          Authenticate With Google
        </h1>
        <Button>
          <FaGoogle className="mr-2 h-4 w-4" />{" "}
          <a href="http://localhost:8080/auth/google">Login with Google</a>
        </Button>
      </div>
      <div className="absolute bottom-0 flex pb-14 flex-col items-center justify-center gap-2">
        <Image src={Logo} width={150} height={150} alt="wordcrafter" />
        <div className="flex items-center justify-between gap-5">
          <Link href="/" className="border-b text-gray-500 hover:text-gray-900">
            How To Use
          </Link>
          <Link href="/" className="border-b text-gray-500 hover:text-gray-900">
            Privacy policy
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
