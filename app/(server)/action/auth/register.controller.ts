"use server";

import { hash } from "bcrypt";
import prisma from "../../prisma";
import ActionResponseBuilder from "@/lib/ActionResponseBuilder";

interface ICredentials {
  name: string;
  email: string;
  password: string;
}

export default async function register(credentials: ICredentials) {
  try {
    const { name, email, password } = credentials;
    const passwordHash = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    return ActionResponseBuilder.success(user).toJSON();
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
