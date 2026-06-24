import { User, EngineerProfile, CompanyProfile, Job, Application, JobInquiry } from './types';

const KEYS = {
  users: 'vta_users',
  engineerProfiles: 'vta_engineer_profiles',
  companyProfiles: 'vta_company_profiles',
  jobs: 'vta_jobs',
  applications: 'vta_applications',
  inquiries: 'vta_inquiries',
  seeded: 'vta_seeded',
};

function getAll<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function setAll<T>(key: string, items: T[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(items));
}

function uuid(): string {
  return crypto.randomUUID();
}

function seedData() {
  if (typeof window === 'undefined') return;
  if (localStorage.getItem(KEYS.seeded)) return;

  const users: User[] = [
    { id: 'eng-1', email: 'tanaka@example.com', password: 'password123', accountType: 'engineer', createdAt: '2025-01-10T00:00:00Z' },
    { id: 'eng-2', email: 'sato@example.com', password: 'password123', accountType: 'engineer', createdAt: '2025-01-15T00:00:00Z' },
    { id: 'eng-3', email: 'yamamoto@example.com', password: 'password123', accountType: 'engineer', createdAt: '2025-02-01T00:00:00Z' },
    { id: 'comp-1', email: 'hr@techcorp.com', password: 'password123', accountType: 'company', createdAt: '2025-01-05T00:00:00Z' },
    { id: 'comp-2', email: 'recruit@startup.co.jp', password: 'password123', accountType: 'company', createdAt: '2025-01-20T00:00:00Z' },
  ];

  const engineerProfiles: EngineerProfile[] = [
    {
      userId: 'eng-1',
      name: '田中 太郎',
      bio: 'フロントエンドエンジニアとして8年の経験。ReactとTypeScriptを得意とし、大規模SPAの開発実績多数。',
      skills: [
        { id: uuid(), language: 'TypeScript', level: 'expert' },
        { id: uuid(), language: 'React', level: 'expert' },
        { id: uuid(), language: 'Next.js', level: 'advanced' },
        { id: uuid(), language: 'Node.js', level: 'intermediate' },
      ],
      specialties: ['web', 'mobile'],
      achievements: [
        { id: uuid(), projectName: 'ECサイトリプレイス', description: 'Reactを用いたECサイトのフルリプレイス。ページ表示速度を60%改善。', startDate: '2023-04', endDate: '2024-03' },
        { id: uuid(), projectName: 'SaaSダッシュボード開発', description: 'Next.jsとTypeScriptを使ったBtoB SaaSのダッシュボード開発。', startDate: '2024-04', endDate: '2025-01' },
      ],
    },
    {
      userId: 'eng-2',
      name: '佐藤 花子',
      bio: 'バックエンドエンジニア。Go/Pythonを中心にマイクロサービスアーキテクチャの設計・開発が得意。AWSの設計・運用経験5年以上。',
      skills: [
        { id: uuid(), language: 'Go', level: 'expert' },
        { id: uuid(), language: 'Python', level: 'advanced' },
        { id: uuid(), language: 'PostgreSQL', level: 'advanced' },
        { id: uuid(), language: 'AWS', level: 'advanced' },
        { id: uuid(), language: 'Docker', level: 'intermediate' },
      ],
      specialties: ['infrastructure', 'data'],
      achievements: [
        { id: uuid(), projectName: 'マイクロサービス基盤構築', description: 'Go言語でのマイクロサービス設計・実装。月間1億リクエストを処理。', startDate: '2022-06', endDate: '2023-12' },
      ],
    },
    {
      userId: 'eng-3',
      name: '山本 健二',
      bio: 'AI/MLエンジニア。機械学習モデルの開発から本番環境へのデプロイまで一貫して対応。自然言語処理が専門。',
      skills: [
        { id: uuid(), language: 'Python', level: 'expert' },
        { id: uuid(), language: 'PyTorch', level: 'advanced' },
        { id: uuid(), language: 'TensorFlow', level: 'intermediate' },
        { id: uuid(), language: 'SQL', level: 'intermediate' },
      ],
      specialties: ['ai-ml', 'data'],
      achievements: [
        { id: uuid(), projectName: 'レコメンドエンジン開発', description: 'ECサイト向けの機械学習レコメンドエンジン開発。CTR 35%改善。', startDate: '2023-01', endDate: '2023-10' },
        { id: uuid(), projectName: 'RAGシステム構築', description: 'LLMを活用した社内ナレッジQAシステムの構築。', startDate: '2024-01', endDate: '2024-09' },
      ],
    },
  ];

  const companyProfiles: CompanyProfile[] = [
    {
      userId: 'comp-1',
      companyName: 'テックコープ株式会社',
      representativeName: '鈴木 一郎',
      industry: 'IT・ソフトウェア',
      description: 'エンタープライズ向けSaaSの開発・運用を行うIT企業です。DX推進を支援しています。',
    },
    {
      userId: 'comp-2',
      companyName: 'スタートアップ合同会社',
      representativeName: '高橋 誠',
      industry: 'Webサービス',
      description: 'フィンテック領域で急成長中のスタートアップです。少数精鋭のチームでプロダクトを開発しています。',
    },
  ];

  const jobs: Job[] = [
    {
      id: 'job-1',
      companyId: 'comp-1',
      title: 'React/TypeScriptフロントエンドエンジニア',
      description: '社内向けERPシステムのフロントエンド開発をお任せします。\n\n【業務内容】\n・React/TypeScriptを使用したUI開発\n・バックエンドAPIとの連携実装\n・テストコード作成\n\n【必須スキル】\n・React 3年以上\n・TypeScript 2年以上',
      period: '6ヶ月（延長可能性あり）',
      startDate: '2025-08-01',
      headcount: 2,
      salary: 800000,
      requiredSkills: ['React', 'TypeScript'],
      specialties: ['web'],
      isActive: true,
      createdAt: '2025-06-01T00:00:00Z',
    },
    {
      id: 'job-2',
      companyId: 'comp-1',
      title: 'AWSインフラエンジニア',
      description: 'クラウドインフラの設計・構築・運用をお任せします。\n\n【業務内容】\n・AWS環境の設計・構築\n・IaCによるインフラ管理（Terraform）\n・コスト最適化\n・セキュリティ強化\n\n【必須スキル】\n・AWS実務経験3年以上\n・Terraform経験者',
      period: '3ヶ月〜（長期希望）',
      startDate: '2025-07-15',
      headcount: 1,
      salary: 900000,
      requiredSkills: ['AWS', 'Terraform', 'Docker'],
      specialties: ['infrastructure'],
      isActive: true,
      createdAt: '2025-06-05T00:00:00Z',
    },
    {
      id: 'job-3',
      companyId: 'comp-2',
      title: 'Pythonバックエンドエンジニア（FinTech）',
      description: 'フィンテックサービスのバックエンド開発をご担当いただきます。\n\n【業務内容】\n・Python/FastAPIを使ったAPI開発\n・金融データ処理ロジック実装\n・パフォーマンス改善\n\n【必須スキル】\n・Python 3年以上\n・REST API設計・開発経験',
      period: '6ヶ月',
      startDate: '2025-08-01',
      headcount: 1,
      salary: 850000,
      requiredSkills: ['Python', 'FastAPI', 'PostgreSQL'],
      specialties: ['web', 'data'],
      isActive: true,
      createdAt: '2025-06-10T00:00:00Z',
    },
    {
      id: 'job-4',
      companyId: 'comp-2',
      title: 'MLエンジニア / データサイエンティスト',
      description: '機械学習モデルの開発から本番デプロイまでをお任せします。\n\n【業務内容】\n・機械学習モデルの設計・開発\n・MLOpsパイプライン構築\n・A/Bテスト設計・分析\n\n【必須スキル】\n・機械学習実務経験2年以上\n・Python熟練者',
      period: '3ヶ月〜長期',
      startDate: '2025-09-01',
      headcount: 1,
      salary: 950000,
      requiredSkills: ['Python', 'PyTorch', 'MLOps'],
      specialties: ['ai-ml', 'data'],
      isActive: true,
      createdAt: '2025-06-12T00:00:00Z',
    },
  ];

  setAll(KEYS.users, users);
  setAll(KEYS.engineerProfiles, engineerProfiles);
  setAll(KEYS.companyProfiles, companyProfiles);
  setAll(KEYS.jobs, jobs);
  setAll(KEYS.applications, []);
  setAll(KEYS.inquiries, []);
  localStorage.setItem(KEYS.seeded, '1');
}

