import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VTa Platform - エンジニアマッチングプラットフォーム',
  description: 'フリーランスエンジニアと企業をつなぐマッチングプラットフォーム。スキルや実績を登録して案件を探しましょう。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
