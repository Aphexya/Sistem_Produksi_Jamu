export default function UsersHeader() {
  return (
    <>
      {/* Navigation Tabs - Lokalnya mirip TopBar sekunder */}
      <div className="flex gap-8 border-b border-outline-variant/15 mb-10 overflow-x-auto">
        <button className="pb-4 text-on-surface-variant font-bold text-sm tracking-wide">Ringkasan</button>
        <button className="pb-4 border-b-4 border-primary text-primary font-bold text-sm tracking-wide">Semua Staf</button>
        <button className="pb-4 text-on-surface-variant font-bold text-sm tracking-wide">Peran Akses</button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div className="space-y-2">
          <p className="text-xs font-extrabold text-secondary tracking-widest uppercase">Tata Kelola & Akses</p>
          <h2 className="text-4xl md:text-5xl font-extrabold font-headline text-primary tracking-tight">Personel & Peran</h2>
          <p className="text-on-surface-variant font-medium text-sm md:text-base max-w-xl">
            Kelola staf apotekeri Anda, tetapkan otoritas pembuatan, dan pantau protokol keamanan sistem.
          </p>
        </div>
        <button className="bg-primary text-on-primary px-6 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm hover:opacity-95 transition-all w-full md:w-auto shrink-0 group">
          <span className="material-symbols-outlined text-lg group-hover:rotate-90 transition-transform">person_add</span>
          Tambah Pengguna
        </button>
      </div>
    </>
  );
}
