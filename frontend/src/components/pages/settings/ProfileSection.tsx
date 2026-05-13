import { useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { fetchCities, fetchUsers, updateUser, type CityOption, type UserRecord } from '../../../services/userService';
import { useAuthStore, type AuthUser } from '../../../store/useAuthStore';
import { queryClient } from '../../../utils/queryClient';

const roleLabel = {
  admin: 'Administrator',
  supervisor: 'Supervisor',
  staff: 'Staff Produksi',
};

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

function getWorkerId(id?: number, createdAt?: string | null) {
  const year = createdAt ? new Date(createdAt).getFullYear() : new Date().getFullYear();
  return `PH-${year}-${String(id ?? 0).padStart(3, '0')}`;
}

function getMemberSince(createdAt?: string | null) {
  if (!createdAt) {
    return 'Anggota aktif';
  }

  return `Anggota sejak ${new Date(createdAt).toLocaleDateString('id-ID', {
    month: 'short',
    year: 'numeric',
  })}`;
}

function getSavedProfile(localKey: string) {
  try {
    return JSON.parse(localStorage.getItem(localKey) ?? '{}') as { phone?: string; signature?: string };
  } catch {
    return {};
  }
}

interface ProfileEditorProps {
  profile: AuthUser | UserRecord;
  fullUser: UserRecord | null;
  cities: CityOption[];
  isCitiesLoading: boolean;
  refreshSession: () => Promise<void>;
}

function ProfileEditor({ profile, fullUser, cities, isCitiesLoading, refreshSession }: ProfileEditorProps) {
  const localKey = `settings-profile-${profile.id_user}`;
  const savedProfile = getSavedProfile(localKey);
  const [formData, setFormData] = useState({
    username: profile.username,
    email: profile.email,
    id_kota: profile.id_kota ? String(profile.id_kota) : '',
  });
  const [phone, setPhone] = useState(savedProfile.phone ?? '');
  const [signature, setSignature] = useState(savedProfile.signature ?? profile.username);

  const saveMutation = useMutation({
    mutationFn: async () => {
      await updateUser(profile.id_user, {
        username: formData.username.trim(),
        email: formData.email.trim(),
        role: profile.role,
        id_kota: formData.id_kota ? Number(formData.id_kota) : null,
      });

      localStorage.setItem(localKey, JSON.stringify({ phone: phone.trim(), signature: signature.trim() }));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      await refreshSession();
      toast.success('Profil diperbarui');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.username.trim()) {
      toast.error('Nama pengguna wajib diisi');
      return;
    }

    if (!formData.email.trim()) {
      toast.error('Email wajib diisi');
      return;
    }

    saveMutation.mutate();
  };

  return (
    <section className="mb-16 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-8 rounded-2xl border border-outline-variant/5 bg-surface-container-lowest p-6 shadow-sm sm:p-10">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
          <div className="relative shrink-0">
            <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-primary text-4xl font-extrabold text-on-primary ring-4 ring-surface-container shadow-sm">
              {getInitials(profile.username)}
            </div>
            <div className="absolute -bottom-3 -right-3 flex rounded-xl bg-secondary p-2.5 text-on-secondary shadow-lg">
              <span className="material-symbols-outlined text-sm">verified_user</span>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="font-headline text-2xl font-bold text-primary">{profile.username}</h3>
            <p className="mt-1 inline-block rounded bg-surface-container-low px-3 py-1 text-sm font-medium text-on-surface-variant">
              {roleLabel[profile.role]} - {getMemberSince(fullUser?.created_at)}
            </p>
            <p className="mt-3 text-sm font-medium text-on-surface-variant/80">
              {fullUser?.kota?.nama_kota ?? 'Wilayah kerja belum dipilih'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 border-t border-outline-variant/10 pt-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="px-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Nama Pengguna</label>
            <input
              className="w-full rounded-xl border border-transparent bg-surface-container-low px-4 py-3 text-sm transition-all hover:bg-surface-container focus:border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/50"
              type="text"
              value={formData.username}
              onChange={(event) => setFormData((prev) => ({ ...prev, username: event.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <label className="px-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Alamat Email</label>
            <input
              className="w-full rounded-xl border border-transparent bg-surface-container-low px-4 py-3 text-sm transition-all hover:bg-surface-container focus:border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/50"
              type="email"
              value={formData.email}
              onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <label className="px-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">ID Pekerja</label>
            <input
              className="w-full cursor-not-allowed rounded-xl border border-outline-variant/20 bg-surface px-4 py-3 text-sm italic text-on-surface-variant/70"
              readOnly
              type="text"
              value={getWorkerId(profile.id_user, fullUser?.created_at)}
            />
          </div>

          <div className="space-y-2">
            <label className="px-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Wilayah Kerja</label>
            <select
              className="w-full rounded-xl border border-transparent bg-surface-container-low px-4 py-3 text-sm transition-all hover:bg-surface-container focus:border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={formData.id_kota}
              onChange={(event) => setFormData((prev) => ({ ...prev, id_kota: event.target.value }))}
            >
              <option value="">{isCitiesLoading ? 'Memuat kota...' : 'Pilih kota'}</option>
              {cities.map((city) => (
                <option key={city.id_kota} value={String(city.id_kota)}>
                  {city.nama_kota}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="px-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">Nomor Telepon</label>
            <input
              className="w-full rounded-xl border border-transparent bg-surface-container-low px-4 py-3 text-sm transition-all hover:bg-surface-container focus:border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/50"
              type="tel"
              value={phone}
              placeholder="+62 812 3456 7890"
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>

          <div className="col-span-1 pt-6 sm:col-span-2">
            <button
              type="submit"
              disabled={saveMutation.isPending}
              className="w-full rounded-xl bg-primary px-8 py-3.5 text-sm font-bold tracking-wide text-on-primary shadow-md shadow-primary/20 outline-none transition-all hover:opacity-95 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {saveMutation.isPending ? 'MENYIMPAN...' : 'SIMPAN PERUBAHAN'}
            </button>
          </div>
        </form>
      </div>

      <div className="h-full space-y-6">
        <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-2xl bg-primary p-8 text-on-primary shadow-lg sm:p-10">
          <div className="relative z-10 flex h-full flex-col">
            <h4 className="mb-3 font-headline text-xl font-extrabold">Tanda Tangan Digital</h4>
            <p className="mb-8 text-sm font-medium leading-relaxed text-primary-fixed-dim">
              Tanda tangan Anda diperlukan untuk otorisasi rilis bahan dan pemeriksaan kualitas akhir Continuous Quality Control.
            </p>
            <label className="flex min-h-[220px] flex-1 cursor-text items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-white/5 px-6 transition-colors hover:bg-white/10">
              <input
                className="w-full bg-transparent text-center font-headline text-4xl font-extrabold text-white/75 outline-none placeholder:text-white/30"
                value={signature}
                placeholder="Tulis tanda tangan"
                onChange={(event) => setSignature(event.target.value)}
              />
            </label>
            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-white/45">Tersimpan bersama perubahan profil</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProfileSection() {
  const currentUser = useAuthStore((state) => state.user);
  const refreshSession = useAuthStore((state) => state.fetchMe);

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const { data: cities = [], isLoading: isCitiesLoading } = useQuery({
    queryKey: ['cities'],
    queryFn: fetchCities,
  });

  const fullUser = useMemo(
    () => users.find((user) => user.id_user === currentUser?.id_user) ?? null,
    [currentUser?.id_user, users]
  );

  const profile = fullUser ?? currentUser;

  if (!profile) {
    return (
      <section className="mb-16 rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-8 text-sm font-medium text-on-surface-variant">
        Memuat profil pengguna...
      </section>
    );
  }

  return (
    <ProfileEditor
      key={`${profile.id_user}-${profile.username}-${profile.email}-${profile.id_kota ?? ''}`}
      profile={profile}
      fullUser={fullUser}
      cities={cities}
      isCitiesLoading={isCitiesLoading}
      refreshSession={refreshSession}
    />
  );
}
