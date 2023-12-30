import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from "next";
import "../../styles/globals.scss"

export const metadata: Metadata = {
  title: "FUT 24",
  description: "Monte o seu time dos sonhos"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang='pt-br'>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}