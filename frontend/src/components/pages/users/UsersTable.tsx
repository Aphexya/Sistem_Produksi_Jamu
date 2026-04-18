const staffList = [
  {
    id: 1,
    name: 'Ahmad Fauzi',
    email: 'ahmad.fauzi@penjamuhandal.id',
    role: 'SYSTEM ADMIN',
    roleClass: 'bg-primary text-on-primary',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop',
    loginInfo: 'Hari ini pukul 06:42 AM • IP: 192.168.1.12'
  },
  {
    id: 2,
    name: 'Siti Aminah',
    email: 'siti.a@penjamuhandal.id',
    role: 'PRODUCTION STAFF',
    roleClass: 'bg-surface-container-high text-on-surface-variant',
    icon: 'science',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    loginInfo: 'Kemarin pukul 11:15 PM • Mobile App'
  },
  {
    id: 3,
    name: 'Bambang Wijaya',
    email: 'bambang.w@penjamuhandal.id',
    role: 'INVENTORY MANAGER',
    roleClass: 'bg-surface-container-high text-on-surface-variant',
    icon: 'inventory',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
    loginInfo: '2 hari lalu • Desktop (MacOS)'
  },
  {
    id: 4,
    name: 'Diana Putri',
    email: 'diana.p@penjamuhandal.id',
    role: 'SYSTEM ADMIN',
    roleClass: 'bg-primary text-on-primary',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    loginInfo: 'Hari ini pukul 10:15 AM • Tablet'
  }
];

export default function UsersTable() {
  return (
    <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden mb-10">
      {/* Table Toolbar */}
      <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-surface/50 border-b border-outline-variant/5">
        <div className="relative w-full md:w-96">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[20px]">
            search
          </span>
          <input 
            type="text" 
            placeholder="Filter berdasarkan nama atau email..."
            className="w-full bg-surface-container-low border-none rounded-xl pl-12 pr-4 py-3.5 focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-all"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-surface-container-low hover:bg-surface-container px-4 py-3 rounded-xl font-bold text-sm text-on-surface-variant transition-colors border border-outline-variant/10">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            Semua Peran
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-surface-container-low hover:bg-surface-container px-4 py-3 rounded-xl font-bold text-sm text-on-surface-variant transition-colors border border-outline-variant/10">
            <span className="material-symbols-outlined text-[18px]">sort</span>
            Terbaru
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[900px]">
          <thead>
            <tr className="bg-surface-container-lowest border-b border-outline-variant/10">
              <th className="px-8 py-5 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant/50">Personel</th>
              <th className="px-8 py-5 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant/50">Peran yang Ditetapkan</th>
              <th className="px-8 py-5 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant/50">Audit Keamanan</th>
              <th className="px-8 py-5 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant/50 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/5">
            {staffList.map((staff) => (
              <tr key={staff.id} className="hover:bg-surface-container-low/30 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img src={staff.image} alt={staff.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-surface-container shadow-sm" />
                      {staff.role === 'SYSTEM ADMIN' && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-tertiary-fixed rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-primary">{staff.name}</p>
                      <p className="text-xs text-on-surface-variant/70 font-medium font-mono">{staff.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-extrabold tracking-widest shadow-sm ${staff.roleClass}`}>
                    {staff.icon && <span className="material-symbols-outlined text-[14px]">{staff.icon}</span>}
                    {staff.role}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <p className="text-sm font-medium text-on-surface">Login Terakhir</p>
                  <p className="text-xs text-on-surface-variant/70 font-medium tracking-wide mt-0.5">{staff.loginInfo}</p>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 text-on-surface-variant/50 hover:bg-surface-container-high hover:text-primary rounded-lg transition-colors pointer shadow-sm cursor-pointer border border-transparent hover:border-outline-variant/20">
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-8 py-6 bg-surface-container-lowest border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs font-bold text-on-surface-variant/60 tracking-wide uppercase">
          Menampilkan 1 hingga 4 dari 24 anggota staf
        </p>
        <div className="flex gap-1.5">
          <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-colors shadow-sm font-bold border border-outline-variant/10 text-sm"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary text-white font-bold shadow-md text-xs border border-primary">1</button>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-colors shadow-sm font-bold border border-outline-variant/10 text-xs">2</button>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-colors shadow-sm font-bold border border-outline-variant/10 text-xs">3</button>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-colors shadow-sm font-bold border border-outline-variant/10 text-sm"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
        </div>
      </div>
    </div>
  );
}
