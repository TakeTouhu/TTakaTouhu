export default function CompanyView() {
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
          <div className="kicker">COMPANY</div>
          <h1>会社概要</h1>
          <p>VTaBridgeは、写真や情報をもとに動画制作を支援するAIサービス「VTaVision」の開発・運営を行う会社です。</p>
        </div>
      </section>
      
      {/* ① ミッション / ビジョン / バリュー */}
      <section className="sec">
        <div className="wrap">
          <div className="center">
            <div className="kicker">MISSION / VISION / VALUE</div>
            <h2 className="h-sec">私たちが目指すもの</h2>
          </div>
          <div className="mvv">
            <div className="mvv-i">
              <div className="lbl">MISSION</div>
              <h3>伝えたい魅力を、<br />動画にする。</h3>
              <p>動画で紹介したいものがあっても、撮影や編集には手間がかかります。VTaVisionは、企業が既に持つ素材を活用し、動画という伝え方を選びやすくすることを目指します。</p>
            </div>
            <div className="mvv-i">
              <div className="lbl">VISION</div>
              <h3>写真にある魅力を、<br />動画でも伝える。</h3>
              <p>物件の特徴、施設の雰囲気、商品の魅力。すでに手元にある写真と情報から、顧客に伝わる形をつくれる状態を目指しています。</p>
            </div>
            <div className="mvv-i">
              <div className="lbl">VALUE</div>
              <h3>できることを、<br />正確に伝える。</h3>
              <p>準備中の機能や確認中の条件は、その状態のまま明示します。できることとできないことを曖昧にしないことを、判断の基準にします。</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* ② 代表メッセージ */}
      <section className="sec sec-grey">
        <div className="wrap">
          <div className="kicker">MESSAGE</div>
          <h2 className="h-sec">代表メッセージ</h2>
          <div className="box mt-32" style={{padding: "44px"}}>
            <div className="quote">
              <p className="lead-lg">商品や施設の魅力は、写真だけでは伝わりきらないことがあります。一方で、動画をつくるには撮影と編集の手間がかかり、伝えたいものがあっても後回しになりがちです。</p>
              <p className="lead-lg" style={{marginTop: "22px"}}>VTaVisionは、企業がすでに持っている写真と情報を活かし、動画という伝え方を選びやすくするためのサービスです。不動産、宿泊、ブライダル、レジャー、住宅・リフォーム、フィットネスなど、写真で魅力を伝える機会の多い業界での活用を想定しています。</p>
              <p className="lead-lg" style={{marginTop: "22px"}}>現在も開発を進めている段階であり、準備中の機能や確認中の条件があります。それらは正確にお伝えしたうえで、ご要望に合う形をご提案します。</p>
              <p style={{marginTop: "30px", fontSize: "13.5px", color: "var(--muted)"}}>VTaBridge 代表取締役社長</p>
              <p style={{fontSize: "19px", fontWeight: "900", fontFamily: "'Zen Kaku Gothic New',sans-serif"}}>髙橋 龍飛</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* ③ 会社概要テーブル */}
      <section className="sec">
        <div className="wrap">
          <div className="kicker">CORPORATE PROFILE</div>
          <h2 className="h-sec">会社情報</h2>
          <div className="mt-32">
            <table className="tbl"><tbody>
              <tr><th>会社名</th><td>VTaBridge</td></tr>
              <tr><th>設立</th><td>2026年6月</td></tr>
              <tr><th>代表取締役社長</th><td>髙橋 龍飛（Ryuto Takahashi）</td></tr>
              <tr><th>取締役</th><td>Tikhomirova Veronika（ティホミロワ・ヴェロニカ）</td></tr>
              <tr><th>所在地</th><td><span className="ph">[記載予定]</span></td></tr>
              <tr><th>事業内容</th><td>動画制作支援AIサービス「VTaVision」の開発・運営<br /><span style={{fontSize: "12.5px", color: "var(--faint)"}}>写真や情報をもとに、商品・施設・空間の魅力を伝える動画制作を支援します</span></td></tr>
              <tr><th>主要取引先金融機関</th><td><span className="ph">[記載予定]</span></td></tr>
              <tr><th>お問い合わせ</th><td>vtabridge.t.ryuto@gmail.com</td></tr>
            </tbody></table>
          </div>
        </div>
      </section>
      
      {/* ④ 役員 */}
      <section className="sec sec-grey">
        <div className="wrap">
          <div className="kicker">OFFICERS</div>
          <h2 className="h-sec">役員紹介</h2>
          <div className="people">
            <div className="person">
              <div className="avatar">顔写真<br />掲載予定</div>
              <div>
                <div className="role">代表取締役社長</div>
                <h3>髙橋 龍飛</h3>
                <p>IT商流・開発の実務経験をもとにVTaBridgeを創業。VTaVisionの企画・開発を統括しています。<span className="ph">[経歴を追記]</span></p>
              </div>
            </div>
            <div className="person">
              <div className="avatar">顔写真<br />掲載予定</div>
              <div>
                <div className="role">取締役</div>
                <h3>Tikhomirova Veronika</h3>
                <p><span className="ph">[担当領域・経歴を記載]</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* ⑤ 沿革 */}
      <section className="sec">
        <div className="wrap">
          <div className="kicker">HISTORY</div>
          <h2 className="h-sec">沿革</h2>
          <div className="hist">
            <div className="hist-i">
              <div className="d">2026.06</div>
              <div><h3>VTaBridge 創業・設立</h3><p>髙橋龍飛が代表取締役社長として創業。</p></div>
            </div>
            <div className="hist-i">
              <div className="d">2026.<span className="ph">[00]</span></div>
              <div><h3>動画生成AIサービス「VTaVision」開発着手</h3><p><span className="ph">[実際の時期・内容を記載]</span></p></div>
            </div>
            <div className="hist-i">
              <div className="d">2026.<span className="ph">[00]</span></div>
              <div><h3>VTaVision 提供開始</h3><p><span className="ph">[確認中]</span></p></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* ⑥ 拠点 */}
      <section className="sec sec-grey">
        <div className="wrap">
          <div className="kicker">OFFICES</div>
          <h2 className="h-sec">拠点</h2>
          <div className="offices">
            <div className="box">
              <h3>本社</h3>
              <p style={{marginTop: "8px"}}><span className="ph">[住所を記載]</span></p>
              <p style={{marginTop: "10px", fontSize: "12.5px", color: "var(--faint)"}}>最寄り駅：<span className="ph">[記載予定]</span></p>
            </div>
            <div className="box">
              <h3>お問い合わせ窓口</h3>
              <p style={{marginTop: "8px"}}>vtabridge.t.ryuto@gmail.com</p>
              <p style={{marginTop: "10px", fontSize: "12.5px", color: "var(--faint)"}}>受付時間：平日 <span className="ph">[時間を記載]</span>（土日祝を除く）</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="cta">
        <div className="wrap">
          <h2>お気軽にお問い合わせください。</h2>
          <p>サービスに関するご質問、取材・協業のご相談も承っています。</p>
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
