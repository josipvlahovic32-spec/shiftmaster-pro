import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  UserPlus, 
  Search, 
  MoreVertical, 
  Mail, 
  Phone,
  Award
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock employees data
const employees = [
  {
    id: '1',
    firstName: 'Ivan',
    lastName: 'Horvat',
    email: 'ivan.horvat@example.com',
    phone: '+385 91 234 5678',
    certifications: ['SG2', 'KS1', 'NS2'],
    isActive: true,
    hoursThisQuarter: 456,
    quarterlyLimit: 480,
  },
  {
    id: '2',
    firstName: 'Ana',
    lastName: 'Kovač',
    email: 'ana.kovac@example.com',
    phone: '+385 92 345 6789',
    certifications: ['SG1', 'KS2'],
    isActive: true,
    hoursThisQuarter: 432,
    quarterlyLimit: 480,
  },
  {
    id: '3',
    firstName: 'Marko',
    lastName: 'Babić',
    email: 'marko.babic@example.com',
    phone: '+385 91 456 7890',
    certifications: ['SG2', 'NS1', 'NS2'],
    isActive: true,
    hoursThisQuarter: 468,
    quarterlyLimit: 480,
  },
  {
    id: '4',
    firstName: 'Petra',
    lastName: 'Jurić',
    email: 'petra.juric@example.com',
    phone: '+385 98 567 8901',
    certifications: ['KS1', 'KS2', 'NS1'],
    isActive: false,
    hoursThisQuarter: 120,
    quarterlyLimit: 480,
  },
  {
    id: '5',
    firstName: 'Luka',
    lastName: 'Novak',
    email: 'luka.novak@example.com',
    phone: '+385 99 678 9012',
    certifications: ['SG1', 'SG2', 'KS1'],
    isActive: true,
    hoursThisQuarter: 444,
    quarterlyLimit: 480,
  },
];

export default function Employees() {
  return (
    <AppLayout 
      title="Djelatnici" 
      subtitle="Upravljanje djelatnicima i njihovim ovlaštenjima"
    >
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Pretraži djelatnike..."
              className="pl-9 bg-muted/50 border-border"
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <UserPlus className="h-4 w-4 mr-2" />
            Novi djelatnik
          </Button>
        </div>

        {/* Employees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {employees.map((employee) => {
            const hoursPercentage = (employee.hoursThisQuarter / employee.quarterlyLimit) * 100;
            
            return (
              <Card key={employee.id} className="border-border bg-card hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                          {employee.firstName[0]}{employee.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base font-semibold">
                          {employee.firstName} {employee.lastName}
                        </CardTitle>
                        <Badge 
                          variant={employee.isActive ? 'default' : 'secondary'}
                          className={employee.isActive 
                            ? 'bg-success/10 text-success border-success/20 text-xs' 
                            : 'text-xs'
                          }
                        >
                          {employee.isActive ? 'Aktivan' : 'Neaktivan'}
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Uredi</DropdownMenuItem>
                        <DropdownMenuItem>Pogledaj raspored</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Deaktiviraj</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Contact Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{employee.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{employee.phone}</span>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-xs font-medium text-muted-foreground">Ovlaštenja</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {employee.certifications.map((cert) => (
                        <Badge key={cert} variant="secondary" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Hours Progress */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">Kvartalni sati</span>
                      <span className="font-medium text-foreground">
                        {employee.hoursThisQuarter}h / {employee.quarterlyLimit}h
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          hoursPercentage >= 95 
                            ? 'bg-destructive' 
                            : hoursPercentage >= 80 
                              ? 'bg-warning' 
                              : 'bg-primary'
                        }`}
                        style={{ width: `${Math.min(hoursPercentage, 100)}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
