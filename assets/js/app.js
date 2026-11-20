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
  images:{},
  scene:0,
  sceneDur:3.4,
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

function show(id){$$(".scr").forEach(s=>s.classList.toggle("on",s.id===id));}
$$(".mcard").forEach(b=>b.onclick=()=>openMode(b.dataset.mode));
$("back").onclick=()=>{stop();show("home");$("sceneDots").hidden=true;};

function openMode(key){
  S.mode=key;S.scene=0;
  const m=MODES[key];
  $("modeName").textContent=m.name;
  $("modeTag").textContent=m.tag;
  document.documentElement.style.setProperty("--accent",ACCENT[key]);
  const col=$("formCol");col.innerHTML="";
  m.fields.forEach(f=>{
    if(f.sec){const s=document.createElement("div");s.className="section-label";s.textContent=f.sec;col.appendChild(s);return;}
    const lab=document.createElement("label");lab.textContent=f.l;
    if(f.file){
      const inp=document.createElement("input");inp.type="file";inp.accept="image/*";inp.id="f_"+f.id;
      inp.onchange=e=>{const file=e.target.files&&e.target.files[0];if(!file)return;const img=new Image();img.onload=()=>{S.images[f.id]=img;collect();};img.src=URL.createObjectURL(file);};
      lab.appendChild(inp);
    } else {
      const inp=document.createElement(f.ta?"textarea":"input");
      if(!f.ta)inp.type="text";else inp.rows=2;
      inp.id="f_"+f.id;inp.placeholder=f.p||"";inp.oninput=collect;lab.appendChild(inp);
    }
    col.appendChild(lab);
  });
  const btn=document.createElement("button");btn.className="btn primary";btn.textContent="Yangilash";btn.style.marginTop="4px";btn.onclick=collect;col.appendChild(btn);
  const dots=$("sceneDots");
  if(m.multi){dots.hidden=false;dots.innerHTML="";for(let i=0;i<S.manbaScenes;i++){const sp=document.createElement("span");if(i===0)sp.className="on";dots.appendChild(sp);}}
  else dots.hidden=true;
  show("editor");collect();initParts();S.t0=performance.now();S.playing=true;updateBtns();startLoop();
}

function collect(){
  const m=MODES[S.mode];const d={};
  m.fields.forEach(f=>{if(f.sec||f.file)return;const el=$("f_"+f.id);d[f.id]=el?el.value.trim():"";});
  S.data=d;
}
function updateDots(){
  const dots=$("sceneDots");if(dots.hidden)return;
  [...dots.children].forEach((sp,i)=>sp.classList.toggle("on",i===S.scene));
}

function initParts(){
  S.particles=Array.from({length:60},()=>({x:Math.random(),y:Math.random(),r:.8+Math.random()*2.5,v:.08+Math.random()*.4,a:Math.random()*6.28,s:.4+Math.random()}));
  S.blobs=[{cx:.72,cy:.28,rx:.2,ry:.16,rot:0,speed:.35},{cx:.28,cy:.65,rx:.16,ry:.13,rot:1.2,speed:-.25},{cx:.55,cy:.78,rx:.13,ry:.1,rot:2.4,speed:.4}];
}

function rr(ctx,x,y,w,h,r){const R=Math.min(r,w/2,h/2);ctx.beginPath();ctx.moveTo(x+R,y);ctx.arcTo(x+w,y,x+w,y+h,R);ctx.arcTo(x+w,y+h,x,y+h,R);ctx.arcTo(x,y+h,x,y,R);ctx.arcTo(x,y,x+w,y,R);ctx.closePath();}
function wrap(ctx,text,max){const words=String(text||"").split(/\s+/);const lines=[];let line="";for(const w of words){const t=line?line+" "+w:w;if(line&&ctx.measureText(t).width>max){lines.push(line);line=w;}else line=t;}if(line)lines.push(line);return lines;}
function ease(t){t=Math.min(1,Math.max(0,t));return 1-Math.pow(1-t,3);}
function metalGrad(ctx,x,y,r,base){const g=ctx.createRadialGradient(x-r*.35,y-r*.4,r*.05,x,y,r);g.addColorStop(0,"#ffffffcc");g.addColorStop(.18,base);g.addColorStop(.45,"#ffffff33");g.addColorStop(.7,base);g.addColorStop(1,"#00000055");return g;}

