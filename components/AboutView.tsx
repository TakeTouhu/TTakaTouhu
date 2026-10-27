export default function AboutView() {
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
          <div className="kicker">ABOUT</div>
          <h1 className="h1-logo"><img src="/logo.webp" alt="VTaVision" /><span>について</span></h1>
          <p>写真にある魅力を、動画でも伝える。VTaVisionは、企業がすでに持っている素材を活かして、顧客に伝える手段を広げるためのサービスです。</p>
        </div>
      </section>
      
      <section className="sec">
        <div className="wrap">
          <div className="grid-2" style={{gap: "64px", alignItems: "start"}}>
            <div>
              <div className="kicker">ABOUT</div>
              <h2 className="h-sec">写真にある魅力を、<br />動画でも伝える。</h2>
            </div>
            <div>
              <p className="lead-lg">物件の特徴、施設の雰囲気、商品の魅力。VTaVisionは、企業が持つ写真や情報を活用し、顧客に伝えるための動画制作を支援します。</p>
              <p className="lead-lg" style={{marginTop: "24px"}}>不動産、ホテル・旅館・グランピング、結婚式場・イベント会場、アミューズメント・レジャー施設、住宅・リフォーム、フィットネス施設。写真で魅力を伝える機会の多い業界での活用を想定しています。</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="sec sec-grey">
        <div className="wrap">
          <div className="kicker">MISSION</div>
          <h2 className="h-sec">伝えたい魅力を、動画にする。</h2>
          <p className="sub-sec mt-32" style={{fontSize: "16px", lineHeight: "2.1", maxWidth: "720px"}}>動画で紹介したいものがあっても、撮影や編集には手間がかかります。VTaVisionは、企業が既に持つ素材を活用し、動画という伝え方を選びやすくすることを目指します。</p>
          <div className="grid-3 mt-48">
            <div className="box">
              <h3>既にある素材から始める</h3>
              <p>新たな撮影を前提としません。掲載用に用意されている写真と、伝えたい情報を素材として活用します。</p>
            </div>
            <div className="box">
              <h3>写真だけでは伝わらない部分を補う</h3>
              <p>空間のつながりや施設の雰囲気など、静止画では伝えにくい内容を、動画という形で補います。</p>
            </div>
            <div className="box">
              <h3>提供できる範囲を、正確に伝える</h3>
              <p>準備中の機能や確認中の条件は、その状態のまま明示します。できることとできないことを曖昧にしません。</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="sec">
        <div className="wrap">
          <div className="kicker">MESSAGE</div>
          <h2 className="h-sec">代表メッセージ</h2>
          <div className="box mt-32" style={{padding: "40px"}}>
            <div className="quote">
              <p className="lead-lg">商品や施設の魅力は、写真だけでは伝わりきらないことがあります。一方で、動画をつくるには撮影と編集の手間がかかり、伝えたいものがあっても後回しになりがちです。</p>
              <p className="lead-lg" style={{marginTop: "20px"}}>VTaVisionは、企業がすでに持っている写真と情報を活かし、動画という伝え方を選びやすくするためのサービスです。現在も開発を進めている段階であり、準備中の機能や確認中の条件があります。それらは正確にお伝えしたうえで、ご要望に合う形をご提案します。まずはお持ちの素材について、ご相談いただければ幸いです。</p>
              <p style={{marginTop: "26px", fontSize: "14px", color: "var(--muted)"}}>VTaBridge 代表取締役社長</p>
              <p style={{fontSize: "17px", fontWeight: "700", fontFamily: "'Zen Kaku Gothic New',sans-serif"}}>髙橋 龍飛</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="cta">
        <div className="wrap">
          <h2>導入のご相談を承っています。</h2>
          <p>お持ちの素材とご要望をうかがったうえで、ご提供できる内容をご案内します。</p>
          <div className="hero-btns"><a className="btn btn-w" href="/contact">お問い合わせ</a></div>
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
