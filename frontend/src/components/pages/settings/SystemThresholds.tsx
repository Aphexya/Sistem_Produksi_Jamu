import { useState } from 'react';
import toast from 'react-hot-toast';

const STORAGE_KEY = 'settings-system-thresholds';

const defaults = {
  rawMaterial: 15,
  vesselPressure: 85,
  expiryBuffer: 30,
};

type Thresholds = typeof defaults;

export default function SystemThresholds() {
  const [thresholds, setThresholds] = useState<Thresholds>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return defaults;
    }

    try {
      return { ...defaults, ...JSON.parse(saved) };
    } catch {
      return defaults;
    }
  });

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(thresholds));
    toast.success('Ambang sistem diperbarui');
  };

  return (
    <section className="mb-16 space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h3 className="font-headline text-2xl font-bold text-primary">Ambang Batas Sistem</h3>
          <p className="mt-1 text-sm text-on-surface-variant">Konfigurasi notifikasi peringatan pintar untuk kesehatan lini produksi.</p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="rounded-full border border-secondary/20 bg-secondary/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-secondary-container shadow-sm transition-colors hover:bg-secondary/15"
        >
          Simpan Sinkronisasi
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-4 rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary-container/20 text-secondary shadow-inner">
            <span className="material-symbols-outlined text-3xl">warning</span>
          </div>
          <h4 className="font-headline text-lg font-bold text-primary">Bahan Mentah</h4>
          <p className="text-sm text-on-surface-variant/80">Peringatan saat stok jatuh di bawah kebutuhan minimum hari berjalan.</p>
          <div className="flex items-center gap-4 pt-6">
            <input
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-surface-container-highest accent-secondary"
              type="range"
              min={5}
              max={60}
              value={thresholds.rawMaterial}
              onChange={(event) => setThresholds((prev) => ({ ...prev, rawMaterial: Number(event.target.value) }))}
            />
            <span className="shrink-0 rounded bg-surface-container-high px-3 py-1 text-sm font-bold text-primary">
              {thresholds.rawMaterial}%
            </span>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-tertiary-fixed/30 text-on-tertiary-fixed-variant shadow-inner">
            <span className="material-symbols-outlined text-3xl">thermostat</span>
          </div>
          <h4 className="font-headline text-lg font-bold text-primary">Tekanan Wadah</h4>
          <p className="text-sm text-on-surface-variant/80">Toleransi aman maksimum sebelum ekstraktor merilis uap darurat.</p>
          <div className="flex items-center gap-4 pt-6">
            <input
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-surface-container-highest accent-on-tertiary-fixed-variant"
              type="range"
              min={40}
              max={100}
              value={thresholds.vesselPressure}
              onChange={(event) => setThresholds((prev) => ({ ...prev, vesselPressure: Number(event.target.value) }))}
            />
            <span className="shrink-0 rounded bg-surface-container-high px-3 py-1 text-sm font-bold text-primary">
              {thresholds.vesselPressure}%
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border-2 border-secondary-container bg-surface-container-lowest p-8 shadow-sm">
          <div className="absolute right-0 top-0 p-3 opacity-10">
            <span className="material-symbols-outlined text-[100px]">hourglass_empty</span>
          </div>
          <div className="relative z-10">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-error-container/40 text-error shadow-inner">
              <span className="material-symbols-outlined text-3xl">hourglass_empty</span>
            </div>
            <h4 className="font-headline text-lg font-bold text-error">Buffer Kedaluwarsa</h4>
            <p className="text-sm text-on-surface-variant/80">Waktu jeda untuk memindahkan stok botol sebelum pembusukan enzimatik.</p>
            <div className="flex items-center gap-4 pt-6">
              <input
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-error-container accent-error"
                type="range"
                min={7}
                max={90}
                value={thresholds.expiryBuffer}
                onChange={(event) => setThresholds((prev) => ({ ...prev, expiryBuffer: Number(event.target.value) }))}
              />
              <span className="shrink-0 rounded bg-error-container/50 px-3 py-1 text-sm font-bold text-error">
                {thresholds.expiryBuffer} Hari
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
