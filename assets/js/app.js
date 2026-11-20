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
  images:{},      // loaded Image objects
  scene:0,        // current scene for manba
  sceneDur:3.2,   // seconds per scene
  manbaScenes:6
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
    multi:true,
    fields:[
      {sec:"01 · INTRO (HOOK)"},
      {id:"hook",l:"Hook matni",p:"Bu manbani bilasizmi?",ta:1},
      {sec:"02 · ASOSIY (MANBA + RASM)"},
      {id:"name",l:"Manba nomi",p:"YouTube kanal / kitob / sayt"},
      {id:"type",l:"Turi",p:"YouTube"},
      {id:"imgMain",l:"Asosiy rasm",file:1},
      {id:"mainDesc",l:"Qisqa tavsif",p:"Nima haqida ekanligi",ta:1},
      {sec:"03 · NIMA UCHUN (2 RASM + TAVSIF)"},
      {id:"whyText",l:"Nima uchun foydali?",p:"Amaliy, tushunarli, sifatli",ta:1},
      {id:"imgWhy1",l:"Rasm 1",file:1},
      {id:"imgWhy2",l:"Rasm 2",file:1},
      {sec:"04 · USTUNLIGI (MATN)"},
      {id:"ustun",l:"Ustunliklar (har qatorda)",p:"Bepul\nAmaliy misollar\nMuntazam yangilanadi",ta:1},
      {sec:"05 · CHORLOV"},
      {id:"cta",l:"Chorlov matni",p:"Hozir ko‘rib chiqing"},
      {id:"imgCta1",l:"Kichik rasm 1",file:1},
      {id:"imgCta2",l:"Kichik rasm 2",file:1},
      {sec:"06 · OUTRO"},
      {id:"outroHandle",l:"Sizning akkauntingiz",p:"@youraccount"},
      {id:"outroRole",l:"Tavsif",p:"Foydali topilmalar"}
    ]
  }
};

/* ---------- UI ---------- */
function show(id){$$(".scr").forEach(s=>s.classList.toggle("on",s.id===id));}

$$(".mcard").forEach(b=>b.onclick=()=>openMode(b.dataset.mode));
$("back").onclick=()=>{stop();show("home");$("sceneDots").hidden=true;};

function openMode(key){
  S.mode=key;
  S.scene=0;
  const m=MODES[key];
  $("modeName").textContent=m.name;
  $("modeTag").textContent=m.tag;
  document.documentElement.style.setProperty("--accent",ACCENT[key]);

  const col=$("formCol");
  col.innerHTML="";
  m.fields.forEach(f=>{
    if(f.sec){
      const s=document.createElement("div");
      s.className="section-label";
      s.textContent=f.sec;
      col.appendChild(s);
      return;
    }
    const lab=document.createElement("label");
    lab.textContent=f.l;
    if(f.file){
      const inp=document.createElement("input");
      inp.type="file";
      inp.accept="image/*";
      inp.id="f_"+f.id;
      inp.onchange=e=>{
        const file=e.target.files&&e.target.files[0];
        if(!file)return;
        const img=new Image();
        img.onload=()=>{S.images[f.id]=img;collect();};
        img.src=URL.createObjectURL(file);
      };
      lab.appendChild(inp);
    } else {
      const inp=document.createElement(f.ta?"textarea":"input");
      if(!f.ta)inp.type="text"; else inp.rows=2;
      inp.id="f_"+f.id;
      inp.placeholder=f.p||"";
      inp.oninput=collect;
      lab.appendChild(inp);
    }
    col.appendChild(lab);
  });

  const btn=document.createElement("button");
  btn.className="btn primary";
  btn.textContent="Yangilash";
  btn.style.marginTop="4px";
  btn.onclick=collect;
  col.appendChild(btn);

  // scene dots for manba
  const dots=$("sceneDots");
  if(m.multi){
    dots.hidden=false;
    dots.innerHTML="";
    for(let i=0;i<S.manbaScenes;i++){
      const sp=document.createElement("span");
      if(i===0)sp.className="on";
      dots.appendChild(sp);
    }
  } else {
    dots.hidden=true;
  }

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
    if(f.sec||f.file)return;
    const el=$("f_"+f.id);
    d[f.id]=el?el.value.trim():"";
  });
  S.data=d;
}

