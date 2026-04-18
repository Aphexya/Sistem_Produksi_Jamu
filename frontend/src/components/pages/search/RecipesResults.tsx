export default function RecipesResults() {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6 relative">
        <div className="h-px bg-outline-variant/20 flex-1"></div>
        <div className="flex items-center gap-2 text-primary font-bold">
          <span className="material-symbols-outlined text-lg">menu_book</span>
          <h3>Resep</h3>
        </div>
        <div className="h-px bg-outline-variant/20 flex-1"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kartu Resep 1 (Terang) */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row gap-6 border border-outline-variant/10 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-4 right-4 bg-secondary-container/20 text-on-secondary-container text-[10px] font-extrabold px-2 py-1 rounded uppercase tracking-widest z-10">
            POPULER
          </div>
          
          <div className="w-full sm:w-40 h-40 rounded-xl overflow-hidden shrink-0 ring-1 ring-surface-container">
            {/* Menggunakan Image placeholder botani yg relevan */}
            <img 
              src="https://images.unsplash.com/photo-1612450519965-edcb1fc84e1b?q=80&w=600&auto=format&fit=crop" 
              alt="Beras Kencur Daily" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          <div className="flex flex-col flex-1">
            <h4 className="text-xl font-headline font-bold text-primary mb-2 mt-1">Beras Kencur Harian</h4>
            <p className="text-sm text-on-surface-variant/80 font-medium leading-relaxed flex-1">
              Eliksir peningkat energi tradisional menggunakan kencur segar, air cucian beras organik, dan sedikit madu liar. Dioptimalkan untuk batch produksi harian.
            </p>
            
            <div className="flex gap-6 mt-4 pt-4 border-t border-outline-variant/10">
              <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-bold">
                <span className="material-symbols-outlined text-sm text-primary">speed</span>
                Tingkat: Sedang
              </div>
              <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-bold">
                <span className="material-symbols-outlined text-sm text-secondary">schedule</span>
                Persiapan: 45 Menit
              </div>
            </div>
          </div>
        </div>

        {/* Kartu Resep 2 (Gelap) */}
        <div className="bg-primary hover:bg-primary/95 text-on-primary rounded-2xl p-8 shadow-sm flex flex-col justify-between relative overflow-hidden group transition-colors cursor-pointer">
          <div className="absolute -right-6 -bottom-6 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
          
          <div className="relative z-10">
            <h4 className="text-2xl font-headline font-bold mb-3 text-primary-fixed">Ekstrak Teh Kencur</h4>
            <p className="text-sm text-on-primary/80 font-medium leading-relaxed max-w-sm mb-6">
              Ekstraksi terkonsentrasi untuk campuran apotekeri premium. Profil potensi tinggi untuk campuran pernapasan.
            </p>
            <div className="inline-block text-[10px] font-extrabold uppercase tracking-[0.2em] border-b-2 border-primary-fixed/30 pb-0.5 text-primary-fixed">
              STANDAR LABORATORIUM
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-8 relative z-10">
            <span className="text-sm font-bold tracking-wide">Waktu Ekstraksi: 20 Menit</span>
            <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center group-hover:scale-110 active:scale-95 transition-transform shadow-lg shadow-secondary/20">
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
