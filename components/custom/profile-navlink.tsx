"use server";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import getCurrentUser from "@/app/(server)/action/get-current-user.controller";
import { ChevronRight } from "lucide-react";

export default async function ProfileNavlink() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <>
        <Link passHref className="min-w-32" href={"/login"}>
          <Button className="bg-blue-500 hover:bg-blue-400 text-white w-full">
            Login
          </Button>
        </Link>
        <Link passHref className="min-w-32" href={"/register"}>
          <Button className="bg-green-500 hover:bg-green-400 text-white w-full">
            Register
          </Button>
        </Link>
      </>
    );
  }

  return (
    <Link passHref href="/dashboard">
      <Button className="cursor-pointer from-sky-400 via-green-500 to-amber-500 bg-gradient-to-br text-white hover:from-sky-300 hover:via-emerald-400 hover:to-amber-400 gap-1">
        {user.name} | Dashboard
        <ChevronRight />
      </Button>
    </Link>
  );
}
