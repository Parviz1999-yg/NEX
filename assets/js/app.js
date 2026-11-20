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
  blobs:[],
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

/* ---------- Particles + liquid blobs ---------- */
function initParts(){
  S.particles=Array.from({length:70},()=>({
    x:Math.random(), y:Math.random(),
    r:0.8+Math.random()*2.8,
    v:.08+Math.random()*.45,
    a:Math.random()*6.28,
    s:.4+Math.random()*1.2
  }));
  S.blobs=[
    {cx:.72, cy:.28, rx:.22, ry:.18, rot:0, speed:.35, hueShift:0},
    {cx:.28, cy:.62, rx:.18, ry:.14, rot:1.2, speed:-.25, hueShift:40},
    {cx:.55, cy:.75, rx:.14, ry:.11, rot:2.4, speed:.4, hueShift:80}
  ];
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

function metalGrad(ctx,x,y,r,base){
  const g=ctx.createRadialGradient(x-r*.35,y-r*.4,r*.05,x,y,r);
  g.addColorStop(0,"#ffffffcc");
  g.addColorStop(.18,base);
  g.addColorStop(.45,"#ffffff33");
  g.addColorStop(.7,base);
  g.addColorStop(1,"#00000055");
  return g;
}

function drawLiquidBlob(ctx,W,H,blob,sec,ac){
  const cx=blob.cx*W + Math.sin(sec*blob.speed)*W*.04;
  const cy=blob.cy*H + Math.cos(sec*blob.speed*.8)*H*.03;
  const rx=blob.rx*W*(.9+Math.sin(sec*1.3+blob.rot)*.12);
  const ry=blob.ry*H*(.9+Math.cos(sec*1.1+blob.rot)*.12);
  const rot=blob.rot+sec*blob.speed*.6;

  ctx.save();
  ctx.translate(cx,cy);
  ctx.rotate(rot);

  ctx.globalAlpha=.18;
  const glow=ctx.createRadialGradient(0,0,0,0,0,Math.max(rx,ry)*1.6);
  glow.addColorStop(0,ac);
  glow.addColorStop(1,"transparent");
  ctx.fillStyle=glow;
  ctx.beginPath();
  ctx.ellipse(0,0,rx*1.5,ry*1.5,0,0,6.28);
  ctx.fill();

  ctx.globalAlpha=.85;
  const body=ctx.createLinearGradient(-rx,-ry,rx,ry);
  body.addColorStop(0,"#ffffffaa");
  body.addColorStop(.25,ac);
  body.addColorStop(.55,"#ffffff44");
  body.addColorStop(.8,ac);
  body.addColorStop(1,"#00000066");
  ctx.fillStyle=body;
  ctx.beginPath();
  ctx.ellipse(0,0,rx,ry,0,0,6.28);
  ctx.fill();

  ctx.globalAlpha=.55;
  const hi=ctx.createRadialGradient(-rx*.4,-ry*.45,0,-rx*.2,-ry*.3,rx*.7);
  hi.addColorStop(0,"#ffffffee");
  hi.addColorStop(.4,"#ffffff55");
  hi.addColorStop(1,"transparent");
  ctx.fillStyle=hi;
  ctx.beginPath();
  ctx.ellipse(-rx*.15,-ry*.2,rx*.55,ry*.4,-0.4,0,6.28);
  ctx.fill();

  ctx.globalAlpha=.4;
  ctx.strokeStyle=ac;
  ctx.lineWidth=1.5*(W/360);
  ctx.beginPath();
  ctx.ellipse(0,0,rx,ry,0,0,6.28);
  ctx.stroke();

  ctx.restore();
  ctx.globalAlpha=1;
}

/* ---------- Draw engine ---------- */
function drawFrame(ctx,W,H,t){
  const d=S.data||{};
  const mode=S.mode;
  const ac=ACCENT[mode];
  const sec=Math.max(0,t/1000);
  const p=ease((sec%3.6)/1.2);

  ctx.fillStyle="#03040a";
  ctx.fillRect(0,0,W,H);

  const wash=ctx.createRadialGradient(W*.5,H*.35,0,W*.5,H*.5,W*.9);
  if(mode==="tavsiya"){
    wash.addColorStop(0,"#1e1040aa"); wash.addColorStop(1,"#03040a");
  } else if(mode==="fakt"){
    wash.addColorStop(0,"#2a1208aa"); wash.addColorStop(1,"#03040a");
  } else if(mode==="ibora"){
    wash.addColorStop(0,"#0e1528aa"); wash.addColorStop(1,"#03040a");
  } else {
    wash.addColorStop(0,"#071e28aa"); wash.addColorStop(1,"#03040a");
  }
  ctx.fillStyle=wash;
  ctx.fillRect(0,0,W,H);

  S.blobs.forEach(b=>drawLiquidBlob(ctx,W,H,b,sec,ac));

  S.particles.forEach(pt=>{
    const x=pt.x*W+Math.sin(sec*pt.v+pt.a)*18;
    const y=((pt.y+sec*pt.v*.025)%1.35)*H-H*.12;
    const alpha=.15+.45*Math.abs(Math.sin(sec*pt.s+pt.a));
    ctx.globalAlpha=alpha;
    ctx.fillStyle="#ffffff";
    ctx.beginPath();
    ctx.arc(x,y,pt.r*.4*(W/360),0,6.28);
    ctx.fill();
    ctx.globalAlpha=alpha*.6;
    ctx.fillStyle=ac;
    ctx.beginPath();
    ctx.arc(x,y,pt.r*1.3*(W/360),0,6.28);
    ctx.fill();
  });
  ctx.globalAlpha=1;

  ctx.save();
  ctx.globalAlpha=.08+Math.sin(sec*.6)*.03;
  const sweep=ctx.createLinearGradient(0,0,W,H);
  sweep.addColorStop(0,"transparent");
  sweep.addColorStop(.4,ac);
  sweep.addColorStop(.6,"#ffffff88");
  sweep.addColorStop(1,"transparent");
  ctx.fillStyle=sweep;
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

  const cy=H*.17;
  ctx.save();
  ctx.globalAlpha=p;
  ctx.translate((1-p)*50,0);

  ctx.fillStyle="rgba(255,255,255,.06)";
  ctx.strokeStyle="rgba(255,255,255,.25)";
  ctx.lineWidth=1.5;
  rr(ctx,W*.07,cy,W*.86,H*.125,18);
  ctx.fill(); ctx.stroke();

  ctx.strokeStyle=ac;
  ctx.globalAlpha=.5*p;
  ctx.lineWidth=2;
  ctx.beginPath();
  ctx.moveTo(W*.07,cy+H*.125);
  ctx.lineTo(W*.07+W*.86*p,cy+H*.125);
  ctx.stroke();
  ctx.globalAlpha=p;

  const ax=W*.18, ay=cy+H*.062, ar=W*.055;
  ctx.save();
  ctx.translate(ax,ay);
  ctx.rotate(sec*1.1);
  ctx.strokeStyle=ac;
  ctx.globalAlpha=.55*p;
  ctx.lineWidth=2.5;
  ctx.setLineDash([6,8]);
  ctx.beginPath(); ctx.arc(0,0,ar+10,0,6.28); ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();

  const gr=metalGrad(ctx,ax,ay,ar,ac);
  ctx.fillStyle=gr;
  ctx.beginPath(); ctx.arc(ax,ay,ar,0,6.28); ctx.fill();
  ctx.fillStyle="#0a0c18";
  ctx.font=`bold ${Math.floor(W*.05)}px system-ui`;
  ctx.textAlign="center"; ctx.textBaseline="middle";
  ctx.fillText(letter,ax,ay+1);

  ctx.fillStyle="#fff";
  ctx.font=`bold ${Math.floor(W*.04)}px system-ui`;
  ctx.textAlign="left";
  ctx.fillText(handle.slice(0,18),W*.28,cy+H*.042);
  ctx.fillStyle="#a0aabc";
  ctx.font=`${Math.floor(W*.026)}px system-ui`;
  ctx.fillText((d.role||"Tavsiya etiladi").slice(0,24),W*.28,cy+H*.08);
  ctx.restore();

  ctx.save();
  ctx.translate(W*.8,H*.36);
  ctx.rotate(sec*.7);
  ctx.strokeStyle=ac;
  ctx.globalAlpha=.3*p;
  ctx.lineWidth=1.8;
  ctx.setLineDash([7,9]);
  ctx.beginPath(); ctx.arc(0,0,W*.11,0,6.28); ctx.stroke();
  ctx.beginPath(); ctx.arc(0,0,W*.07,0,6.28); ctx.stroke();
  ctx.restore();

  ctx.textAlign="center";
  ctx.fillStyle=ac;
  ctx.globalAlpha=p;
  ctx.font=`bold ${Math.floor(W*.026)}px system-ui`;
  ctx.fillText("TAVSIYA",W/2,H*.39);

  ctx.fillStyle="#fff";
  ctx.font=`bold ${Math.floor(W*.058)}px system-ui`;
  const lines=wrap(ctx,d.hook||"Bu akkauntni ko‘rishga arziydi",W*.82);
  lines.slice(0,3).forEach((ln,i)=>{
    ctx.globalAlpha=ease(p-i*.1);
    ctx.fillText(ln,W/2,H*.47+i*W*.075);
  });

  ctx.globalAlpha=p*.88;
  ctx.fillStyle="#c8d0dc";
  ctx.font=`${Math.floor(W*.03)}px system-ui`;
  const body=wrap(ctx,d.why||"Foydali kontent va sifatli yondashuv.",W*.8);
  body.slice(0,3).forEach((ln,i)=>ctx.fillText(ln,W/2,H*.67+i*W*.042));

  ctx.globalAlpha=p;
  const cta=d.cta||"Obuna bo‘ling";
  ctx.font=`bold ${Math.floor(W*.03)}px system-ui`;
  const tw=ctx.measureText(cta).width+W*.12;
  const gr2=ctx.createLinearGradient((W-tw)/2,0,(W+tw)/2,0);
  gr2.addColorStop(0,ac);
  gr2.addColorStop(.5,"#ffffffcc");
  gr2.addColorStop(1,"#ff2bd6");
  ctx.fillStyle=gr2;
  rr(ctx,(W-tw)/2,H*.84,tw,H*.05,99);
  ctx.fill();
  ctx.globalAlpha=.35*p;
  const shine=ctx.createLinearGradient((W-tw)/2,H*.84,(W-tw)/2,H*.89);
  shine.addColorStop(0,"#ffffffaa");
  shine.addColorStop(1,"transparent");
  ctx.fillStyle=shine;
  rr(ctx,(W-tw)/2,H*.84,tw,H*.025,99);
  ctx.fill();
  ctx.globalAlpha=p;
  ctx.fillStyle="#05060f";
  ctx.textBaseline="middle";
  ctx.fillText(cta,W/2,H*.865);
  ctx.globalAlpha=1;
}

function drawFakt(ctx,W,H,d,ac,p,sec){
  ctx.save();
  ctx.translate(W/2,H*.23);
  ctx.rotate((1-p)*-.35 + Math.sin(sec*1.8)*.04);
  const sc=.55+.45*p;
  ctx.scale(sc,sc);

  ctx.globalAlpha=.25*p;
  const gRing=ctx.createRadialGradient(0,0,W*.08,0,0,W*.18);
  gRing.addColorStop(0,ac);
  gRing.addColorStop(1,"transparent");
  ctx.fillStyle=gRing;
  ctx.beginPath(); ctx.arc(0,0,W*.18,0,6.28); ctx.fill();

  ctx.globalAlpha=p;
  ctx.strokeStyle=ac;
  ctx.lineWidth=4.5;
  ctx.setLineDash([12,9]);
  ctx.beginPath(); ctx.arc(0,0,W*.125,0,6.28); ctx.stroke();
  ctx.setLineDash([]);
  ctx.lineWidth=2.5;
  ctx.beginPath(); ctx.arc(0,0,W*.095,0,6.28); ctx.stroke();

  ctx.fillStyle=metalGrad(ctx,0,0,W*.09,ac);
  ctx.beginPath(); ctx.arc(0,0,W*.085,0,6.28); ctx.fill();

  ctx.fillStyle="#0a0c18";
  ctx.font=`bold ${Math.floor(W*.032)}px system-ui`;
  ctx.textAlign="center"; ctx.textBaseline="middle";
  ctx.fillText((d.num||"FAKT").slice(0,10),0,0);
  ctx.restore();

  ctx.textAlign="center";
  ctx.fillStyle="#fff";
  ctx.font=`bold ${Math.floor(W*.055)}px system-ui`;
  const lines=wrap(ctx,d.title||"Qiziqarli fakt shu yerda",W*.84);
  lines.slice(0,4).forEach((ln,i)=>{
    ctx.globalAlpha=ease(p-.05-i*.08);
    ctx.fillText(ln,W/2,H*.44+i*W*.07);
  });

  ctx.globalAlpha=p*.85;
  ctx.fillStyle="#c8d0dc";
  ctx.font=`${Math.floor(W*.03)}px system-ui`;
  const det=wrap(ctx,d.detail||"",W*.8);
  det.slice(0,3).forEach((ln,i)=>ctx.fillText(ln,W/2,H*.72+i*W*.042));
  ctx.globalAlpha=1;
}

function drawIbora(ctx,W,H,d,ac,p,sec){
  ctx.globalAlpha=.14*p;
  ctx.fillStyle=ac;
  ctx.font=`bold ${Math.floor(W*.26)}px Georgia,serif`;
  ctx.textAlign="center";
  ctx.fillText("\u201C",W/2,H*.27);
  ctx.globalAlpha=1;

  ctx.fillStyle="#fff";
  ctx.font=`bold ${Math.floor(W*.05)}px Georgia,serif`;
  const lines=wrap(ctx,d.quote||"Kichik qadamlar katta o‘zgarishlarni yaratadi.",W*.82);
  lines.slice(0,5).forEach((ln,i)=>{
    ctx.globalAlpha=ease(p-i*.09);
    const fy=Math.sin(sec*1.4+i)*.8*(W/360);
    ctx.fillText(ln,W/2,H*.37+i*W*.065+fy);
  });

  ctx.globalAlpha=p;
  ctx.fillStyle=ac;
  ctx.font=`${Math.floor(W*.028)}px system-ui`;
  ctx.fillText("— "+(d.author||"Noma’lum"),W/2,H*.77);

  ctx.strokeStyle=ac;
  ctx.globalAlpha=.45*p;
  ctx.lineWidth=1.8;
  ctx.beginPath();
  ctx.moveTo(W*.28,H*.82); ctx.lineTo(W*.72,H*.82);
  ctx.stroke();
  ctx.globalAlpha=1;
}

/* ===== MANBA — Tavsiya akkaunt uslubida ===== */
function drawManba(ctx,W,H,d,ac,p,sec){
  const name=d.name||"Foydali manba";
  const type=(d.type||"MANBA").toUpperCase();
  const letter=(name[0]||"M").toUpperCase();

  // --- yuqori glass card (Tavsiya dagi profil kartasi kabi) ---
  const cy=H*.15;
  ctx.save();
  ctx.globalAlpha=p;
  ctx.translate((1-p)*50,0);

  ctx.fillStyle="rgba(255,255,255,.06)";
  ctx.strokeStyle="rgba(255,255,255,.25)";
  ctx.lineWidth=1.5;
  rr(ctx,W*.07,cy,W*.86,H*.125,18);
  ctx.fill(); ctx.stroke();

  // accent progress line
  ctx.strokeStyle=ac;
  ctx.globalAlpha=.5*p;
  ctx.lineWidth=2;
  ctx.beginPath();
  ctx.moveTo(W*.07,cy+H*.125);
  ctx.lineTo(W*.07+W*.86*p,cy+H*.125);
  ctx.stroke();
  ctx.globalAlpha=p;

  // metallik avatar + aylanuvchi ring
  const ax=W*.18, ay=cy+H*.062, ar=W*.055;
  ctx.save();
  ctx.translate(ax,ay);
  ctx.rotate(sec*1.1);
  ctx.strokeStyle=ac;
  ctx.globalAlpha=.55*p;
  ctx.lineWidth=2.5;
  ctx.setLineDash([6,8]);
  ctx.beginPath(); ctx.arc(0,0,ar+10,0,6.28); ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();

  const gr=metalGrad(ctx,ax,ay,ar,ac);
  ctx.fillStyle=gr;
  ctx.beginPath(); ctx.arc(ax,ay,ar,0,6.28); ctx.fill();
  ctx.fillStyle="#0a0c18";
  ctx.font=`bold ${Math.floor(W*.05)}px system-ui`;
  ctx.textAlign="center"; ctx.textBaseline="middle";
  ctx.fillText(letter,ax,ay+1);

  // nom va turi
  ctx.fillStyle="#fff";
  ctx.font=`bold ${Math.floor(W*.038)}px system-ui`;
  ctx.textAlign="left";
  ctx.fillText(name.slice(0,20),W*.28,cy+H*.042);
  ctx.fillStyle="#a0aabc";
  ctx.font=`${Math.floor(W*.026)}px system-ui`;
  ctx.fillText(type.slice(0,24),W*.28,cy+H*.08);
  ctx.restore();

  // orbit bezak (Tavsiya bilan bir xil)
  ctx.save();
  ctx.translate(W*.8,H*.34);
  ctx.rotate(sec*.7);
  ctx.strokeStyle=ac;
  ctx.globalAlpha=.3*p;
  ctx.lineWidth=1.8;
  ctx.setLineDash([7,9]);
  ctx.beginPath(); ctx.arc(0,0,W*.11,0,6.28); ctx.stroke();
  ctx.beginPath(); ctx.arc(0,0,W*.07,0,6.28); ctx.stroke();
  ctx.restore();

  // kicker
  ctx.textAlign="center";
  ctx.fillStyle=ac;
  ctx.globalAlpha=p;
  ctx.font=`bold ${Math.floor(W*.026)}px system-ui`;
  ctx.fillText("FOYDALI MANBA",W/2,H*.37);

  // why matni
  ctx.fillStyle="#fff";
  ctx.font=`bold ${Math.floor(W*.048)}px system-ui`;
  const whyLines=wrap(ctx,d.why||"Amaliy darslar, qisqa va tushunarli",W*.82);
  whyLines.slice(0,2).forEach((ln,i)=>{
    ctx.globalAlpha=ease(p-i*.1);
    ctx.fillText(ln,W/2,H*.44+i*W*.065);
  });

  // 3 ta nuqta — glass kartochkalar (Tavsiya uslubida)
  const pts=(d.pts||"").split(/\n+/).map(x=>x.trim()).filter(Boolean).slice(0,3);
  const list=pts.length?pts:["Amaliy qiymat","Qulay format","Tavsiya etiladi"];

  list.forEach((item,i)=>{
    const q=ease(p-.15-i*.12);
    const y=H*.56+i*H*.085;
    ctx.globalAlpha=q;

    // glass card
    ctx.fillStyle="rgba(255,255,255,.06)";
    ctx.strokeStyle="rgba(255,255,255,.22)";
    ctx.lineWidth=1.3;
    rr(ctx,W*.08,y,W*.84,H*.07,14);
    ctx.fill(); ctx.stroke();

    // metallik raqam
    const nx=W*.17, ny=y+H*.035;
    ctx.fillStyle=metalGrad(ctx,nx,ny,W*.026,ac);
    ctx.beginPath(); ctx.arc(nx,ny,W*.026,0,6.28); ctx.fill();
    ctx.fillStyle="#05060f";
    ctx.font=`bold ${Math.floor(W*.024)}px system-ui`;
    ctx.textAlign="center"; ctx.textBaseline="middle";
    ctx.fillText(String(i+1),nx,ny);

    ctx.fillStyle="#f0f7ff";
    ctx.font=`bold ${Math.floor(W*.03)}px system-ui`;
    ctx.textAlign="left";
    ctx.fillText(item.slice(0,26),W*.25,ny);
  });

  // pastki glossy CTA (Tavsiya dagi kabi)
  ctx.globalAlpha=p;
  const cta="Ko‘rib chiqing";
  ctx.font=`bold ${Math.floor(W*.028)}px system-ui`;
  const tw=ctx.measureText(cta).width+W*.12;
  const gr2=ctx.createLinearGradient((W-tw)/2,0,(W+tw)/2,0);
  gr2.addColorStop(0,ac);
  gr2.addColorStop(.5,"#ffffffcc");
  gr2.addColorStop(1,"#38bdf8");
  ctx.fillStyle=gr2;
  rr(ctx,(W-tw)/2,H*.88,tw,H*.045,99);
  ctx.fill();

  ctx.globalAlpha=.35*p;
  const shine=ctx.createLinearGradient((W-tw)/2,H*.88,(W-tw)/2,H*.925);
  shine.addColorStop(0,"#ffffffaa");
  shine.addColorStop(1,"transparent");
  ctx.fillStyle=shine;
  rr(ctx,(W-tw)/2,H*.88,tw,H*.022,99);
  ctx.fill();

  ctx.globalAlpha=p;
  ctx.fillStyle="#05060f";
  ctx.textAlign="center";
  ctx.textBaseline="middle";
  ctx.fillText(cta,W/2,H*.902);
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
console.log("NEX manba = tavsiya style ready");
})();