function updateDots(){
  const dots=$("sceneDots");
  if(dots.hidden)return;
  [...dots.children].forEach((sp,i)=>sp.classList.toggle("on",i===S.scene));
}

/* ---------- Particles ---------- */
function initParts(){
  S.particles=Array.from({length:60},()=>({
    x:Math.random(),y:Math.random(),
    r:0.8+Math.random()*2.5,
    v:.08+Math.random()*.4,
    a:Math.random()*6.28,
    s:.4+Math.random()
  }));
  S.blobs=[
    {cx:.72,cy:.28,rx:.2,ry:.16,rot:0,speed:.35},
    {cx:.28,cy:.65,rx:.16,ry:.13,rot:1.2,speed:-.25},
    {cx:.55,cy:.78,rx:.13,ry:.1,rot:2.4,speed:.4}
  ];
}

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
  const lines=[];let line="";
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
  const cx=blob.cx*W+Math.sin(sec*blob.speed)*W*.04;
  const cy=blob.cy*H+Math.cos(sec*blob.speed*.8)*H*.03;
  const rx=blob.rx*W*(.9+Math.sin(sec*1.3+blob.rot)*.12);
  const ry=blob.ry*H*(.9+Math.cos(sec*1.1+blob.rot)*.12);
  const rot=blob.rot+sec*blob.speed*.6;
  ctx.save();
  ctx.translate(cx,cy);ctx.rotate(rot);
  ctx.globalAlpha=.15;
  const glow=ctx.createRadialGradient(0,0,0,0,0,Math.max(rx,ry)*1.5);
  glow.addColorStop(0,ac);glow.addColorStop(1,"transparent");
  ctx.fillStyle=glow;
  ctx.beginPath();ctx.ellipse(0,0,rx*1.4,ry*1.4,0,0,6.28);ctx.fill();
  ctx.globalAlpha=.8;
  const body=ctx.createLinearGradient(-rx,-ry,rx,ry);
  body.addColorStop(0,"#ffffffaa");body.addColorStop(.3,ac);
  body.addColorStop(.6,"#ffffff44");body.addColorStop(1,"#00000066");
  ctx.fillStyle=body;
  ctx.beginPath();ctx.ellipse(0,0,rx,ry,0,0,6.28);ctx.fill();
  ctx.globalAlpha=.5;
  const hi=ctx.createRadialGradient(-rx*.4,-ry*.4,0,0,0,rx*.7);
  hi.addColorStop(0,"#ffffffdd");hi.addColorStop(1,"transparent");
  ctx.fillStyle=hi;
  ctx.beginPath();ctx.ellipse(-rx*.15,-ry*.2,rx*.5,ry*.35,-.4,0,6.28);ctx.fill();
  ctx.restore();ctx.globalAlpha=1;
}

function drawImg(ctx,img,x,y,w,h,r){
  if(!img||!img.complete)return;
  ctx.save();
  rr(ctx,x,y,w,h,r||12);
  ctx.clip();
  const s=Math.max(w/img.width,h/img.height);
  const dw=img.width*s, dh=img.height*s;
  ctx.drawImage(img,x+(w-dw)/2,y+(h-dh)/2,dw,dh);
  ctx.restore();
}