export const db = {
  init: seedData,

  users: {
    findByEmail: (email: string): User | null => {
      return getAll<User>(KEYS.users).find(u => u.email === email) ?? null;
    },
    findById: (id: string): User | null => {
      return getAll<User>(KEYS.users).find(u => u.id === id) ?? null;
    },
    create: (user: Omit<User, 'id' | 'createdAt'>): User => {
      const newUser: User = { ...user, id: uuid(), createdAt: new Date().toISOString() };
      const users = getAll<User>(KEYS.users);
      users.push(newUser);
      setAll(KEYS.users, users);
      return newUser;
    },
  },

  engineerProfiles: {
    findByUserId: (userId: string): EngineerProfile | null => {
      return getAll<EngineerProfile>(KEYS.engineerProfiles).find(p => p.userId === userId) ?? null;
    },
    findAll: (): EngineerProfile[] => {
      return getAll<EngineerProfile>(KEYS.engineerProfiles);
    },
    upsert: (profile: EngineerProfile): EngineerProfile => {
      const profiles = getAll<EngineerProfile>(KEYS.engineerProfiles);
      const idx = profiles.findIndex(p => p.userId === profile.userId);
      if (idx >= 0) profiles[idx] = profile;
      else profiles.push(profile);
      setAll(KEYS.engineerProfiles, profiles);
      return profile;
    },
  },

  companyProfiles: {
    findByUserId: (userId: string): CompanyProfile | null => {
      return getAll<CompanyProfile>(KEYS.companyProfiles).find(p => p.userId === userId) ?? null;
    },
    upsert: (profile: CompanyProfile): CompanyProfile => {
      const profiles = getAll<CompanyProfile>(KEYS.companyProfiles);
      const idx = profiles.findIndex(p => p.userId === profile.userId);
      if (idx >= 0) profiles[idx] = profile;
      else profiles.push(profile);
      setAll(KEYS.companyProfiles, profiles);
      return profile;
    },
  },

  jobs: {
    findAll: (): Job[] => getAll<Job>(KEYS.jobs),
    findActive: (): Job[] => getAll<Job>(KEYS.jobs).filter(j => j.isActive),
    findById: (id: string): Job | null => {
      return getAll<Job>(KEYS.jobs).find(j => j.id === id) ?? null;
    },
    findByCompanyId: (companyId: string): Job[] => {
      return getAll<Job>(KEYS.jobs).filter(j => j.companyId === companyId);
    },
    create: (job: Omit<Job, 'id' | 'createdAt'>): Job => {
      const newJob: Job = { ...job, id: uuid(), createdAt: new Date().toISOString() };
      const jobs = getAll<Job>(KEYS.jobs);
      jobs.push(newJob);
      setAll(KEYS.jobs, jobs);
      return newJob;
    },
    update: (id: string, updates: Partial<Job>): Job | null => {
      const jobs = getAll<Job>(KEYS.jobs);
      const idx = jobs.findIndex(j => j.id === id);
      if (idx < 0) return null;
      jobs[idx] = { ...jobs[idx], ...updates };
      setAll(KEYS.jobs, jobs);
      return jobs[idx];
    },
    delete: (id: string): boolean => {
      const jobs = getAll<Job>(KEYS.jobs);
      const filtered = jobs.filter(j => j.id !== id);
      if (filtered.length === jobs.length) return false;
      setAll(KEYS.jobs, filtered);
      return true;
    },
  },

  applications: {
    findByEngineerId: (engineerId: string): Application[] => {
      return getAll<Application>(KEYS.applications).filter(a => a.engineerId === engineerId);
    },
    findByJobId: (jobId: string): Application[] => {
      return getAll<Application>(KEYS.applications).filter(a => a.jobId === jobId);
    },
    exists: (engineerId: string, jobId: string): boolean => {
      return getAll<Application>(KEYS.applications).some(
        a => a.engineerId === engineerId && a.jobId === jobId,
      );
    },
    create: (application: Omit<Application, 'id' | 'createdAt'>): Application => {
      const newApp: Application = { ...application, id: uuid(), createdAt: new Date().toISOString() };
      const apps = getAll<Application>(KEYS.applications);
      apps.push(newApp);
      setAll(KEYS.applications, apps);
      return newApp;
    },
  },

  inquiries: {
    create: (inquiry: Omit<JobInquiry, 'id' | 'createdAt'>): JobInquiry => {
      const newInquiry: JobInquiry = { ...inquiry, id: uuid(), createdAt: new Date().toISOString() };
      const inquiries = getAll<JobInquiry>(KEYS.inquiries);
      inquiries.push(newInquiry);
      setAll(KEYS.inquiries, inquiries);
      return newInquiry;
    },
  },

  deleteAccount: (userId: string, accountType: 'engineer' | 'company'): void => {
    // Remove user record
    setAll(KEYS.users, getAll<User>(KEYS.users).filter(u => u.id !== userId));

    if (accountType === 'engineer') {
      // Remove engineer profile
      setAll(
        KEYS.engineerProfiles,
        getAll<EngineerProfile>(KEYS.engineerProfiles).filter(p => p.userId !== userId),
      );
      // Remove all applications by this engineer
      setAll(
        KEYS.applications,
        getAll<Application>(KEYS.applications).filter(a => a.engineerId !== userId),
      );
      // Remove inquiries targeting this engineer
      setAll(
        KEYS.inquiries,
        getAll<JobInquiry>(KEYS.inquiries).filter(i => i.engineerId !== userId),
      );
    } else {
      // Remove company profile
      setAll(
        KEYS.companyProfiles,
        getAll<CompanyProfile>(KEYS.companyProfiles).filter(p => p.userId !== userId),
      );
      // Remove all jobs by this company and their applications
      const companyJobIds = getAll<Job>(KEYS.jobs)
        .filter(j => j.companyId === userId)
        .map(j => j.id);
      setAll(KEYS.jobs, getAll<Job>(KEYS.jobs).filter(j => j.companyId !== userId));
      setAll(
        KEYS.applications,
        getAll<Application>(KEYS.applications).filter(a => !companyJobIds.includes(a.jobId)),
      );
      // Remove inquiries from this company
      setAll(
        KEYS.inquiries,
        getAll<JobInquiry>(KEYS.inquiries).filter(i => i.companyId !== userId),
      );
    }
  },
};
