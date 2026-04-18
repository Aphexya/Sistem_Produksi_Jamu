import { Helmet } from 'react-helmet-async';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import RecipeDetailHero from '../components/pages/recipes/RecipeDetailHero';
import RecipeDetailContent from '../components/pages/recipes/RecipeDetailContent';

export default function RecipeDetail() {
  return (
    <>
      <Helmet>
        <title>Kunyit Asam - Detail Resep | Penjamu Handal</title>
        <meta name="description" content="Detail resep dan komposisi produksi untuk Jamu Kunyit Asam." />
      </Helmet>

      <div className="bg-background text-on-background min-h-screen overflow-x-hidden font-body flex">
        <Sidebar className="hidden lg:flex" />

        <div className="flex-1 lg:ml-72 flex flex-col w-full min-h-screen">
          <TopBar />

          <main className="p-6 md:p-12 w-full max-w-[1300px] mx-auto pb-24 flex-1">
            <RecipeDetailHero />
            <RecipeDetailContent />
          </main>
        </div>
      </div>
    </>
  );
}
