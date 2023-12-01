'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Info } from 'lucide-react';
import { CustomQueueProps } from '../page';

interface Props {
  queue: CustomQueueProps;
}

function formatJoinedAt(isoDate: string): string {
  const date = new Date(isoDate);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const joinedAt = `${day}/${month}/${year} às ${hours}:${minutes}:${seconds}`;

  return joinedAt;
}

export function QueueInfoButton({ queue }: Props) {
  const modalRows = [
    {
      placeholder: 'Nome',
      value: queue.title,
    },
    {
      placeholder: 'Descrição',
      value:
        'queue.description queue.descriptionqueue.descriptionqueue.descriptionqueue.descriptionqueue.descriptionqueue.description',
    },
    {
      placeholder: 'Total de pessoas',
      value: queue.participantsCount,
    },
    {
      placeholder: 'Você entrou em',
      value: formatJoinedAt(queue.joinedAt),
    },
  ];

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button className="w-full" icon={<Info />} variant={'outline'}>
          Informações
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground font-light">
            Informações
          </DialogTitle>
        </DialogHeader>
        {modalRows.map((row) => {
          return (
            <div
              key={row.placeholder}
              className="sm:flex items-center justify-between gap-6"
            >
              <p className="text-foreground truncate">{row.placeholder}</p>
              <TooltipProvider>
                <Tooltip defaultOpen={false}>
                  <TooltipTrigger className="cursor-default">
                    <p className="max-w-[200px] break-words leading-5 truncate">
                      {row.value}
                    </p>
                  </TooltipTrigger>

                  <TooltipContent>
                    <p className="max-w-[250px] break-words leading-5">
                      {row.value}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          );
        })}
      </DialogContent>
    </Dialog>
  );
}
