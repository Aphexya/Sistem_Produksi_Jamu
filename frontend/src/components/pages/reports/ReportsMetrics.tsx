export default function ReportsMetrics() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      {/* Total Produksi Bulan Ini */}
      <div className="md:col-span-1 bg-surface-container-low p-8 rounded-2xl space-y-4 shadow-sm border border-outline-variant/10">
        <span className="text-xs font-bold uppercase tracking-widest text-primary/60">Total Produksi Bulan Ini</span>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-5xl font-light font-headline text-primary tracking-tighter">1,284</span>
          <span className="text-lg font-bold text-primary/40">Liter</span>
        </div>
        <div className="flex items-center gap-2 text-tertiary-fixed-dim font-bold text-sm bg-tertiary-fixed/10 p-2 rounded-lg mt-4 border border-tertiary-fixed/20 shadow-inner">
          <span className="material-symbols-outlined text-sm">trending_up</span>
          <span>+12.4% vs bulan lalu</span>
        </div>
      </div>

      {/* Area Pengukur Efisiensi */}
      <div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-2xl shadow-sm relative overflow-hidden border border-outline-variant/10 flex flex-col justify-between">
        <div className="flex justify-between items-start z-10 relative">
          <div className="space-y-1">
            <h3 className="text-xl font-bold font-headline text-on-surface">Efisiensi Penggunaan Bahan</h3>
            <p className="text-sm text-on-surface-variant/80 font-medium">Optimalisasi ekstrak rimpang jahe dan kunyit</p>
          </div>
          <span className="text-3xl font-extrabold font-headline text-secondary">94.2%</span>
        </div>
        
        {/* Mock Grafik Visual Ekstraksi */}
        <div className="mt-8 h-24 sm:h-32 w-full flex items-end gap-1.5 z-10 relative">
          <div className="flex-1 bg-primary/10 h-[60%] rounded-t hover:bg-primary/20 hover:h-[65%] transition-all"></div>
          <div className="flex-1 bg-primary/10 h-[75%] rounded-t hover:bg-primary/20 hover:h-[80%] transition-all"></div>
          <div className="flex-1 bg-primary/10 h-[65%] rounded-t hover:bg-primary/20 hover:h-[70%] transition-all"></div>
          <div className="flex-1 bg-primary/10 h-[90%] rounded-t hover:bg-primary/20 hover:h-[95%] transition-all"></div>
          <div className="flex-1 bg-secondary/60 h-[94%] rounded-t shadow-sm shadow-secondary/20"></div>
          <div className="flex-1 bg-primary/10 h-[85%] rounded-t hover:bg-primary/20 hover:h-[90%] transition-all"></div>
          <div className="flex-1 bg-primary/10 h-[70%] rounded-t hover:bg-primary/20 hover:h-[75%] transition-all"></div>
          <div className="flex-1 bg-primary/10 h-[80%] rounded-t hover:bg-primary/20 hover:h-[85%] transition-all"></div>
        </div>
      </div>

      {/* Rasio Sampah Produksi */}
      <div className="md:col-span-1 bg-error-container p-8 rounded-2xl flex flex-col justify-between shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-on-error-container/60">Rasio Limbah (Wastage)</span>
          <div className="mt-2 text-5xl font-extrabold font-headline text-on-error-container">2.8%</div>
        </div>
        <div className="mt-4 p-4 bg-white/30 rounded-xl text-xs text-on-error-container font-bold leading-relaxed shadow-sm">
          Target limbah adalah {'<'} 3.0%. Performa saat ini masih berada dalam batas toleransi peracikan artisanal medis yang wajar.
        </div>
      </div>
    </section>
  );
}
