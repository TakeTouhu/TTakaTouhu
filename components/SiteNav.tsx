export default function SiteNav() {
  return (
    <header className="nav">
      <div className="nav-l">
        <a className="logo-img" href="/"><img src="/logo.webp" alt="VTaVision by VTaBridge" /></a>
        <nav className="nav-links">
          <a href="/#caps">できること</a>
          <a href="/features">機能詳細</a>
          <a href="/#price">料金</a>
          <a href="/#faq">よくある質問</a>
          <a href="/company">会社概要</a>
        </nav>
      </div>
      <div className="nav-r"><a className="btn btn-p btn-sm" href="/contact">お問い合わせ</a></div>
    </header>
  );
}
