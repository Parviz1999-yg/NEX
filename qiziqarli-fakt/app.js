(()=>{
"use strict";
let THREE=null,renderer=null,recordRenderer=null,recordControlsTimer=0,scene=null,camera=null,root=null,raf=0,paused=false,playing=false,recording=false,playbackStarted=0,playbackElapsed=0,playbackRaf=0,sceneIndex=0,sceneVisualFrom=0,sceneVisualStarted=0,sceneDurations=[5000,5000,5000,5000,5000],sceneTexts=["","","","",""],sceneEdited=[false,false,false,false,false],sceneGroups=[],variant=0,selectedTone="Jiddiy",selectedVisual="cinematic",selectedPalette="silver",selectedMotion="Silliq",currentPage=1,pointerX=0,pointerY=0,hemisphereLight=null,keyLight=null,fillLight=null;
const $=id=>document.getElementById(id),val=id=>$(id)?.value?.trim()||"";
const kinds={"Ilmiy fakt":"Ilmiy dalil va tekshiriladigan manbaga tayangan da’vo.","Postulat (isbotsiz qabul qilinadigan)":"Nazariya doirasida boshlang‘ich asos sifatida qabul qilinadi; empirik isbotlangan fakt sifatida ko‘rsatilmaydi.","100 foiz ishonchli":"Mutlaq aniqlik kafolati emas; da’vo dalil va manbalar bilan asoslanadi.","Tekshiruvda":"Hali tasdiqlanmagan ma’lumot. Videoda tekshiruv jarayonida ekani ochiq aytiladi."};
const subjects=["Fizika","Biologiya","Tarix","Matematika","Astronomiya","Kimyo","Geografiya","Texnologiya","Psixologiya"];
const labels=["HOOK","FAKT E’LONI","MAZMUN","HOLAT","YAKUN"];
const palettes={silver:{bg:0x080e18,accent:0x8ed8ff},blue:{bg:0x06142c,accent:0x168cff},violet:{bg:0x160e30,accent:0x9876ff},emerald:{bg:0x061e20,accent:0x00d5b2},solar:{bg:0x211706,accent:0xffb52e}};
function status(id,msg){if($(id))$(id).textContent=msg;}
function showStep(n){currentPage=Math.max(1,Math.min(7,n));document.querySelectorAll(".wizard-page").forEach(p=>p.classList.toggle("active",p.id==="step-"+currentPage));document.querySelectorAll("[data-progress]").forEach(p=>{const i=Number(p.dataset.progress);p.classList.toggle("current",i===currentPage);p.classList.toggle("done",i<currentPage);});$("progressFill").style.width=((currentPage-1)/6*100)+"%";$("stepLabel").textContent=["01 — FAKT","02 — SSENARIY","03 — BAYON USLUBI","04 — VIZUAL TIL","05 — RANG PALETRASI","06 — ANIMATSIYA","07 — REELS STUDIYASI"][currentPage-1];window.scrollTo({top:0,behavior:"smooth"});if(currentPage===7){updateSummary();resize3D();}}
function choose(group,key){$(group).querySelectorAll("[data-value]").forEach(b=>b.classList.toggle("selected",b.dataset.value===key));}
function fieldName(){return $("field").value==="Boshqa"?val("customField"):$("field").value;}
function validate(n){if(n===1&&(!val("kind")||!fieldName()||!val("title"))){status("sourceStatus","Fakt tasnifi, fan sohasi va sarlavhani to‘ldiring.");return false;}if(n===2&&["hook","announce","bodyText","statusText","ending"].some(x=>!val(x))){status("scriptStatus","Barcha besh ssenariy qismini to‘ldiring.");return false;}return true;}
$("kind").addEventListener("change",()=>{$("kindHint").textContent=kinds[val("kind")]||"Tasnif tanlanganda uning mazmuniy izohi ko‘rsatiladi.";saveDraft();});
function saveDraft(){}
function restoreDraft(){try{sessionStorage.removeItem("nex-qf-draft-014");}catch(e){}$("customField").hidden=val("field")!=="Boshqa";$("kindHint").textContent=kinds[val("kind")]||"Tasnif tanlanganda uning mazmuniy izohi ko‘rsatiladi.";}
["kind","field","customField","title","source","evidence","review","hook","announce","bodyText","statusText","ending"].forEach(id=>$(id).addEventListener("input",()=>{saveDraft();if(currentPage===7)updateSummary();}));
$("field").addEventListener("change",()=>{$("customField").hidden=val("field")!=="Boshqa";if(renderer)build3D();});
$("nextSource").addEventListener("click",()=>{if(validate(1))showStep(2);});
$("nextScript").addEventListener("click",()=>{if(validate(2))showStep(3);});
document.querySelectorAll("[data-prev]").forEach(b=>b.addEventListener("click",()=>showStep(Number(b.dataset.prev))));
document.querySelectorAll("[data-next]").forEach(b=>b.addEventListener("click",()=>showStep(Number(b.dataset.next))));
$("toneOptions").querySelectorAll("[data-value]").forEach(b=>b.addEventListener("click",()=>{selectedTone=b.dataset.value;choose("toneOptions",selectedTone);renderTextLayer();}));
$("visualOptions").querySelectorAll("[data-value]").forEach(b=>b.addEventListener("click",()=>{selectedVisual=b.dataset.value;choose("visualOptions",selectedVisual);if(renderer)build3D();renderTextLayer();}));
$("paletteOptions").querySelectorAll("[data-value]").forEach(b=>b.addEventListener("click",()=>{selectedPalette=b.dataset.value;choose("paletteOptions",selectedPalette);applyPalette();renderTextLayer();}));
$("motionOptions").querySelectorAll("[data-value]").forEach(b=>b.addEventListener("click",()=>{selectedMotion=b.dataset.value;choose("motionOptions",selectedMotion);renderTextLayer();}));
$("openStudio").addEventListener("click",()=>{readSceneTexts();showStep(7);sceneIndex=0;playbackElapsed=0;sceneVisualStarted=performance.now();showScene(0);build3D();});
function readSceneTexts(){const a=[val("hook"),val("announce"),val("bodyText"),val("statusText"),val("ending")];a.forEach((v,i)=>{if(!sceneEdited[i])sceneTexts[i]=v;});}
function updateSummary(){const s=fieldName()||"Fan sohasi";$("summary").innerHTML="<b>"+escapeHtml(val("kind"))+"</b><br>"+escapeHtml(s)+"<br>"+escapeHtml(val("title"))+"<br><small>"+escapeHtml(selectedTone)+" · "+escapeHtml(selectedVisual)+" · "+escapeHtml(selectedPalette)+" · "+escapeHtml(selectedMotion)+"</small>";}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function showScene(i){const next=Math.max(0,Math.min(4,i));if(next!==sceneIndex){sceneVisualFrom=sceneIndex;sceneVisualStarted=performance.now();}sceneIndex=next;sceneGroups.forEach((g,j)=>g.visible=j===sceneIndex||j===sceneVisualFrom);$("sceneText").value=sceneTexts[sceneIndex]||"";$("sceneCounter").textContent="SAHNA "+String(sceneIndex+1).padStart(2,"0")+" / 05";$("sceneDuration").value=String(sceneDurations[sceneIndex]/1000);$("sceneDurationValue").textContent=(sceneDurations[sceneIndex]/1000).toFixed(1).replace(".",",")+" soniya";document.querySelectorAll(".scene-chip").forEach((b,j)=>b.classList.toggle("active",j===sceneIndex));renderTextLayer();refreshDuration();}
function renderSceneList(){const box=$("sceneList");box.innerHTML="";labels.forEach((label,i)=>{const b=document.createElement("button");b.type="button";b.className="scene-chip"+(i===sceneIndex?" active":"");b.textContent=String(i+1).padStart(2,"0");b.title=label;b.addEventListener("click",()=>{const was=playing;playbackElapsed=sceneDurations.slice(0,i).reduce((a,v)=>a+v,0);if(was)playbackStarted=performance.now()-playbackElapsed;showScene(i);updateProgress();});box.appendChild(b);});}
const OUTRO_DURATION=5200;function mainDuration(){return sceneDurations.reduce((a,b)=>a+b,0);}function fullDuration(){return mainDuration()+OUTRO_DURATION;}function refreshDuration(){const main=mainDuration(),total=fullDuration();$("durationSummary").textContent="Asosiy: "+(main/1000).toFixed(1).replace(".",",")+" soniya · 5 sahna + NEX outro: 5,2 soniya · Jami: "+(total/1000).toFixed(1).replace(".",",")+" soniya";$("recordDuration").textContent=(total/1000).toFixed(1).replace(".",",")+" soniya";}
function updateProgress(){const total=fullDuration();$("studioProgress").style.width=(playbackElapsed/total*100)+"%";const sec=Math.floor(playbackElapsed/1000);$("sceneTime").textContent=String(Math.floor(sec/60)).padStart(2,"0")+":"+String(sec%60).padStart(2,"0");if(playbackElapsed>=mainDuration())$("sceneCounter").textContent="NEX OUTRO · 5,2 SONIYA";}
function startPlayback(){if(playing){pausePlayback();return;}if(playbackElapsed>=fullDuration()){playbackElapsed=0;showScene(0);}playing=true;playbackStarted=performance.now()-playbackElapsed;$("startPreview").textContent="Ⅱ To‘xtatish";if(!playbackRaf)playbackRaf=requestAnimationFrame(playbackFrame);}
function pausePlayback(){if(playing)playbackElapsed=Math.min(fullDuration(),performance.now()-playbackStarted);playing=false;if(playbackRaf)cancelAnimationFrame(playbackRaf);playbackRaf=0;updateProgress();$("startPreview").textContent=playbackElapsed>=fullDuration()?"↺ Qayta ko‘rish":"▶ Davom etish";if($("recordPause"))$("recordPause").textContent=playing?"Ⅱ":"▶";renderTextLayer();}
function playbackFrame(now){if(!playing){playbackRaf=0;return;}const main=mainDuration(),total=fullDuration();playbackElapsed=Math.min(total,now-playbackStarted);if(playbackElapsed>=total){playbackElapsed=total;playing=false;playbackRaf=0;updateProgress();$("studioProgress").style.width="100%";$("sceneCounter").textContent="NEX OUTRO · YAKUN";$("startPreview").textContent="↺ Qayta ko‘rish";$("recordPause").textContent="↺";renderTextLayer();return;}if(playbackElapsed<main){let cursor=playbackElapsed,i=0;while(i<4&&cursor>=sceneDurations[i]){cursor-=sceneDurations[i];i++;}if(i!==sceneIndex)showScene(i);}else $("sceneCounter").textContent="NEX OUTRO · 5,2 SONIYA";updateProgress();renderTextLayer();playbackRaf=requestAnimationFrame(playbackFrame);}
function wrapLines(ctx,text,maxWidth){const words=String(text||"").split(/\s+/),lines=[];let line="";for(const word of words){const test=line?line+" "+word:word;if(line&&ctx.measureText(test).width>maxWidth){lines.push(line);line=word;}else line=test;}if(line)lines.push(line);return lines;}
function drawLiquidMetalBackground(ctx,now,accent){
 const t=now*.00022;
 const base=ctx.createLinearGradient(0,0,1080,1920);base.addColorStop(0,"#05080d");base.addColorStop(.28,"#26313d");base.addColorStop(.48,"#080d14");base.addColorStop(.72,"#35414d");base.addColorStop(1,"#05070b");ctx.fillStyle=base;ctx.fillRect(0,0,1080,1920);
 const bloom=(x,y,r,a)=>{const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,"rgba(245,250,255,"+a+")");g.addColorStop(.28,"rgba(153,174,192,"+(a*.48)+")");g.addColorStop(1,"rgba(20,30,42,0)");ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);};
 bloom(180+Math.sin(t*2)*90,340+Math.cos(t)*110,520,.34);bloom(930+Math.cos(t*1.4)*100,1120+Math.sin(t*1.8)*140,620,.3);bloom(280+Math.sin(t*1.2)*130,1740,420,.24);
 ctx.save();ctx.globalCompositeOperation="screen";
 for(let k=0;k<5;k++){const y=250+k*370+Math.sin(t*3+k)*95;ctx.beginPath();ctx.moveTo(-180,y);ctx.bezierCurveTo(120,y-210+Math.sin(t+k)*95,360,y+210,620,y-40+Math.cos(t*1.2+k)*140);ctx.bezierCurveTo(850,y-250,1040,y+160,1260,y-70);const g=ctx.createLinearGradient(0,y-190,0,y+190);g.addColorStop(0,"rgba(255,255,255,0)");g.addColorStop(.38,"rgba(230,241,250,.10)");g.addColorStop(.5,"rgba(255,255,255,.38)");g.addColorStop(.62,"rgba(132,157,178,.12)");g.addColorStop(1,"rgba(255,255,255,0)");ctx.strokeStyle=g;ctx.lineWidth=34+Math.sin(t+k)*12;ctx.shadowColor="#dceeff";ctx.shadowBlur=34;ctx.stroke();}
 ctx.restore();const tint=ctx.createRadialGradient(540+Math.sin(t)*180,960+Math.cos(t*.8)*260,20,540,960,1000);tint.addColorStop(0,accent+"20");tint.addColorStop(1,"rgba(0,0,0,0)");ctx.fillStyle=tint;ctx.fillRect(0,0,1080,1920);const vignette=ctx.createRadialGradient(540,930,260,540,960,1150);vignette.addColorStop(0,"rgba(3,8,15,0)");vignette.addColorStop(1,"rgba(0,0,0,.58)");ctx.fillStyle=vignette;ctx.fillRect(0,0,1080,1920);
}
function drawMercuryOutro(ctx,w,h,progress,now){
  const p=Math.max(0,Math.min(1,progress));
  const cover=Math.min(1,p/.62),fade=p<.62?1:Math.max(0,1-(p-.62)/.38);
  if(fade<=0)return;
  const edge=h*(1.08-cover*1.2);
  ctx.save();ctx.globalAlpha=fade;
  ctx.beginPath();ctx.moveTo(0,h);ctx.lineTo(0,edge);
  for(let x=0;x<=w+8;x+=8){
    const wave=Math.sin(x/w*Math.PI*3.2+now*.003)*h*.018+
      Math.sin(x/w*Math.PI*7.1-now*.0021)*h*.009;
    ctx.lineTo(x,edge+wave);
  }
  ctx.lineTo(w,h);ctx.closePath();
  const metal=ctx.createLinearGradient(0,Math.max(0,edge-h*.18),w,h);
  metal.addColorStop(0,"#343b43");metal.addColorStop(.16,"#e7edf1");
  metal.addColorStop(.29,"#7f8a94");metal.addColorStop(.43,"#fbfdff");
  metal.addColorStop(.58,"#9da8b1");metal.addColorStop(.76,"#f3f6f8");
  metal.addColorStop(1,"#414b55");
  ctx.fillStyle=metal;ctx.shadowColor="#dce7f0";ctx.shadowBlur=w*.055;ctx.fill();
  ctx.shadowBlur=0;
  for(let i=0;i<9;i++){
    const y=edge+h*(.045+i*.028),shift=Math.sin(now*.0018+i*1.7)*w*.08;
    ctx.beginPath();ctx.moveTo(-w*.1+shift,y);
    ctx.bezierCurveTo(w*.22+shift,y-h*.025,w*.64+shift,y+h*.025,w*1.1+shift,y-h*.008);
    ctx.strokeStyle=i%2?"#ffffff99":"#26313b88";
    ctx.lineWidth=Math.max(1,w*(i%3===0?.009:.003));ctx.stroke();
  }
  ctx.beginPath();ctx.moveTo(0,edge-h*.012);
  for(let x=0;x<=w+8;x+=8){
    const wave=Math.sin(x/w*Math.PI*3.2+now*.003)*h*.018+
      Math.sin(x/w*Math.PI*7.1-now*.0021)*h*.009;
    ctx.lineTo(x,edge+wave-h*.012);
  }
  ctx.strokeStyle="#111820cc";ctx.lineWidth=h*.012;ctx.stroke();
  ctx.restore();
}
function drawNEXOutroBrand(ctx,w,h,progress){
  const p=Math.max(0,Math.min(1,progress)),fade=Math.min(1,p/.14,Math.max(0,(1-p)/.1));
  if(fade<=0)return;
  const q=Math.max(0,Math.min(1,(p-.3)/.42));
  const paths=[
    [[-1.72,-.62],[-1.72,.68]],[[-1.72,.68],[-.72,-.62]],[[-.72,-.62],[-.72,.68]],
    [[-.42,-.62],[-.42,.68]],[[-.42,.68],[.38,.68]],[[-.42,.03],[.28,.03]],[[-.42,-.62],[.38,-.62]],
    [[.62,.68],[1.62,-.62]],[[.62,-.62],[1.62,.68]]
  ];
  ctx.save();ctx.globalAlpha=fade;ctx.translate(w*.5,h*.255);
  const scale=w*.15;ctx.scale(scale,-scale);
  const chrome=ctx.createLinearGradient(-1.8,-.7,1.8,.7);
  chrome.addColorStop(0,"#788794");chrome.addColorStop(.22,"#f8fcff");chrome.addColorStop(.48,"#aebbc6");chrome.addColorStop(.7,"#ffffff");chrome.addColorStop(1,"#65727e");
  ctx.strokeStyle=chrome;ctx.lineCap="round";ctx.lineJoin="round";ctx.lineWidth=.082;ctx.shadowColor="#dceaf5";ctx.shadowBlur=.075;
  paths.forEach((path,index)=>{
    const reveal=Math.max(0,Math.min(1,(p*1.22-index*.045)/.48));if(reveal<=0)return;
    const a=path[0],b=path[1];ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(a[0]+(b[0]-a[0])*reveal,a[1]+(b[1]-a[1])*reveal);ctx.stroke();
  });
  ctx.restore();
  ctx.save();ctx.globalAlpha=fade*.82;ctx.strokeStyle="#d9e5ee";ctx.lineWidth=w*.006;ctx.shadowColor="#dceaf5";ctx.shadowBlur=w*.018;
  ctx.beginPath();ctx.ellipse(w*.5,h*.255,w*.29,h*.052,-.2,Math.PI*.08,Math.PI*(.25+1.55*q));ctx.stroke();
  ctx.shadowBlur=0;ctx.fillStyle="#dce8f4";ctx.font="600 "+(w*.031)+"px system-ui";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText("Fikr va imkoniyatlar makoni",w*.5,h*.35);ctx.restore();
}
function drawParameterCard(ctx,accent,elapsed){
 const rows=[["TASNIF",val("kind")],["MANBA",val("source")],["DALIL",val("evidence")],["TEKSHIRUV",val("review")]];
 const x=58,y=105,w=964,rowH=100,h=72+rows.length*rowH;
 ctx.save();ctx.fillStyle="rgba(3,9,17,.88)";ctx.strokeStyle=accent;ctx.lineWidth=3;ctx.shadowColor=accent;ctx.shadowBlur=26;ctx.beginPath();ctx.roundRect(x,y,w,h,24);ctx.fill();ctx.stroke();ctx.shadowBlur=0;
 ctx.fillStyle=accent;ctx.font="900 25px system-ui";ctx.textAlign="left";ctx.textBaseline="middle";ctx.fillText("FAKT MA’LUMOTLARI",x+28,y+36);
 rows.forEach(([label,value],i)=>{
  const rowY=y+72+i*rowH,unlocked=sceneIndex>i||(sceneIndex===i&&elapsed>=220),progress=unlocked?Math.max(0,Math.min(1,(sceneIndex>i?1:(elapsed-220)/520))):0;
  ctx.strokeStyle="rgba(220,235,248,.18)";ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x+24,rowY+rowH);ctx.lineTo(x+w-24,rowY+rowH);ctx.stroke();
  ctx.fillStyle="#b9c9d8";ctx.font="850 23px system-ui";ctx.fillText(label,x+28,rowY+43);
  const sx=x+222,sy=rowY+13,sw=w-252,sh=72;
  ctx.save();ctx.translate(sx+sw/2,sy+sh/2);ctx.rotate((i%2?-.012:.012)*(progress||.35));ctx.globalAlpha=unlocked?progress:0.58;
  ctx.fillStyle=unlocked?"rgba(12,32,43,.78)":"rgba(255,255,255,.025)";ctx.strokeStyle=unlocked?accent:"rgba(205,220,235,.2)";ctx.lineWidth=unlocked?3:1.5;ctx.beginPath();ctx.roundRect(-sw/2,-sh/2,sw,sh,10);ctx.fill();ctx.stroke();
  ctx.fillStyle=unlocked?"#f6fbff":"#718196";ctx.font="750 24px system-ui";ctx.textAlign="left";ctx.textBaseline="middle";
  const stampText=value||"KIRITILMAGAN",lines=wrapLines(ctx,stampText,sw-34).slice(0,2);lines.forEach((line,j)=>ctx.fillText(line,-sw/2+18,-(lines.length-1)*14+j*28,sw-36));
  if(unlocked&&progress<1){ctx.globalAlpha=1-progress;ctx.strokeStyle="#ffffff";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-sw/2+12,sh/2-7);ctx.lineTo(-sw/2+12+progress*(sw-24),sh/2-7);ctx.stroke();}
  ctx.restore();
 });ctx.restore();
}

