import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  ClipboardList,
  Wrench,
  BarChart3,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Nadzorna ploča', href: '/', icon: LayoutDashboard },
  { name: 'Raspored', href: '/schedule', icon: Calendar },
  { name: 'Djelatnici', href: '/employees', icon: Users },
  { name: 'Pregledi', href: '/inspections', icon: ClipboardList },
  { name: 'Sustavi', href: '/systems', icon: Wrench },
  { name: 'Radni sati', href: '/hours', icon: Clock },
  { name: 'Izvještaji', href: '/reports', icon: BarChart3 },
  { name: 'Postavke', href: '/settings', icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 px-6 border-b border-sidebar-border">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
            <Calendar className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">ShiftPlan</h1>
            <p className="text-xs text-muted-foreground">Upravljanje rasporedom</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                )
              }
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <div className="rounded-lg bg-sidebar-accent/50 p-3">
            <p className="text-xs text-muted-foreground">Verzija 1.0.0</p>
            <p className="text-xs text-muted-foreground mt-1">© 2024 ShiftPlan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
