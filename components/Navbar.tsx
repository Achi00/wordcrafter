"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext.js";
import Logout from "./auth/Logout";
import { Button } from "./ui/button";
import { FaGoogle } from "react-icons/fa";
import Image from "next/image";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Logo from "../assets/wordcrafter.png";
import Link from "next/link";

interface UserProps {
  _id: string;
  googleId: string;
  name: string;
  email: string;
  picture: string;
}

const Navbar = () => {
  const { isLoggedIn, loading } = useAuth();
  const [userData, setUserData] = useState<UserProps>();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:8080/v1/users", {
          method: "GET",
          credentials: "include", // Important for sessions
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          console.log(data);
        } else {
          throw new Error("Failed to fetch user info");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="w-full flex items-center justify-between px-4 py-2">
      <Link href="/">
        <Image src={Logo} alt="wordcrafter" width={200} height={200} />
      </Link>
      <div className="flex items-center gap-5">
        {isLoggedIn ? (
          <>
            {userData && (
              <div className="flex items-center gap-2">
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger className="gap-2 cursor-pointer">
                      <Image
                        width={25}
                        height={25}
                        src={userData.picture}
                        alt="User"
                        className="rounded-full"
                      />
                      <h3 className="scroll-m-20 text-md font-semibold tracking-tight">
                        {userData.name}
                      </h3>
                    </MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>
                        <Logout />
                      </MenubarItem>
                      <MenubarItem>New Window</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Share</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Print</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>
            )}
          </>
        ) : (
          <Button>
            <FaGoogle className="mr-2 h-4 w-4" />
            <a href="http://localhost:8080/auth/google">Login with Google</a>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
