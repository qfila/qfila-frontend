interface Props {
  title: string;
  value: string;
}

export function ModalRow({ title, value }: Props) {
  return (
    <div className="flex flex-row align-center justify-between w-full">
      <p className="font-thin text-foreground">{title}</p>
      <p className="font-thin">{value}</p>
    </div>
  );
}
