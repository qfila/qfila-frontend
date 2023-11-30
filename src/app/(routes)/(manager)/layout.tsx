import { getLoggedUser } from '@/lib/actions';
import { notFound } from 'next/navigation';
import { ManagerSideBar } from './partials/manager-side-bar';

export default async function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loggedUser = await getLoggedUser();
  if (loggedUser?.role === 'USER' || !loggedUser) notFound();

  return (
    <>
      <ManagerSideBar loggedUser={loggedUser} />
      <main className="md:ml-[344px]">{children}</main>
    </>
  );
}
