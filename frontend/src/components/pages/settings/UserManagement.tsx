import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers, type UserRecord, type UserRole } from '../../../services/userService';

const roleMeta: Record<UserRole, { label: string; className: string }> = {
  admin: {
    label: 'ADMINISTRATOR',
    className: 'bg-primary-container/10 border-primary-container/20 text-primary',
  },
  supervisor: {
    label: 'SUPERVISOR',
    className: 'bg-secondary-container/30 border-secondary/20 text-primary',
  },
  staff: {
    label: 'STAF',
    className: 'bg-surface-container-highest border-outline-variant/30 text-on-surface-variant',
  },
};

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

function getRegisteredLabel(user: UserRecord) {
  if (!user.created_at) {
    return 'Tanggal belum tersedia';
  }

  return new Date(user.created_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function UserManagement() {
  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  return (
    <section className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-headline text-2xl font-bold text-primary">Hierarki Staf Medis</h3>
          <p className="mt-1 text-sm text-on-surface-variant">Kelola perizinan peran serta tingkat akses area laboratorium.</p>
        </div>
        <Link
          to="/users"
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-primary/20 bg-surface px-6 py-3 text-sm font-bold tracking-wide text-primary shadow-sm transition-all hover:border-primary hover:bg-primary hover:text-on-primary sm:w-auto"
        >
          <span className="material-symbols-outlined text-lg">manage_accounts</span>
          BUKA DIREKTORI STAF
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-outline-variant/10 bg-surface-container-lowest shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead>
              <tr className="border-b border-outline-variant/10 bg-surface-container-low">
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant/80">Anggota Staf</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant/80">Wilayah</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant/80">Tingkat Akses</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant/80">Terdaftar</th>
                <th className="px-8 py-5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {isLoading && (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-sm font-medium text-on-surface-variant">
                    Memuat daftar staf...
                  </td>
                </tr>
              )}

              {!isLoading && error && (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-sm font-medium text-error">
                    {error instanceof Error ? error.message : 'Gagal memuat daftar staf'}
                  </td>
                </tr>
              )}

              {!isLoading && !error && users.map((staff) => {
                const role = roleMeta[staff.role];

                return (
                  <tr key={staff.id_user} className="group transition-colors hover:bg-surface-container-low/50">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary font-extrabold text-on-primary shadow-sm">
                          {getInitials(staff.username)}
                        </div>
                        <div>
                          <p className="font-bold text-primary">{staff.username}</p>
                          <p className="font-mono text-xs font-medium text-on-surface-variant/70">{staff.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-medium text-on-surface-variant">
                      {staff.kota?.nama_kota ?? 'Belum dipilih'}
                    </td>
                    <td className="px-8 py-6">
                      <span className={`rounded border px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest sm:text-xs ${role.className}`}>
                        {role.label}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm font-medium text-on-surface-variant">{getRegisteredLabel(staff)}</td>
                    <td className="px-8 py-6 text-right">
                      <Link
                        to="/users"
                        className="inline-flex rounded-lg border border-transparent bg-transparent p-2 text-on-surface-variant/50 transition-colors hover:border-outline-variant/20 hover:bg-surface-container hover:text-primary"
                      >
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-outline-variant/10 bg-surface-container-low/40 px-8 py-6 sm:flex-row">
          <p className="text-xs font-bold uppercase tracking-wide text-on-surface-variant">
            Menampilkan {users.length} anggota staf aktif
          </p>
          <Link to="/users" className="text-sm font-bold text-primary hover:underline">
            Kelola detail
          </Link>
        </div>
      </div>
    </section>
  );
}
