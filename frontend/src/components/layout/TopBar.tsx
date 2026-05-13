import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import toast from 'react-hot-toast';

interface TopBarProps {
  onMenuClick?: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Tutup dropdown jika klik di luar area
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    toast.success('Sampai jumpa!');
    navigate('/', { replace: true });
  };

  const roleLabel: Record<string, string> = {
    admin: 'Administrator',
    supervisor: 'Supervisor',
    staff: 'Staff Produksi',
  };

  return (
    <header className="flex justify-between items-center px-4 sm:px-8 py-4 sticky top-0 z-40 bg-surface/70 backdrop-blur-md border-b border-primary/10">

      {/* Left: Hamburger (mobile) + Search */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-on-surface/70 hover:bg-surface-container transition-colors flex-shrink-0"
          aria-label="Buka menu navigasi"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        <div className="relative w-full max-w-xs sm:max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-60 text-[20px]">
            search
          </span>
          <input
            className="w-full pl-10 pr-4 py-2 bg-surface-container-highest border-none rounded-lg focus:ring-1 focus:ring-secondary-container transition-all text-sm font-medium"
            placeholder="Cari batch, rempah, atau pesanan..."
            type="text"
          />
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 ml-3">
        <Link
          to="/notifications"
          className="p-2 text-on-surface/70 hover:bg-surface-container rounded-lg transition-all relative"
          aria-label="Notifikasi"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error" />
        </Link>

        <button
          className="hidden sm:flex p-2 text-on-surface/70 hover:bg-surface-container rounded-lg transition-all"
          aria-label="Bantuan"
        >
          <span className="material-symbols-outlined">help_outline</span>
        </button>

        <div className="h-8 w-px bg-outline-variant opacity-30 mx-1 hidden sm:block" />

        {/* Profile & Dropdown */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Nama & role */}
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-primary leading-tight">
              {user?.username ?? '—'}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">
              {user?.role ? roleLabel[user.role] : '—'}
            </p>
          </div>

          {/* Avatar — klik untuk buka/tutup dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-container flex items-center justify-center border-2 transition-all
                ${dropdownOpen
                  ? 'border-primary/40 ring-2 ring-primary/20'
                  : 'border-primary/10 hover:ring-2 hover:ring-primary/20'
                }`}
              aria-label="Menu profil"
              aria-expanded={dropdownOpen}
            >
              <span
                className="material-symbols-outlined text-on-primary-container"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                person
              </span>
            </button>

            {/* Dropdown — dikontrol state, bukan hover CSS */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-surface-container-low border border-outline-variant/20 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {/* Info user */}
                <div className="px-4 py-3 border-b border-outline-variant/20">
                  <p className="text-xs font-bold text-on-surface truncate">{user?.username ?? '—'}</p>
                  <p className="text-[10px] text-on-surface-variant truncate">{user?.email ?? '—'}</p>
                  {user?.role && (
                    <span className="inline-block mt-1.5 text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container">
                      {roleLabel[user.role]}
                    </span>
                  )}
                </div>

                {/* Menu items */}
                <div className="py-1">
                  <Link
                    to="/settings"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">settings</span>
                    Pengaturan
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-error hover:bg-error/5 transition-colors rounded-b-xl"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    Keluar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
