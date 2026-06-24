export type WeightUnit = 'kg' | 'lbs';
export type GoalPeriod = 'week' | 'month' | 'year';
export type MessageType = 'text' | 'achievement' | 'workout_share';
export type FriendshipStatus = 'pending' | 'accepted' | 'blocked';

export interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  preferred_unit: WeightUnit;
  created_at: string;
}

export interface Exercise {
  id: string;
  name: string;
  name_ja: string | null;
  category: string;
  is_default: boolean;
  created_by: string | null;
}

export interface WorkoutSession {
  id: string;
  user_id: string;
  date: string;
  notes: string | null;
  created_at: string;
  sets?: WorkoutSet[];
  profile?: Profile;
}

export interface WorkoutSet {
  id: string;
  session_id: string;
  exercise_id: string;
  set_number: number;
  weight: number | null;
  reps: number | null;
  unit: WeightUnit;
  has_assistance: boolean;
  notes: string | null;
  exercise?: Exercise;
}

export interface Group {
  id: string;
  name: string;
  description: string | null;
  avatar_url: string | null;
  created_by: string;
  created_at: string;
  member_count?: number;
  members?: GroupMember[];
}

export interface GroupMember {
  group_id: string;
  user_id: string;
  role: 'admin' | 'member';
  joined_at: string;
  profile?: Profile;
}

export interface Goal {
  id: string;
  user_id: string;
  group_id: string | null;
  exercise_id: string | null;
  title: string;
  description: string | null;
  target_value: number | null;
  target_unit: string | null;
  period: GoalPeriod;
  start_date: string;
  end_date: string;
  is_achieved: boolean;
  achieved_at: string | null;
  created_at: string;
  exercise?: Exercise;
  current_value?: number;
}

export interface Message {
  id: string;
  group_id: string;
  user_id: string;
  content: string;
  message_type: MessageType;
  metadata: Record<string, unknown> | null;
  created_at: string;
  profile?: Profile;
}

export interface Friendship {
  id: string;
  requester_id: string;
  addressee_id: string;
  status: FriendshipStatus;
  created_at: string;
  profile?: Profile;
}
