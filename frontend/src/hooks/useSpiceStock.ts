import { useQuery } from '@tanstack/react-query';

export interface Bahan {
  id: number;
  nama: string;
  kategori: string;
  satuan: string;
  stokAwal: number;
  threshold: number;
}

export type StokStatus = 'Kosong' | 'Kritis' | 'Peringatan' | 'Sehat';

export interface StatusStyle {
  pill: string;
  dot: string;
  label: string;
}

// ─── Business logic ────────────────────────────────────────────

export function getStatus(stok: number | string, threshold: number | string): StokStatus {
  const s = Number(stok);
  const t = Number(threshold);
  if (s <= 0)    return 'Kosong';
  if (s <= t)    return 'Kritis';
  if (s <= t * 1.5) return 'Peringatan';
  return 'Sehat';
}

export const STATUS_STYLE: Record<StokStatus, StatusStyle> = {
  Sehat:      { pill: 'bg-[#d4f5d4] text-[#1a7a3a]',      dot: 'bg-[#2ecc71]', label: 'SEHAT' },
  Peringatan: { pill: 'bg-[#ffd88a] text-[#7a4e00]',      dot: 'bg-[#f39c12]', label: 'PERINGATAN' },
  Kritis:     { pill: 'bg-[#ffd5d5] text-[#9b1c1c]',      dot: 'bg-[#e74c3c]', label: 'KRITIS' },
  Kosong:     { pill: 'bg-surface-container text-on-surface-variant', dot: 'bg-outline', label: 'KOSONG' },
};

export function formatStok(val: number | string): string {
  const n = Number(val); // handle string dari MySQL DECIMAL
  if (isNaN(n)) return '0';
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

// ─── Data fetching ─────────────────────────────────────────────

async function fetchBahan(): Promise<Bahan[]> {
  const res = await fetch('/api/bahan', { credentials: 'include' });
  if (!res.ok) throw new Error('Gagal memuat stok');
  const json = await res.json();
  return Array.isArray(json.data) ? json.data : [];
}

// ─── Hook ──────────────────────────────────────────────────────

export function useSpiceStock() {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ['spice-stock'],
    queryFn: fetchBahan,
    refetchInterval: 30_000,
  });

  // Hanya bahan Kritis atau Kosong, diurutkan dari stok paling sedikit
  const kritis = data
    .filter((item) => {
      const s = getStatus(item.stokAwal, item.threshold);
      return s === 'Kritis' || s === 'Kosong';
    })
    .sort((a, b) => a.stokAwal - b.stokAwal);

  return { kritis, isLoading, error: error as Error | null };
}

// ─── Summary hook (untuk card dashboard) ──────────────────────

export interface BahanSummary {
  total:          number;
  totalKritis:    number;
  totalKosong:    number;
  totalAman:      number;
  totalPerhatian: number;
}

async function fetchSummary(): Promise<BahanSummary> {
  const res = await fetch('/api/bahan/summary', { credentials: 'include' });
  if (!res.ok) throw new Error('Gagal memuat summary');
  const json = await res.json();
  return json.data;
}

/**
 * Hook untuk card "Stok Kritis" di DashboardMetrics.
 * Mengambil data aggregat langsung dari backend — lebih efisien
 * daripada mengambil semua bahan lalu menghitung di client.
 */
export function useBahanSummary() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['bahan-summary'],
    queryFn: fetchSummary,
    refetchInterval: 30_000,
  });

  return {
    summary:   data ?? { total: 0, totalKritis: 0, totalKosong: 0, totalAman: 0, totalPerhatian: 0 },
    isLoading,
    error: error as Error | null,
  };
}
