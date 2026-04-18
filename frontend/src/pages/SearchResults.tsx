import { Helmet } from 'react-helmet-async';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import SearchHeader from '../components/pages/search/SearchHeader';
import SearchTabs from '../components/pages/search/SearchTabs';
import RecipesResults from '../components/pages/search/RecipesResults';
import InventoryResults from '../components/pages/search/InventoryResults';
import SuppliersResults from '../components/pages/search/SuppliersResults';

export default function SearchResults() {
  return (
    <>
      <Helmet>
        <title>Hasil Pencarian: Kencur | Penjamu Handal</title>
        <meta name="description" content="Hasil pencarian untuk silinder obat dan aset produksi Penjamu Handal." />
      </Helmet>

      <div className="bg-background text-on-background min-h-screen overflow-x-hidden font-body flex">
        <Sidebar className="hidden lg:flex" />

        <div className="flex-1 lg:ml-72 flex flex-col w-full min-h-screen">
          <TopBar />

          <main className="p-6 md:p-12 w-full max-w-[1200px] mx-auto pb-24 flex-1">
            <SearchHeader />
            <SearchTabs />
            
            <div className="space-y-12">
              <RecipesResults />
              <InventoryResults />
              <SuppliersResults />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
