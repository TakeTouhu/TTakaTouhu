# FitShare - 筋トレ共有コミュニティアプリ

## セットアップ

### 1. 依存パッケージのインストール
```bash
cd mobile
npm install
```

### 2. Supabaseプロジェクトの準備
1. [supabase.com](https://supabase.com) でプロジェクトを作成
2. `supabase/schema.sql` をSupabase SQL Editorで実行
3. Project Settings > API からURLとanon keyをコピー

### 3. 環境変数の設定
```bash
cp .env.example .env
# .envを編集してSupabaseの値を入力
```

### 4. アプリの起動
```bash
npm start
```
Expo Goアプリ（iOS/Android）でQRコードをスキャン

---

## 機能一覧

| 機能 | 説明 |
|------|------|
| 🏋️ トレーニング記録 | 重量・レップス・補助有無をセット単位で記録 |
| ⚖️ kg / lbs 切替 | セットごとに単位を切り替え可能 |
| 📊 グラフ表示 | 種目ごとの重量推移・レップ数をグラフで可視化 |
| 👥 グループ | グループを作成・参加して仲間と共有 |
| 💬 グループチャット | リアルタイムチャット＋目標達成の自動通知 |
| 🏆 目標管理 | 週・月・年単位で個人/グループ目標を設定 |
| 📈 メンバー比較 | グループ内の今週のトレーニング回数ランキング |

## ディレクトリ構成

```
mobile/
├── app/
│   ├── (auth)/          # ログイン・新規登録画面
│   ├── (tabs)/          # メインタブ（ホーム・記録・履歴・グループ・プロフィール）
│   ├── group/[id].tsx   # グループ詳細（チャット・メンバー・目標・比較）
│   ├── goals/           # 目標管理
│   └── exercise/[id].tsx # 種目別履歴詳細
├── context/
│   └── AuthContext.tsx  # Supabase認証コンテキスト
├── lib/
│   ├── supabase.ts      # Supabaseクライアント
│   ├── types.ts         # TypeScript型定義
│   └── utils.ts         # ユーティリティ関数・定数
└── supabase/
    └── schema.sql       # データベーススキーマ（RLS含む）
```
