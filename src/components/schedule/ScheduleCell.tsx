import { cn } from '@/lib/utils';
import { DayStatus } from '@/types/schedule';

interface ScheduleCellProps {
  status: DayStatus | null;
  isWeekend?: boolean;
  size?: 'sm' | 'md';
}

const statusConfig: Record<DayStatus, { label: string; className: string }> = {
  day: {
    label: 'D',
    className: 'bg-day-shift text-day-shift-foreground',
  },
  night: {
    label: 'N',
    className: 'bg-night-shift text-night-shift-foreground',
  },
  morning: {
    label: 'J',
    className: 'bg-morning-shift text-morning-shift-foreground',
  },
  vacation: {
    label: 'GO',
    className: 'bg-success/20 text-success',
  },
  sick: {
    label: 'B',
    className: 'bg-destructive/20 text-destructive',
  },
  free: {
    label: '-',
    className: 'text-muted-foreground',
  },
};

export function ScheduleCell({ status, isWeekend, size = 'sm' }: ScheduleCellProps) {
  if (!status || status === 'free') {
    return (
      <span className="text-xs text-muted-foreground">-</span>
    );
  }

  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded font-bold',
        config.className,
        size === 'sm' ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'
      )}
    >
      {config.label}
    </span>
  );
}
