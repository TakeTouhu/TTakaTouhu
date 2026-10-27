import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const NOTIFY_EMAIL = 'vtabridge.t.ryuto@gmail.com';

export async function GET() {
  return NextResponse.json({
    resendKeySet: !!process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'your_resend_api_key_here',
  });
}

export async function POST(req: NextRequest) {
  const { name, company, email, phone, topic, message, lang } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === 'your_resend_api_key_here') {
    console.error('[contact] RESEND_API_KEY not configured in .env.local');
    return NextResponse.json(
      { error: 'Email service not configured.' },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const isEn = lang === 'en';
  const topicLine = topic ? (isEn ? `Topic: ${topic}` : `ご用件: ${topic}`) : '';

  try {
    // 社内通知のみ（送信者への自動返信は行わない）
    await resend.emails.send({
      from: 'VTaVision Contact Form <onboarding@resend.dev>',
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: `【お問い合わせ】${name}様 (${company || '会社名未記入'})`,
      text: [
        `お名前: ${name}`,
        `会社名: ${company || '—'}`,
        `メールアドレス: ${email}`,
        `電話番号: ${phone || '—'}`,
        topicLine,
        '',
        'お問い合わせ内容:',
        message,
      ].filter(Boolean).join('\n'),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] Failed to send email:', err);
    return NextResponse.json(
      { error: 'Failed to send email. Check server logs for details.' },
      { status: 500 }
    );
  }
}
