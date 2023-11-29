'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { axiosErrorMessageHandler } from '@/lib/utils';
import { toast } from 'react-hot-toast';
import api from '@/services/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

const yupSchema = yup.object({
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
    .min(1, 'Insira no mínimo 1 minuto')
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value,
    )
    .required('Tempo médio em minutos é obrigatório.'),
  maxParticipants: yup
    .number()
    .positive()
    .min(1, 'Insira no mínimo 1')
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value,
    )
    .required('Quantidade total de participantes é obrigatório.'),
});

type YupSchemaType = yup.InferType<typeof yupSchema>;

export default function CreateQueue() {
  const { push } = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<YupSchemaType>({
    resolver: yupResolver(yupSchema),
  });

  const onSubmit = async ({
    title,
    description,
    averageWaitTimeInMinutes,
    maxParticipants,
  }: YupSchemaType) => {
    try {
      await api.post('/queue', {
        title,
        description,
        averageWaitTimeInMinutes,
        maxParticipants,
      });

      toast.success(`Fila "${title}" criada com sucesso!`);

      push('/queues');
    } catch (error) {
      toast.error(axiosErrorMessageHandler(error as Error));
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full p-4 flex flex-col gap-6 justify-center items-center">
        <div className="mb-5">
          <h1 className="text-5xl font-light">QFILA</h1>
          <h2 className="text-lg font-light text-muted w-max ml-auto leading-6">
            Cadastro de fila
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-3"
        >
          <Controller
            name="title"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                placeholder="Título"
                required
                error={!!errors.title}
                helperText={errors.title?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="description"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Textarea
                placeholder="Descrição"
                required
                error={!!errors.description}
                helperText={errors.description?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="averageWaitTimeInMinutes"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Ex: 7"
                type="number"
                required
                error={!!errors.averageWaitTimeInMinutes}
                helperText={
                  errors.averageWaitTimeInMinutes
                    ? errors.averageWaitTimeInMinutes?.message
                    : '*Tempo médio de espera (minutos)'
                }
                {...field}
              />
            )}
          />
          <Controller
            name="maxParticipants"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Ex: 8"
                required
                error={!!errors.maxParticipants}
                helperText={
                  errors.maxParticipants
                    ? errors.maxParticipants?.message
                    : '*Quantidade máxima de participantes'
                }
                {...field}
              />
            )}
          />
          <Button
            loading={isSubmitting}
            disabled={isSubmitting}
            className="w-full"
          >
            Criar fila
          </Button>
        </form>
      </div>
    </div>
  );
}
