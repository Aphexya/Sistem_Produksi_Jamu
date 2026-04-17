import { Helmet } from 'react-helmet-async';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import RecipesHeader from '../components/pages/recipes/RecipesHeader';
import RecipeGrid from '../components/pages/recipes/RecipeGrid';
import RecipeStats from '../components/pages/recipes/RecipeStats';

export default function Recipes() {
  return (
    <>
      <Helmet>
        <title>Perpustakaan Resep | Penjamu Handal</title>
        <meta name="description" content="Manajemen formula herbal dan resep jamu tradisional." />
      </Helmet>

      <div className="bg-surface text-on-surface min-h-screen overflow-x-hidden font-body flex">
        <Sidebar />

        <div className="flex-1 lg:ml-72 flex flex-col w-full">
          <TopBar />

          <main className="p-6 md:p-12 max-w-7xl w-full mx-auto pb-24">
            <RecipesHeader />
            <RecipeGrid />
            <RecipeStats />
          </main>
        </div>
      </div>
    </>
  );
}
