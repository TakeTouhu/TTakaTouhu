import type { Metadata } from "next";
import "./globals.css";
import "./vtavision.css";
import { LanguageProvider } from "@/components/LanguageProvider";

// TODO: 独自ドメイン取得後にここを差し替える（sitemap.xml / robots.txt / llms.txt も同様）
const SITE_URL = "https://t-taka-touhu.vercel.app";

const DESCRIPTION =
  "VTaVisionは、写真や伝えたい情報をもとに、商品・施設・空間の魅力を伝える動画制作を支援するAIサービスです。不動産、ホテル・旅館・グランピング、結婚式場・イベント会場、アミューズメント・レジャー施設、住宅・リフォーム、フィットネス施設での活用を想定しています。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VTaVision｜写真から、魅力が伝わる動画へ。",
    template: "%s | VTaVision",
  },
  description: DESCRIPTION,
  keywords: [
    "VTaVision", "VTaBridge", "動画制作支援", "AI 動画生成", "写真から動画",
    "不動産 動画", "ホテル 動画", "施設紹介 動画", "物件紹介 動画", "住宅 リフォーム 動画",
  ],
  authors: [{ name: "VTaBridge", url: SITE_URL }],
  creator: "VTaBridge",
  publisher: "VTaBridge",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: "/" },
  openGraph: {
    title: "VTaVision｜写真から、魅力が伝わる動画へ。",
    description:
      "VTaVisionは、写真や伝えたい情報をもとに、商品・施設・空間の魅力を伝える動画制作を支援するAIサービスです。",
    url: SITE_URL,
    siteName: "VTaVision",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/logo.webp", alt: "VTaVision by VTaBridge" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VTaVision｜写真から、魅力が伝わる動画へ。",
    description:
      "VTaVisionは、写真や伝えたい情報をもとに、商品・施設・空間の魅力を伝える動画制作を支援するAIサービスです。",
    images: ["/logo.webp"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "VTaBridge",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.webp`,
  description:
    "写真や情報をもとに商品・施設・空間の魅力を伝える動画制作を支援するAIサービス「VTaVision」の開発・運営",
  foundingDate: "2026",
  founder: {
    "@type": "Person",
    "@id": `${SITE_URL}/#founder`,
    name: "髙橋 龍飛",
    alternateName: "Ryuto Takahashi",
    jobTitle: "代表取締役社長",
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
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "VTaVision",
  description: DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "ja",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/#service`,
  name: "VTaVision",
  serviceType: "動画制作支援AIサービス",
  description:
    "写真や伝えたい情報をもとに、商品・施設・空間の魅力を伝える動画制作を支援するAIサービス",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: { "@type": "Country", name: "Japan" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
