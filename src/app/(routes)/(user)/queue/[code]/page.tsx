import { TimeRemaining } from '@/components/time-remaining';
import { Separator } from '@/components/ui/separator';
import api from '@/services/api';
import { Queue } from '@/types';
import { ExitQueueButton } from './partials/exit-queue-button';
import { QueueInfoButton } from './partials/queue-info-button';
import { getLoggedUser } from '@/lib/actions';

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

  const { data: queue } = await api.get<CustomQueueProps>('/queue', {
    params: {
      code: params.code,
    },
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl md:text-3xl text-center">{queue.title}</h1>
      <p className="text-lg md:text-2xl text-center">{queue.description}</p>
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
        participantsCount={queue.participantsCount}
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
    </div>
  );
}
