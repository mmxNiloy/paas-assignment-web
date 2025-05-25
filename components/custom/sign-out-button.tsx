"use client";
import signOut from "@/app/(server)/action/auth/sign-out.controller";
import { useRouter } from "next/navigation";
import React, { useCallback, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function SignOutButton() {
  const [loading, startSignOut] = useTransition();
  const router = useRouter();
  const handleSignOut = useCallback(() => {
    startSignOut(async () => {
      const result = await signOut();
      if (result) {
        toast.success("Signed out!");
        router.replace("/");
      } else {
        toast.error("Sign out failed!");
      }
    });
  }, [router]);
  return (
    <Button
      disabled={loading}
      onClick={handleSignOut}
      variant="outline"
      className="cursor-pointer"
    >
      Sign Out
    </Button>
  );
}
