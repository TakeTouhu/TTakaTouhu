'use client';
import { SkillLevel } from '@/lib/types';
import { useT } from '@/hooks/useT';

const LEVEL_COLORS: Record<SkillLevel, string> = {
  beginner: 'bg-gray-100 text-gray-600',
  intermediate: 'bg-blue-100 text-blue-700',
  advanced: 'bg-green-100 text-green-700',
  expert: 'bg-purple-100 text-purple-700',
};

interface Props {
  language: string;
  level: SkillLevel;
}

export default function SkillBadge({ language, level }: Props) {
  const { t } = useT();
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${LEVEL_COLORS[level]}`}>
      {language}
      <span className="opacity-70">·</span>
      {t.skillLevel[level]}
    </span>
  );
}
