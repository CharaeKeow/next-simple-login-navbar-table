"use server";

import { hashPassword } from "../util/hash-password";

// Reference: https://nextjs.org/docs/app/building-your-application/authentication#1-capture-user-credentials
type LoginFormState =
  | {
      errors?: {
        username?: string[];
        password?: string[];
      };
      message?: string;
      success: false;
    }
  | {
      success: true;
    }
  | undefined;

export async function loginUser(
  state: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const username = formData.get("username");
  const password = formData.get("password");

  console.log({ username, password });

  // A fake validation just for testing. In real world this should be handled by zod
  // TODO: Field validations using zod
  if (password === "" || typeof password !== "string") {
    return {
      errors: {
        password: ["Wrong email/password"],
      },
      success: false,
    };
  }

  // Encrypt the password
  const hashedPassword = await hashPassword(password);

  return {
    success: true,
  };
}
