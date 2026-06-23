'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';
import { db } from '@/lib/db';
import CompanyNavbar from '@/components/CompanyNavbar';

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    db.init();
    if (!user) {
      router.push('/auth/login');
      return;
    }
    if (user.accountType !== 'company') {
      router.push('/engineer/dashboard');
    }
  }, [user, router]);

  if (!user || user.accountType !== 'company') return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <CompanyNavbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
