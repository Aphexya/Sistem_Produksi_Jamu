export default function SupplierHeader() {
  return (
    <section className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6">
      <div>
        <nav className="flex items-center gap-2 text-xs font-bold text-on-surface-variant/50 mb-2 tracking-widest uppercase">
          <span>Apoteker</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-secondary">Sumber Bahan</span>
        </nav>
        <h3 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-primary mb-2">Jejaring Pemasok</h3>
        <p className="text-on-surface-variant font-body text-sm md:text-base">
          Mengelola 124 pemasok artisanal terkurasi di seluruh kepulauan Nusantara.
        </p>
      </div>
      <button className="flex items-center justify-center gap-2 bg-secondary text-white px-6 py-3.5 rounded-xl font-headline font-bold text-sm shadow-xl shadow-secondary/20 hover:bg-secondary/90 transition-all active:scale-95 w-full sm:w-auto">
        <span className="material-symbols-outlined text-xl">add</span>
        Tambah Pemasok Baru
      </button>
    </section>
  );
}
