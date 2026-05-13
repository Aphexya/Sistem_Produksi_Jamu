import { Helmet } from 'react-helmet-async';
import LoginHero from '../components/pages/login/auth/LoginHero';
import LoginForm from '../components/pages/login/auth/LoginForm';

export default function Login() {
  return (
    <>
      <Helmet>
        <title>Login | Penjamu Handal — Konsol Produksi Digital</title>
        <meta
          name="description"
          content="Masuk ke konsol produksi Penjamu Handal untuk mengelola resep jamu, inventaris bahan baku, dan laporan batch secara digital."
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="theme-color" content="#003527" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Login | Penjamu Handal" />
        <meta property="og:description" content="Akses konsol produksi dan catatan resep jamu Anda." />
        <meta property="og:site_name" content="Penjamu Handal" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Login | Penjamu Handal" />
        <meta name="twitter:description" content="Akses konsol produksi dan catatan resep jamu Anda." />
      </Helmet>

      {/*
        Layout:
        - Mobile  (<lg): form centered, full screen, no hero
        - Desktop (lg+): split — hero 50% | form 50%
      */}
      <div className="bg-surface text-on-surface min-h-screen w-full overflow-hidden font-body">
        <div className="flex min-h-screen w-full">

          {/* Left: Hero panel — hidden on mobile */}
          <LoginHero />

          {/* Right: Form panel */}
          <div className="
            flex-1
            flex flex-col items-center justify-center
            min-h-screen
            px-5 py-10
            sm:px-8 sm:py-12
            lg:px-12
            xl:px-16
            bg-surface
            overflow-y-auto
          ">
            {/* Inner max-width limiter */}
            <div className="w-full max-w-sm">
              <LoginForm />
            </div>

            {/* Footer */}
            <p className="mt-8 text-center text-[11px] text-outline/60 font-medium tracking-wide">
              © {new Date().getFullYear()} Penjamu Handal · Versi 1.0
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
