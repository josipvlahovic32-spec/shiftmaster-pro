import { AppLayout } from '@/components/layout/AppLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { TodaySchedule } from '@/components/dashboard/TodaySchedule';
import { UpcomingInspections } from '@/components/dashboard/UpcomingInspections';
import { WeeklyCalendar } from '@/components/dashboard/WeeklyCalendar';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { Users, CalendarCheck, Clock, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  return (
    <AppLayout 
      title="Nadzorna ploča" 
      subtitle="Pregled trenutnog stanja i aktivnosti"
    >
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Aktivni djelatnici"
            value={8}
            subtitle="2 na godišnjem"
            icon={Users}
            variant="primary"
          />
          <StatCard
            title="Smjene ovaj tjedan"
            value={42}
            icon={CalendarCheck}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Prosječni sati/djelatnik"
            value="38.5h"
            subtitle="Q4 2024"
            icon={Clock}
            variant="success"
          />
          <StatCard
            title="Pregledi na čekanju"
            value={3}
            subtitle="1 kasni"
            icon={AlertTriangle}
            variant="warning"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Calendar - Takes 2 columns */}
          <WeeklyCalendar />

          {/* Sidebar Column */}
          <div className="space-y-6">
            <QuickActions />
            <TodaySchedule />
            <UpcomingInspections />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
