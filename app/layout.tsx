import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AIResponseProvider } from "@/context/AIResponseContext";
import { Toaster } from "sonner";

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
      <AIResponseProvider>
        <body className={inter.className}>
          <Toaster position="top-center" />
          {children}
        </body>
      </AIResponseProvider>
    </html>
  );
}
