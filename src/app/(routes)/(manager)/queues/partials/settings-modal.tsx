import { Button } from '@/components/ui/button';
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { Settings } from 'lucide-react';
import { ModalRow } from './modal-row';

export function SettingsModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          colorVariant="ghost"
          className="absolute right-1 top-1 hover:bg-transparent"
        >
          <Settings className="text-muted" />
        </Button>
      </DialogTrigger>

      <DialogContent className="p-8">
        <DialogHeader className="mb-2">
          <DialogTitle className="font-light text-2xl">Informações</DialogTitle>
        </DialogHeader>
        <ModalRow title="Nome" value="Teste" />
        <ModalRow title="Nome" value="Teste" />
        <ModalRow title="Nome" value="Teste" />
        <ModalRow title="Nome" value="Teste" />
        <div className="flex items-center justify-between gap-8 mt-4">
          <Button className="w-full rounded-3xl" variant="outline">
            Editar informações
          </Button>
          <Button
            className="w-full rounded-3xl"
            colorVariant="destructive"
            variant="outline"
          >
            Apagar fila
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
