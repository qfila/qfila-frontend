import * as yup from 'yup';

export const yupQueueSchema = yup.object({
  title: yup
    .string()
    .min(3, 'Insira no mínimo 3 caracteres.')
    .required('Nome da fila é obrigatório.'),
  description: yup
    .string()
    .min(10, 'Insira no mínimo 10 caracteres.')
    .max(100, 'Insira no máximo 100 caracteres.')
    .required('Descrição da fila é obrigatório.'),
  averageWaitTimeInMinutes: yup
    .number()
    .positive()
    .min(1, 'Insira no mínimo 1 minuto.')
    .max(120, 'Insira no máximo 120 minutos.')
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value,
    )
    .required('Tempo médio em minutos é obrigatório.'),
  maxParticipants: yup
    .number()
    .positive()
    .min(4, 'Insira no mínimo 4.')
    .max(10, 'Insira no máximo 10.')
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value,
    )
    .required('Quantidade total de participantes é obrigatório.'),
});

export type YupQueueSchemaType = yup.InferType<typeof yupQueueSchema>;
