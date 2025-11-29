import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShiftBadge } from './ShiftBadge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CalendarDays } from 'lucide-react';

// Mock data for today's schedule
const todaySchedule = [
  {
    id: '1',
    employee: { firstName: 'Ivan', lastName: 'Horvat' },
    shift: 'day' as const,
  },
  {
    id: '2',
    employee: { firstName: 'Ana', lastName: 'Kovač' },
    shift: 'day' as const,
  },
  {
    id: '3',
    employee: { firstName: 'Marko', lastName: 'Babić' },
    shift: 'night' as const,
  },
];

export function TodaySchedule() {
  const today = new Date().toLocaleDateString('hr-HR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            Današnji raspored
          </CardTitle>
          <span className="text-xs text-muted-foreground capitalize">{today}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {todaySchedule.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {item.employee.firstName[0]}{item.employee.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {item.employee.firstName} {item.employee.lastName}
                </p>
              </div>
            </div>
            <ShiftBadge type={item.shift} size="sm" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
