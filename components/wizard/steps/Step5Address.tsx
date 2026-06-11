'use client';

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

  const { register, handleSubmit, formState: { errors } } = useForm<AddressInfo>({
    resolver: zodResolver(addressInfoSchema),
    defaultValues: {
      prefecture: state.addressInfo.prefecture || '',
      city: state.addressInfo.city || '',
      streetAddress: state.addressInfo.streetAddress || '',
      buildingName: state.addressInfo.buildingName || '',
    },
  });

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
