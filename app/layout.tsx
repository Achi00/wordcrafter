import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AIResponseProvider } from "@/context/AIResponseContext";
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WordCrafter",
  description: "Research, Generate & Write In One Space",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <AIResponseProvider>
          <body className={inter.className}>
            <Toaster position="top-center" />
            <Navbar />
            <Sidebar />
            {children}
          </body>
        </AIResponseProvider>
      </AuthProvider>
    </html>
  );
}
