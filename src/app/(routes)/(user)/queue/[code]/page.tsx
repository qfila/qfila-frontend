import { Queue } from '@/types';
import { getLoggedUser } from '@/lib/actions';
import { Content } from './partials/content';
import api from '@/services/api';
import { notFound } from 'next/navigation';
import SignInDialogForm from '@/components/sign-in-dialog-form';
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

export default async function QueuePage({ params }: Props) {
  const loggedUser = await getLoggedUser();

  if (!loggedUser) {
    return (
      <SignInDialogForm
        redirectAfterLogin={false}
        joinQueueAfterLogin
        queueCode={params.code}
      />
    );
  }

  try {
    const { data: queue } = await api.get<CustomQueueProps>('/queue', {
      params: {
        code: params.code,
      },
    });

    if (!queue) notFound();

    return <Content loggedUser={loggedUser} data={queue} />;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 403) return notFound();
      if (error.response?.status === 404) return notFound();
      throw error;
    } else {
      throw error;
    }
  }
}
