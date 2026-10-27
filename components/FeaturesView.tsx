'use client';
import { useEffect } from 'react';

export default function FeaturesView() {
  useEffect(() => {
    const s = document.createElement('script');
    s.textContent = `(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cards  = Array.prototype.slice.call(document.querySelectorAll('.uc'));
  var back   = document.getElementById('ucBack');
  var modal  = document.getElementById('ucModal');
  var thEl   = document.getElementById('ucTh');
  var bodyEl = document.getElementById('ucBody');
  if (!cards.length || !modal) return;

  var opener = null, scrollY = 0, busy = false;

  var CLOSE_SVG = '<button class="uc-close" id="ucClose" aria-label="閉じる">' +
    '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">' +
    '<path d="M18 6L6 18M6 6l12 12"/></svg></button>';

  function lock(){
    scrollY = window.scrollY;
    document.body.style.top = (-scrollY) + 'px';
    document.body.classList.add('locked');
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  }
  function unlock(){
    document.body.classList.remove('locked');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollY);
  }

  function place(){
    modal.style.transition = 'none';
    modal.style.transform = 'none';
    var mw = modal.offsetWidth, mh = modal.offsetHeight;
    modal.style.left = Math.max(12, (innerWidth  - mw) / 2) + 'px';
    modal.style.top  = Math.max(12, (innerHeight - mh) / 2) + 'px';
  }

  function open(card){
    if (busy) return; busy = true;
    opener = card;

    var th     = card.querySelector('.uc-th');
    var tone   = (th.className.match(/\\bt\\d\\b/) || ['t1'])[0];
    var photo  = th.querySelector('img');
    var chipEl = th.querySelector('.uc-ph');
    var chip   = chipEl ? '<span class="' + chipEl.className + '">' + chipEl.textContent + '</span>' : '';
    var visual = photo
      ? '<img src="' + photo.getAttribute('src') + '" alt="' + (photo.getAttribute('alt') || '') + '">'
      : th.querySelector('svg').outerHTML;
    var detail = card.querySelector('.uc-detail').innerHTML;

    thEl.className = 'uc-modal-th ' + tone + (photo ? ' photo' : '');
    thEl.innerHTML = CLOSE_SVG + chip + visual;
    bodyEl.innerHTML = detail;
    var h3 = bodyEl.querySelector('h3'); if (h3) h3.id = 'ucHeading';

    modal.hidden = false;
    back.classList.add('on');
    modal.classList.add('on');
    lock();
    place();

    if (reduce) {
      document.getElementById('ucClose').focus();
      busy = false;
      return;
    }

    // カードの位置から開く（FLIP）
    var m = modal.getBoundingClientRect(), c = card.getBoundingClientRect();
    var dx = c.left - m.left, dy = c.top - m.top;
    var sx = Math.max(c.width / m.width, .05), sy = Math.max(c.height / m.height, .05);
    modal.style.transition = 'none';
    modal.style.transform  = 'translate(' + dx + 'px,' + dy + 'px) scale(' + sx + ',' + sy + ')';
    modal.style.opacity    = '0';
    modal.offsetHeight; // reflow
    modal.style.transition = 'transform .58s cubic-bezier(.16,1,.3,1), opacity .3s ease';
    modal.style.transform  = 'none';
    modal.style.opacity    = '1';

    setTimeout(function(){
      var cb = document.getElementById('ucClose'); if (cb) cb.focus();
      busy = false;
    }, 300);
  }

  function close(){
    if (busy || !modal.classList.contains('on')) return; busy = true;
    back.classList.remove('on');

    function done(){
      modal.classList.remove('on');
      modal.hidden = true;
      modal.style.transition = 'none';
      modal.style.transform = 'none';
      modal.style.opacity = '';
      unlock();
      if (opener) opener.focus();
      busy = false;
    }

    if (reduce) { done(); return; }

    var m = modal.getBoundingClientRect(), c = opener.getBoundingClientRect();
    var dx = c.left - m.left, dy = c.top - m.top;
    var sx = Math.max(c.width / m.width, .05), sy = Math.max(c.height / m.height, .05);
    modal.style.transition = 'transform .42s cubic-bezier(.4,0,.2,1), opacity .3s ease .1s';
    modal.style.transform  = 'translate(' + dx + 'px,' + dy + 'px) scale(' + sx + ',' + sy + ')';
    modal.style.opacity    = '0';
    setTimeout(done, 430);
  }

  cards.forEach(function(card){ card.addEventListener('click', function(){ open(card); }); });
  back.addEventListener('click', close);
  document.addEventListener('click', function(e){ if (e.target.closest('#ucClose')) close(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });
  addEventListener('resize', function(){ if (modal.classList.contains('on')) place(); });
})();`;
    document.body.appendChild(s);
    return () => { s.remove(); };
  }, []);

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
          <div className="kicker">FEATURES</div>
          <h1>提供内容と活用が想定される業界</h1>
          <p>お持ちの写真と伝えたい情報を素材に、動画制作を支援します。現時点で確定している提供内容と、確認中の項目をあわせて掲載しています。</p>
        </div>
      </section>
      
      <section className="sec">
        <div className="wrap">
          <div className="kicker">WHAT WE DO</div>
          <h2 className="h-sec">VTaVisionが支援すること</h2>
          <p className="sub-sec">写真や伝えたい情報をもとに、商品・施設・空間の魅力を伝える動画の制作を支援します。</p>
          <div className="grid-3 mt-32">
            <div className="box">
              <div className="box-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg></div>
              <h3>写真を素材にする</h3>
              <p>すでにお持ちの商品・施設・空間の写真を素材として活用します。新たな撮影を前提としません。</p>
            </div>
            <div className="box">
              <div className="box-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 7V5h16v2M9 19h6M12 5v14" /></svg></div>
              <h3>伝えたい情報を反映する</h3>
              <p>物件概要・設備一覧・仕様情報など、写真とあわせて伝えたい内容をお預かりし、動画に反映します。</p>
            </div>
            <div className="box">
              <div className="box-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 19l7-7-7-7M5 19l7-7-7-7" /></svg></div>
              <h3>内容に応じて作り直す</h3>
              <p>1回の生成につき、2回まで再生成できます（全プラン共通）。伝えたい内容に合わせて調整します。</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="sec sec-grey">
        <div className="wrap">
          <div className="kicker">INDUSTRIES</div>
          <h2 className="h-sec">活用が想定される業界</h2>
          <p className="sub-sec">VTaVisionは、写真や伝えたい情報をもとに、商品・施設・空間の魅力を伝える動画制作を支援します。画像をタップすると、その業界での使い方が開きます。</p>
      
          <div className="uc-grid" id="ucGrid">
      
            <button className="uc" type="button">
              <div className="uc-th t1">
                <span className="uc-ph">画像 掲載予定</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 21h18M5 21V8l7-5 7 5v13" /><path d="M9 21v-6h6v6M9 11h1.5M13.5 11H15" /></svg>
              </div>
              <div className="uc-b">
                <h3>不動産</h3>
                <p>物件の写真や特徴をもとに、住まいを検討する人へ魅力を伝える動画に。</p>
                <span className="uc-more">詳しく見る<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
              </div>
              <div className="uc-detail">
                <div className="tagline">INDUSTRY 01 — REAL ESTATE</div>
                <h3>不動産</h3>
                <p className="lede">物件の写真や特徴をもとに、住まいを検討する人へ魅力を伝える動画を制作します。間取り図や室内写真といった、すでに掲載用に用意されている素材を起点にできます。</p>
                <h4>想定する顧客</h4>
                <ul>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>住まいを探している個人のお客様</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>来店前に物件を比較検討している方</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>遠方にいて現地を見に行きにくい方</li>
                </ul>
                <h4>伝える内容</h4>
                <ul>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>間取りや各部屋のつながり</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>室内の広さや明るさの印象</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>立地や周辺環境など、掲載情報にある特徴</li>
                </ul>
                <h4>素材として用意するもの</h4>
                <ul>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>室内・外観の写真</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>間取り図</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>物件概要・訴求したいポイントのテキスト</li>
                </ul>
                <p className="uc-note">ご提供いただいた写真と情報にもとづいて制作します。写真に写っていない設備・眺望などの扱いは、個別にご相談ください。</p>
              </div>
            </button>
      
            <button className="uc" type="button">
              <div className="uc-th t2 photo">
                <span className="uc-ph shot">イメージ写真</span><img src="/uc-hotel.webp" alt="客室と庭園のイメージ" />
              </div>
              <div className="uc-b">
                <h3>ホテル・旅館・グランピング</h3>
                <p>客室や施設の写真から、滞在の雰囲気を伝える紹介動画に。</p>
                <span className="uc-more">詳しく見る<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
              </div>
              <div className="uc-detail">
                <div className="tagline">INDUSTRY 02 — HOTEL &amp; RYOKAN</div>
                <h3>ホテル・旅館・グランピング</h3>
                <p className="lede">客室や施設の写真から、滞在の雰囲気を伝える紹介動画を制作します。予約サイトや自社サイトに掲載している写真を、そのまま素材として使えます。</p>
                <h4>想定する顧客</h4>
                <ul>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>宿泊先を比較検討している個人のお客様</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>旅行の行き先を決めかねている方</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>団体・法人の宿泊手配を担当する方</li>
                </ul>
                <h4>伝える内容</h4>
                <ul>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>客室タイプごとの違い</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>大浴場・食事処・共用部などの施設</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>館内で過ごす時間の雰囲気</li>
                </ul>
                <h4>素材として用意するもの</h4>
                <ul>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>客室・館内・外観の写真</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>客室タイプや設備の一覧</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>プラン内容・訴求したいポイントのテキスト</li>
                </ul>
                <p className="uc-note">ご提供いただいた写真と情報にもとづいて制作します。写真に写っていない眺望や実際の滞在体験を再現するものではありません。</p>
              </div>
            </button>
      
            <button className="uc" type="button">
              <div className="uc-th t3 photo">
                <span className="uc-ph shot">イメージ写真</span><img src="/uc-wedding.webp" alt="披露宴会場のイメージ" />
              </div>
              <div className="uc-b">
                <h3>結婚式場・イベント会場</h3>
                <p>会場の空間や利用シーンを、検討中のお客様に伝える動画に。</p>
                <span className="uc-more">詳しく見る<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
              </div>
              <div className="uc-detail">
                <div className="tagline">INDUSTRY 03 — WEDDING &amp; EVENT</div>
                <h3>結婚式場・イベント会場</h3>
                <p className="lede">会場の空間や利用シーンを、検討中のお客様に伝える動画を制作します。会場ごとの写真とレイアウト情報を起点に、規模や使い方の違いを伝えられます。</p>
                <h4>想定する顧客</h4>
                <ul>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>会場を比較検討しているカップル</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>式や催しの幹事・企画担当者</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>法人の式典・懇親会の運営担当者</li>
                </ul>
                <h4>伝える内容</h4>
                <ul>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>会場の広さ・天井高・内装の印象</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>レイアウトや収容人数の違い</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>挙式・披露宴・催事など利用シーンの想定</li>
                </ul>
                <h4>素材として用意するもの</h4>
                <ul>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>会場・装花・外観の写真</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>レイアウト図・収容人数の情報</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>プラン内容・訴求したいポイントのテキスト</li>
                </ul>
                <p className="uc-note">ご提供いただいた写真と情報にもとづいて制作します。当日の進行や演出そのものを再現するものではありません。</p>
              </div>
            </button>
      
            <button className="uc" type="button">
              <div className="uc-th t4 photo">
                <span className="uc-ph shot">イメージ写真</span><img src="/uc-leisure.webp" alt="レジャー施設のイメージ" />
              </div>
              <div className="uc-b">
                <h3>アミューズメント・レジャー施設</h3>
                <p>施設の見どころや体験のイメージを伝える動画に。</p>
                <span className="uc-more">詳しく見る<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
              </div>
              <div className="uc-detail">
                <div className="tagline">INDUSTRY 04 — LEISURE</div>
                <h3>アミューズメント・レジャー施設</h3>
                <p className="lede">施設の見どころや体験のイメージを伝える動画を制作します。エリアごとの写真と案内情報をもとに、施設全体の構成を伝えられます。</p>
                <h4>想定する顧客</h4>
                <ul>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>週末や休暇の行き先を探している方</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>家族連れ・グループで訪問を検討している方</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>団体利用・社員旅行の手配担当者</li>
                </ul>
                <h4>伝える内容</h4>
                <ul>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>施設内のエリア構成と見どころ</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>アトラクションや設備の種類</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>季節やイベントごとの違い</li>
                </ul>
                <h4>素材として用意するもの</h4>
                <ul>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>施設内・外観の写真</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>施設マップ・エリアの一覧</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>利用案内・訴求したいポイントのテキスト</li>
                </ul>
                <p className="uc-note">ご提供いただいた写真と情報にもとづいて制作します。実際の体験そのものを再現するものではありません。</p>
              </div>
            </button>
      
                  <button className="uc" type="button">
              <div className="uc-th t6 photo">
                <span className="uc-ph shot">イメージ写真</span><img src="/uc-housing.webp" alt="住まいの内観のイメージ" />
              </div>
              <div className="uc-b">
                <h3>住宅・リフォーム</h3>
                <p>施工事例や住まいの特徴を伝える動画に。</p>
                <span className="uc-more">詳しく見る<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
              </div>
              <div className="uc-detail">
                <div className="tagline">INDUSTRY 05 — HOUSING &amp; RENOVATION</div>
                <h3>住宅・リフォーム</h3>
                <p className="lede">施工事例や住まいの特徴を伝える動画を制作します。これまでに撮りためた施工写真と、仕様の情報を起点にできます。</p>
                <h4>想定する顧客</h4>
                <ul>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>新築・建て替えを検討している方</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>リフォームの依頼先を比較している方</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>相談前に施工事例を見ておきたい方</li>
                </ul>
                <h4>伝える内容</h4>
                <ul>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>施工事例ごとの仕上がりと特徴</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>採用した設備・建材・間取りの工夫</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>手がけている住まいの傾向</li>
                </ul>
                <h4>素材として用意するもの</h4>
                <ul>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>施工写真（室内・外観）</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>間取り図・仕様の情報</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>工事内容・訴求したいポイントのテキスト</li>
                </ul>
                <p className="uc-note">ご提供いただいた写真と情報にもとづいて制作します。未施工の住まいの完成後の姿を示すものではありません。</p>
              </div>
            </button>
      
            <button className="uc" type="button">
              <div className="uc-th t7 photo">
                <span className="uc-ph shot">イメージ写真</span><img src="/uc-fitness.webp" alt="トレーニングエリアのイメージ" />
              </div>
              <div className="uc-b">
                <h3>フィットネス施設</h3>
                <p>設備や施設の雰囲気、サービス内容を伝える動画に。</p>
                <span className="uc-more">詳しく見る<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
              </div>
              <div className="uc-detail">
                <div className="tagline">INDUSTRY 06 — FITNESS</div>
                <h3>フィットネス施設</h3>
                <p className="lede">設備や施設の雰囲気、サービス内容を伝える動画を制作します。マシンエリアやスタジオの写真と、プログラムの情報を起点にできます。</p>
                <h4>想定する顧客</h4>
                <ul>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>入会先を比較検討している方</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>見学や体験の前に中の様子を知りたい方</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>福利厚生として法人契約を検討する担当者</li>
                </ul>
                <h4>伝える内容</h4>
                <ul>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>マシン・スタジオ・更衣室などの設備</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>館内の雰囲気や広さの印象</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>プログラムやサービスの内容</li>
                </ul>
                <h4>素材として用意するもの</h4>
                <ul>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>館内・設備の写真</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>設備一覧・フロア図</li>
                  <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>プログラム内容・訴求したいポイントのテキスト</li>
                </ul>
                <p className="uc-note">ご提供いただいた写真と情報にもとづいて制作します。実際のレッスン体験そのものを再現するものではありません。</p>
              </div>
            </button>
      
          </div>
      
          <p className="uc-foot">上記6業界は、VTaVisionが対象とする業界です。業界ごとの専用機能や運用体制が整っていることを示すものではありません。ご利用にあたっては、お持ちの素材とご要望をうかがったうえでご案内します。</p>
        </div>
      </section>
      
      <section className="sec">
        <div className="wrap">
          <div className="kicker">SPECIFICATIONS</div>
          <h2 className="h-sec">提供内容と確認中の項目</h2>
          <p className="sub-sec">現時点で確定している内容のみを記載しています。赤字の項目は確認中のため、お問い合わせ時に最新の状況をご案内します。</p>
          <div className="mt-32">
            <table className="tbl"><tbody>
              <tr><th>お預かりする素材</th><td>写真・画像／伝えたい情報のテキスト</td></tr>
              <tr><th>基本ユーザー数</th><td>Standard 3名／Premium 10名／Enterprise 30名<br /><span style={{fontSize: "12.5px", color: "var(--faint)"}}>超過分は1名につき月額 ¥3,000（税別）で追加できます</span></td></tr>
              <tr><th>月間Unit枠</th><td>Standard 15 Unit／Premium 40 Unit／Enterprise 100 Unit</td></tr>
              <tr><th>再生成</th><td>1回の生成につき2回まで（全プラン共通）</td></tr>
              <tr><th>通常生成に使用するモデル</th><td>fal ／ MiniMax H3 Max<br /><span style={{fontSize: "12.5px", color: "var(--faint)"}}>品質向上のため変更する場合があります</span></td></tr>
              <tr><th>HQ生成（高品質生成）</th><td>準備中（未提供）<br /><span style={{fontSize: "12.5px", color: "var(--faint)"}}>利用上限は Standard 月1回／Premium 月5回／Enterprise 月10回を予定。提供開始時期は<span className="ph">[確認中]</span></span></td></tr>
              <tr><th>1 Unitの定義</th><td><span className="ph">[確認中]</span></td></tr>
              <tr><th>出力仕様（形式・解像度・尺）</th><td><span className="ph">[確認中]</span></td></tr>
              <tr><th>納品までの期間</th><td><span className="ph">[確認中]</span></td></tr>
              <tr><th>商用利用の範囲</th><td><span className="ph">[確認中]</span></td></tr>
              <tr><th>入力データの取り扱い</th><td><span className="ph">[確認中]</span></td></tr>
            </tbody></table>
          </div>
          <p className="uc-foot">VTaVisionは、ご提供いただいた写真と情報にもとづいて動画を制作します。写真に写っていない設備・眺望・車両の状態・施工後の姿、および実際の体験を再現することを保証するものではありません。</p>
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
      
      
      {/* ===== 活用シーン：詳細モーダル ===== */}
      <div className="uc-back" id="ucBack"></div>
      <div className="uc-modal" id="ucModal" role="dialog" aria-modal="true" aria-labelledby="ucHeading" hidden>
        <div className="uc-modal-th" id="ucTh"></div>
        <div className="uc-body" id="ucBody"></div>
      </div>
    </div>
  );
}