function drawLiquidBlob(ctx,W,H,blob,sec,ac){
  const cx=blob.cx*W+Math.sin(sec*blob.speed)*W*.04,cy=blob.cy*H+Math.cos(sec*blob.speed*.8)*H*.03;
  const rx=blob.rx*W*(.9+Math.sin(sec*1.3+blob.rot)*.12),ry=blob.ry*H*(.9+Math.cos(sec*1.1+blob.rot)*.12),rot=blob.rot+sec*blob.speed*.6;
  ctx.save();ctx.translate(cx,cy);ctx.rotate(rot);
  ctx.globalAlpha=.15;const glow=ctx.createRadialGradient(0,0,0,0,0,Math.max(rx,ry)*1.5);glow.addColorStop(0,ac);glow.addColorStop(1,"transparent");ctx.fillStyle=glow;ctx.beginPath();ctx.ellipse(0,0,rx*1.4,ry*1.4,0,0,6.28);ctx.fill();
  ctx.globalAlpha=.8;const body=ctx.createLinearGradient(-rx,-ry,rx,ry);body.addColorStop(0,"#ffffffaa");body.addColorStop(.3,ac);body.addColorStop(.6,"#ffffff44");body.addColorStop(1,"#00000066");ctx.fillStyle=body;ctx.beginPath();ctx.ellipse(0,0,rx,ry,0,0,6.28);ctx.fill();
  ctx.globalAlpha=.5;const hi=ctx.createRadialGradient(-rx*.4,-ry*.4,0,0,0,rx*.7);hi.addColorStop(0,"#ffffffdd");hi.addColorStop(1,"transparent");ctx.fillStyle=hi;ctx.beginPath();ctx.ellipse(-rx*.15,-ry*.2,rx*.5,ry*.35,-.4,0,6.28);ctx.fill();
  ctx.restore();ctx.globalAlpha=1;
}
function drawImg(ctx,img,x,y,w,h,r){
  if(!img||!img.complete)return;
  ctx.save();rr(ctx,x,y,w,h,r||12);ctx.clip();
  const s=Math.max(w/img.width,h/img.height);const dw=img.width*s,dh=img.height*s;
  ctx.drawImage(img,x+(w-dw)/2,y+(h-dh)/2,dw,dh);ctx.restore();
}

/* Tavsiya uslubidagi yordamchi: glass card + avatar */
function drawProfileCard(ctx,W,H,cy,title,subtitle,letter,ac,p,sec){
  ctx.save();ctx.globalAlpha=p;ctx.translate((1-p)*50,0);
  ctx.fillStyle="rgba(255,255,255,.06)";ctx.strokeStyle="rgba(255,255,255,.25)";ctx.lineWidth=1.5;
  rr(ctx,W*.07,cy,W*.86,H*.125,18);ctx.fill();ctx.stroke();
  // accent line
  ctx.strokeStyle=ac;ctx.globalAlpha=.5*p;ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(W*.07,cy+H*.125);ctx.lineTo(W*.07+W*.86*p,cy+H*.125);ctx.stroke();ctx.globalAlpha=p;
  const ax=W*.18,ay=cy+H*.062,ar=W*.055;
  ctx.save();ctx.translate(ax,ay);ctx.rotate(sec*1.1);
  ctx.strokeStyle=ac;ctx.globalAlpha=.55*p;ctx.lineWidth=2.5;ctx.setLineDash([6,8]);
  ctx.beginPath();ctx.arc(0,0,ar+10,0,6.28);ctx.stroke();ctx.setLineDash([]);ctx.restore();
  ctx.fillStyle=metalGrad(ctx,ax,ay,ar,ac);ctx.beginPath();ctx.arc(ax,ay,ar,0,6.28);ctx.fill();
  ctx.fillStyle="#0a0c18";ctx.font=`bold ${Math.floor(W*.05)}px system-ui`;ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(letter,ax,ay+1);
  ctx.fillStyle="#fff";ctx.font=`bold ${Math.floor(W*.038)}px system-ui`;ctx.textAlign="left";
  ctx.fillText(String(title).slice(0,18),W*.28,cy+H*.042);
  ctx.fillStyle="#a0aabc";ctx.font=`${Math.floor(W*.026)}px system-ui`;
  ctx.fillText(String(subtitle).slice(0,24),W*.28,cy+H*.08);
  ctx.restore();
}

