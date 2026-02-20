import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { ErrorBoundary } from "@/components/error-boundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokédex - Gotta Catch 'Em All!",
  description: "A modern, performant Pokédex application built with Next.js 15, React Query, and Framer Motion",
  keywords: ["pokemon", "pokedex", "nextjs", "react", "typescript"],
  authors: [{ name: "Bob" }],
  openGraph: {
    title: "Pokédex",
    description: "A modern Pokédex application",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <QueryProvider>{children}</QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

// Made with Bob
