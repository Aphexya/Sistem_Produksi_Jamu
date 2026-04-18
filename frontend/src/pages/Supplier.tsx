import { Helmet } from 'react-helmet-async';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import SupplierHeader from '../components/pages/supplier/SupplierHeader';
import SupplierMetrics from '../components/pages/supplier/SupplierMetrics';
import SupplierDirectory from '../components/pages/supplier/SupplierDirectory';

export default function Supplier() {
  return (
    <>
      <Helmet>
        <title>Sumber Bahan | Penjamu Handal</title>
        <meta name="description" content="Manajemen pemasok dan jaringan bahan baku artisanal Penjamu Handal." />
      </Helmet>

      <div className="bg-surface text-on-surface min-h-screen overflow-x-hidden font-body flex">
        <Sidebar />

        <div className="flex-1 lg:ml-72 flex flex-col w-full">
          <TopBar />

          <main className="p-6 md:p-12 max-w-7xl w-full mx-auto pb-24">
            <SupplierHeader />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="col-span-1 lg:col-span-4">
                <SupplierMetrics />
              </div>
              <div className="col-span-1 lg:col-span-8">
                <SupplierDirectory />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
