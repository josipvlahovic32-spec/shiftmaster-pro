import { cn } from '@/lib/utils';
import { ShiftType } from '@/types/schedule';
import { Sun, Moon, Sunrise } from 'lucide-react';

interface ShiftBadgeProps {
  type: ShiftType;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const shiftConfig = {
  day: {
    label: 'Dnevna',
    time: '07:30 - 19:30',
    icon: Sun,
    className: 'bg-day-shift text-day-shift-foreground',
  },
  night: {
    label: 'Noćna',
    time: '19:30 - 07:30',
    icon: Moon,
    className: 'bg-night-shift text-night-shift-foreground',
  },
  morning: {
    label: 'Jutarnja',
    time: '07:30 - 15:30',
    icon: Sunrise,
    className: 'bg-morning-shift text-morning-shift-foreground',
  },
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-2.5 py-1 text-sm gap-1.5',
  lg: 'px-3 py-1.5 text-sm gap-2',
};

const iconSizes = {
  sm: 'h-3 w-3',
  md: 'h-3.5 w-3.5',
  lg: 'h-4 w-4',
};

export function ShiftBadge({ type, showLabel = true, size = 'md' }: ShiftBadgeProps) {
  const config = shiftConfig[type];
  const Icon = config.icon;

  return (
    <span className={cn(
      'inline-flex items-center rounded-full font-medium',
      config.className,
      sizeStyles[size]
    )}>
      <Icon className={iconSizes[size]} />
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}

export function ShiftTime({ type }: { type: ShiftType }) {
  return (
    <span className="text-xs text-muted-foreground">
      {shiftConfig[type].time}
    </span>
  );
}
