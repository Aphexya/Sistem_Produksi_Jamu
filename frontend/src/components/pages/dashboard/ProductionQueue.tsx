const batches = [
  {
    code: '#BCH-083',
    name: 'Beras Kencur Premium',
    estimate: 'Estimasi: 14:30 Hari Ini',
    detail: 'Volume: 500L | Kelas: A+',
    status: 'PENDING',
  },
  {
    code: '#BCH-084',
    name: 'Madu Jahe Merah',
    estimate: 'Estimasi: 09:00 Besok',
    detail: 'Volume: 200L | Kelas: Reserve',
    status: 'ANTRIAN',
  },
];

export default function ProductionQueue() {
  return (
    <div className="xl:col-span-2 space-y-6">
      <h3 className="text-2xl font-bold text-primary font-headline">Antrean Produksi</h3>
      <div className="space-y-4">
        {batches.map((batch) => (
          <div
            key={batch.code}
            className="bg-surface-container-low border border-outline-variant/15 p-6 rounded-xl hover:translate-x-2 transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="bg-primary-container text-on-primary-container px-3 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase">
                {batch.code}
              </div>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase opacity-60">
                {batch.estimate}
              </span>
            </div>
            <h4 className="text-lg font-bold text-primary mb-1">{batch.name}</h4>
            <p className="text-sm text-on-surface-variant mb-4">{batch.detail}</p>
            <div className="flex items-center gap-3">
              <div className="h-1 flex-1 bg-outline-variant/20 rounded-full overflow-hidden">
                <div className="h-full bg-primary/20 w-0"></div>
              </div>
              <span className="text-xs font-bold text-primary/40 uppercase">{batch.status}</span>
            </div>
          </div>
        ))}

        {/* Empty slot */}
        <div className="bg-surface-container-highest/40 p-12 border-2 border-dashed border-outline-variant/20 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container-highest/60 transition-colors">
          <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">add_task</span>
          <p className="text-sm font-bold text-on-surface-variant/40">Tambah Batch Produksi Baru</p>
        </div>
      </div>
    </div>
  );
}
