import { Queue } from '@/types';
import { getLoggedUser } from '@/lib/actions';
import { Content } from './partials/content';
import api from '@/services/api';
import { notFound } from 'next/navigation';

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

export default async function QueuePage({ params }: Props) {
  const { data: queue } = await api.get<CustomQueueProps>('/queue', {
    params: {
      code: params.code,
    },
  });

  if (!queue) notFound();

  const loggedUser = await getLoggedUser();

  return <Content loggedUser={loggedUser} code={params.code} />;
}
