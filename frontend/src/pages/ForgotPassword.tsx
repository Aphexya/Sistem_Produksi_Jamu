import { Helmet } from 'react-helmet-async';
import LoginHero from '../components/pages/login/auth/LoginHero';
import ForgotPasswordForm from '../components/pages/login/auth/ForgotPasswordForm';

export default function ForgotPassword() {
  return (
    <>
      <Helmet>
        <title>Lupa Kata Sandi | Penjamu Handal</title>
        <meta name="description" content="Atur ulang kata sandi Anda untuk mengakses konsol produksi Penjamu Handal." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="bg-surface text-on-surface min-h-screen flex items-center justify-center p-0 m-0 overflow-hidden font-body">
        <div className="flex w-full h-screen">
          
          <LoginHero />

          <div className="w-full lg:w-1/2 bg-surface flex flex-col items-center justify-center p-8 md:p-24 overflow-y-auto">
            <ForgotPasswordForm />
          </div>

        </div>
      </div>
    </>
  );
}
