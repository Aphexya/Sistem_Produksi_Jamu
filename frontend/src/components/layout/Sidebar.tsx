import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { icon: 'dashboard', label: 'Dashboard', to: '/dashboard' },
  { icon: 'inventory_2', label: 'Inventaris', to: '/inventory' },
  { icon: 'precision_manufacturing', label: 'Produksi', to: '/production' },
  { icon: 'menu_book', label: 'Resep', to: '/recipes' },
  { icon: 'local_shipping', label: 'Supplier', to: '/supplier' },
  { icon: 'analytics', label: 'Laporan', to: '/reports' },
  { icon: 'settings', label: 'Pengaturan', to: '/settings' },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="h-full w-72 flex flex-col fixed left-0 top-0 bg-surface-container-low z-50">
      <div className="flex flex-col h-screen py-8">
        {/* Branding */}
        <div className="px-8 mb-10">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-xl font-bold tracking-tight text-primary-container font-headline">
              Penjamu Handal
            </h1>
          </div>
          <p className="text-xs font-semibold tracking-widest uppercase opacity-50 px-1">Digital Apothecary</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`px-6 py-4 flex items-center gap-3 transition-colors ${isActive
                  ? 'text-primary-container font-bold border-l-4 border-secondary-container bg-surface/50'
                  : 'text-on-surface/60 hover:bg-surface hover:text-on-surface border-l-4 border-transparent'
                  }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* New Batch CTA */}
        <div className="px-6 mt-auto">
          <button className="w-full apothecary-gradient text-on-primary py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 shadow-sm">
            <span className="material-symbols-outlined text-sm">add_circle</span>
            Batch Baru
          </button>
        </div>
      </div>
    </aside>
  );
}
