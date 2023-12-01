import { LogoutButton } from '@/components/logout-button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getLoggedUser } from '@/lib/actions';
import Link from 'next/link';
import SignInForm from './sign-in/partials/form';
import { JoinQueueForm } from './partials/join-queue-form';

export default async function Home() {
  const loggedUser = await getLoggedUser();

  if (!loggedUser) {
    return (
      <Dialog open>
        <DialogContent hideCloseButton className="p-8">
          <DialogHeader className="mb-2">
            <DialogTitle className="font-light text-2xl">
              Faça o login para continuar
            </DialogTitle>
          </DialogHeader>
          <SignInForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="w-full p-4 max-w-xs flex flex-col gap-4 justify-center items-center">
      {loggedUser && (
        <LogoutButton className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 text-primary" />
      )}

      {loggedUser && (
        <div className="mb-4">
          <span className="text-xl font-medium">Bem-vindo</span>
          <br />
          {loggedUser.username}
        </div>
      )}

      <JoinQueueForm />

      {!loggedUser && (
        <div className="text-black text-sm">
          Ainda não tem conta?{' '}
          <Link href={'/sign-up'} className="underline text-primary">
            registre-se
          </Link>
        </div>
      )}
    </div>
  );
}
