'use client';

import { logOut } from '@/lib/actions';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const handleLogOut = () => {
    logOut();
  };

  return (
    <Button
      colorVariant={'ghost'}
      className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 text-primary"
      onClick={handleLogOut}
    >
      <LogOut />
      Sair
    </Button>
  );
}
