import { Link } from 'react-router-dom';

export default function RecipeDetailHero() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-10 shadow-sm">
      {/* Background Image */}
      <img 
        src="https://images.unsplash.com/photo-1615486511484-92e172e27bda?q=80&w=1600&auto=format&fit=crop" 
        alt="Kunyit Asam" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>

      {/* Content */}
      <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
        {/* Top: Back Button */}
        <div>
          <Link to="/recipes" className="inline-flex items-center gap-2 bg-surface/50 backdrop-blur-md px-4 py-2 rounded-xl text-on-surface hover:bg-surface transition-colors shadow-sm font-bold text-sm">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Kembali ke Resep
          </Link>
        </div>

        {/* Bottom: Title & Meta */}
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-secondary text-on-secondary px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase shadow-sm">
              Imunitas
            </span>
            <span className="bg-surface-container-highest/80 backdrop-blur-sm text-on-surface font-bold px-3 py-1 rounded-full text-[10px] tracking-widest uppercase shadow-sm flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">speed</span>
              Tingkat: MUDAH
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold font-headline text-primary tracking-tight mb-4 drop-shadow-md">
            Kunyit Asam
          </h1>
          <p className="text-lg text-on-surface-variant font-medium leading-relaxed max-w-2xl drop-shadow-sm">
            Campuran tradisional untuk detoksifikasi dan vitalitas kulit cerah. Sangat diminati untuk produksi massal maupun eceran standar lab.
          </p>
        </div>
      </div>
    </div>
  );
}
