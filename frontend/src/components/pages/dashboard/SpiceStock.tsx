import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

interface Bahan {
  id: number;
  nama: string;
  kategori: string;
  satuan: string;
  stokAwal: number;
  threshold: number;
}

function getStatus(stok: number, threshold: number) {
  if (stok === 0) return 'Kosong';
  if (stok <= threshold) return 'Kritis';
  if (stok <= threshold * 1.5) return 'Peringatan';
  return 'Sehat';
}

function getStatusStyle(status: string) {
  const map: Record<string, { statusClass: string; dotClass: string; icon: string }> = {
    Sehat:     { statusClass: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',   dotClass: 'bg-on-tertiary-fixed-variant', icon: 'eco' },
    Peringatan:{ statusClass: 'bg-secondary-container text-on-secondary-container', dotClass: 'bg-secondary',                 icon: 'spa' },
    Kritis:    { statusClass: 'bg-error-container text-on-error-container',         dotClass: 'bg-error animate-pulse',       icon: 'fireplace' },
    Kosong:    { statusClass: 'bg-outline text-on-surface/70',                      dotClass: 'bg-outline',                   icon: 'delete_sweep' },
  };
  return map[status] ?? map['Sehat'];
}

async function fetchBahan(): Promise<Bahan[]> {
  const res = await fetch('/api/bahan');
  if (!res.ok) throw new Error('Gagal memuat stok');
  const json = await res.json();
  return Array.isArray(json.data) ? json.data : [];
}

export default function SpiceStock() {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ['spice-stock'],
    queryFn: fetchBahan,
    refetchInterval: 30_000,
  });

  // Prioritaskan yang kritis/peringatan, ambil 5 teratas
  const sorted = [...data].sort((a, b) => {
    const order = { Kosong: 0, Kritis: 1, Peringatan: 2, Sehat: 3 };
    return order[getStatus(a.stokAwal, a.threshold)] - order[getStatus(b.stokAwal, b.threshold)];
  }).slice(0, 5);

  return (
    <div className="xl:col-span-3 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-primary font-headline">Stok Rempah</h3>
        <Link to="/inventory" className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
          Inventaris Lengkap
          <span className="material-symbols-outlined text-xs">arrow_forward</span>
        </Link>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden border border-outline-variant/10">
        {isLoading && (
          <div className="flex items-center justify-center py-16 gap-3 text-on-surface/50">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium">Memuat stok...</span>
          </div>
        )}

        {error && !isLoading && (
          <div className="p-6 text-center text-sm text-on-error-container bg-error-container/30">
            Gagal memuat data stok
          </div>
        )}

        {!isLoading && !error && sorted.length === 0 && (
          <div className="p-12 text-center text-sm text-on-surface/40 font-medium">
            Belum ada data bahan
          </div>
        )}

        {!isLoading && !error && sorted.length > 0 && (
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
              {sorted.map((item) => {
                const status = getStatus(item.stokAwal, item.threshold);
                const style  = getStatusStyle(status);
                return (
                  <tr key={item.id} className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined">{style.icon}</span>
                        </div>
                        <p className="font-bold text-primary capitalize">{item.nama}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs font-semibold px-2 py-1 bg-surface-container-high rounded text-on-surface-variant capitalize">
                        {item.kategori || 'Umum'}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <p className="font-bold text-primary">
                        {item.stokAwal}
                        <span className="text-[10px] text-on-surface-variant uppercase ml-1">{item.satuan}</span>
                      </p>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-[10px] font-bold uppercase ${style.statusClass}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${style.dotClass}`}></span>
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
