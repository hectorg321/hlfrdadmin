import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '@/store/useAuthStore';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      await login(data.email, data.password);
      toast.success('Inicio de sesión exitoso');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Error al iniciar sesión');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-accent-100 mb-4">
            <WrenchScrewdriverIcon className="h-8 w-8 text-accent-500" />
          </div>
          <CardTitle>Taller Admin</CardTitle>
          <CardDescription>
            Inicia sesión en tu cuenta administrativa
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Input
                {...register('email')}
                type="email"
                label="Email"
                placeholder="admin@taller.com"
                error={errors.email?.message}
              />

              <Input
                {...register('password')}
                type="password"
                label="Contraseña"
                placeholder="••••••••"
                error={errors.password?.message}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              variant="accent"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Demo: admin@taller.com / password123
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage; 