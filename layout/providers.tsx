"use client";

import React from "react";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";

interface IProviderProps {
  children: React.ReactNode;
}

export default function Providers({ children }: IProviderProps) {
  return (
    <>
      <NextTopLoader />
      {children}
      <Toaster />
    </>
  );
}