/* ---------- Background ---------- */
function drawBG(ctx,W,H,sec,ac,mode){
  ctx.fillStyle="#03040a";ctx.fillRect(0,0,W,H);
  const wash=ctx.createRadialGradient(W*.5,H*.35,0,W*.5,H*.5,W*.9);
  if(mode==="tavsiya"){wash.addColorStop(0,"#1e1040aa");wash.addColorStop(1,"#03040a");}
  else if(mode==="fakt"){wash.addColorStop(0,"#2a1208aa");wash.addColorStop(1,"#03040a");}
  else if(mode==="ibora"){wash.addColorStop(0,"#0e1528aa");wash.addColorStop(1,"#03040a");}
  else{wash.addColorStop(0,"#071e28aa");wash.addColorStop(1,"#03040a");}
  ctx.fillStyle=wash;ctx.fillRect(0,0,W,H);

  S.blobs.forEach(b=>drawLiquidBlob(ctx,W,H,b,sec,ac));

  S.particles.forEach(pt=>{
    const x=pt.x*W+Math.sin(sec*pt.v+pt.a)*16;
    const y=((pt.y+sec*pt.v*.025)%1.35)*H-H*.1;
    const a=.12+.4*Math.abs(Math.sin(sec*pt.s+pt.a));
    ctx.globalAlpha=a;
    ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(x,y,pt.r*.35*(W/360),0,6.28);ctx.fill();
    ctx.globalAlpha=a*.5;ctx.fillStyle=ac;
    ctx.beginPath();ctx.arc(x,y,pt.r*1.2*(W/360),0,6.28);ctx.fill();
  });
  ctx.globalAlpha=1;
}

/* ---------- Single-scene modes (unchanged style) ---------- */
function drawTavsiya(ctx,W,H,d,ac,p,sec){
  const handle=d.handle||"@akkaunt";
  const letter=(handle.replace(/^@/,"")[0]||"N").toUpperCase();
  const cy=H*.17;
  ctx.save();ctx.globalAlpha=p;ctx.translate((1-p)*50,0);
  ctx.fillStyle="rgba(255,255,255,.06)";ctx.strokeStyle="rgba(255,255,255,.25)";ctx.lineWidth=1.5;
  rr(ctx,W*.07,cy,W*.86,H*.125,18);ctx.fill();ctx.stroke();
  const ax=W*.18,ay=cy+H*.062,ar=W*.055;
  ctx.save();ctx.translate(ax,ay);ctx.rotate(sec*1.1);
  ctx.strokeStyle=ac;ctx.globalAlpha=.5*p;ctx.lineWidth=2.5;ctx.setLineDash([6,8]);
  ctx.beginPath();ctx.arc(0,0,ar+10,0,6.28);ctx.stroke();ctx.setLineDash([]);ctx.restore();
  ctx.fillStyle=metalGrad(ctx,ax,ay,ar,ac);
  ctx.beginPath();ctx.arc(ax,ay,ar,0,6.28);ctx.fill();
  ctx.fillStyle="#0a0c18";ctx.font=`bold ${Math.floor(W*.05)}px system-ui`;
  ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(letter,ax,ay+1);
  ctx.fillStyle="#fff";ctx.font=`bold ${Math.floor(W*.04)}px system-ui`;ctx.textAlign="left";
  ctx.fillText(handle.slice(0,18),W*.28,cy+H*.042);
  ctx.fillStyle="#a0aabc";ctx.font=`${Math.floor(W*.026)}px system-ui`;
  ctx.fillText((d.role||"Tavsiya").slice(0,24),W*.28,cy+H*.08);
  ctx.restore();

  ctx.textAlign="center";ctx.fillStyle=ac;ctx.globalAlpha=p;
  ctx.font=`bold ${Math.floor(W*.026)}px system-ui`;ctx.fillText("TAVSIYA",W/2,H*.39);
  ctx.fillStyle="#fff";ctx.font=`bold ${Math.floor(W*.056)}px system-ui`;
  wrap(ctx,d.hook||"Bu akkauntni ko‘rishga arziydi",W*.82).slice(0,3).forEach((ln,i)=>{
    ctx.globalAlpha=ease(p-i*.1);ctx.fillText(ln,W/2,H*.47+i*W*.072);
  });
  ctx.globalAlpha=p*.88;ctx.fillStyle="#c8d0dc";ctx.font=`${Math.floor(W*.03)}px system-ui`;
  wrap(ctx,d.why||"Foydali kontent",W*.8).slice(0,3).forEach((ln,i)=>ctx.fillText(ln,W/2,H*.67+i*W*.04));

  ctx.globalAlpha=p;
  const cta=d.cta||"Obuna bo‘ling";
  ctx.font=`bold ${Math.floor(W*.03)}px system-ui`;
  const tw=ctx.measureText(cta).width+W*.12;
  const gr=ctx.createLinearGradient((W-tw)/2,0,(W+tw)/2,0);
  gr.addColorStop(0,ac);gr.addColorStop(.5,"#ffffffcc");gr.addColorStop(1,"#ff2bd6");
  ctx.fillStyle=gr;rr(ctx,(W-tw)/2,H*.84,tw,H*.05,99);ctx.fill();
  ctx.fillStyle="#05060f";ctx.textBaseline="middle";ctx.fillText(cta,W/2,H*.865);
  ctx.globalAlpha=1;
}

