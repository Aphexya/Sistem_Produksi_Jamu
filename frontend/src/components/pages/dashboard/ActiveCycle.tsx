const steps = [
  { label: 'Persiapan', icon: 'check', status: 'done' },
  { label: 'Ekstraksi', icon: 'check', status: 'done' },
  { label: 'Perebusan', icon: 'local_fire_department', status: 'active' },
  { label: 'Filtrasi', icon: 'science', status: 'pending' },
  { label: 'Pembotolan', icon: 'inventory', status: 'pending' },
];

export default function ActiveCycle() {
  return (
    <section className="bg-surface-container-low p-8 rounded-2xl">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h3 className="text-2xl font-bold text-primary mb-1 font-headline">Siklus Saat Ini</h3>
          <p className="text-on-surface-variant text-sm">
            Batch Aktif: #BCH-2024-082 (Jamu Kunyit Asam)
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-primary font-bold text-sm hover:bg-surface-container-highest rounded-lg transition-colors">
            Lihat Log
          </button>
          <button className="px-6 py-2 bg-primary text-on-primary font-bold text-sm rounded-lg shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
            Jeda Siklus
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Progress Stepper */}
        <div className="lg:col-span-3">
          <div className="relative py-12">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-outline-variant -translate-y-1/2 opacity-30"></div>
            <div className="absolute top-1/2 left-0 w-[60%] h-1 bg-secondary -translate-y-1/2"></div>
            <div className="relative flex justify-between">
              {steps.map((step) => (
                <div key={step.label} className="flex flex-col items-center gap-3">
                  {step.status === 'done' && (
                    <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center z-10 shadow-lg">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check
                      </span>
                    </div>
                  )}
                  {step.status === 'active' && (
                    <div className="w-12 h-12 rounded-full border-4 border-secondary bg-surface text-secondary flex items-center justify-center z-10 shadow-xl ring-8 ring-secondary/10 -mt-1">
                      <span className="material-symbols-outlined animate-pulse">{step.icon}</span>
                    </div>
                  )}
                  {step.status === 'pending' && (
                    <div className="w-10 h-10 rounded-full bg-surface border-2 border-outline-variant text-outline flex items-center justify-center z-10">
                      <span className="material-symbols-outlined text-sm">{step.icon}</span>
                    </div>
                  )}
                  <span
                    className={`text-xs font-bold uppercase tracking-widest ${
                      step.status === 'done'
                        ? 'text-primary'
                        : step.status === 'active'
                        ? 'text-secondary'
                        : 'text-on-surface-variant opacity-50'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sensor Data */}
        <div className="bg-surface-container-highest p-6 rounded-xl space-y-4">
          <div className="flex justify-between text-xs font-bold uppercase text-on-surface-variant opacity-60">
            <span>Suhu Wadah</span>
            <span>Target: 92°C</span>
          </div>
          <div className="text-3xl font-extrabold text-primary font-headline">88.4°C</div>
          <div className="flex justify-between text-xs font-bold uppercase text-on-surface-variant opacity-60">
            <span>Kadar PH</span>
            <span>Rentang: 4.2-4.5</span>
          </div>
          <div className="text-3xl font-extrabold text-secondary font-headline">4.3</div>
        </div>
      </div>
    </section>
  );
}
