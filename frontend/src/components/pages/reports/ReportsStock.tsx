const stocks = [
  {
    id: 1,
    name: 'Kunyit Segar',
    remaining: '240kg tersisa',
    status: 'SEHAT',
    statusClass: 'text-tertiary-fixed-dim bg-tertiary-fixed/10 border-tertiary-fixed/20',
    icon: 'grass',
    containerClass: 'bg-surface-container-low'
  },
  {
    id: 2,
    name: 'Akar Lengkuas',
    remaining: '18kg tersisa',
    status: 'ORDER ULANG',
    statusClass: 'text-on-secondary-container bg-secondary-container',
    icon: 'eco',
    containerClass: 'bg-surface-container-low'
  },
  {
    id: 3,
    name: 'Ekstrak Madu Hutan',
    remaining: '112L tersisa',
    status: 'SEHAT',
    statusClass: 'text-tertiary-fixed-dim bg-tertiary-fixed/10 border-tertiary-fixed/20',
    icon: 'water_drop',
    containerClass: 'bg-surface-container-low'
  },
  {
    id: 4,
    name: 'Botol Kaca (250ml)',
    remaining: '42 unit tersisa',
    status: 'KRITIS',
    statusClass: 'text-on-error-container bg-error-container',
    icon: 'inventory_2',
    iconColor: 'text-error',
    containerClass: 'bg-error-container/40'
  }
];

export default function ReportsStock() {
  return (
    <div className="md:col-span-1 space-y-6">
      <h3 className="text-2xl font-bold font-headline text-primary">Status Stok Esensial</h3>
      <div className="space-y-4">
        {stocks.map((item) => (
          <div key={item.id} className={`${item.containerClass} p-5 rounded-xl flex items-center justify-between shadow-sm border border-outline-variant/5`}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center shadow-inner">
                <span className={`material-symbols-outlined ${item.iconColor || 'text-secondary'}`}>
                  {item.icon}
                </span>
              </div>
              <div>
                <h4 className="font-bold text-primary">{item.name}</h4>
                <p className="text-xs font-medium text-on-surface-variant/80 mt-0.5">{item.remaining}</p>
              </div>
            </div>
            <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-sm shadow-sm border border-transparent tracking-widest ${item.statusClass}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
