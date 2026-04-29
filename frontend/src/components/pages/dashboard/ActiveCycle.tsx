import { useQuery } from '@tanstack/react-query';

interface Batch {
  id_produksi: number;
  kode_batch: string;
  nama_jamu: string;
  status: 'antrian' | 'ekstraksi' | 'botolisasi' | 'selesai';
  ukuran_batch: number;
}

// Mapping status batch ke step progress
const STEPS = [
  { label: 'Persiapan',  icon: 'check',                statuses: [] as string[] },
  { label: 'Ekstraksi',  icon: 'local_fire_department', statuses: ['ekstraksi'] },
  { label: 'Perebusan',  icon: 'local_fire_department', statuses: [] },
  { label: 'Filtrasi',   icon: 'science',               statuses: [] },
  { label: 'Pembotolan', icon: 'inventory',             statuses: ['botolisasi', 'selesai'] },
];

function getStepStatus(stepIndex: number, batchStatus: string) {
  const order: Record<string, number> = { antrian: 0, ekstraksi: 1, botolisasi: 3, selesai: 4 };
  const current = order[batchStatus] ?? 0;
  if (stepIndex < current) return 'done';
  if (stepIndex === current) return 'active';
  return 'pending';
}

function getProgressWidth(status: string) {
  const map: Record<string, string> = {
    antrian:    '0%',
    ekstraksi:  '25%',
    botolisasi: '75%',
    selesai:    '100%',
  };
  return map[status] ?? '0%';
}

async function fetchAktif(): Promise<Batch | null> {
  const res = await fetch('/api/produksi?status=ekstraksi');
  if (!res.ok) throw new Error('Gagal memuat siklus aktif');
  const json = await res.json();
  const list: Batch[] = Array.isArray(json.data) ? json.data : [];
  return list[0] ?? null;
}

export default function ActiveCycle() {
  const { data: batch, isLoading } = useQuery({
    queryKey: ['active-cycle'],
    queryFn: fetchAktif,
    refetchInterval: 15_000,
  });

  return (
    <section className="bg-surface-container-low p-8 rounded-2xl">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h3 className="text-2xl font-bold text-primary mb-1 font-headline">Siklus Saat Ini</h3>
          <p className="text-on-surface-variant text-sm">
            {isLoading
              ? 'Memuat data...'
              : batch
                ? `Batch Aktif: ${batch.kode_batch} (${batch.nama_jamu})`
                : 'Tidak ada batch yang sedang berjalan'}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-primary font-bold text-sm hover:bg-surface-container-highest rounded-lg transition-colors">
            Lihat Log
          </button>
          <button
            disabled={!batch}
            className="px-6 py-2 bg-primary text-on-primary font-bold text-sm rounded-lg shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Jeda Siklus
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Progress Stepper */}
        <div className="lg:col-span-3">
          <div className="relative py-12">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-outline-variant -translate-y-1/2 opacity-30"></div>
            <div
              className="absolute top-1/2 left-0 h-1 bg-secondary -translate-y-1/2 transition-all duration-700"
              style={{ width: batch ? getProgressWidth(batch.status) : '0%' }}
            ></div>
            <div className="relative flex justify-between">
              {STEPS.map((step, i) => {
                const stepStatus = batch ? getStepStatus(i, batch.status) : 'pending';
                return (
                  <div key={step.label} className="flex flex-col items-center gap-3">
                    {stepStatus === 'done' && (
                      <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center z-10 shadow-lg">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                      </div>
                    )}
                    {stepStatus === 'active' && (
                      <div className="w-12 h-12 rounded-full border-4 border-secondary bg-surface text-secondary flex items-center justify-center z-10 shadow-xl ring-8 ring-secondary/10 -mt-1">
                        <span className="material-symbols-outlined animate-pulse">{step.icon}</span>
                      </div>
                    )}
                    {stepStatus === 'pending' && (
                      <div className="w-10 h-10 rounded-full bg-surface border-2 border-outline-variant text-outline flex items-center justify-center z-10">
                        <span className="material-symbols-outlined text-sm">{step.icon}</span>
                      </div>
                    )}
                    <span className={`text-xs font-bold uppercase tracking-widest ${
                      stepStatus === 'done'   ? 'text-primary' :
                      stepStatus === 'active' ? 'text-secondary' :
                      'text-on-surface-variant opacity-50'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Info Batch */}
        <div className="bg-surface-container-highest p-6 rounded-xl space-y-4">
          <div className="flex justify-between text-xs font-bold uppercase text-on-surface-variant opacity-60">
            <span>Ukuran Batch</span>
            <span>Target</span>
          </div>
          <div className="text-3xl font-extrabold text-primary font-headline">
            {isLoading ? '—' : batch ? `${batch.ukuran_batch} kg` : '—'}
          </div>
          <div className="flex justify-between text-xs font-bold uppercase text-on-surface-variant opacity-60">
            <span>Status</span>
          </div>
          <div className="text-xl font-extrabold text-secondary font-headline capitalize">
            {isLoading ? '—' : batch?.status ?? 'Tidak ada'}
          </div>
        </div>
      </div>
    </section>
  );
}
