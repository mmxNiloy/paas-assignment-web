import SiteConfig from "@/lib/site.config";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: SiteConfig.title.register,
  description: SiteConfig.description.register,
};

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
