export default function NotificationsTabs() {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-6 mb-10">
      <div className="bg-surface-container-low p-2 rounded-2xl flex-1 max-w-2xl flex gap-2 overflow-x-auto shadow-sm border border-outline-variant/10">
        <button className="bg-surface-container-lowest text-primary font-bold px-6 py-4 rounded-xl flex items-center justify-center gap-2 shadow-sm shrink-0 flex-1">
          <span className="material-symbols-outlined text-[20px]">list_alt</span>
          Semua Aktivitas
        </button>
        <button className="text-on-surface-variant/80 hover:bg-surface-container hover:text-primary font-bold px-6 py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shrink-0 flex-1">
          <span className="material-symbols-outlined text-[20px] text-on-surface-variant/50">mark_email_unread</span>
          Belum Dibaca
        </button>
        <button className="text-on-surface-variant/80 hover:bg-surface-container hover:text-primary font-bold px-6 py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shrink-0 flex-1">
          <span className="material-symbols-outlined text-[20px] text-error mb-0.5">warning</span>
          Peringatan Kritis
        </button>
      </div>

      <div className="bg-primary-container text-on-primary-container rounded-2xl p-6 sm:w-72 shadow-md relative overflow-hidden shrink-0 flex items-center justify-between">
        <div className="relative z-10">
          <p className="text-[10px] font-extrabold uppercase tracking-widest mb-1 opacity-80">PERINGATAN BELUM DISELESAIKAN</p>
          <div className="flex items-end gap-3 text-white">
            <span className="text-5xl font-headline font-light leading-none">04</span>
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs font-bold text-tertiary-fixed">
            <div className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></div>
            2 Peringatan Stok Rentan
          </div>
        </div>
        <div className="relative z-10 opacity-20">
          <span className="material-symbols-outlined text-7xl">notifications_active</span>
        </div>
        <div className="absolute right-0 top-0 w-32 h-32 bg-primary/20 blur-2xl rounded-full"></div>
      </div>
    </div>
  );
}
