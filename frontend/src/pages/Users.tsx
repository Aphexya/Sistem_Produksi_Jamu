import { Helmet } from 'react-helmet-async';
import AppShell from '../components/layout/AppShell';
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

      <AppShell>
        <main className="p-4 sm:p-6 md:p-12 w-full max-w-[1300px] mx-auto pb-24 flex-1">
          <UsersHeader />
          <UsersMetrics />
          <UsersTable />
          <UsersFooter />
        </main>
      </AppShell>
    </>
  );
}
