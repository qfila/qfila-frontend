'use client';

import { TimeRemaining } from '@/components/time-remaining';
import { Separator } from '@/components/ui/separator';
import api from '@/services/api';
import { User } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { QueueInfoButton } from './queue-info-button';
import { ExitQueueButton } from './exit-queue-button';
import { CustomQueueProps } from '../page';
// import { axiosErrorMessageHandler } from '@/lib/utils';
// import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Props {
  loggedUser: User | null;
  data: CustomQueueProps;
}

export function Content({ loggedUser, data }: Props) {
  const [queue, setQueue] = useState(data || {});

  const { push } = useRouter();

  const fetch = async () => {
    try {
      const { data: queue } = await api.get<CustomQueueProps>('/queue', {
        params: {
          code: data.code,
        },
      });

      setQueue(queue);
    } catch (error) {
      push('/');
      // toast.error(axiosErrorMessageHandler(error as Error));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentSeconds = new Date().getSeconds();

      if (currentSeconds % 5 === 0) {
        fetch();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-4 max-w-md">
      <h1 className="text-2xl lg:text-3xl text-center">{queue.title}</h1>
      <p className="text-lg lg:text-2xl text-center">{queue.description}</p>
      <Separator className="my-7 md:my-10" />
      <div className="max-w-fit mx-auto">
        <h3 className="text-2xl text-center font-light ">Tempo restante</h3>
        <h4 className="font-light text-muted w-max ml-auto leading-3">
          Aprox.
        </h4>
      </div>
      <TimeRemaining
        className="mx-auto mt-6"
        averageTimePerParticipant={queue.averageWaitTimeInMinutes}
        participantsCount={queue.currentPosition - 1}
        userPosition={queue.currentPosition}
      />
      <Separator className="my-10" />
      <div className="space-y-4">
        <QueueInfoButton queue={queue} />
        <ExitQueueButton
          userId={loggedUser ? loggedUser?.id : ''}
          queueId={queue.id}
        />
      </div>
      <Link className="text-primary underline mt-4 inline-block" href={'/'}>
        Ir para a página inicial
      </Link>
    </div>
  );
}
