import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AxiosError } from 'axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function axiosErrorMessageHandler(error: Error) {
  if (error instanceof AxiosError) {
    const data = error.response?.data;

    if (data?.message) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage instanceof Array) return errorMessage[0];
      return errorMessage;
    }
  }

  return 'Não foi possível realizar esta ação no momento, tente novamente mais tarde.';
}
