import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Email dan password harus diisi');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login gagal');
      }

      // Simpan token dan user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast.success(`Selamat datang, ${data.user.username}!`);
      
      // Redirect ke dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error instanceof Error ? error.message : 'Login gagal. Periksa email dan password Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Mobile Branding */}
      <div className="lg:hidden mb-12 text-center">
        <h1 className="text-primary font-headline text-3xl font-extrabold tracking-tight">Penjamu Handal</h1>
        <p className="text-outline font-medium mt-2">Apotek Digital</p>
      </div>

      <div className="mb-10">
        <h2 className="text-on-surface font-headline text-3xl font-bold tracking-tight mb-2">Selamat Datang Kembali</h2>
        <p className="text-on-surface-variant font-medium">Akses konsol produksi dan log resep Anda.</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-on-surface-variant tracking-wide" htmlFor="email">
            Alamat Email
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
              placeholder="admin@penjamuhandal.id"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              autoComplete="email"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-on-surface-variant tracking-wide" htmlFor="password">
            Kata Sandi
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-outline group-focus-within:text-primary transition-colors text-[20px]">
                lock
              </span>
            </div>
            <input
              className="block w-full pl-11 pr-12 py-4 bg-surface-container-highest border-none rounded-xl focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-outline/50"
              id="password"
              name="password"
              placeholder="••••••••"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              autoComplete="current-password"
            />
            <button 
              className="absolute inset-y-0 right-0 pr-4 flex items-center" 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <span className="material-symbols-outlined text-outline hover:text-on-surface transition-colors text-[20px]">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <input
              className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer bg-surface-container-highest"
              id="remember"
              name="remember"
              type="checkbox"
              disabled={isLoading}
            />
            <label className="text-sm font-medium text-on-surface-variant cursor-pointer" htmlFor="remember">
              Ingat saya
            </label>
          </div>
          <Link
            to="/forgot-password"
            className="text-sm font-bold text-secondary hover:text-on-secondary-fixed-variant transition-colors"
          >
            Lupa kata sandi?
          </Link>
        </div>

        <button
          className="w-full apothecary-gradient text-on-primary font-bold py-4 rounded-xl custom-shadow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
              Memproses...
            </>
          ) : (
            <>
              Masuk ke Konsol
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-12 pt-8 border-t border-outline-variant/30 text-center">
        <p className="text-on-surface-variant text-sm font-medium">
          Manajer batch baru?{' '}
          <Link to="/request-access" className="text-primary font-bold ml-1 hover:underline underline-offset-4">
            Minta Akses
          </Link>
        </p>
      </div>

      <div className="mt-24 grid grid-cols-3 gap-4">
        <div className="h-1 bg-surface-container-high rounded-full overflow-hidden">
          <div className="h-full w-full bg-secondary-container"></div>
        </div>
        <div className="h-1 bg-surface-container-high rounded-full"></div>
        <div className="h-1 bg-surface-container-high rounded-full"></div>
      </div>
      <div className="mt-4 flex justify-between text-[10px] uppercase tracking-widest font-bold text-outline">
        <span>Ekstraksi</span>
        <span className="opacity-30">Distilasi</span>
        <span className="opacity-30">Pembotolan</span>
      </div>
    </div>
  );
}
