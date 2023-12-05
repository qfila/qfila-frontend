'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Expand } from 'lucide-react';
import { Queue, User } from '@/types';
import api from '@/services/api';
import { axiosErrorMessageHandler } from '@/lib/utils';
import toast from 'react-hot-toast';
import { ChangeEvent, useEffect, useState } from 'react';
import { RemoveUserButton } from './remove-user-button';

interface Props {
  queue: Queue;
}

export interface Participant extends User {
  joined_at: string;
  position: number;
}

function totalTimeFormat(minutes: number) {
  function format(value: number) {
    return value < 10 ? `0${value}` : value;
  }

  const hours = Math.floor(minutes / 60);
  const minutesRemaining = minutes % 60;
  const totalTime = `${format(hours)}h ${format(minutesRemaining)}m`;
  return totalTime;
}

function calculateTimeDifference(
  startDateISO: string,
  endDateISO: string,
): { days: number; hours: number; minutes: number } {
  const startDate: Date = new Date(startDateISO);
  const endDate: Date = new Date(endDateISO);

  // Calculate the time difference in milliseconds
  const timeDifference: number = endDate.getTime() - startDate.getTime();

  // Calculate days, hours, and minutes
  const days: number = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours: number = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes: number = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
  );

  return {
    days,
    hours,
    minutes,
  };
}

export function QueueInfoButton({ queue }: Props) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (value: boolean) => {
    setOpenModal(value);
  };

  const queueDetails = [
    {
      placeholder: 'Total de pessoas:',
      value: queue.participantsCount,
    },
    {
      placeholder: 'Tempo estimado:',
      value: queue.averageWaitTimeInMinutes,
    },
    {
      placeholder: 'Tempo estimado total:',
      value: totalTimeFormat(
        queue.participantsCount * queue.averageWaitTimeInMinutes,
      ),
    },
  ];

  const selectOptions = Array.from(
    { length: queue.participantsCount },
    (_, index) => {
      return {
        value: index + 1,
        placeholder: `${index + 1}°`,
      };
    },
  );

  async function fetchParticipants() {
    try {
      const { data } = await api.get(`/queue/${queue.id}`);

      setParticipants(data.participants);
    } catch (error) {
      toast.error(axiosErrorMessageHandler(error as Error));
    }
  }

  async function replaceUserPosition(newPosition: number, participant: User) {
    try {
      await api.put(
        `/queue/${queue.id}/users/${participant.id}/replace_position`,
        {
          newPosition,
        },
      );
      toast.success(
        `${participant.username} agora está na posição ${newPosition} da fila!`,
      );
      // handleOpenModal(false);

      fetchParticipants();
    } catch (error) {
      toast.error(axiosErrorMessageHandler(error as Error));
    }
  }

  function handleSelectChange(
    event: ChangeEvent<HTMLSelectElement>,
    participant: User,
  ) {
    const newPosition = Number(event.target.value);

    replaceUserPosition(newPosition, participant);
  }

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    if (openModal) {
      interval = setInterval(() => {
        const currentSeconds = new Date().getSeconds();

        if (currentSeconds % 5 === 0) {
          fetchParticipants();
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };

    // eslint-disable-next-line
  }, [openModal]);

  return (
    <Dialog open={openModal} onOpenChange={handleOpenModal}>
      <DialogTrigger>
        <button onClick={fetchParticipants} className="text-2xl">
          <Expand />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-background">
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground font-light">
            {queue.title}
          </DialogTitle>
          <div className="space-y-2">
            {queueDetails.map((details) => {
              return (
                <div
                  key={details.value}
                  className="flex items-center justify-between gap-6"
                >
                  <p className="max-w-[200px] break-words leading-5 truncate text-foreground font-medium">
                    {details.placeholder}
                  </p>
                  <p className="max-w-[200px] break-words leading-5 truncate font-medium">
                    {details.value}
                  </p>
                </div>
              );
            })}
          </div>
        </DialogHeader>
        {participants?.length > 0 &&
          participants.map((participant) => {
            const { hours, minutes } = calculateTimeDifference(
              participant.joined_at,
              new Date().toISOString(),
            );

            const howLong = `${hours}h e ${minutes}m`;

            return (
              <div
                key={participant.id}
                className="relative bg-white rounded-lg px-4 py-2 flex items-center justify-between gap-5"
              >
                <div className="flex items-center gap-5">
                  <h4 className="text-2xl font-light">
                    {participant.position}°
                  </h4>
                  <div className="flex flex-col">
                    <span className="inline-block font-light">
                      {participant.username}
                    </span>
                    <span className="text-muted text-sm font-light">
                      Na fila há {howLong}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="mr-2" htmlFor="changePosition">
                      Alterar posição:
                    </label>
                    <select
                      className="cursor-pointer"
                      name="changePosition"
                      id="changePosition"
                      value={participant.position}
                      onChange={(event) =>
                        handleSelectChange(event, participant)
                      }
                    >
                      {selectOptions.map((option, index) => {
                        return (
                          <option
                            key={`${option.value}${index}`}
                            value={option.value}
                          >
                            {option.placeholder}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <RemoveUserButton
                    participant={participant}
                    queue={queue}
                    refetch={fetchParticipants}
                  />
                </div>
              </div>
            );
          })}
      </DialogContent>
    </Dialog>
  );
}
