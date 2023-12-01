import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';

interface Props {
  participantsCount: number;
  averageTimePerParticipant: number;
  forManager?: boolean;
  userPosition?: number;
  className?: ClassValue;
}

export function TimeRemaining({
  participantsCount,
  averageTimePerParticipant,
  forManager = false,
  userPosition,
  className,
}: Props) {
  const createTimeByMinutes = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const formattedMinutes =
      remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`;
    const formattedSeconds = '00'; // Always start with 00 seconds

    return `${hours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div
      className={cn(
        'border-8 border-muted-foreground rounded-full relative',
        className,
        forManager
          ? 'w-[150px] xl:w-[165px] h-[150px] xl:h-[165px]'
          : 'w-[250px] h-[250px] ',
      )}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <div className="mt-4">
          <p
            className={cn(
              'text-center font-semibold text-muted/70',
              forManager ? 'text-2xl xl:text-3xl' : 'text-4xl',
            )}
          >
            {createTimeByMinutes(averageTimePerParticipant * participantsCount)}
          </p>
          <p
            className={cn(
              'text-center font-[300] text-muted-foreground',
              forManager ? 'text-xs xl:text-md' : 'text-md',
            )}
          >
            ~{averageTimePerParticipant} min/pessoa
          </p>
        </div>
        <div
          className={cn(
            'text-base md:text-lg p-2 absolute text-muted',
            forManager
              ? 'bg-white bottom-[-1rem]'
              : 'bg-background bottom-[-1.5rem]',
          )}
        >
          {forManager ? (
            `${participantsCount} pessoas`
          ) : (
            <div className="flex flex-col items-center justify-center">
              <span className="text-xl text-foreground font-light">
                {userPosition ? userPosition - 1 : participantsCount} pessoas
              </span>
              <span className="inline-block text-muted">na sua frente</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
