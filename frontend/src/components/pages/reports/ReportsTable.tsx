const recentBatches = [
  {
    id: '#BAT-2024-089',
    recipe: 'Kunyit Asam Premium',
    variant: 'Signature Series',
    volume: '45.0 L',
    efficiency: 96,
    effClass: 'bg-tertiary-fixed-dim',
    status: 'SELESAI',
    statusClass: 'bg-tertiary-fixed border-tertiary-fixed/20 text-on-tertiary-fixed-variant'
  },
  {
    id: '#BAT-2024-090',
    recipe: 'Beras Kencur Harian',
    variant: 'Standard Stock',
    volume: '120.0 L',
    efficiency: 92,
    effClass: 'bg-secondary',
    status: 'BOTOLISASI',
    statusClass: 'bg-secondary-container/30 text-on-secondary-container'
  },
  {
    id: '#BAT-2024-091',
    recipe: 'Ekstrak Jahe Merah',
    variant: 'Base Ingredient',
    volume: '22.5 L',
    efficiency: 88,
    effClass: 'bg-primary',
    status: 'EKSTRAKSI',
    statusClass: 'bg-primary-fixed/40 text-on-primary-fixed-variant'
  }
];

export default function ReportsTable() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h3 className="text-2xl font-bold font-headline text-primary">Ringkasan Batch Terkini</h3>
        <button className="text-sm font-bold text-secondary hover:underline transition-all underline-offset-4">
          Lihat Semua Batch
        </button>
      </div>
      
      <div className="overflow-x-auto bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-surface-container-low text-on-surface-variant/80 text-xs font-bold uppercase tracking-widest border-b border-outline-variant/10">
              <th className="px-8 py-5">ID Batch</th>
              <th className="px-8 py-5">Nama Resep</th>
              <th className="px-8 py-5">Volume</th>
              <th className="px-8 py-5">Efisiensi</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/5">
            {recentBatches.map((batch) => (
              <tr key={batch.id} className="hover:bg-surface-container-low/50 transition-colors group">
                <td className="px-8 py-6 font-bold text-primary font-mono">{batch.id}</td>
                <td className="px-8 py-6">
                  <div className="font-bold text-on-surface">{batch.recipe}</div>
                  <div className="text-xs text-on-surface-variant font-medium">{batch.variant}</div>
                </td>
                <td className="px-8 py-6 font-bold text-on-surface-variant">{batch.volume}</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-surface-container h-2 rounded-full overflow-hidden shadow-inner">
                      <div className={`${batch.effClass} h-full rounded-full`} style={{ width: `${batch.efficiency}%` }}></div>
                    </div>
                    <span className="text-sm font-bold">{batch.efficiency}%</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1.5 ${batch.statusClass} border text-[10px] font-extrabold rounded-full tracking-wider shadow-sm`}>
                    {batch.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 -mr-2 rounded-lg text-on-surface-variant/50 hover:text-primary hover:bg-surface-container transition-colors group/btn">
                    <span className="material-symbols-outlined text-[20px] group-hover/btn:scale-110 transition-transform">open_in_new</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
