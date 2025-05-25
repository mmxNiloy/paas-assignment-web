"use server";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/layout/providers";
import SiteConfig from "@/lib/site.config";
import "../globals.css";
import Navbar from "@/components/ui/navbar";
import PageContainer from "@/layout/page-container";
import ErrorToaster from "@/components/custom/error-toaster";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: SiteConfig.title.default,
    description: SiteConfig.description.default,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          <PageContainer>{children}</PageContainer>
          <Suspense>
            <ErrorToaster />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
