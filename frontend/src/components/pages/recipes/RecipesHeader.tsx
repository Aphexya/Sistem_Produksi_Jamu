export default function RecipesHeader() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-4 font-headline">Perpustakaan Resep</h1>
          <p className="text-base md:text-lg text-on-surface-variant leading-relaxed">
            Kecerdasan inti dari Penjamu Handal. Kelola resep leluhur Anda dengan presisi laboratorium. Pastikan setiap batch Jamu memenuhi standar potensi dan kemurnian tertinggi.
          </p>
        </div>
        <button className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-transform hover:-translate-y-1 hover:shadow-lg w-full md:w-auto">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
          <span>Tambah Resep Baru</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-10">
        <button className="px-6 py-2 bg-primary text-on-primary rounded-full font-bold text-sm shadow-sm">Semua Formula</button>
        <button className="px-6 py-2 bg-surface-container-high text-on-surface-variant rounded-full font-medium text-sm hover:bg-surface-container-highest transition-colors">Vitalitas</button>
        <button className="px-6 py-2 bg-surface-container-high text-on-surface-variant rounded-full font-medium text-sm hover:bg-surface-container-highest transition-colors">Pencernaan</button>
        <button className="px-6 py-2 bg-surface-container-high text-on-surface-variant rounded-full font-medium text-sm hover:bg-surface-container-highest transition-colors">Imunitas</button>
        <button className="px-6 py-2 bg-surface-container-high text-on-surface-variant rounded-full font-medium text-sm hover:bg-surface-container-highest transition-colors">Pemulihan</button>
      </div>
    </>
  );
}
