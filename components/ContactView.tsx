import ContactForm from '@/components/ContactForm';

export default function ContactView() {
  return (
    <div className="v-site">
      <header className="nav">
        <div className="nav-l">
          <a className="logo-img" href="/"><img src="/logo.webp" alt="VTaVision by VTaBridge" /></a>
          <nav className="nav-links"><a href="/#caps">できること</a><a href="/features">機能詳細</a><a href="/#price">料金</a><a href="/#faq">よくある質問</a><a href="/company">会社概要</a></nav>
        </div>
        <div className="nav-r"><a className="btn btn-p btn-sm" href="/contact">お問い合わせ</a></div>
      </header>
      
      <section className="phead">
        <div className="wrap">
          <div className="kicker">CONTACT</div>
          <h1>お問い合わせ</h1>
          <p>導入のご相談、サービス内容についてのご質問を承っています。お持ちの素材とご要望をうかがったうえで、ご提供できる内容をご案内します。2営業日以内にご返信します。</p>
        </div>
      </section>
      
      <section className="sec">
        <div className="wrap">
          <div className="grid-2" style={{gap: "56px", alignItems: "start"}}>
            <div className="box" style={{padding: "36px"}}>
              <h3 style={{fontSize: "19px", marginBottom: "24px"}}>フォームからのお問い合わせ</h3>
              <ContactForm />
            </div>
            <div>
              <div className="box">
                <h3>メールでのお問い合わせ</h3>
                <p style={{marginTop: "10px"}}>vtabridge.t.ryuto@gmail.com</p>
              </div>
              <div className="box" style={{marginTop: "20px"}}>
                <h3>受付時間</h3>
                <p style={{marginTop: "10px"}}>平日 <span className="ph">[確認中]</span><br />土日祝を除く</p>
              </div>
              <div className="box" style={{marginTop: "20px"}}>
                <h3>よくあるご質問</h3>
                <div className="list" style={{marginTop: "14px"}}>
                  <div><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M9 5l7 7-7 7" /></svg>どのような素材を用意すればよいですか？</div>
                  <div><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M9 5l7 7-7 7" /></svg>対応している業界はどこですか？</div>
                  <div><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M9 5l7 7-7 7" /></svg>写真に写っていないものも動画にできますか？</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="foot">
        <div className="wrap">
          <div className="foot-top">
            <div>
              <a className="logo-img" href="/"><img src="/logo.webp" alt="VTaVision by VTaBridge" /></a>
              <p style={{marginTop: "12px", maxWidth: "260px", lineHeight: "2"}}>動画制作支援AIサービス「VTaVision」は、VTaBridgeが開発・運営しています。</p>
            </div>
            <div className="foot-cols">
              <div className="foot-col"><h4>サービス</h4><div><a href="/#caps">できること</a><br /><a href="/features">機能詳細</a><br /><a href="/#price">料金</a><br /><a href="/#faq">よくある質問</a></div></div>
              <div className="foot-col"><h4>会社情報</h4><div><a href="/about">VTaVisionについて</a><br /><a href="/company">会社概要</a><br /><a href="/contact">お問い合わせ</a></div></div>
            </div>
          </div>
          <div className="foot-bot">
            <span>© 2026 VTaBridge. All rights reserved.</span>
            <div className="foot-links"><a href="/policies/privacy">プライバシーポリシー</a><a href="/policies/information-security">情報セキュリティ基本方針</a><a href="/policies/anti-social-forces">反社会的勢力排除方針</a></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
