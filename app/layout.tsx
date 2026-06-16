import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VTbridge - グローバルエンジニア・リソースプロバイダー",
  description: "東欧の優秀な海外エンジニアと日本企業をつなぐB2Bコーディネーションサービス。採用コスト・手間なし、英日コミュニケーション内包で即戦力エンジニアをご提供します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
