export default function SupplierMetrics() {
  return (
    <div className="space-y-8 h-full">
      {/* Metric 1 */}
      <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/10 relative overflow-hidden group">
        <div className="absolute -right-10 -bottom-10 opacity-5 scale-[2] pointer-events-none group-hover:scale-[2.2] transition-transform duration-700">
          <span className="material-symbols-outlined text-[150px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            local_shipping
          </span>
        </div>
        
        <p className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest mb-4">Total Pengiriman</p>
        <div className="flex items-baseline gap-2">
          <span className="font-headline text-5xl md:text-6xl font-light text-primary">1,420</span>
          <span className="text-tertiary-fixed-dim font-bold text-sm bg-tertiary-fixed/10 px-2 py-1 rounded-full">+12%</span>
        </div>
        
        <div className="mt-8 h-2.5 w-full bg-surface-container rounded-full overflow-hidden shadow-inner">
          <div className="h-full apothecary-gradient w-3/4 rounded-full"></div>
        </div>
      </div>
      
      {/* Recent Shipments */}
      <div className="bg-surface-container-low p-8 rounded-2xl shadow-sm border border-outline-variant/5">
        <h4 className="font-headline text-lg font-bold mb-6 text-primary">Pengiriman Terkini</h4>
        <div className="space-y-6">
          <div className="flex items-center gap-4 hover:bg-surface-container p-2 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-outline-variant/10">
            <div className="w-12 h-12 bg-surface-container-lowest rounded-xl flex items-center justify-center text-primary shadow-sm group">
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">eco</span>
            </div>
            <div>
              <p className="font-bold text-sm text-on-surface">Kunyit Hutan Liar</p>
              <p className="text-xs text-on-surface-variant/70 mt-0.5">Dari Sumenep Botanical • 2 jam lalu</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 hover:bg-surface-container p-2 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-outline-variant/10">
            <div className="w-12 h-12 bg-surface-container-lowest rounded-xl flex items-center justify-center text-secondary shadow-sm group">
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">inventory_2</span>
            </div>
            <div>
              <p className="font-bold text-sm text-on-surface">Botol Kaca 50ml</p>
              <p className="text-xs text-on-surface-variant/70 mt-0.5">Glassware Crafts Co. • 5 jam lalu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
