export default function ReportsHeader() {
  return (
    <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
      <div className="space-y-2">
        <nav className="flex items-center gap-2 text-xs font-bold text-on-surface-variant/50 mb-2 tracking-widest uppercase">
          <span>Apoteker</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-secondary">Laporan Analitik</span>
        </nav>
        <h2 className="text-4xl md:text-5xl font-extrabold font-headline text-primary tracking-tight">Analitik Produksi</h2>
        <p className="text-on-surface-variant/80 font-medium max-w-lg text-sm md:text-base">
          Memantau keseimbangan alkemis efisiensi bahan, hasil panen produksi, dan kualitas artisanal di seluruh siklus.
        </p>
      </div>
      <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
        <button className="flex-1 md:flex-none px-5 py-3 rounded-xl text-sm font-bold bg-surface-container-high text-primary hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-sm">
          <span className="material-symbols-outlined text-lg">calendar_today</span>
          30 Hari Terakhir
        </button>
        <button className="flex-1 md:flex-none px-5 py-3 rounded-xl text-sm font-bold apothecary-gradient text-on-primary hover:opacity-90 transition-opacity flex items-center justify-center gap-2 whitespace-nowrap shadow-md">
          <span className="material-symbols-outlined text-lg">download</span>
          Ekspor PDF
        </button>
      </div>
    </section>
  );
}
