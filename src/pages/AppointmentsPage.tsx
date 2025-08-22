import { useState, useEffect } from 'react';
import { useAppointmentStore } from '@/store/useAppointmentStore';
import { Appointment, ReportFilter } from '@/types';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { 
  AppointmentCalendar,
  AppointmentModal,
  AppointmentDetails,
  AppointmentFilters,
  AppointmentsList
} from '@/components/appointments';
import { 
  PlusIcon,
  CalendarIcon,
  ListBulletIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const AppointmentsPage = () => {
  const { 
    appointments, 
    selectedAppointment, 
    fetchAppointments, 
    selectAppointment,
    updateAppointment,
    deleteAppointment 
  } = useAppointmentStore();
  
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleNewAppointment = () => {
    setEditingAppointment(null);
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    setIsModalOpen(true);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleViewAppointment = (appointment: Appointment) => {
    selectAppointment(appointment);
  };

  const handleDeleteAppointment = async (appointmentId: string) => {
    await deleteAppointment(appointmentId);
    if (selectedAppointment?.id === appointmentId) {
      selectAppointment(null);
    }
  };

  const handleStatusChange = async (appointmentId: string, status: string) => {
    await updateAppointment(appointmentId, { status: status as any });
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    selectAppointment(appointment);
  };

  const handleTimeSlotClick = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setIsModalOpen(true);
  };

  const handleFiltersChange = (filters: ReportFilter) => {
    // Los filtros se aplican automáticamente a través del store
    console.log('Filtros aplicados:', filters);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAppointment(null);
    setSelectedDate(undefined);
    setSelectedTime(undefined);
  };

  const getStats = () => {
    const total = appointments.length;
    const today = new Date();
    const todayAppointments = appointments.filter(apt => 
      apt.scheduledDate.toDateString() === today.toDateString()
    );
    const confirmed = appointments.filter(apt => apt.status === 'confirmed').length;
    const completed = appointments.filter(apt => apt.status === 'completed').length;

    return {
      total,
      today: todayAppointments.length,
      confirmed,
      completed
    };
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Citas</h1>
          <p className="text-gray-600">Administra las citas del taller</p>
        </div>
        
        <Button
          variant="primary"
          onClick={handleNewAppointment}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Nueva Cita
        </Button>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CalendarIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Citas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CalendarIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hoy</p>
                <p className="text-2xl font-bold text-gray-900">{stats.today}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <CalendarIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Confirmadas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.confirmed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <CalendarIcon className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completadas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <AppointmentFilters onFiltersChange={handleFiltersChange} />

      {/* Controles de vista */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant={view === 'calendar' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setView('calendar')}
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            Calendario
          </Button>
          <Button
            variant={view === 'list' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setView('list')}
          >
            <ListBulletIcon className="w-4 h-4 mr-2" />
            Lista
          </Button>
        </div>

        <div className="text-sm text-gray-500">
          {appointments.length} cita{appointments.length !== 1 ? 's' : ''} encontrada{appointments.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vista principal (Calendario o Lista) */}
        <div className={`${selectedAppointment ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          {view === 'calendar' ? (
            <AppointmentCalendar
              onAppointmentClick={handleAppointmentClick}
              onTimeSlotClick={handleTimeSlotClick}
            />
          ) : (
            <AppointmentsList
              onViewAppointment={handleViewAppointment}
              onEditAppointment={handleEditAppointment}
              onDeleteAppointment={handleDeleteAppointment}
            />
          )}
        </div>

        {/* Panel lateral de detalles */}
        {selectedAppointment && (
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Detalles de la Cita</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => selectAppointment(null)}
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AppointmentDetails
                  appointment={selectedAppointment}
                  onEdit={handleEditAppointment}
                  onDelete={handleDeleteAppointment}
                  onStatusChange={handleStatusChange}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Modal de creación/edición */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        appointment={editingAppointment}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
      />
    </div>
  );
};

export default AppointmentsPage; 