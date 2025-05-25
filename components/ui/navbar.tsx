import SiteConfig from "@/lib/site.config";
import { Rabbit } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import ProfileNavlink from "../custom/profile-navlink";
import { Skeleton } from "./skeleton";
import { Calculator, Copy, FileDigit } from "lucide-react";
import NavLink from "../custom/navlink";

export default function Navbar() {
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="px-6 sm:px-8 md:px-12 lg:px-16 flex h-14 items-center gap-2 md:gap-4">
          <div className="mr-4 hidden md:flex">
            <Link
              className="mr-4 flex items-center gap-2 lg:mr-6"
              passHref
              href="/"
            >
              <Rabbit />
              <p className="flex flex-col gap-0.5">
                <span className="font-bold text-sm text-primary">
                  {SiteConfig.title.default}
                </span>
                <span className="text-xs text-secondary-foreground">
                  Submitted By: <em>19701024</em>
                </span>
              </p>
            </Link>
            <nav className="flex items-center gap-4 text-sm xl:gap-6 *:*:cursor-pointer">
              <NavLink href="/even-number-generator">
                <Calculator /> Even Number Generator
              </NavLink>

              <NavLink href="/matrix-multiplier">
                <Copy /> Matrix Multiplier
              </NavLink>

              <NavLink href="/largest-number-finder">
                <FileDigit /> Largest Number Finder
              </NavLink>
            </nav>
          </div>

          <span className="grow" />

          <Suspense fallback={<Skeleton className="h-10 w-64" />}>
            <ProfileNavlink />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
