import type { Metadata } from 'next';
import ContactView from '@/components/ContactView';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description:
    'VTaVisionの導入に関するご相談、サービス内容についてのご質問を承っています。お持ちの素材とご要望をうかがったうえで、ご提供できる内容をご案内します。',
  alternates: { canonical: '/contact' },
};

export default function Page() {
  return <ContactView />;
}
