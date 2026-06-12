'use client';

import { useState } from 'react';
import { useWizard } from '@/lib/store';
import { BusinessPurpose } from '@/lib/types';

function generateId() {
  return Math.random().toString(36).slice(2);
}

const PRESET_PURPOSES = [
  { category: 'IT・テクノロジー', items: [
    'ソフトウェアの企画・開発・販売及び保守',
    'インターネットを利用した各種情報提供サービス',
    'ウェブサイトの企画・制作・運営及び管理',
    'システムインテグレーション業',
    'クラウドサービスの企画・開発・提供',
    'アプリケーションソフトウェアの開発・販売',
    'AIシステムの開発・販売及びコンサルティング',
    'データ分析・解析サービス',
  ]},
  { category: 'コンサルティング・サービス', items: [
    '経営コンサルティング業',
    'マーケティングコンサルティング業',
    '人材育成・研修サービス',
    '会計・財務コンサルティング業',
    'ITコンサルティング業',
  ]},
  { category: '小売・EC', items: [
    '各種商品の企画・製造・販売',
    'インターネットを利用した通信販売業',
    '輸出入業及び貿易業',
    '雑貨の仕入・販売',
    '食品の製造・加工・販売',
  ]},
  { category: '飲食・食品', items: [
    '飲食店の経営及び管理',
    '食品の製造・加工・仕入・販売',
    'デリバリーサービス業',
    'フードコンサルティング業',
  ]},
  { category: '不動産', items: [
    '不動産の売買・賃貸・管理及び仲介業',
    '不動産のコンサルティング業',
    '建物管理及びビルメンテナンス業',
  ]},
  { category: '広告・クリエイティブ', items: [
    '広告代理業及び宣伝業',
    '映像・写真・グラフィックの制作・販売',
    'デザイン業及びイラスト制作業',
    'イベントの企画・運営・制作業',
    'SNSマーケティング及びコンテンツ制作業',
  ]},
  { category: '教育', items: [
    '各種教育サービスの提供',
    'オンライン講座・セミナーの企画・運営',
    '書籍・教材の企画・制作・販売',
  ]},
];

const ALWAYS_LAST = '前各号に附帯関連する一切の事業';

export default function Step4BusinessPurpose() {
  const { state, updateBusinessPurposes, setStep } = useWizard();
  const [purposes, setPurposes] = useState<BusinessPurpose[]>(
    state.businessPurposes.length > 0
      ? state.businessPurposes
      : [{ id: generateId(), text: ALWAYS_LAST }]
  );
  const [customText, setCustomText] = useState('');
  const [error, setError] = useState('');

  const addPreset = (text: string) => {
    if (purposes.some(p => p.text === text)) return;
    const lastIndex = purposes.findLastIndex ? purposes.findLastIndex(p => p.text === ALWAYS_LAST) : purposes.length - 1;
    const newPurposes = [...purposes];
    if (lastIndex >= 0 && purposes[lastIndex].text === ALWAYS_LAST) {
      newPurposes.splice(lastIndex, 0, { id: generateId(), text });
    } else {
      newPurposes.push({ id: generateId(), text });
    }
    setPurposes(newPurposes);
  };

  const addCustom = () => {
    if (!customText.trim()) return;
    const newPurposes = [...purposes];
    const lastIdx = newPurposes.findIndex(p => p.text === ALWAYS_LAST);
    if (lastIdx >= 0) {
      newPurposes.splice(lastIdx, 0, { id: generateId(), text: customText.trim() });
    } else {
      newPurposes.push({ id: generateId(), text: customText.trim() });
    }
    setPurposes(newPurposes);
    setCustomText('');
  };

  const removePurpose = (id: string) => {
    setPurposes(prev => prev.filter(p => p.id !== id));
  };

  const handleNext = () => {
    const realPurposes = purposes.filter(p => p.text !== ALWAYS_LAST);
    if (realPurposes.length === 0) {
      setError('事業目的を1つ以上追加してください');
      return;
    }
    setError('');
    updateBusinessPurposes(purposes);
    setStep(5);
  };

  const isSelected = (text: string) => purposes.some(p => p.text === text);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">事業目的</h2>
        <p className="text-gray-500 text-sm mt-1">会社の事業内容を選択または入力してください。後で変更登記で追加することもできます。</p>
      </div>

      {/* Selected purposes */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">選択済みの事業目的（{purposes.length}件）</h3>
        {purposes.length === 0 ? (
          <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center text-sm text-gray-400">
            事業目的を追加してください
          </div>
        ) : (
          <div className="space-y-2">
            {purposes.map((p, i) => (
              <div key={p.id} className="flex items-start gap-2 bg-blue-50 rounded-lg px-3 py-2">
                <span className="text-blue-600 text-sm font-medium min-w-[24px]">{i + 1}.</span>
                <span className="text-sm flex-1 text-gray-700">{p.text}</span>
                {p.text !== ALWAYS_LAST && (
                  <button onClick={() => removePurpose(p.id)} className="text-gray-400 hover:text-red-500 text-xs flex-shrink-0">✕</button>
                )}
              </div>
            ))}
          </div>
        )}
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </div>

      {/* Custom input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">カスタム事業目的を追加</label>
        <div className="flex gap-2">
          <input
            value={customText}
            onChange={e => setCustomText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addCustom()}
            placeholder="例：アパレル商品の企画・製造・販売"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addCustom}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            追加
          </button>
        </div>
      </div>

      {/* Presets */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">よく使われる事業目的（クリックで追加）</h3>
        <div className="space-y-4">
          {PRESET_PURPOSES.map(cat => (
            <div key={cat.category}>
              <p className="text-xs font-medium text-gray-500 mb-2">{cat.category}</p>
              <div className="flex flex-wrap gap-2">
                {cat.items.map(item => (
                  <button
                    key={item}
                    onClick={() => addPreset(item)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      isSelected(item)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600'
                    }`}
                  >
                    {isSelected(item) ? '✓ ' : '+ '}{item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 flex justify-between">
        <button onClick={() => setStep(3)} className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg transition-colors">
          ← 戻る
        </button>
        <button onClick={handleNext} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          次へ →
        </button>
      </div>
    </div>
  );
}
