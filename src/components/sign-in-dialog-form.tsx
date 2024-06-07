'use client';

import SignInForm from '@/app/(routes)/(user)/sign-in/partials/form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { axiosErrorMessageHandler } from '@/lib/utils';
import api from '@/services/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface PropsWithQueueCode {
  redirectAfterLogin?: boolean;
  queueCode: string;
  joinQueueAfterLogin: true;
}

interface Props {
  redirectAfterLogin?: boolean;
  queueCode?: string;
  joinQueueAfterLogin?: false;
}

type SignInDialogFormProps = Props | PropsWithQueueCode;

export default function SignInDialogForm({
  redirectAfterLogin,
  joinQueueAfterLogin,
  queueCode,
}: SignInDialogFormProps) {
  const router = useRouter();

  async function joinQueue(accessToken: string) {
    try {
      await api.post(
        `/queue/${queueCode}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      router.refresh();
    } catch (error) {
      toast.error(axiosErrorMessageHandler(error as Error));
    }
  }

  return (
    <Dialog open>
      <DialogContent hideCloseButton className="p-8">
        <DialogHeader className="mb-2">
          <DialogTitle className="font-light text-2xl">
            Faça o login para continuar
          </DialogTitle>
        </DialogHeader>
        <SignInForm
          redirectAfterLogin={redirectAfterLogin}
          onSuccess={joinQueueAfterLogin ? joinQueue : () => {}}
        />
      </DialogContent>
    </Dialog>
  );
}
