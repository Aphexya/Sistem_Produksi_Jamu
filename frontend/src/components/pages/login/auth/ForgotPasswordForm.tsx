import { Link } from 'react-router-dom';

export default function ForgotPasswordForm() {
  return (
    <div className="w-full max-w-md">
      {/* Mobile Branding */}
      <div className="lg:hidden mb-12 text-center">
        <h1 className="text-primary font-headline text-3xl font-extrabold tracking-tight">Penjamu Handal</h1>
        <p className="text-outline font-medium mt-2">Apotek Digital</p>
      </div>

      <div className="mb-10">
        <h2 className="text-on-surface font-headline text-3xl font-bold tracking-tight mb-2">Lupa Kata Sandi?</h2>
        <p className="text-on-surface-variant font-medium">Masukkan email yang terdaftar, kami akan mengirimkan instruksi untuk mengatur ulang kata sandi Anda.</p>
      </div>

      <form className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-on-surface-variant tracking-wide" htmlFor="email">
            Alamat Email Pekerjaan
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-outline group-focus-within:text-primary transition-colors text-[20px]">
                mail
              </span>
            </div>
            <input
              className="block w-full pl-11 pr-4 py-4 bg-surface-container-highest border-none rounded-xl focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-outline/50"
              id="email"
              name="email"
              placeholder="apoteker@penjamu.com"
              type="email"
              required
            />
          </div>
        </div>

        <button
          className="w-full apothecary-gradient text-on-primary font-bold py-4 rounded-xl custom-shadow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
          type="submit"
        >
          Kirim Instruksi Atur Ulang
          <span className="material-symbols-outlined text-[18px]">key</span>
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-outline-variant/30 text-center">
        <p className="text-on-surface-variant text-sm font-medium flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <Link to="/" className="text-primary font-bold hover:underline underline-offset-4">
            Kembali ke Login
          </Link>
        </p>
      </div>
    </div>
  );
}
