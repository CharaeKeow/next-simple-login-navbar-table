'use server';

import { PostLoginResponseError } from '@/types/api';
import { hashPassword } from '../util/hash-password';
import { cookies } from 'next/headers';

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
  const username = formData.get('username');
  const password = formData.get('password');

  console.log({ username, password });

  // A fake validation just for testing. In real world this should be handled by zod
  // TODO: Field validations using zod
  if (password === '' || typeof password !== 'string') {
    return {
      errors: {
        password: ['Wrong username/password'],
      },
      success: false,
    };
  }

  // Encrypt the password
  const hashedPassword = await hashPassword(password);

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password: hashedPassword,
    }),
  });

  if (res.status !== 200) {
    const resData: PostLoginResponseError = await res.json(); // grab error message from response data and return to FE

    return {
      success: false,
      errors: {
        password: [resData.message],
      },
    };
  }

  // Set cookie to mark user as logged in
  (await cookies()).set({
    name: 'session',
    value: '123xxx',
    httpOnly: true,
    sameSite: 'lax',
  });

  return {
    success: true,
  };
}
