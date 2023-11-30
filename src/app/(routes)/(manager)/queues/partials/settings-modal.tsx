'use client';

import { Button } from '@/components/ui/button';
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from '@/components/ui/dialog';
import { Settings } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import * as yup from 'yup';
import { axiosErrorMessageHandler } from '@/lib/utils';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { Queue } from '@/types';

interface Props {
  queue: Queue;
}

interface ModalRow {
  name:
    | 'title'
    | 'description'
    | 'averageWaitTimeInMinutes'
    | 'maxParticipants';
  placeholder: string;
  value: string | number;
}

const editQueueSchema = yup.object({
  title: yup
    .string()
    .min(3, 'Insira no mínimo 3 caracteres.')
    .required('Nome da fila é obrigatório.'),
  description: yup
    .string()
    .min(3, 'Insira no mínimo 3 caracteres.')
    .required('Descrição da fila é obrigatório.'),
  averageWaitTimeInMinutes: yup
    .number()
    .positive()
    .min(1, 'Insira no mínimo 1 minuto(s)')
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value,
    )
    .required('Tempo médio em minutos é obrigatório.'),
  maxParticipants: yup
    .number()
    .positive()
    .min(4, 'Insira no mínimo 4')
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value,
    )
    .required('Quantidade total de participantes é obrigatório.'),
});

type EditQueueSchema = yup.InferType<typeof editQueueSchema>;

export function SettingsModal({ queue }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteQueuePopover, setOpenDeleteQueuePopover] = useState(false);
  const [editQueue, setEditQueue] = useState(false);
  const { refresh } = useRouter();

  const modalRows: ModalRow[] = [
    {
      name: 'title',
      placeholder: 'Título',
      value: queue.title,
    },
    {
      name: 'description',
      placeholder: 'Descrição',
      value: queue.description,
    },
    {
      name: 'averageWaitTimeInMinutes',
      placeholder: 'Est. tempo/pessoa',
      value: queue.averageWaitTimeInMinutes,
    },
    {
      name: 'maxParticipants',
      placeholder: 'Max. pessoas',
      value: queue.maxParticipants,
    },
  ];

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<EditQueueSchema>({
    resolver: yupResolver(editQueueSchema),
  });

  const handleOpenModal = (value: boolean) => {
    if (value === false) setEditQueue(false);
    setOpenModal(value);
  };

  const handleOpenDeleteQueuePopover = (value: boolean) => {
    setOpenDeleteQueuePopover(value);
  };

  const handleEditQueue = (value: boolean) => {
    setEditQueue(value);
  };

  const handleDeleteQueue = async () => {
    try {
      await api.delete(`/queue/${queue.id}`);
      toast.success(`Fila "${queue.title}" deletada com sucesso!`);
      handleOpenModal(false);
      handleOpenDeleteQueuePopover(false);
      refresh();
    } catch (error) {
      toast.error(axiosErrorMessageHandler(error as Error));
    }
  };

  const onSubmit = async ({
    title,
    description,
    averageWaitTimeInMinutes,
    maxParticipants,
  }: EditQueueSchema) => {
    try {
      // await api.post('/queue', {
      //   title,
      //   description,
      //   averageWaitTimeInMinutes,
      //   maxParticipants,
      // });
      console.log({
        title,
        description,
        averageWaitTimeInMinutes,
        maxParticipants,
      });

      toast.success(`Fila "${title}" editada com sucesso!`);
      handleEditQueue(false);
    } catch (error) {
      toast.error(axiosErrorMessageHandler(error as Error));
    }
  };

  function ModalBody() {
    if (editQueue) {
      return (
        <form
          id="queue-edit-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {modalRows.map((row) => {
            return (
              <div
                key={row.name}
                className="flex flex-col sm:flex-row sm:items-center justify-between w-full"
              >
                <p className="text-foreground">{row.placeholder}</p>
                <Controller
                  name={row.name}
                  defaultValue={row.value}
                  control={control}
                  render={({ field }) => {
                    const input =
                      row.name === 'description' ? (
                        <Textarea
                          className="max-w-[236px] w-full"
                          placeholder={row.placeholder}
                          required
                          error={!!errors[row.name]}
                          helperText={errors[row.name]?.message}
                          {...field}
                        />
                      ) : (
                        <Input
                          className="max-w-[236px] w-full"
                          placeholder={row.placeholder}
                          required
                          error={!!errors[row.name]}
                          helperText={errors[row.name]?.message}
                          {...field}
                        />
                      );
                    return input;
                  }}
                />
              </div>
            );
          })}
        </form>
      );
    }

    return (
      <div className="space-y-4">
        {modalRows.map((row) => {
          let value = row.value;

          if (Object.keys(getValues()).length > 0) {
            value = getValues()[row.name];
          }

          if (row.name === 'averageWaitTimeInMinutes') {
            value = `${value} minutos`;
          }

          if (row.name === 'maxParticipants') {
            value = `${value} pessoas`;
          }

          return (
            <div
              key={row.name}
              className="flex flex-col sm:flex-row sm:items-center justify-between sm:gap-20 w-full"
            >
              <p className="text-foreground">{row.placeholder}</p>
              <p className="max-w-[200px] break-words leading-5">{value}</p>
            </div>
          );
        })}
      </div>
    );
  }

  function ModalFooter() {
    if (editQueue) {
      return (
        <div className="flex items-center justify-between gap-8 mt-4">
          <Button
            onClick={() => handleEditQueue(false)}
            className="w-full rounded-3xl"
            colorVariant="destructive"
            variant="outline"
            disabled={isSubmitting}
          >
            Cancelar edição
          </Button>
          <Button
            type="submit"
            form="queue-edit-form"
            className="w-full rounded-3xl"
            variant="outline"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Confirmar edição
          </Button>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-between gap-8 mt-4">
        <Popover
          open={openDeleteQueuePopover}
          onOpenChange={handleOpenDeleteQueuePopover}
        >
          <PopoverTrigger className="w-full ">
            <Button
              className="w-full rounded-3xl"
              colorVariant="destructive"
              variant="outline"
            >
              Apagar fila
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            Tem certeza de que deseja apagar a fila?
            <div className="flex flex-col gap-2 mt-4">
              <Button
                onClick={() => handleOpenDeleteQueuePopover(false)}
                className="w-full rounded-3xl"
                colorVariant="destructive"
                variant="outline"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleDeleteQueue}
                className="w-full rounded-3xl"
                variant="outline"
              >
                Confirmar
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <Button
          onClick={() => handleEditQueue(true)}
          className="w-full rounded-3xl"
          variant="outline"
        >
          Editar informações
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={openModal} onOpenChange={handleOpenModal}>
      <DialogTrigger className="absolute right-1 top-1">
        <Button colorVariant="ghost" className="hover:bg-transparent">
          <Settings className="text-muted" />
        </Button>
      </DialogTrigger>

      <DialogContent className="p-8">
        <DialogHeader className="mb-2">
          <DialogTitle className="font-light text-2xl">Informações</DialogTitle>
        </DialogHeader>
        <ModalBody />
        <ModalFooter />
      </DialogContent>
    </Dialog>
  );
}
