import { Helmet } from 'react-helmet-async';
import AppShell from '../components/layout/AppShell';
import SearchHeader from '../components/pages/search/SearchHeader';
import SearchTabs from '../components/pages/search/SearchTabs';
import RecipesResults from '../components/pages/search/RecipesResults';
import InventoryResults from '../components/pages/search/InventoryResults';
import SuppliersResults from '../components/pages/search/SuppliersResults';

export default function SearchResults() {
  return (
    <>
      <Helmet>
        <title>Hasil Pencarian | Penjamu Handal</title>
        <meta name="description" content="Hasil pencarian untuk aset produksi Penjamu Handal." />
      </Helmet>

      <AppShell>
        <main className="p-4 sm:p-6 md:p-12 w-full max-w-[1200px] mx-auto pb-24 flex-1">
          <SearchHeader />
          <SearchTabs />

          <div className="space-y-12">
            <RecipesResults />
            <InventoryResults />
            <SuppliersResults />
          </div>
        </main>
      </AppShell>
    </>
  );
}
