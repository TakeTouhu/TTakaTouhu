'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/authStore';
import { db } from '@/lib/db';
import { EngineerProfile, Job } from '@/lib/types';
import SkillBadge from '@/components/SkillBadge';
import SpecialtyBadge from '@/components/SpecialtyBadge';

export default function EngineerDetailPage() {
  const params = useParams();
  const { user } = useAuthStore();
  const engineerId = params.id as string;

  const [profile, setProfile] = useState<EngineerProfile | null>(null);
  const [myJobs, setMyJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const p = db.engineerProfiles.findByUserId(engineerId);
    if (!p || !p.name) {
      setNotFound(true);
      return;
    }
    setProfile(p);
    if (user) {
      const jobs = db.jobs.findByCompanyId(user.id).filter(j => j.isActive);
      setMyJobs(jobs);
    }
  }, [engineerId, user]);

  if (notFound) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">エンジニアが見つかりません</p>
        <Link href="/company/engineers" className="mt-3 inline-block text-indigo-600 hover:underline text-sm">
          一覧に戻る
        </Link>
      </div>
    );
  }

  if (!profile) return null;

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !message.trim()) return;
    setSending(true);
    db.inquiries.create({
      companyId: user.id,
      engineerId,
      jobId: selectedJobId || undefined,
      message,
    });
    setSent(true);
    setSending(false);
    setMessage('');
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <Link href="/company/engineers" className="text-indigo-600 hover:text-indigo-800 text-sm">
          ← エンジニア一覧
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center text-white font-bold text-2xl shrink-0">
                {profile.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                <div className="flex flex-wrap gap-1 mt-2">
                  {profile.specialties.map(s => <SpecialtyBadge key={s} specialty={s} />)}
                </div>
              </div>
            </div>
            {profile.bio && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">自己紹介</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{profile.bio}</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">スキル</h2>
            {profile.skills.length === 0 ? (
              <p className="text-gray-400 text-sm">スキルの登録はありません</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.skills.map(s => <SkillBadge key={s.id} language={s.language} level={s.level} />)}
              </div>
            )}
          </div>

          {profile.achievements.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">実績・プロジェクト</h2>
              <div className="space-y-4">
                {profile.achievements.map(a => (
                  <div key={a.id} className="border-l-2 border-indigo-200 pl-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-medium text-gray-900">{a.projectName}</h3>
                      {a.startDate && a.endDate && (
                        <span className="text-xs text-gray-400 shrink-0">{a.startDate} 〜 {a.endDate}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{a.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">案件依頼を送る</h2>
            <p className="text-xs text-gray-500 mb-4">
              依頼内容はVTaBridgeの営業担当を通じてエンジニアへ連絡されます。
            </p>

            {sent ? (
              <div className="bg-green-50 text-green-700 px-4 py-4 rounded-xl text-sm text-center">
                <div className="font-medium mb-1">依頼を送信しました</div>
                <div className="text-xs">VTaBridgeの担当者が折り返しご連絡いたします。</div>
                <button onClick={() => setSent(false)} className="mt-3 text-xs underline">
                  別の依頼を送る
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquiry} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">関連案件（任意）</label>
                  <select
                    value={selectedJobId}
                    onChange={e => setSelectedJobId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  >
                    <option value="">案件を選択しない</option>
                    {myJobs.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">メッセージ <span className="text-red-500">*</span></label>
                  <textarea
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
                    placeholder="依頼内容・案件概要・条件など"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {sending ? '送信中...' : '依頼を送る'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
