"use server";

import { compare } from "bcrypt";
import prisma from "../../prisma";
import ActionResponseBuilder from "@/lib/ActionResponseBuilder";
import { cookies } from "next/headers";
import {
  CredentialsMissingError,
  EnvironmentError,
  InvalidCredentialsError,
} from "@/lib/schema/error.schema";

interface ICredentials {
  email: string;
  password: string;
}

export default async function login(credentials: ICredentials) {
  try {
    const cookieKey = process.env.NEXT_PUBLIC_AUTH_COOKIE;
    if (!cookieKey) {
      throw new EnvironmentError(
        "Invalid environment. NEXT_PUBLIC_AUTH_COOKIE is missing."
      );
    }

    if (!credentials) {
      throw new CredentialsMissingError();
    }

    const { email, password } = credentials;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const passwordCompare = await compare(password, user.passwordHash);

    if (!passwordCompare) {
      throw new InvalidCredentialsError();
    }

    const payload = {
      email: user.email,
      name: user.name,
      id: user.id,
    };

    const cookieStore = await cookies();

    cookieStore.set(cookieKey, JSON.stringify(payload), {
      secure: true,
      httpOnly: true,
      sameSite: "lax",
    });

    return ActionResponseBuilder.success(payload).toJSON();
  } catch (err) {
    if (err instanceof Error) {
      return ActionResponseBuilder.error({
        error: true,
        message: err.message,
        statusCode: 500,
        path: "/action/auth/login",
        timestamp: new Date().toISOString(),
      }).toJSON();
    }
    return ActionResponseBuilder.error({
      error: true,
      message: "Unknown error",
      statusCode: 500,
      path: "/action/auth/login",
      timestamp: new Date().toISOString(),
    }).toJSON();
  }
}
