import { TimeRemaining } from '@/components/time-remaining';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Sheet
} from '@/components/ui/sheet';

export default function Home() {
  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="flex gap-4 p-3 border">
        <div className="flex flex-col gap-3">
          <h2>Botoes</h2>
          <Button className="w-max">Primary</Button>
          <Button colorVariant={'secondary'} className="w-max">
            secondary
          </Button>
          <Button colorVariant={'destructive'} className="w-max">
            Destructive
          </Button>
          <Button colorVariant={'ghost'} className="w-max">
            ghost
          </Button>
          <Button colorVariant={'link'} className="w-max">
            link
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          <h2>Botoes, Variant = Outline</h2>
          <Button variant={'outline'} className="w-max">
            Outline Primary
          </Button>
          <Button variant={'outline'} colorVariant={'secondary'} className="w-max">
            Outline secondary
          </Button>
          <Button variant={'outline'} colorVariant={'destructive'} className="w-max">
            Outline Destructive
          </Button>
        </div>
      </div>
      <div className="p-3 border">
        <h2>Input</h2>
        <Input className="w-max" placeholder="Teste" />
      </div>
      <div className="w-max flex flex-col gap-3 p-3 border">
        <h2>Modal</h2>
        <Dialog>
          <DialogTrigger>
            <Button className="w-max">Abrir modal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account and remove
                your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-max flex flex-col gap-3 p-3 border">
        <h2>Card</h2>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input id="name" placeholder="Name of your project" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="w-max flex flex-col gap-3 p-3 border">
        <h2>Separator</h2>
        <Separator />
      </div>
      <div className="w-max flex flex-col gap-3 p-3 border">
        <h2>Sheet</h2>
        <Sheet>
          <SheetTrigger>
            <Button>Abrir menu lateral direito</Button>
          </SheetTrigger>
          <SheetContent side={'right'}>
            <SheetHeader>
              <SheetTitle>Are you sure absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your account and remove
                your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger>
            <Button>Abrir menu em baixo</Button>
          </SheetTrigger>
          <SheetContent side={'bottom'}>
            <SheetHeader>
              <SheetTitle>Are you sure absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your account and remove
                your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="w-max flex flex-col gap-3 p-3 border">
        Time Remaining
        <TimeRemaining />
      </div>
    </div>
  );
}
