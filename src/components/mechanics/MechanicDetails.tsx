import { useState } from 'react';
import { format, differenceInYears } from 'date-fns';
import { es } from 'date-fns/locale';
import { Mechanic } from '@/types';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
import { 
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  IdentificationIcon,
  CalendarIcon,
  WrenchIcon,
  AcademicCapIcon,
  StarIcon,
  UserCircleIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

interface MechanicDetailsProps {
  mechanic: Mechanic;
  onEdit: (mechanic: Mechanic) => void;
  onDelete: (mechanicId: string) => void;
  onToggleStatus: (mechanicId: string, isActive: boolean) => void;
}

const getSkillLevelColor = (level: string) => {
  switch (level) {
    case 'expert': return 'bg-red-100 text-red-800 border-red-200';
    case 'advanced': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'intermediate': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'beginner': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getSkillLevelLabel = (level: string) => {
  switch (level) {
    case 'expert': return 'Experto';
    case 'advanced': return 'Avanzado';
    case 'intermediate': return 'Intermedio';
    case 'beginner': return 'Principiante';
    default: return level;
  }
};

const getSkillLevelStars = (level: string) => {
  switch (level) {
    case 'expert': return 5;
    case 'advanced': return 4;
    case 'intermediate': return 3;
    case 'beginner': return 2;
    default: return 1;
  }
};

export const MechanicDetails = ({ 
  mechanic, 
  onEdit, 
  onDelete, 
  onToggleStatus 
}: MechanicDetailsProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este mecánico?')) {
      setIsDeleting(true);
      try {
        await onDelete(mechanic.id);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleToggleStatus = () => {
    const action = mechanic.isActive ? 'desactivar' : 'activar';
    if (window.confirm(`¿Estás seguro de que quieres ${action} este mecánico?`)) {
      onToggleStatus(mechanic.id, !mechanic.isActive);
    }
  };

  const age = mechanic.dateOfBirth ? differenceInYears(new Date(), mechanic.dateOfBirth) : null;

  return (
    <div className="space-y-6">
      {/* Header con estado y acciones */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`px-3 py-1 rounded-full border text-sm font-medium ${
            mechanic.isActive 
              ? 'bg-green-100 text-green-800 border-green-200' 
              : 'bg-red-100 text-red-800 border-red-200'
          }`}>
            <div className="flex items-center space-x-2">
              {mechanic.isActive ? (
                <CheckCircleIcon className="w-4 h-4" />
              ) : (
                <XCircleIcon className="w-4 h-4" />
              )}
              <span>{mechanic.isActive ? 'Activo' : 'Inactivo'}</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            variant={mechanic.isActive ? 'warning' : 'success'}
            size="sm"
            onClick={handleToggleStatus}
          >
            {mechanic.isActive ? 'Desactivar' : 'Activar'}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(mechanic)}
          >
            <PencilIcon className="w-4 h-4 mr-2" />
            Editar
          </Button>
          <Button
            variant="error"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <TrashIcon className="w-4 h-4 mr-2" />
            {isDeleting ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </div>
      </div>

      {/* Información personal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="w-5 h-5" />
              Información Personal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {mechanic.avatar ? (
                  <img 
                    className="h-16 w-16 rounded-full object-cover" 
                    src={mechanic.avatar} 
                    alt={`${mechanic.firstName} ${mechanic.lastName}`}
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center">
                    <UserIcon className="w-8 h-8 text-gray-600" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {mechanic.firstName} {mechanic.lastName}
                </h3>
                <p className="text-sm text-gray-500">Código: {mechanic.employeeCode}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-600">
                <PhoneIcon className="w-4 h-4" />
                <span>{mechanic.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <EnvelopeIcon className="w-4 h-4" />
                <span>{mechanic.email}</span>
              </div>
              {mechanic.address && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPinIcon className="w-4 h-4" />
                  <span>{mechanic.address}</span>
                </div>
              )}
              {mechanic.dateOfBirth && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <CalendarIcon className="w-4 h-4" />
                  <span>
                    {format(mechanic.dateOfBirth, 'dd/MM/yyyy', { locale: es })}
                    {age && ` (${age} años)`}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IdentificationIcon className="w-5 h-5" />
              Información Laboral
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Experiencia</span>
                <p className="font-semibold text-lg">
                  {mechanic.experience} año{mechanic.experience !== 1 ? 's' : ''}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Tarifa por Hora</span>
                <p className="font-semibold text-lg text-green-600">
                  RD${mechanic.hourlyRate.toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <span className="text-sm text-gray-500">Fecha de Ingreso</span>
              <p className="font-semibold">
                {format(mechanic.createdAt, 'dd/MM/yyyy', { locale: es })}
              </p>
            </div>

            <div>
              <span className="text-sm text-gray-500">Última Actualización</span>
              <p className="text-sm text-gray-600">
                {format(mechanic.updatedAt, 'dd/MM/yyyy HH:mm', { locale: es })}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Especialidades */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <WrenchIcon className="w-5 h-5" />
            Especialidades ({mechanic.specialties.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {mechanic.specialties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mechanic.specialties.map(specialty => (
                <div 
                  key={specialty.id}
                  className="flex items-center space-x-3 p-3 border rounded-lg"
                >
                  <div 
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: specialty.color }}
                  ></div>
                  <div>
                    <div className="font-medium text-gray-900">{specialty.name}</div>
                    <div className="text-sm text-gray-500">{specialty.description}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No hay especialidades asignadas
            </p>
          )}
        </CardContent>
      </Card>

      {/* Habilidades */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <StarIcon className="w-5 h-5" />
            Habilidades ({mechanic.skills.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {mechanic.skills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mechanic.skills.map(skill => (
                <div key={skill.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{skill.name}</h4>
                    <Badge className={`text-xs ${getSkillLevelColor(skill.level)}`}>
                      {getSkillLevelLabel(skill.level)}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-3 h-3 ${
                            i < getSkillLevelStars(skill.level)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {skill.yearsOfExperience} año{skill.yearsOfExperience !== 1 ? 's' : ''} de experiencia
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No hay habilidades registradas
            </p>
          )}
        </CardContent>
      </Card>

      {/* Certificaciones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AcademicCapIcon className="w-5 h-5" />
            Certificaciones ({mechanic.certifications.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {mechanic.certifications.length > 0 ? (
            <div className="space-y-4">
              {mechanic.certifications.map(cert => (
                <div key={cert.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{cert.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{cert.issuer}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Fecha de Obtención:</span>
                          <p className="font-medium">
                            {format(cert.dateObtained, 'dd/MM/yyyy', { locale: es })}
                          </p>
                        </div>
                        {cert.expirationDate && (
                          <div>
                            <span className="text-gray-500">Fecha de Expiración:</span>
                            <p className={`font-medium ${
                              cert.expirationDate < new Date() 
                                ? 'text-red-600' 
                                : cert.expirationDate < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                                  ? 'text-yellow-600'
                                  : 'text-green-600'
                            }`}>
                              {format(cert.expirationDate, 'dd/MM/yyyy', { locale: es })}
                            </p>
                          </div>
                        )}
                      </div>
                      {cert.certificateNumber && (
                        <p className="text-xs text-gray-500 mt-2">
                          Número: {cert.certificateNumber}
                        </p>
                      )}
                    </div>
                    {cert.imageUrl && (
                      <div className="ml-4">
                        <img 
                          src={cert.imageUrl} 
                          alt={cert.name}
                          className="w-16 h-16 object-cover rounded border"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No hay certificaciones registradas
            </p>
          )}
        </CardContent>
      </Card>

      {/* Contacto de emergencia */}
      {mechanic.emergencyContact && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCircleIcon className="w-5 h-5" />
              Contacto de Emergencia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Nombre</span>
                <p className="font-medium">{mechanic.emergencyContact.name}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Relación</span>
                <p className="font-medium">{mechanic.emergencyContact.relationship}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Teléfono</span>
                <p className="font-medium">{mechanic.emergencyContact.phone}</p>
              </div>
              {mechanic.emergencyContact.email && (
                <div>
                  <span className="text-sm text-gray-500">Email</span>
                  <p className="font-medium">{mechanic.emergencyContact.email}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
