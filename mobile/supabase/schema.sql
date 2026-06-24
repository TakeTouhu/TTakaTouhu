-- ============================================================
-- FitShare: Supabase Database Schema
-- ============================================================

-- Enable Row Level Security on all tables

-- Profiles (extends auth.users)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  display_name text,
  avatar_url text,
  preferred_unit text not null default 'kg' check (preferred_unit in ('kg', 'lbs')),
  created_at timestamptz not null default now()
);
alter table profiles enable row level security;
create policy "Profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

-- Exercises catalog
create table if not exists exercises (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_ja text,
  category text not null default 'other',
  is_default boolean not null default false,
  created_by uuid references profiles(id),
  created_at timestamptz not null default now()
);
alter table exercises enable row level security;
create policy "Exercises viewable by all authenticated users" on exercises for select to authenticated using (true);
create policy "Users can create custom exercises" on exercises for insert to authenticated with check (auth.uid() = created_by);

-- Workout sessions
create table if not exists workout_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade not null,
  date date not null default current_date,
  notes text,
  created_at timestamptz not null default now(),
  unique (user_id, date)
);
alter table workout_sessions enable row level security;
create policy "Users can view own sessions" on workout_sessions for select using (auth.uid() = user_id);
create policy "Group members can view each other sessions" on workout_sessions for select using (
  exists (
    select 1 from group_members gm1
    join group_members gm2 on gm1.group_id = gm2.group_id
    where gm1.user_id = auth.uid() and gm2.user_id = workout_sessions.user_id
  )
);
create policy "Users can insert own sessions" on workout_sessions for insert with check (auth.uid() = user_id);
create policy "Users can update own sessions" on workout_sessions for update using (auth.uid() = user_id);
create policy "Users can delete own sessions" on workout_sessions for delete using (auth.uid() = user_id);

-- Workout sets
create table if not exists workout_sets (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references workout_sessions(id) on delete cascade not null,
  exercise_id uuid references exercises(id) not null,
  set_number integer not null default 1,
  weight decimal(6,2),
  reps integer,
  unit text not null default 'kg' check (unit in ('kg', 'lbs')),
  has_assistance boolean not null default false,
  notes text,
  created_at timestamptz not null default now()
);
alter table workout_sets enable row level security;
create policy "Users can manage own sets" on workout_sets for all using (
  exists (
    select 1 from workout_sessions ws
    where ws.id = workout_sets.session_id and ws.user_id = auth.uid()
  )
);
create policy "Group members can view each other sets" on workout_sets for select using (
  exists (
    select 1 from workout_sessions ws
    join group_members gm1 on gm1.user_id = ws.user_id
    join group_members gm2 on gm2.group_id = gm1.group_id and gm2.user_id = auth.uid()
    where ws.id = workout_sets.session_id
  )
);

-- Groups
create table if not exists groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  avatar_url text,
  created_by uuid references profiles(id) not null,
  created_at timestamptz not null default now()
);
alter table groups enable row level security;
create policy "Groups viewable by members" on groups for select using (
  exists (select 1 from group_members where group_id = groups.id and user_id = auth.uid())
);
create policy "Groups searchable by all" on groups for select to authenticated using (true);
create policy "Authenticated users can create groups" on groups for insert to authenticated with check (auth.uid() = created_by);
create policy "Admins can update group" on groups for update using (
  exists (select 1 from group_members where group_id = groups.id and user_id = auth.uid() and role = 'admin')
);

-- Group members
create table if not exists group_members (
  group_id uuid references groups(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  role text not null default 'member' check (role in ('admin', 'member')),
  joined_at timestamptz not null default now(),
  primary key (group_id, user_id)
);
alter table group_members enable row level security;
create policy "Members can view group membership" on group_members for select using (
  exists (select 1 from group_members gm where gm.group_id = group_members.group_id and gm.user_id = auth.uid())
);
create policy "Authenticated users can join groups" on group_members for insert to authenticated with check (auth.uid() = user_id);
create policy "Users can leave groups" on group_members for delete using (auth.uid() = user_id);

-- Goals
create table if not exists goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade not null,
  group_id uuid references groups(id) on delete set null,
  exercise_id uuid references exercises(id),
  title text not null,
  description text,
  target_value decimal(8,2),
  target_unit text,
  period text not null check (period in ('week', 'month', 'year')),
  start_date date not null,
  end_date date not null,
  is_achieved boolean not null default false,
  achieved_at timestamptz,
  created_at timestamptz not null default now()
);
alter table goals enable row level security;
create policy "Users can manage own goals" on goals for all using (auth.uid() = user_id);
create policy "Group members can view group goals" on goals for select using (
  group_id is not null and
  exists (select 1 from group_members where group_id = goals.group_id and user_id = auth.uid())
);

