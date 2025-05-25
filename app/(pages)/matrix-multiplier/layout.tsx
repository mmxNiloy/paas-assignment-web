import SiteConfig from "@/lib/site.config";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: SiteConfig.title.matrix,
  description: SiteConfig.description.matrix,
};

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
