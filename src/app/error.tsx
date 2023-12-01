'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    console.error(error.message);

    if (error.message.includes('401')) setUnauthorized(true);
  }, [error]);

  return (
    <main className="h-screen flex flex-col items-center gap-4 text-center p-4 mt-6">
      <h1 className="font-bold text-3xl">Algo de inesperado ocorreu!</h1>
      {unauthorized ? (
        <>
          <p className="font-medium text-muted-foreground max-w-xl text-lg">
            Faça login para continuar:
          </p>
          <Link href={'/sign-in'} className="underline text-primary">
            <Button>Ir para login</Button>
          </Link>
        </>
      ) : (
        <>
          <p className="font-medium text-muted-foreground max-w-xl text-lg">
            Ops! Algo deu errado. Por favor, tente novamente mais tarde.
          </p>
          <Button onClick={() => reset()}>Tentar novamente</Button>
          <p className="font-medium text-muted-foreground max-w-xl text-lg">
            ou va para a página principal
          </p>
          <Link href={'/'} className="underline text-primary">
            <Button>Ir para página principal</Button>
          </Link>
        </>
      )}
    </main>
  );
}