function drawOrbit(ctx,W,H,ac,p,sec){
  ctx.save();ctx.translate(W*.8,H*.36);ctx.rotate(sec*.7);
  ctx.strokeStyle=ac;ctx.globalAlpha=.3*p;ctx.lineWidth=1.8;ctx.setLineDash([7,9]);
  ctx.beginPath();ctx.arc(0,0,W*.11,0,6.28);ctx.stroke();
  ctx.beginPath();ctx.arc(0,0,W*.07,0,6.28);ctx.stroke();
  ctx.restore();
}

function drawCTA(ctx,W,H,text,ac,p,y){
  y=y||H*.84;
  ctx.globalAlpha=p;
  ctx.font=`bold ${Math.floor(W*.03)}px system-ui`;
  const tw=ctx.measureText(text).width+W*.12;
  const gr=ctx.createLinearGradient((W-tw)/2,0,(W+tw)/2,0);
  gr.addColorStop(0,ac);gr.addColorStop(.5,"#ffffffcc");gr.addColorStop(1,"#38bdf8");
  ctx.fillStyle=gr;rr(ctx,(W-tw)/2,y,tw,H*.05,99);ctx.fill();
  ctx.globalAlpha=.35*p;
  const shine=ctx.createLinearGradient((W-tw)/2,y,(W-tw)/2,y+H*.025);
  shine.addColorStop(0,"#ffffffaa");shine.addColorStop(1,"transparent");
  ctx.fillStyle=shine;rr(ctx,(W-tw)/2,y,tw,H*.025,99);ctx.fill();
  ctx.globalAlpha=p;ctx.fillStyle="#05060f";ctx.textAlign="center";ctx.textBaseline="middle";
  ctx.fillText(text,W/2,y+H*.025);ctx.globalAlpha=1;
}

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
    const x=pt.x*W+Math.sin(sec*pt.v+pt.a)*16,y=((pt.y+sec*pt.v*.025)%1.35)*H-H*.1;
    const a=.12+.4*Math.abs(Math.sin(sec*pt.s+pt.a));
    ctx.globalAlpha=a;ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(x,y,pt.r*.35*(W/360),0,6.28);ctx.fill();
    ctx.globalAlpha=a*.5;ctx.fillStyle=ac;ctx.beginPath();ctx.arc(x,y,pt.r*1.2*(W/360),0,6.28);ctx.fill();
  });ctx.globalAlpha=1;
}

function drawTavsiya(ctx,W,H,d,ac,p,sec){
  const handle=d.handle||"@akkaunt";
  const letter=(handle.replace(/^@/,"")[0]||"N").toUpperCase();
  drawProfileCard(ctx,W,H,H*.17,handle,d.role||"Tavsiya",letter,ac,p,sec);
  drawOrbit(ctx,W,H,ac,p,sec);
  ctx.textAlign="center";ctx.fillStyle=ac;ctx.globalAlpha=p;
  ctx.font=`bold ${Math.floor(W*.026)}px system-ui`;ctx.fillText("TAVSIYA",W/2,H*.39);
  ctx.fillStyle="#fff";ctx.font=`bold ${Math.floor(W*.056)}px system-ui`;
  wrap(ctx,d.hook||"Bu akkauntni ko‘rishga arziydi",W*.82).slice(0,3).forEach((ln,i)=>{ctx.globalAlpha=ease(p-i*.1);ctx.fillText(ln,W/2,H*.47+i*W*.072);});
  ctx.globalAlpha=p*.88;ctx.fillStyle="#c8d0dc";ctx.font=`${Math.floor(W*.03)}px system-ui`;
  wrap(ctx,d.why||"Foydali kontent",W*.8).slice(0,3).forEach((ln,i)=>ctx.fillText(ln,W/2,H*.67+i*W*.04));
  drawCTA(ctx,W,H,d.cta||"Obuna bo‘ling",ac,p,H*.84);
}

