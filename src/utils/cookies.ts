import { cookies } from 'next/headers';

const AUTH_COOKIE_NAME = 'session';

export const getAuthCookie = async () => {
  return (await cookies()).get(AUTH_COOKIE_NAME);
};

export const setAuthCookie = async (value: string) => {
  (await cookies()).set({
    name: AUTH_COOKIE_NAME,
    value,
    httpOnly: true,
    sameSite: 'lax',
    // Other options
  });
};

export const deleteAuthCookie = async () => {
  (await cookies()).delete(AUTH_COOKIE_NAME);
};
