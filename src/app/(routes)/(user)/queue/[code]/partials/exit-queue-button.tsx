'use client';

import { Button } from '@/components/ui/button';
import { axiosErrorMessageHandler } from '@/lib/utils';
import api from '@/services/api';
import { DoorOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Props {
  queueId: string;
  userId: string;
}

export function ExitQueueButton({ queueId, userId }: Props) {
  const { push } = useRouter();

  async function exitQueue() {
    try {
      await api.delete(`/queue/${queueId}/user/${userId}`);
      push('/');
    } catch (error) {
      toast.error(axiosErrorMessageHandler(error as Error));
    }
  }
  return (
    <Button
      className="w-full"
      icon={<DoorOpen />}
      variant={'outline'}
      onClick={exitQueue}
    >
      Sair da fila
    </Button>
  );
}