function drawFakt(ctx,W,H,d,ac,p,sec){
  ctx.save();ctx.translate(W/2,H*.23);ctx.rotate((1-p)*-.3+Math.sin(sec*1.8)*.03);
  const sc=.55+.45*p;ctx.scale(sc,sc);
  ctx.globalAlpha=.25*p;const g=ctx.createRadialGradient(0,0,W*.08,0,0,W*.18);g.addColorStop(0,ac);g.addColorStop(1,"transparent");ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,W*.18,0,6.28);ctx.fill();
  ctx.globalAlpha=p;ctx.strokeStyle=ac;ctx.lineWidth=4;ctx.setLineDash([12,9]);ctx.beginPath();ctx.arc(0,0,W*.12,0,6.28);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle=metalGrad(ctx,0,0,W*.085,ac);ctx.beginPath();ctx.arc(0,0,W*.08,0,6.28);ctx.fill();
  ctx.fillStyle="#0a0c18";ctx.font=`bold ${Math.floor(W*.03)}px system-ui`;ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText((d.num||"FAKT").slice(0,10),0,0);ctx.restore();
  ctx.textAlign="center";ctx.fillStyle="#fff";ctx.font=`bold ${Math.floor(W*.052)}px system-ui`;
  wrap(ctx,d.title||"Qiziqarli fakt",W*.84).slice(0,4).forEach((ln,i)=>{ctx.globalAlpha=ease(p-i*.08);ctx.fillText(ln,W/2,H*.44+i*W*.068);});
  ctx.globalAlpha=p*.85;ctx.fillStyle="#c8d0dc";ctx.font=`${Math.floor(W*.03)}px system-ui`;
  wrap(ctx,d.detail||"",W*.8).slice(0,3).forEach((ln,i)=>ctx.fillText(ln,W/2,H*.72+i*W*.04));ctx.globalAlpha=1;
}

function drawIbora(ctx,W,H,d,ac,p,sec){
  ctx.globalAlpha=.14*p;ctx.fillStyle=ac;ctx.font=`bold ${Math.floor(W*.26)}px Georgia,serif`;ctx.textAlign="center";ctx.fillText("\u201C",W/2,H*.27);ctx.globalAlpha=1;
  ctx.fillStyle="#fff";ctx.font=`bold ${Math.floor(W*.05)}px Georgia,serif`;
  wrap(ctx,d.quote||"Kichik qadamlar katta o‘zgarishlarni yaratadi.",W*.82).slice(0,5).forEach((ln,i)=>{ctx.globalAlpha=ease(p-i*.09);ctx.fillText(ln,W/2,H*.37+i*W*.065+Math.sin(sec*1.4+i)*.6*(W/360));});
  ctx.globalAlpha=p;ctx.fillStyle=ac;ctx.font=`${Math.floor(W*.028)}px system-ui`;ctx.fillText("— "+(d.author||"Noma’lum"),W/2,H*.77);
  ctx.strokeStyle=ac;ctx.globalAlpha=.4*p;ctx.lineWidth=1.8;ctx.beginPath();ctx.moveTo(W*.28,H*.82);ctx.lineTo(W*.72,H*.82);ctx.stroke();ctx.globalAlpha=1;
}

