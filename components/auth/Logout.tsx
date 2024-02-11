"use client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { toast } from "sonner";

const Logout = () => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
    toast.info("You have been logged out");
  };
  return (
    <Button variant="link" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
