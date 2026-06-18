'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWizard } from '@/lib/store';
import { addressInfoSchema } from '@/lib/validation';
import { AddressInfo } from '@/lib/types';

const PREFECTURES = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
];

export default function Step5Address() {
  const { state, updateAddressInfo, setStep } = useWizard();
  const [zipCode, setZipCode] = useState('');
  const [zipStatus, setZipStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<AddressInfo>({
    resolver: zodResolver(addressInfoSchema),
    defaultValues: {
      prefecture: state.addressInfo.prefecture || '',
      city: state.addressInfo.city || '',
      streetAddress: state.addressInfo.streetAddress || '',
      buildingName: state.addressInfo.buildingName || '',
    },
  });

  const lookupZip = async (zip: string) => {
    const digits = zip.replace(/[^0-9]/g, '');
    if (digits.length !== 7) return;
    setZipStatus('loading');
    try {
      const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${digits}`);
      const json = await res.json();
      if (json.status === 200 && json.results) {
        const r = json.results[0];
        setValue('prefecture', r.address1, { shouldValidate: true });
        setValue('city', r.address2, { shouldValidate: true });
        setValue('streetAddress', r.address3, { shouldValidate: true });
        setZipStatus('success');
      } else {
        setZipStatus('error');
      }
    } catch {
      setZipStatus('error');
    }
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9\-]/g, '');
    setZipCode(val);
    setZipStatus('idle');
    const digits = val.replace(/[^0-9]/g, '');
    if (digits.length === 7) lookupZip(digits);
  };

  const onSubmit = (data: AddressInfo) => {
    updateAddressInfo(data);
    setStep(6);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">本店所在地</h2>
        <p className="text-gray-500 text-sm mt-1">会社の本店住所を入力してください</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-5 text-xs text-amber-700">
        <span className="font-medium">注意：</span>本店所在地は登記上の住所です。バーチャルオフィスや自宅を登記住所とする場合もあります。
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 郵便番号 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            郵便番号
          </label>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">〒</span>
            <input
              value={zipCode}
              onChange={handleZipChange}
              placeholder="1234567（ハイフン不要）"
              maxLength={8}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => lookupZip(zipCode)}
              disabled={zipStatus === 'loading' || zipCode.replace(/[^0-9]/g, '').length !== 7}
              className="bg-gray-100 text-gray-700 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-40"
            >
              {zipStatus === 'loading' ? '検索中…' : '住所検索'}
            </button>
          </div>
          {zipStatus === 'success' && <p className="text-green-600 text-xs mt-1">✓ 住所を自動入力しました</p>}
          {zipStatus === 'error' && <p className="text-red-500 text-xs mt-1">郵便番号が見つかりませんでした</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            都道府県 <span className="text-red-500">*</span>
          </label>
          <select
            {...register('prefecture')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">選択してください</option>
            {PREFECTURES.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {errors.prefecture && <p className="text-red-500 text-xs mt-1">{errors.prefecture.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            市区町村 <span className="text-red-500">*</span>
          </label>
          <input
            {...register('city')}
            placeholder="例：渋谷区"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            番地 <span className="text-red-500">*</span>
          </label>
          <input
            {...register('streetAddress')}
            placeholder="例：道玄坂1丁目2番3号"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.streetAddress && <p className="text-red-500 text-xs mt-1">{errors.streetAddress.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ビル名・部屋番号（任意）
          </label>
          <input
            {...register('buildingName')}
            placeholder="例：○○ビル 3階"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="pt-4 flex justify-between">
          <button type="button" onClick={() => setStep(4)} className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg transition-colors">
            ← 戻る
          </button>
          <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            次へ →
          </button>
        </div>
      </form>
    </div>
  );
}
