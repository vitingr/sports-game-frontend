"use client";

import type { Metadata } from "next";
import "../../styles/globals.scss"
import { ClerkProvider } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { checkIsPublicRoute } from "@/utils/check-route";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserProvider } from "@/contexts/UserContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  const isPublic = checkIsPublicRoute(path);

  const metadata: Metadata = {
    title: "FUT 24",
    description: "Monte o seu time dos sonhos",
  };

  return (
    <ClerkProvider>
      <html lang="pt-br">
        <body className="selection:text-[white] selection:bg-indigo-400">
          {isPublic && (
            <UserProvider>
              <Navbar />
              <main className="bg-[#f6f6f6] w-full min-h-[62vh] sm:pt-[150px] flex justify-center">{children}</main>
              <Footer />
            </UserProvider>
          )}

          {!isPublic && (
            <UserProvider>
              <Navbar />
              <main className="bg-[#f6f6f6] w-full min-h-[62vh] p-[2%] sm:pt-[150px] sm:p-[5%] flex justify-center">{children}</main>
              <Footer />
            </UserProvider>
          )}
        </body>
      </html>
    </ClerkProvider>
  );
}
