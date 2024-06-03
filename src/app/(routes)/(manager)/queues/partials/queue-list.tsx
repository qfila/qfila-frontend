'use client';

import { TimeRemaining } from '@/components/time-remaining';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Queue } from '@/types';
import { formatDescription } from '@/lib/utils';
import { SettingsModal } from './settings-modal';
import { QueueInfoButton } from './queue-info-button';
import { useEffect, useState } from 'react';
import api from '@/services/api';

interface GetQueueResponse {
  queues: Queue[];
}

export function QueueList() {
  const [queues, setQueues] = useState<Queue[]>([]);

  const formatDate = (ISODate: string) => {
    return new Date(ISODate).toLocaleDateString();
  };

  const fetchData = async () => {
    const { data } = await api.get<GetQueueResponse>('/queue');

    setQueues(data.queues);
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      const currentSeconds = new Date().getSeconds();

      if (currentSeconds % 5 === 0) {
        fetchData();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid lg:grid-cols-2 2xl:grid-cols-3 flex-wrap justify-center md:justify-start gap-4">
      {queues.map((queue) => (
        <Card
          key={queue.id}
          className="w-full flex justify-between max-w-lg h-full relative"
        >
          <SettingsModal queue={queue} />
          <div className="w-full md:w-1/2 flex flex-col justify-between h-full pt-2 pb-3 md:pb-6">
            <CardHeader className="gap-2">
              <span className="text-sm text-muted-foreground">
                Código da fila: {queue.code}
              </span>
              <CardTitle className="text-lg leading-snug break-words">
                {queue.title}
              </CardTitle>
              <CardDescription className="text-sm h-full break-words">
                {formatDescription(queue.description)}
              </CardDescription>
            </CardHeader>
            <div className="flex flex-col items-start gap-4 px-6">
              <p className="text-muted/60 text-sm">
                Criada em {formatDate(queue.createdAt)}
              </p>
              <div className="flex flex-row justify-between w-[50%]">
                <QueueInfoButton queue={queue} />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center h-[100%] pt-5 pb-3 md:pb-6 pr-3 md:pr-6">
            <TimeRemaining
              forManager
              participantsCount={queue.participantsCount}
              averageTimePerParticipant={queue.averageWaitTimeInMinutes}
            />
          </div>
        </Card>
      ))}
    </div>
  );
}
