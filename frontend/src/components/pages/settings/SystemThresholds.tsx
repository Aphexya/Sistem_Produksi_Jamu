export default function SystemThresholds() {
  return (
    <section className="space-y-8 mb-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h3 className="text-2xl font-headline font-bold text-primary">Ambang Batas Sistem</h3>
          <p className="text-on-surface-variant font-body text-sm mt-1">Konfigurasi notifikasi peringatan pintar untuk kesehatan lini produksi.</p>
        </div>
        <span className="text-xs font-bold text-secondary-container bg-secondary/10 border border-secondary/20 px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
          SINKRONISASI AKTIF
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ambang Batas 1 */}
        <div className="bg-surface-container-lowest p-8 rounded-2xl space-y-4 shadow-sm border border-outline-variant/10">
          <div className="w-14 h-14 bg-secondary-container/20 rounded-2xl flex items-center justify-center text-secondary shadow-inner">
            <span className="material-symbols-outlined text-3xl">warning</span>
          </div>
          <h4 className="font-headline font-bold text-lg text-primary">Bahan Mentah</h4>
          <p className="text-sm text-on-surface-variant/80">Peringatan saat stok jatuh di bawah kebutuhan minimum hari berjalan.</p>
          <div className="pt-6 flex items-center gap-4">
            <input className="w-full h-2 rounded-lg appearance-none bg-surface-container-highest cursor-pointer accent-secondary" type="range" defaultValue={15} />
            <span className="font-bold text-primary bg-surface-container-high px-3 py-1 rounded text-sm shrink-0">15%</span>
          </div>
        </div>

        {/* Ambang Batas 2 */}
        <div className="bg-surface-container-lowest p-8 rounded-2xl space-y-4 shadow-sm border border-outline-variant/10">
          <div className="w-14 h-14 bg-tertiary-fixed/30 rounded-2xl flex items-center justify-center text-on-tertiary-fixed-variant shadow-inner">
            <span className="material-symbols-outlined text-3xl">thermostat</span>
          </div>
          <h4 className="font-headline font-bold text-lg text-primary">Tekanan Wadah</h4>
          <p className="text-sm text-on-surface-variant/80">Toleransi aman maksimum sebelum ekstraktor merilis uap darurat.</p>
          <div className="pt-6 flex items-center gap-4">
            <input className="w-full h-2 rounded-lg appearance-none bg-surface-container-highest cursor-pointer accent-on-tertiary-fixed-variant" type="range" defaultValue={85} />
            <span className="font-bold text-primary bg-surface-container-high px-3 py-1 rounded text-sm shrink-0">85%</span>
          </div>
        </div>

        {/* Ambang Batas 3 */}
        <div className="bg-surface-container-lowest p-8 rounded-2xl space-y-4 shadow-sm border-2 border-secondary-container relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <span className="material-symbols-outlined text-[100px]">hourglass_empty</span>
          </div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-error-container/40 rounded-2xl flex items-center justify-center text-error shadow-inner mb-4">
              <span className="material-symbols-outlined text-3xl">hourglass_empty</span>
            </div>
            <h4 className="font-headline font-bold text-lg text-error">Buffer Kedaluwarsa</h4>
            <p className="text-sm text-on-surface-variant/80">Waktu jeda untuk memindahkan stok botol sebelum pembusukan enzimatik.</p>
            <div className="pt-6 flex items-center gap-4">
              <input className="w-full h-2 rounded-lg appearance-none bg-error-container cursor-pointer accent-error" type="range" defaultValue={30} />
              <span className="font-bold text-error bg-error-container/50 px-3 py-1 rounded text-sm shrink-0">30 Hari</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
