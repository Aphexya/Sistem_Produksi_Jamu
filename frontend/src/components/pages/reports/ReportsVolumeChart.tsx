export default function ReportsVolumeChart() {
  return (
    <div className="md:col-span-2 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-2xl font-bold font-headline text-primary">Volume Produksi Berjalan</h3>
        <div className="flex items-center gap-4 text-xs font-bold px-4 py-2 bg-surface-container-low rounded-lg shadow-sm">
          <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary shadow-sm"></div> Ekstraksi</span>
          <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-secondary shadow-sm"></div> Botolisasi</span>
        </div>
      </div>
      
      <div className="bg-surface-container-low h-80 sm:h-96 rounded-2xl p-4 sm:p-8 flex items-end justify-between gap-2 sm:gap-4 shadow-sm border border-outline-variant/10">
        {/* Visual Custo Bar Chart */}
        <div className="relative flex-1 group h-full">
          <div className="absolute bottom-6 left-0 right-0 bg-primary/20 h-40 sm:h-48 rounded-t-lg group-hover:h-44 sm:group-hover:h-56 transition-all duration-500"></div>
          <div className="absolute bottom-6 left-1 right-1 bg-primary h-24 sm:h-32 rounded-t-lg shadow-sm"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary/40">SEN</div>
        </div>
        <div className="relative flex-1 group h-full">
          <div className="absolute bottom-6 left-0 right-0 bg-primary/20 h-48 sm:h-56 rounded-t-lg group-hover:h-52 sm:group-hover:h-64 transition-all duration-500"></div>
          <div className="absolute bottom-6 left-1 right-1 bg-primary h-32 sm:h-40 rounded-t-lg shadow-sm"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary/40">SEL</div>
        </div>
        <div className="relative flex-1 group h-full">
          <div className="absolute bottom-6 left-0 right-0 bg-primary/20 h-32 sm:h-40 rounded-t-lg group-hover:h-36 sm:group-hover:h-48 transition-all duration-500"></div>
          <div className="absolute bottom-6 left-1 right-1 bg-primary h-16 sm:h-24 rounded-t-lg shadow-sm"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary/40">RAB</div>
        </div>
        <div className="relative flex-1 group h-full">
          <div className="absolute bottom-6 left-0 right-0 bg-secondary/20 h-56 sm:h-72 rounded-t-lg"></div>
          <div className="absolute bottom-6 left-1 right-1 bg-secondary h-44 sm:h-60 rounded-t-lg shadow-md shadow-secondary/30"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-bold text-secondary">KAM</div>
        </div>
        <div className="relative flex-1 group h-full">
          <div className="absolute bottom-6 left-0 right-0 bg-primary/20 h-44 sm:h-52 rounded-t-lg group-hover:h-48 sm:group-hover:h-60 transition-all duration-500"></div>
          <div className="absolute bottom-6 left-1 right-1 bg-primary h-28 sm:h-36 rounded-t-lg shadow-sm"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary/40">JUM</div>
        </div>
        <div className="relative flex-1 group h-full">
          <div className="absolute bottom-6 left-0 right-0 bg-primary/20 h-36 sm:h-44 rounded-t-lg group-hover:h-40 sm:group-hover:h-52 transition-all duration-500"></div>
          <div className="absolute bottom-6 left-1 right-1 bg-primary h-20 sm:h-28 rounded-t-lg shadow-sm"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary/40">SAB</div>
        </div>
      </div>
    </div>
  );
}
