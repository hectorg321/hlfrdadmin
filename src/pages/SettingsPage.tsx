import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-600">Personaliza el sistema del taller</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuración del Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-4">⚙️</div>
              <p className="text-lg font-medium">Configuración en desarrollo</p>
              <p className="text-sm">Próximamente: Ajustes del sistema</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage; 