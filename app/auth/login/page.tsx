'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { useAuthStore } from '@/lib/authStore';
import { useT } from '@/hooks/useT';
import LanguageToggle from '@/components/LanguageToggle';

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useAuthStore();
  const { t } = useT();
  const a = t.auth;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    db.init();
    if (user) {
      router.push(user.accountType === 'engineer' ? '/engineer/dashboard' : '/company/dashboard');
    }
  }, [user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const found = db.users.findByEmail(email);
      if (!found || found.password !== password) {
        setError(a.errorInvalid);
        setLoading(false);
        return;
      }
      login(found);
      router.push(found.accountType === 'engineer' ? '/engineer/dashboard' : '/company/dashboard');
    } catch {
      setError(a.errorLogin);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-end mb-4">
            <LanguageToggle />
          </div>
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">V</div>
            <span className="font-bold text-xl text-gray-900">VTa Platform</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{a.loginTitle}</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{a.email}</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="example@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{a.password}</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={a.passwordPlaceholder}
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? a.loggingIn : a.loginButton}
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 font-medium mb-2">{a.demoAccounts}</p>
            <div className="space-y-1 text-xs text-gray-600">
              <div>{a.engineer}: <span className="font-mono">tanaka@example.com</span> / password123</div>
              <div>{a.company}: <span className="font-mono">hr@techcorp.com</span> / password123</div>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          {a.noAccount}{' '}
          <Link href="/auth/register" className="text-blue-600 font-medium hover:underline">
            {a.newRegister}
          </Link>
        </p>
      </div>
    </div>
  );
}
