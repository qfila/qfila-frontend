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
import { FilePlus2, Home, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import { SideBarNavLink } from './nav-link';

interface Props {
  loggedUser: User;
}

export function ManagerSideBar({ loggedUser }: Props) {
  const [openOnMobile, setOpenOnMobile] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const handleShowSideBar = (value: boolean) => setOpenOnMobile(value);
  const closeSidebar = () => setOpenOnMobile(false);

  const handleLogOut = () => {
    logOut();
  };

  const showSideBar = isDesktop ? true : openOnMobile;
  const showOverlay = isDesktop ? false : openOnMobile;

  return (
    <Sheet
      open={showSideBar}
      onOpenChange={handleShowSideBar}
      modal={showOverlay}
    >
      {!isDesktop && (
        <header className="sticky top-0 z-10 bg-white shadow-sm mb-4 flex items-center py-2">
          <SheetTrigger className="p-3" onClick={() => handleShowSideBar(true)}>
            <Menu className="text-gray-700" />
          </SheetTrigger>
          <h1 className="text-lg text-center text-gray-700 font-medium ml-4 truncate">
            {loggedUser?.username}
          </h1>
        </header>
      )}

      <SheetContent
        onInteractOutside={() => handleShowSideBar(false)}
        disableOverlay={!showOverlay}
        className="w-[300px]"
        side={'left'}
      >
        <SheetHeader className="items-center space-y-0">
          <SheetTitle className="font-light text-5xl">QFILA</SheetTitle>
          <h3 className="text-2xl font-light text-muted leading-6">Gerentes</h3>
        </SheetHeader>
        <div className="flex flex-col justify-between h-[calc(100%-160px)] mt-16">
          <div />
          <div className="flex flex-col gap-4">
            <SideBarNavLink
              title="Ínicio"
              icon={<Home />}
              href="/queues"
              onClick={closeSidebar}
            />
            <SideBarNavLink
              title="Criar nova fila"
              icon={<FilePlus2 />}
              onClick={closeSidebar}
              className="text-primary"
              href="/create-queue"
            />
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
              id="leave"
            >
              <LogOut />
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
