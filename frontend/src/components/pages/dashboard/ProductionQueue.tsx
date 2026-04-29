import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface Batch {
  id_produksi: number;
  kode_batch: string;
  nama_jamu: string;
  ukuran_batch: number;
  volume_output: number | null;
  status: 'antrian' | 'ekstraksi' | 'botolisasi' | 'selesai';
  created_at: string;
}

const STATUS_LABEL: Record<string, string> = {
  antrian:    'ANTRIAN',
  ekstraksi:  'EKSTRAKSI',
  botolisasi: 'BOTOLISASI',
  selesai:    'SELESAI',
};

async function fetchAntrian(): Promise<Batch[]> {
  const res = await fetch('/api/produksi?status=antrian');
  if (!res.ok) throw new Error('Gagal memuat antrian');
  const json = await res.json();
  return Array.isArray(json.data) ? json.data.slice(0, 3) : [];
}

export default function ProductionQueue() {
  const navigate = useNavigate();
  const { data: batches = [], isLoading } = useQuery({
    queryKey: ['production-queue'],
    queryFn: fetchAntrian,
    refetchInterval: 15_000,
  });

  return (
    <div className="xl:col-span-2 space-y-6">
      <h3 className="text-2xl font-bold text-primary font-headline">Antrean Produksi</h3>
      <div className="space-y-4">

        {isLoading && (
          <div className="flex items-center justify-center py-10 gap-3 text-on-surface/40">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">Memuat antrian...</span>
          </div>
        )}

        {!isLoading && batches.map((batch) => (
          <div
            key={batch.id_produksi}
            className="bg-surface-container-low border border-outline-variant/15 p-6 rounded-xl hover:translate-x-2 transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="bg-primary-container text-on-primary-container px-3 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase">
                {batch.kode_batch}
              </div>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase opacity-60">
                {new Date(batch.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
              </span>
            </div>
            <h4 className="text-lg font-bold text-primary mb-1 capitalize">{batch.nama_jamu}</h4>
            <p className="text-sm text-on-surface-variant mb-4">
              Batch: {batch.ukuran_batch ?? '—'} kg
              {batch.volume_output ? ` | Output: ${batch.volume_output} L` : ''}
            </p>
            <div className="flex items-center gap-3">
              <div className="h-1 flex-1 bg-outline-variant/20 rounded-full overflow-hidden">
                <div className="h-full bg-primary/20 w-0"></div>
              </div>
              <span className="text-xs font-bold text-primary/40 uppercase">
                {STATUS_LABEL[batch.status] ?? batch.status}
              </span>
            </div>
          </div>
        ))}

        {!isLoading && batches.length === 0 && (
          <div className="bg-surface-container-highest/20 p-8 rounded-xl text-center text-sm text-on-surface/40 font-medium border border-dashed border-outline-variant/20">
            Tidak ada batch dalam antrian
          </div>
        )}

        {/* Tambah batch baru */}
        <div
          onClick={() => navigate('/production')}
          className="bg-surface-container-highest/40 p-12 border-2 border-dashed border-outline-variant/20 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container-highest/60 transition-colors"
        >
          <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">add_task</span>
          <p className="text-sm font-bold text-on-surface-variant/40">Tambah Batch Produksi Baru</p>
        </div>
      </div>
    </div>
  );
}
