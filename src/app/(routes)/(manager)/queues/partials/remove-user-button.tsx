import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Participant } from './queue-info-button';
import api from '@/services/api';
import { Queue, User } from '@/types';
import { axiosErrorMessageHandler } from '@/lib/utils';
import toast from 'react-hot-toast';

interface Props {
  participant: Participant;
  queue: Queue;
  refetch: () => Promise<void>;
}

export function RemoveUserButton({ participant, queue, refetch }: Props) {
  const [openPopover, setOpenPopover] = useState(false);

  const handleOpenPopover = (value: boolean) => {
    setOpenPopover(value);
  };

  async function removeParticipant(participant: User) {
    try {
      await api.delete(`/queue/${queue.id}/user/${participant.id}`);
      toast.success(`${participant.username} foi removido da fila!`);
      refetch();
    } catch (error) {
      toast.error(axiosErrorMessageHandler(error as Error));
    }
  }

  return (
    <Popover open={openPopover}>
      <PopoverTrigger onClick={() => handleOpenPopover(true)}>
        <Button variant={'outline'} colorVariant={'destructive'} icon={<X />}>
          Remover usuário
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        Tem certeza de que deseja remover o usuário {participant.username} da
        fila?
        <div className="flex flex-col gap-2 mt-4">
          <Button
            onClick={() => handleOpenPopover(false)}
            className="w-full rounded-3xl"
            colorVariant="destructive"
            variant="outline"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => removeParticipant(participant)}
            className="w-full rounded-3xl"
            variant="outline"
          >
            Confirmar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
