import { Helmet } from 'react-helmet-async';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
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

      <div className="bg-surface text-on-surface min-h-screen overflow-x-hidden font-body flex">
        <Sidebar className="hidden lg:flex" />

        <div className="flex-1 lg:ml-72 flex flex-col w-full min-h-screen">
          <TopBar />

          <main className="p-6 md:p-12 w-full max-w-[1200px] mx-auto pb-24 flex-1">
            <NotificationsHeader />
            <NotificationsTabs />
            <NotificationList />
            
            {/* Background Botanical Illustration Watermark */}
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-5 mix-blend-multiply z-[-1] pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574088523363-2280d8591cd6?q=80&w=1000&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(100%) blur(2px)' }}></div>
          </main>
        </div>
      </div>
    </>
  );
}
