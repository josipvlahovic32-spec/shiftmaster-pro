import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShiftBadge } from '@/components/dashboard/ShiftBadge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  ChevronLeft, 
  ChevronRight, 
  CalendarPlus,
  Download,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ShiftType } from '@/types/schedule';

// Mock data for the monthly schedule
const employees = [
  { id: '1', name: 'Ivan Horvat', initials: 'IH' },
  { id: '2', name: 'Ana Kovač', initials: 'AK' },
  { id: '3', name: 'Marko Babić', initials: 'MB' },
  { id: '4', name: 'Petra Jurić', initials: 'PJ' },
  { id: '5', name: 'Luka Novak', initials: 'LN' },
];

// Generate mock schedule data
const generateSchedule = () => {
  const schedule: Record<string, Record<number, ShiftType | null>> = {};
  
  employees.forEach((emp) => {
    schedule[emp.id] = {};
    for (let day = 1; day <= 30; day++) {
      const rand = Math.random();
      if (rand < 0.3) {
        schedule[emp.id][day] = 'day';
      } else if (rand < 0.4) {
        schedule[emp.id][day] = 'night';
      } else if (rand < 0.5) {
        schedule[emp.id][day] = 'morning';
      } else {
        schedule[emp.id][day] = null;
      }
    }
  });
  
  return schedule;
};

const mockSchedule = generateSchedule();
const daysInMonth = 30;
const weekDays = ['P', 'U', 'S', 'Č', 'P', 'S', 'N'];

export default function Schedule() {
  const [currentMonth] = useState(new Date(2024, 10)); // November 2024
  
  const monthName = currentMonth.toLocaleDateString('hr-HR', { 
    month: 'long', 
    year: 'numeric' 
  });

  // Get starting day of week (0 = Sunday, adjust for Monday start)
  const startingDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const adjustedStartingDay = startingDay === 0 ? 6 : startingDay - 1;

  return (
    <AppLayout 
      title="Raspored smjena" 
      subtitle="Mjesečni pregled i upravljanje rasporedom"
    >
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-semibold capitalize min-w-[180px] text-center">
              {monthName}
            </h2>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filteri
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Izvoz
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <CalendarPlus className="h-4 w-4 mr-2" />
              Generiraj raspored
            </Button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <ShiftBadge type="day" size="sm" />
            <span className="text-muted-foreground">07:30 - 19:30</span>
          </div>
          <div className="flex items-center gap-2">
            <ShiftBadge type="night" size="sm" />
            <span className="text-muted-foreground">19:30 - 07:30</span>
          </div>
          <div className="flex items-center gap-2">
            <ShiftBadge type="morning" size="sm" />
            <span className="text-muted-foreground">07:30 - 15:30</span>
          </div>
        </div>

        {/* Schedule Grid */}
        <Card className="border-border bg-card overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="sticky left-0 z-10 bg-card px-4 py-3 text-left text-sm font-semibold text-foreground min-w-[180px]">
                      Djelatnik
                    </th>
                    {Array.from({ length: daysInMonth }, (_, i) => {
                      const dayOfWeek = (adjustedStartingDay + i) % 7;
                      const isWeekend = dayOfWeek >= 5;
                      
                      return (
                        <th 
                          key={i} 
                          className={cn(
                            'px-1 py-2 text-center min-w-[44px]',
                            isWeekend && 'bg-warning/5'
                          )}
                        >
                          <div className={cn(
                            'text-xs font-medium',
                            isWeekend ? 'text-warning' : 'text-muted-foreground'
                          )}>
                            {weekDays[dayOfWeek]}
                          </div>
                          <div className={cn(
                            'text-sm font-semibold',
                            isWeekend ? 'text-warning' : 'text-foreground'
                          )}>
                            {i + 1}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="sticky left-0 z-10 bg-card px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {employee.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-foreground whitespace-nowrap">
                            {employee.name}
                          </span>
                        </div>
                      </td>
                      {Array.from({ length: daysInMonth }, (_, i) => {
                        const day = i + 1;
                        const shift = mockSchedule[employee.id][day];
                        const dayOfWeek = (adjustedStartingDay + i) % 7;
                        const isWeekend = dayOfWeek >= 5;
                        
                        return (
                          <td 
                            key={day} 
                            className={cn(
                              'px-1 py-2 text-center',
                              isWeekend && 'bg-warning/5'
                            )}
                          >
                            {shift ? (
                              <ShiftBadge type={shift} showLabel={false} size="sm" />
                            ) : (
                              <span className="text-xs text-muted-foreground">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Ukupno smjena</p>
            <p className="text-2xl font-bold text-foreground">142</p>
          </Card>
          <Card className="border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Dnevnih smjena</p>
            <p className="text-2xl font-bold text-day-shift">86</p>
          </Card>
          <Card className="border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Noćnih smjena</p>
            <p className="text-2xl font-bold text-night-shift">30</p>
          </Card>
          <Card className="border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Jutarnjih smjena</p>
            <p className="text-2xl font-bold text-morning-shift">26</p>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
