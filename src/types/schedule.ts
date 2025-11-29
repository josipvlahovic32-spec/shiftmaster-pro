export type ShiftType = 'day' | 'night' | 'morning';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  certifications: string[];
  isActive: boolean;
  createdAt: Date;
}

export interface Shift {
  id: string;
  employeeId: string;
  date: Date;
  type: ShiftType;
  startTime: string;
  endTime: string;
  isWeekend: boolean;
}

export interface DeviceSystem {
  id: string;
  name: string;
  description?: string;
  inspectionInterval: 'monthly' | 'bi-monthly' | 'semi-annual' | 'annual' | 'bi-annual';
  requiredCertifications: string[];
}

export interface Inspection {
  id: string;
  systemId: string;
  scheduledDate: Date;
  assignedEmployeeId?: string;
  status: 'scheduled' | 'completed' | 'overdue';
  notes?: string;
}

export interface Leave {
  id: string;
  employeeId: string;
  type: 'vacation' | 'sick' | 'other';
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}

export interface WorkHoursSummary {
  employeeId: string;
  month: number;
  year: number;
  totalHours: number;
  dayShiftHours: number;
  nightShiftHours: number;
  morningShiftHours: number;
  quarterlyTotal: number;
  quarterlyLimit: number;
}

export interface ScheduleRule {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}