function drawFakt(ctx,W,H,d,ac,p,sec){
  ctx.save();ctx.translate(W/2,H*.23);
  ctx.rotate((1-p)*-.3+Math.sin(sec*1.8)*.03);
  const sc=.55+.45*p;ctx.scale(sc,sc);
  ctx.globalAlpha=.25*p;
  const g=ctx.createRadialGradient(0,0,W*.08,0,0,W*.18);
  g.addColorStop(0,ac);g.addColorStop(1,"transparent");
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,W*.18,0,6.28);ctx.fill();
  ctx.globalAlpha=p;ctx.strokeStyle=ac;ctx.lineWidth=4;ctx.setLineDash([12,9]);
  ctx.beginPath();ctx.arc(0,0,W*.12,0,6.28);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle=metalGrad(ctx,0,0,W*.085,ac);
  ctx.beginPath();ctx.arc(0,0,W*.08,0,6.28);ctx.fill();
  ctx.fillStyle="#0a0c18";ctx.font=`bold ${Math.floor(W*.03)}px system-ui`;
  ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText((d.num||"FAKT").slice(0,10),0,0);
  ctx.restore();
  ctx.textAlign="center";ctx.fillStyle="#fff";ctx.font=`bold ${Math.floor(W*.052)}px system-ui`;
  wrap(ctx,d.title||"Qiziqarli fakt",W*.84).slice(0,4).forEach((ln,i)=>{
    ctx.globalAlpha=ease(p-i*.08);ctx.fillText(ln,W/2,H*.44+i*W*.068);
  });
  ctx.globalAlpha=p*.85;ctx.fillStyle="#c8d0dc";ctx.font=`${Math.floor(W*.03)}px system-ui`;
  wrap(ctx,d.detail||"",W*.8).slice(0,3).forEach((ln,i)=>ctx.fillText(ln,W/2,H*.72+i*W*.04));
  ctx.globalAlpha=1;
}

function drawIbora(ctx,W,H,d,ac,p,sec){
  ctx.globalAlpha=.14*p;ctx.fillStyle=ac;
  ctx.font=`bold ${Math.floor(W*.26)}px Georgia,serif`;ctx.textAlign="center";
  ctx.fillText("\u201C",W/2,H*.27);ctx.globalAlpha=1;
  ctx.fillStyle="#fff";ctx.font=`bold ${Math.floor(W*.05)}px Georgia,serif`;
  wrap(ctx,d.quote||"Kichik qadamlar katta o‘zgarishlarni yaratadi.",W*.82).slice(0,5).forEach((ln,i)=>{
    ctx.globalAlpha=ease(p-i*.09);
    ctx.fillText(ln,W/2,H*.37+i*W*.065+Math.sin(sec*1.4+i)*.6*(W/360));
  });
  ctx.globalAlpha=p;ctx.fillStyle=ac;ctx.font=`${Math.floor(W*.028)}px system-ui`;
  ctx.fillText("— "+(d.author||"Noma’lum"),W/2,H*.77);
  ctx.strokeStyle=ac;ctx.globalAlpha=.4*p;ctx.lineWidth=1.8;
  ctx.beginPath();ctx.moveTo(W*.28,H*.82);ctx.lineTo(W*.72,H*.82);ctx.stroke();
  ctx.globalAlpha=1;
}

