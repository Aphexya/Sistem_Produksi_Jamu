export default function SuppliersResults() {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6 relative">
        <div className="h-px bg-outline-variant/20 flex-1"></div>
        <div className="flex items-center gap-2 text-primary font-bold">
          <span className="material-symbols-outlined text-lg">local_shipping</span>
          <h3>Pemasok</h3>
        </div>
        <div className="h-px bg-outline-variant/20 flex-1"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kartu Pemasok Utama */}
        <div className="col-span-1 bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant/10 group">
          <div className="relative h-32 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600&auto=format&fit=crop" 
              alt="Hutan Tropis" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <h4 className="absolute bottom-4 left-6 text-white font-headline font-bold text-lg">Sumenep Botanical</h4>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center bg-surface-container-low px-3 py-2 rounded-lg">
              <span className="text-xs text-on-surface-variant font-bold">Kategori Utama</span>
              <span className="text-xs font-bold bg-secondary-container/20 text-secondary-container px-2 py-0.5 rounded shadow-sm">Rimpang</span>
            </div>
            
            <div className="flex justify-between items-center bg-surface-container-low px-3 py-2 rounded-lg">
              <span className="text-xs text-on-surface-variant font-bold">Skor Keandalan</span>
              <div className="flex items-center gap-0.5 text-primary">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>star_half</span>
              </div>
            </div>
            
            <button className="w-full mt-2 py-2.5 bg-surface text-primary border border-primary/20 rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition-colors shadow-sm">
              Hubungi Vendor
            </button>
          </div>
        </div>

        {/* Kartu Fakta "Tahukah Anda" */}
        <div className="col-span-1 md:col-span-2 bg-surface-container border border-dashed border-outline-variant/40 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-surface-container-lowest rounded-full flex items-center justify-center mb-6 shadow-sm border border-outline-variant/10 text-on-surface-variant/50">
            <span className="material-symbols-outlined text-3xl">lightbulb</span>
          </div>
          <h4 className="text-xl font-headline font-bold text-primary mb-3">Tahukah Anda?</h4>
          <p className="text-on-surface-variant/80 font-medium text-sm leading-relaxed max-w-lg mx-auto">
            Kencur paling poten bila dipanen saat fajar di musim kemarau. Pemasok Anda saat ini, <span className="font-bold text-on-surface">Sumenep Botanical</span>, memiliki jadwal panen berikutnya dalam <span className="font-bold text-secondary">12 hari</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
