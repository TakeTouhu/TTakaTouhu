import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// TODO: 独自ドメイン取得後にここを差し替える（sitemap.xml / robots.txt / llms.txt も同様）
const SITE_URL = "https://t-taka-touhu.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VTaBridge | 海外エンジニア採用・即戦力IT人材でDX推進を加速するグローバルリソースプロバイダー",
    template: "%s | VTaBridge",
  },
  description: "VTaBridgeは海外の優秀なエンジニアと日本企業をつなぐB2Bコーディネーションサービスです。Java・Python・React・AWS対応の即戦力エンジニアを採用コスト不要・フリーランス契約で週単位からご提供します。IT人材不足・DX推進でお悩みの企業様はご相談ください。",
  keywords: [
    "海外エンジニア", "IT人材不足", "DX推進", "グローバルエンジニア", "フリーランスエンジニア",
    "エンジニアマッチング", "海外IT人材", "オフショア開発", "即戦力エンジニア", "VTaBridge",
  ],
  authors: [{ name: "髙橋 龍飛 (Ryuto Takahashi)", url: SITE_URL }],
  creator: "VTaBridge",
  publisher: "VTaBridge",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "ja-JP": SITE_URL,
      "en-US": `${SITE_URL}/en`,
    },
  },
  openGraph: {
    title: "VTaBridge | 海外エンジニア採用・即戦力IT人材でDX推進を加速",
    description: "海外の優秀なエンジニアと日本企業をつなぐB2Bコーディネーションサービス。採用コスト不要・フリーランス契約で即戦力エンジニアをご提供。",
    url: SITE_URL,
    siteName: "VTaBridge",
    locale: "ja_JP",
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "VTaBridge - グローバルエンジニア・リソースプロバイダー" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VTaBridge | 海外エンジニア採用・即戦力IT人材でDX推進を加速",
    description: "海外の優秀なエンジニアと日本企業をつなぐB2Bコーディネーションサービス。採用コスト不要・フリーランス契約で即戦力エンジニアをご提供。",
    images: [`${SITE_URL}/og-image.png`],
    site: "@vtabridge",
    creator: "@vtabridge",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "VTaBridge",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: "海外の優秀なエンジニアと日本企業をつなぐB2Bコーディネーションサービス",
  foundingDate: "2026",
  founder: {
    "@type": "Person",
    "@id": `${SITE_URL}/#founder`,
    name: "髙橋 龍飛",
    alternateName: "Ryuto Takahashi",
    jobTitle: "代表",
    worksFor: { "@id": `${SITE_URL}/#organization` },
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "vtabridge.t.ryuto@gmail.com",
    contactType: "customer service",
    availableLanguage: ["Japanese", "English"],
  },
  sameAs: ["https://jp.linkedin.com/in/%E9%BE%8D%E9%A3%9B-%E9%AB%99%E6%A9%8B-495375418"],
  areaServed: { "@type": "Country", name: "Japan" },
  serviceType: "グローバルエンジニア・リソースプロバイダー",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "VTaBridge",
  description: "海外エンジニアと日本企業をつなぐB2Bコーディネーションサービス",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: ["ja", "en"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="canonical" href={SITE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="antialiased bg-white text-gray-900">
        <LanguageProvider>
          <Header />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
