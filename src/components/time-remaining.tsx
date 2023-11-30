interface Props {
  participantsCount: number;
  averageTimePerParticipant: number;
}

export function TimeRemaining({
  participantsCount,
  averageTimePerParticipant,
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
    <div className="w-[150px] xl:w-[165px] h-[150px] xl:h-[165px] border-8 border-muted-foreground rounded-full relative">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="mt-4">
          <p className="text-2xl xl:text-3xl text-center font-semibold text-muted/70">
            {createTimeByMinutes(averageTimePerParticipant * participantsCount)}
          </p>
          <p className="text-xs xl:text-md text-center font-[300] text-muted-foreground">
            ~{averageTimePerParticipant} min/pessoa
          </p>
        </div>
        <div className="bg-white text-base md:text-lg p-2 absolute bottom-[-1rem] text-muted">
          {participantsCount} pessoas
        </div>
      </div>
    </div>
  );
}
