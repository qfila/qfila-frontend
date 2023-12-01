import { getLoggedUser } from '@/lib/actions';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loggedUser = await getLoggedUser();
  if (loggedUser?.role === 'MANAGER') notFound();

  return (
    <div className="h-screen flex">
      <div className="h-full hidden lg:block  w-[1024px] relative">
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
      <div className="relative w-full flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}
