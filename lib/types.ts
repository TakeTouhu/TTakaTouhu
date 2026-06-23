// Legacy types for existing wizard (定款作成くん)
export type CompanyType = '株式会社' | '合同会社' | '合名会社' | '合資会社';
export interface BasicInfo { companyName: string; companyType: CompanyType; capital: number; fiscalYearStartMonth: number; establishmentDate: string; }
export interface Director { id: string; name: string; address: string; isRepresentative: boolean; }
export interface OfficerInfo { directors: Director[]; auditor?: string; auditorAddress?: string; }
export interface ShareInfo { authorizedShares: number; issuedShares: number; parValue: number; hasTransferRestriction: boolean; }
export interface BusinessPurpose { id: string; text: string; }
export interface AddressInfo { prefecture: string; city: string; streetAddress: string; buildingName?: string; }
export interface WizardState { currentStep: number; basicInfo: Partial<BasicInfo>; officerInfo: Partial<OfficerInfo>; shareInfo: Partial<ShareInfo>; businessPurposes: BusinessPurpose[]; addressInfo: Partial<AddressInfo>; }

// VTa Platform types
export type AccountType = 'engineer' | 'company';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type Specialty = 'web' | 'mobile' | 'ai-ml' | 'infrastructure' | 'data' | 'security';

export const SKILL_LEVEL_LABELS: Record<SkillLevel, string> = {
  beginner: '初級',
  intermediate: '中級',
  advanced: '上級',
  expert: 'エキスパート',
};

export const SPECIALTY_LABELS: Record<Specialty, string> = {
  web: 'Web開発',
  mobile: 'モバイル',
  'ai-ml': 'AI/ML',
  infrastructure: 'インフラ/クラウド',
  data: 'データエンジニアリング',
  security: 'セキュリティ',
};

export const SPECIALTIES: Specialty[] = ['web', 'mobile', 'ai-ml', 'infrastructure', 'data', 'security'];

export interface User {
  id: string;
  email: string;
  password: string;
  accountType: AccountType;
  createdAt: string;
}

export interface Skill {
  id: string;
  language: string;
  level: SkillLevel;
}

export interface Achievement {
  id: string;
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface EngineerProfile {
  userId: string;
  name: string;
  bio: string;
  photoUrl?: string;
  skills: Skill[];
  specialties: Specialty[];
  achievements: Achievement[];
}

export interface CompanyProfile {
  userId: string;
  companyName: string;
  representativeName: string;
  industry: string;
  description: string;
}

export interface Job {
  id: string;
  companyId: string;
  title: string;
  description: string;
  period: string;
  startDate: string;
  headcount: number;
  salary: number;
  requiredSkills: string[];
  specialties: Specialty[];
  isActive: boolean;
  createdAt: string;
}

export interface Application {
  id: string;
  engineerId: string;
  jobId: string;
  message: string;
  createdAt: string;
}

export interface JobInquiry {
  id: string;
  companyId: string;
  engineerId: string;
  jobId?: string;
  message: string;
  createdAt: string;
}
