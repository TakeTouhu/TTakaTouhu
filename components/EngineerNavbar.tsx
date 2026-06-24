'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';
import { useT } from '@/hooks/useT';
import LanguageToggle from '@/components/LanguageToggle';

export default function EngineerNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { t } = useT();
  const n = t.nav.engineer;

  const NAV_LINKS = [
    { href: '/engineer/dashboard', label: n.dashboard },
    { href: '/engineer/jobs', label: n.jobs },
    { href: '/engineer/applications', label: n.applications },
    { href: '/engineer/profile', label: n.profile },
    { href: '/engineer/skills', label: n.skills },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/engineer/dashboard" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">V</div>
          <span className="font-bold text-gray-900">VTa Platform</span>
          <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded">{n.badge}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <span className="text-sm text-gray-500 hidden sm:block">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
          >
            {t.common.logout}
          </button>
        </div>
      </div>

      <nav className="md:hidden flex gap-1 px-4 pb-2 overflow-x-auto">
        {NAV_LINKS.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              pathname === link.href
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
