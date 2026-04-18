export default function SearchTabs() {
  return (
    <div className="flex flex-wrap gap-4 mb-12">
      <button className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-bold text-sm tracking-wide shadow-md">
        Semua Hasil
      </button>
      <button className="px-6 py-2.5 rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors font-bold text-sm tracking-wide">
        Resep
      </button>
      <button className="px-6 py-2.5 rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors font-bold text-sm tracking-wide">
        Inventaris
      </button>
      <button className="px-6 py-2.5 rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors font-bold text-sm tracking-wide">
        Pemasok
      </button>
    </div>
  );
}
