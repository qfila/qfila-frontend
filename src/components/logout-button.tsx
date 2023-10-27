'use client';

import { logOut } from '@/lib/actions';
import { Button, ButtonProps } from './ui/button';
import { LogOut } from 'lucide-react';

export function LogoutButton({
  colorVariant = 'ghost',
  ...props
}: ButtonProps) {
  const handleLogOut = () => {
    logOut();
  };

  return (
    <Button colorVariant={colorVariant} {...props} onClick={handleLogOut}>
      <LogOut />
      Sair
    </Button>
  );
}
