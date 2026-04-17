import { Helmet } from 'react-helmet-async';
import LoginHero from '../components/pages/login/auth/LoginHero';
import LoginForm from '../components/pages/login/auth/LoginForm';

export default function Login() {
  return (
    <>
      <Helmet>
        <title>Login | Penjamu Handal — Digital Apothecary Production Console</title>
        <meta name="description" content="Masuk ke konsol produksi Penjamu Handal untuk mengelola resep jamu, inventaris bahan baku, dan laporan batch secara digital." />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="theme-color" content="#003527" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Login | Penjamu Handal" />
        <meta property="og:description" content="Akses konsol produksi dan catatan resep jamu Anda." />
        <meta property="og:site_name" content="Penjamu Handal" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Login | Penjamu Handal" />
        <meta name="twitter:description" content="Akses konsol produksi dan catatan resep jamu Anda." />
      </Helmet>

      <div className="bg-surface text-on-surface min-h-screen flex items-center justify-center p-0 m-0 overflow-hidden font-body">
        <div className="flex w-full h-screen">

          <LoginHero />

          <div className="w-full lg:w-1/2 bg-surface flex flex-col items-center justify-center p-8 md:p-24">
            <LoginForm />
          </div>

        </div>
      </div>
    </>
  );
}