/* ========== MANBA = TAVSIYA USLUBI (barcha sahnlar) ========== */
function drawManbaScene(ctx,W,H,d,ac,p,sec,scene){
  const sp=ease(p);

  // 0 INTRO — xuddi Tavsiya hook qismi
  if(scene===0){
    drawOrbit(ctx,W,H,ac,sp,sec);
    ctx.textAlign="center";ctx.fillStyle=ac;ctx.globalAlpha=sp;
    ctx.font=`bold ${Math.floor(W*.026)}px system-ui`;ctx.fillText("FOYDALI MANBA",W/2,H*.32);
    ctx.fillStyle="#fff";ctx.font=`bold ${Math.floor(W*.056)}px system-ui`;
    wrap(ctx,d.hook||"Bu manbani bilasizmi?",W*.82).slice(0,4).forEach((ln,i)=>{
      ctx.globalAlpha=ease(sp-i*.1);ctx.fillText(ln,W/2,H*.44+i*W*.072);
    });
    ctx.globalAlpha=1;
  }

  // 1 ASOSIY — profile card + rasm (Tavsiya card uslubi)
  else if(scene===1){
    const name=d.name||"Manba";
    const letter=(name[0]||"M").toUpperCase();
    drawProfileCard(ctx,W,H,H*.12,name,(d.type||"MANBA").toUpperCase(),letter,ac,sp,sec);
    drawOrbit(ctx,W,H,ac,sp,sec);

    const iw=W*.72,ih=H*.36,ix=(W-iw)/2,iy=H*.32;
    ctx.globalAlpha=sp;
    ctx.fillStyle="rgba(255,255,255,.06)";ctx.strokeStyle="rgba(255,255,255,.25)";ctx.lineWidth=1.5;
    rr(ctx,ix,iy,iw,ih,16);ctx.fill();ctx.stroke();
    if(S.images.imgMain) drawImg(ctx,S.images.imgMain,ix+4,iy+4,iw-8,ih-8,14);
    else {
      ctx.fillStyle="#1a2030";rr(ctx,ix+4,iy+4,iw-8,ih-8,14);ctx.fill();
      ctx.fillStyle="#6b7280";ctx.font=`${Math.floor(W*.028)}px system-ui`;ctx.textAlign="center";
      ctx.fillText("Rasm yuklang",W/2,iy+ih/2);
    }
    ctx.globalAlpha=sp*.9;ctx.fillStyle="#c8d0dc";ctx.font=`${Math.floor(W*.03)}px system-ui`;ctx.textAlign="center";
    wrap(ctx,d.mainDesc||"",W*.78).slice(0,2).forEach((ln,i)=>ctx.fillText(ln,W/2,H*.74+i*W*.04));
    ctx.globalAlpha=1;
  }

  // 2 NIMA UCHUN — Tavsiya kicker + title + 2 glass rasm
  else if(scene===2){
    drawOrbit(ctx,W,H,ac,sp,sec);
    ctx.textAlign="center";ctx.fillStyle=ac;ctx.globalAlpha=sp;
    ctx.font=`bold ${Math.floor(W*.026)}px system-ui`;ctx.fillText("NIMA UCHUN?",W/2,H*.14);
    ctx.fillStyle="#fff";ctx.font=`bold ${Math.floor(W*.048)}px system-ui`;
    wrap(ctx,d.whyText||"Amaliy va tushunarli",W*.82).slice(0,3).forEach((ln,i)=>{
      ctx.globalAlpha=ease(sp-i*.1);ctx.fillText(ln,W/2,H*.22+i*W*.06);
    });
    const gap=W*.04,iw=(W*.86-gap)/2,ih=H*.3,iy=H*.42;
    [S.images.imgWhy1,S.images.imgWhy2].forEach((img,i)=>{
      const ix=W*.07+i*(iw+gap);
      ctx.globalAlpha=ease(sp-.12-i*.1);
      ctx.fillStyle="rgba(255,255,255,.06)";ctx.strokeStyle="rgba(255,255,255,.25)";ctx.lineWidth=1.4;
      rr(ctx,ix,iy,iw,ih,16);ctx.fill();ctx.stroke();
      if(img) drawImg(ctx,img,ix+3,iy+3,iw-6,ih-6,14);
      else {ctx.fillStyle="#1a2030";rr(ctx,ix+3,iy+3,iw-6,ih-6,14);ctx.fill();
        ctx.fillStyle="#6b7280";ctx.font=`${Math.floor(W*.022)}px system-ui`;ctx.textAlign="center";ctx.fillText("Rasm "+(i+1),ix+iw/2,iy+ih/2);}
    });
    ctx.globalAlpha=1;
  }

  // 3 USTUNLIGI — Tavsiya card list uslubi
  else if(scene===3){
    drawOrbit(ctx,W,H,ac,sp,sec);
    ctx.textAlign="center";ctx.fillStyle=ac;ctx.globalAlpha=sp;
    ctx.font=`bold ${Math.floor(W*.026)}px system-ui`;ctx.fillText("USTUNLIGI",W/2,H*.16);
    const pts=(d.ustun||"").split(/\n+/).map(x=>x.trim()).filter(Boolean).slice(0,5);
    const list=pts.length?pts:["Bepul kontent","Amaliy misollar","Muntazam yangilanadi"];
    list.forEach((item,i)=>{
      const q=ease(sp-i*.12);const y=H*.26+i*H*.1;
      ctx.globalAlpha=q;
      ctx.fillStyle="rgba(255,255,255,.06)";ctx.strokeStyle="rgba(255,255,255,.25)";ctx.lineWidth=1.4;
      rr(ctx,W*.07,y,W*.86,H*.08,16);ctx.fill();ctx.stroke();
      const nx=W*.17,ny=y+H*.04;
      ctx.fillStyle=metalGrad(ctx,nx,ny,W*.028,ac);ctx.beginPath();ctx.arc(nx,ny,W*.028,0,6.28);ctx.fill();
      ctx.fillStyle="#05060f";ctx.font=`bold ${Math.floor(W*.026)}px system-ui`;ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(String(i+1),nx,ny);
      ctx.fillStyle="#f0f7ff";ctx.font=`bold ${Math.floor(W*.032)}px system-ui`;ctx.textAlign="left";ctx.fillText(item.slice(0,26),W*.26,ny);
    });
    ctx.globalAlpha=1;
  }

  // 4 CHORLOV — Tavsiya CTA + 2 kichik rasm burchakda
  else if(scene===4){
    const sw=W*.2,sh=W*.2,gap=10;
    [S.images.imgCta1,S.images.imgCta2].forEach((img,i)=>{
      const ix=W*.72,iy=H*.1+i*(sh+gap);
      ctx.globalAlpha=ease(sp-i*.1);
      ctx.fillStyle="rgba(255,255,255,.06)";ctx.strokeStyle="rgba(255,255,255,.25)";ctx.lineWidth=1.3;
      rr(ctx,ix,iy,sw,sh,14);ctx.fill();ctx.stroke();
      if(img) drawImg(ctx,img,ix+2,iy+2,sw-4,sh-4,12);
      else {ctx.fillStyle="#1a2030";rr(ctx,ix+2,iy+2,sw-4,sh-4,12);ctx.fill();}
    });
    drawOrbit(ctx,W,H,ac,sp,sec);
    ctx.textAlign="center";ctx.fillStyle=ac;ctx.globalAlpha=sp;
    ctx.font=`bold ${Math.floor(W*.026)}px system-ui`;ctx.fillText("CHORLOV",W/2,H*.42);
    ctx.fillStyle="#fff";ctx.font=`bold ${Math.floor(W*.056)}px system-ui`;
    wrap(ctx,d.cta||"Hozir ko‘rib chiqing",W*.7).slice(0,3).forEach((ln,i)=>{
      ctx.globalAlpha=ease(sp-i*.1);ctx.fillText(ln,W/2,H*.52+i*W*.07);
    });
    drawCTA(ctx,W,H,"Ko‘rish ↗",ac,sp,H*.78);
  }

  // 5 OUTRO — to‘liq Tavsiya akkaunt nusxasi
  else {
    const handle=d.outroHandle||"@youraccount";
    const role=d.outroRole||"Foydali topilmalar";
    const letter=(handle.replace(/^@/,"")[0]||"N").toUpperCase();
    drawProfileCard(ctx,W,H,H*.2,handle,role,letter,ac,sp,sec);
    drawOrbit(ctx,W,H,ac,sp,sec);
    ctx.textAlign="center";ctx.fillStyle=ac;ctx.globalAlpha=sp;
    ctx.font=`bold ${Math.floor(W*.026)}px system-ui`;ctx.fillText("YANA FOYDALI TOPILMALAR",W/2,H*.42);
    ctx.fillStyle="#fff";ctx.font=`bold ${Math.floor(W*.052)}px system-ui`;
    ctx.fillText("Obuna bo‘ling",W/2,H*.52);
    ctx.globalAlpha=sp*.88;ctx.fillStyle="#c8d0dc";ctx.font=`${Math.floor(W*.03)}px system-ui`;
    ctx.fillText("Har kuni yangi manbalar",W/2,H*.6);
    drawCTA(ctx,W,H,"Kuzatish ↗",ac,sp,H*.72);
  }
}

