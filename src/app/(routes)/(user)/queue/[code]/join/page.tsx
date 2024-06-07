/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Queue } from '@/types';
import { getLoggedUser } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { useEffect } from 'react';
import { Loader2Icon } from 'lucide-react';
import { AxiosError } from 'axios';

interface Params {
  code: string;
}

interface Props {
  params: Params;
}

export interface CustomQueueProps extends Queue {
  currentPosition: number;
  joinedAt: string;
}

export default function QueuePage({ params }: Props) {
  const router = useRouter();

  async function fetch() {
    const loggedUser = await getLoggedUser();

    if (!loggedUser) return router.push(`/queue/${params.code}`);

    async function joinQueue() {
      const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)access-token\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );

      console.log('accessToken', accessToken);

      try {
        await api.post(
          `/queue/${params.code}/join`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        router.push(`/queue/${params.code}`);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.data?.message === 'Você já está na fila') {
            router.push(`/queue/${params.code}`);
            return;
          }
          throw error;
        } else {
          throw error;
        }
      }
    }

    joinQueue();
  }

  useEffect(() => {
    fetch();
  }, []);

  return <Loader2Icon className="animate-spin h-10 w-10 text-primary" />;
}
