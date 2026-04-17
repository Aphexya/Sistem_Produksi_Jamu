import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Forbidden() {
  return (
    <>
      <Helmet>
        <title>Akses Ditolak | Penjamu Handal</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center justify-center p-8 text-center font-body relative overflow-hidden">
        {/* Dekorasi aksen gembok/restricted transparan di background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <span className="material-symbols-outlined text-[400px]">lock</span>
        </div>

        <div className="relative z-10 max-w-lg">
          <div className="mb-6 inline-flex items-center justify-center w-24 h-24 rounded-full bg-error-container text-on-error-container custom-shadow">
            <span className="material-symbols-outlined text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              front_hand
            </span>
          </div>
          
          <h1 className="font-headline text-8xl font-black text-error mb-4 tracking-tighter">
            403
          </h1>
          <h2 className="font-headline text-3xl font-bold tracking-tight mb-4 text-on-surface">
            Akses Ke Ruang Terbatas
          </h2>
          <p className="text-on-surface-variant font-medium text-lg mb-10 leading-relaxed">
            Maaf, kredensial Anda tidak memiliki izin otorisasi untuk menyaksikan atau meracik di area spesifik ini. Silakan hubungi master batch Anda.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-3 bg-surface-container-highest text-on-surface font-bold py-4 px-8 rounded-xl hover:bg-surface-variant transition-colors custom-shadow w-full sm:w-auto"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              Kembali
            </Link>
            
            <Link
              to="/request-access"
              className="inline-flex items-center justify-center gap-3 apothecary-gradient text-on-primary font-bold py-4 px-8 rounded-xl custom-shadow hover:scale-[1.02] active:scale-[0.98] transition-all w-full sm:w-auto"
            >
              <span className="material-symbols-outlined text-[20px]">key</span>
              Minta Hak Akses
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
