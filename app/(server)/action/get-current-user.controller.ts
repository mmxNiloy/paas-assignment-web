"use server";

import { EnvironmentError, SessionError } from "@/lib/schema/error.schema";
import { cookies } from "next/headers";
import { User } from "../generated/prisma";

export default async function getCurrentUser() {
  try {
    const authCookieKey = process.env.NEXT_PUBLIC_AUTH_COOKIE;

    if (!authCookieKey) {
      throw new EnvironmentError(
        "Invalid environment. NEXT_PUBLIC_AUTH_COOKIE is missing."
      );
    }

    const cookieStore = await cookies();
    const authCookie = cookieStore.get(authCookieKey);

    if (!authCookie || authCookie.value.length < 1) {
      throw new SessionError();
    }

    const parsed = JSON.parse(authCookie.value);

    const user: Pick<User, "email" | "name"> = {
      name: parsed.name,
      email: parsed.email,
    };

    return user;
  } catch (err) {
    console.error(
      "[Actions] > Get Current User > Failed to get current user. Error:",
      err
    );
    return null;
  }
}
