import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '@/store/useAuthStore';
import AdminLayout from '@/components/layout/AdminLayout';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import AppointmentsPage from '@/pages/AppointmentsPage';
import ServicesPage from '@/pages/ServicesPage';
import MechanicsPage from '@/pages/MechanicsPage';
import CustomersPage from '@/pages/CustomersPage';
import FeedPage from '@/pages/FeedPage';
import ReportsPage from '@/pages/ReportsPage';
import UsersPage from '@/pages/UsersPage';
import SettingsPage from '@/pages/SettingsPage';
import ClientApp from '@/pages/ClientApp';
import ClientLoginPage from '@/pages/ClientLoginPage';
import ClientRegisterPage from '@/pages/ClientRegisterPage';
import ClientProtectedRoute from '@/components/auth/ClientProtectedRoute';

// Crear cliente de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
});

// Componente de ruta protegida
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            {/* Ruta de login */}
            <Route path="/admin/login" element={<LoginPage />} />
            
            {/* Rutas protegidas */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Routes>
                      <Route path="dashboard" element={<DashboardPage />} />
                      <Route path="appointments" element={<AppointmentsPage />} />
                      <Route path="services" element={<ServicesPage />} />
                      <Route path="mechanics" element={<MechanicsPage />} />
                      <Route path="customers" element={<CustomersPage />} />
                      <Route path="feed" element={<FeedPage />} />
                      <Route path="reports" element={<ReportsPage />} />
                      <Route path="users" element={<UsersPage />} />
                      <Route path="settings" element={<SettingsPage />} />
                      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                    </Routes>
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            
            {/* Rutas del cliente */}
            <Route path="/cliente/login" element={<ClientLoginPage />} />
            <Route path="/cliente/register" element={<ClientRegisterPage />} />
            <Route 
              path="/cliente" 
              element={
                <ClientProtectedRoute>
                  <ClientApp />
                </ClientProtectedRoute>
              } 
            />
            
            {/* Ruta por defecto */}
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </div>
        
        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </Router>
    </QueryClientProvider>
  );
}

export default App; 