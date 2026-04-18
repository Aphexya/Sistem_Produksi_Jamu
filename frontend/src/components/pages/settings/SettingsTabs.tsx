export default function SettingsTabs() {
  return (
    <div className="flex gap-8 border-b border-outline-variant/15 overflow-x-auto pb-1 mb-10 w-full">
      <button className="pb-4 border-b-4 border-primary text-primary font-bold text-sm tracking-wide shrink-0">PROFIL</button>
      <button className="pb-4 border-b-4 border-transparent text-on-surface-variant hover:text-primary transition-colors font-medium text-sm tracking-wide shrink-0">AMBANG SISTEM</button>
      <button className="pb-4 border-b-4 border-transparent text-on-surface-variant hover:text-primary transition-colors font-medium text-sm tracking-wide shrink-0">MANAJEMEN PENGGUNA</button>
    </div>
  );
}
