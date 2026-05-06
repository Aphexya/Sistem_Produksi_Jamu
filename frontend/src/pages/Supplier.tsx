import { Helmet } from 'react-helmet-async';
import AppShell from '../components/layout/AppShell';
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

      <AppShell>
        <main className="p-4 sm:p-6 md:p-12 max-w-7xl w-full mx-auto pb-24">
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
      </AppShell>
    </>
  );
}
