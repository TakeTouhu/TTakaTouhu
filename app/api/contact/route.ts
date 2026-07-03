import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const NOTIFY_EMAIL = 'vtabridge.t.ryuto@gmail.com';

export async function GET() {
  return NextResponse.json({
    resendKeySet: !!process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'your_resend_api_key_here',
  });
}

export async function POST(req: NextRequest) {
  const { name, company, email, topic, message, lang } = await req.json();

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
    // Notification to VTaBridge
    await resend.emails.send({
      from: 'VTaBridge Contact Form <onboarding@resend.dev>',
      to: NOTIFY_EMAIL,
      reply_to: email,
      subject: `【お問い合わせ】${name}様 (${company || '会社名未記入'})`,
      text: [
        `お名前: ${name}`,
        `会社名: ${company || '—'}`,
        `メールアドレス: ${email}`,
        topicLine,
        '',
        'お問い合わせ内容:',
        message,
      ].filter(Boolean).join('\n'),
    });

    // Auto-reply to inquirer
    await resend.emails.send({
      from: 'VTaBridge <onboarding@resend.dev>',
      to: email,
      subject: isEn
        ? 'Thank you for contacting VTaBridge'
        : '【VTaBridge】お問い合わせありがとうございます',
      text: isEn
        ? [
            `Dear ${name},`,
            '',
            'Thank you for reaching out to VTaBridge.',
            'Our sales representative will get back to you within 1–2 business days.',
            '',
            'If your inquiry is urgent, please feel free to contact us directly at:',
            NOTIFY_EMAIL,
            '',
            '—',
            'VTaBridge',
            NOTIFY_EMAIL,
          ].join('\n')
        : [
            `${name} 様`,
            '',
            'この度はVTaBridgeへお問い合わせいただきありがとうございます。',
            '担当の営業より、1〜2営業日以内にご返信いたします。',
            '',
            'お急ぎの場合は、下記メールアドレスまで直接ご連絡ください。',
            NOTIFY_EMAIL,
            '',
            '—',
            'VTaBridge',
            NOTIFY_EMAIL,
          ].join('\n'),
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
