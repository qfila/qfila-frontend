'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { axiosErrorMessageHandler } from '@/lib/utils';
import api from '@/services/api';
import { DoorOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  queueId: string;
  userId: string;
}

export function ExitQueueButton({ queueId, userId }: Props) {
  const [openPopover, setOpenPopover] = useState(false);
  const { push } = useRouter();

  const handleOpenPopover = (open: boolean) => {
    setOpenPopover(open);
  };

  async function exitQueue() {
    try {
      await api.delete(`/queue/${queueId}/user/${userId}`);
      push('/');
    } catch (error) {
      toast.error(axiosErrorMessageHandler(error as Error));
    }
  }
  return (
    <Popover open={openPopover} onOpenChange={handleOpenPopover}>
      <PopoverTrigger className="w-full">
        <Button className="w-full" icon={<DoorOpen />} variant={'outline'}>
          Sair da fila
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        Tem certeza de que deseja sair da fila?
        <div className="flex items-center gap-4 mt-2">
          <Button variant={'outline'} onClick={exitQueue}>
            Confirmar
          </Button>
          <Button
            variant={'outline'}
            colorVariant={'destructive'}
            onClick={() => handleOpenPopover(false)}
          >
            Cancelar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
