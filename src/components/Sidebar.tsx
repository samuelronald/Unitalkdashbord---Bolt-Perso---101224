import { LayoutDashboard, Users, Building2, Cpu, Settings, Shield, DollarSign, Calculator, BarChart2, FileText, TrendingUp } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Users', icon: Users, path: '/users' },
  { name: 'Organizations', icon: Building2, path: '/organizations' },
  { name: 'LLM Services', icon: Cpu, path: '/services' },
  { name: 'Cost Simulator', icon: Calculator, path: '/cost-simulator' },
  { name: 'ROI Analysis', icon: TrendingUp, path: '/roi' },
  { name: 'Compare LLMs', icon: BarChart2, path: '/compare' },
  { name: 'Quota Templates', icon: FileText, path: '/quota-templates' },
  { name: 'Administrators', icon: Shield, path: '/admins' },
  { name: 'Accounting', icon: DollarSign, path: '/accounting' },
  { name: 'Settings', icon: Settings, path: '/settings' }
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex flex-col w-64 bg-gray-900 text-white">
      <div className="p-4">
        <h1 className="text-xl font-bold">LLM Quota Admin</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg
                transition-colors duration-200
                ${isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
              `}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
