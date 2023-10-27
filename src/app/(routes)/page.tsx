import { LogoutButton } from '@/components/logout-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getLoggedUser } from '@/lib/actions';
import Link from 'next/link';

export default async function Home() {
  const loggedUser = await getLoggedUser();

  return (
    <div className="w-full p-4 max-w-xs flex flex-col gap-4 justify-center items-center">
      {loggedUser && (
        <LogoutButton className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 text-primary" />
      )}

      {loggedUser && (
        <div className="mb-4">
          <span className="text-xl font-medium">Bem-vindo</span>
          <br />
          {loggedUser.username}
        </div>
      )}

      <div className="mb-7">
        <h1 className="text-5xl font-light">QFILA</h1>
        <h2 className="text-2xl font-light text-muted w-max ml-auto leading-6">
          Filas
        </h2>
      </div>
      <Input placeholder="Código da fila" />
      <Button className="w-full">Enviar</Button>

      {!loggedUser && (
        <div className="text-black text-sm">
          Ainda não tem conta?{' '}
          <Link href={'/sign-up'} className="underline text-primary">
            registre-se
          </Link>
        </div>
      )}
    </div>
  );
}
