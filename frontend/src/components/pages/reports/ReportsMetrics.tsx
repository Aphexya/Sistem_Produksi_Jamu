import { useQuery } from '@tanstack/react-query';

interface Metrics {
  totalBatch: number;
  produksiAktif: number;
  produksiSelesai: number;
  stokKritis: number;
}

async function fetchMetrics(): Promise<Metrics> {
  const res = await fetch('/api/produksi/metrics');
  if (!res.ok) throw new Error('Gagal memuat metrics');
  const json = await res.json();
  return json.data;
}

export default function ReportsMetrics() {
  const { data, isLoading } = useQuery({
    queryKey: ['reports-metrics'],
    queryFn: fetchMetrics,
    refetchInterval: 30_000,
  });

  const selesai = data?.produksiSelesai ?? 0;
  const total   = data?.totalBatch ?? 0;
  const efisiensiPct = total > 0 ? Math.round((selesai / total) * 100) : 0;

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      {/* Total Batch */}
      <div className="md:col-span-1 bg-surface-container-low p-8 rounded-2xl space-y-4 shadow-sm border border-outline-variant/10">
        <span className="text-xs font-bold uppercase tracking-widest text-primary/60">Total Batch</span>
        <div className="flex items-baseline gap-2 mt-2">
          <span className={`text-5xl font-light font-headline text-primary tracking-tighter ${isLoading ? 'animate-pulse' : ''}`}>
            {isLoading ? '—' : total}
          </span>
          <span className="text-lg font-bold text-primary/40">Batch</span>
        </div>
        <div className="flex items-center gap-2 text-tertiary-fixed-dim font-bold text-sm bg-tertiary-fixed/10 p-2 rounded-lg mt-4 border border-tertiary-fixed/20 shadow-inner">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          <span>{isLoading ? '—' : selesai} selesai</span>
        </div>
      </div>

      {/* Efisiensi */}
      <div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-2xl shadow-sm relative overflow-hidden border border-outline-variant/10 flex flex-col justify-between">
        <div className="flex justify-between items-start z-10 relative">
          <div className="space-y-1">
            <h3 className="text-xl font-bold font-headline text-on-surface">Tingkat Penyelesaian Batch</h3>
            <p className="text-sm text-on-surface-variant/80 font-medium">
              {isLoading ? 'Memuat...' : `${selesai} dari ${total} batch selesai`}
            </p>
          </div>
          <span className={`text-3xl font-extrabold font-headline text-secondary ${isLoading ? 'animate-pulse' : ''}`}>
            {isLoading ? '—' : `${efisiensiPct}%`}
          </span>
        </div>

        {/* Bar chart visual */}
        <div className="mt-8 h-24 sm:h-32 w-full flex items-end gap-1.5 z-10 relative">
          {[60, 75, 65, 90, efisiensiPct, 85, 70, 80].map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t transition-all ${i === 4 ? 'bg-secondary/60 shadow-sm shadow-secondary/20' : 'bg-primary/10 hover:bg-primary/20'}`}
              style={{ height: `${h}%` }}
            ></div>
          ))}
        </div>
      </div>

      {/* Stok Kritis */}
      <div className="md:col-span-1 bg-error-container p-8 rounded-2xl flex flex-col justify-between shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-on-error-container/60">Stok Kritis</span>
          <div className={`mt-2 text-5xl font-extrabold font-headline text-on-error-container ${isLoading ? 'animate-pulse' : ''}`}>
            {isLoading ? '—' : data?.stokKritis ?? 0}
          </div>
        </div>
        <div className="mt-4 p-4 bg-white/30 rounded-xl text-xs text-on-error-container font-bold leading-relaxed shadow-sm">
          {(data?.stokKritis ?? 0) === 0
            ? 'Semua stok bahan dalam kondisi aman.'
            : `${data?.stokKritis} bahan di bawah batas minimum. Segera lakukan restock.`}
        </div>
      </div>
    </section>
  );
}
