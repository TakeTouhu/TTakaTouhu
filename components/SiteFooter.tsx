export default function SiteFooter() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div>
            <a className="logo-img" href="/"><img src="/logo.webp" alt="VTaVision by VTaBridge" /></a>
            <p style={{ marginTop: '12px', maxWidth: '260px', lineHeight: '2' }}>
              動画制作支援AIサービス「VTaVision」は、VTaBridgeが開発・運営しています。
            </p>
          </div>
          <div className="foot-cols">
            <div className="foot-col">
              <h4>サービス</h4>
              <div>
                <a href="/#caps">できること</a><br />
                <a href="/features">機能詳細</a><br />
                <a href="/#price">料金</a><br />
                <a href="/#faq">よくある質問</a>
              </div>
            </div>
            <div className="foot-col">
              <h4>会社情報</h4>
              <div>
                <a href="/about">VTaVisionについて</a><br />
                <a href="/company">会社概要</a><br />
                <a href="/contact">お問い合わせ</a>
              </div>
            </div>
          </div>
        </div>
        <div className="foot-bot">
          <span>© 2026 VTaBridge. All rights reserved.</span>
          <div className="foot-links">
            <a href="/policies/privacy">プライバシーポリシー</a>
            <a href="/policies/information-security">情報セキュリティ基本方針</a>
            <a href="/policies/anti-social-forces">反社会的勢力排除方針</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
