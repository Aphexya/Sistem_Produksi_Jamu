export default function DashboardMetrics() {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold text-primary tracking-tight mb-2 font-headline">
          Ikhtisar Produksi
        </h2>
        <p className="text-on-surface-variant">Memantau denyut nadi ekstraksi herbal terbaik Madura.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Batch */}
        <div className="bg-surface-container-lowest p-8 rounded-2xl flex flex-col gap-4 shadow-sm border-l-4 border-primary">
          <span className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Total Batch</span>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-extrabold text-primary font-headline">128</span>
            <span className="text-tertiary-fixed-dim font-bold text-sm">+12% vs bulan lalu</span>
          </div>
          <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[65%]"></div>
          </div>
        </div>

        {/* Stok Kritis */}
        <div className="bg-error-container p-8 rounded-2xl flex flex-col gap-4 shadow-sm relative overflow-hidden">
          <div className="z-10 flex flex-col gap-4">
            <span className="text-sm font-bold text-on-error-container uppercase tracking-widest">
              Stok Kritis
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-extrabold text-on-error-container font-headline">04</span>
              <span className="text-on-error-container/70 font-semibold text-sm">Tindakan diperlukan</span>
            </div>
            <p className="text-sm text-on-error-container/80">
              Stok Temulawak, Jahe Merah di bawah 5kg.
            </p>
          </div>
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl text-on-error-container/10">
            warning
          </span>
        </div>

        {/* Produksi Aktif */}
        <div className="bg-secondary-container p-8 rounded-2xl flex flex-col gap-4 shadow-sm">
          <span className="text-sm font-bold text-on-secondary-container uppercase tracking-widest">
            Produksi Aktif
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-extrabold text-on-secondary-container font-headline">07</span>
            <span className="text-on-secondary-container/70 font-semibold text-sm">Siklus berjalan</span>
          </div>
          <div className="flex -space-x-2 overflow-hidden mt-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center ring-2 ring-secondary-container">
              <span className="material-symbols-outlined text-on-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-primary-container flex items-center justify-center ring-2 ring-secondary-container">
              <span className="material-symbols-outlined text-on-primary-container text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-on-secondary-container/10 flex items-center justify-center ring-2 ring-secondary-container text-[10px] font-bold text-on-secondary-container">
              +4
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
