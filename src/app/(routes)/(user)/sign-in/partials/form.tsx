'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import api from '@/services/api';
import { setAccessTokenCookie } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { axiosErrorMessageHandler } from '@/lib/utils';
import toast from 'react-hot-toast';

const yupSchema = yup.object({
  email: yup.string().email('Email inválido').required('Email é obrigatório.'),
  password: yup.string().required('Senha é obrigatório.'),
});

type YupSchemaType = yup.InferType<typeof yupSchema>;

export default function SignInForm() {
  const { push } = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<YupSchemaType>({
    resolver: yupResolver(yupSchema),
  });

  const onSubmit = async ({ email, password }: YupSchemaType) => {
    try {
      const { data } = await api.post('/auth/login', {
        email,
        password,
      });

      setAccessTokenCookie(data?.accessToken);

      const isManager = data.role === 'MANAGER';

      if (isManager) return push('/queues');
      else push('/');
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
            Login
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          <Controller
            name="email"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Input
                placeholder="email@exemplo.com"
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
                placeholder="******"
                type="password"
                required
                error={!!errors.password}
                helperText={errors.password?.message}
                {...field}
              />
            )}
          />
          <Button
            loading={isSubmitting}
            disabled={isSubmitting}
            className="w-full"
          >
            Entrar
          </Button>
        </form>

        <Separator />

        <div className="text-black text-sm">
          Ainda não tem conta?{' '}
          <Link href={'/sign-up'} className="underline text-primary">
            registre-se
          </Link>
        </div>
      </div>
    </div>
  );
}
