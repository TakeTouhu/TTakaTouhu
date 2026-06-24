import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const SALES_EMAIL = 'vtabridge.t.ryuto@gmail.com';
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'noreply@vtabridge.jp';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { companyName, engineerName, engineerEmail, jobTitle, message } = body as {
      companyName: string;
      engineerName: string;
      engineerEmail: string;
      jobTitle?: string;
      message: string;
    };

    if (!companyName || !engineerName || !engineerEmail || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const jobLine = jobTitle ? `【関連案件】${jobTitle}\n` : '';
    const now = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });

    // Email 1: to VTaBridge sales
    const salesEmailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: SALES_EMAIL,
      subject: `【VTa Platform】企業からエンジニアへアプローチがありました - ${engineerName}`,
      text: [
        `企業からエンジニアへのアプローチが届きました。`,
        ``,
        `【受信日時】${now}`,
        `【企業名】${companyName}`,
        `【エンジニア名】${engineerName}`,
        `【エンジニアメール】${engineerEmail}`,
        jobLine,
        `【メッセージ】`,
        message,
        ``,
        `---`,
        `このメールはVTa Platformから自動送信されています。`,
        `エンジニアへの連絡はこのメールに返信するか、上記メールアドレスへご連絡ください。`,
      ].join('\n'),
    });

    if (salesEmailResult.error) {
      console.error('Sales email error:', salesEmailResult.error);
      return NextResponse.json({ error: 'Failed to send sales email' }, { status: 500 });
    }

    // Email 2: to engineer (from VTaBridge sales)
    const engineerEmailResult = await resend.emails.send({
      from: SALES_EMAIL.includes('gmail') ? FROM_EMAIL : SALES_EMAIL,
      to: engineerEmail,
      replyTo: SALES_EMAIL,
      subject: `【VTaBridge】企業からアプローチが届いています`,
      text: [
        `${engineerName} 様`,
        ``,
        `VTaBridgeの営業担当です。`,
        `このたび、VTa Platformを通じて企業からあなたへアプローチがございました。`,
        ``,
        `【企業名】${companyName}`,
        jobLine,
        `【メッセージ】`,
        message,
        ``,
        `ご興味がおありでしたら、このメールにご返信いただくか、`,
        `下記の担当者までお気軽にご連絡ください。`,
        ``,
        `VTaBridge 営業担当`,
        `Email: ${SALES_EMAIL}`,
        ``,
        `---`,
        `このメールはVTa Platformから自動送信されています。`,
        `心当たりのない場合はお手数ですが上記メールアドレスまでご連絡ください。`,
      ].join('\n'),
    });

    if (engineerEmailResult.error) {
      console.error('Engineer email error:', engineerEmailResult.error);
      // Sales email already sent, log but don't fail the whole request
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('send-inquiry error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
