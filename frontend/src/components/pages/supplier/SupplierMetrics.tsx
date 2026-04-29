import { useQuery } from '@tanstack/react-query';

interface Metrics {
  total: number;
  aktif: number;
  menunggu: number;
  ditangguhkan: number;
}

async function fetchMetrics(): Promise<Metrics> {
  const res = await fetch('/api/supplier/metrics');
  if (!res.ok) throw new Error('Gagal memuat metrics');
  const json = await res.json();
  return json.data;
}

export default function SupplierMetrics() {
  const { data, isLoading } = useQuery({
    queryKey: ['supplier-metrics'],
    queryFn: fetchMetrics,
    refetchInterval: 60_000,
  });

  const total = data?.total ?? 0;
  const aktif = data?.aktif ?? 0;
  const percentage = total > 0 ? Math.round((aktif / total) * 100) : 0;

  return (
    <div className="space-y-8 h-full">
      {/* Metric 1 */}
      <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/10 relative overflow-hidden group">
        <div className="absolute -right-10 -bottom-10 opacity-5 scale-[2] pointer-events-none group-hover:scale-[2.2] transition-transform duration-700">
          <span className="material-symbols-outlined text-[150px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            local_shipping
          </span>
        </div>

        <p className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest mb-4">Total Pemasok</p>
        <div className="flex items-baseline gap-2">
          <span className={`font-headline text-5xl md:text-6xl font-light text-primary ${isLoading ? 'animate-pulse' : ''}`}>
            {isLoading ? '—' : total}
          </span>
          <span className="text-tertiary-fixed-dim font-bold text-sm bg-tertiary-fixed/10 px-2 py-1 rounded-full">
            {aktif} aktif
          </span>
        </div>

        <div className="mt-8 h-2.5 w-full bg-surface-container rounded-full overflow-hidden shadow-inner">
          <div className="h-full apothecary-gradient rounded-full transition-all duration-700" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="bg-surface-container-low p-8 rounded-2xl shadow-sm border border-outline-variant/5">
        <h4 className="font-headline text-lg font-bold mb-6 text-primary">Status Pemasok</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-tertiary-fixed"></div>
              <span className="text-sm font-medium text-on-surface">Aktif</span>
            </div>
            <span className="font-bold text-primary">{isLoading ? '—' : aktif}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-secondary-container"></div>
              <span className="text-sm font-medium text-on-surface">Menunggu</span>
            </div>
            <span className="font-bold text-on-surface-variant">{isLoading ? '—' : data?.menunggu ?? 0}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-error-container"></div>
              <span className="text-sm font-medium text-on-surface">Ditangguhkan</span>
            </div>
            <span className="font-bold text-on-surface-variant">{isLoading ? '—' : data?.ditangguhkan ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
