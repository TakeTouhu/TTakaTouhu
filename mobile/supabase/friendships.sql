-- ============================================================
-- Friendships table (add to existing schema)
-- ============================================================

create table if not exists friendships (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid references profiles(id) on delete cascade not null,
  addressee_id uuid references profiles(id) on delete cascade not null,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'blocked')),
  created_at timestamptz not null default now(),
  unique (requester_id, addressee_id)
);
alter table friendships enable row level security;

create policy "Users can view own friendships" on friendships for select using (
  auth.uid() = requester_id or auth.uid() = addressee_id
);
create policy "Users can send friend requests" on friendships for insert with check (
  auth.uid() = requester_id
);
create policy "Addressee can update status" on friendships for update using (
  auth.uid() = addressee_id or auth.uid() = requester_id
);
create policy "Users can delete own friendships" on friendships for delete using (
  auth.uid() = requester_id or auth.uid() = addressee_id
);

-- View: friend list (accepted both directions)
create or replace view friend_list as
  select
    f.id,
    case when f.requester_id = auth.uid() then f.addressee_id else f.requester_id end as friend_id,
    f.status,
    f.created_at
  from friendships f
  where (f.requester_id = auth.uid() or f.addressee_id = auth.uid())
    and f.status = 'accepted';
