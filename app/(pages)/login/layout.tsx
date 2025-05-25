import SiteConfig from "@/lib/site.config";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: SiteConfig.title.login,
  description: SiteConfig.description.login,
};

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
