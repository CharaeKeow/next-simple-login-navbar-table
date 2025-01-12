"use server";

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
  if (!password) {
    return {
      errors: {
        password: ["Wrong email/password"],
      },
      success: false,
    };
  }

  // TODO: Encrypt the password

  return {
    success: true,
  };
}
