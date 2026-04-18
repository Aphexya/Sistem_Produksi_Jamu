const staffMembers = [
  {
    id: 1,
    initials: 'SK',
    initialsClass: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    name: 'Siti Khadijah',
    email: 'siti.k@penjamuhandal.com',
    department: 'Jaminan Mutu (QA)',
    accessLevel: 'SUPERVISOR',
    accessClass: 'bg-primary-container/10 border-primary-container/20 text-primary',
    lastActive: '2 menit lalu'
  },
  {
    id: 2,
    initials: 'BR',
    initialsClass: 'bg-secondary-fixed text-on-secondary-fixed-variant',
    name: 'Budi Raharjo',
    email: 'budi.r@penjamuhandal.com',
    department: 'Departemen Ekstraksi',
    accessLevel: 'TEKNISI',
    accessClass: 'bg-surface-container-highest border-outline-variant/30 text-on-surface-variant',
    lastActive: '1 jam lalu'
  },
  {
    id: 3,
    initials: 'DI',
    initialsClass: 'bg-primary-fixed text-on-primary-fixed-variant',
    name: 'Dewi Indah',
    email: 'dewi.i@penjamuhandal.com',
    department: 'Pengemasan & Botolisasi',
    accessLevel: 'STAF',
    accessClass: 'bg-surface-container-highest border-outline-variant/30 text-on-surface-variant',
    lastActive: 'Kemarin'
  }
];

export default function UserManagement() {
  return (
    <section className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-2xl font-headline font-bold text-primary">Hierarki Staf Medis</h3>
          <p className="text-on-surface-variant font-body text-sm mt-1">Kelola perizinan peran serta tingkat akses area laboratorium.</p>
        </div>
        <button className="bg-surface text-primary border-2 border-primary/20 px-6 py-3 rounded-xl font-bold text-sm tracking-wide hover:bg-primary hover:text-on-primary hover:border-primary transition-all flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto">
          <span className="material-symbols-outlined text-lg">person_add</span>
          UNDANG STAF BARU
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/10">
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant/80">Anggota Staf</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant/80">Departemen</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant/80">Tingkat Akses</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant/80">Aktivitas Terakhir</th>
                <th className="px-8 py-5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {staffMembers.map((staff) => (
                <tr key={staff.id} className="hover:bg-surface-container-low/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold shadow-sm ${staff.initialsClass}`}>
                        {staff.initials}
                      </div>
                      <div>
                        <p className="font-bold text-primary">{staff.name}</p>
                        <p className="text-xs text-on-surface-variant/70 font-medium font-mono">{staff.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-on-surface-variant font-medium">{staff.department}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1.5 rounded text-[10px] sm:text-xs font-extrabold uppercase tracking-widest border ${staff.accessClass}`}>
                      {staff.accessLevel}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm text-on-surface-variant font-medium">{staff.lastActive}</td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-on-surface-variant/50 hover:text-primary p-2 bg-transparent hover:bg-surface-container rounded-lg transition-colors border border-transparent hover:border-outline-variant/20">
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer Pagination */}
        <div className="bg-surface-container-low/40 px-8 py-6 border-t border-outline-variant/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-on-surface-variant font-bold tracking-wide uppercase">Menampilkan 3 dari 12 Anggota Staf Aktif</p>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-surface-container-lowest border border-outline-variant/20 hover:bg-primary hover:text-white transition-colors shadow-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-primary rounded-lg text-white shadow-md">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
