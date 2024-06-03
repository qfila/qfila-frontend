'use client';

import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

interface Props {
  username: string | undefined;
}

export function Title({ username }: Props) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (!isDesktop) return;

  return (
    <h1 className="text-2xl text-center font-medium mb-9 mt-6">
      {username || 'Painel do gerente'}
    </h1>
  );
}
