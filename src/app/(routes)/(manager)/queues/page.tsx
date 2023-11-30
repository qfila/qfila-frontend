import api from '@/services/api';
import { Queue } from '@/types';
import { QueueList } from './partials/queue-list';
import { getLoggedUser } from '@/lib/actions';

interface GetQueueResponse {
  queues: Queue[];
}

export default async function Queues() {
  const { data } = await api.get<GetQueueResponse>('/queue');
  const loggedUser = await getLoggedUser();

  return (
    <div className="w-full p-3 md:p-6">
      <h1 className="text-2xl text-center font-medium my-9">
        {loggedUser?.username}
      </h1>
      <QueueList queues={data.queues} />
    </div>
  );
}
