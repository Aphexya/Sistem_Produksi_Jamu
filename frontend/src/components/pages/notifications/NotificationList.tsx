export default function NotificationList() {
  return (
    <div className="space-y-6">
      
      {/* 1. Critical Stock Alert (Red) */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 flex gap-6 md:gap-8 border-l-8 border-error shadow-sm hover:shadow-md transition-shadow">
        <div className="w-12 h-12 bg-error-container text-on-error-container rounded-xl flex items-center justify-center shrink-0 shadow-inner">
          <span className="material-symbols-outlined text-2xl font-bold">priority_high</span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start gap-4 mb-2">
            <div>
              <span className="inline-block px-2.5 py-0.5 bg-error-container text-on-error-container text-[10px] font-extrabold rounded uppercase tracking-widest mb-3">
                STOK KRITIS
              </span>
              <h4 className="text-xl font-headline font-bold text-primary">Kencur berada di bawah ambang batas 10%.</h4>
            </div>
            <span className="text-xs font-bold text-on-surface-variant/50 shrink-0 mt-1">2 menit lalu</span>
          </div>
          <p className="text-sm font-medium text-on-surface-variant/90 leading-relaxed mb-6 max-w-4xl">
            Tingkat inventaris untuk Kaempferia galanga (Kencur) telah turun secara kritis. Produksi untuk batch 'Beras Kencur' akan dihentikan dalam 24 jam secara paksa tanpa pengisian ulang bahan. Pesan sekarang dari <i>Madura Herbals</i>.
          </p>
          <div className="flex gap-4">
            <button className="bg-primary text-on-primary px-5 py-2.5 rounded-lg font-bold text-sm shadow-sm hover:bg-primary/90 transition-all">
              Pesan Ulang Stok
            </button>
            <button className="bg-surface-container text-on-surface-variant px-5 py-2.5 rounded-lg font-bold text-sm shadow-sm hover:bg-surface-container-high transition-all">
              Abaikan
            </button>
          </div>
        </div>
      </div>

      {/* 2. Production Batch (Green) */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 flex gap-6 md:gap-8 border-l-8 border-tertiary-fixed-dim shadow-sm hover:shadow-md transition-shadow">
        <div className="w-12 h-12 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-xl flex items-center justify-center shrink-0 shadow-inner">
          <span className="material-symbols-outlined text-2xl font-bold">check_circle</span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start gap-4 mb-2">
            <div>
              <span className="inline-block px-2.5 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-extrabold rounded uppercase tracking-widest mb-3">
                BATCH PRODUKSI
              </span>
              <h4 className="text-xl font-headline font-bold text-primary">Batch #BK-202 telah menyelesaikan fermentasi.</h4>
            </div>
            <span className="text-xs font-bold text-on-surface-variant/50 shrink-0 mt-1">1 jam lalu</span>
          </div>
          <p className="text-sm font-medium text-on-surface-variant/90 leading-relaxed mb-6 max-w-4xl">
            Lulus uji kontrol kualitas *QA Check*. Batch klasik Jamu 50L ini telah mencapai tingkat kelarutan pH yang optimal. Sudah siap memasuki fase pembotolan dan pelabelan.
          </p>
          <div className="flex gap-4">
            <button className="bg-primary text-on-primary px-5 py-2.5 rounded-lg font-bold text-sm shadow-sm hover:bg-primary/90 transition-all">
              Setujui untuk Botolisasi
            </button>
          </div>
        </div>
      </div>

      {/* 3. System Update (Orange) */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 flex gap-6 md:gap-8 border-l-8 border-secondary-container shadow-sm hover:shadow-md transition-shadow">
        <div className="w-12 h-12 bg-secondary-container/30 text-secondary rounded-xl flex items-center justify-center shrink-0 shadow-inner">
          <span className="material-symbols-outlined text-2xl font-bold">info</span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start gap-4 mb-2">
            <div>
              <span className="inline-block px-2.5 py-0.5 bg-secondary-container/20 text-secondary-container border border-secondary-container/30 text-[10px] font-extrabold rounded uppercase tracking-widest mb-3">
                PEMBARUAN SISTEM
              </span>
              <h4 className="text-xl font-headline font-bold text-primary">Standar resep baru untuk Jamu Kunyit Asam.</h4>
            </div>
            <span className="text-xs font-bold text-on-surface-variant/50 shrink-0 mt-1">3 jam lalu</span>
          </div>
          <p className="text-sm font-medium text-on-surface-variant/90 leading-relaxed mb-6 max-w-4xl">
            Pusat Apotekeri telah memperbarui waktu maserasi standar untuk resep Kunyit Asam demi mempertajam bio-ketersediaan kurkumin. Seluruh batch di masa mendatang wajib mengikuti Protokol v4.2.
          </p>
          <div className="flex gap-4">
            <button className="bg-surface-container text-on-surface-variant border border-outline-variant/30 px-5 py-2.5 rounded-lg font-bold text-sm shadow-sm hover:bg-surface-container-high transition-all">
              Lihat Protokol Baru
            </button>
          </div>
        </div>
      </div>

      {/* 4. Team Update (Gray) */}
      <div className="bg-surface-container-lowest/50 rounded-2xl p-6 md:p-8 flex gap-6 md:gap-8 border-l-8 border-surface-container-high shadow-sm hover:shadow-md transition-shadow">
        <div className="w-12 h-12 bg-surface-container-high text-on-surface-variant/70 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
          <span className="material-symbols-outlined text-2xl font-bold">person_add</span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start gap-4 mb-2">
            <div>
               <span className="inline-block px-2.5 py-0.5 bg-surface-container text-on-surface-variant text-[10px] font-extrabold rounded uppercase tracking-widest mb-3">
                INFO TIM
              </span>
              <h4 className="text-xl font-headline font-bold text-primary opacity-80">Asisten Laboratorium Baru bergabung.</h4>
            </div>
            <span className="text-xs font-bold text-on-surface-variant/50 shrink-0 mt-1">Kemarin</span>
          </div>
          <p className="text-sm font-medium text-on-surface-variant/70 leading-relaxed mb-2 max-w-4xl">
            Aria Putri telah diberikan izin akses ke modul <i>Production Logs</i> dsn <i>Inventory</i>. Mohon sambut dan perkenalkan beliau ke staf fasilitas Madura.
          </p>
        </div>
      </div>

    </div>
  );
}
