import { Link } from 'react-router-dom';
import { useSpiceStock, getStatus, STATUS_STYLE, formatStok } from '../../../hooks/useSpiceStock';

export default function SpiceStock() {
  const { kritis, isLoading, error } = useSpiceStock();
  return (
    <div className="xl:col-span-3 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-on-surface font-headline">Stok Kritis</h3>
        <Link
          to="/inventory"
          className="text-sm font-bold text-on-surface flex items-center gap-1 hover:opacity-70 transition-opacity"
        >
          Inventaris Lengkap
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Link>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden border border-outline-variant/10">

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-16 gap-3 text-on-surface/40">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Memuat stok...</span>
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="p-6 text-center text-sm text-on-error-container bg-error-container/30 font-medium">
            Gagal memuat data stok
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && kritis.length === 0 && (
          <div className="p-10 text-center">
            <span className="material-symbols-outlined text-4xl text-on-surface/20 block mb-2">check_circle</span>
            <p className="text-sm text-on-surface/40 font-medium">Semua stok dalam kondisi aman</p>
          </div>
        )}

        {/* Table */}
        {!isLoading && !error && kritis.length > 0 && (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/10">
                <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Nama Bahan</th>
                <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Kategori</th>
                <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right">Stok</th>
                <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {kritis.map((item) => {
                const status = getStatus(item.stokAwal, item.threshold);
                const style = STATUS_STYLE[status];
                return (
                  <tr key={item.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-bold text-on-surface capitalize text-sm">{item.nama}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-semibold px-2.5 py-1 bg-surface-container rounded text-on-surface-variant capitalize">
                        {item.kategori || 'Umum'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="font-bold text-on-surface text-sm">
                        {formatStok(item.stokAwal)}
                        <span className="text-[10px] text-on-surface-variant uppercase ml-1 font-semibold">{item.satuan}</span>
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest ${style.pill}`}>
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${style.dot}`} />
                        {style.label}
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
