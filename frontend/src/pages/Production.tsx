import { Helmet } from 'react-helmet-async';
import AppShell from '../components/layout/AppShell';
import RecipeFormulation from '../components/pages/production/RecipeFormulation';
import IngredientComposition from '../components/pages/production/IngredientComposition';
import OutputEstimation from '../components/pages/production/OutputEstimation';
import SOPValidation from '../components/pages/production/SOPValidation';

export default function Production() {
  return (
    <>
      <Helmet>
        <title>Konsol Produksi | Penjamu Handal</title>
        <meta name="description" content="Input staff untuk formulasi batch produksi Jamu Madura." />
      </Helmet>

      <AppShell>
        <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-8 text-sm font-bold text-on-surface-variant/50 uppercase tracking-widest">
            <span>Konsol Produksi</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary">Input Staff</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Kolom Kiri: Form & Tabel */}
            <div className="col-span-1 lg:col-span-8 space-y-8 flex flex-col">
              <RecipeFormulation />
              <IngredientComposition />
            </div>

            {/* Kolom Kanan: Stats & SOP */}
            <div className="col-span-1 lg:col-span-4 space-y-8 flex flex-col">
              <OutputEstimation />
              <SOPValidation />
            </div>
          </div>
        </main>
      </AppShell>
    </>
  );
}
