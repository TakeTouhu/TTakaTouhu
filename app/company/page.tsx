import type { Metadata } from 'next';
import CompanyView from '@/components/CompanyView';

export const metadata: Metadata = {
  title: { absolute: '会社概要｜VTaBridge' },
  description:
    'VTaBridgeは、写真や情報をもとに商品・施設・空間の魅力を伝える動画制作を支援するAIサービス「VTaVision」の開発・運営を行っています。',
  alternates: { canonical: '/company' },
};

export default function Page() {
  return <CompanyView />;
}
