"use client";

import type { Metadata } from "next";
import "../../styles/globals.scss";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { checkIsPublicRoute } from "@/utils/check-route";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserProvider } from "@/contexts/UserContext";
import { ApolloContext } from "@/contexts/ApolloContext";
import { WebSocketProvider } from "@/contexts/WebSocketContext";
import Header from "@/components/Header";

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

  // Se tiver bug sem login verificar config do web socket

  return (
    <ClerkProvider>
      <html lang="pt-br">
        <body className="selection:text-[white] selection:bg-[#5BB5A2]">
          <ApolloContext>
            {isPublic && (
              <>
                <SignedIn>
                  <UserProvider>
                    <Navbar />
                    <main className="bg-[#FAFAFC] w-full min-h-[62vh] sm:pt-[150px] flex justify-center">
                      {children}
                    </main>
                    <Footer />
                  </UserProvider>
                </SignedIn>
                <SignedOut>
                    <Header />
                    <main className="bg-[#FAFAFC] w-full min-h-[62vh] sm:pt-[150px] flex justify-center">
                      {children}
                    </main>
                    <Footer />
                </SignedOut>
              </>
            )}

            {!isPublic && (
              <UserProvider>
                <WebSocketProvider>
                  <SignedIn>
                    <Navbar />
                    <main className="bg-[#FAFAFC] w-full min-h-[62vh] p-[2%] sm:pt-[150px] sm:p-[5%] flex justify-center">
                      {children}
                    </main>
                    <Footer />
                  </SignedIn>
                </WebSocketProvider>
              </UserProvider>
            )}
          </ApolloContext>
        </body>
      </html>
    </ClerkProvider>
  );
}
