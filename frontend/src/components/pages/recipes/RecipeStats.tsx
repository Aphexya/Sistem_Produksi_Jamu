export default function RecipeStats() {
  return (
    <div className="mt-24 bg-surface-container-low rounded-[2rem] p-8 md:p-12 flex flex-col xl:flex-row gap-12 items-center shadow-sm">
      <div className="flex-1">
        <span className="text-secondary font-bold uppercase tracking-[0.2em] text-[10px] mb-4 block">Optimasi Batch</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-6 leading-tight font-headline">Kuasai analitik formula untuk potensi konsisten.</h2>
        <p className="text-on-surface-variant mb-8 leading-relaxed text-sm md:text-base">
          Kecerdasan apoteker kami memantau volatilitas bahan di berbagai musim, secara otomatis menyesuaikan resep dasar Anda untuk mempertahankan konsistensi terapeutik.
        </p>
        
        <div className="grid grid-cols-3 gap-6 md:gap-8">
          <div>
            <div className="text-3xl md:text-4xl font-black text-primary">12</div>
            <div className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mt-1">Formula Aktif</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-primary">850L</div>
            <div className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mt-1">Hasil Bulanan</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-primary">99%</div>
            <div className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mt-1">Kesuksesan Batch</div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 relative h-64 md:h-80 w-full overflow-hidden rounded-2xl shadow-md">
        <img 
          alt="Artisanal jamu bottling" 
          className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105 cursor-pointer" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp90l5BzjkEKGIU2KUnuUc5ffdRkFbls76LfKBiGA5Nj2GBaJEN-r2O7fWsKj7P5XBQKo9HRAnDN78FBqNo3Wr9gRkLm2wSWfqe9TwanEwZKK3cRjjvDAvp2xwWcXL3J8LiWtXN_oECDrfrz0LRbtgR4rIvGQ6fNLfsyNffOeFVXwPBb-d6j5NX7S60W2dLXiu0pqQ97BBltrooJSJ815awuBpEiKfQUT3aqiuUGH7tY3UNVLZ_L9ZGu6UJC6tAf3wk8DxLGF5LSyK"
        />
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply pointer-events-none"></div>
      </div>
    </div>
  );
}
