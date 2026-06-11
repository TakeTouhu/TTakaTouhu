'use client';

import { useState } from 'react';
import { useWizard } from '@/lib/store';
import { Director } from '@/lib/types';

function generateId() {
  return Math.random().toString(36).slice(2);
}

export default function Step2Officers() {
  const { state, updateOfficerInfo, setStep } = useWizard();
  const [directors, setDirectors] = useState<Director[]>(
    state.officerInfo.directors && state.officerInfo.directors.length > 0
      ? state.officerInfo.directors
      : [{ id: generateId(), name: '', address: '', isRepresentative: true }]
  );
  const [auditor, setAuditor] = useState(state.officerInfo.auditor || '');
  const [auditorAddress, setAuditorAddress] = useState(state.officerInfo.auditorAddress || '');
  const [showAuditor, setShowAuditor] = useState(!!state.officerInfo.auditor);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addDirector = () => {
    setDirectors(prev => [...prev, { id: generateId(), name: '', address: '', isRepresentative: false }]);
  };

  const removeDirector = (id: string) => {
    setDirectors(prev => prev.filter(d => d.id !== id));
  };

  const updateDirector = (id: string, field: keyof Director, value: string | boolean) => {
    setDirectors(prev => prev.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const setRepresentative = (id: string) => {
    setDirectors(prev => prev.map(d => ({ ...d, isRepresentative: d.id === id })));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    directors.forEach((d, i) => {
      if (!d.name.trim()) newErrors[`name_${i}`] = '氏名を入力してください';
      if (!d.address.trim()) newErrors[`address_${i}`] = '住所を入力してください';
    });
    if (!directors.some(d => d.isRepresentative)) {
      newErrors.representative = '代表取締役（代表社員）を1名選択してください';
    }
    return newErrors;
  };

  const handleNext = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    updateOfficerInfo({
      directors,
      auditor: showAuditor ? auditor : undefined,
      auditorAddress: showAuditor ? auditorAddress : undefined,
    });
    setStep(3);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">役員情報</h2>
        <p className="text-gray-500 text-sm mt-1">取締役・監査役の情報を入力してください</p>
      </div>

      <div className="space-y-4">
        {directors.map((director, index) => (
          <div key={director.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  {director.isRepresentative ? '代表取締役' : `取締役 ${index + 1}`}
                </span>
                {director.isRepresentative && (
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">代表</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {!director.isRepresentative && (
                  <button
                    onClick={() => setRepresentative(director.id)}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    代表に設定
                  </button>
                )}
                {directors.length > 1 && (
                  <button
                    onClick={() => removeDirector(director.id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    削除
                  </button>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  氏名 <span className="text-red-500">*</span>
                </label>
                <input
                  value={director.name}
                  onChange={e => updateDirector(director.id, 'name', e.target.value)}
                  placeholder="山田 太郎"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors[`name_${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`name_${index}`]}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  住所 <span className="text-red-500">*</span>
                </label>
                <input
                  value={director.address}
                  onChange={e => updateDirector(director.id, 'address', e.target.value)}
                  placeholder="東京都渋谷区○○1-2-3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors[`address_${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`address_${index}`]}</p>}
              </div>
            </div>
          </div>
        ))}

        {errors.representative && (
          <p className="text-red-500 text-xs">{errors.representative}</p>
        )}

        <button
          onClick={addDirector}
          className="w-full border-2 border-dashed border-gray-300 rounded-lg py-3 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
        >
          + 取締役を追加
        </button>

        {/* 監査役 */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2 mb-3">
            <input
              id="showAuditor"
              type="checkbox"
              checked={showAuditor}
              onChange={e => setShowAuditor(e.target.checked)}
              className="w-4 h-4 text-blue-600"
            />
            <label htmlFor="showAuditor" className="text-sm font-medium text-gray-700 cursor-pointer">
              監査役を設置する
            </label>
          </div>
          <p className="text-xs text-gray-500 mb-3">監査役は任意です。設置しない場合は監査機能を取締役が担います。</p>

          {showAuditor && (
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">監査役氏名</label>
                <input
                  value={auditor}
                  onChange={e => setAuditor(e.target.value)}
                  placeholder="鈴木 花子"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">監査役住所</label>
                <input
                  value={auditorAddress}
                  onChange={e => setAuditorAddress(e.target.value)}
                  placeholder="東京都新宿区○○1-2-3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-6 flex justify-between">
        <button onClick={() => setStep(1)} className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg transition-colors">
          ← 戻る
        </button>
        <button onClick={handleNext} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          次へ →
        </button>
      </div>
    </div>
  );
}
