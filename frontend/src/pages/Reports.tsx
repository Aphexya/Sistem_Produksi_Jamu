import { Helmet } from 'react-helmet-async';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import ReportsHeader from '../components/pages/reports/ReportsHeader';
import ReportsMetrics from '../components/pages/reports/ReportsMetrics';
import ReportsVolumeChart from '../components/pages/reports/ReportsVolumeChart';
import ReportsStock from '../components/pages/reports/ReportsStock';
import ReportsTable from '../components/pages/reports/ReportsTable';

export default function Reports() {
  return (
    <>
      <Helmet>
        <title>Laporan Analitik | Penjamu Handal</title>
        <meta name="description" content="Laporan analitik produksi dan keseimbangan efisiensi bahan Penjamu Handal." />
      </Helmet>

      <div className="bg-background text-on-background min-h-screen overflow-x-hidden font-body flex">
        <Sidebar />

        <div className="flex-1 lg:ml-72 flex flex-col w-full">
          <TopBar />

          <main className="p-6 md:p-10 max-w-[1400px] w-full mx-auto space-y-10 pb-24">
            <ReportsHeader />
            <ReportsMetrics />
            
            <section className="grid grid-cols-1 xl:grid-cols-3 gap-10">
              <ReportsVolumeChart />
              <ReportsStock />
            </section>
            
            <ReportsTable />
          </main>
        </div>
      </div>
    </>
  );
}
