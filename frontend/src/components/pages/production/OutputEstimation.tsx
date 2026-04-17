export default function OutputEstimation() {
  return (
    <section className="bg-primary text-on-primary p-8 rounded-xl shadow-2xl relative overflow-hidden">
      <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-primary-container rounded-full opacity-30"></div>
      
      <h3 className="text-sm font-bold uppercase tracking-widest text-on-primary/70 mb-6 font-headline">
        Estimasi Output
      </h3>
      
      <div className="flex items-baseline gap-2 mb-4 relative z-10">
        <span className="text-7xl font-black tracking-tighter">42</span>
        <span className="text-xl font-bold text-on-primary/80">Botol</span>
      </div>
      
      <p className="text-xs text-on-primary/60 leading-relaxed mb-6 font-medium relative z-10">
        Dihitung berdasarkan batch 5.0KG dengan efisiensi ekstraksi 85%.
      </p>
      
      <div className="h-1.5 w-full bg-on-primary/20 rounded-full overflow-hidden relative z-10 shadow-inner">
        <div className="h-full bg-secondary w-[85%] rounded-full shadow-sm"></div>
      </div>
      
      <div className="flex justify-between mt-3 text-[10px] font-bold uppercase tracking-tighter text-on-primary/70 relative z-10">
        <span>Efisiensi Produksi</span>
        <span className="text-secondary-fixed">85% (Target)</span>
      </div>
    </section>
  );
}
