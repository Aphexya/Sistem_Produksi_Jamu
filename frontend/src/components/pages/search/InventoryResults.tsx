export default function InventoryResults() {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6 relative">
        <div className="h-px bg-outline-variant/20 flex-1"></div>
        <div className="flex items-center gap-2 text-primary font-bold">
          <span className="material-symbols-outlined text-lg">inventory_2</span>
          <h3>Inventaris</h3>
        </div>
        <div className="h-px bg-outline-variant/20 flex-1"></div>
      </div>

      {/* Baris Inventaris Tunggal */}
      <div className="bg-surface-container-lowest hover:bg-surface-container-low/50 rounded-2xl p-6 shadow-sm border border-outline-variant/10 flex flex-col sm:flex-row items-center justify-between gap-6 transition-colors">
        <div className="flex items-center gap-6 w-full sm:w-auto">
          <div className="w-14 h-14 bg-surface-container-low rounded-xl flex items-center justify-center text-primary shadow-inner shrink-0">
            <span className="material-symbols-outlined text-3xl">eco</span>
          </div>
          <div>
            <h4 className="font-headline font-bold text-lg text-primary">Kencur (Sand Ginger)</h4>
            <p className="text-xs text-on-surface-variant font-medium italic">Kaempferia galanga</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center justify-between sm:justify-end gap-x-12 gap-y-4 w-full sm:w-auto pr-2">
          <div className="text-center sm:text-right">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">STOK SAAT INI</p>
            <p className="text-2xl font-headline font-extrabold text-primary">500g</p>
          </div>
          
          <div className="text-center sm:text-right">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">STATUS STOK</p>
            <div className="bg-tertiary-fixed/30 text-on-tertiary-fixed-variant px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-on-tertiary-fixed-variant"></div>
              Sehat
            </div>
          </div>
          
          <button className="flex items-center gap-1.5 text-sm font-bold text-primary hover:text-secondary group transition-colors">
            Lihat Riwayat
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">trending_up</span>
          </button>
        </div>
      </div>
    </div>
  );
}
