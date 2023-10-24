'use server';

import { cookies } from 'next/headers';

export async function setAccessTokenCookie(accessToken: string) {
  cookies().set('access-token', accessToken);
}
