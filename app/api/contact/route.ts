import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const NOTIFY_EMAIL = 'vtabridge.t.ryuto@gmail.com';

export async function POST(req: NextRequest) {
  const { name, company, email, topic, message, lang } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const topicLine = topic ? (lang === 'en' ? `Topic: ${topic}` : `ご用件: ${topic}`) : '';

  // Notification to VTaBridge
  await transporter.sendMail({
    from: `"VTaBridge Contact Form" <${process.env.GMAIL_USER}>`,
    to: NOTIFY_EMAIL,
    subject: `【お問い合わせ】${name}様 (${company || '会社名未記入'})`,
    text: [
      `お名前: ${name}`,
      `会社名: ${company || '—'}`,
      `メールアドレス: ${email}`,
      topicLine,
      '',
      `お問い合わせ内容:`,
      message,
    ].filter(Boolean).join('\n'),
  });

  // Auto-reply to inquirer
  const isEn = lang === 'en';
  await transporter.sendMail({
    from: `"VTaBridge" <${process.env.GMAIL_USER}>`,
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
          '---',
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
          '---',
          'VTaBridge',
          NOTIFY_EMAIL,
        ].join('\n'),
  });

  return NextResponse.json({ ok: true });
}
