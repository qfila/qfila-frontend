import { TimeRemaining } from '@/components/time-remaining';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { SettingsModal } from './settings-modal';
import { Queue } from '@/types';
import { formatDescription } from '@/lib/utils';

interface Props {
  queues: Queue[];
}

export function QueueList({ queues }: Props) {
  const formatDate = (ISODate: string) => {
    return new Date(ISODate).toLocaleDateString();
  };

  return (
    <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4">
      {queues.map(
        ({
          id,
          title,
          description,
          averageWaitTimeInMinutes,
          participantsCount,
          maxParticipants,
          createdAt,
        }) => (
          <Card key={id} className="w-full flex h-[260px] relative">
            <SettingsModal
              queueId={id}
              queueTitle={title}
              queueDescription={description}
              queueAverageWaitTimeInMinutes={averageWaitTimeInMinutes}
              queueMaxParticipants={maxParticipants}
            />
            <div className="w-1/2 h-full pt-2 pb-6">
              <CardHeader className="gap-2">
                <CardTitle className="text-lg leading-snug break-words">
                  {title}
                </CardTitle>
                <CardDescription className="text-md h-[3.5rem] break-words">
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
            <div className="flex items-center justify-center h-[100%] pt-2 pb-6 pr-6">
              <TimeRemaining
                participantsCount={participantsCount}
                averageTimePerParticipant={averageWaitTimeInMinutes}
              />
            </div>
          </Card>
        ),
      )}
    </div>
  );
}
