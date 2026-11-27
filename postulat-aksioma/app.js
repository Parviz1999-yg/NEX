(()=>{
"use strict";
let THREE=null,renderer=null,recordRenderer=null,recordControlsTimer=0,scene=null,camera=null,root=null,raf=0,paused=false,playing=false,recording=false,playbackStarted=0,playbackElapsed=0,playbackRaf=0,sceneIndex=0,sceneVisualFrom=0,sceneVisualStarted=0,sceneDurations=[5000,5000,5000,5000,5000],sceneTexts=["","","","",""],sceneEdited=[false,false,false,false,false],sceneGroups=[],variant=0,selectedTone="Jiddiy",selectedVisual="cinematic",selectedPalette="silver",selectedMotion="Silliq",currentPage=1,pointerX=0,pointerY=0,hemisphereLight=null,keyLight=null,fillLight=null;
const $=id=>document.getElementById(id),val=id=>$(id)?.value?.trim()||"";
const kinds={"Falsafiy tamoyil":"Falsafiy tahlil va mulohazaga tayangan umumiy qoida yoki qarash; uni empirik qonun bilan tenglashtirmang.","Ilmiy aksioma":"Muayyan formal yoki nazariy tizimda boshlang‘ich qabul qilinadigan hukm; maqomi aynan shu tizim doirasida izohlanadi.","Ilmiy postulat":"Nazariya doirasida boshlang‘ich shart sifatida qabul qilinadigan faraz; barcha vaziyatlarda mutlaq haqiqat sifatida ko‘rsatilmaydi.","Mantiqiy qonun":"To‘g‘ri xulosa chiqarishning formal qoidasi; misol orqali tushuntiriladi.","Nazariy tamoyil":"Muayyan ilmiy model yoki nazariyaning ishlash asosini belgilovchi qoida."};
const labels=["HOOK","TAMOYIL","MA’NO","QO‘LLANISH","CHEGARA"];
const palettes={silver:{bg:0x080e18,accent:0xc8d3dc}};
function status(id,msg){if($(id))$(id).textContent=msg;}
function showStep(n){currentPage=Math.max(1,Math.min(7,n));document.querySelectorAll(".wizard-page").forEach(p=>p.classList.toggle("active",p.id==="step-"+currentPage));document.querySelectorAll("[data-progress]").forEach(p=>{const i=Number(p.dataset.progress);p.classList.toggle("current",i===currentPage);p.classList.toggle("done",i<currentPage);});$("progressFill").style.width=((currentPage-1)/6*100)+"%";$("stepLabel").textContent=["01 — TAMOYIL","02 — SSENARIY","03 — BAYON USLUBI","04 — VIZUAL TIL","05 — RANG PALETRASI","06 — ANIMATSIYA","07 — REELS STUDIYASI"][currentPage-1];window.scrollTo({top:0,behavior:"smooth"});if(currentPage===7){updateSummary();resize3D();}}
function choose(group,key){$(group).querySelectorAll("[data-value]").forEach(b=>b.classList.toggle("selected",b.dataset.value===key));}
function validate(n){if(n===1&&(!val("kind")||!val("title"))){status("sourceStatus","Tushuncha turi va aniq nomini kiriting.");return false;}if(n===1&&!val("source")){status("sourceStatus","Ilmiy yoki falsafiy manbani ko‘rsating.");return false;}if(n===1&&!val("evidence")){status("sourceStatus","Tamoyilning nazariy asosi yoki mazmuniy izohini kiriting.");return false;}if(n===2&&["hook","announce","bodyText","statusText","ending"].some(x=>!val(x))){status("scriptStatus","Barcha besh ssenariy qismini to‘ldiring.");return false;}return true;}
$("kind").addEventListener("change",()=>{$("kindHint").textContent=kinds[val("kind")]||"Tanlangan tushuncha turining ilmiy yoki falsafiy maqomini aniqlang.";saveDraft();});
function saveDraft(){try{const ids=["kind","title","source","evidence","review","hook","announce","bodyText","statusText","ending"];const fields={};ids.forEach(id=>fields[id]=$(id).value);sessionStorage.setItem("nex-pa-draft-022",JSON.stringify({fields,selectedTone,selectedVisual,selectedPalette,selectedMotion,sceneDurations,sceneTexts,sceneEdited}));}catch(e){}}
function restoreDraft(){try{const d=JSON.parse(sessionStorage.getItem("nex-pa-draft-022")||"null");if(d&&d.fields){Object.entries(d.fields).forEach(([id,value])=>{if($(id))$(id).value=value;});selectedTone=d.selectedTone||selectedTone;selectedVisual=d.selectedVisual||selectedVisual;selectedPalette="silver";selectedMotion=d.selectedMotion||selectedMotion;if(Array.isArray(d.sceneDurations)&&d.sceneDurations.length===5)sceneDurations=d.sceneDurations;if(Array.isArray(d.sceneTexts)&&d.sceneTexts.length===5)sceneTexts=d.sceneTexts;if(Array.isArray(d.sceneEdited)&&d.sceneEdited.length===5)sceneEdited=d.sceneEdited;choose("toneOptions",selectedTone);choose("visualOptions",selectedVisual);choose("paletteOptions",selectedPalette);choose("motionOptions",selectedMotion);}}catch(e){}$("kindHint").textContent=kinds[val("kind")]||"Tanlangan tushuncha turining ilmiy yoki falsafiy maqomini aniqlang.";}
["kind","title","source","evidence","review","hook","announce","bodyText","statusText","ending"].forEach(id=>$(id).addEventListener("input",()=>{saveDraft();if(currentPage===7)updateSummary();}));
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
function updateSummary(){$("summary").innerHTML="<b>"+escapeHtml(val("kind"))+"</b><br>"+escapeHtml(val("title"))+"<br><small>Manba: "+escapeHtml(val("source"))+"<br>"+escapeHtml(selectedTone)+" · "+escapeHtml(selectedVisual)+" · "+escapeHtml(selectedPalette)+" · "+escapeHtml(selectedMotion)+"</small>";}
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
  // 2D canvas faqat sokin fon/vinyetka beradi; asosiy metall shakl WebGL 3D qatlamida.
  const base=ctx.createLinearGradient(0,0,0,1920);
  base.addColorStop(0,"#05070a");base.addColorStop(.48,"#10151b");base.addColorStop(1,"#05070a");
  ctx.fillStyle=base;ctx.fillRect(0,0,1080,1920);
  const vignette=ctx.createRadialGradient(540,820,260,540,960,1180);
  vignette.addColorStop(0,"rgba(18,24,31,.08)");vignette.addColorStop(1,"rgba(0,0,0,.64)");
  ctx.fillStyle=vignette;ctx.fillRect(0,0,1080,1920);
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
  const p=Math.max(0,Math.min(1,progress)),fade=Math.max(0,Math.min(1,(p-.58)/.16));
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
  // Katta 2D karta olib tashlandi: 3D kompozitsiya uchun markaz bo‘sh qoladi.
  ctx.save();ctx.globalAlpha=.42;ctx.fillStyle="#aeb8c2";ctx.font="600 20px system-ui";
  ctx.textAlign="left";ctx.textBaseline="middle";
  ctx.fillText(String(val("kind")||"").toLocaleUpperCase("uz"),72,138);
  ctx.fillStyle="#788591";ctx.fillRect(72,166,936,2);
  ctx.restore();
}
function toneProfile(){const p={"Jiddiy":{font:"800 82px system-ui",line:104,delay:120,stagger:190,reveal:360,offset:34,shadow:14,align:"center"},"Ilmiy":{font:"650 72px Georgia",line:96,delay:260,stagger:250,reveal:520,offset:14,shadow:5,align:"center"},"Sodda va tushunarli":{font:"750 78px system-ui",line:106,delay:80,stagger:150,reveal:320,offset:22,shadow:8,align:"center"},"Yumor":{font:"900 88px system-ui",line:112,delay:0,stagger:115,reveal:280,offset:52,shadow:18,align:"center",bounce:true},"Tahliliy":{font:"720 74px system-ui",line:100,delay:180,stagger:230,reveal:430,offset:18,shadow:7,align:"left"},"Motivatsion":{font:"900 88px system-ui",line:112,delay:0,stagger:145,reveal:330,offset:62,shadow:22,align:"center",rise:true},"Sirli va qiziqarli":{font:"750 82px Georgia",line:108,delay:420,stagger:220,reveal:560,offset:24,shadow:24,align:"center"},"Falsafiy":{font:"650 78px Georgia",line:108,delay:260,stagger:260,reveal:600,offset:12,shadow:4,align:"center"}};return p[selectedTone]||p.Jiddiy;}
function drawVisualFrame(ctx,now,accent){
  // 2D dekorlar ataylab minimal: no grid, frame, rings or bars over the WebGL object.
  ctx.save();ctx.globalAlpha=.22;ctx.fillStyle="#aab4bf";
  ctx.fillRect(72,176,3,34);ctx.restore();
}
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
 const max=align==="left"?820:920,lines=wrapLines(ctx,text,max).slice(0,sceneIndex===4?4:7),lh=selectedVisual==="kinetic"?116:selectedVisual==="editorial"?96:tone.line,cy=1390,y0=cy-(lines.length-1)*lh/2,delay=(sceneIndex===1?1250:0)+tone.delay;
 lines.forEach((line,i)=>{const p=Math.max(0,Math.min(1,(elapsed-delay-tone.reveal*motion.reveal-i*tone.stagger*motion.stagger)/(tone.reveal*motion.reveal))),e=p*p*(3-2*p);ctx.save();ctx.globalAlpha=e;ctx.shadowColor=accent;ctx.shadowBlur=Math.min(7,tone.shadow*.28);ctx.fillStyle="#e7ebef";const offset=(tone.rise?-1:1)*tone.offset*motion.offset*(1-e),bounce=tone.bounce?Math.sin(elapsed*.012+i)*12*(1-e):0;ctx.translate(align==="left"?x-offset:x,y0+i*lh+offset+bounce);ctx.scale(.94+.06*e,.94+.06*e);ctx.fillText(line,0,0,max);ctx.restore();});
 if(sceneIndex===4){ctx.save();ctx.globalAlpha=.78;ctx.textAlign="center";ctx.fillStyle="#aebbc6";ctx.font="600 25px system-ui";ctx.fillText("MANBA  ·  "+val("source"),540,1730,920);ctx.font="500 21px system-ui";ctx.fillStyle="#788794";ctx.fillText("QO‘LLANISH DOIRASI  ·  "+val("review"),540,1774,920);ctx.restore();}
 ctx.restore();
}
function renderTextLayer(){paintBackground($("reelBgCanvas"));paintText($("reelCanvas"));if(recording){paintBackground($("recordBgCanvas"));paintText($("recordCanvas"));}}
function material(color,roughness=.48,metalness=.12){return new THREE.MeshStandardMaterial({color,roughness,metalness});}
function createChromeEnvironment(THREE){
 const faces=[];
 for(let i=0;i<6;i++){
  const canvas=document.createElement("canvas");canvas.width=256;canvas.height=256;
  const ctx=canvas.getContext("2d");
  const base=ctx.createLinearGradient(0,0,256,256);
  base.addColorStop(0,"#111820");base.addColorStop(.22,"#6d7882");base.addColorStop(.38,"#dce2e7");base.addColorStop(.52,"#303a44");base.addColorStop(.68,"#f1f4f6");base.addColorStop(.84,"#596570");base.addColorStop(1,"#10171e");
  ctx.fillStyle=base;ctx.fillRect(0,0,256,256);
  const band=ctx.createLinearGradient(0,40,0,216);
  band.addColorStop(0,"rgba(255,255,255,0)");band.addColorStop(.42,"rgba(245,248,250,.42)");band.addColorStop(.56,"rgba(255,255,255,.08)");band.addColorStop(1,"rgba(255,255,255,0)");
  ctx.fillStyle=band;ctx.fillRect(0,0,256,256);
  faces.push(canvas);
 }
 const env=new THREE.CubeTexture(faces);env.colorSpace=THREE.SRGBColorSpace;env.needsUpdate=true;return env;
}
function liquidChrome(roughness=.14){
 return new THREE.MeshPhysicalMaterial({color:0x87939e,metalness:1,roughness,clearcoat:1,clearcoatRoughness:.08,reflectivity:1,envMapIntensity:1.15});
}
function makeLiquidForm(kind="blob"){
 const geometry=new THREE.SphereGeometry(.82,96,72),pos=geometry.attributes.position;
 for(let i=0;i<pos.count;i++){
  const x=pos.getX(i),y=pos.getY(i),z=pos.getZ(i),n=Math.sin(x*4.4+y*2.8+z*3.1)*.075+Math.sin(y*5.2-z*3.7)*.045+Math.cos(z*4.8+x*2.1)*.035;
  const scale=1+n;pos.setXYZ(i,x*scale,y*scale,z*scale);
 }
 pos.needsUpdate=true;geometry.computeVertexNormals();
 const blob=mesh(geometry,liquidChrome(.12));
 blob.scale.set(kind==="wide"?1.2:.98,kind==="tall"?1.18:.88,kind==="wide"?.72:.9);
 blob.userData.paLiquid=true;root.userData.spin=blob;return blob;
}
function mesh(geometry,mat,x=0,y=0,z=0){const m=new THREE.Mesh(geometry,mat);m.position.set(x,y,z);root.add(m);return m;}
function sphere(x,y,z,r,color,detail=32){return mesh(new THREE.SphereGeometry(r,detail,detail),material(color),x,y,z);}
function lineBetween(a,b,radius,mat){const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b),d=new THREE.Vector3().subVectors(end,start);const obj=mesh(new THREE.CylinderGeometry(radius,radius,d.length(),10),mat);obj.position.copy(start).add(end).multiplyScalar(.5);obj.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return obj;}
function makeOrbit(radius,tilt,color){const o=mesh(new THREE.TorusGeometry(radius,.012,8,100),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.7}));o.rotation.x=tilt;return o;}
function clearRootContents(){if(!root)return;root.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose());});root.clear();}
function makeScene(kind){
 root=new THREE.Group();scene.add(root);
 const chrome=liquidChrome(.13),darkChrome=new THREE.MeshPhysicalMaterial({color:0x35414c,metalness:.98,roughness:.2,clearcoat:.8,clearcoatRoughness:.12});
 const mutedAccent=new THREE.MeshStandardMaterial({color:0x526a7c,metalness:.82,roughness:.28});
 if(kind==="Mantiqiy qonun"){
  const a=mesh(new THREE.TorusGeometry(.72,.13,24,120),chrome);a.rotation.y=.72;
  const b=mesh(new THREE.TorusGeometry(.72,.13,24,120),chrome);b.rotation.x=1.15;b.rotation.y=-.48;
  const core=mesh(new THREE.IcosahedronGeometry(.25,2),darkChrome);core.position.z=.12;
  root.userData.spin=a;
 }else if(kind==="Ilmiy aksioma"){
  const base=mesh(new THREE.TorusGeometry(.72,.075,18,120),darkChrome);base.rotation.x=Math.PI/2;
  const center=mesh(new THREE.IcosahedronGeometry(.32,2),chrome);center.position.y=.48;
  [-.62,.62].forEach(x=>{const node=mesh(new THREE.SphereGeometry(.16,32,24),chrome);node.position.set(x,-.08,0);});root.userData.spin=center;
  const ring=mesh(new THREE.TorusGeometry(1.04,.025,12,120),mutedAccent);ring.rotation.set(.8,.35,.2);
 }else if(kind==="Falsafiy tamoyil"){
  makeLiquidForm("wide");
  const orbit=mesh(new THREE.TorusGeometry(1.16,.022,12,140),darkChrome);orbit.rotation.set(.65,.28,.12);
  const orbit2=mesh(new THREE.TorusGeometry(1.02,.012,8,140),mutedAccent);orbit2.rotation.set(1.2,-.4,.6);
 }else if(kind==="Ilmiy postulat"){
  makeLiquidForm("blob");
  [0,.9,1.8].forEach((v)=>{const ring=mesh(new THREE.TorusGeometry(1.08,.025,10,120),darkChrome);ring.rotation.set(v,.3+v,.15);});
 }else if(kind==="Nazariy tamoyil"){
  const core=mesh(new THREE.IcosahedronGeometry(.72,2),chrome);root.userData.spin=core;
  for(let i=0;i<4;i++){const ring=mesh(new THREE.TorusGeometry(.98+i*.12,.018,8,100),darkChrome);ring.rotation.set(i*.48,.7+i*.2,0);}
 }else{
  makeLiquidForm("blob");
  const orbit=mesh(new THREE.TorusGeometry(1.12,.022,10,120),darkChrome);orbit.rotation.set(.8,.25,.4);
  const droplet=mesh(new THREE.SphereGeometry(.16,40,32),chrome);droplet.position.set(1.08,.45,.18);droplet.scale.set(.7,1.25,.7);
 }
}function normalizePAText(value){return String(value||"").toLocaleLowerCase("uz").replace(/₂/g,"2").replace(/π/g," pi ").replace(/sun[’']iy/g,"suniy").replace(/fir[’']avn/g,"firavn").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g," ").trim();}
function addPrincipleVisual(){
 const words=normalizePAText(val("title")+" "+val("announce")+" "+val("bodyText")+" "+val("evidence"));
 if(words.includes("sabab")||words.includes("oqibat")){
  const left=mesh(new THREE.SphereGeometry(.22,40,32),liquidChrome(.16));left.position.set(-1.05,0,.18);left.scale.set(.8,1.3,.8);
  const right=mesh(new THREE.SphereGeometry(.22,40,32),liquidChrome(.16));right.position.set(1.05,0,.18);right.scale.set(.8,1.3,.8);
  const bridge=mesh(new THREE.TorusGeometry(.62,.035,12,100,Math.PI),liquidChrome(.2));bridge.rotation.z=Math.PI/2;
 }
}function addStageAccent(stage){
 const chrome=liquidChrome(.18),accentMat=new THREE.MeshStandardMaterial({color:0x455d70,metalness:.88,roughness:.3});
 if(stage===0){const halo=mesh(new THREE.TorusGeometry(1.32,.012,8,120),accentMat);halo.rotation.set(.75,.2,.1);}
 else if(stage===2){for(let i=0;i<3;i++){const ring=mesh(new THREE.TorusGeometry(.32+i*.18,.014,8,90),chrome);ring.rotation.set(.45+i*.35,.3,0);}}
 else if(stage===3){const path=mesh(new THREE.TorusKnotGeometry(.72,.025,100,8,2,3),accentMat);path.rotation.x=.5;}
 else if(stage===4){const small=mesh(new THREE.SphereGeometry(.18,40,32),chrome);small.position.z=.2;}
}function applyPalette(){
 if(!THREE||!scene)return;
 const p=palettes[selectedPalette],accent=new THREE.Color(p.accent);
 scene.background=null;
 if(hemisphereLight){hemisphereLight.color.setHex(0xb8c0c8);hemisphereLight.groundColor.setHex(0x080b10);hemisphereLight.intensity=.72;}
 if(keyLight){keyLight.color.setHex(0xf2f5f8);keyLight.intensity=2.1;}
 if(fillLight){fillLight.color.setHex(0x8da2b4);fillLight.intensity=2.8;}
 scene.traverse(obj=>{if(!obj.material)return;(Array.isArray(obj.material)?obj.material:[obj.material]).forEach(mat=>{if(mat.emissive){mat.emissive.setHex(0x000000);mat.emissiveIntensity=0;}mat.needsUpdate=true;});});
}function prepareSceneMotion(){if(!root)return;root.children.forEach((o,i)=>{o.userData.paFloat=true;o.userData.paBaseY=o.position.y;o.userData.paBaseRot=o.rotation.z;o.userData.paPhase=i*.71;});}
async function build3D(){const kind=val("kind")||"Nazariy tamoyil";if(!val("title")){status("studioStatus","Avval tamoyil nomini kiriting.");return;}try{if(!THREE)THREE=await import("https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js");if(!renderer){renderer=new THREE.WebGLRenderer({canvas:$("reel3D"),antialias:true,alpha:true,powerPreference:"high-performance"});renderer.setPixelRatio(1);renderer.setSize(360,640,false);renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.82;scene=new THREE.Scene();scene.environment=createChromeEnvironment(THREE);camera=new THREE.PerspectiveCamera(38,9/16,.1,100);camera.position.set(0,0,4.45);hemisphereLight=new THREE.HemisphereLight(0xb8c0c8,0x080b10,.72);scene.add(hemisphereLight);keyLight=new THREE.DirectionalLight(0xf2f5f8,2.1);keyLight.position.set(3,4,5);scene.add(keyLight);fillLight=new THREE.PointLight(0x8da2b4,2.8,12);fillLight.position.set(-3,-1,2);scene.add(fillLight);const canvas=$("reel3D");canvas.addEventListener("pointermove",event=>{const r=canvas.getBoundingClientRect();pointerX=((event.clientX-r.left)/r.width-.5)*2;pointerY=((event.clientY-r.top)/r.height-.5)*2;});canvas.addEventListener("pointerleave",()=>{pointerX=0;pointerY=0;});const tick=()=>{raf=requestAnimationFrame(tick);const now=performance.now(),t=now*.001,speed=({Silliq:.85,Dinamik:2.1,Kinematik:.62,Ijodiy:1.55,Aralash:1.25})[selectedMotion]||1,blend=Math.min(1,Math.max(0,(now-sceneVisualStarted)/680)),ease=blend*blend*(3-2*blend);if(root&&!paused){root.children.forEach((g,i)=>{const current=i===sceneIndex,previous=i===sceneVisualFrom&&i!==sceneIndex;const isOutro=playbackElapsed>=mainDuration();g.visible=!isOutro&&(current||(previous&&blend<1));if(!g.visible)return;const phase=i*.63,enter=current?.92+.08*ease:1-.08*ease;g.rotation.y=Math.sin(t*speed*.9+phase)*.32+(current?Math.sin(t*speed*1.35)*.12:0);g.rotation.x=Math.cos(t*speed*.72+phase)*.19;g.rotation.z=Math.sin(t*speed*1.1+phase)*.085;g.position.set(Math.sin(t*speed*.42+phase)*.055,.62+Math.sin(t*speed*.7+phase)*.045,0);g.scale.setScalar(1.2*enter*(1+Math.sin(t*speed*1.2+phase)*.012));if(g.userData.spin)g.userData.spin.rotation.z+=.006*speed;g.children.forEach(o=>{if(o.userData.paFloat){o.position.y=o.userData.paBaseY+Math.sin(t*1.6*speed+o.userData.paPhase)*.075;o.rotation.z=o.userData.paBaseRot+Math.sin(t*1.1*speed+o.userData.paPhase)*.045;}});});const cams={cinematic:[0,0,4.45,0],kinetic:[.24,-.1,4.05,0],editorial:[-.18,.08,4.85,.05],future:[0,.14,4.2,0]},c=cams[selectedVisual]||cams.cinematic,parallax=selectedMotion==="Kinematik"?1.25:selectedMotion==="Dinamik"?.62:1,targetX=c[0]+pointerX*.22*parallax+Math.sin(t*speed*.42)*.07,targetY=c[1]-pointerY*.18*parallax+Math.cos(t*speed*.36)*.045,targetZ=c[2]+(sceneIndex===1?-.35:sceneIndex===3?.2:0);camera.position.x+=(targetX-camera.position.x)*.075;camera.position.y+=(targetY-camera.position.y)*.075;camera.position.z+=(targetZ-camera.position.z)*.06;camera.lookAt(0,c[3],0);}if(renderer&&scene&&camera)renderer.render(scene,camera);if(recording&&recordRenderer)recordRenderer.render(scene,camera);renderTextLayer();};tick();}if(root){scene.remove(root);root.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose());});}sceneGroups=[];window.paSceneCue="";const prev=sceneIndex,groups=[];for(let i=0;i<5;i++){sceneIndex=i;root=null;makeScene(kind);addPrincipleVisual();addStageAccent(i);prepareSceneMotion();root.userData.stageIndex=i;const g=root;scene.remove(g);groups.push(g);}sceneIndex=prev;root=new THREE.Group();sceneGroups=groups;sceneGroups.forEach((g,i)=>{g.visible=i===sceneIndex;root.add(g);});scene.add(root);applyPalette();status("studioStatus","5 ta mustaqil 3D sahna, abstrakt mantiqiy-geometrik model va kamera harakati tayyor.");resize3D();}catch(e){status("studioStatus","3D sahna ishga tushmadi: "+e.message);}}
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
$("shuffleBackground").addEventListener("click",()=>{variant++;selectedPalette="silver";selectedVisual=["cinematic","kinetic","editorial","future"][variant%4];selectedMotion=["Silliq","Dinamik","Kinematik","Ijodiy","Aralash"][variant%5];choose("paletteOptions","silver");choose("visualOptions",selectedVisual);choose("motionOptions",selectedMotion);applyPalette();build3D();renderTextLayer();});
$("backSettings").addEventListener("click",()=>{pausePlayback();exitRecord();showStep(6);});
function resetQuestionnaire(){exitRecord();pausePlayback();["kind","title","source","evidence","hook","announce","bodyText","statusText","ending","sceneText"].forEach(id=>$(id).value="");$("review").selectedIndex=0;["sourceStatus","scriptStatus","studioStatus"].forEach(id=>status(id,""));sceneTexts=["","","","",""];sceneEdited=[false,false,false,false,false];sceneDurations=[5000,5000,5000,5000,5000];sceneGroups=[];sceneIndex=0;sceneVisualFrom=0;playbackElapsed=0;variant=0;window.paSceneCue="";selectedTone="Jiddiy";selectedVisual="cinematic";selectedPalette="silver";selectedMotion="Silliq";choose("toneOptions",selectedTone);choose("visualOptions",selectedVisual);choose("paletteOptions",selectedPalette);choose("motionOptions",selectedMotion);applyPalette();try{sessionStorage.removeItem("nex-pa-draft-022");}catch(e){}renderSceneList();refreshDuration();showStep(1);}
$("clearQuestionnaire").addEventListener("click",()=>{if(window.confirm("Anketadagi barcha kiritilgan ma’lumotlar tozalansinmi? Bu amalni ortga qaytarib bo‘lmaydi."))resetQuestionnaire();});
$("newProject").addEventListener("click",()=>{if(window.confirm("Yangi loyiha boshlanadi. Joriy anketa va sozlamalar tozalanadi. Davom etasizmi?"))resetQuestionnaire();});
document.addEventListener("visibilitychange",()=>{if(document.hidden){pausePlayback();if(raf)cancelAnimationFrame(raf);raf=0;}else if(renderer&&!raf)build3D();});
document.querySelectorAll(".wizard-page").forEach(p=>{p.addEventListener("transitionend",()=>{});});
restoreDraft();showStep(1);renderSceneList();refreshDuration();
})();