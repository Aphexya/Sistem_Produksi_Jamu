export default function NotificationsHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
      <div className="space-y-2">
        <h2 className="text-4xl md:text-5xl font-extrabold font-headline text-primary tracking-tight">Pusat Notifikasi</h2>
        <p className="text-on-surface-variant font-medium text-sm md:text-base max-w-xl">
          Pantau denyut nadi digital apotekeri. Wawasan real-time dari stok bahan mentah hingga siklus fermentasi.
        </p>
      </div>
      <div className="flex gap-6 items-center">
        <button className="text-sm font-bold text-primary hover:underline transition-all">Tandai semua dibaca</button>
        <button className="text-sm font-bold text-error hover:underline transition-all">Hapus semua</button>
      </div>
    </div>
  );
}
