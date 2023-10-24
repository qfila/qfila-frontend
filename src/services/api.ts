import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const isServer = typeof window === 'undefined';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  if (isServer) {
    const { cookies } = await import('next/headers');
    const token = cookies().get('access-token')?.value;

    if (token) config.headers.Authorization = `Bearer ${token}`;
  } else {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)access-token\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );

    if (token) config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
