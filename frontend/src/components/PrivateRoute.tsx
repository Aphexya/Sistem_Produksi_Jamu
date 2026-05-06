/**
 * PrivateRoute — Guard komponen untuk melindungi halaman dari akses tanpa login.
 *
 * Cara kerja:
 * 1. Saat isLoading (fetchMe belum selesai) → tampilkan spinner, jangan redirect dulu.
 * 2. Setelah isLoading selesai:
 *    a. Belum login → redirect ke "/" (login page), simpan tujuan di state.from.
 *    b. Sudah login tapi role tidak sesuai → redirect ke "/unauthorized".
 *    c. Sudah login & role sesuai → render halaman.
 */

import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import type { AuthUser } from '../store/useAuthStore';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: AuthUser['role'][];
}

export default function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const location = useLocation();

  // Tunggu sampai fetchMe() selesai sebelum memutuskan redirect
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-surface-container-highest border-t-primary" />
          <p className="text-sm font-medium text-outline animate-pulse">Memeriksa sesi...</p>
        </div>
      </div>
    );
  }

  // Belum login → redirect ke login, simpan tujuan asal
  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // Role tidak sesuai
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
