import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full p-4 max-w-xs flex flex-col gap-4 justify-center items-center">
      <div className="mb-7">
        <h1 className="text-5xl font-light">QFILA</h1>
        <h2 className="text-2xl font-light text-muted w-max ml-auto leading-6">
          Filas
        </h2>
      </div>

      <Input placeholder="email@exemplo.com" type="email" />
      <Button className="w-full">Enviar</Button>

      <div className="text-black text-sm">
        Ainda não tem conta?{' '}
        <Link href={'/sign-up'} className="underline text-primary">
          registre-se
        </Link>
      </div>
    </div>
  );
}
