import { z } from 'zod';

export const basicInfoSchema = z.object({
  companyName: z.string().min(1, '会社名を入力してください').max(100, '会社名は100文字以内で入力してください'),
  companyType: z.enum(['株式会社', '合同会社', '合名会社', '合資会社'] as const, {
    message: '会社種別を選択してください',
  }),
  capital: z.number({ error: '資本金を入力してください' }).min(1, '資本金は1円以上で入力してください'),
  fiscalYearStartMonth: z.number().min(1).max(12),
  establishmentDate: z.string().min(1, '設立予定日を入力してください'),
});

export const directorSchema = z.object({
  id: z.string(),
  name: z.string().min(1, '氏名を入力してください'),
  address: z.string().min(1, '住所を入力してください'),
  isRepresentative: z.boolean(),
});

export const officerInfoSchema = z.object({
  directors: z.array(directorSchema).min(1, '取締役を1名以上追加してください'),
  auditor: z.string().optional(),
  auditorAddress: z.string().optional(),
});

export const shareInfoSchema = z.object({
  authorizedShares: z.number({ error: '発行可能株式総数を入力してください' }).min(1, '1株以上で入力してください'),
  issuedShares: z.number({ error: '発行済株式数を入力してください' }).min(1, '1株以上で入力してください'),
  parValue: z.number({ error: '1株の額面金額を入力してください' }).min(1),
  hasTransferRestriction: z.boolean(),
}).refine(data => data.issuedShares <= data.authorizedShares, {
  message: '発行済株式数は発行可能株式総数以下にしてください',
  path: ['issuedShares'],
});

export const businessPurposeSchema = z.object({
  id: z.string(),
  text: z.string().min(1),
});

export const addressInfoSchema = z.object({
  prefecture: z.string().min(1, '都道府県を選択してください'),
  city: z.string().min(1, '市区町村を入力してください'),
  streetAddress: z.string().min(1, '番地を入力してください'),
  buildingName: z.string().optional(),
});
