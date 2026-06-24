'use client';
import Link from 'next/link';
import { useT } from '@/hooks/useT';
import LanguageToggle from '@/components/LanguageToggle';

export default function Home() {
  const { t } = useT();
  const l = t.landing;

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">V</div>
            <span className="font-bold text-xl text-gray-900">VTa Platform</span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Link href="/auth/login" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
              {l.login}
            </Link>
            <Link href="/auth/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              {l.register}
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
            {l.tagline}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {l.hero}
          </h1>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            {l.heroDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register?type=engineer"
              className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              {l.registerEngineer}
            </Link>
            <Link
              href="/auth/register?type=company"
              className="bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-400 transition-colors shadow-lg border border-blue-400"
            >
              {l.registerCompany}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">{l.featuresTitle}</h2>
          <p className="text-gray-500 text-center mb-10">{l.featuresSubtitle}</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-2xl p-8">
              <div className="text-3xl mb-4">👨‍💻</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{l.forEngineers}</h3>
              <ul className="space-y-3 text-gray-700">
                {l.engineerFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/register?type=engineer"
                className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                {l.engineerRegister}
              </Link>
            </div>
            <div className="bg-indigo-50 rounded-2xl p-8">
              <div className="text-3xl mb-4">🏢</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{l.forCompanies}</h3>
              <ul className="space-y-3 text-gray-700">
                {l.companyFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-indigo-500 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/register?type=company"
                className="mt-6 inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
              >
                {l.companyRegister}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10 text-gray-900">{l.securityTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {l.security.map(item => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-blue-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{l.ctaTitle}</h2>
          <p className="text-blue-100 mb-8">{l.ctaDesc}</p>
          <Link
            href="/auth/register"
            className="inline-block bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors"
          >
            {l.ctaButton}
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8 px-4 text-center text-sm">
        <p>{l.footer}</p>
      </footer>
    </div>
  );
}
