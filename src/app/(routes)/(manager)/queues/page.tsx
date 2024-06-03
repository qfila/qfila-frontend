import { QueueList } from './partials/queue-list';
import { getLoggedUser } from '@/lib/actions';
import { Title } from './partials/title';

export default async function Queues() {
  const loggedUser = await getLoggedUser();

  return (
    <div className="w-full p-3 md:p-6">
      <Title username={loggedUser?.username} />
      <QueueList />
    </div>
  );
}
