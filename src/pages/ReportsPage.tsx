import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reportes y Analytics</h1>
        <p className="text-gray-600">Analiza el rendimiento del taller</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dashboard de Reportes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <p className="text-lg font-medium">Reportes en desarrollo</p>
              <p className="text-sm">Próximamente: Analytics y métricas completas</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage; 