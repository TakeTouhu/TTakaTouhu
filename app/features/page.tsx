import type { Metadata } from 'next';
import FeaturesView from '@/components/FeaturesView';

export const metadata: Metadata = {
  title: '提供内容と活用が想定される業界',
  description:
    'VTaVisionは、写真や伝えたい情報をもとに、商品・施設・空間の魅力を伝える動画制作を支援するAIサービスです。不動産、ホテル・旅館・グランピング、結婚式場・イベント会場、アミューズメント・レジャー施設、住宅・リフォーム、フィットネス施設での活用を想定しています。',
  alternates: { canonical: '/features' },
};

export default function Page() {
  return <FeaturesView />;
}
