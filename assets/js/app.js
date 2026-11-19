(()=>{
"use strict";

const $=id=>document.getElementById(id);
const $$=s=>document.querySelectorAll(s);

const cv=$("cv"), rcx=$("rcv");
if(!cv||!rcx){console.error("Canvas topilmadi");return;}
const cx=cv.getContext("2d"), rx=rcx.getContext("2d");

const S={
  mode:"tavsiya",
  playing:true,
  t0:performance.now(),
  raf:0,
  data:{},
  particles:[],
  seed:2026
};

const ACCENT={
  tavsiya:"#b69cff",
  fakt:"#ff8c70",
  ibora:"#e7c98a",
  manba:"#65d9ff"
};

const MODES={
  tavsiya:{
    name:"Tavsiya akkaunt",
    tag:"TAVSIYA",
    fields:[
      {id:"handle",l:"Akkaunt (@username)",p:"@foydali_akkaunt"},
      {id:"role",l:"Qisqa tavsif",p:"Texnologiya · Dizayn"},
      {id:"hook",l:"Hook matni",p:"Bu akkauntni ko‘rishga arziydi",ta:1},
      {id:"why",l:"Nima uchun tavsiya?",p:"Har kuni foydali va sifatli kontent",ta:1},
      {id:"cta",l:"Chorlov",p:"Obuna bo‘ling"}
    ]
  },
  fakt:{
    name:"Qiziqarli fakt",
    tag:"FAKT",
    fields:[
      {id:"num",l:"Yorliq",p:"FAKT 07"},
      {id:"title",l:"Asosiy fakt",p:"Odam miyasi kuniga taxminan 70 000 ta fikr ishlab chiqaradi",ta:1},
      {id:"detail",l:"Qisqa izoh",p:"Ko‘pchiligi takroriy va avtomatik bo‘ladi",ta:1}
    ]
  },
  ibora:{
    name:"Kun iborasi",
    tag:"IBORA",
    fields:[
      {id:"quote",l:"Ibora / sitata",p:"Kichik qadamlar katta o‘zgarishlarni yaratadi.",ta:1},
      {id:"author",l:"Muallif",p:"Noma’lum"}
    ]
  },
  manba:{
    name:"Foydali manba",
    tag:"MANBA",
    fields:[
      {id:"name",l:"Manba nomi",p:"YouTube kanal / Telegram / kitob"},
      {id:"type",l:"Turi",p:"YouTube"},
      {id:"why",l:"Nima uchun foydali?",p:"Amaliy darslar, qisqa va tushunarli",ta:1},
      {id:"pts",l:"3 ta nuqta (har qatorda)",p:"Bepul kontent\nAmaliy misollar\nMuntazam yangilanadi",ta:1}
    ]
  }
};

/* ---------- UI ---------- */
function show(id){$$(".scr").forEach(s=>s.classList.toggle("on",s.id===id));}

$$(".mcard").forEach(b=>b.onclick=()=>openMode(b.dataset.mode));
$("back").onclick=()=>{stop();show("home");};

function openMode(key){
  S.mode=key;
  const m=MODES[key];
  $("modeName").textContent=m.name;
  $("modeTag").textContent=m.tag;
  document.documentElement.style.setProperty("--accent",ACCENT[key]);

  const col=$("formCol");
  col.innerHTML="";
  m.fields.forEach(f=>{
    const lab=document.createElement("label");
    lab.textContent=f.l;
    const inp=document.createElement(f.ta?"textarea":"input");
    if(!f.ta)inp.type="text"; else inp.rows=3;
    inp.id="f_"+f.id;
    inp.placeholder=f.p||"";
    inp.oninput=collect;
    lab.appendChild(inp);
    col.appendChild(lab);
  });

  const btn=document.createElement("button");
  btn.className="btn primary";
  btn.textContent="Yangilash";
  btn.style.marginTop="4px";
  btn.onclick=collect;
  col.appendChild(btn);

  show("editor");
  collect();
  initParts();
  S.t0=performance.now();
  S.playing=true;
  updateBtns();
  startLoop();
}

function collect(){
  const m=MODES[S.mode];
  const d={};
  m.fields.forEach(f=>{
    const el=$("f_"+f.id);
    d[f.id]=el?el.value.trim():"";
  });
  S.data=d;
}

/* ---------- Particles ---------- */
function initParts(){
  S.particles=Array.from({length:55},()=>({
    x:Math.random(), y:Math.random(),
    r:1+Math.random()*3,
    v:.1+Math.random()*.5,
    a:Math.random()*6.28,
    s:.5+Math.random()
  }));
}

/* ---------- Helpers ---------- */
function rr(ctx,x,y,w,h,r){
  const R=Math.min(r,w/2,h/2);
  ctx.beginPath();
  ctx.moveTo(x+R,y);
  ctx.arcTo(x+w,y,x+w,y+h,R);
  ctx.arcTo(x+w,y+h,x,y+h,R);
  ctx.arcTo(x,y+h,x,y,R);
  ctx.arcTo(x,y,x+w,y,R);
  ctx.closePath();
}
function wrap(ctx,text,max){
  const words=String(text||"").split(/\s+/);
  const lines=[]; let line="";
  for(const w of words){
    const t=line?line+" "+w:w;
    if(line&&ctx.measureText(t).width>max){lines.push(line);line=w;}
    else line=t;
  }
  if(line)lines.push(line);
  return lines;
}
function ease(t){t=Math.min(1,Math.max(0,t));return 1-Math.pow(1-t,3);}

/* ---------- Draw engine ---------- */
function drawFrame(ctx,W,H,t){
  const d=S.data||{};
  const mode=S.mode;
  const ac=ACCENT[mode];
  const sec=Math.max(0,t/1000);
  const p=ease((sec%3.6)/1.2);

  // bg
  ctx.fillStyle="#05060f";
  ctx.fillRect(0,0,W,H);

  if(mode==="tavsiya"){
    const g=ctx.createRadialGradient(W*.5,H*.18,0,W*.5,H*.3,W);
    g.addColorStop(0,"#2a1850"); g.addColorStop(1,"#05060f");
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  } else if(mode==="fakt"){
    const g=ctx.createRadialGradient(W*.7,H*.2,0,W*.5,H*.5,W);
    g.addColorStop(0,"#3a1810"); g.addColorStop(1,"#05060f");
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  } else if(mode==="ibora"){
    const g=ctx.createLinearGradient(0,0,W,H);
    g.addColorStop(0,"#12182a"); g.addColorStop(1,"#05060f");
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  } else {
    const g=ctx.createRadialGradient(W*.25,H*.15,0,W*.5,H*.5,W);
    g.addColorStop(0,"#0c2835"); g.addColorStop(1,"#05060f");
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  }

  // particles
  S.particles.forEach(pt=>{
    const x=pt.x*W+Math.sin(sec*pt.v+pt.a)*16;
    const y=((pt.y+sec*pt.v*.03)%1.3)*H-H*.1;
    ctx.globalAlpha=.18+.4*Math.abs(Math.sin(sec*pt.s+pt.a));
    ctx.fillStyle=ac;
    ctx.beginPath();
    ctx.arc(x,y,pt.r*(W/360),0,6.28);
    ctx.fill();
  });
  ctx.globalAlpha=1;

  // soft glow orb
  ctx.save();
  ctx.globalAlpha=.12;
  const ox=W*(.7+Math.sin(sec*.7)*.08), oy=H*(.35+Math.cos(sec*.5)*.06);
  const orb=ctx.createRadialGradient(ox,oy,0,ox,oy,W*.45);
  orb.addColorStop(0,ac); orb.addColorStop(1,"transparent");
  ctx.fillStyle=orb;
  ctx.fillRect(0,0,W,H);
  ctx.restore();

  if(mode==="tavsiya") drawTavsiya(ctx,W,H,d,ac,p,sec);
  else if(mode==="fakt") drawFakt(ctx,W,H,d,ac,p,sec);
  else if(mode==="ibora") drawIbora(ctx,W,H,d,ac,p,sec);
  else drawManba(ctx,W,H,d,ac,p,sec);
}

function drawTavsiya(ctx,W,H,d,ac,p,sec){
  const handle=d.handle||"@akkaunt";
  const letter=(handle.replace(/^@/,"")[0]||"N").toUpperCase();

  // card
  const cy=H*.18;
  ctx.save();
  ctx.globalAlpha=p;
  ctx.translate((1-p)*60,0);
  ctx.fillStyle="rgba(255,255,255,.07)";
  ctx.strokeStyle=ac;
  ctx.lineWidth=2.5;
  rr(ctx,W*.07,cy,W*.86,H*.13,20);
  ctx.fill(); ctx.stroke();

  // avatar + ring
  const ax=W*.18, ay=cy+H*.065, ar=W*.06;
  ctx.save();
  ctx.translate(ax,ay);
  ctx.rotate(sec*1.2);
  ctx.strokeStyle=ac;
  ctx.globalAlpha=.5*p;
  ctx.lineWidth=2;
  ctx.setLineDash([5,7]);
  ctx.beginPath(); ctx.arc(0,0,ar+8,0,6.28); ctx.stroke();
  ctx.restore();

  const gr=ctx.createLinearGradient(ax-ar,ay-ar,ax+ar,ay+ar);
  gr.addColorStop(0,ac); gr.addColorStop(1,"#ff2bd6");
  ctx.fillStyle=gr;
  ctx.beginPath(); ctx.arc(ax,ay,ar,0,6.28); ctx.fill();
  ctx.fillStyle="#0a0c18";
  ctx.font=`bold ${Math.floor(W*.055)}px system-ui`;
  ctx.textAlign="center"; ctx.textBaseline="middle";
  ctx.fillText(letter,ax,ay+1);

  ctx.fillStyle="#fff";
  ctx.font=`bold ${Math.floor(W*.042)}px system-ui`;
  ctx.textAlign="left";
  ctx.fillText(handle.slice(0,18),W*.28,cy+H*.045);
  ctx.fillStyle="#9aa6b8";
  ctx.font=`${Math.floor(W*.028)}px system-ui`;
  ctx.fillText((d.role||"Tavsiya etiladi").slice(0,24),W*.28,cy+H*.085);
  ctx.restore();

  // orbit decoration
  ctx.save();
  ctx.translate(W*.82,H*.38);
  ctx.rotate(sec*.8);
  ctx.strokeStyle=ac;
  ctx.globalAlpha=.35*p;
  ctx.lineWidth=2;
  ctx.setLineDash([8,10]);
  ctx.beginPath(); ctx.arc(0,0,W*.1,0,6.28); ctx.stroke();
  ctx.beginPath(); ctx.arc(0,0,W*.06,0,6.28); ctx.stroke();
  ctx.restore();

  // texts
  ctx.textAlign="center";
  ctx.fillStyle=ac;
  ctx.globalAlpha=p;
  ctx.font=`bold ${Math.floor(W*.028)}px system-ui`;
  ctx.fillText("TAVSIYA",W/2,H*.4);

  ctx.fillStyle="#fff";
  ctx.font=`bold ${Math.floor(W*.062)}px system-ui`;
  const lines=wrap(ctx,d.hook||"Bu akkauntni ko‘rishga arziydi",W*.82);
  lines.slice(0,3).forEach((ln,i)=>{
    ctx.globalAlpha=ease(p-i*.1);
    ctx.fillText(ln,W/2,H*.48+i*W*.078);
  });

  ctx.globalAlpha=p*.9;
  ctx.fillStyle="#c4cedb";
  ctx.font=`${Math.floor(W*.032)}px system-ui`;
  const body=wrap(ctx,d.why||"Foydali kontent va sifatli yondashuv.",W*.8);
  body.slice(0,3).forEach((ln,i)=>ctx.fillText(ln,W/2,H*.68+i*W*.045));

  // CTA
  ctx.globalAlpha=p;
  const cta=d.cta||"Obuna bo‘ling";
  ctx.font=`bold ${Math.floor(W*.032)}px system-ui`;
  const tw=ctx.measureText(cta).width+W*.12;
  const gr2=ctx.createLinearGradient((W-tw)/2,0,(W+tw)/2,0);
  gr2.addColorStop(0,ac); gr2.addColorStop(1,"#ff2bd6");
  ctx.fillStyle=gr2;
  rr(ctx,(W-tw)/2,H*.84,tw,H*.052,99);
  ctx.fill();
  ctx.fillStyle="#05060f";
  ctx.textBaseline="middle";
  ctx.fillText(cta,W/2,H*.866);
  ctx.globalAlpha=1;
}

function drawFakt(ctx,W,H,d,ac,p,sec){
  // stamp
  ctx.save();
  ctx.translate(W/2,H*.24);
  ctx.rotate((1-p)*-.4 + Math.sin(sec*2)*.03);
  const sc=.5+.5*p;
  ctx.scale(sc,sc);
  ctx.strokeStyle=ac;
  ctx.lineWidth=5;
  ctx.setLineDash([14,10]);
  ctx.beginPath(); ctx.arc(0,0,W*.13,0,6.28); ctx.stroke();
  ctx.setLineDash([]);
  ctx.lineWidth=3;
  ctx.beginPath(); ctx.arc(0,0,W*.1,0,6.28); ctx.stroke();
  ctx.fillStyle=ac;
  ctx.font=`bold ${Math.floor(W*.036)}px system-ui`;
  ctx.textAlign="center"; ctx.textBaseline="middle";
  ctx.fillText((d.num||"FAKT").slice(0,10),0,0);
  ctx.restore();

  ctx.textAlign="center";
  ctx.fillStyle="#fff";
  ctx.font=`bold ${Math.floor(W*.058)}px system-ui`;
  const lines=wrap(ctx,d.title||"Qiziqarli fakt shu yerda",W*.84);
  lines.slice(0,4).forEach((ln,i)=>{
    ctx.globalAlpha=ease(p-.05-i*.08);
    ctx.fillText(ln,W/2,H*.44+i*W*.072);
  });

  ctx.globalAlpha=p*.85;
  ctx.fillStyle="#c4cedb";
  ctx.font=`${Math.floor(W*.032)}px system-ui`;
  const det=wrap(ctx,d.detail||"",W*.8);
  det.slice(0,3).forEach((ln,i)=>ctx.fillText(ln,W/2,H*.72+i*W*.045));
  ctx.globalAlpha=1;
}

function drawIbora(ctx,W,H,d,ac,p,sec){
  // giant quote
  ctx.globalAlpha=.16*p;
  ctx.fillStyle=ac;
  ctx.font=`bold ${Math.floor(W*.28)}px Georgia,serif`;
  ctx.textAlign="center";
  ctx.fillText("\u201C",W/2,H*.28);
  ctx.globalAlpha=1;

  ctx.fillStyle="#fff";
  ctx.font=`bold ${Math.floor(W*.052)}px Georgia,serif`;
  const lines=wrap(ctx,d.quote||"Kichik qadamlar katta o‘zgarishlarni yaratadi.",W*.82);
  lines.slice(0,5).forEach((ln,i)=>{
    ctx.globalAlpha=ease(p-i*.09);
    // slight float
    const fy=Math.sin(sec*1.5+i)*.6*(W/360);
    ctx.fillText(ln,W/2,H*.38+i*W*.068+fy);
  });

  ctx.globalAlpha=p;
  ctx.fillStyle=ac;
  ctx.font=`${Math.floor(W*.03)}px system-ui`;
  ctx.fillText("— "+(d.author||"Noma’lum"),W/2,H*.78);

  ctx.strokeStyle=ac;
  ctx.globalAlpha=.4*p;
  ctx.lineWidth=2;
  ctx.beginPath();
  ctx.moveTo(W*.3,H*.83); ctx.lineTo(W*.7,H*.83);
  ctx.stroke();
  ctx.globalAlpha=1;
}

function drawManba(ctx,W,H,d,ac,p,sec){
  ctx.textAlign="center";
  ctx.fillStyle=ac;
  ctx.globalAlpha=p;
  ctx.font=`bold ${Math.floor(W*.026)}px system-ui`;
  ctx.fillText((d.type||"MANBA").toUpperCase(),W/2,H*.16);

  ctx.fillStyle="#fff";
  ctx.font=`bold ${Math.floor(W*.056)}px system-ui`;
  const titles=wrap(ctx,d.name||"Foydali manba",W*.84);
  titles.slice(0,2).forEach((ln,i)=>{
    ctx.globalAlpha=ease(p-i*.1);
    ctx.fillText(ln,W/2,H*.24+i*W*.068);
  });

  ctx.globalAlpha=p*.85;
  ctx.fillStyle="#c4cedb";
  ctx.font=`${Math.floor(W*.03)}px system-ui`;
  const why=wrap(ctx,d.why||"",W*.8);
  why.slice(0,2).forEach((ln,i)=>ctx.fillText(ln,W/2,H*.38+i*W*.042));

  const pts=(d.pts||"").split(/\n+/).map(x=>x.trim()).filter(Boolean).slice(0,3);
  const list=pts.length?pts:["Amaliy qiymat","Qulay format","Tavsiya etiladi"];

  list.forEach((item,i)=>{
    const q=ease(p-.1-i*.12);
    const y=H*.5+i*H*.1;
    ctx.globalAlpha=q;
    ctx.fillStyle="rgba(101,217,255,.1)";
    ctx.strokeStyle=ac;
    ctx.lineWidth=1.5;
    rr(ctx,W*.08,y,W*.84,H*.08,14);
    ctx.fill(); ctx.stroke();

    // number circle
    ctx.fillStyle=ac;
    ctx.beginPath(); ctx.arc(W*.17,y+H*.04,W*.03,0,6.28); ctx.fill();
    ctx.fillStyle="#05060f";
    ctx.font=`bold ${Math.floor(W*.028)}px system-ui`;
    ctx.textAlign="center"; ctx.textBaseline="middle";
    ctx.fillText(String(i+1),W*.17,y+H*.04);

    ctx.fillStyle="#f0f7ff";
    ctx.font=`bold ${Math.floor(W*.032)}px system-ui`;
    ctx.textAlign="left";
    ctx.fillText(item.slice(0,26),W*.25,y+H*.04);
  });
  ctx.globalAlpha=1;
}

/* ---------- Loop ---------- */
function ensure(c,ctx,w,h){
  const dpr=Math.min(devicePixelRatio||1,2);
  const nw=Math.floor(w*dpr), nh=Math.floor(h*dpr);
  if(c.width!==nw||c.height!==nh){
    c.width=nw; c.height=nh;
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
}

function draw(now){
  const t=now-S.t0;
  ensure(cv,cx,360,640);
  drawFrame(cx,360,640,t);

  const layer=$("recLayer");
  if(layer&&!layer.hidden){
    ensure(rcx,rx,1080,1920);
    drawFrame(rx,1080,1920,t);
  }
}

function loop(now){
  S.raf=requestAnimationFrame(loop);
  draw(now);
}
function startLoop(){
  cancelAnimationFrame(S.raf);
  S.raf=requestAnimationFrame(loop);
}

function updateBtns(){
  const label=S.playing?"⏸ Pauza":"▶ Ko‘rish";
  if($("play"))$("play").textContent=label;
  if($("recPlay"))$("recPlay").textContent=S.playing?"⏸":"▶";
}
function stop(){S.playing=false;updateBtns();}
function toggle(){
  S.playing=!S.playing;
  S.t0=performance.now();
  updateBtns();
}

$("play").onclick=toggle;
$("rec").onclick=()=>{
  S.t0=performance.now();
  S.playing=true;
  updateBtns();
  $("recLayer").hidden=false;
  $("recLabel").textContent="RECORDING · 9:16 · "+(MODES[S.mode]?.tag||"NEX");
};
$("recClose").onclick=()=>{$("recLayer").hidden=true;stop();};
$("recPlay").onclick=toggle;

initParts();
console.log("NEX Reels Studio Pro style ready");
})();
