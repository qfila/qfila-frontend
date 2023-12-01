'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { axiosErrorMessageHandler } from '@/lib/utils';
import toast from 'react-hot-toast';

export function JoinQueueForm() {
  const [queueCode, setQueueCode] = useState('');
  const { push } = useRouter();

  function handleOnChange(changeEvent: ChangeEvent<HTMLInputElement>) {
    setQueueCode(changeEvent.target.value);
  }

  async function joinQueue() {
    try {
      await api.post(`/queue/${queueCode}/join`);
      push(`/queue/${queueCode}`);
    } catch (error) {
      toast.error(axiosErrorMessageHandler(error as Error));
    }
  }

  return (
    <>
      <div className="mb-7">
        <h1 className="text-5xl font-light">QFILA</h1>
        <h2 className="text-2xl font-light text-muted w-max ml-auto leading-6">
          Filas
        </h2>
      </div>
      <Input
        onChange={handleOnChange}
        value={queueCode}
        fullWidth
        placeholder="Código da fila"
      />
      <Button onClick={joinQueue} className="w-full">
        Enviar
      </Button>
    </>
  );
}
