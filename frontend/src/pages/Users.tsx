import { Helmet } from 'react-helmet-async';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import UsersHeader from '../components/pages/users/UsersHeader';
import UsersMetrics from '../components/pages/users/UsersMetrics';
import UsersTable from '../components/pages/users/UsersTable';
import UsersFooter from '../components/pages/users/UsersFooter';

export default function Users() {
  return (
    <>
      <Helmet>
        <title>Direktori Staf | Penjamu Handal</title>
        <meta name="description" content="Manajemen tata kelola akses dan peran staf laboratorium Penjamu Handal." />
      </Helmet>

      <div className="bg-background text-on-background min-h-screen overflow-x-hidden font-body flex">
        <Sidebar className="hidden lg:flex" />

        <div className="flex-1 lg:ml-72 flex flex-col w-full min-h-screen">
          <TopBar />

          <main className="p-6 md:p-12 w-full max-w-[1300px] mx-auto pb-24 flex-1">
            <UsersHeader />
            <UsersMetrics />
            <UsersTable />
            <UsersFooter />
          </main>
        </div>
      </div>
    </>
  );
}
