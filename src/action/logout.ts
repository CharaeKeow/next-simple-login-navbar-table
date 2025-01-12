'use server';

import { cookies } from 'next/headers';

/**
 * Server action to clear session cookie upon logging out
 */
export async function logout() {
  (await cookies()).delete('session');
}
