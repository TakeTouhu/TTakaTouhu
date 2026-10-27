'use client';

import { useState } from 'react';

const TOPICS = [
  '導入のご相談',
  'サービス内容について',
  '提供開始のご案内希望',
  'その他',
];

type Status = 'idle' | 'sending' | 'ok' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    topic: '',
    message: '',
  });
  const [agreed, setAgreed] = useState(false);

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang: 'ja' }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `送信に失敗しました (${res.status})`);
      }
      setStatus('ok');
      setForm({ company: '', name: '', email: '', phone: '', topic: '', message: '' });
      setAgreed(false);
    } catch (err) {
      setStatus('error');
      setError(
        err instanceof Error
          ? err.message
          : '送信に失敗しました。お手数ですがメールでご連絡ください。'
      );
    }
  }

  if (status === 'ok') {
    return (
      <div className="form">
        <div className="form-msg ok">
          お問い合わせを受け付けました。内容を確認のうえ、2営業日以内にご返信します。
        </div>
        <div>
          <button type="button" className="btn btn-o" onClick={() => setStatus('idle')}>
            続けて送信する
          </button>
        </div>
      </div>
    );
  }

  const sending = status === 'sending';

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <div className="row-2">
        <div className="field">
          <label htmlFor="cf-company">会社名<i>必須</i></label>
          <input id="cf-company" className="input" type="text" required
            autoComplete="organization" placeholder="株式会社〇〇"
            value={form.company} onChange={set('company')} />
        </div>
        <div className="field">
          <label htmlFor="cf-name">お名前<i>必須</i></label>
          <input id="cf-name" className="input" type="text" required
            autoComplete="name" placeholder="山田 太郎"
            value={form.name} onChange={set('name')} />
        </div>
      </div>

      <div className="row-2">
        <div className="field">
          <label htmlFor="cf-email">メールアドレス<i>必須</i></label>
          <input id="cf-email" className="input" type="email" required
            autoComplete="email" placeholder="taro@example.co.jp"
            value={form.email} onChange={set('email')} />
        </div>
        <div className="field">
          <label htmlFor="cf-phone">電話番号</label>
          <input id="cf-phone" className="input" type="tel"
            autoComplete="tel" placeholder="03-0000-0000"
            value={form.phone} onChange={set('phone')} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="cf-topic">お問い合わせ種別<i>必須</i></label>
        <select id="cf-topic" className="input" required
          value={form.topic} onChange={set('topic')}>
          <option value="">選択してください</option>
          {TOPICS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="cf-message">お問い合わせ内容<i>必須</i></label>
        <textarea id="cf-message" className="input input-ta" required
          placeholder="ご相談内容、対象となる業界、お持ちの素材（写真の有無など）をご記入ください"
          value={form.message} onChange={set('message')} />
      </div>

      <label className="chk" htmlFor="cf-agree">
        <input id="cf-agree" type="checkbox" required
          checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
        <span className="form-note">
          <a href="/policies/privacy">プライバシーポリシー</a>に同意のうえ送信してください。
        </span>
      </label>

      {status === 'error' && <div className="form-msg ng">{error}</div>}

      <div>
        <button type="submit" className="btn btn-p" disabled={sending}>
          {sending ? '送信中…' : '送信する'}
        </button>
      </div>
    </form>
  );
}
