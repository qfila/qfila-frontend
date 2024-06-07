'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { QrCode } from 'lucide-react';
import { Queue, User } from '@/types';
import { useState } from 'react';
import Image from 'next/image';

interface Props {
  queue: Queue;
}

export interface Participant extends User {
  joined_at: string;
  position: number;
}

export function QRCodeButton({ queue }: Props) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (value: boolean) => {
    setOpenModal(value);
  };

  return (
    <Dialog open={openModal} onOpenChange={handleOpenModal}>
      <DialogTrigger>
        <button className="text-2xl">
          <QrCode />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-background">
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground font-light mb-8">
            QR Code para acessar a fila
          </DialogTitle>
          <Image
            className="w-[100%]"
            src={`https://api.qrserver.com/v1/create-qr-code/?size=1024x1024&bgcolor=f0f0f0&data=${
              window.location.origin + `/queue/${queue.code}/join`
            }`}
            height="240"
            width="240"
            alt="QR Code para acessar a fila"
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
