import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wrench, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const upcomingInspections = [
  {
    id: '1',
    system: 'Radar sustav A1',
    date: '2024-12-02',
    type: 'bi-monthly',
    status: 'scheduled',
    requiredCert: 'SG2',
  },
  {
    id: '2',
    system: 'Komunikacijski sustav B3',
    date: '2024-12-05',
    type: 'monthly',
    status: 'scheduled',
    requiredCert: 'KS1',
  },
  {
    id: '3',
    system: 'Navigacijski sustav N2',
    date: '2024-12-10',
    type: 'semi-annual',
    status: 'scheduled',
    requiredCert: 'NS2',
  },
];

const statusConfig = {
  scheduled: {
    label: 'Zakazano',
    icon: CheckCircle2,
    className: 'bg-info/10 text-info border-info/20',
  },
  overdue: {
    label: 'Kasni',
    icon: AlertCircle,
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
  completed: {
    label: 'Završeno',
    icon: CheckCircle2,
    className: 'bg-success/10 text-success border-success/20',
  },
};

export function UpcomingInspections() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Wrench className="h-4 w-4 text-primary" />
          Nadolazeći pregledi
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {upcomingInspections.map((inspection) => {
          const status = statusConfig[inspection.status as keyof typeof statusConfig];
          const StatusIcon = status.icon;
          const date = new Date(inspection.date).toLocaleDateString('hr-HR', {
            day: 'numeric',
            month: 'short',
          });

          return (
            <div
              key={inspection.id}
              className="rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-foreground">{inspection.system}</p>
                  <p className="text-xs text-muted-foreground">{date}</p>
                </div>
                <Badge variant="outline" className={cn('text-xs', status.className)}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {status.label}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {inspection.requiredCert}
                </Badge>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
