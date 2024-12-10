import { User } from 'lucide-react';

interface UserStats {
  id: string;
  name: string;
  tokens: number;
  requests: number;
  averageResponseTime: number;
}

export default function UserUsage() {
  const users: UserStats[] = [
    {
      id: '1',
      name: 'John Doe',
      tokens: 35000,
      requests: 450,
      averageResponseTime: 2.3
    },
    {
      id: '2',
      name: 'Jane Smith',
      tokens: 42000,
      requests: 380,
      averageResponseTime: 1.8
    },
    {
      id: '3',
      name: 'Mike Johnson',
      tokens: 28000,
      requests: 320,
      averageResponseTime: 2.1
    }
  ];

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <User className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">{user.name}</h3>
              <p className="text-xs text-gray-500">{user.requests} requests</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{(user.tokens / 1000).toFixed(1)}k tokens</p>
            <p className="text-xs text-gray-500">{user.averageResponseTime}s avg. response</p>
          </div>
        </div>
      ))}
    </div>
  );
}
