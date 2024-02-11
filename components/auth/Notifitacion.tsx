"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const Notification = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect authenticated users to the dashboard or home page
    if (isLoggedIn) {
      router.push("/"); // Change '/dashboard' to your preferred route
    }
  }, [isLoggedIn, router]);

  return null;
};

export default Notification;
