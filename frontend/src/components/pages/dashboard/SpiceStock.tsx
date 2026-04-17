const ingredients = [
  {
    name: 'Kunyit Bubuk',
    scientific: 'Curcuma longa',
    category: 'Akar & Umbi',
    stock: '42.5',
    icon: 'cannabis',
    status: 'Sehat',
    statusClass: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    dotClass: 'bg-on-tertiary-fixed-variant',
  },
  {
    name: 'Jahe Merah',
    scientific: 'Zingiber officinale',
    category: 'Akar & Umbi',
    stock: '4.2',
    icon: 'cannabis',
    status: 'Kritis',
    statusClass: 'bg-error-container text-on-error-container',
    dotClass: 'bg-error animate-pulse',
  },
  {
    name: 'Daun Sirih',
    scientific: 'Piper betle',
    category: 'Sayuran Hijau',
    stock: '12.0',
    icon: 'eco',
    status: 'Peringatan',
    statusClass: 'bg-secondary-container text-on-secondary-container',
    dotClass: 'bg-secondary',
  },
];

export default function SpiceStock() {
  return (
    <div className="xl:col-span-3 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-primary font-headline">Stok Rempah</h3>
        <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
          Inventaris Lengkap
          <span className="material-symbols-outlined text-xs">arrow_forward</span>
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden border border-outline-variant/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-high/50 text-on-surface-variant text-[10px] uppercase tracking-widest font-bold">
              <th className="px-6 py-4">Nama Bahan</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4 text-center">Stok</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {ingredients.map((item) => (
              <tr key={item.name} className="hover:bg-surface-container-low transition-colors group">
                <td className="px-6 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    <div>
                      <p className="font-bold text-primary">{item.name}</p>
                      <p className="text-xs text-on-surface-variant italic">{item.scientific}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <span className="text-xs font-semibold px-2 py-1 bg-surface-container-high rounded text-on-surface-variant">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-6 text-center">
                  <p className="font-bold text-primary">
                    {item.stock} <span className="text-[10px] text-on-surface-variant uppercase ml-1">kg</span>
                  </p>
                </td>
                <td className="px-6 py-6">
                  <span className={`inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-[10px] font-bold uppercase ${item.statusClass}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${item.dotClass}`}></span>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
