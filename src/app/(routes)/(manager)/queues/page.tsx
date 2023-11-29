'use client';

import { TimeRemaining } from '@/components/time-remaining';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import api from '@/services/api';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SettingsModal } from './partials/settings-modal';

export default function Queues() {
  const [queues, setQueues] = useState([]);

  const fetchQueues = async () => {
    const {
      data: { queues },
    } = await api.get('/queue');

    setQueues(queues);
  };

  const formatDate = (ISODate: string) => {
    return new Date(ISODate).toLocaleDateString();
  };

  const formatDescription = (description: string) => {
    return description.length > 50
      ? description.substring(0, 50) + '...'
      : description;
  };

  useEffect(() => {
    fetchQueues();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-start p-4 gap-8">
      <Link href="/create-queue">
        <Button>Criar fila</Button>
      </Link>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(queues as any[]).map(
          ({
            id,
            title,
            description,
            averageWaitTimeInMinutes,
            maxParticipants,
            createdAt,
            participantsCount,
          }) => (
            <Card
              key={id}
              className="w-full max-w-[480px] flex flex-row justify-start h-[260px] relative"
            >
              <SettingsModal />
              <div className="w-[50%] h-[100%] flex flex-col justify-between pt-2 pb-6">
                <CardHeader className="gap-2">
                  <CardTitle className="text-lg leading-snug">
                    {title}
                  </CardTitle>
                  <CardDescription className="text-md h-[3.5rem]">
                    {formatDescription(description)}
                  </CardDescription>
                </CardHeader>
                <div className="flex flex-col items-start gap-4 px-6">
                  <p className="text-muted/60 text-sm">
                    Criada em {formatDate(createdAt)}
                  </p>
                  <div className="flex flex-row justify-between w-[50%]">
                    <div className="text-2xl">o</div>
                    <div className="text-2xl">o</div>
                    <div className="text-2xl">o</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center h-[100%] pt-2 pb-6">
                <TimeRemaining
                  participantsCount={participantsCount}
                  averageTimePerParticipant={averageWaitTimeInMinutes}
                />
              </div>
            </Card>
          ),
        )}
      </div>
    </div>
  );
}
