import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { format } from 'date-fns';
import { useAppointmentStore } from '@/store/useAppointmentStore';
import { Appointment, AppointmentStatus } from '@/types';
import { Button } from '@/components/ui';
import { 
  CalendarIcon, 
  ClockIcon, 
  WrenchIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon as ClockIconSolid
} from '@heroicons/react/24/outline';

interface AppointmentCalendarProps {
  onAppointmentClick: (appointment: Appointment) => void;
  onTimeSlotClick: (date: Date, time: string) => void;
}

const statusColors: Record<AppointmentStatus, string> = {
  scheduled: '#3B82F6', // blue
  confirmed: '#10B981', // green
  in_progress: '#F59E0B', // yellow
  completed: '#059669', // dark green
  cancelled: '#EF4444', // red
  no_show: '#6B7280' // gray
};

const statusIcons: Record<AppointmentStatus, React.ComponentType<{ className?: string }>> = {
  scheduled: ClockIcon,
  confirmed: CheckCircleIcon,
  in_progress: ClockIconSolid,
  completed: CheckCircleIcon,
  cancelled: XCircleIcon,
  no_show: XCircleIcon
};

export const AppointmentCalendar = ({ 
  onAppointmentClick, 
  onTimeSlotClick 
}: AppointmentCalendarProps) => {
  const { appointments, fetchAppointments, isLoading } = useAppointmentStore();
  const [view, setView] = useState<'dayGridMonth' | 'timeGridWeek' | 'timeGridDay'>('timeGridWeek');

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const calendarEvents = appointments.map(appointment => ({
    id: appointment.id,
    title: `${appointment.customer.firstName} ${appointment.customer.lastName}`,
    start: `${appointment.scheduledDate.toISOString().split('T')[0]}T${appointment.startTime}`,
    end: `${appointment.scheduledDate.toISOString().split('T')[0]}T${appointment.endTime}`,
    backgroundColor: statusColors[appointment.status],
    borderColor: statusColors[appointment.status],
    textColor: '#FFFFFF',
    extendedProps: {
      appointment,
      status: appointment.status,
      service: appointment.service.name,
      vehicle: `${appointment.vehicleInfo.brand} ${appointment.vehicleInfo.model}`
    }
  }));

  const handleEventClick = (info: any) => {
    const appointment = info.event.extendedProps.appointment;
    onAppointmentClick(appointment);
  };

  const handleDateSelect = (selectInfo: any) => {
    const date = selectInfo.start;
    const time = format(date, 'HH:mm');
    onTimeSlotClick(date, time);
  };

  const renderEventContent = (eventInfo: any) => {
    const { status, service, vehicle } = eventInfo.event.extendedProps;
    const StatusIcon = statusIcons[status as AppointmentStatus];

    return (
      <div className="p-1 text-xs">
        <div className="font-semibold truncate">
          {eventInfo.event.title}
        </div>
        <div className="flex items-center gap-1 text-white/90">
          <WrenchIcon className="w-3 h-3" />
          <span className="truncate">{service}</span>
        </div>
        <div className="flex items-center gap-1 text-white/90">
          <StatusIcon className="w-3 h-3" />
          <span className="capitalize">{status.replace('_', ' ')}</span>
        </div>
        <div className="text-white/90 truncate">{vehicle}</div>
      </div>
    );
  };

  const handleViewChange = (newView: string) => {
    setView(newView as any);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controles del calendario */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <Button
            variant={view === 'dayGridMonth' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => handleViewChange('dayGridMonth')}
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            Mes
          </Button>
          <Button
            variant={view === 'timeGridWeek' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => handleViewChange('timeGridWeek')}
          >
            <ClockIcon className="w-4 h-4 mr-2" />
            Semana
          </Button>
          <Button
            variant={view === 'timeGridDay' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => handleViewChange('timeGridDay')}
          >
            <ClockIcon className="w-4 h-4 mr-2" />
            Día
          </Button>
        </div>

        {/* Leyenda de estados */}
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Programada</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Confirmada</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>En Progreso</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Cancelada</span>
          </div>
        </div>
      </div>

      {/* Calendario */}
      <div className="bg-white rounded-lg shadow">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={false}
          initialView={view}
          editable={false}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={calendarEvents}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          height="auto"
          locale="es"
          slotMinTime="08:00:00"
          slotMaxTime="18:00:00"
          allDaySlot={false}
          slotDuration="00:30:00"
          slotLabelInterval="01:00:00"
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }}
          dayHeaderFormat={{
            weekday: 'long',
            day: 'numeric',
            month: 'long'
          }}
          businessHours={{
            daysOfWeek: [1, 2, 3, 4, 5, 6], // Lunes a Sábado
            startTime: '08:00',
            endTime: '18:00',
          }}
        />
      </div>
    </div>
  );
};
