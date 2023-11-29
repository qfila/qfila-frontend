'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { axiosErrorMessageHandler } from '@/lib/utils';
import { toast } from 'react-hot-toast';
import api from '@/services/api';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

const yupSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Insira no mínimo 3 caracteres.')
    .max(50, 'Insira no máximo 50 caracteres.')
    .matches(
      /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/,
      'Insira apenas letras.',
    )
    .matches(/^\S.*\S$/, 'Insira um nome válido.')
    .required('Nome é obrigatório.'),
  email: yup.string().email('Email inválido').required('Email é obrigatório.'),
  password: yup
    .string()
    .matches(/(?:[a-zA-Z].*){6,}/, 'Insira no mínimo 6 letras.')
    .matches(/.*[A-Z].*/, 'Insira no mínimo 1 letra maiúscula.')
    .matches(/.*[a-z].*/, 'Insira no mínimo 1 letra minúscula.')
    .matches(/.*[0-9].*/, 'Insira no mínimo 1 número.')
    .matches(
      /.*[!@#$%^&*()_+{}[\]/:;<>,.?~\\-].*/,
      'Insira pelo menos um dos seguintes símbolos: !@#$%^&*()_+{}[]/:;<>,.?~\\-',
    )
    .required('Senha é obrigatório.'),
  confirm_password: yup
    .string()
    .required('Confirmação de senha é obrigatória.')
    .oneOf([yup.ref('password')], 'As senhas digitadas não coincidem.'),
});

type YupSchemaType = yup.InferType<typeof yupSchema>;

export default function SignUp() {
  const [isManager, setIsManager] = useState(false);

  const { push } = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<YupSchemaType>({
    resolver: yupResolver(yupSchema),
  });

  const toggleIsManager = () => {
    setIsManager((prev) => !prev);
  };

  const onSubmit = async ({ name, email, password }: YupSchemaType) => {
    try {
      await api.post('/user', {
        username: name,
        email,
        password,
        role: isManager ? 'MANAGER' : 'USER',
      });

      toast.success('Cadastro realizado com sucesso!');
      push('/sign-in');
    } catch (error) {
      toast.error(axiosErrorMessageHandler(error as Error));
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full p-4 max-w-xs flex flex-col gap-6 justify-center items-center">
        <div className="mb-5">
          <h1 className="text-5xl font-light">QFILA</h1>
          <h2 className="text-2xl font-light text-muted w-max ml-auto leading-6">
            Cadastro
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
          <Controller
            name="name"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                placeholder="Nome completo"
                required
                error={!!errors.name}
                helperText={errors.name?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="email"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Input
                placeholder="E-mail"
                type="email"
                required
                error={!!errors.email}
                helperText={errors.email?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Senha"
                type="password"
                required
                error={!!errors.password}
                helperText={errors.password?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="confirm_password"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Confirmar senha"
                type="password"
                required
                error={!!errors.confirm_password}
                helperText={errors.confirm_password?.message}
                {...field}
              />
            )}
          />
          <input
            type="checkbox"
            onClick={toggleIsManager}
            checked={isManager}
            id="role"
            title="teste"
            className="m-2"
          />
          <label htmlFor="role">Sou empresa</label>
          <Button
            loading={isSubmitting}
            disabled={isSubmitting}
            className="w-full"
          >
            Cadastrar
          </Button>
        </form>

        <Separator />

        <div className="text-black text-sm">
          Já tem conta?{' '}
          <Link href={'/sign-in'} className="underline text-primary">
            login
          </Link>
        </div>
      </div>
    </div>
  );
}
