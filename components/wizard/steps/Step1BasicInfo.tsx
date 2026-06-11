'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWizard } from '@/lib/store';
import { basicInfoSchema } from '@/lib/validation';
import { BasicInfo } from '@/lib/types';

const COMPANY_TYPES = ['株式会社', '合同会社', '合名会社', '合資会社'] as const;
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

export default function Step1BasicInfo() {
  const { state, updateBasicInfo, setStep } = useWizard();

  const { register, handleSubmit, formState: { errors } } = useForm<BasicInfo>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      companyName: state.basicInfo.companyName || '',
      companyType: state.basicInfo.companyType || '株式会社',
      capital: state.basicInfo.capital || 1000000,
      fiscalYearStartMonth: state.basicInfo.fiscalYearStartMonth || 4,
      establishmentDate: state.basicInfo.establishmentDate || '',
    },
  });

  const onSubmit = (data: BasicInfo) => {
    updateBasicInfo(data);
    setStep(2);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">会社の基本情報</h2>
        <p className="text-gray-500 text-sm mt-1">会社名や資本金などの基本情報を入力してください</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* 会社種別 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            会社種別 <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {COMPANY_TYPES.map((type) => (
              <label key={type} className="cursor-pointer">
                <input type="radio" value={type} {...register('companyType')} className="sr-only" />
                <div className="border-2 rounded-lg p-3 text-center text-sm font-medium transition-all peer-checked:border-blue-600 hover:border-blue-300 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:text-blue-700">
                  {type}
                </div>
              </label>
            ))}
          </div>
          {errors.companyType && <p className="text-red-500 text-xs mt-1">{errors.companyType.message}</p>}
        </div>

        {/* 会社名 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            会社名 <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-2">「株式会社」などの種別は含めず、会社名のみを入力してください</p>
          <input
            {...register('companyName')}
            placeholder="例：テクノロジーイノベーション"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
        </div>

        {/* 資本金 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            資本金 <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-2">株式会社・合同会社は1円以上。一般的には100万円以上が推奨されます。</p>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">金</span>
            <input
              {...register('capital', { valueAsNumber: true })}
              type="number"
              min="1"
              placeholder="1000000"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="text-gray-500 text-sm">円</span>
          </div>
          {errors.capital && <p className="text-red-500 text-xs mt-1">{errors.capital.message}</p>}
        </div>

        {/* 事業年度開始月 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            事業年度開始月 <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-2">決算月の翌月が開始月になります。例：3月決算なら4月開始</p>
          <select
            {...register('fiscalYearStartMonth', { valueAsNumber: true })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            {MONTHS.map(m => (
              <option key={m} value={m}>{m}月</option>
            ))}
          </select>
        </div>

        {/* 設立予定日 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            設立予定日 <span className="text-red-500">*</span>
          </label>
          <input
            {...register('establishmentDate')}
            type="date"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.establishmentDate && <p className="text-red-500 text-xs mt-1">{errors.establishmentDate.message}</p>}
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            次へ →
          </button>
        </div>
      </form>
    </div>
  );
}
