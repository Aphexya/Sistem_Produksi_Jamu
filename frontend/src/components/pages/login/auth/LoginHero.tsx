import Image from '../../../Image';

export default function LoginHero() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative bg-primary-container overflow-hidden">
      {/* Dark overlay yang lebih kuat (gradient) agar teks tidak "mati" */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-primary/80 via-primary/40 to-primary/90 mix-blend-multiply"></div>
      <div className="absolute inset-0 z-10 bg-primary/40"></div>
      <Image
        src="/jamu.jpg"
        alt="Jarak dekat daun kunyit hijau cerah dan herbal botani gelap"
        wrapperClassName="absolute inset-0 w-full h-full"
        className="scale-105"
      />
      <div className="relative z-20 flex flex-col justify-between p-16 h-full w-full">
        <div className="drop-shadow-md">
          <h2 className="text-white font-headline text-4xl font-extrabold tracking-tight mb-4 leading-tight">
            Penjamu Handal
          </h2>
          {/* Ubah dari hijau ke putih/90 agar lebih kontras */}
          <p className="text-white/90 text-xl font-medium max-w-md">
            Apotek Digital: Menyelaraskan kearifan kuno dengan presisi modern.
          </p>
        </div>
        <div className="space-y-8 drop-shadow-md">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center bg-black/20 backdrop-blur-sm">
              <span
                className="material-symbols-outlined text-white"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                spa
              </span>
            </div>
            <div>
              <p className="text-white font-bold text-lg">Formulasi Terkurasi</p>
              {/* Ubah font kecil jadi putih/80 */}
              <p className="text-white/80 text-sm">Mengelola 240+ bahan organik setiap harinya.</p>
            </div>
          </div>
          {/* Background box dikuatkan opacitynya dari 10% ke 20% */}
          <div className="bg-black/20 backdrop-blur-md p-8 rounded-xl border border-white/20 max-w-sm">
            <p className="text-white italic text-lg leading-relaxed">
              "Esensi Jamu terbaik ditemukan dalam keseimbangan suhu dan waktu."
            </p>
            <p className="text-secondary-container font-bold mt-4 text-sm tracking-widest uppercase">
              Master Batch 04
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
