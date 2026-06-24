'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';
import { db } from '@/lib/db';
import EngineerNavbar from '@/components/EngineerNavbar';

export default function EngineerLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    db.init();
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!user) {
      router.push('/auth/login');
      return;
    }
    if (user.accountType !== 'engineer') {
      router.push('/company/dashboard');
    }
  }, [mounted, user, router]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400 text-sm">読み込み中...</div>
      </div>
    );
  }

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
