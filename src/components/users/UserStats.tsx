import React from 'react';
import { UsersIcon, UserGroupIcon, UserMinusIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface UserStatsProps {
  stats: {
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
    usersByRole: { role: string; count: number }[];
  } | null;
  isLoading?: boolean;
}

const UserStats: React.FC<UserStatsProps> = ({ stats, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const getRoleLabel = (role: string) => {
    const roleLabels = {
      super_admin: 'Super Admin',
      admin: 'Administrador',
      employee: 'Empleado',
      mechanic: 'Mecánico'
    };
    return roleLabels[role as keyof typeof roleLabels] || role;
  };

  const getRoleColor = (role: string) => {
    const roleColors = {
      super_admin: 'text-error-600',
      admin: 'text-accent-600',
      employee: 'text-primary-600',
      mechanic: 'text-success-600'
    };
    return roleColors[role as keyof typeof roleColors] || 'text-gray-600';
  };

  const getRoleIcon = (role: string) => {
    const roleIcons = {
      super_admin: '👑',
      admin: '⚙️',
      employee: '👷',
      mechanic: '🔧'
    };
    return roleIcons[role as keyof typeof roleIcons] || '👤';
  };

  return (
    <div className="space-y-6 mb-6">
      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UsersIcon className="h-8 w-8 text-primary-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total de Usuarios
                  </dt>
                  <dd className="text-lg font-medium text-primary-500">
                    {stats.totalUsers}
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserGroupIcon className="h-8 w-8 text-success-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Usuarios Activos
                  </dt>
                  <dd className="text-lg font-medium text-success-500">
                    {stats.activeUsers}
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserMinusIcon className="h-8 w-8 text-gray-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Usuarios Inactivos
                  </dt>
                  <dd className="text-lg font-medium text-gray-500">
                    {stats.inactiveUsers}
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-8 w-8 text-accent-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Tasa de Actividad
                  </dt>
                  <dd className="text-lg font-medium text-accent-500">
                    {stats.totalUsers > 0 ? Math.round((stats.activeUsers / stats.totalUsers) * 100) : 0}%
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Distribución por roles */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary-500">
            Distribución por Roles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.usersByRole.map((roleStat) => (
              <div
                key={roleStat.role}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getRoleIcon(roleStat.role)}</span>
                  <div>
                    <p className={`text-sm font-medium ${getRoleColor(roleStat.role)}`}>
                      {getRoleLabel(roleStat.role)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {roleStat.count} usuario{roleStat.count !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-primary-500">
                    {stats.totalUsers > 0 ? Math.round((roleStat.count / stats.totalUsers) * 100) : 0}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStats;
