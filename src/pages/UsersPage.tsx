import React, { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useUsersStore } from '@/store/useUsersStore';
import { CreateUserData, UpdateUserData, UserFilters } from '@/services/usersService';
import { Button } from '@/components/ui/Button';
import UserModal from '@/components/users/UserModal';
import UserFiltersComponent from '@/components/users/UserFiltersSimple';
import UserStats from '@/components/users/UserStats';
import UsersList from '@/components/users/UsersList';
import ChangePasswordModal from '@/components/users/ChangePasswordModal';

const UsersPage: React.FC = () => {
  const {
    users,
    permissions,
    selectedUser,
    isLoading,
    error,
    stats,
    fetchUsers,
    fetchPermissions,
    fetchUserStats,
    createUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    changeUserPassword,
    setFilters,
    filters,
    clearError
  } = useUsersStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordUserId, setPasswordUserId] = useState<string | null>(null);
  const [passwordUserName, setPasswordUserName] = useState<string>('');

  useEffect(() => {
    fetchUsers();
    fetchPermissions();
    fetchUserStats();
  }, [fetchUsers, fetchPermissions, fetchUserStats]);

  const handleCreateUser = async (userData: CreateUserData) => {
    try {
      await createUser(userData);
      setIsModalOpen(false);
    } catch (error) {
      // El error se maneja en el store
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async (userData: UpdateUserData) => {
    if (!editingUser) return;
    
    try {
      await updateUser(editingUser.id, userData);
      setIsModalOpen(false);
      setEditingUser(null);
    } catch (error) {
      // El error se maneja en el store
      console.error('Error updating user:', error);
    }
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
    } catch (error) {
      // El error se maneja en el store
      console.error('Error deleting user:', error);
    }
  };

  const handleToggleStatus = async (userId: string) => {
    try {
      await toggleUserStatus(userId);
    } catch (error) {
      // El error se maneja en el store
      console.error('Error toggling user status:', error);
    }
  };

  const handleChangePassword = (userId: string, userName: string) => {
    setPasswordUserId(userId);
    setPasswordUserName(userName);
    setIsPasswordModalOpen(true);
  };

  const handlePasswordSubmit = async (newPassword: string) => {
    if (!passwordUserId) return;
    
    try {
      await changeUserPassword(passwordUserId, newPassword);
      setIsPasswordModalOpen(false);
      setPasswordUserId(null);
      setPasswordUserName('');
    } catch (error) {
      // El error se maneja en el store
      console.error('Error changing password:', error);
    }
  };

  const handleFiltersChange = (newFilters: any) => {
    console.log('handleFiltersChange called with:', newFilters);
    try {
      setFilters(newFilters);
      fetchUsers(newFilters);
    } catch (error) {
      console.error('Error in handleFiltersChange:', error);
    }
  };

  const handleClearFilters = () => {
    const clearedFilters = {};
    setFilters(clearedFilters);
    fetchUsers(clearedFilters);
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = async (userData: CreateUserData | UpdateUserData) => {
    if (editingUser) {
      await handleUpdateUser(userData as UpdateUserData);
    } else {
      await handleCreateUser(userData as CreateUserData);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary-500">Gestión de Usuarios</h1>
          <p className="text-gray-500">Administra los usuarios del sistema administrativo</p>
        </div>
        <Button
          onClick={openCreateModal}
          variant="accent"
          size="lg"
          className="flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Nuevo Usuario</span>
        </Button>
      </div>

      {/* Estadísticas */}
      <UserStats stats={stats} isLoading={isLoading} />

      {/* Filtros */}
      <UserFiltersComponent
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
      />

      {/* Lista de usuarios */}
      <UsersList
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onToggleStatus={handleToggleStatus}
        onChangePassword={handleChangePassword}
        isLoading={isLoading}
      />

      {/* Modal de usuario */}
      <UserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        user={editingUser}
        permissions={permissions}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      {/* Modal de cambio de contraseña */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSubmit={handlePasswordSubmit}
        isLoading={isLoading}
        userName={passwordUserName}
      />

      {/* Notificación de error */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-error-500 text-white px-6 py-3 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <span>⚠️</span>
            <span>{error}</span>
            <button
              onClick={clearError}
              className="ml-4 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage; 