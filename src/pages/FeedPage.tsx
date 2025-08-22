import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

const FeedPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Feed Social</h1>
        <p className="text-gray-600">Gestiona el contenido social del taller</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contenido Social</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <p className="text-lg font-medium">Feed en desarrollo</p>
              <p className="text-sm">Próximamente: Gestión de contenido social</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedPage; 