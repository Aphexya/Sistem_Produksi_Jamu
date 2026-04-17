const inventoryData = [
  {
    id: 1,
    name: 'Jahe Emprit',
    variety: 'Varietas Jahe',
    category: 'Rimpang',
    stock: 142.5,
    threshold: 25.0,
    unit: 'kg',
    status: 'Sehat',
    icon: 'eco',
    bgColor: 'bg-tertiary-fixed',
    iconColor: 'text-on-tertiary-fixed-variant',
    statusClass: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    statusDot: 'bg-on-tertiary-container',
    barFill: 'bg-on-tertiary-container',
    barPercentage: '85%',
  },
  {
    id: 2,
    name: 'Kunyit Kuning',
    variety: 'Turmeric',
    category: 'Rimpang',
    stock: 32.8,
    threshold: 30.0,
    unit: 'kg',
    status: 'Peringatan',
    icon: 'spa',
    bgColor: 'bg-secondary-fixed',
    iconColor: 'text-on-secondary-fixed-variant',
    statusClass: 'bg-secondary-fixed text-on-secondary-fixed-variant',
    statusDot: 'bg-secondary-container',
    barFill: 'bg-secondary-container',
    barPercentage: '35%',
  },
  {
    id: 3,
    name: 'Temulawak',
    variety: 'Java Ginger',
    category: 'Akar',
    stock: 4.2,
    threshold: 15.0,
    unit: 'kg',
    status: 'Kritis',
    icon: 'psychiatry',
    bgColor: 'bg-error-container',
    iconColor: 'text-on-error-container',
    statusClass: 'bg-error-container text-on-error-container',
    statusDot: 'bg-error',
    barFill: 'bg-error',
    barPercentage: '15%',
  },
  {
    id: 4,
    name: 'Kayu Manis',
    variety: 'Batang Kayu Manis',
    category: 'Kulit Kayu',
    stock: 50.0,
    threshold: 10.0,
    unit: 'kg',
    status: 'Sehat',
    icon: 'forest',
    bgColor: 'bg-surface-container-high',
    iconColor: 'text-primary',
    statusClass: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    statusDot: 'bg-on-tertiary-container',
    barFill: 'bg-on-tertiary-container',
    barPercentage: '100%',
  },
];

export default function InventoryTable() {
  return (
    <>
      <div className="bg-surface-container-low rounded-3xl p-1 overflow-hidden shadow-sm">
        <div className="bg-surface-container-lowest rounded-[1.4rem] overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-high/30">
                <th className="px-8 py-6 text-[11px] font-extrabold uppercase tracking-[0.2em] text-on-surface/40">Bahan Baku</th>
                <th className="px-8 py-6 text-[11px] font-extrabold uppercase tracking-[0.2em] text-on-surface/40">Kategori</th>
                <th className="px-8 py-6 text-[11px] font-extrabold uppercase tracking-[0.2em] text-on-surface/40">Stok Saat Ini</th>
                <th className="px-8 py-6 text-[11px] font-extrabold uppercase tracking-[0.2em] text-on-surface/40">Batas Minimum</th>
                <th className="px-8 py-6 text-[11px] font-extrabold uppercase tracking-[0.2em] text-on-surface/40 text-center">Status</th>
                <th className="px-8 py-6 text-[11px] font-extrabold uppercase tracking-[0.2em] text-on-surface/40 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container/30">
              {inventoryData.map((item) => (
                <tr key={item.id} className="hover:bg-surface-container-low/40 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${item.bgColor} rounded-2xl flex items-center justify-center ${item.iconColor} shadow-inner`}>
                        <span className="material-symbols-outlined">{item.icon}</span>
                      </div>
                      <div>
                        <p className="font-bold text-on-surface text-lg">{item.name}</p>
                        <p className="text-xs text-on-surface/50">{item.variety}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-medium text-on-surface/70 bg-surface-container px-3 py-1 rounded-full border border-outline-variant/10">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className={`text-xl font-bold ${item.status === 'Kritis' ? 'text-error' : 'text-primary'}`}>
                        {item.stock} {item.unit}
                      </span>
                      <div className="w-24 h-1.5 bg-surface-container rounded-full mt-2 overflow-hidden shadow-inner">
                        <div className={`h-full ${item.barFill} rounded-full`} style={{ width: item.barPercentage }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-bold text-on-surface/40">
                      {item.threshold.toFixed(1)} {item.unit}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 ${item.statusClass} rounded-full text-xs font-bold uppercase tracking-wider`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.statusDot} ${item.status === 'Kritis' ? 'animate-pulse' : ''}`}></span>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-primary hover:bg-primary-fixed/30 rounded-lg transition-colors focus:opacity-100" title="Edit Data">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button className={`p-2 rounded-lg transition-colors focus:opacity-100 ${item.status === 'Kritis' ? 'text-secondary bg-secondary-fixed/30 hover:bg-secondary-fixed/50' : 'text-secondary hover:bg-secondary-fixed/20'}`} title="Isi Ulang Stok (Restock)">
                        <span className="material-symbols-outlined text-[20px]">{item.status === 'Kritis' ? 'autorenew' : 'inventory_2'}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Pagination/Stats */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center px-4 gap-4">
        <div className="text-sm font-medium text-on-surface/40">
          Menampilkan <span className="text-on-surface font-bold">1-4</span> dari <span className="text-on-surface font-bold">32</span> bahan baku
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant/30 text-on-surface/40 hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-on-primary font-bold shadow-md">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl text-on-surface/60 font-bold hover:bg-surface-container-high transition-colors">2</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl text-on-surface/60 font-bold hover:bg-surface-container-high transition-colors">3</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant/30 text-on-surface/40 hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </>
  );
}
