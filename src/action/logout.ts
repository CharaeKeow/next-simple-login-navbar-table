'use server';

import { deleteAuthCookie } from '@/utils/cookies';

/**
 * Server action to clear session cookie upon logging out
 */
export async function logout() {
  await deleteAuthCookie();
}
