'use server';

import api from '@/services/api';
import { User } from '@/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function setAccessTokenCookie(accessToken: string) {
  cookies().set('access-token', accessToken);
}

export async function logOut() {
  cookies().delete('access-token');
  redirect('/sign-in');
}

export async function getLoggedUser(): Promise<User | null> {
  try {
    const { data } = await api.get('/user/me');
    return data;
  } catch (error) {
    return null;
  }
}
