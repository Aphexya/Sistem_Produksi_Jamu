export default function RecipeFormulation() {
  return (
    <section className="bg-surface-container-lowest p-8 rounded-xl relative overflow-hidden shadow-sm">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <span className="material-symbols-outlined text-9xl">science</span>
      </div>
      
      <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3 font-headline">
        Formulasi Resep
        <span className="h-px flex-1 bg-outline-variant/20"></span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant/70">Pilihan Resep</label>
          <select className="w-full bg-surface-container border-none rounded-lg px-4 py-3 text-on-surface focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer shadow-inner">
            <option>Jamu Beras Kencur</option>
            <option>Kunyit Asam Premium</option>
            <option>Ekstrak Temulawak</option>
            <option>Wedang Jahe Madura</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant/70">Ukuran Batch (KG)</label>
          <div className="flex gap-4">
            <input 
              className="flex-1 bg-surface-container border-none rounded-lg px-4 py-3 text-on-surface focus:ring-1 focus:ring-primary transition-all shadow-inner" 
              placeholder="5.0" 
              type="number"
              defaultValue="5.0"
            />
            <div className="bg-secondary-container px-4 py-3 rounded-lg text-on-secondary-container font-bold flex items-center shadow-sm">
              KG
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
