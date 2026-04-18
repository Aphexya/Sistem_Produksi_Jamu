export default function ProfileSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start mb-16">
      {/* Profil Pribadi */}
      <div className="bg-surface-container-lowest p-6 sm:p-10 rounded-2xl space-y-8 shadow-sm border border-outline-variant/5">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <div className="relative group shrink-0">
            <img 
              className="w-28 h-28 rounded-2xl object-cover ring-4 ring-surface-container shadow-sm group-hover:ring-primary/20 transition-all" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBviXIw8us1rcbtUPykJeMHVuxOzOZpPCXdUIMI9SoDL_9qo56R4-PmMMGiYyy9U7XUh9A04gfLuY31Af0LQT9czpiKSGYHSollgSqTcgeqkW1vxJbP9deEebiIHZ11_CiQrSghujGjTUlkiZelKK8J9bd6mexBWFt9gPQdi6VGDBWGaQjRGTOEPF6XcGu4IrKkR5ckq8i1yW8ErQ9D--GcPYWip_ebqPPid9hAakAtLYygou1m4R5mKh7fy9JzwxE_i-kuQx04OG-A" 
              alt="Profil Apoteker" 
            />
            <button className="absolute -bottom-3 -right-3 bg-secondary text-on-secondary p-2.5 rounded-xl shadow-lg hover:scale-110 active:scale-95 transition-transform flex">
              <span className="material-symbols-outlined text-sm">photo_camera</span>
            </button>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-headline font-bold text-primary">Ahmad Sulaiman</h3>
            <p className="text-on-surface-variant mt-1 font-medium bg-surface-container-low px-3 py-1 rounded inline-block text-sm">Ketua Produksi Eksekutif • Anggota sejak Jan 2022</p>
          </div>
        </div>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-outline-variant/10">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">Nama Lengkap</label>
            <input className="w-full bg-surface-container-low border border-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/20 transition-all font-body text-sm hover:bg-surface-container" type="text" defaultValue="Ahmad Sulaiman" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">Alamat Email</label>
            <input className="w-full bg-surface-container-low border border-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/20 transition-all font-body text-sm hover:bg-surface-container" type="email" defaultValue="ahmad.s@penjamuhandal.id" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">ID Pekerja</label>
            <input className="w-full bg-surface border border-outline-variant/20 rounded-xl px-4 py-3 font-body text-sm text-on-surface-variant/70 italic cursor-not-allowed" readOnly type="text" defaultValue="PH-2022-004" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">Nomor Telepon</label>
            <input className="w-full bg-surface-container-low border border-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/20 transition-all font-body text-sm hover:bg-surface-container" type="text" defaultValue="+62 811 2345 6789" />
          </div>
          <div className="col-span-1 sm:col-span-2 pt-6">
            <button type="button" className="w-full sm:w-auto apothecary-gradient text-on-primary px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-md shadow-primary/20 hover:shadow-xl hover:opacity-95 transition-all outline-none">
              SIMPAN PERUBAHAN
            </button>
          </div>
        </form>
      </div>

      {/* Tanda Tangan Digital */}
      <div className="space-y-6 h-full">
        <div className="bg-primary text-on-primary p-8 sm:p-10 rounded-2xl relative overflow-hidden shadow-lg h-full flex flex-col justify-center">
          <div className="relative z-10 flex flex-col h-full">
            <h4 className="text-xl font-headline font-extrabold mb-3">Tanda Tangan Digital</h4>
            <p className="text-primary-fixed-dim text-sm leading-relaxed mb-8 font-medium">Tanda tangan Anda diperlukan untuk otorisasi rilis bahan dan pemeriksaan kualitas akhir *Continuous Quality Control*.</p>
            <div className="flex-1 min-h-[140px] bg-white/5 hover:bg-white/10 transition-colors rounded-xl flex items-center justify-center border-2 border-dashed border-white/20 cursor-pointer group">
              <div className="flex flex-col items-center justify-center gap-2 text-white/40 group-hover:text-white/60 transition-colors">
                <span className="material-symbols-outlined text-4xl">draw</span>
                <span className="text-xs font-bold tracking-widest uppercase">Perbarui Goresan</span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-secondary/30 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-tertiary/40 blur-[60px] rounded-full pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
