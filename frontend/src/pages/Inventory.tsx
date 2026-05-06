import { Helmet } from 'react-helmet-async';
import AppShell from '../components/layout/AppShell';
import InventoryHeader from '../components/pages/inventory/InventoryHeader';
import InventoryTable from '../components/pages/inventory/InventoryTable';
import InventoryBento from '../components/pages/inventory/InventoryBento';

export default function Inventory() {
  return (
    <>
      <Helmet>
        <title>Inventaris | Penjamu Handal</title>
        <meta name="description" content="Manajemen stok bahan baku esensial untuk produksi Jamu." />
      </Helmet>

      <AppShell>
        <main className="p-4 sm:p-8 space-y-6 max-w-[1400px] w-full pb-20">
          <InventoryHeader />
          <InventoryTable />
          <InventoryBento />
        </main>
      </AppShell>
    </>
  );
}
