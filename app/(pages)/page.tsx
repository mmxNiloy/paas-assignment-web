"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Globe2, LockIcon } from "lucide-react";
import SiteConfig from "@/lib/site.config";

interface Task {
  title: string;
  description: string;
  href: string;
  isPrivate?: boolean;
}

const tasks: Task[] = [
  {
    title: "Even Number Generator",
    description: "Generate a list of N even numbers based on user input.",
    href: "/even-number-generator",
  },
  {
    title: "Matrix Multiplier",
    description: "Multiply two matrices and display their product.",
    href: "/matrix-multiplier",
  },
  {
    title: "User Login",
    description: "Validate user credentials using email and password.",
    href: "/login",
  },
  {
    title: "N-th Largest Number Finder",
    description: "Find the N-th largest number in a list (1-based index).",
    href: "/largest-number-finder",
  },
  {
    title: "User Registration",
    description: "Register a new user by storing their information.",
    href: "/register",
  },
  {
    title: "User Dashboard",
    description: "View logged-in user’s information (private route).",
    href: "/dashboard",
    isPrivate: true,
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4 bg-background">
      <div className="max-w-5xl w-full">
        <h1 className="text-2xl font-bold text-center mb-2">
          {SiteConfig.title.default} | Task Catalog
        </h1>
        <h2 className="font-bold text-center mb-3">
          Submitted by: Ashirbad Sarkar
          <br />
          ID: 19701024
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task, index) => (
            <Card
              key={index}
              className="flex flex-col hover:scale-105 hover:shadow-blue-800 hover:border-blue-500"
            >
              <CardHeader>
                <CardTitle className="text-lg">{task.title}</CardTitle>
                <CardDescription>{task.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground flex items-center">
                  {task.isPrivate ? (
                    <>
                      <LockIcon className="size-4 mr-1" />
                      Private Route
                    </>
                  ) : (
                    <>
                      <Globe2 className="size-4 mr-1" />
                      Public Route
                    </>
                  )}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href={task.href}>Visit Page</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
