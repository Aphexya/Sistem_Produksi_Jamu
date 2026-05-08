import type { UserRecord } from '../../../services/userService';

interface UsersDeleteDialogProps {
  user: UserRecord | null;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function UsersDeleteDialog({ user, isDeleting, onCancel, onConfirm }: UsersDeleteDialogProps) {
  if (!user) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-primary/24 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-[1.75rem] border border-outline-variant/16 bg-surface-container-lowest shadow-[0_36px_96px_-42px_rgba(28,28,19,0.58)]">
        <div className="flex items-start gap-4 border-b border-surface-container px-6 py-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-error-container text-error shadow-inner">
            <span className="material-symbols-outlined text-[28px]">person_remove</span>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/60">Konfirmasi akses</p>
            <h3 className="mt-2 font-headline text-2xl font-extrabold text-primary">Hapus pengguna?</h3>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
              Akun <span className="font-bold text-on-surface">{user.username}</span> akan dihapus dari direktori staf dan tidak bisa
              menggunakan akses aplikasi lagi.
            </p>
          </div>
        </div>

        <div className="bg-surface-container-low/24 px-6 py-5">
          <div className="rounded-2xl border border-outline-variant/12 bg-surface px-4 py-4">
            <p className="text-sm font-bold text-primary">{user.email}</p>
            <p className="mt-1 text-xs font-medium text-on-surface-variant/70">
              {user.kota?.nama_kota ?? 'Kota belum dipilih'} - {user.role}
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-surface-container px-6 py-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="rounded-2xl border border-outline-variant/18 px-5 py-3 text-sm font-bold text-on-surface-variant transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-60"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-error px-5 py-3 text-sm font-bold text-white shadow-[0_24px_42px_-26px_rgba(186,26,26,0.75)] transition-colors hover:bg-error/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
            {isDeleting ? 'Menghapus...' : 'Hapus Pengguna'}
          </button>
        </div>
      </div>
    </div>
  );
}
