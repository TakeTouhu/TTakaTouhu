'use client';

import { useState } from 'react';
import { useWizard } from '@/lib/store';
import { generateArticles } from '@/lib/generateArticles';

export default function Step7Generate() {
  const { state, setStep } = useWizard();
  const [copied, setCopied] = useState(false);

  const text = generateArticles(state);

  const downloadText = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const companyName = `${state.basicInfo.companyType || ''}${state.basicInfo.companyName || '会社'}`;
    a.download = `${companyName}_定款.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPdf = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const lineHeight = 7;
      const maxWidth = pageWidth - margin * 2;
      let y = 20;

      const lines = text.split('\n');

      for (const line of lines) {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }

        if (line === '') {
          y += lineHeight * 0.5;
          continue;
        }

        const splitLines = doc.splitTextToSize(line, maxWidth);
        for (const sl of splitLines) {
          if (y > 270) {
            doc.addPage();
            y = 20;
          }
          doc.text(sl, margin, y);
          y += lineHeight;
        }
      }

      const companyName = `${state.basicInfo.companyType || ''}${state.basicInfo.companyName || '会社'}`;
      doc.save(`${companyName}_定款.pdf`);
    } catch (e) {
      alert('PDFの生成に失敗しました。テキストダウンロードをご利用ください。');
      console.error(e);
    }
  };

  const copyText = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nextSteps = [
    { num: 1, title: '電子署名', desc: '代表者がマイナンバーカードを使って電子署名を行います' },
    { num: 2, title: '公証人の認証', desc: '法務局指定の公証役場でオンライン認証を受けます（手数料約5万円）' },
    { num: 3, title: '資本金の払込', desc: '発起人の個人口座に資本金を払い込みます' },
    { num: 4, title: '登記申請', desc: '法務局に設立登記申請を行います（登録免許税：資本金×0.7%、最低15万円）' },
    { num: 5, title: '各種届出', desc: '税務署・都道府県・市区町村への開業届等を提出します' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl">✓</div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">定款が完成しました！</h2>
            <p className="text-gray-500 text-sm">以下からダウンロードまたはコピーしてください</p>
          </div>
        </div>

        {/* Download buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={downloadText}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
          >
            📄 テキストをダウンロード
          </button>
          <button
            onClick={downloadPdf}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm"
          >
            📑 PDFをダウンロード
          </button>
          <button
            onClick={copyText}
            className="flex items-center gap-2 border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
          >
            {copied ? '✓ コピーしました！' : '📋 テキストをコピー'}
          </button>
        </div>

        {/* Preview */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">定款プレビュー</h3>
          <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs text-gray-700 whitespace-pre-wrap overflow-auto max-h-96 font-mono leading-relaxed">
            {text}
          </pre>
        </div>

        <div className="mt-4 flex justify-between">
          <button onClick={() => setStep(6)} className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg transition-colors text-sm">
            ← 確認画面に戻る
          </button>
        </div>
      </div>

      {/* Next steps */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-4">定款作成後の流れ</h3>
        <div className="space-y-3">
          {nextSteps.map((step) => (
            <div key={step.num} className="flex gap-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                {step.num}
              </div>
              <div>
                <div className="font-medium text-sm text-gray-900">{step.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-700">
        <p className="font-medium mb-1">免責事項</p>
        <p>本サービスで生成された定款はひな形です。法的な正確性を保証するものではありません。公証人の認証前に、司法書士や弁護士への相談を強くお勧めします。</p>
      </div>
    </div>
  );
}
