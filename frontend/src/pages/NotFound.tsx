import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Halaman Tidak Ditemukan | Penjamu Handal</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center justify-center p-8 text-center font-body relative overflow-hidden">
        {/* Dekorasi aksen daun transparan di background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <span className="material-symbols-outlined text-[400px]">eco</span>
        </div>

        <div className="relative z-10 max-w-lg">
          <div className="mb-6 inline-flex items-center justify-center w-24 h-24 rounded-full bg-error-container text-on-error-container custom-shadow">
            <span className="material-symbols-outlined text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              healing
            </span>
          </div>
          
          <h1 className="font-headline text-8xl font-black text-primary mb-4 tracking-tighter">
            404
          </h1>
          <h2 className="font-headline text-3xl font-bold tracking-tight mb-4 text-on-surface">
            Ramuan Tidak Ditemukan
          </h2>
          <p className="text-on-surface-variant font-medium text-lg mb-10 leading-relaxed">
            Maaf, halaman atau resep yang Anda cari tampaknya tidak tumbuh di kebun sistem kami. Silakan kembali ke konsol utama.
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-3 apothecary-gradient text-on-primary font-bold py-4 px-8 rounded-xl custom-shadow hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">home</span>
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </>
  );
}
