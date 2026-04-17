const ingredients = [
  {
    id: 1,
    name: 'Kencur Madura (Segar)',
    target: '2,500.0',
    input: '2500.0',
    status: 'STOCK OK',
    icon: 'eco',
    iconColor: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    statusClass: 'bg-tertiary-fixed border border-on-tertiary-fixed-variant/20 text-on-tertiary-fixed-variant',
    disabled: false,
    opacity: 'opacity-100'
  },
  {
    id: 2,
    name: 'Beras Organik (Sangrai)',
    target: '1,250.0',
    input: '',
    placeholder: 'Input berat',
    status: 'LOW STOCK',
    icon: 'bakery_dining',
    iconColor: 'bg-secondary-fixed text-on-secondary-fixed-variant',
    statusClass: 'bg-secondary-container text-on-secondary-container',
    disabled: false,
    opacity: 'opacity-100'
  },
  {
    id: 3,
    name: 'Sirup Gula Aren',
    target: '750.0',
    input: '',
    status: 'DEPLETED',
    icon: 'water_drop',
    iconColor: 'bg-error-container text-on-error-container',
    statusClass: 'bg-error-container text-on-error-container',
    disabled: true,
    opacity: 'opacity-70'
  }
];

export default function IngredientComposition() {
  return (
    <section className="bg-surface-container-low p-8 rounded-xl shadow-sm border border-outline-variant/5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
        <h2 className="text-2xl font-bold text-primary font-headline">Komposisi Bahan</h2>
        <span className="text-xs font-bold text-secondary bg-secondary-container/30 px-3 py-1 rounded-full italic">Presisi: ±0.1g Diwajibkan</span>
      </div>

      <div className="space-y-4">
        {/* Header Tabel Mini */}
        <div className="grid grid-cols-12 gap-4 px-4 text-[10px] font-bold uppercase text-on-surface-variant/60 tracking-widest hidden sm:grid">
          <div className="col-span-12 sm:col-span-5">Nama Bahan</div>
          <div className="col-span-12 sm:col-span-3 text-right sm:text-left">Target Berat (g)</div>
          <div className="col-span-12 sm:col-span-2">Input Real</div>
          <div className="col-span-12 sm:col-span-2 text-right">Status</div>
        </div>

        {/* List Bahan */}
        {ingredients.map((item) => (
          <div 
            key={item.id} 
            className={`grid grid-cols-12 gap-4 items-center bg-surface-container-lowest p-4 rounded-lg shadow-sm border border-outline-variant/10 ${item.opacity} transition-all hover:border-primary/20`}
          >
            <div className="col-span-12 sm:col-span-5 flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.iconColor} shadow-inner`}>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {item.icon}
                </span>
              </div>
              <span className="font-bold text-on-surface text-sm sm:text-base">{item.name}</span>
            </div>
            
            <div className="col-span-6 sm:col-span-3 font-mono text-sm font-bold text-on-surface-variant">
              {item.target}
            </div>
            
            <div className="col-span-6 sm:col-span-2">
              <input 
                className={`w-full py-1.5 px-2 text-sm rounded border border-outline-variant/20 text-right focus:ring-1 focus:ring-primary shadow-inner font-mono font-bold ${item.disabled ? 'cursor-not-allowed bg-surface-container' : 'bg-surface-container-lowest'}`} 
                type="text" 
                defaultValue={item.input}
                placeholder={item.placeholder}
                disabled={item.disabled}
              />
            </div>
            
            <div className="col-span-12 sm:col-span-2 flex justify-end mt-2 sm:mt-0">
              <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${item.statusClass} shadow-sm`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
