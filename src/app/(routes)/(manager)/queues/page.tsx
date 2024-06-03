import { QueueList } from './partials/queue-list';
import { getLoggedUser } from '@/lib/actions';

export default async function Queues() {
  const loggedUser = await getLoggedUser();

  return (
    <div className="w-full p-3 md:p-6">
      <h1 className="text-2xl text-center font-medium my-9">
        {loggedUser?.username}
      </h1>
      <QueueList />
    </div>
  );
}
