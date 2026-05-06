/**
 * AppShell — Layout wrapper untuk semua halaman yang butuh Sidebar + TopBar.
 *
 * Mengelola state buka/tutup sidebar mobile secara terpusat.
 *
 * Penggunaan:
 *   <AppShell>
 *     <main className="p-6">...</main>
 *   </AppShell>
 */

import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface AppShellProps {
  children: React.ReactNode;
  className?: string;
}

export default function AppShell({ children, className = '' }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`bg-surface text-on-surface min-h-screen overflow-x-hidden font-body flex ${className}`}>
      {/* Sidebar dengan mobile drawer support */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Konten utama — geser kanan sebesar lebar sidebar di desktop */}
      <div className="flex-1 lg:ml-72 flex flex-col w-full min-h-screen">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        {children}
      </div>
    </div>
  );
}
