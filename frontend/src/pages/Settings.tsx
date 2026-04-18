import { Helmet } from 'react-helmet-async';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import SettingsTabs from '../components/pages/settings/SettingsTabs';
import ProfileSection from '../components/pages/settings/ProfileSection';
import SystemThresholds from '../components/pages/settings/SystemThresholds';
import UserManagement from '../components/pages/settings/UserManagement';

export default function Settings() {
  return (
    <>
      <Helmet>
        <title>Pengaturan Konfigurasi | Penjamu Handal</title>
        <meta name="description" content="Pengaturan sistem, profil, ambang batas produksi, dan manajemen hak akses Penjamu Handal." />
      </Helmet>

      <div className="bg-surface text-on-surface min-h-screen overflow-x-hidden font-body flex">
        <Sidebar />

        <div className="flex-1 lg:ml-72 flex flex-col w-full h-screen overflow-y-auto">
          <TopBar />

          <main className="max-w-[1400px] w-full mx-auto pb-24">
            {/* Page Header */}
            <div className="px-6 md:px-12 pt-12 pb-6">
              <h2 className="text-4xl sm:text-5xl font-headline font-extrabold text-primary tracking-tight">Konfigurasi Konsol</h2>
              <p className="text-on-surface-variant font-body mt-2 text-sm sm:text-base">Mempersonalisasi dan mensinkronisasikan instrumen digital laboratorium apotekeri serta hierarki hierarki tim.</p>
            </div>

            {/* Content Area */}
            <div className="px-6 md:px-12">
              <SettingsTabs />
              
              <ProfileSection />
              <SystemThresholds />
              <UserManagement />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
