'use client';
import { useEffect } from 'react';

export default function HomeView() {
  useEffect(() => {
    const s = document.createElement('script');
    s.textContent = `(function(){
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var cv=document.getElementById('film'),cx=cv.getContext('2d');
var crop=document.getElementById('crop'),cc=crop?crop.getContext('2d'):null;
var DPR=Math.min(devicePixelRatio||1,2);

/* ===============================================================
   建物内のワンカット：カメラが廊下を前進していく
   p=0..1 でドリーイン。窓からの光・天井灯・床の反射が近づく。
   ※ お預かりする実写に差し替え予定のプレースホルダーです
   =============================================================== */
function lerp(a,b,t){return a+(b-a)*t}
function interior(g,w,h,p){
  var vx=w*0.53, vy=h*0.49;          /* 消失点 */
  var F=h*1.05;                       /* 焦点距離 */
  var dolly=p*11;                     /* 前進量 */
  var WALL=2.3, FLOOR=1.35, CEIL=1.55;
  function P(X,Y,Z){ return [vx+X*F/Z, vy+Y*F/Z]; }

  /* 地の色：奥が明るい室内 */
  var bg=g.createRadialGradient(vx,vy,0,vx,vy,Math.max(w,h)*0.85);
  bg.addColorStop(0,'#2C3E56'); bg.addColorStop(0.42,'#182637'); bg.addColorStop(1,'#0A1220');
  g.fillStyle=bg; g.fillRect(0,0,w,h);

  /* 奥の開口（明るい窓／突き当り） */
  var zEnd=26-dolly;
  if(zEnd>0.6){
    var a=P(-0.95,-0.95,zEnd),b=P(0.95,0.72,zEnd);
    var gw=b[0]-a[0], gh=b[1]-a[1];
    var og=g.createLinearGradient(a[0],a[1],a[0],a[1]+gh);
    og.addColorStop(0,'rgba(190,225,255,0.95)'); og.addColorStop(1,'rgba(120,175,230,0.75)');
    g.fillStyle=og; g.fillRect(a[0],a[1],gw,gh);
    var hl=g.createRadialGradient(vx,vy,0,vx,vy,Math.max(gw,gh)*3.4);
    hl.addColorStop(0,'rgba(150,200,245,0.32)'); hl.addColorStop(1,'rgba(150,200,245,0)');
    g.fillStyle=hl; g.fillRect(0,0,w,h);
  }

  /* 床・天井・壁の面 */
  function quad(pts,fill){ g.beginPath(); g.moveTo(pts[0][0],pts[0][1]);
    for(var i=1;i<pts.length;i++) g.lineTo(pts[i][0],pts[i][1]); g.closePath(); g.fillStyle=fill; g.fill(); }
  var zN=Math.max(0.62,0.62), zF=Math.max(0.8,zEnd>0.8?zEnd:0.8);
  quad([P(-WALL,FLOOR,zN),P(WALL,FLOOR,zN),P(WALL,FLOOR,zF),P(-WALL,FLOOR,zF)],'#141F2E');   /* 床 */
  quad([P(-WALL,-CEIL,zN),P(WALL,-CEIL,zN),P(WALL,-CEIL,zF),P(-WALL,-CEIL,zF)],'#101A27');   /* 天井 */
  quad([P(-WALL,-CEIL,zN),P(-WALL,FLOOR,zN),P(-WALL,FLOOR,zF),P(-WALL,-CEIL,zF)],'#1A2838'); /* 左壁 */
  quad([P(WALL,-CEIL,zN),P(WALL,FLOOR,zN),P(WALL,FLOOR,zF),P(WALL,-CEIL,zF)],'#16222F');     /* 右壁 */

  /* 左壁の窓＋床に落ちる光（奥→手前） */
  for(var i=8;i>=0;i--){
    var z0=i*3.1+2.2-dolly, z1=z0+1.75;
    if(z1<0.66) continue;
    z0=Math.max(z0,0.66);
    var wa=P(-WALL,-0.92,z1), wb=P(-WALL,0.30,z0);
    var lightG=g.createLinearGradient(wa[0],wa[1],wb[0],wb[1]);
    lightG.addColorStop(0,'rgba(205,232,255,0.92)'); lightG.addColorStop(1,'rgba(140,190,240,0.62)');
    quad([P(-WALL,-0.92,z1),P(-WALL,0.30,z1),P(-WALL,0.30,z0),P(-WALL,-0.92,z0)],lightG);

    /* 床の光だまり */
    var pool=g.createLinearGradient(P(-WALL,FLOOR,z0)[0],0,P(WALL*0.45,FLOOR,z0)[0],0);
    pool.addColorStop(0,'rgba(170,210,250,0.30)'); pool.addColorStop(1,'rgba(170,210,250,0)');
    quad([P(-WALL,FLOOR,z1),P(WALL*0.5,FLOOR,z1),P(WALL*0.62,FLOOR,z0),P(-WALL,FLOOR,z0)],pool);

    /* 光の柱（空気中の散乱） */
    g.globalAlpha=0.10;
    quad([P(-WALL,-0.92,z1),P(-WALL,-0.92,z0),P(WALL*0.15,FLOOR,z0),P(WALL*0.2,FLOOR,z1)],'#BEDCFA');
    g.globalAlpha=1;
  }

  /* 天井の照明ライン */
  for(var k=9;k>=0;k--){
    var cz=k*2.6+1.4-dolly; if(cz<0.7) continue;
    var la=P(-0.42,-CEIL+0.02,cz+0.9), lb=P(0.42,-CEIL+0.02,cz);
    quad([P(-0.42,-CEIL+0.02,cz+0.9),P(0.42,-CEIL+0.02,cz+0.9),P(0.42,-CEIL+0.02,cz),P(-0.42,-CEIL+0.02,cz)],'rgba(226,240,255,0.88)');
    var glow=g.createRadialGradient((la[0]+lb[0])/2,la[1],0,(la[0]+lb[0])/2,la[1],Math.abs(lb[0]-la[0])*2.2+8);
    glow.addColorStop(0,'rgba(190,220,255,0.22)'); glow.addColorStop(1,'rgba(190,220,255,0)');
    g.fillStyle=glow; g.fillRect(0,0,w,h);
  }

  /* 床の映り込み */
  g.save(); g.beginPath();
  var f1=P(-WALL,FLOOR,0.66),f2=P(WALL,FLOOR,0.66),f3=P(WALL,FLOOR,zF),f4=P(-WALL,FLOOR,zF);
  g.moveTo(f1[0],f1[1]); g.lineTo(f2[0],f2[1]); g.lineTo(f3[0],f3[1]); g.lineTo(f4[0],f4[1]); g.closePath(); g.clip();
  var rg=g.createLinearGradient(0,vy,0,h);
  rg.addColorStop(0,'rgba(160,200,245,0.20)'); rg.addColorStop(1,'rgba(160,200,245,0)');
  g.fillStyle=rg; g.fillRect(0,vy,w,h-vy); g.restore();

  /* 空気中の粒子 */
  for(var d=0;d<48;d++){
    var dz=((d*37)%100)/100*9+0.8-((dolly*0.6)%9);
    if(dz<0.7) dz+=9;
    var dp=P((((d*53)%100)/100-0.5)*3.6, (((d*97)%100)/100-0.5)*2.2, dz);
    g.globalAlpha=Math.min(0.5,0.9/dz);
    g.fillStyle='#CFE4FF';
    g.beginPath(); g.arc(dp[0],dp[1],Math.max(0.6,1.9/dz*1.4),0,7); g.fill();
  }
  g.globalAlpha=1;

  /* 周辺減光＋粒状感 */
  var vg=g.createRadialGradient(w/2,h/2,Math.min(w,h)*0.25,w/2,h/2,Math.max(w,h)*0.78);
  vg.addColorStop(0,'rgba(10,18,32,0)'); vg.addColorStop(1,'rgba(10,18,32,0.72)');
  g.fillStyle=vg; g.fillRect(0,0,w,h);
  g.globalAlpha=0.045;
  for(var n=0;n<(w*h)/6000;n++){ g.fillStyle=(n%2)?'#fff':'#000'; g.fillRect(Math.random()*w,Math.random()*h,1.4,1.4); }
  g.globalAlpha=1;
}

/* ===== 描画 ===== */
var fRect=null, progP=0, cropP=0.35;
function drawFilm(p){
  var r=cv.getBoundingClientRect(); if(r.width<2) return;
  if(!fRect||fRect.width!==r.width||fRect.height!==r.height){
    cv.width=r.width*DPR; cv.height=r.height*DPR; fRect=r;
  }
  cx.setTransform(DPR,0,0,DPR,0,0); interior(cx,r.width,r.height,p);
}
function drawCrop(p){
  if(!crop||!cc) return;
  var r=crop.getBoundingClientRect(); if(r.width<2) return;
  crop.width=r.width*DPR; crop.height=r.height*DPR;
  cc.setTransform(DPR,0,0,DPR,0,0); interior(cc,r.width,r.height,p);
}

/* ===== スクロール＝再生ヘッド ＋ 枠の拡大 ===== */
var stage=document.getElementById('stage'),frame=document.getElementById('frame');
var scrim=document.getElementById('scrim'),barT=document.getElementById('barT'),barB=document.getElementById('barB');
var live=document.getElementById('live'),hud=document.getElementById('hud'),prog=document.getElementById('prog');
var progBar=document.getElementById('progBar'),hudC=document.getElementById('hudC'),tcEl=document.getElementById('tc');
var railEl=document.getElementById('rail'),navEl=document.getElementById('nav');
var typed=document.getElementById('typed'),car=document.getElementById('car');
var caps=[document.getElementById('c1'),document.getElementById('c2'),document.getElementById('c3')];
var PROMPT='客室の写真12枚 ／ 設備一覧 ／ プラン内容のテキスト';
function pad(n){return String(n).padStart(2,'0')}

function onScroll(){
  var st=stage.getBoundingClientRect();
  var total=stage.offsetHeight-innerHeight;
  var p=Math.min(Math.max(-st.top/total,0),1);
  progP=p;

  /* 枠：contained → full bleed */
  var e=Math.min(p/0.15,1); e=1-Math.pow(1-e,3);
  var vw=innerWidth, vh=innerHeight;
  var w0=Math.min(1080,vw-80), h0=w0*9/16;
  frame.style.width=lerp(w0,vw,e)+'px';
  frame.style.height=lerp(Math.min(h0,vh-190),vh,e)+'px';
  frame.style.borderRadius=lerp(16,0,e)+'px';
  frame.style.boxShadow=e>0.95?'none':'0 40px 90px -40px rgba(13,27,46,.55)';

  drawFilm(p);

  var doc=document.documentElement;
  railEl.style.width=(doc.scrollTop/(doc.scrollHeight-innerHeight)*100)+'%';
  navEl.classList.toggle('solid',doc.scrollTop>40);

  var f=Math.round(p*8*24);
  tcEl.textContent='00:00:'+pad(Math.floor(f/24))+':'+pad(f%24);

  var open=p>0.17;
  scrim.classList.toggle('on',open);
  barT.style.height=open?'6vh':'0'; barB.style.height=open?'6vh':'0';
  live.style.opacity=open?'0':'1';
  hud.classList.toggle('on',open);

  var idx=p<0.17?-1:(p<0.45?0:(p<0.72?1:2));
  caps.forEach(function(el,i){el.classList.toggle('on',i===idx)});

  if(idx===0){
    var t=Math.min(Math.max((p-0.17)/0.20,0),1);
    typed.textContent=PROMPT.slice(0,Math.round(t*PROMPT.length)); car.style.display='inline';
  }else if(idx>0){ typed.textContent=PROMPT; car.style.display='none'; }
  else { typed.textContent=''; car.style.display='inline'; }

  if(idx===1){ prog.classList.add('on'); progBar.style.width=(Math.min(Math.max((p-0.45)/0.26,0),1)*100)+'%'; }
  else if(idx>1){ prog.classList.add('on'); progBar.style.width='100%'; }
  else { prog.classList.remove('on'); progBar.style.width='0%'; }

  hudC.textContent = '差し替え予定';
}

/* ===== 縦横比モーフ ===== */
var morph=document.getElementById('morph'),mtag=document.getElementById('mtag');
var ratioSec=document.getElementById('ratio');
var rlist=ratioSec?document.getElementById('rlist').children:[];
var SIZES=[[530,298,'16:9'],[336,336,'1:1'],[252,448,'9:16']];
var lastR=-1;
function onRatio(){
  if(!ratioSec||!morph) return;
  var r=ratioSec.getBoundingClientRect();
  var t=Math.min(Math.max((innerHeight*0.85-r.top)/(r.height*0.75),0),0.999);
  var i=Math.floor(t*3);
  if(i!==lastR){
    lastR=i; var s=SIZES[i];
    morph.style.width=s[0]+'px'; morph.style.height=s[1]+'px'; mtag.textContent=s[2];
    for(var k=0;k<rlist.length;k++) rlist[k].classList.toggle('hot',k===i);
    setTimeout(function(){drawCrop(cropP)},400);
  }
  cropP=0.20+t*0.55; drawCrop(cropP);
}

/* ===== リビール ===== */
var say=document.getElementById('say'),rows=document.querySelectorAll('[data-row]');
if('IntersectionObserver' in window && !reduce){
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('on'); io.unobserve(e.target);} });
  },{threshold:0.3});
  io.observe(say); rows.forEach(function(r){io.observe(r)});
}else{ say.classList.add('on'); rows.forEach(function(r){r.classList.add('on')}); }

/* ===== 起動 ===== */
var tick=false;
function loop(){ if(!tick){tick=true;requestAnimationFrame(function(){onScroll();onRatio();tick=false});} }
addEventListener('scroll',loop,{passive:true});
addEventListener('resize',function(){fRect=null;onScroll();onRatio()});
if(morph){var s0=SIZES[0]; morph.style.width=s0[0]+'px'; morph.style.height=s0[1]+'px';}
onScroll(); onRatio();
if(!reduce){ var dr=0; setInterval(function(){ dr+=0.02; drawFilm(Math.min(progP+Math.sin(dr)*0.003,1)); },110); }
})();`;
    document.body.appendChild(s);
    return () => { s.remove(); };
  }, []);

  return (
    <div className="v-home">
      <div className="rail"><i id="rail"></i></div>
      
      <header className="nav" id="nav">
        <a href="/"><img className="logo" src="/logo.webp" alt="VTaVision by VTaBridge" /></a>
        <div className="nav-r">
          <a className="lnk" href="#caps">できること</a>
          <a className="lnk" href="#price">料金</a>
          <a className="lnk" href="#faq">よくある質問</a>
          <a className="lnk" href="/company">会社概要</a>
          <a className="nav-cta" href="/contact">お問い合わせ</a>
        </div>
      </header>
      
      {/* ============ イントロ（ホワイト） ============ */}
      <div className="hero-wrap">
        <div className="hero-bg" aria-hidden="true">
          <div className="col"><img src="/uc-hotel.webp" alt="" /><img src="/uc-wedding.webp" alt="" /></div>
          <div className="col"><img src="/uc-leisure.webp" alt="" /><img src="/uc-housing.webp" alt="" /></div>
          <div className="col"><img src="/uc-fitness.webp" alt="" /></div>
        </div>
      <section className="intro">
        <div className="eyebrow">VIDEO PRODUCTION SUPPORT AI</div>
        <h1 className="big">写真から、<br /><em>魅力が伝わる動画へ。</em></h1>
        <p className="lead">VTaVisionは、写真や伝えたい情報をもとに、商品・施設・空間の魅力を伝える動画制作を支援するAIサービスです。</p>
        <div className="acts">
          <a className="b1" href="/contact">お問い合わせ</a>
          <a className="b2" href="#industries">活用が想定される業界を見る</a>
        </div>
        <div className="meta">
          <span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>お持ちの写真を素材に</span>
          <span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>伝えたい情報をあわせて反映</span>
          <span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 13l4 4L19 7" /></svg>6業界での活用を想定</span>
        </div>
      </section>
      </div>
      
      {/* ============ 映像ステージ ============ */}
      <section className="stage" id="stage">
        <div className="pin">
          <div className="frame" id="frame">
            <canvas id="film"></canvas>
            <div className="scrim" id="scrim"></div>
            <div className="bars t" id="barT"></div>
            <div className="bars b" id="barB"></div>
            <div className="badge-live" id="live"><i></i>イメージ映像（実際の制作物ではありません）</div>
      
            <div className="caps-layer">
              <div className="caps-inner">
                <div className="cap" id="c1">
                  <div className="n">01 — 素材を預ける</div>
                  <h2>お持ちの写真と、伝えたい情報。</h2>
                  <p className="pr">&gt; <span id="typed"></span><span id="car">▋</span></p>
                  <p>新たな撮影は前提としません。掲載用に用意されている写真と、伝えたい内容のテキストをお預かりします。</p>
                </div>
                <div className="cap" id="c2">
                  <div className="n">02 — 動画にする</div>
                  <h2>魅力が伝わる形に、組み立てる。</h2>
                  <p>お預かりした素材をもとに動画を制作します。1回の生成につき2回まで再生成できます。</p>
                </div>
                <div className="cap" id="c3">
                  <div className="n">03 — 顧客に伝える</div>
                  <h2>検討している人へ、届ける。</h2>
                  <p>物件を探している方、宿泊先を選んでいる方、入会を検討している方へ。写真だけでは伝わりにくい魅力を動画で補います。</p>
                </div>
              </div>
            </div>
      
            <div className="prog" id="prog"><i id="progBar"></i></div>
            <div className="hud" id="hud">
              <span className="chip a" id="hudA">● イメージ映像</span>
              <span className="chip" id="hudC">差し替え予定</span>
            </div>
            <div className="tcbox">TC <b id="tc">00:00:00:00</b></div>
          </div>
        </div>
      </section>
      
      {/* ============ 一文 ============ */}
      <section className="say" id="say">
        <div className="eyebrow">ABOUT</div>
        <h2>
          <span className="ln"><span>写真にある魅力を、</span></span>
          <span className="ln"><span><em>動画でも伝える。</em></span></span>
        </h2>
        <p>物件の特徴、施設の雰囲気、商品の魅力。VTaVisionは、企業が持つ写真や情報を活用し、顧客に伝えるための動画制作を支援します。</p>
      </section>
      
      {/* ============ できること ============ */}
      <section className="caps" id="caps">
        <div className="caps-in">
          <div className="caps-h">
            <h2>VTaVisionが、支援すること。</h2>
            <a href="/features">提供内容の詳細 →</a>
          </div>
          <div className="row" data-row><div className="idx">01</div><h3>お持ちの写真を、素材にする</h3><p>商品・施設・空間の写真を素材として活用します。掲載用にすでに用意されている写真をそのままお預かりできます。</p><span className="u"></span></div>
          <div className="row" data-row><div className="idx">02</div><h3>伝えたい情報を、あわせて反映する</h3><p>物件概要・設備一覧・仕様情報など、写真だけでは伝わらない内容をテキストでお預かりし、動画に反映します。</p><span className="u"></span></div>
          <div className="row" data-row><div className="idx">03</div><h3>内容に応じて、作り直す</h3><p>1回の生成につき2回まで再生成できます（全プラン共通）。伝えたい内容に合わせて調整します。</p><span className="u"></span></div>
        </div>
      </section>
      
      {/* ============ 活用が想定される業界 ============ */}
      <section className="ratio" id="industries">
        <div className="ratio-in" style={{gridTemplateColumns: "1fr", gap: "34px"}}>
          <div>
            <div className="eyebrow">INDUSTRIES</div>
            <h2>活用が想定される、6つの業界。</h2>
            <p className="lead">写真で魅力を伝える機会の多い業界を対象としています。特定の業界に限定したサービスではありません。</p>
          </div>
          <div className="ind-grid">
            <a className="ind" href="/features"><b>不動産</b><span>物件の写真や特徴をもとに、住まいを検討する人へ魅力を伝える動画に。</span></a>
            <a className="ind" href="/features"><b>ホテル・旅館・グランピング</b><span>客室や施設の写真から、滞在の雰囲気を伝える紹介動画に。</span></a>
            <a className="ind" href="/features"><b>結婚式場・イベント会場</b><span>会場の空間や利用シーンを、検討中のお客様に伝える動画に。</span></a>
            <a className="ind" href="/features"><b>アミューズメント・レジャー施設</b><span>施設の見どころや体験のイメージを伝える動画に。</span></a>
            <a className="ind" href="/features"><b>住宅・リフォーム</b><span>施工事例や住まいの特徴を伝える動画に。</span></a>
            <a className="ind" href="/features"><b>フィットネス施設</b><span>設備や施設の雰囲気、サービス内容を伝える動画に。</span></a>
          </div>
          <p className="ind-note">上記は対象として想定している業界です。業界ごとの専用機能や運用体制が整っていることを示すものではありません。</p>
        </div>
      </section>
      
      {/* ============ 料金 ============ */}
      <section className="price" id="price">
        <div className="price-in">
          <div className="eyebrow">PRICING</div>
          <h2>料金プラン</h2>
          <p className="note-top">ご利用人数と月間のUnit枠に応じて3プランをご用意しています。表示価格はすべて税別です。確認中の項目は、お問い合わせ時に最新の状況をご案内します。</p>
          <div className="plans">
            <div className="plan">
              <div className="pn">STANDARD</div><h3>少人数ではじめる</h3>
              <div className="amt">¥49,800<s>/月</s></div>
              <div className="spec">
                <div>基本ユーザー数<b>3名</b></div><div>月間Unit枠<b>15 Unit</b></div>
                <div>HQ利用上限<b>1回/月</b></div><div>再生成<b>2回</b></div>
              </div>
              <a className="go" href="/contact">このプランについて問い合わせる</a>
            </div>
            <div className="plan rec">
              <div className="pn">PREMIUM — おすすめ</div><h3>継続的に量産する</h3>
              <div className="amt">¥119,800<s>/月</s></div>
              <div className="spec">
                <div>基本ユーザー数<b>10名</b></div><div>月間Unit枠<b>40 Unit</b></div>
                <div>HQ利用上限<b>5回/月</b></div><div>再生成<b>2回</b></div>
              </div>
              <a className="go" href="/contact">このプランについて問い合わせる</a>
            </div>
            <div className="plan">
              <div className="pn">ENTERPRISE</div><h3>全社で展開する</h3>
              <div className="amt">¥298,000<s>/月</s></div>
              <div className="spec">
                <div>基本ユーザー数<b>30名</b></div><div>月間Unit枠<b>100 Unit</b></div>
                <div>HQ利用上限<b>10回/月</b></div><div>再生成<b>2回</b></div>
              </div>
              <a className="go" href="/contact">このプランについて問い合わせる</a>
            </div>
          </div>
          <ul className="pnotes">
            <li>追加ユーザーは1名につき月額 ¥3,000（税別）／全プラン共通。</li>
            <li>通常生成には fal / MiniMax H3 Max を使用します。品質向上のため変更する場合があります。</li>
            <li>HQ生成（高品質生成）は準備中で、現時点ではご利用いただけません。提供開始時期は<span className="ph">[確認中]</span>です。</li>
            <li>1 Unitでつくれる動画の本数・長さ：<span className="ph">[確認中]</span></li>
            <li>出力仕様（形式・解像度・尺）、納品までの期間：<span className="ph">[確認中]</span></li>
            <li>商用利用の範囲、入力データの取り扱い：<span className="ph">[確認中]</span></li>
            <li>最低利用期間・お支払い方法：<span className="ph">[確認中]</span></li>
            <li>生成に使用するモデルは、品質向上のため変更する場合があります。変更の際は事前にご案内します。</li>
          </ul>
        </div>
      </section>
      
      {/* ============ FAQ ============ */}
      <section className="faq" id="faq">
        <div className="faq-in">
          <div className="eyebrow">FAQ</div>
          <h2>よくあるご質問</h2>
          <details open><summary>どのような素材を用意すればよいですか？</summary><p>商品・施設・空間の写真と、伝えたい内容のテキスト（物件概要、設備一覧、仕様情報など）をご用意ください。新たな撮影は前提としていません。必要な素材は、ご相談時に用途に応じてご案内します。</p></details>
            <details><summary>対応している業界はどこですか？</summary><p>不動産、ホテル・旅館・グランピング、結婚式場・イベント会場、アミューズメント・レジャー施設、住宅・リフォーム、フィットネス施設の6業界での活用を想定しています。これらは対象として想定している業界であり、業界ごとの専用機能が整っていることを示すものではありません。</p></details>
            <details><summary>写真に写っていないものも動画にできますか？</summary><p>VTaVisionは、ご提供いただいた写真と情報にもとづいて制作します。写真に写っていない設備・眺望・車両の状態・施工後の姿、および実際の体験を再現することを保証するものではありません。表現の可否は個別にご相談ください。</p></details>
            <details><summary>1 Unitで、どれくらいの動画がつくれますか？</summary><p><span className="ph">[確認中]</span>。月間Unit枠はStandardが15 Unit、Premiumが40 Unit、Enterpriseが100 Unitです。</p></details>
            <details><summary>HQ生成とは何ですか？いま使えますか？</summary><p>通常生成より高品質な出力を行うモードとして準備を進めていますが、<strong>現時点ではご利用いただけません</strong>。提供開始時期と、通常生成との具体的な違いは<span className="ph">[確認中]</span>です。</p></details>
            <details><summary>思った内容にならなかった場合は作り直せますか？</summary><p>1回の生成につき2回まで再生成できます（全プラン共通）。</p></details>
            <details><summary>プランの人数を超える場合は？</summary><p>1名につき月額¥3,000（税別）で追加いただけます。全プラン共通です。</p></details>
            <details><summary>出力形式や納品までの期間を知りたいのですが。</summary><p>出力仕様（形式・解像度・尺）と納品までの期間は<span className="ph">[確認中]</span>です。確定した内容をご案内できる段階になりましたら、お問い合わせいただいた方へ順次ご連絡します。</p></details>
            <details><summary>商用利用やデータの取り扱いについて教えてください。</summary><p>商用利用の範囲、入力データの取り扱い、著作権の扱いは<span className="ph">[確認中]</span>です。現時点で確定した条件をお示しできないため、お問い合わせいただいた際に最新の状況をご案内します。</p></details></div>
      </section>
      
      {/* ============ CTA ============ */}
      <section className="end">
        <h2>導入のご相談を承っています。</h2>
        <p>お持ちの素材とご要望をうかがったうえで、ご提供できる内容をご案内します。2営業日以内にご返信します。</p>
        <div className="acts"><a className="b1" href="/contact">お問い合わせ</a></div>
      </section>
      
      <footer>
        <div className="f-in">
          <div>
            <img className="logo" src="/logo.webp" alt="VTaVision by VTaBridge" />
            <p style={{marginTop: "14px", maxWidth: "280px", color: "var(--dim)", fontSize: "13px", lineHeight: "2"}}>動画制作支援AIサービス「VTaVision」は、VTaBridgeが開発・運営しています。</p>
          </div>
          <div className="cols">
            <div><h4>SERVICE</h4><a href="#caps">できること</a><a href="/features">機能詳細</a><a href="#price">料金</a><a href="#faq">よくある質問</a></div>
            <div><h4>COMPANY</h4><a href="/about">VTaVisionについて</a><a href="/company">会社概要</a><a href="/contact">お問い合わせ</a></div>
          </div>
        </div>
        <div className="f-bot">
          <span>© 2026 VTaBridge. All rights reserved.</span>
          <div className="lg"><a href="/policies/privacy">プライバシーポリシー</a><a href="/policies/information-security">情報セキュリティ基本方針</a><a href="/policies/anti-social-forces">反社会的勢力排除方針</a></div>
        </div>
      </footer>
    </div>
  );
}