function drawFrame(ctx,W,H,t){
  const d=S.data||{},mode=S.mode,ac=ACCENT[mode],sec=Math.max(0,t/1000);
  drawBG(ctx,W,H,sec,ac,mode);
  if(mode==="manba"){
    const total=S.manbaScenes*S.sceneDur,local=sec%total;
    S.scene=Math.min(S.manbaScenes-1,Math.floor(local/S.sceneDur));
    updateDots();
    const sceneT=(local%S.sceneDur)/S.sceneDur;
    const p=ease(Math.min(1,sceneT*2.2));
    drawManbaScene(ctx,W,H,d,ac,p,sec,S.scene);
  } else {
    const p=ease((sec%3.6)/1.2);
    if(mode==="tavsiya") drawTavsiya(ctx,W,H,d,ac,p,sec);
    else if(mode==="fakt") drawFakt(ctx,W,H,d,ac,p,sec);
    else drawIbora(ctx,W,H,d,ac,p,sec);
  }
}

function ensure(c,ctx,w,h){const dpr=Math.min(devicePixelRatio||1,2);const nw=Math.floor(w*dpr),nh=Math.floor(h*dpr);if(c.width!==nw||c.height!==nh){c.width=nw;c.height=nh;ctx.setTransform(dpr,0,0,dpr,0,0);}}
function draw(now){const t=now-S.t0;ensure(cv,cx,360,640);drawFrame(cx,360,640,t);const layer=$("recLayer");if(layer&&!layer.hidden){ensure(rcx,rx,1080,1920);drawFrame(rx,1080,1920,t);}}
function loop(now){S.raf=requestAnimationFrame(loop);draw(now);}
function startLoop(){cancelAnimationFrame(S.raf);S.raf=requestAnimationFrame(loop);}
function updateBtns(){const label=S.playing?"⏸ Pauza":"▶ Ko‘rish";if($("play"))$("play").textContent=label;if($("recPlay"))$("recPlay").textContent=S.playing?"⏸":"▶";}
function stop(){S.playing=false;updateBtns();}
function toggle(){S.playing=!S.playing;S.t0=performance.now();updateBtns();}

$("play").onclick=toggle;
$("rec").onclick=()=>{S.t0=performance.now();S.playing=true;updateBtns();$("recLayer").hidden=false;$("recLabel").textContent="RECORDING · 9:16 · "+(MODES[S.mode]?.tag||"NEX");};
$("recClose").onclick=()=>{$("recLayer").hidden=true;stop();};
$("recPlay").onclick=toggle;

initParts();
console.log("NEX manba = tavsiya style copy");
})();
