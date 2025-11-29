import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  UserPlus, 
  CalendarPlus, 
  FileBarChart, 
  Settings2,
  Zap
} from 'lucide-react';

const actions = [
  {
    label: 'Dodaj djelatnika',
    icon: UserPlus,
    href: '/employees/new',
  },
  {
    label: 'Generiraj raspored',
    icon: CalendarPlus,
    href: '/schedule/generate',
    primary: true,
  },
  {
    label: 'Izvještaj',
    icon: FileBarChart,
    href: '/reports',
  },
  {
    label: 'Pravila',
    icon: Settings2,
    href: '/settings/rules',
  },
];

export function QuickActions() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          Brze akcije
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.primary ? 'default' : 'secondary'}
            className={`h-auto py-3 flex flex-col items-center gap-1.5 ${
              action.primary ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : ''
            }`}
          >
            <action.icon className="h-4 w-4" />
            <span className="text-xs font-medium">{action.label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
