import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShiftBadge } from './ShiftBadge';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShiftType } from '@/types/schedule';

// Mock data for weekly schedule
const weekDays = ['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned'];
const currentWeek = [
  { date: 25, shifts: [{ type: 'day' as ShiftType, count: 2 }, { type: 'night' as ShiftType, count: 1 }] },
  { date: 26, shifts: [{ type: 'day' as ShiftType, count: 2 }, { type: 'night' as ShiftType, count: 1 }] },
  { date: 27, shifts: [{ type: 'day' as ShiftType, count: 2 }, { type: 'night' as ShiftType, count: 1 }] },
  { date: 28, shifts: [{ type: 'day' as ShiftType, count: 2 }, { type: 'night' as ShiftType, count: 1 }] },
  { date: 29, shifts: [{ type: 'day' as ShiftType, count: 2 }, { type: 'night' as ShiftType, count: 1 }] },
  { date: 30, shifts: [{ type: 'day' as ShiftType, count: 1 }, { type: 'night' as ShiftType, count: 1 }], isWeekend: true },
  { date: 1, shifts: [{ type: 'day' as ShiftType, count: 1 }, { type: 'night' as ShiftType, count: 1 }], isWeekend: true },
];

export function WeeklyCalendar() {
  const today = new Date().getDate();

  return (
    <Card className="border-border bg-card col-span-full lg:col-span-2">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Tjedni pregled
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium px-2">Studeni 2024</span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {/* Header */}
          {weekDays.map((day, i) => (
            <div key={day} className={cn(
              'text-center text-xs font-medium py-2',
              currentWeek[i]?.isWeekend ? 'text-warning' : 'text-muted-foreground'
            )}>
              {day}
            </div>
          ))}
          
          {/* Days */}
          {currentWeek.map((day, i) => (
            <div
              key={day.date}
              className={cn(
                'rounded-lg p-2 min-h-[100px] transition-colors',
                day.isWeekend ? 'bg-warning/5 border border-warning/20' : 'bg-muted/50',
                day.date === today && 'ring-2 ring-primary ring-offset-2 ring-offset-background'
              )}
            >
              <div className={cn(
                'text-sm font-semibold mb-2',
                day.date === today ? 'text-primary' : 'text-foreground'
              )}>
                {day.date}
              </div>
              <div className="space-y-1">
                {day.shifts.map((shift) => (
                  <div key={shift.type} className="flex items-center gap-1">
                    <ShiftBadge type={shift.type} showLabel={false} size="sm" />
                    <span className="text-xs text-muted-foreground">×{shift.count}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
