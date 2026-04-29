import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface Supplier {
  id_produsen: number;
  nama_produsen: string;
  alamat: string | null;
  kota: string | null;
  kontak: string | null;
  email: string | null;
  status: 'aktif' | 'menunggu' | 'ditangguhkan';
  created_at: string;
}

function getStatusStyle(status: string) {
  const map: Record<string, string> = {
    aktif:        'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    menunggu:     'bg-secondary-container text-on-secondary-container',
    ditangguhkan: 'bg-error-container text-on-error-container',
  };
  return map[status] ?? 'bg-surface-container text-on-surface-variant';
}

function getStatusLabel(status: string) {
  const map: Record<string, string> = {
    aktif:        'Aktif',
    menunggu:     'Menunggu Kontrak',
    ditangguhkan: 'Ditangguhkan',
  };
  return map[status] ?? status;
}

async function fetchSuppliers(filter: string): Promise<Supplier[]> {
  const params = filter && filter !== 'semua' ? `?status=${filter}` : '';
  const res = await fetch(`/api/supplier${params}`);
  if (!res.ok) throw new Error('Gagal memuat pemasok');
  const json = await res.json();
  return Array.isArray(json.data) ? json.data : [];
}

const ITEMS_PER_PAGE = 5;

export default function SupplierDirectory() {
  const [filter, setFilter] = useState('semua');
  const [page, setPage] = useState(1);

  const { data: suppliers = [], isLoading, error } = useQuery({
    queryKey: ['suppliers', filter],
    queryFn: () => fetchSuppliers(filter),
  });

  const totalPages = Math.ceil(suppliers.length / ITEMS_PER_PAGE);
  const paged = suppliers.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleFilter = (f: string) => { setFilter(f); setPage(1); };

  return (
    <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden h-full flex flex-col">
      {/* Filter Bar */}
      <div className="p-4 sm:p-8 border-b border-surface-container bg-surface-container-low/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {['semua', 'aktif', 'menunggu', 'ditangguhkan'].map((f) => (
              <button
                key={f}
                onClick={() => handleFilter(f)}
                className={`px-4 py-2 font-bold text-xs rounded-lg transition-colors capitalize ${
                  filter === f
                    ? 'bg-surface-container-high text-primary shadow-sm'
                    : 'text-on-surface-variant/80 hover:bg-surface-container-low'
                }`}
              >
                {f === 'semua' ? 'Semua Pemasok' : getStatusLabel(f)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-surface-container/50 flex-1">
        {isLoading && (
          <div className="flex items-center justify-center py-16 gap-3 text-on-surface/40">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">Memuat pemasok...</span>
          </div>
        )}

        {error && !isLoading && (
          <div className="p-8 text-center text-sm text-on-error-container bg-error-container/20">
            Gagal memuat data pemasok
          </div>
        )}

        {!isLoading && !error && paged.length === 0 && (
          <div className="p-12 text-center text-sm text-on-surface/40 font-medium">
            Tidak ada pemasok ditemukan
          </div>
        )}

        {!isLoading && !error && paged.map((supplier) => (
          <div key={supplier.id_produsen} className="p-4 sm:p-8 hover:bg-surface-container-low/40 transition-colors group">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6">
              <div className="flex flex-col sm:flex-row gap-6 w-full">
                {/* Avatar inisial */}
                <div className="w-16 h-16 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center font-extrabold text-xl shrink-0 ring-4 ring-surface-container group-hover:ring-primary/20 transition-all">
                  {supplier.nama_produsen.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h5 className="font-headline text-xl font-bold text-primary">{supplier.nama_produsen}</h5>
                    <span className={`px-2.5 py-1 ${getStatusStyle(supplier.status)} text-[10px] font-bold rounded shadow-sm uppercase tracking-wider`}>
                      {getStatusLabel(supplier.status)}
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant font-medium mb-4">
                    {supplier.kota ?? 'Lokasi tidak diketahui'}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-on-surface-variant/80 font-medium">
                    {supplier.kontak && (
                      <div className="flex items-center gap-2 bg-surface-container-low px-2.5 py-1.5 rounded-md">
                        <span className="material-symbols-outlined text-sm">call</span>
                        <span>{supplier.kontak}</span>
                      </div>
                    )}
                    {supplier.email && (
                      <div className="flex items-center gap-2 bg-surface-container-low px-2.5 py-1.5 rounded-md">
                        <span className="material-symbols-outlined text-sm">mail</span>
                        <span>{supplier.email}</span>
                      </div>
                    )}
                    {!supplier.kontak && !supplier.email && (
                      <span className="text-on-surface/30 italic">Kontak belum tersedia</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-left md:text-right mt-4 md:mt-0 w-full md:w-auto">
                <p className="text-[10px] sm:text-xs text-on-surface-variant/60 uppercase tracking-widest font-bold mb-1">Terdaftar</p>
                <p className="font-headline font-bold text-secondary text-sm sm:text-base">
                  {new Date(supplier.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
                <button className="mt-2 md:mt-4 text-primary font-bold text-xs flex items-center gap-1 md:float-right group-hover:translate-x-1 transition-transform p-1">
                  Lihat Detail <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="p-6 sm:p-8 bg-surface-container-low/30 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-surface-container">
        <span className="text-xs font-bold text-on-surface-variant/60 tracking-wide uppercase">
          Menampilkan {Math.min((page - 1) * ITEMS_PER_PAGE + 1, suppliers.length)}–{Math.min(page * ITEMS_PER_PAGE, suppliers.length)} dari {suppliers.length} Pemasok
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-10 h-10 flex items-center justify-center bg-surface-container-lowest rounded-lg border border-outline-variant/20 text-on-surface-variant hover:bg-primary hover:text-white hover:border-primary transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="w-10 h-10 flex items-center justify-center bg-primary rounded-lg text-white shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}
