'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import api from '@/services/api';
import { AxiosError } from 'axios';
import { setAccessTokenCookie } from '@/lib/actions';
import { useRouter } from 'next/navigation';

const yupSchema = yup.object({
  email: yup.string().email('Email inválido').required('Email é obrigatório.'),
  password: yup.string().required('Senha é obrigatório.'),
});

type YupSchemaType = yup.InferType<typeof yupSchema>;

export default function SignIn() {
  const { push } = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
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
      push('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    }
  };

  return (
    <div className="h-screen flex">
      <div className="h-full hidden lg:block w-[1024px] relative">
        <Image
          alt="Imagem de fundo"
          src={'/background-image.png'}
          style={{ width: '100%', height: '100%' }}
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className="absolute top-1/4 px-28 xl:px-32 text-3xl xl:text-4xl leading-normal text-white font-light">
          O tempo é o bem mais precioso. Cabe a nós usá-lo da melhor forma.
        </div>
      </div>
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
            <Button className="w-full">Enviar</Button>
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
    </div>
  );
}
