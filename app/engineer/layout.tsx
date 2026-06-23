'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';
import { db } from '@/lib/db';
import EngineerNavbar from '@/components/EngineerNavbar';

export default function EngineerLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    db.init();
    if (!user) {
      router.push('/auth/login');
      return;
    }
    if (user.accountType !== 'engineer') {
      router.push('/company/dashboard');
    }
  }, [user, router]);

  if (!user || user.accountType !== 'engineer') return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <EngineerNavbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
