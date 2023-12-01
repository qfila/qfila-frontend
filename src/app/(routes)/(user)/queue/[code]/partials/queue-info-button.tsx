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
import { Queue } from '@/types';

import { Info } from 'lucide-react';

interface Props {
  queue: Queue;
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
              className="flex flex-col sm:flex-row sm:items-center justify-between sm:gap-6"
            >
              <p className="text-foreground truncate">{row.placeholder}</p>
              <TooltipProvider>
                <Tooltip>
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
