export default function RecipeDetailContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      
      {/* Kolom Utama (Kiri & Tengah) */}
      <div className="lg:col-span-2 space-y-10">
        
        {/* Bahan Utama */}
        <div className="bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/10 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary-container text-on-primary-container rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">nutrition</span>
            </div>
            <h3 className="text-2xl font-bold font-headline text-primary">Komposisi Botani</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex justify-between items-center bg-surface-container-low p-4 rounded-xl border border-outline-variant/10">
              <span className="font-bold text-on-surface">Curcuma longa (Kunyit)</span>
              <span className="text-sm font-bold text-on-surface-variant/70">12 kg</span>
            </div>
            <div className="flex justify-between items-center bg-surface-container-low p-4 rounded-xl border border-outline-variant/10">
              <span className="font-bold text-on-surface">Tamarindus indica (Asam)</span>
              <span className="text-sm font-bold text-on-surface-variant/70">8 kg</span>
            </div>
            <div className="flex justify-between items-center bg-surface-container-low p-4 rounded-xl border border-outline-variant/10">
              <span className="font-bold text-on-surface">Arenga pinnata (Gula Aren)</span>
              <span className="text-sm font-bold text-on-surface-variant/70">15 kg</span>
            </div>
            <div className="flex justify-between items-center bg-surface-container-low p-4 rounded-xl border border-outline-variant/10">
              <span className="font-bold text-on-surface">Air Purifikasi H2O</span>
              <span className="text-sm font-bold text-on-surface-variant/70">100 L</span>
            </div>
          </div>
        </div>

        {/* Prosedur */}
        <div className="bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/10 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">science</span>
            </div>
            <h3 className="text-2xl font-bold font-headline text-primary">SOP Produksi</h3>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-surface-container-highest rounded-full flex items-center justify-center font-bold text-sm text-primary shrink-0">1</div>
              <div>
                <h4 className="text-lg font-bold text-on-surface mb-1">Preparasi Bahan Baku</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">Cuci bersih rimpang kunyit dengan air mengalir. Kupas tipis (opsional) untuk membedakan kadar warna. Timbang secara presisi menggunakan neraca analitik.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-surface-container-highest rounded-full flex items-center justify-center font-bold text-sm text-primary shrink-0">2</div>
              <div>
                <h4 className="text-lg font-bold text-on-surface mb-1">Maserasi & Ekstraksi</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">Giling rimpang kunyit hingga menjadi pasta berserat. Didihkan air pada suhu tepat 100°C di dalam *extractor vat*, kemudian campur dengan pasta kunyit selama 30 menit.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-surface-container-highest rounded-full flex items-center justify-center font-bold text-sm text-primary shrink-0">3</div>
              <div>
                <h4 className="text-lg font-bold text-on-surface mb-1">Pelarutan Asam & Aren</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">Secara perlahan, masukkan campuran asam jawa yang sudah dilembutkan dan palet gula aren. Kurangi suhu pemanasan ke 75°C. Aduk mekanis konstan selama 45 menit hingga homogen.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-surface-container-highest rounded-full flex items-center justify-center font-bold text-sm text-primary shrink-0">4</div>
              <div>
                <h4 className="text-lg font-bold text-on-surface mb-1">Filtrasi Kontiniu & Pendinginan</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">Saring ekstraksi melalui mesh mikron ganda untuk memisahkan residu selulosa ampas. Transfer cairan jernih ke tangki pendingin untuk mencapai ambient (24°C) sebelum botolisasi.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Kolom Samping (Kanan) */}
      <div className="space-y-6">
        
        {/* Metrik Produksi */}
        <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10 shadow-sm relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 opacity-5 text-primary pointer-events-none">
            <span className="material-symbols-outlined text-[150px]" style={{ fontVariationSettings: "'FILL' 1" }}>precision_manufacturing</span>
          </div>
          <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-on-surface-variant/60 mb-6">Parameter Fasilitas</h4>
          
          <div className="space-y-5 relative z-10">
            <div>
              <p className="text-xs font-bold text-on-surface-variant mb-1">Estimasi Durasi (SOP)</p>
              <div className="flex items-center gap-2 text-primary font-bold">
                <span className="material-symbols-outlined text-[18px]">timer</span>
                3 Jam 15 Menit
              </div>
            </div>
            <hr className="border-outline-variant/20" />
            <div>
              <p className="text-xs font-bold text-on-surface-variant mb-1">Output Volumetrik</p>
              <div className="flex items-center gap-2 text-primary font-bold">
                <span className="material-symbols-outlined text-[18px]">opacity</span>
                110 Liter (Target)
              </div>
            </div>
            <hr className="border-outline-variant/20" />
            <div>
              <p className="text-xs font-bold text-on-surface-variant mb-1">pH Ideal</p>
              <div className="flex items-center gap-2 text-primary font-bold">
                <span className="material-symbols-outlined text-[18px]">biotech</span>
                pH 3.5 - 4.2
              </div>
            </div>
          </div>

          <button className="w-full mt-8 bg-primary text-on-primary py-3.5 rounded-xl font-bold text-sm shadow-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 active:scale-95">
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Mulai Batch Baru
          </button>
        </div>

        <div className="bg-surface-container-lowest/50 rounded-3xl p-6 border border-outline-variant/10 border-dashed">
           <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-on-surface-variant/60 mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-error">warning</span>
            Perhatian Khusus
           </h4>
           <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
             Suhu *extractor vat* tidak boleh melebihi 100°C selama maserasi untuk mencegah degradasi kandungan bio-aktif kurkumin pada kunyit.
           </p>
        </div>

      </div>

    </div>
  );
}
