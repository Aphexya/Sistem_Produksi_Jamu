import { Helmet } from 'react-helmet-async';
import AppShell from '../components/layout/AppShell';
import NotificationsHeader from '../components/pages/notifications/NotificationsHeader';
import NotificationsTabs from '../components/pages/notifications/NotificationsTabs';
import NotificationList from '../components/pages/notifications/NotificationList';

export default function Notifications() {
  return (
    <>
      <Helmet>
        <title>Pusat Notifikasi | Penjamu Handal</title>
        <meta name="description" content="Pusat notifikasi dan peringatan sistem lab Penjamu Handal." />
      </Helmet>

      <AppShell>
        <main className="p-4 sm:p-6 md:p-12 w-full max-w-[1200px] mx-auto pb-24 flex-1">
          <NotificationsHeader />
          <NotificationsTabs />
          <NotificationList />

          {/* Background Botanical Illustration Watermark */}
          <div
            className="fixed bottom-0 right-0 w-64 sm:w-[500px] h-64 sm:h-[500px] pointer-events-none opacity-5 mix-blend-multiply z-[-1]"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1574088523363-2280d8591cd6?q=80&w=1000&auto=format&fit=crop')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'grayscale(100%) blur(2px)',
            }}
          />
        </main>
      </AppShell>
    </>
  );
}
