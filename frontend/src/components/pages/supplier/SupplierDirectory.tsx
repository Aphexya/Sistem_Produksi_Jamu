const suppliers = [
  {
    id: 1,
    name: 'Sumenep Botanical Supply',
    status: 'Aktif',
    statusClass: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    description: 'Rimpang, Akar & Rempah Langka',
    contactName: 'Ariya Wijaya',
    contactEmail: 'ariya@botanical.md',
    contactIcon: 'mail',
    lastDelivery: '12 Okt 2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANNVo9aQMfhpTObOb-_lnvKEqP3k66vuYt190p6LIOf8rJ7Nv9x8s1kCLwd6S2sPw1dVUEyXXE89BvC3KDB5biKw0bVsZULo4MR3Pvil1UrsaEuSUI59-PxID-GzTTao_CpBO4nsQiHRuad5GH-Pcp80Z8r8gndFl1rGrPYmt_l_MtvRuYDNIRQTUafl2w2lH-RTnFTknNiRsQp1WMG8wYTbm-JUgdNYFE53coUyhr5tpfH5RvOCkJiMvYnQ6Z9pvBE18wJV45gLmd'
  },
  {
    id: 2,
    name: 'Glassware Crafts Co.',
    status: 'Menunggu Kontrak',
    statusClass: 'bg-secondary-container text-on-secondary-container',
    description: 'Kemasan Kaca & Bambu Berkelanjutan',
    contactName: 'Siti Aminah',
    contactEmail: '+62 812-992-001',
    contactIcon: 'call',
    lastDelivery: '28 Sep 2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAE97P0MxHLDkW8UmMR4q_pBjH8bIKS2iX4Wyw2ezBRl36-it0F2S1iznOJydjzQ6Opi0UDcXPpy2aUkaQ1shUxK8Gv5Dr5wWzbFMxtm32T6-9JDmadSzZk6cjPBeBeabGnoRAD6nnEB22Rk5z_CDWj1KDqpk2sSHku8iIyh5ZK0cJi8q6qpWsEsxq8QtmY5V59GSbzdu8gTe634BkkhBE55HP3VKR51I2LWyrrhM8--s9zhdi1uzcwGX-p-18fNX5lq50ndqm_1mNc'
  },
  {
    id: 3,
    name: 'Mount Agung Herbs',
    status: 'Ditangguhkan',
    statusClass: 'bg-error-container text-on-error-container',
    description: 'Botani Dataran Tinggi Premium',
    contactName: 'Dewa Ketut',
    contactEmail: 'ketut@agung.id',
    contactIcon: 'mail',
    lastDelivery: '14 Agu 2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC46De51g12QFxneEkfY7ZHSIfg3jeKpSf9ATkuCQEO6m26zQwZFAr8yglAc_kXV1oHlPpIQEN6XzAHakHxN1_WNdMO7Sn7eeF1maljiksnkAwfjI6Uwd6i57bTGJZkC95aZJHjp9NMazppnH0j6jOWL6UboIGZSyJ-6PhM3PKdi28nl4DsRBbc3ZdlZuM0ayVQAr3hlgZXZFi3sTVqbvKqSLbplJU7WUJVzPIi3ywQ5Wwj2AbrJB40Y4EKbfGI00XhTleJ02zP5_ZA'
  }
];

export default function SupplierDirectory() {
  return (
    <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden h-full flex flex-col">
      <div className="p-4 sm:p-8 border-b border-surface-container bg-surface-container-low/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <button className="px-4 py-2 bg-surface-container-high text-primary font-bold text-xs rounded-lg shadow-sm">Semua Pemasok</button>
            <button className="px-4 py-2 text-on-surface-variant/80 font-bold text-xs rounded-lg hover:bg-surface-container-low transition-colors">Rempah Mentah</button>
            <button className="px-4 py-2 text-on-surface-variant/80 font-bold text-xs rounded-lg hover:bg-surface-container-low transition-colors">Kemasan</button>
          </div>
          <button className="flex items-center gap-2 text-xs font-bold text-primary hover:bg-surface-container-low px-3 py-2 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-lg">filter_list</span>
            Konfigurasi Filter
          </button>
        </div>
      </div>

      {/* Supplier List */}
      <div className="divide-y divide-surface-container/50 flex-1">
        {suppliers.map((supplier) => (
          <div key={supplier.id} className="p-4 sm:p-8 hover:bg-surface-container-low/40 transition-colors group">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6">
              <div className="flex flex-col sm:flex-row gap-6 w-full">
                <div className="w-16 h-16 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 ring-4 ring-surface-container group-hover:ring-primary/20 shrink-0">
                  <img 
                    alt={supplier.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    src={supplier.image}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h5 className="font-headline text-xl font-bold text-primary">{supplier.name}</h5>
                    <span className={`px-2.5 py-1 ${supplier.statusClass} text-[10px] font-bold rounded shadow-sm uppercase tracking-wider`}>
                      {supplier.status}
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant font-medium mb-4">{supplier.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-on-surface-variant/80 font-medium">
                    <div className="flex items-center gap-2 bg-surface-container-low px-2.5 py-1.5 rounded-md">
                      <span className="material-symbols-outlined text-sm">person</span>
                      <span>{supplier.contactName}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-surface-container-low px-2.5 py-1.5 rounded-md">
                      <span className="material-symbols-outlined text-sm">{supplier.contactIcon}</span>
                      <span>{supplier.contactEmail}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-left md:text-right mt-4 md:mt-0 w-full md:w-auto bg-surface-container-low/30 md:bg-transparent p-4 md:p-0 rounded-xl">
                <p className="text-[10px] sm:text-xs text-on-surface-variant/60 uppercase tracking-widest font-bold mb-1">Pengiriman Terakhir</p>
                <p className="font-headline font-bold text-secondary text-sm sm:text-base">{supplier.lastDelivery}</p>
                <button className="mt-2 md:mt-4 text-primary font-bold text-xs flex items-center gap-1 md:float-right group-hover:translate-x-1 transition-transform p-1">
                  Lihat Detail <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Pagination */}
      <div className="p-6 sm:p-8 bg-surface-container-low/30 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-surface-container">
        <span className="text-xs font-bold text-on-surface-variant/60 tracking-wide uppercase">
          Menampilkan 1-12 dari 124 Pemasok
        </span>
        <div className="flex gap-2">
          <button className="w-10 h-10 flex items-center justify-center bg-surface-container-lowest rounded-lg border border-outline-variant/20 text-on-surface-variant hover:bg-primary hover:text-white hover:border-primary transition-colors shadow-sm">
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center bg-primary rounded-lg text-white shadow-md">
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}
