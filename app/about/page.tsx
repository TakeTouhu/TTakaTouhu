import type { Metadata } from 'next';
import AboutView from '@/components/AboutView';

export const metadata: Metadata = {
  title: { absolute: 'VTaVisionについて｜写真にある魅力を、動画でも伝える。' },
  description:
    'VTaVisionは、企業が持つ写真や情報を活用し、商品・施設・空間の魅力を顧客に伝えるための動画制作を支援するAIサービスです。',
  alternates: { canonical: '/about' },
};

export default function Page() {
  return <AboutView />;
}
