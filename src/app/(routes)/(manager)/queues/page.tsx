import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import api from '@/services/api';

const MOCK_QUEUES = [
  {
    id: 1,
    title: 'TITULO DA FILA',
    description: 'DESCRIÇAO DA FILA',
    averageWaitTimeInMinutes: 2,
    maxParticipants: 8,
  },
  {
    id: 1,
    title: 'TITULO DA FILA',
    description: 'DESCRIÇAO DA FILA',
    averageWaitTimeInMinutes: 2,
    maxParticipants: 8,
  },
  {
    id: 1,
    title: 'TITULO DA FILA',
    description: 'DESCRIÇAO DA FILA',
    averageWaitTimeInMinutes: 2,
    maxParticipants: 8,
  },
];

export default async function Queues() {
  // const queues = await api.get('/queues');

  return (
    <div className="w-full h-screen flex justify-center items-center p-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_QUEUES.map(
          ({
            id,
            title,
            description,
            averageWaitTimeInMinutes,
            maxParticipants,
          }) => (
            <Card key={id} className="w-full max-w-[350px]">
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent>CONTENT</CardContent>
              <CardFooter className="flex items-start flex-col gap-2">
                <p className="text-muted text-sm">
                  Média do tempo de espera: {averageWaitTimeInMinutes} minutos
                </p>
                <p className="text-muted text-sm">
                  Quantitate máxima de participantes: {maxParticipants}
                </p>
              </CardFooter>
            </Card>
          ),
        )}
      </div>
    </div>
  );
}
