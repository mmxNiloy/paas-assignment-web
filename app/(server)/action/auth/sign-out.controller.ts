"use server";

import { EnvironmentError } from "@/lib/schema/error.schema";
import { cookies } from "next/headers";

export default async function signOut() {
  try {
    const authCookie = process.env.NEXT_PUBLIC_AUTH_COOKIE;
    if (!authCookie) {
      throw new EnvironmentError(
        "Invalid environment. NEXT_PUBLIC_AUTH_COOKIE is missing."
      );
    }

    const cookieStore = await cookies();
    cookieStore.delete(authCookie);

    return true;
  } catch (err) {
    console.error(
      "[Actions] > Get Current User > Failed to get current user. Error:",
      err
    );
    return false;
  }
}
