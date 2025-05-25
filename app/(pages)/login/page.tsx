"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useTopLoader } from "nextjs-toploader";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { CheckCheck, LoaderCircle, Shield } from "lucide-react";
import login from "@/app/(server)/action/auth/login.controller";
import Link from "next/link";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormType = z.infer<typeof FormSchema>;

export default function LoginPage() {
  const [loading, startAuth] = useTransition();

  const { start } = useTopLoader();
  const router = useRouter();

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    (data: FormType) => {
      startAuth(async () => {
        const session = await login(data);

        if (!session.ok) {
          toast.error("Failed to login. Invalid credentials.");
        } else {
          toast.success("Login successful!");
          start();
          router.push("/dashboard");
        }
      });
    },
    [router, start]
  );

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription className="sr-only">
            Login to view your data
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@email.com" {...field} />
                    </FormControl>

                    <FormDescription>
                      Enter your email here. For example:{" "}
                      <em>example@email.com</em>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="password" {...field} />
                    </FormControl>

                    <FormDescription>Enter your password here.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-400 text-white gap-1"
              >
                {loading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <Shield />
                )}
                Login
              </Button>

              <p className="text-center text-xs text-secondary-foreground">
                Don&apos;t have an account?
              </p>

              <Link href={"/register"} passHref>
                <Button
                  type="button"
                  disabled={loading}
                  className="w-full bg-green-500 hover:bg-green-400 text-white gap-1"
                >
                  <CheckCheck />
                  Register
                </Button>
              </Link>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
