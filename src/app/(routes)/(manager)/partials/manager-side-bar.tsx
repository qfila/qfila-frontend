'use client';

import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet,
} from '@/components/ui/sheet';
import { logOut } from '@/lib/actions';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { User } from '@/types';
import {
  Crown,
  FilePlus2,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  loggedUser: User;
}

export function ManagerSideBar({ loggedUser }: Props) {
  const [openOnMobile, setOpenOnMobile] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const handleOpenSideBar = () => {
    setOpenOnMobile(true);
  };

  const handleCloseSideBar = () => {
    setOpenOnMobile(false);
  };

  const handleLogOut = () => {
    logOut();
  };

  const showSideBar = isDesktop ? true : openOnMobile;
  const showOverlay = isDesktop ? false : openOnMobile;

  return (
    <Sheet open={showSideBar} modal={showOverlay}>
      {!isDesktop && (
        <SheetTrigger className="p-3" onClick={handleOpenSideBar}>
          <Menu />
        </SheetTrigger>
      )}

      <SheetContent
        onInteractOutside={handleCloseSideBar}
        disableOverlay={!showOverlay}
        className="w-[300px]"
        side={'left'}
      >
        <SheetHeader className="items-center space-y-0">
          <SheetTitle className="font-light text-5xl">QFILA</SheetTitle>
          <h3 className="text-2xl font-light text-muted leading-6">Gerentes</h3>
        </SheetHeader>
        <div className="flex flex-col justify-between h-[calc(100%-160px)] mt-16">
          <div className="flex gap-4">
            <Crown fill="#000" />
            <div>
              Plano Business II
              <p className="text-secondary text-sm underline">
                Fazer upgrade de plano
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-max">
            <Link href={'/queues'}>
              <button className="flex gap-4 hover:bg-gray-200/70 p-2 rounded-xl w-full">
                <Home />
                <span>Ínicio</span>
              </button>
            </Link>
            <Link href={'/create-queue'}>
              <button className="text-primary flex gap-4 hover:bg-gray-200/70 p-2 rounded-xl w-full">
                <FilePlus2 />
                <span>Criar nova fila</span>
              </button>
            </Link>
            <button className="flex gap-4 hover:bg-gray-200/70 p-2 rounded-xl w-full">
              <HelpCircle />
              <span>Ajuda</span>
            </button>
            <button className="flex gap-4 hover:bg-gray-200/70 p-2 rounded-xl w-full">
              <Settings />
              <span>Configurações</span>
            </button>
          </div>
          <div className="flex justify-between items-center gap-4">
            <div>
              <span>{loggedUser?.username}</span>
              <p className="text-muted text-sm leading-4">
                {loggedUser?.email}
              </p>
            </div>
            <button
              onClick={handleLogOut}
              className="rounded-full hover:bg-gray-200/70 p-2"
            >
              <LogOut />
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
