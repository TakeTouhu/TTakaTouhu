import { WeightUnit } from './types';

export function convertWeight(value: number, from: WeightUnit, to: WeightUnit): number {
  if (from === to) return value;
  if (from === 'kg' && to === 'lbs') return Math.round(value * 2.20462 * 10) / 10;
  return Math.round(value / 2.20462 * 10) / 10;
}

export function formatWeight(value: number | null, unit: WeightUnit): string {
  if (value === null) return '-';
  return `${value}${unit}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric', weekday: 'short' });
}

export function getPeriodDates(period: 'week' | 'month' | 'year'): { start: Date; end: Date } {
  const now = new Date();
  const start = new Date(now);
  if (period === 'week') {
    const day = now.getDay();
    start.setDate(now.getDate() - day);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start, end };
  }
  if (period === 'month') {
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
    return { start, end };
  }
  start.setMonth(0, 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start.getFullYear(), 11, 31);
  return { start, end };
}

export const EXERCISE_CATEGORIES = [
  { id: 'chest', label: '胸', icon: '💪' },
  { id: 'back', label: '背中', icon: '🔙' },
  { id: 'legs', label: '脚', icon: '🦵' },
  { id: 'shoulders', label: '肩', icon: '🏋️' },
  { id: 'arms', label: '腕', icon: '💪' },
  { id: 'core', label: '体幹', icon: '🎯' },
  { id: 'cardio', label: '有酸素', icon: '🏃' },
];

export const COLORS = {
  primary: '#6366F1',
  secondary: '#8B5CF6',
  accent: '#EC4899',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  bg: '#0F172A',
  surface: '#1E293B',
  surfaceLight: '#334155',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  border: '#334155',
};
