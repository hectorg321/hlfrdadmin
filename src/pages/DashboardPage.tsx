import { 
  CalendarIcon, 
  CurrencyDollarIcon, 
  UsersIcon, 
  WrenchScrewdriverIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { StatCard } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';

const DashboardPage = () => {
  // Datos mock para demostración
  const stats: StatCard[] = [
    {
      title: 'Citas Hoy',
      value: 8,
      change: 12,
      changeType: 'increase',
      icon: CalendarIcon,
      color: 'blue'
    },
    {
      title: 'Ingresos del Mes',
      value: 'RD$ 45,250',
      change: 8.2,
      changeType: 'increase',
      icon: CurrencyDollarIcon,
      color: 'green'
    },
    {
      title: 'Clientes Activos',
      value: 156,
      change: 3.1,
      changeType: 'increase',
      icon: UsersIcon,
      color: 'purple'
    },
    {
      title: 'Servicios Completados',
      value: 42,
      change: -2.4,
      changeType: 'decrease',
      icon: WrenchScrewdriverIcon,
      color: 'yellow'
    },
    {
      title: 'Citas Pendientes',
      value: 5,
      change: 0,
      changeType: 'neutral',
      icon: ClockIcon,
      color: 'blue'
    },
    {
      title: 'Urgencias',
      value: 2,
      change: 100,
      changeType: 'increase',
      icon: ExclamationTriangleIcon,
      color: 'red'
    }
  ];

  const getChangeColor = (changeType: 'increase' | 'decrease' | 'neutral') => {
    switch (changeType) {
      case 'increase':
        return 'text-success-600';
      case 'decrease':
        return 'text-error-600';
      default:
        return 'text-gray-500';
    }
  };

  const getChangeIcon = (changeType: 'increase' | 'decrease' | 'neutral') => {
    switch (changeType) {
      case 'increase':
        return '↗';
      case 'decrease':
        return '↘';
      default:
        return '→';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary-500">Dashboard</h1>
        <p className="text-gray-500">Resumen general del taller</p>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-8 w-8 text-accent-500" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.title}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <div className={`text-sm ${getChangeColor(stat.changeType)}`}>
                    <span className="font-medium">
                      {getChangeIcon(stat.changeType)} {stat.change}%
                    </span>
                    <span className="ml-1">vs mes anterior</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

            {/* Gráficos y tablas adicionales */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Citas recientes */}
        <Card>
          <CardHeader>
            <CardTitle>Citas Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Cambio de aceite</p>
                      <p className="text-xs text-gray-500">Juan Pérez - 10:00 AM</p>
                    </div>
                  </div>
                  <Badge variant="outline" size="sm">Hoy</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Servicios populares */}
        <Card>
          <CardHeader>
            <CardTitle>Servicios Populares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Cambio de aceite', count: 24, revenue: 12000 },
                { name: 'Frenos', count: 18, revenue: 45000 },
                { name: 'Suspensión', count: 12, revenue: 32000 },
                { name: 'Motor', count: 8, revenue: 28000 }
              ].map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{service.name}</p>
                    <p className="text-xs text-gray-500">{service.count} servicios</p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    RD$ {service.revenue.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage; 