-- Messages (group chat)
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references groups(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  message_type text not null default 'text' check (message_type in ('text', 'achievement', 'workout_share')),
  metadata jsonb,
  created_at timestamptz not null default now()
);
alter table messages enable row level security;
create policy "Group members can view messages" on messages for select using (
  exists (select 1 from group_members where group_id = messages.group_id and user_id = auth.uid())
);
create policy "Group members can send messages" on messages for insert with check (
  auth.uid() = user_id and
  exists (select 1 from group_members where group_id = messages.group_id and user_id = auth.uid())
);

-- Enable realtime for messages
alter publication supabase_realtime add table messages;

-- ============================================================
-- Seed: Default exercises
-- ============================================================
insert into exercises (name, name_ja, category, is_default) values
  -- Chest
  ('Bench Press', 'ベンチプレス', 'chest', true),
  ('Incline Bench Press', 'インクラインベンチプレス', 'chest', true),
  ('Decline Bench Press', 'デクラインベンチプレス', 'chest', true),
  ('Dumbbell Fly', 'ダンベルフライ', 'chest', true),
  ('Cable Crossover', 'ケーブルクロスオーバー', 'chest', true),
  ('Push Up', 'プッシュアップ', 'chest', true),
  -- Back
  ('Pull Up', 'プルアップ', 'back', true),
  ('Lat Pulldown', 'ラットプルダウン', 'back', true),
  ('Bent Over Row', 'ベントオーバーロウ', 'back', true),
  ('Seated Row', 'シーテッドロウ', 'back', true),
  ('Deadlift', 'デッドリフト', 'back', true),
  ('T-Bar Row', 'Tバーロウ', 'back', true),
  -- Legs
  ('Squat', 'スクワット', 'legs', true),
  ('Leg Press', 'レッグプレス', 'legs', true),
  ('Romanian Deadlift', 'ルーマニアンデッドリフト', 'legs', true),
  ('Leg Curl', 'レッグカール', 'legs', true),
  ('Leg Extension', 'レッグエクステンション', 'legs', true),
  ('Calf Raise', 'カーフレイズ', 'legs', true),
  ('Lunges', 'ランジ', 'legs', true),
  -- Shoulders
  ('Overhead Press', 'オーバーヘッドプレス', 'shoulders', true),
  ('Dumbbell Lateral Raise', 'ダンベルサイドレイズ', 'shoulders', true),
  ('Front Raise', 'フロントレイズ', 'shoulders', true),
  ('Face Pull', 'フェイスプル', 'shoulders', true),
  ('Arnold Press', 'アーノルドプレス', 'shoulders', true),
  -- Arms
  ('Barbell Curl', 'バーベルカール', 'arms', true),
  ('Dumbbell Curl', 'ダンベルカール', 'arms', true),
  ('Hammer Curl', 'ハンマーカール', 'arms', true),
  ('Tricep Pushdown', 'トライセップスプッシュダウン', 'arms', true),
  ('Skull Crusher', 'スカルクラッシャー', 'arms', true),
  ('Dips', 'ディップス', 'arms', true),
  -- Core
  ('Plank', 'プランク', 'core', true),
  ('Crunch', 'クランチ', 'core', true),
  ('Leg Raise', 'レッグレイズ', 'core', true),
  ('Russian Twist', 'ロシアンツイスト', 'core', true),
  ('Ab Wheel', 'アブローラー', 'core', true),
  -- Cardio
  ('Running', 'ランニング', 'cardio', true),
  ('Cycling', 'サイクリング', 'cardio', true),
  ('Jump Rope', 'なわとび', 'cardio', true)
on conflict do nothing;
