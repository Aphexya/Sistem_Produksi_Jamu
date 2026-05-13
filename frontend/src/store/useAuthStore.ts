/**
 * useAuthStore — Zustand store untuk state autentikasi global.
 *
 * Token JWT disimpan di HttpOnly cookie (dikelola backend).
 * Store ini hanya menyimpan data profil user di memori (hilang saat refresh).
 * Saat refresh, data diambil ulang dari API /auth/me menggunakan cookie yang ada.
 *
 * State:
 *  - user            : data profil user yang sedang login (atau null)
 *  - isAuthenticated : boolean — apakah user sudah login
 *  - isLoading       : boolean — sedang mengecek sesi (saat awal load app)
 *
 * Actions:
 *  - setUser(user)   : set data user setelah login berhasil
 *  - logout()        : hapus state + panggil API logout (clear cookie)
 *  - fetchMe()       : ambil data user dari API /auth/me menggunakan cookie
 */

import { create } from 'zustand';

export interface AuthUser {
  id_user: number;
  username: string;
  email: string;
  role: 'admin' | 'supervisor' | 'staff';
  id_kota?: number | null;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: AuthUser) => void;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  /** Dipanggil setelah login berhasil */
  setUser: (user) => {
    set({ user, isAuthenticated: true, isLoading: false });
  },

  /**
   * Panggil API /api/auth/logout untuk menghapus HttpOnly cookie di server,
   * lalu reset state.
   */
  logout: async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // kirim cookie
      });
    } catch {
      // Abaikan error jaringan — tetap reset state
    }
    set({ user: null, isAuthenticated: false, isLoading: false });
  },

  /**
   * Panggil GET /api/auth/me untuk mendapatkan data user dari cookie yang ada.
   * Digunakan saat: app pertama kali load / halaman di-refresh.
   */
  fetchMe: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch('/api/auth/me', {
        credentials: 'include', // kirim HttpOnly cookie secara otomatis
      });

      if (res.ok) {
        const data = await res.json();
        set({ user: data.user, isAuthenticated: true, isLoading: false });
      } else {
        // Cookie tidak ada / kadaluarsa
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
