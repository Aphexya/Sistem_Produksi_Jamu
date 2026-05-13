/**
 * AuthProvider — Provider yang memanggil fetchMe() saat aplikasi pertama kali dimuat.
 *
 * Ini memastikan bahwa setelah page refresh, state user diambil kembali dari
 * server menggunakan HttpOnly cookie yang masih ada.
 *
 * Pasang di App.tsx (di luar Router) atau di dalam RouterProvider.
 */

import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const fetchMe = useAuthStore((s) => s.fetchMe);

  useEffect(() => {
    // Saat app mount, cek apakah cookie session masih valid
    fetchMe();
  }, [fetchMe]);

  return <>{children}</>;
}
