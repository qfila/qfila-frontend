'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sheet open={true} modal={false}>
        <SheetTrigger>open</SheetTrigger>
        <SheetContent disableOverlay side={'left'}>
          <SheetHeader>
            <SheetTitle>Teste</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <main className="ml-[420px]">{children}</main>
    </>
  );
}
