/**
 * useAuth — Hook wrapper di atas Zustand useAuthStore.
 *
 * Menyediakan interface yang sama seperti sebelumnya sehingga komponen lain
 * tidak perlu berubah banyak.
 *
 * Token JWT kini ada di HttpOnly cookie (dikelola browser+backend secara otomatis).
 * Hook ini tidak mengekspos token ke JavaScript.
 */

import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export type { AuthUser } from '../store/useAuthStore';

export function useAuth() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout: storeLogout } = useAuthStore();

  const logout = async () => {
    await storeLogout();
    navigate('/', { replace: true });
  };

  return { isAuthenticated, user, isLoading, logout };
}