/* ========== MANBA MULTI-SCENE ========== */
function drawManbaScene(ctx,W,H,d,ac,p,sec,scene){
  // scene enter progress
  const sp=ease(p);

  if(scene===0){ // INTRO HOOK
    ctx.textAlign="center";
    ctx.fillStyle=ac;ctx.globalAlpha=sp;
    ctx.font=`bold ${Math.floor(W*.028)}px system-ui`;
    ctx.fillText("FOYDALI MANBA",W/2,H*.28);
    ctx.fillStyle="#fff";ctx.font=`bold ${Math.floor(W*.065)}px system-ui`;
    wrap(ctx,d.hook||"Bu manbani bilasizmi?",W*.82).slice(0,4).forEach((ln,i)=>{
      ctx.globalAlpha=ease(sp-i*.1);
      ctx.fillText(ln,W/2,H*.42+i*W*.08);
    });
    ctx.globalAlpha=1;
  }

  else if(scene===1){ // ASOSIY — manba + rasm
    const cy=H*.12;
    ctx.save();ctx.globalAlpha=sp;ctx.translate((1-sp)*40,0);
    // glass header card
    ctx.fillStyle="rgba(255,255,255,.06)";ctx.strokeStyle="rgba(255,255,255,.22)";ctx.lineWidth=1.4;
    rr(ctx,W*.07,cy,W*.86,H*.11,16);ctx.fill();ctx.stroke();
    const letter=((d.name||"M")[0]||"M").toUpperCase();
    const ax=W*.17,ay=cy+H*.055,ar=W*.048;
    ctx.fillStyle=metalGrad(ctx,ax,ay,ar,ac);
    ctx.beginPath();ctx.arc(ax,ay,ar,0,6.28);ctx.fill();
    ctx.fillStyle="#0a0c18";ctx.font=`bold ${Math.floor(W*.042)}px system-ui`;
    ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(letter,ax,ay);
    ctx.fillStyle="#fff";ctx.font=`bold ${Math.floor(W*.036)}px system-ui`;ctx.textAlign="left";
    ctx.fillText((d.name||"Manba").slice(0,18),W*.26,cy+H*.038);
    ctx.fillStyle="#a0aabc";ctx.font=`${Math.floor(W*.024)}px system-ui`;
    ctx.fillText((d.type||"MANBA").toUpperCase(),W*.26,cy+H*.075);
    ctx.restore();

    // main image
    const iw=W*.7, ih=H*.38, ix=(W-iw)/2, iy=H*.28;
    ctx.globalAlpha=sp;
    ctx.fillStyle="rgba(255,255,255,.04)";ctx.strokeStyle="rgba(255,255,255,.2)";ctx.lineWidth=1.5;
    rr(ctx,ix,iy,iw,ih,16);ctx.fill();ctx.stroke();
    if(S.images.imgMain){
      drawImg(ctx,S.images.imgMain,ix+4,iy+4,iw-8,ih-8,14);
    } else {
      ctx.fillStyle="#1a2030";rr(ctx,ix+4,iy+4,iw-8,ih-8,14);ctx.fill();
      ctx.fillStyle="#4a5568";ctx.font=`${Math.floor(W*.03)}px system-ui`;ctx.textAlign="center";
      ctx.fillText("Rasm yuklang",W/2,iy+ih/2);
    }

    ctx.globalAlpha=sp*.9;ctx.fillStyle="#c8d0dc";ctx.font=`${Math.floor(W*.03)}px system-ui`;ctx.textAlign="center";
    wrap(ctx,d.mainDesc||"",W*.78).slice(0,3).forEach((ln,i)=>ctx.fillText(ln,W/2,H*.72+i*W*.042));
    ctx.globalAlpha=1;
  }

  else if(scene===2){ // NIMA UCHUN — 2 rasm + tavsif
    ctx.textAlign="center";
    ctx.fillStyle=ac;ctx.globalAlpha=sp;
    ctx.font=`bold ${Math.floor(W*.026)}px system-ui`;
    ctx.fillText("NIMA UCHUN?",W/2,H*.12);

    ctx.fillStyle="#fff";ctx.font=`bold ${Math.floor(W*.045)}px system-ui`;
    wrap(ctx,d.whyText||"Amaliy va tushunarli",W*.82).slice(0,3).forEach((ln,i)=>{
      ctx.globalAlpha=ease(sp-i*.1);ctx.fillText(ln,W/2,H*.2+i*W*.055);
    });

    // 2 images side by side
    const gap=W*.04, iw=(W*.86-gap)/2, ih=H*.32, iy=H*.4;
    const imgs=[S.images.imgWhy1,S.images.imgWhy2];
    imgs.forEach((img,i)=>{
      const ix=W*.07+i*(iw+gap);
      ctx.globalAlpha=ease(sp-.15-i*.1);
      ctx.fillStyle="rgba(255,255,255,.05)";ctx.strokeStyle="rgba(255,255,255,.2)";ctx.lineWidth=1.3;
      rr(ctx,ix,iy,iw,ih,14);ctx.fill();ctx.stroke();
      if(img) drawImg(ctx,img,ix+3,iy+3,iw-6,ih-6,12);
      else {
        ctx.fillStyle="#1a2030";rr(ctx,ix+3,iy+3,iw-6,ih-6,12);ctx.fill();
        ctx.fillStyle="#4a5568";ctx.font=`${Math.floor(W*.022)}px system-ui`;ctx.textAlign="center";
        ctx.fillText("Rasm "+(i+1),ix+iw/2,iy+ih/2);
      }
    });
    ctx.globalAlpha=1;
  }

  else if(scene===3){ // USTUNLIGI — faqat matn
    ctx.textAlign="center";
    ctx.fillStyle=ac;ctx.globalAlpha=sp;
    ctx.font=`bold ${Math.floor(W*.026)}px system-ui`;
    ctx.fillText("USTUNLIGI",W/2,H*.18);

    const pts=(d.ustun||"").split(/\n+/).map(x=>x.trim()).filter(Boolean).slice(0,5);
    const list=pts.length?pts:["Bepul kontent","Amaliy misollar","Muntazam yangilanadi"];

    list.forEach((item,i)=>{
      const q=ease(sp-i*.12);
      const y=H*.3+i*H*.1;
      ctx.globalAlpha=q;
      ctx.fillStyle="rgba(255,255,255,.06)";ctx.strokeStyle="rgba(255,255,255,.2)";ctx.lineWidth=1.3;
      rr(ctx,W*.08,y,W*.84,H*.08,14);ctx.fill();ctx.stroke();

      ctx.fillStyle=metalGrad(ctx,W*.17,y+H*.04,W*.026,ac);
      ctx.beginPath();ctx.arc(W*.17,y+H*.04,W*.026,0,6.28);ctx.fill();
      ctx.fillStyle="#05060f";ctx.font=`bold ${Math.floor(W*.024)}px system-ui`;
      ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(String(i+1),W*.17,y+H*.04);

      ctx.fillStyle="#f0f7ff";ctx.font=`bold ${Math.floor(W*.032)}px system-ui`;ctx.textAlign="left";
      ctx.fillText(item.slice(0,28),W*.26,y+H*.04);
    });
    ctx.globalAlpha=1;
  }

  else if(scene===4){ // CHORLOV — matn + 2 kichik rasm burchakda
    // 2 small images top-right corner
    const sw=W*.22, sh=W*.22, gap=8;
    const imgs=[S.images.imgCta1,S.images.imgCta2];
    imgs.forEach((img,i)=>{
      const ix=W*.7, iy=H*.08+i*(sh+gap);
      ctx.globalAlpha=ease(sp-i*.1);
      ctx.fillStyle="rgba(255,255,255,.06)";ctx.strokeStyle="rgba(255,255,255,.25)";ctx.lineWidth=1.2;
      rr(ctx,ix,iy,sw,sh,12);ctx.fill();ctx.stroke();
      if(img) drawImg(ctx,img,ix+2,iy+2,sw-4,sh-4,10);
      else {
        ctx.fillStyle="#1a2030";rr(ctx,ix+2,iy+2,sw-4,sh-4,10);ctx.fill();
      }
    });

    ctx.textAlign="center";
    ctx.fillStyle=ac;ctx.globalAlpha=sp;
    ctx.font=`bold ${Math.floor(W*.026)}px system-ui`;
    ctx.fillText("CHORLOV",W/2,H*.45);

    ctx.fillStyle="#fff";ctx.font=`bold ${Math.floor(W*.06)}px system-ui`;
    wrap(ctx,d.cta||"Hozir ko‘rib chiqing",W*.75).slice(0,3).forEach((ln,i)=>{
      ctx.globalAlpha=ease(sp-i*.1);ctx.fillText(ln,W/2,H*.55+i*W*.075);
    });

    // CTA button
    ctx.globalAlpha=sp;
    const btn="Ko‘rish ↗";
    ctx.font=`bold ${Math.floor(W*.03)}px system-ui`;
    const tw=ctx.measureText(btn).width+W*.14;
    const gr=ctx.createLinearGradient((W-tw)/2,0,(W+tw)/2,0);
    gr.addColorStop(0,ac);gr.addColorStop(.5,"#ffffffcc");gr.addColorStop(1,"#38bdf8");
    ctx.fillStyle=gr;rr(ctx,(W-tw)/2,H*.78,tw,H*.05,99);ctx.fill();
    ctx.fillStyle="#05060f";ctx.textBaseline="middle";ctx.fillText(btn,W/2,H*.805);
    ctx.globalAlpha=1;
  }

  else { // OUTRO — Tavsiya akkaunt uslubida
    const handle=d.outroHandle||"@youraccount";
    const role=d.outroRole||"Foydali topilmalar";
    const letter=(handle.replace(/^@/,"")[0]||"N").toUpperCase();

    const cy=H*.22;
    ctx.save();ctx.globalAlpha=sp;ctx.translate((1-sp)*50,0);
    ctx.fillStyle="rgba(255,255,255,.06)";ctx.strokeStyle="rgba(255,255,255,.25)";ctx.lineWidth=1.5;
    rr(ctx,W*.07,cy,W*.86,H*.13,18);ctx.fill();ctx.stroke();

    const ax=W*.18,ay=cy+H*.065,ar=W*.055;
    ctx.save();ctx.translate(ax,ay);ctx.rotate(sec*1.1);
    ctx.strokeStyle=ac;ctx.globalAlpha=.5*sp;ctx.lineWidth=2.5;ctx.setLineDash([6,8]);
    ctx.beginPath();ctx.arc(0,0,ar+10,0,6.28);ctx.stroke();ctx.setLineDash([]);ctx.restore();

    ctx.fillStyle=metalGrad(ctx,ax,ay,ar,ac);
    ctx.beginPath();ctx.arc(ax,ay,ar,0,6.28);ctx.fill();
    ctx.fillStyle="#0a0c18";ctx.font=`bold ${Math.floor(W*.05)}px system-ui`;
    ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(letter,ax,ay+1);

    ctx.fillStyle="#fff";ctx.font=`bold ${Math.floor(W*.04)}px system-ui`;ctx.textAlign="left";
    ctx.fillText(handle.slice(0,18),W*.28,cy+H*.045);
    ctx.fillStyle="#a0aabc";ctx.font=`${Math.floor(W*.026)}px system-ui`;
    ctx.fillText(role.slice(0,24),W*.28,cy+H*.085);
    ctx.restore();

    ctx.textAlign="center";
    ctx.fillStyle=ac;ctx.globalAlpha=sp;
    ctx.font=`bold ${Math.floor(W*.026)}px system-ui`;
    ctx.fillText("YANA FOYDALI TOPILMALAR",W/2,H*.48);

    ctx.fillStyle="#fff";ctx.font=`bold ${Math.floor(W*.05)}px system-ui`;
    ctx.fillText("Obuna bo‘ling",W/2,H*.58);

    ctx.globalAlpha=sp;
    const cta="Kuzatish ↗";
    ctx.font=`bold ${Math.floor(W*.03)}px system-ui`;
    const tw=ctx.measureText(cta).width+W*.12;
    const gr=ctx.createLinearGradient((W-tw)/2,0,(W+tw)/2,0);
    gr.addColorStop(0,ac);gr.addColorStop(.5,"#ffffffcc");gr.addColorStop(1,"#38bdf8");
    ctx.fillStyle=gr;rr(ctx,(W-tw)/2,H*.72,tw,H*.05,99);ctx.fill();
    ctx.fillStyle="#05060f";ctx.textBaseline="middle";ctx.fillText(cta,W/2,H*.745);
    ctx.globalAlpha=1;
  }
}

