export function TimeRemaining() {
  return (
    <div className="w-[250px] h-[250px] border-8 border-muted-foreground rounded-full relative">
      <div className="flex flex-col items-center justify-end gap-20 translate-y-2 h-full">
        <div className="text-5xl font-semibold text-muted-foreground">24:30</div>
        <div className="bg-background text-xl px-2">6 pessoas</div>
      </div>
    </div>
  );
}
