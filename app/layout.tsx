import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "定款作成くん - 電子定款を簡単作成",
  description: "株式会社・合同会社の定款を無料で簡単に作成。ステップ形式で入力するだけで、法的に正確な電子定款をPDFで出力できます。",
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