function toneProfile(){const p={"Jiddiy":{font:"800 82px system-ui",line:104,delay:120,stagger:190,reveal:360,offset:34,shadow:14,align:"center"},"Ilmiy":{font:"650 72px Georgia",line:96,delay:260,stagger:250,reveal:520,offset:14,shadow:5,align:"center"},"Sodda va tushunarli":{font:"750 78px system-ui",line:106,delay:80,stagger:150,reveal:320,offset:22,shadow:8,align:"center"},"Yumor":{font:"900 88px system-ui",line:112,delay:0,stagger:115,reveal:280,offset:52,shadow:18,align:"center",bounce:true},"Tahliliy":{font:"720 74px system-ui",line:100,delay:180,stagger:230,reveal:430,offset:18,shadow:7,align:"left"},"Motivatsion":{font:"900 88px system-ui",line:112,delay:0,stagger:145,reveal:330,offset:62,shadow:22,align:"center",rise:true},"Sirli va qiziqarli":{font:"750 82px Georgia",line:108,delay:420,stagger:220,reveal:560,offset:24,shadow:24,align:"center"},"Falsafiy":{font:"650 78px Georgia",line:108,delay:260,stagger:260,reveal:600,offset:12,shadow:4,align:"center"}};return p[selectedTone]||p.Jiddiy;}
function drawVisualFrame(ctx,now,accent){const t=now*.001;if(selectedVisual==="kinetic"){ctx.save();ctx.globalAlpha=.8;ctx.fillStyle=accent;ctx.fillRect(0,0,20,1920);ctx.fillRect(78,250,210,7);ctx.fillRect(78,1660,520,3);for(let i=0;i<5;i++){ctx.globalAlpha=.12;ctx.fillRect(780+i*46,240+i*170,8,1120-i*130);}ctx.restore();}else if(selectedVisual==="editorial"){ctx.save();ctx.strokeStyle=accent;ctx.globalAlpha=.75;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(92,300);ctx.lineTo(92,1600);ctx.moveTo(92,300);ctx.lineTo(390,300);ctx.moveTo(92,1600);ctx.lineTo(720,1600);ctx.stroke();ctx.globalAlpha=.35;ctx.fillStyle=accent;ctx.fillRect(128,270,8,8);ctx.restore();}else if(selectedVisual==="future"){ctx.save();ctx.strokeStyle=accent;ctx.globalAlpha=.2;ctx.lineWidth=2;for(let x=80;x<1080;x+=80){ctx.beginPath();ctx.moveTo(x,180);ctx.lineTo(x,1740);ctx.stroke();}for(let y=180;y<1800;y+=100){ctx.beginPath();ctx.moveTo(40,y);ctx.lineTo(1040,y);ctx.stroke();}ctx.globalAlpha=.9;ctx.lineWidth=5;const l=42;[[54,170,1,1],[1026,170,-1,1],[54,1750,1,-1],[1026,1750,-1,-1]].forEach(([x,y,sx,sy])=>{ctx.beginPath();ctx.moveTo(x+sx*l,y);ctx.lineTo(x,y);ctx.lineTo(x,y+sy*l);ctx.stroke();});ctx.restore();}else{ctx.save();ctx.strokeStyle=accent;ctx.globalAlpha=.35;ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(540,960,420+Math.sin(t)*12,690,0,0,Math.PI*2);ctx.stroke();ctx.restore();}}
function paintBackground(canvas){
 if(!canvas)return;const ctx=canvas.getContext("2d");if(!ctx)return;
 ctx.setTransform(canvas.width/1080,0,0,canvas.height/1920,0,0);ctx.clearRect(0,0,1080,1920);
 const now=performance.now(),main=mainDuration(),accent=({silver:"#dceaf5",blue:"#8ed8ff",violet:"#c8b9ff",emerald:"#9ff7e9",solar:"#ffe3a3"})[selectedPalette]||"#dceaf5";
 drawLiquidMetalBackground(ctx,now,accent);
 if(playbackElapsed>=main){const p=Math.max(0,Math.min(.96,(playbackElapsed-main)/OUTRO_DURATION));drawMercuryOutro(ctx,1080,1920,p,now);}
 else drawVisualFrame(ctx,now,accent);
}
function paintText(canvas){
 if(!canvas)return;const ctx=canvas.getContext("2d");if(!ctx)return;
 ctx.setTransform(canvas.width/1080,0,0,canvas.height/1920,0,0);ctx.clearRect(0,0,1080,1920);
 const now=performance.now(),main=mainDuration(),accent=({silver:"#dceaf5",blue:"#8ed8ff",violet:"#c8b9ff",emerald:"#9ff7e9",solar:"#ffe3a3"})[selectedPalette]||"#dceaf5";
 if(playbackElapsed>=main){const p=Math.max(0,Math.min(.96,(playbackElapsed-main)/OUTRO_DURATION));drawNEXOutroBrand(ctx,1080,1920,p);return;}
 const start=sceneDurations.slice(0,sceneIndex).reduce((a,b)=>a+b,0),elapsed=playing?Math.max(0,playbackElapsed-start):Math.max(0,now-sceneVisualStarted),tone=toneProfile(),motion=({Silliq:{reveal:1,stagger:1,offset:1},Dinamik:{reveal:.72,stagger:.7,offset:1.3},Kinematik:{reveal:1.35,stagger:1.2,offset:.65},Ijodiy:{reveal:.84,stagger:.82,offset:1.45},Aralash:{reveal:.96,stagger:.9,offset:1}})[selectedMotion]||{reveal:1,stagger:1,offset:1},align=selectedVisual==="kinetic"||selectedVisual==="future"||tone.align==="left"?"left":"center",x=align==="left"?(selectedVisual==="editorial"?150:120):540,text=sceneTexts[sceneIndex]||"";
 ctx.save();drawParameterCard(ctx,accent,elapsed);
 const font=selectedVisual==="editorial"?(tone.font.includes("Georgia")?tone.font:"italic 78px Georgia"):selectedVisual==="future"?"800 72px monospace":selectedVisual==="kinetic"?"950 94px system-ui":tone.font;
 ctx.font=font;ctx.textAlign=align;ctx.textBaseline="middle";
 const max=align==="left"?820:920,lines=wrapLines(ctx,text,max).slice(0,sceneIndex===4?4:7),lh=selectedVisual==="kinetic"?116:selectedVisual==="editorial"?96:tone.line,cy=1080,y0=cy-(lines.length-1)*lh/2,delay=(sceneIndex===1?1250:0)+tone.delay;
 lines.forEach((line,i)=>{const p=Math.max(0,Math.min(1,(elapsed-delay-tone.reveal*motion.reveal-i*tone.stagger*motion.stagger)/(tone.reveal*motion.reveal))),e=p*p*(3-2*p);ctx.save();ctx.globalAlpha=e;ctx.shadowColor=accent;ctx.shadowBlur=tone.shadow+(selectedVisual==="cinematic"?10:0);ctx.fillStyle=selectedVisual==="future"?accent:selectedVisual==="editorial"?"#f3eee6":"#fff";const offset=(tone.rise?-1:1)*tone.offset*motion.offset*(1-e),bounce=tone.bounce?Math.sin(elapsed*.012+i)*12*(1-e):0;ctx.translate(align==="left"?x-offset:x,y0+i*lh+offset+bounce);ctx.scale(.94+.06*e,.94+.06*e);ctx.fillText(line,0,0,max);ctx.restore();});
 ctx.restore();
}
function renderTextLayer(){paintBackground($("reelBgCanvas"));paintText($("reelCanvas"));if(recording){paintBackground($("recordBgCanvas"));paintText($("recordCanvas"));}}
function material(color,roughness=.48,metalness=.12){return new THREE.MeshStandardMaterial({color,roughness,metalness});}
function mesh(geometry,mat,x=0,y=0,z=0){const m=new THREE.Mesh(geometry,mat);m.position.set(x,y,z);root.add(m);return m;}
function sphere(x,y,z,r,color,detail=32){return mesh(new THREE.SphereGeometry(r,detail,detail),material(color),x,y,z);}
function lineBetween(a,b,radius,mat){const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b),d=new THREE.Vector3().subVectors(end,start);const obj=mesh(new THREE.CylinderGeometry(radius,radius,d.length(),10),mat);obj.position.copy(start).add(end).multiplyScalar(.5);obj.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return obj;}
function makeOrbit(radius,tilt,color){const o=mesh(new THREE.TorusGeometry(radius,.012,8,100),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.7}));o.rotation.x=tilt;return o;}
function clearRootContents(){if(!root)return;root.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose());});root.clear();}
function makeScene(subject){
 root=new THREE.Group();scene.add(root);const accent=({Fizika:0x62d8ff,Biologiya:0x70e0b2,Tarix:0xd9b27a,Matematika:0xb9a1ff,Astronomiya:0x7c9cff,Kimyo:0x74e5ef,Geografiya:0x78c6a3,Texnologiya:0x5edbff,Psixologiya:0xe39bc8})[subject]||0x78cfff;
 if(subject==="Astronomiya"){sphere(0,0,0,.72,0x2674c9,48);sphere(-.2,.3,.56,.16,0x62bfff);sphere(.35,-.22,.53,.11,0x1b4c91);const ring=makeOrbit(1.12,.28,0x8bcfff);root.userData.spin=ring;sphere(1.48,0,0,.13,0xd8e8ff,20);makeOrbit(1.5,.28,0x527fbb);}
 else if(subject==="Biologiya"){sphere(0,0,0,.95,0x3a9f91,40);mesh(new THREE.SphereGeometry(1.02,40,40),new THREE.MeshPhysicalMaterial({color:0x8af0d1,transparent:true,opacity:.16,roughness:.2,side:THREE.DoubleSide}));sphere(.12,.05,.48,.34,0x9d83ed);sphere(-.48,.35,.2,.13,0xf0b66e);sphere(.48,-.38,.18,.16,0xf0b66e);for(let i=0;i<18;i++){const a=i*2.399;sphere(Math.cos(a)*.72,Math.sin(a)*.72,.1,.035,0xc5fff0,10);}}
 else if(subject==="Kimyo"){const pts=[[0,0,0],[.75,.15,0],[-.65,.55,.1],[-.45,-.65,.25],[.25,-.55,-.25],[.1,.65,-.55]];for(let i=1;i<pts.length;i++)lineBetween(pts[0],pts[i],.045,material(0x8bbbd8,.35,.5));pts.forEach((p,i)=>sphere(...p,i===0?.23:.16,[0x6bd5ff,0xf3f6ff,0xf3f6ff,0xff8c7a,0xff8c7a,0xf3f6ff][i],24));}
 else if(subject==="Fizika"){sphere(0,0,0,.28,0xff9b69,28);[0,.75,1.5].forEach(rot=>{const o=makeOrbit(.8,rot,0x7acfff);o.rotation.y=rot;});for(let i=0;i<3;i++){const a=i*2.1;sphere(Math.cos(a)*.8,Math.sin(a)*.8,0,.085,0x7be2ff,18);}}
 else if(subject==="Geografiya"){sphere(0,0,0,1,0x2476c7,48);for(let i=0;i<5;i++){const lat=-.65+i*.32,r=Math.cos(lat),y=Math.sin(lat),band=mesh(new THREE.TorusGeometry(r,.025,6,80),new THREE.MeshBasicMaterial({color:0x79d6a5}));band.position.y=y;band.rotation.x=Math.PI/2;}const mer=mesh(new THREE.TorusGeometry(1.015,.012,6,80),new THREE.MeshBasicMaterial({color:0xb2e7ff,transparent:true,opacity:.7}));mer.rotation.y=.7;}
 else if(subject==="Texnologiya"){const board=mesh(new THREE.BoxGeometry(1.65,.16,1.35),material(0x164d60,.35,.65));board.position.y=-.18;const chip=mesh(new THREE.BoxGeometry(.7,.25,.7),material(0x25384e,.25,.8));chip.position.y=.08;for(let i=-2;i<=2;i++){lineBetween([i*.2,.08,-.55],[i*.2,.08,-.9],.018,material(accent));lineBetween([i*.2,.08,.55],[i*.2,.08,.9],.018,material(accent));}}
 else if(subject==="Tarix"){const stone=material(0xd6b989,.82,0);mesh(new THREE.BoxGeometry(1.9,.18,.9),stone,0,-.62,0);for(let i=-2;i<=2;i++)mesh(new THREE.CylinderGeometry(.105,.13,.95,20),stone,i*.34,-.05,0);mesh(new THREE.ConeGeometry(1.2,.48,4),stone,0,.68,0).rotation.y=Math.PI/4;}
 else if(subject==="Matematika"){const tor=mesh(new THREE.TorusKnotGeometry(.62,.18,120,16,2,3),new THREE.MeshStandardMaterial({color:accent,metalness:.55,roughness:.25}));root.userData.spin=tor;sphere(0,0,0,.08,0xffffff,16);}
 else if(subject==="Psixologiya"){const left=sphere(-.28,0,0,.58,0xd77db8,32);left.scale.set(.72,1,.72);const right=sphere(.28,0,0,.58,0x8c8ce5,32);right.scale.set(.72,1,.72);for(let i=0;i<7;i++){const ridge=mesh(new THREE.TorusGeometry(.28,.018,6,40),new THREE.MeshBasicMaterial({color:0xffd4ed}));ridge.position.set(-.3,-.42+i*.14,.25);ridge.scale.set(.75,.55,1);}}
 else{sphere(0,0,0,.72,accent,40);makeOrbit(1.08,.7,0x9bdfff);for(let i=0;i<6;i++){const a=i*Math.PI/3;sphere(Math.cos(a)*1.05,Math.sin(a)*.72,.1,.09,0xd9f4ff,16);}}
}
const semanticConcepts={blackHole:["qora tuynuk","black hole","hodisalar gorizonti","event horizon","gravitatsion kollaps","singulyarlik"],moon:["oy","oyning","luna","tabiiy yoldosh","oy krateri"],sun:["quyosh","solar","quyosh shamoli","termoyadro sintezi","yulduz energiyasi"],dna:["dnk","dna","dezoksiribonuklein","genetik kod","irsiy axborot","gen zanjiri"],water:["suv","h2o","vodorod","kislorod","suv molekulasi"],magnet:["magnit","magnet","magnit maydoni","qutblar","elektromagnit"],pyramid:["piramida","misr","firavn","qadimgi misr","ehrom"],pi:["pi soni","pi","aylana","doira","radius","diametr"],volcano:["vulqon","lava","magma","otilish","vulkan"],ai:["suniy intellekt","ai","neyron","mashinali organish","suniy neyron tarmoq"],memory:["xotira","memory","eslab qolish","eslash","mnemonik"]};
function normalizeQFText(value){return String(value||"").toLocaleLowerCase("uz").replace(/₂/g,"2").replace(/π/g," pi ").replace(/sun[’']iy/g,"suniy").replace(/fir[’']avn/g,"firavn").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g," ").trim();}
function conceptMatch(words,key){const source=" "+words+" ";return (semanticConcepts[key]||[]).some(term=>source.includes(" "+normalizeQFText(term)+" "));}
function addFactSpecificObject(subject){
 const raw=val("title")+" "+val("announce")+" "+val("bodyText")+" "+val("evidence"),words=normalizeQFText(raw);
 const glow=color=>new THREE.MeshStandardMaterial({color,emissive:color,emissiveIntensity:.45,metalness:.3,roughness:.28});
 const label=()=>{};
 if(subject==="Astronomiya"){
  if(conceptMatch(words,"blackHole")){clearRootContents();sphere(0,0,0,.42,0x02040b,48);const disk=mesh(new THREE.TorusGeometry(.92,.16,16,120),glow(0xff9c54));disk.rotation.x=.25;const halo=mesh(new THREE.TorusGeometry(.63,.035,8,100),new THREE.MeshBasicMaterial({color:0x7ddfff,transparent:true,opacity:.85}));halo.rotation.x=.25;label("QORA TUYNUK");}
  else if(conceptMatch(words,"moon")){clearRootContents();sphere(0,0,0,.78,0xb8c4d2,48);for(let i=0;i<12;i++){const a=i*2.4,cr=sphere(Math.cos(a)*.53,Math.sin(a)*.48,.53,.09+(i%3)*.025,0x75869b,16);cr.scale.z=.25;}label("OY SATHI");}
  else if(conceptMatch(words,"sun")){clearRootContents();sphere(0,0,0,.76,0xffb43d,48);const corona=mesh(new THREE.TorusGeometry(.98,.045,8,100),new THREE.MeshBasicMaterial({color:0xffd47a,transparent:true,opacity:.65}));corona.rotation.x=.8;label("QUYOSH");}else label("SAYYORA VA ORBITA");
 }else if(subject==="Biologiya"){
  if(conceptMatch(words,"dna")){clearRootContents();const bond=material(0xc4d9ef,.5,.2);for(let i=0;i<15;i++){const t=i*.42,y=-1.25+i*.18,x=Math.cos(t)*.48,z=Math.sin(t)*.48;sphere(x,y,z,.075,0x6edcff,14);sphere(-x,y,-z,.075,0xf09bc9,14);lineBetween([x,y,z],[-x,y,-z],.018,bond);}label("DNK QO‘SH SPIRALI");}else label("HUJAYRA TUZILISHI");
 }else if(subject==="Kimyo"){
  if(conceptMatch(words,"water")){clearRootContents();sphere(0,.1,0,.24,0xf2f7ff,24);sphere(-.48,-.28,0,.16,0xff6d77,24);sphere(.48,-.28,0,.16,0xff6d77,24);lineBetween([0,.1,0],[-.48,-.28,0],.045,material(0xb7d9f2));lineBetween([0,.1,0],[.48,-.28,0],.045,material(0xb7d9f2));label("H₂O MOLEKULASI");}else label("MOLEKULA MODELI");
 }else if(subject==="Fizika"){
  if(conceptMatch(words,"magnet")){clearRootContents();const n=mesh(new THREE.CylinderGeometry(.22,.22,.8,32),glow(0xff657a),-.48,0,0);n.rotation.z=Math.PI/2;const s=mesh(new THREE.CylinderGeometry(.22,.22,.8,32),glow(0x5e9fff),.48,0,0);s.rotation.z=Math.PI/2;for(let i=0;i<5;i++){const c=new THREE.EllipseCurve(0,0,.6+i*.13,.25+i*.1,0,Math.PI*2,false,0),pts=c.getPoints(80).map(p=>new THREE.Vector3(p.x,p.y,.08));root.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color:0x7de6ff,transparent:true,opacity:.65})));}label("MAGNIT MAYDONI");}else label("HARAKAT VA KUCH");
 }else if(subject==="Tarix"){if(conceptMatch(words,"pyramid")){clearRootContents();const stone=material(0xd6b989,.8,0);mesh(new THREE.ConeGeometry(1,.95,4),stone,0,-.05,0).rotation.y=Math.PI/4;mesh(new THREE.BoxGeometry(2.5,.12,1.2),stone,0,-.58,0);label("QADIMGI MISR");}else label("TARIXIY ME’MORCHILIK");}
 else if(subject==="Matematika"){if(conceptMatch(words,"pi")){clearRootContents();const ring=mesh(new THREE.TorusGeometry(.8,.055,12,120),glow(0xa98bff));ring.rotation.x=.15;lineBetween([-.9,0,0],[.9,0,0],.012,material(0xe6dcff));label("AYLANA GEOMETRIYASI");}else label("GEOMETRIK SHAKL");}
 else if(subject==="Geografiya")label(conceptMatch(words,"volcano")?"VULQON RELYEFI":"YER SHARI");
 else if(subject==="Texnologiya")label(conceptMatch(words,"ai")?"NEYRON TARMOQ":"MIKROPROTSESSOR");
 else if(subject==="Psixologiya")label(conceptMatch(words,"memory")?"XOTIRA JARAYONI":"IDROK MODELI");
 else label("MAVZUGA MOS UMUMIY MODEL");
}
function addStageAccent(stage,subject){const accent=palettes[selectedPalette].accent,wire=new THREE.MeshBasicMaterial({color:accent,transparent:true,opacity:.62});if(stage===0){const ring=mesh(new THREE.TorusGeometry(1.38,.018,8,120),wire);ring.rotation.x=.72;ring.rotation.y=.18;for(let i=0;i<9;i++){const a=i*Math.PI*2/9,dot=sphere(Math.cos(a)*1.5,Math.sin(a)*1.5,.08,.045,accent,12);dot.userData.qfPhase=i*.4;}}else if(stage===2){for(let i=0;i<3;i++){const y=.72-i*.72;sphere(-1.18,y,.1,.12,accent,18);sphere(1.18,y,.1,.12,accent,18);lineBetween([-1.04,y,.1],[1.04,y,.1],.012,wire);}mesh(new THREE.TorusGeometry(.48,.018,8,80),wire).rotation.x=Math.PI/2;}else if(stage===3){const ring=mesh(new THREE.TorusGeometry(1.18,.035,10,100),new THREE.MeshStandardMaterial({color:accent,emissive:accent,emissiveIntensity:.32,metalness:.65,roughness:.24}));ring.rotation.x=.35;const badge=mesh(new THREE.OctahedronGeometry(.28,1),new THREE.MeshStandardMaterial({color:0xeaf8ff,emissive:accent,emissiveIntensity:.7,metalness:.55,roughness:.2}));badge.position.set(0,0,.2);for(let i=0;i<4;i++){const a=i*Math.PI/2;sphere(Math.cos(a)*1.38,Math.sin(a)*1.38,.12,.065,accent,14);}}else if(stage===4){const halo=mesh(new THREE.TorusGeometry(1.35,.025,10,120),wire);halo.rotation.set(.45,.25,.2);const core=sphere(0,0,0,.22,accent,28);core.material.emissive.setHex(accent);core.material.emissiveIntensity=.6;}if(selectedVisual==="kinetic"){for(let i=0;i<4;i++){const bar=mesh(new THREE.BoxGeometry(.14,.42+i*.18,.12),new THREE.MeshStandardMaterial({color:accent,metalness:.55,roughness:.28}),-1.25+i*.82,-.9,.15);bar.userData.qfFloat=true;}}else if(selectedVisual==="editorial"){mesh(new THREE.BoxGeometry(2.55,2.9,.035),new THREE.MeshStandardMaterial({color:0xcbd5df,metalness:.82,roughness:.3,transparent:true,opacity:.24}),0,0,-.45);mesh(new THREE.BoxGeometry(.035,2.3,.05),wire,-1.32,0,-.38);}else if(selectedVisual==="future"){for(let i=-2;i<=2;i++){lineBetween([i*.42,-1.4,-.35],[i*.42,1.4,-.35],.009,wire);lineBetween([-1.4,i*.42,-.35],[1.4,i*.42,-.35],.009,wire);}[[ -1.2,.95,.15],[1.2,.95,.15],[-1.2,-.95,.15],[1.2,-.95,.15]].forEach((p,i)=>{const n=sphere(p[0],p[1],p[2],.045,accent,12);n.userData.qfPhase=i*.6;});}}
function applyPalette(){if(!THREE||!scene)return;const p=palettes[selectedPalette],accent=new THREE.Color(p.accent);scene.background=null;if(hemisphereLight){hemisphereLight.color.copy(accent).lerp(new THREE.Color(0xffffff),.38);hemisphereLight.groundColor.setHex(p.bg);hemisphereLight.intensity=selectedPalette==="solar"?2.35:2.1;}if(keyLight){keyLight.color.copy(accent).lerp(new THREE.Color(0xffffff),.62);keyLight.intensity=selectedPalette==="solar"?3.6:3.1;}if(fillLight){fillLight.color.copy(accent);fillLight.intensity=selectedPalette==="silver"?23:29;}scene.traverse(obj=>{if(!obj.material)return;(Array.isArray(obj.material)?obj.material:[obj.material]).forEach(mat=>{if(mat.color){if(!mat.userData.qfBaseColor)mat.userData.qfBaseColor=mat.color.clone();mat.color.copy(mat.userData.qfBaseColor).lerp(accent,.18);}if(mat.emissive){mat.emissive.copy(accent);mat.emissiveIntensity=Math.max(mat.emissiveIntensity||0,.12);}mat.needsUpdate=true;});});}
function addSmartLedDisplay(){
 const group=new THREE.Group();group.position.set(0,0,1.05);root.add(group);
 const frameMat=new THREE.MeshStandardMaterial({color:0xaebdca,metalness:1,roughness:.13,emissive:0x30465a,emissiveIntensity:.42});
 const bezel=new THREE.Mesh(new THREE.BoxGeometry(1.92,2.82,.16),frameMat);group.add(bezel);
 const screenMat=new THREE.MeshBasicMaterial({color:0x030b14});
 const screen=new THREE.Mesh(new THREE.PlaneGeometry(1.74,2.64),screenMat);screen.position.z=.09;group.add(screen);
 const glow=new THREE.Mesh(new THREE.PlaneGeometry(1.62,2.5),new THREE.MeshBasicMaterial({color:0x0b4b76,transparent:true,opacity:.28}));glow.position.z=.095;group.add(glow);
 const edgeMat=new THREE.MeshBasicMaterial({color:0xe8f5ff});
 const edge=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.95,2.85,.18)),edgeMat);group.add(edge);
 for(let i=0;i<9;i++){const scan=new THREE.Mesh(new THREE.PlaneGeometry(1.66,.009),new THREE.MeshBasicMaterial({color:0x55caff,transparent:true,opacity:.28}));scan.position.set(0,-1.05+i*.26,.105);group.add(scan);}
 const corners=[[-.82,1.18],[.82,1.18],[-.82,-1.18],[.82,-1.18]];
 corners.forEach(([x,y])=>{const dot=new THREE.Mesh(new THREE.SphereGeometry(.035,12,12),new THREE.MeshBasicMaterial({color:0xdaf7ff,emissive:0x55baff,emissiveIntensity:2}));dot.position.set(x,y,.13);group.add(dot);});
 group.userData.qfFloat=true;group.userData.qfBaseY=0;group.userData.qfBaseRot=0;group.userData.qfPhase=.6;
 root.userData.ledDisplay=group;
}
function prepareSceneMotion(){if(!root)return;root.children.forEach((o,i)=>{o.userData.qfFloat=true;o.userData.qfBaseY=o.position.y;o.userData.qfBaseRot=o.rotation.z;o.userData.qfPhase=i*.71;});}
async function build3D(){const subject=fieldName();if(!subject||!val("title")){status("studioStatus","Avval fakt ma’lumotlarini to‘ldiring.");return;}if(!subjects.includes(subject))status("studioStatus","Mavzu maxsus ro‘yxatda yo‘q; umumiy 3D model moslashtiriladi.");try{if(!THREE)THREE=await import("https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js");if(!renderer){renderer=new THREE.WebGLRenderer({canvas:$("reel3D"),antialias:true,alpha:true,powerPreference:"high-performance"});renderer.setPixelRatio(1);renderer.setSize(360,640,false);renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(38,9/16,.1,100);camera.position.set(0,0,4.45);hemisphereLight=new THREE.HemisphereLight(0xb9eaff,0x10213a,2.1);scene.add(hemisphereLight);keyLight=new THREE.DirectionalLight(0xffffff,3.2);keyLight.position.set(3,4,5);scene.add(keyLight);fillLight=new THREE.PointLight(palettes[selectedPalette].accent,25,12);fillLight.position.set(-3,-1,2);scene.add(fillLight);const canvas=$("reel3D");canvas.addEventListener("pointermove",event=>{const r=canvas.getBoundingClientRect();pointerX=((event.clientX-r.left)/r.width-.5)*2;pointerY=((event.clientY-r.top)/r.height-.5)*2;});canvas.addEventListener("pointerleave",()=>{pointerX=0;pointerY=0;});const tick=()=>{raf=requestAnimationFrame(tick);const now=performance.now(),t=now*.001,speed=({Silliq:.85,Dinamik:2.1,Kinematik:.62,Ijodiy:1.55,Aralash:1.25})[selectedMotion]||1,blend=Math.min(1,Math.max(0,(now-sceneVisualStarted)/680)),ease=blend*blend*(3-2*blend);if(root&&!paused){root.children.forEach((g,i)=>{const current=i===sceneIndex,previous=i===sceneVisualFrom&&i!==sceneIndex;const isOutro=playbackElapsed>=mainDuration();g.visible=!isOutro&&(current||(previous&&blend<1));if(!g.visible)return;const phase=i*.63,enter=current?.92+.08*ease:1-.08*ease;g.rotation.y=Math.sin(t*speed*.9+phase)*.32+(current?Math.sin(t*speed*1.35)*.12:0);g.rotation.x=Math.cos(t*speed*.72+phase)*.19;g.rotation.z=Math.sin(t*speed*1.1+phase)*.085;g.position.set(Math.sin(t*speed*.72+phase)*.13,Math.sin(t*speed*1.8+phase)*.15,0);g.scale.setScalar(1.42*enter*(1+Math.sin(t*speed*2.1+phase)*.025));if(g.userData.spin)g.userData.spin.rotation.z+=.006*speed;g.children.forEach(o=>{if(o.userData.qfFloat){o.position.y=o.userData.qfBaseY+Math.sin(t*1.6*speed+o.userData.qfPhase)*.075;o.rotation.z=o.userData.qfBaseRot+Math.sin(t*1.1*speed+o.userData.qfPhase)*.045;}});});const cams={cinematic:[0,0,4.45,0],kinetic:[.24,-.1,4.05,0],editorial:[-.18,.08,4.85,.05],future:[0,.14,4.2,0]},c=cams[selectedVisual]||cams.cinematic,parallax=selectedMotion==="Kinematik"?1.25:selectedMotion==="Dinamik"?.62:1,targetX=c[0]+pointerX*.22*parallax+Math.sin(t*speed*.42)*.07,targetY=c[1]-pointerY*.18*parallax+Math.cos(t*speed*.36)*.045,targetZ=c[2]+(sceneIndex===1?-.35:sceneIndex===3?.2:0);camera.position.x+=(targetX-camera.position.x)*.075;camera.position.y+=(targetY-camera.position.y)*.075;camera.position.z+=(targetZ-camera.position.z)*.06;camera.lookAt(0,c[3],0);}if(renderer&&scene&&camera)renderer.render(scene,camera);if(recording&&recordRenderer)recordRenderer.render(scene,camera);renderTextLayer();};tick();}if(root){scene.remove(root);root.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose());});}sceneGroups=[];window.qfSceneCue="";const prev=sceneIndex,groups=[];for(let i=0;i<5;i++){sceneIndex=i;root=null;makeScene(subject);addFactSpecificObject(subject);addStageAccent(i,subject);if(i===1)addSmartLedDisplay();prepareSceneMotion();root.userData.stageIndex=i;const g=root;scene.remove(g);groups.push(g);}sceneIndex=prev;root=new THREE.Group();sceneGroups=groups;sceneGroups.forEach((g,i)=>{g.visible=i===sceneIndex;root.add(g);});scene.add(root);applyPalette();status("studioStatus","5 ta mustaqil 3D sahna, mavzuga mos model va kamera harakati tayyor.");resize3D();}catch(e){status("studioStatus","3D sahna ishga tushmadi: "+e.message);}}
function resize3D(){if(!renderer||!camera)return;renderer.setSize(360,640,false);camera.aspect=9/16;camera.updateProjectionMatrix();if(recordRenderer)recordRenderer.setSize(1080,1920,false);}
function setupRecordRenderer(){if(recordRenderer)return true;if(!THREE||!renderer)return false;try{recordRenderer=new THREE.WebGLRenderer({canvas:$("record3D"),antialias:true,alpha:true,powerPreference:"high-performance"});recordRenderer.setPixelRatio(1);recordRenderer.setSize(1080,1920,false);recordRenderer.setClearColor(0x000000,0);recordRenderer.outputColorSpace=THREE.SRGBColorSpace;return true;}catch(e){recordRenderer=null;return false;}}
function revealRecordControls(){const overlay=$("recordOverlay");overlay.classList.add("controls-visible");clearTimeout(recordControlsTimer);recordControlsTimer=setTimeout(()=>overlay.classList.remove("controls-visible"),1800);}
const recordOverlay=$("recordOverlay"),recordControls=recordOverlay.querySelector(".record-controls");
recordOverlay.addEventListener("click",event=>{if(event.target.closest(".record-controls"))return;revealRecordControls();});
recordControls.addEventListener("click",event=>{event.stopPropagation();revealRecordControls();});
async function startRecord(){if(!renderer)await build3D();if(!renderer)return;const ok=setupRecordRenderer();if(playbackElapsed>=fullDuration()){playbackElapsed=0;showScene(0);}recording=true;$("recordOverlay").hidden=false;playing=true;playbackStarted=performance.now()-playbackElapsed;$("startPreview").textContent="Ⅱ To‘xtatish";$("recordPause").textContent="Ⅱ";revealRecordControls();renderTextLayer();if(!playbackRaf)playbackRaf=requestAnimationFrame(playbackFrame);status("studioStatus",ok?"5 asosiy sahna va undan keyingi alohida 5,2 soniyalik NEX outro. Telefon ekran yozuvini ishga tushiring.":"Yuqori aniqlikdagi 3D yozuv qatlami ishga tushmadi.");}
function exitRecord(){clearTimeout(recordControlsTimer);recordOverlay.classList.remove("controls-visible");recording=false;$("recordOverlay").hidden=true;pausePlayback();}
$("sceneText").addEventListener("input",()=>{sceneTexts[sceneIndex]=$("sceneText").value;sceneEdited[sceneIndex]=true;renderTextLayer();});
$("sceneDuration").addEventListener("input",()=>{const before=sceneDurations.slice(0,sceneIndex).reduce((a,b)=>a+b,0),offset=Math.max(0,playbackElapsed-before);sceneDurations[sceneIndex]=Number($("sceneDuration").value)*1000;playbackElapsed=before+Math.min(offset,sceneDurations[sceneIndex]);if(playing)playbackStarted=performance.now()-playbackElapsed;$("sceneDurationValue").textContent=Number($("sceneDuration").value).toFixed(1).replace(".",",")+" soniya";refreshDuration();updateProgress();});
$("startPreview").addEventListener("click",startPlayback);
$("recordMode").addEventListener("click",startRecord);
$("recordPause").addEventListener("click",()=>{if(playing){pausePlayback();$("recordPause").textContent="▶";}else{if(playbackElapsed>=fullDuration()){playbackElapsed=0;showScene(0);}playing=true;playbackStarted=performance.now()-playbackElapsed;$("recordPause").textContent="Ⅱ";if(!playbackRaf)playbackRaf=requestAnimationFrame(playbackFrame);}revealRecordControls();});
$("recordExit").addEventListener("click",exitRecord);
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!$("recordOverlay").hidden)exitRecord();});
$("restartScene").addEventListener("click",()=>{pausePlayback();playbackElapsed=0;showScene(0);updateProgress();startPlayback();});
$("shuffleBackground").addEventListener("click",()=>{variant++;selectedPalette=["silver","blue","violet","emerald","solar"][variant%5];selectedVisual=["cinematic","kinetic","editorial","future"][variant%4];selectedMotion=["Silliq","Dinamik","Kinematik","Ijodiy","Aralash"][variant%5];choose("paletteOptions",selectedPalette);choose("visualOptions",selectedVisual);choose("motionOptions",selectedMotion);applyPalette();build3D();renderTextLayer();});
$("backSettings").addEventListener("click",()=>{pausePlayback();exitRecord();showStep(6);});
function resetQuestionnaire(){exitRecord();pausePlayback();["kind","field","customField","title","source","evidence","hook","announce","bodyText","statusText","ending","sceneText"].forEach(id=>$(id).value="");$("review").selectedIndex=0;$("customField").hidden=true;["sourceStatus","scriptStatus","studioStatus"].forEach(id=>status(id,""));sceneTexts=["","","","",""];sceneEdited=[false,false,false,false,false];sceneDurations=[5000,5000,5000,5000,5000];sceneGroups=[];sceneIndex=0;sceneVisualFrom=0;playbackElapsed=0;variant=0;window.qfSceneCue="";selectedTone="Jiddiy";selectedVisual="cinematic";selectedPalette="silver";selectedMotion="Silliq";choose("toneOptions",selectedTone);choose("visualOptions",selectedVisual);choose("paletteOptions",selectedPalette);choose("motionOptions",selectedMotion);applyPalette();try{sessionStorage.removeItem("nex-qf-draft-014");}catch(e){}renderSceneList();refreshDuration();showStep(1);}
$("clearQuestionnaire").addEventListener("click",()=>{if(window.confirm("Anketadagi barcha kiritilgan ma’lumotlar tozalansinmi? Bu amalni ortga qaytarib bo‘lmaydi."))resetQuestionnaire();});
$("newProject").addEventListener("click",()=>{if(window.confirm("Yangi loyiha boshlanadi. Joriy anketa va sozlamalar tozalanadi. Davom etasizmi?"))resetQuestionnaire();});
$("field").addEventListener("change",()=>{if(renderer&&currentPage===7)build3D();});
document.addEventListener("visibilitychange",()=>{if(document.hidden){pausePlayback();if(raf)cancelAnimationFrame(raf);raf=0;}else if(renderer&&!raf)build3D();});
document.querySelectorAll(".wizard-page").forEach(p=>{p.addEventListener("transitionend",()=>{});});
restoreDraft();showStep(1);renderSceneList();refreshDuration();
})();