/* ---------- Main draw ---------- */
function drawFrame(ctx,W,H,t){
  const d=S.data||{};
  const mode=S.mode;
  const ac=ACCENT[mode];
  const sec=Math.max(0,t/1000);

  drawBG(ctx,W,H,sec,ac,mode);

  if(mode==="manba"){
    // multi-scene timing
    const total=S.manbaScenes*S.sceneDur;
    const local=sec%total;
    S.scene=Math.min(S.manbaScenes-1,Math.floor(local/S.sceneDur));
    updateDots();
    const sceneT=(local%S.sceneDur)/S.sceneDur;
    const p=ease(Math.min(1,sceneT*2.2)); // enter animation
    drawManbaScene(ctx,W,H,d,ac,p,sec,S.scene);
  } else {
    const p=ease((sec%3.6)/1.2);
    if(mode==="tavsiya") drawTavsiya(ctx,W,H,d,ac,p,sec);
    else if(mode==="fakt") drawFakt(ctx,W,H,d,ac,p,sec);
    else drawIbora(ctx,W,H,d,ac,p,sec);
  }
}

function ensure(c,ctx,w,h){
  const dpr=Math.min(devicePixelRatio||1,2);
  const nw=Math.floor(w*dpr),nh=Math.floor(h*dpr);
  if(c.width!==nw||c.height!==nh){c.width=nw;c.height=nh;ctx.setTransform(dpr,0,0,dpr,0,0);}
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

function loop(now){S.raf=requestAnimationFrame(loop);draw(now);}
function startLoop(){cancelAnimationFrame(S.raf);S.raf=requestAnimationFrame(loop);}

function updateBtns(){
  const label=S.playing?"⏸ Pauza":"▶ Ko‘rish";
  if($("play"))$("play").textContent=label;
  if($("recPlay"))$("recPlay").textContent=S.playing?"⏸":"▶";
}
function stop(){S.playing=false;updateBtns();}
function toggle(){S.playing=!S.playing;S.t0=performance.now();updateBtns();}

$("play").onclick=toggle;
$("rec").onclick=()=>{
  S.t0=performance.now();S.playing=true;updateBtns();
  $("recLayer").hidden=false;
  $("recLabel").textContent="RECORDING · 9:16 · "+(MODES[S.mode]?.tag||"NEX");
};
$("recClose").onclick=()=>{$("recLayer").hidden=true;stop();};
$("recPlay").onclick=toggle;

initParts();
console.log("NEX multi-scene manba ready");
})();
