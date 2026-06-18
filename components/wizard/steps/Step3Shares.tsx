'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWizard } from '@/lib/store';
import { shareInfoSchema } from '@/lib/validation';
import { ShareInfo } from '@/lib/types';

export default function Step3Shares() {
  const { state, updateShareInfo, setStep } = useWizard();
  const isKabushiki = state.basicInfo.companyType === '株式会社';

  const { register, handleSubmit, watch, control, formState: { errors } } = useForm<ShareInfo>({
    resolver: zodResolver(shareInfoSchema),
    defaultValues: {
      authorizedShares: state.shareInfo.authorizedShares || 400,
      issuedShares: state.shareInfo.issuedShares || 100,
      parValue: state.shareInfo.parValue || 10000,
      hasTransferRestriction: state.shareInfo.hasTransferRestriction ?? true,
    },
  });

  const watchAuthorized = watch('authorizedShares');
  const watchIssued = watch('issuedShares');
  const watchParValue = watch('parValue');
  const watchRestriction = watch('hasTransferRestriction');
  const totalCapital = (watchIssued || 0) * (watchParValue || 0);

  const onSubmit = (data: ShareInfo) => {
    updateShareInfo(data);
    setStep(4);
  };

  if (!isKabushiki) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">出資情報</h2>
          <p className="text-gray-500 text-sm mt-1">{state.basicInfo.companyType}の出資情報を確認します</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700">
          <p className="font-medium mb-1">合同会社・合名会社・合資会社の場合</p>
          <p>株式に関する情報は不要です。出資額は基本情報で入力した資本金（{state.basicInfo.capital?.toLocaleString()}円）が使用されます。</p>
        </div>
        <div className="pt-6 flex justify-between">
          <button onClick={() => setStep(2)} className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg">
            ← 戻る
          </button>
          <button onClick={() => setStep(4)} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700">
            次へ →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">株式情報</h2>
        <p className="text-gray-500 text-sm mt-1">発行可能株式数や1株あたりの金額を設定します</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* 発行可能株式総数 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            発行可能株式総数 <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-2">設立時発行株式数の4倍以内が一般的です</p>
          <div className="flex items-center gap-2">
            <input
              {...register('authorizedShares', { valueAsNumber: true })}
              type="number"
              min="1"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-500 text-sm">株</span>
          </div>
          {errors.authorizedShares && <p className="text-red-500 text-xs mt-1">{errors.authorizedShares.message}</p>}
        </div>

        {/* 設立時発行株式数 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            設立時発行株式数 <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-2">発行可能株式総数以下で入力してください</p>
          <div className="flex items-center gap-2">
            <input
              {...register('issuedShares', { valueAsNumber: true })}
              type="number"
              min="1"
              max={watchAuthorized}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-500 text-sm">株</span>
          </div>
          {errors.issuedShares && <p className="text-red-500 text-xs mt-1">{errors.issuedShares.message}</p>}
        </div>

        {/* 1株の金額 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            1株あたりの払込金額 <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-2">発行株式数 × 1株あたりの金額 = 資本金となります</p>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">1株</span>
            <input
              {...register('parValue', { valueAsNumber: true })}
              type="number"
              min="1"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-500 text-sm">円</span>
          </div>
          {totalCapital > 0 && (
            <div className={`mt-2 text-xs rounded-lg px-3 py-2 ${totalCapital === state.basicInfo.capital ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
              計算上の資本金：{totalCapital.toLocaleString()}円
              {totalCapital !== state.basicInfo.capital && ` ※入力した資本金（${state.basicInfo.capital?.toLocaleString()}円）と異なります`}
            </div>
          )}
        </div>

        {/* 株式譲渡制限 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            株式の譲渡制限 <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-3">中小企業では通常「あり」を選択します（取締役会の承認が必要になります）</p>
          <Controller
            name="hasTransferRestriction"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-3">
                <label className="cursor-pointer" onClick={() => field.onChange(true)}>
                  <div className={`border-2 rounded-lg p-3 text-center text-sm font-medium transition-all ${field.value === true ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'}`}>
                    あり（推奨）
                    <p className="text-xs text-gray-500 font-normal mt-1">取締役会の承認が必要</p>
                  </div>
                </label>
                <label className="cursor-pointer" onClick={() => field.onChange(false)}>
                  <div className={`border-2 rounded-lg p-3 text-center text-sm font-medium transition-all ${field.value === false ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'}`}>
                    なし
                    <p className="text-xs text-gray-500 font-normal mt-1">自由に譲渡可能</p>
                  </div>
                </label>
              </div>
            )}
          />
        </div>

        <div className="pt-4 flex justify-between">
          <button type="button" onClick={() => setStep(2)} className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg transition-colors">
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
