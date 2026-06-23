import { Specialty, SPECIALTY_LABELS } from '@/lib/types';

const COLORS: Record<Specialty, string> = {
  web: 'bg-sky-100 text-sky-700',
  mobile: 'bg-orange-100 text-orange-700',
  'ai-ml': 'bg-violet-100 text-violet-700',
  infrastructure: 'bg-teal-100 text-teal-700',
  data: 'bg-amber-100 text-amber-700',
  security: 'bg-red-100 text-red-700',
};

interface Props {
  specialty: Specialty;
}

export default function SpecialtyBadge({ specialty }: Props) {
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${COLORS[specialty]}`}>
      {SPECIALTY_LABELS[specialty]}
    </span>
  );
}
