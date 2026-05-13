import { useQuery } from '@tanstack/react-query';

export interface Metrics {
  totalBatch: number;
  produksiAktif: number;
  stokKritis: number;
  stokKosong: number;
}

async function fetchMetrics(): Promise<Metrics> {
  const res = await fetch('/api/produksi/metrics', { credentials: 'include' });
  if (!res.ok) throw new Error('Gagal memuat metrics');
  const json = await res.json();
  return json.data;
}

export function useDashboardMetrics() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: fetchMetrics,
    refetchInterval: 30_000,
    // Jangan crash jika endpoint belum tersedia
    retry: false,
  });

  return {
    data,
    isLoading,
    error: error as Error | null,
    totalBatch:    isLoading ? '—' : (data?.totalBatch    ?? 0),
    produksiAktif: isLoading ? '—' : (data?.produksiAktif ?? 0),
  };
}
