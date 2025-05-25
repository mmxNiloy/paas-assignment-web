"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface INavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: INavLinkProps) {
  const pathname = usePathname();
  return (
    <Link href={href} passHref>
      <Button
        size="sm"
        variant={"ghost"}
        className={cn(
          "text-sm",
          pathname.endsWith(href) &&
            "bg-blue-500 hover:bg-blue-400 text-white hover:text-white"
        )}
      >
        {children}
      </Button>
    </Link>
  );
}
