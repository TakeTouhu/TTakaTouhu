import type { Metadata } from 'next';
import HomeView from '@/components/HomeView';

export const metadata: Metadata = {
  title: { absolute: 'VTaVision｜写真から、魅力が伝わる動画へ。' },
  description:
    'VTaVisionは、写真や伝えたい情報をもとに、商品・施設・空間の魅力を伝える動画制作を支援するAIサービスです。不動産、ホテル・旅館・グランピング、結婚式場・イベント会場、アミューズメント・レジャー施設、住宅・リフォーム、フィットネス施設での活用を想定しています。',
  alternates: { canonical: '/' },
};

export default function Page() {
  return <HomeView />;
}
