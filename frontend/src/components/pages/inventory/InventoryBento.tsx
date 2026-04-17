export default function InventoryBento() {
  return (
    <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Automated Ordering */}
      <div className="lg:col-span-8 bg-primary-container text-on-primary-container p-8 rounded-[2rem] flex flex-col md:flex-row items-start md:items-center justify-between overflow-hidden relative shadow-md">
        <div className="relative z-10 w-full">
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 font-headline">Pemesanan Otomatis</h3>
          <p className="text-on-primary-container/80 max-w-sm mb-6 text-sm md:text-base">
            Bahan baku dengan stok rendah saat ini diatur untuk memicu notifikasi. Aktifkan Auto-PO untuk menjembatani celah dengan pemasok secara otomatis.
          </p>
          <button className="w-full sm:w-auto px-6 py-3 bg-secondary text-on-secondary font-bold rounded-xl shadow-lg shadow-black/10 hover:brightness-110 active:scale-95 transition-all">
            Konfigurasi Sumber Cerdas
          </button>
        </div>
        <div className="absolute -right-10 -bottom-10 opacity-10 scale-[1.5] md:scale-[2]">
          <span className="material-symbols-outlined text-[200px] md:text-[300px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            hub
          </span>
        </div>
      </div>

      {/* Supply Volatility */}
      <div className="lg:col-span-4 bg-secondary-fixed p-8 rounded-[2rem] flex flex-col justify-between shadow-md">
        <div>
          <div className="w-12 h-12 bg-on-secondary-fixed rounded-2xl flex items-center justify-center text-secondary-fixed-dim mb-6 shadow-inner">
            <span className="material-symbols-outlined">analytics</span>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-on-secondary-fixed/60">Volatilitas Pasokan</p>
          <h3 className="text-3xl font-extrabold text-on-secondary-fixed mt-1 font-headline">
            +12% <span className="text-lg font-medium opacity-60 ml-1">Minggu Ini</span>
          </h3>
        </div>
        
        {/* Mock Chart */}
        <div className="mt-8 flex items-end gap-1.5 h-20">
          <div className="h-[30%] w-full bg-on-secondary-fixed/15 rounded-t-sm hover:h-[35%] transition-all"></div>
          <div className="h-[50%] w-full bg-on-secondary-fixed/15 rounded-t-sm hover:h-[55%] transition-all"></div>
          <div className="h-[70%] w-full bg-on-secondary-fixed/15 rounded-t-sm hover:h-[75%] transition-all"></div>
          <div className="h-[40%] w-full bg-on-secondary-fixed/15 rounded-t-sm hover:h-[45%] transition-all"></div>
          <div className="h-[60%] w-full bg-on-secondary-fixed/15 rounded-t-sm hover:h-[65%] transition-all"></div>
          <div className="h-[100%] w-full bg-on-secondary-fixed rounded-t-sm shadow-sm opacity-90 hover:opacity-100 transition-all"></div>
        </div>
      </div>
    </div>
  );
}
