(()=>{"use strict";
const $=id=>document.getElementById(id), pages=["home","content","script","style","palette","animation","studio"];
const labels=["01 — YO‘NALISH","02 — MAZMUN","03 — SSENARIY","04 — VIZUAL USLUB","05 — RANG PALETRASI","06 — ANIMATSIYA","07 — STUDIYA"];
const state={mode:"",script:["","","","",""],voice:["","","","",""],sceneDurations:[5000,5000,5000,5000,5000],account:{name:"",bio:"",followers:"",image:""},topicType:"",title:"",tone:"Jiddiy",style:"Minimalistik",palette:"Midnight",animation:"Silliq",scene:0,playing:false,started:0,elapsed:0,raf:0,recording:false,backgroundSeed:Math.floor(Math.random()*4294967295)};
const modes={tavsiya:"Tavsiya akkaunt",manba:"Foydali manba",fakt:"Qiziqarli fakt",ibora:"Maxsus iboralar"};
const scenes=["Kirish","Asosiy fikr","Izoh","Urg‘u","Yakun"];
const paletteMap={"Midnight":["#090D18","#F2F5FC","#8B7CFF","#35D6C5"],"Graphite Gold":["#111315","#F3F0E8","#C7A76C","#78909C"],"Arctic":["#0B1B2B","#F1F7FC","#66C7E8","#9B8CFF"],"Deep Forest":["#0C1B18","#EAF2E8","#78A88A","#D0B77A"],"Cobalt":["#101A3A","#F4F6FF","#5B83F5","#F0B86E"],"Burgundy":["#24121D","#FFF0F3","#D87591","#D8B17A"],"Sandstone":["#211C18","#F6EFE4","#C58E62","#8FA39A"],"Terracotta":["#281814","#FFF1E8","#D97858","#E4B66A"],"Orchid":["#1C1630","#F5F0FF","#B08BEE","#6ED4C6"],"Monochrome":["#111315","#F4F4F1","#A7ADB4","#6E7884"]};
let total=25000;
function page(name){pages.forEach((p,i)=>$("page-"+p).classList.toggle("active",p===name));$("stepLabel").textContent=labels[pages.indexOf(name)];window.scrollTo(0,0)}
function selectGroup(id,key){$(id).querySelectorAll("button").forEach(b=>{b.classList.toggle("selected",b.dataset.value===key)});}
function bindOptions(id,prop){$(id).querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{state[prop]=b.dataset.value;selectGroup(id,state[prop]);}));}
document.querySelectorAll(".direction").forEach(b=>b.addEventListener("click",()=>{state.mode=b.dataset.mode;page("content")}));
document.querySelectorAll("[data-back]").forEach(b=>b.addEventListener("click",()=>page(b.dataset.back)));
bindOptions("styleOptions","style");bindOptions("paletteOptions","palette");bindOptions("animationOptions","animation");
document.querySelectorAll("#paletteOptions .palette").forEach(b=>{const colors=(b.dataset.colors||"").split(",");b.querySelectorAll(".swatches i").forEach((dot,i)=>dot.style.backgroundColor=colors[i]||"#777")});
$("toScript").onclick=()=>{state.topicType=$("topicType").value;state.title=$("topicTitle").value.trim();state.tone=$("tone").value;if(!state.topicType||!state.title){alert("Mavzu turi va mavzu nomini kiriting.");return}configureScript();page("script")};
$("toStyle").onclick=()=>{state.script=[$("scriptHook").value,$("scriptIntro").value,$("scriptWhy").value,$("scriptDiff").value,$("scriptCta").value];state.voice=[$("voiceHook").value,$("voiceIntro").value,$("voiceWhy").value,$("voiceDiff").value,$("voiceCta").value];state.account={name:$("accountName").value,bio:$("accountBio").value,followers:$("accountFollowers").value,image:state.account.image};calculateDurations();if(total>60000){alert("Reels davomiyligi "+Math.ceil(total/1000)+" soniya bo‘ldi. Maksimum 60 soniya. Ovoz yoki ekran matnini qisqartiring.");return}if(!state.script[0].trim()||!state.script[1].trim()||!state.script[4].trim()){alert("Hook, E’lon va Chorlov maydonlarini to‘ldiring.");return}page("style")};
$("toPalette").onclick=()=>page("palette");$("toAnimation").onclick=()=>page("animation");$("toStudio").onclick=()=>{page("studio");try{buildStudio();start()}catch(error){console.error("NEX Studio error:",error);const summary=$("summary");if(summary)summary.textContent="Namoyish oynasini tayyorlashda xatolik yuz berdi: "+(error&&error.message?error.message:"Noma’lum xato");}};
function buildStudio(){calculateDurations();state.backgroundSeed=Math.floor(Math.random()*4294967295);state.lastScene=-1;$("summary").innerHTML="<strong>"+modes[state.mode]+"</strong><br>"+escapeHTML(state.topicType)+" · "+escapeHTML(state.title)+"<br>"+escapeHTML(state.tone)+" / "+state.style+" / "+state.palette+" / "+state.animation+"<br><strong>Davomiylik: "+Math.ceil(total/1000)+" soniya</strong>";$("sceneList").innerHTML="";scenes.forEach((s,i)=>{const b=document.createElement("button");b.className="scene-chip"+(i===0?" active":"");b.textContent=String(i+1).padStart(2,"0");b.title=sceneTitle(i);b.onclick=()=>{state.scene=i;state.elapsed=sceneStart(i);state.started=performance.now()-state.elapsed;updateSceneUI();};$("sceneList").appendChild(b)});$("sceneText").value=sceneCopy(0);$("sceneVoice").value=state.voice[0]||"";draw(performance.now())}
function configureScript(){const labels=state.mode==="manba"?["HOOK — qiziqtirish","RESURSNI TANISHTIRISH","NIMA UCHUN KERAK?","QANDAY FOYDALANISH?","CHORLOV — yakun"]:state.mode==="fakt"?["HOOK — savol yoki kutilmagan fikr","FAKTNI OCHISH","IZOH — sabab va dalil","QIZIQARLI TAFSILOT","YAKUNIY FIKR"]:state.mode==="ibora"?["HOOK — fikrga kirish","ASOSIY IBORA","MA’NO — chuqurroq izoh","HAYOTIY BOG‘LANISH","YAKUNIY FIKR"]:["HOOK — e’tiborni tortish","E’LON — akkauntni tanishtirish","NIMA UCHUN KUZATISH KERAK?","BOSHQA AKKAUNTLARDAN FARQI","CHORLOV — yakun"];["introLabel","whyLabel","diffLabel","ctaLabel"].forEach((id,i)=>$(id).textContent=labels[i+1]);$("scriptHook").placeholder=labels[0]+"...";$("accountFields").hidden=state.mode!=="tavsiya";["scriptHook","scriptIntro","scriptWhy","scriptDiff","scriptCta"].forEach((id,i)=>$(id).value=state.script[i]||"");["voiceHook","voiceIntro","voiceWhy","voiceDiff","voiceCta"].forEach((id,i)=>$(id).value=state.voice[i]||"")}
function sceneTitle(i){return state.mode==="tavsiya"?["HOOK","AKKAUNT TAVSIYASI","NIMA UCHUN?","BOSHQA AKKAUNTLARDAN FARQI","CHORLOV"][i]:scenes[i]}function sceneCopy(i){return state.script[i]||""}function wordCount(text){return String(text||"").trim().split(/\s+/).filter(Boolean).length}
function calculateDurations(){const ids=["voiceHook","voiceIntro","voiceWhy","voiceDiff","voiceCta"];state.voice=ids.map(id=>$(id).value.trim());state.sceneDurations=state.voice.map((v,i)=>{const words=wordCount(v||state.script[i]);return Math.max(2500,Math.ceil(words/2.5*1000)+850)});total=state.sceneDurations.reduce((a,b)=>a+b,0);refreshVoiceTiming()}
function sceneStart(i){return state.sceneDurations.slice(0,i).reduce((a,b)=>a+b,0)}
function sceneIndexAt(ms){let t=0;for(let i=0;i<state.sceneDurations.length;i++){t+=state.sceneDurations[i];if(ms<t)return i}return 4}
function refreshVoiceTiming(){const words=state.voice.reduce((a,v,i)=>a+wordCount(v||state.script[i]),0);const sec=Math.ceil(words/2.5);const duration=Math.ceil(total/1000);const el=$("voiceTiming");if(el)el.textContent="Jami: "+words+" ta so‘z · taxminiy o‘qish: "+sec+" soniya · Reels davomiyligi: "+duration+" soniya (maksimum 60)."+(total>60000?" Matnni qisqartiring.":"")}
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
$("sceneText").addEventListener("input",()=>{state.script[state.scene]=$("sceneText").value;const ids=["scriptHook","scriptIntro","scriptWhy","scriptDiff","scriptCta"];$(ids[state.scene]).value=$("sceneText").value;calculateDurations();draw(performance.now())});$("sceneVoice").addEventListener("input",()=>{state.voice[state.scene]=$("sceneVoice").value;const ids=["voiceHook","voiceIntro","voiceWhy","voiceDiff","voiceCta"];$(ids[state.scene]).value=$("sceneVoice").value;calculateDurations();draw(performance.now())});
["scriptHook","scriptIntro","scriptWhy","scriptDiff","scriptCta"].forEach((id,i)=>$(id).addEventListener("input",()=>{state.script[i]=$(id).value}));
$("accountImage").addEventListener("change",e=>{const file=e.target.files&&e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{state.account.image=reader.result;accountPhoto=new Image();accountPhoto.onload=()=>draw();accountPhoto.src=reader.result};reader.readAsDataURL(file)});
function updateSceneUI(){state.scene=sceneIndexAt(state.elapsed);document.querySelectorAll(".scene-chip").forEach((b,i)=>b.classList.toggle("active",i===state.scene));$("sceneCounter").textContent="SAHNA "+String(state.scene+1).padStart(2,"0")+" / 05";$("sceneTime").textContent="00:"+String(Math.floor(state.elapsed/1000)).padStart(2,"0");$("progress").style.width=(state.elapsed/total*100)+"%";if(state.lastScene!==state.scene){$("sceneText").value=sceneCopy(state.scene);$("sceneVoice").value=state.voice[state.scene]||"";state.lastScene=state.scene}draw(performance.now())}
const canvas=$("reelCanvas"),ctx=canvas.getContext("2d"),rc=$("recordCanvas"),rctx=rc.getContext("2d");let accountPhoto=null;
function rounded(c,x,y,w,h,r){c.beginPath();c.roundRect(x,y,w,h,r)}
function seededRandom(seed){let x=seed|0;return()=>{x=(x+0x6D2B79F5)|0;let t=Math.imul(x^x>>>15,1|x);t^=t+Math.imul(t^t>>>7,61|t);return((t^t>>>14)>>>0)/4294967296}}
function drawProceduralBackground(c,w,h,idx,pal,now){
 // Lightweight animated procedural background; geometry composition is seeded, motion is continuous.
 const rand=seededRandom((state.backgroundSeed^Math.imul(idx+1,0x9E3779B1))|0);
 const t=now/1000,bg=pal[0],a=pal[2],b=pal[3]||pal[2],fg=pal[1];
 const driftX=Math.sin(t*.22+idx)*w*.13,driftY=Math.cos(t*.18+idx*.7)*h*.1;
 const angle=rand()*Math.PI*2+t*.035;
 const g=c.createLinearGradient(w*(.5+Math.cos(angle)*.75)+driftX,h*(.5+Math.sin(angle)*.75)+driftY,w*(.5-Math.cos(angle)*.75)-driftX,h*(.5-Math.sin(angle)*.75)-driftY);
 g.addColorStop(0,bg);g.addColorStop(.38,a+"66");g.addColorStop(.72,b+"66");g.addColorStop(1,bg);
 c.fillStyle=g;c.fillRect(0,0,w,h);
 // Moving light fields.
 for(let n=0;n<4;n++){
  const phase=t*(.18+n*.035)+n*2.1+idx*.55;
  const x=w*(.5+Math.sin(phase)*.42),y=h*(.5+Math.cos(phase*.83)*.38);
  const r=Math.max(w,h)*(.25+.12*Math.sin(phase*1.4));
  const glow=c.createRadialGradient(x,y,0,x,y,r),col=n%2?a:b;
  glow.addColorStop(0,col+"77");glow.addColorStop(.42,col+"25");glow.addColorStop(1,col+"00");
  c.fillStyle=glow;c.fillRect(0,0,w,h);
 }
 const families=8,layers=3+Math.floor(rand()*3);
 for(let layer=0;layer<layers;layer++){
  const family=Math.floor(rand()*families),x=w*(.08+rand()*.84),y=h*(.08+rand()*.84);
  const scale=.12+rand()*.34,rot=(rand()-.5)*Math.PI*.9,accent=rand()>.5?a:b;
  const phase=rand()*Math.PI*2,speed=.16+rand()*.3;
  c.save();
  c.translate(x+Math.sin(t*speed+phase)*w*.025,y+Math.cos(t*speed*.83+phase)*h*.022);
  c.rotate(rot+Math.sin(t*speed*.7+phase)*.09);
  const pulse=1+Math.sin(t*speed+phase)*.045;
  c.scale(pulse,pulse);c.globalAlpha=.16+rand()*.34;c.strokeStyle=layer%2?accent:fg;c.fillStyle=accent;c.lineWidth=Math.max(1,w*(.002+rand()*.005));
  if(family===0){
   for(let k=0;k<3+Math.floor(rand()*5);k++){const z=.55+k*.23;c.beginPath();c.ellipse(0,0,w*scale*z,h*scale*.32*z,rand()*.25+t*.025,0,Math.PI*2);c.stroke()}
   const orbit=t*(.45+layer*.07)+phase;c.beginPath();c.arc(Math.cos(orbit)*w*scale*.72,Math.sin(orbit)*h*scale*.23,w*scale*.035,0,Math.PI*2);c.fill();
  }else if(family===1){
   for(let k=0;k<2+Math.floor(rand()*4);k++){const z=1+k*.22;c.strokeRect(-w*scale*z,-h*scale*.22*z,w*scale*2*z,h*scale*.44*z)}
   c.globalAlpha*=.65;c.fillRect(-w*scale*.8,-h*scale*.035,w*scale*.55,h*scale*.07);
  }else if(family===2){
   for(let k=0;k<2+Math.floor(rand()*4);k++){const z=.55+k*.24;c.beginPath();c.moveTo(-w*scale*z,-h*scale*.45);c.lineTo(w*scale*z,-h*scale*.12);c.lineTo(w*scale*.38*z,h*scale*.55);c.lineTo(-w*scale*.72*z,h*scale*.3);c.closePath();c.stroke()}
  }else if(family===3){
   for(let k=0;k<3+Math.floor(rand()*4);k++){const z=.55+k*.2;c.beginPath();c.ellipse((rand()-.5)*w*scale+Math.sin(t*.25+k)*w*.025,(rand()-.5)*h*scale,w*scale*z,h*scale*.3*z,rand()+t*.025,0,Math.PI*2);c.stroke()}
  }else if(family===4){
   for(let k=0;k<5+Math.floor(rand()*5);k++){const z=.35+k*.2+t*.018%1*.12;c.beginPath();c.moveTo(-w*scale*z,-h*scale*.3*z);c.lineTo(w*scale*z,-h*scale*.3*z);c.lineTo(w*scale*1.2*z,h*scale*.3*z);c.lineTo(-w*scale*1.2*z,h*scale*.3*z);c.closePath();c.stroke()}
  }else if(family===5){
   const step=w*scale*.34,offset=(t*9+phase*20)%step;
   for(let gx=-2;gx<=2;gx++){for(let gy=-2;gy<=2;gy++){if(rand()>.35)c.strokeRect(gx*step+offset*.12,gy*step-offset*.12,step*.58,step*.58)}}
  }else if(family===6){
   for(let k=0;k<5+Math.floor(rand()*5);k++){const yy=(k-4)*h*scale*.13;c.beginPath();c.moveTo(-w*scale,yy);c.bezierCurveTo(-w*scale*.35,yy-h*scale*(.45+Math.sin(t*.7+k)*.1),w*scale*.35,yy+h*scale*(.45+Math.sin(t*.7+k)*.1),w*scale,yy);c.stroke()}
  }else{
   const count=7+Math.floor(rand()*9),radius=w*scale,spin=t*.12+phase;
   for(let k=0;k<count;k++){const q=k/count*Math.PI*2+spin;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(q)*radius,Math.sin(q)*radius);c.stroke()}
   c.beginPath();for(let k=0;k<count;k++){const q=k/count*Math.PI*2+spin,r=radius*(.35+(k%2)*.16);if(k===0)c.moveTo(Math.cos(q)*r,Math.sin(q)*r);else c.lineTo(Math.cos(q)*r,Math.sin(q)*r)}c.closePath();c.stroke();
  }
  c.restore();
 }
 // A soft moving light sweep adds visible motion without heavy filters or libraries.
 const sweep=((t*.105+idx*.19)%1.35)-.18;
 c.save();c.globalAlpha=.12;c.translate(w*sweep,h*.5);c.rotate(-.24);
 const beam=c.createLinearGradient(-w*.16,0,w*.16,0);beam.addColorStop(0,a+"00");beam.addColorStop(.5,a+"99");beam.addColorStop(1,a+"00");
 c.fillStyle=beam;c.fillRect(-w*.16,-h,w*.32,h*2);c.restore();
 // Fine particles drift continuously through the composition.
 const dots=seededRandom((state.backgroundSeed^Math.imul(idx+71,0x27D4EB2D))|0);
 c.save();c.fillStyle=fg;
 for(let i=0;i<52;i++){
  const bx=dots()*w,by=dots()*h,speed=8+dots()*28,phase=dots()*Math.PI*2;
  const x=(bx+Math.sin(t*.35+phase)*w*.012+w+10)%w;
  const y=(by+t*speed)%h,r=.6+dots()*w*.0018;
  c.globalAlpha=.1+.18*(.5+.5*Math.sin(t*1.7+phase));c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();
 }
 c.restore();
}

function draw3DStage(c,w,h,idx,pal,now){
 const t=now/1000,accent=pal[2],secondary=pal[3]||pal[2],fg=pal[1];
 // Perspective floor: converging rails create a visible vanishing point.
 const vanishX=w*(.5+Math.sin(t*.16+idx)*.07),vanishY=h*.43;
 c.save();c.globalAlpha=.22;c.lineWidth=Math.max(1,w*.002);c.strokeStyle=secondary;
 for(let i=-6;i<=6;i++){
  c.beginPath();c.moveTo(vanishX+i*w*.012,vanishY);c.lineTo(w*(.5+i*.19),h*1.04);c.stroke();
 }
 for(let j=1;j<=8;j++){
  const q=j/8,yy=vanishY+(h-vanishY)*q*q;
  c.globalAlpha=.08+q*.13;c.beginPath();c.moveTo(0,yy);c.lineTo(w,yy);c.stroke();
 }
 c.restore();
 // Three-dimensional rotating wire objects, projected from a lightweight 3D model.
 const project=(x,y,z,cx,cy,scale,rot)=>{
  const X=x*Math.cos(rot)-z*Math.sin(rot),Z=x*Math.sin(rot)+z*Math.cos(rot);
  const depth=3.8/(3.8+Z);
  return [cx+X*scale*depth,cy+y*scale*depth,depth];
 };
 const cube=(cx,cy,size,rot,color,phase)=>{
  const v=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
  const pts=v.map(p=>project(p[0],p[1],p[2],cx,cy,size,rot+phase));
  const edges=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
  c.save();c.strokeStyle=color;c.lineWidth=Math.max(1.2,w*.003);c.shadowColor=color;c.shadowBlur=w*.018;
  edges.forEach((e,i)=>{c.globalAlpha=.32+pts[e[0]][2]*.24;c.beginPath();c.moveTo(pts[e[0]][0],pts[e[0]][1]);c.lineTo(pts[e[1]][0],pts[e[1]][1]);c.stroke()});
  c.restore();
 };
 cube(w*.16+Math.sin(t*.42+idx)*w*.025,h*(.26+Math.sin(t*.55)*.025),w*.105,t*.42,accent,.35);
 cube(w*.84+Math.cos(t*.34+idx)*w*.02,h*(.66+Math.cos(t*.48)*.025),w*.075,-t*.31,secondary,.6);
 // Layered glass-like 3D slabs with visible side faces.
 for(let i=0;i<3;i++){
  const phase=t*.38+i*2.1+idx*.7,x=w*(.5+Math.sin(phase)*.34),y=h*(.22+i*.25+Math.cos(phase*.8)*.035);
  const ww=w*(.13-i*.018),hh=h*(.018-i*.002),dx=w*.025,dy=h*.018;
  c.save();c.globalAlpha=.17;c.fillStyle=i%2?secondary:accent;c.strokeStyle=fg;c.lineWidth=Math.max(1,w*.0018);
  c.beginPath();c.moveTo(x-ww,y-hh);c.lineTo(x+ww,y-hh);c.lineTo(x+ww+dx,y-hh+dy);c.lineTo(x-ww+dx,y-hh+dy);c.closePath();c.fill();c.stroke();
  c.globalAlpha=.12;c.beginPath();c.moveTo(x-ww,y-hh);c.lineTo(x-ww+dx,y-hh+dy);c.lineTo(x-ww+dx,y+hh+dy);c.lineTo(x-ww,y+hh);c.closePath();c.fill();
  c.restore();
 }
 // Rotating elliptical depth rings.
 c.save();c.translate(w*.5,h*.52);c.rotate(Math.sin(t*.25+idx)*.16);c.globalAlpha=.13;c.strokeStyle=accent;c.lineWidth=w*.003;
 for(let i=0;i<3;i++){c.beginPath();c.ellipse(0,0,w*(.27+i*.055),h*(.075+i*.016),t*.08+i*.22,0,Math.PI*2);c.stroke()}
 c.restore();
}

function drawScene(c,w,h,now){
 const pal=paletteMap[state.palette]||paletteMap.Midnight,bg=pal[0],fg=pal[1],ac=pal[2],idx=state.scene;
 const local=Math.max(0,Math.min(1,(state.elapsed-sceneStart(idx))/state.sceneDurations[idx]));
 const txt=$("sceneText").value||sceneCopy(idx),t=now/1000;
 c.save();c.fillStyle=bg;c.fillRect(0,0,w,h);drawProceduralBackground(c,w,h,idx,pal,now);draw3DStage(c,w,h,idx,pal,now);
 const glow=c.createRadialGradient(w*(idx%2?.78:.2)+Math.sin(t*.24)*w*.06,h*(.24+.08*Math.sin(t*.7)),0,w*.5,h*.48,w*.82);
 glow.addColorStop(0,ac+"55");glow.addColorStop(.48,ac+"18");glow.addColorStop(1,bg);
 c.fillStyle=glow;c.fillRect(0,0,w,h);
 // Camera path changes by scene, with a gentle continuous handheld drift.
 const ease=1-Math.pow(1-local,3),cam=t*.32+idx*1.7;
 c.save();
 c.translate(Math.sin(cam)*w*.009,Math.cos(cam*.8)*h*.008);
 if(idx===0){c.translate((1-ease)*w*.42,0);c.rotate((1-ease)*-.16);c.scale(.72+.28*ease,.72+.28*ease)}
 else if(idx===1){c.translate(0,(1-ease)*h*.34);c.rotate((1-ease)*.09);c.scale(.82+.18*ease,.82+.18*ease)}
 else if(idx===2){c.translate((1-ease)*-w*.34,(1-ease)*h*.08);c.scale(.68+.32*ease,.68+.32*ease)}
 else if(idx===3){c.translate((1-ease)*w*.3,(1-ease)*-h*.12);c.rotate((1-ease)*.13);c.scale(.78+.22*ease,.78+.22*ease)}
 else{c.translate(0,(1-ease)*-h*.28);c.rotate((1-ease)*-.1);c.scale(.76+.24*ease,.76+.24*ease)}
 const layoutRand=seededRandom((state.backgroundSeed^Math.imul(idx+19,0x85EBCA6B))|0);
 const entrance=(Math.floor(layoutRand()*6)+idx)%6,alignPick=Math.floor(layoutRand()*3);
 const align=alignPick===0?"left":alignPick===1?"center":"right";
 const anchorX=align==="left"?w*.13:align==="right"?w*.87:w*.5;
 const maxW=w*.74;
 // Matnni qisqartirib tashlamasdan, ekran balandligiga moslab joylashtirish.
 let baseSize=w*(.075+layoutRand()*.012),lines=[];
 const wrapText=size=>{
  const out=[];let line="";
  c.font="850 "+size+"px system-ui";
  for(const word of String(txt).trim().split(/\\s+/).filter(Boolean)){
   const test=line?line+" "+word:word;
   if(line&&c.measureText(test).width>maxW){out.push(line);line=word}else line=test;
  }
  if(line)out.push(line);
  return out;
 };
 lines=wrapText(baseSize);
 while(lines.length>7&&baseSize>w*.043){baseSize*=.92;lines=wrapText(baseSize)}
 if(lines.length>7){lines=lines.slice(0,7);lines[6]=lines[6].replace(/[.,;:!?…]*$/,"")+"…"}
 const sizes=lines.map((_,i)=>i===0?baseSize:baseSize*.76);
 const lineHeights=sizes.map((size,i)=>size*(i===0?1.34:1.38));
 const blockH=lineHeights.reduce((a,b)=>a+b,0);
 const centerY=h*(.48+layoutRand()*.06),top=Math.max(h*.17,Math.min(h*.76-blockH,centerY-blockH*.5));
 // Matn ortida yengil kontrast qatlam: fon harakatda qoladi, yozuv esa ravshan o‘qiladi.
 const plateX=align==="left"?anchorX-w*.035:align==="right"?anchorX-maxW-w*.035:anchorX-maxW*.5-w*.035;
 const plateY=top-baseSize*.42;
 c.save();c.globalAlpha=.24;c.fillStyle=bg;c.shadowColor="#000";c.shadowBlur=w*.045;
 c.beginPath();c.roundRect(plateX,plateY,maxW+w*.07,blockH+baseSize*.85,w*.025);c.fill();c.restore();
 let y=top;
 lines.forEach((ln,i)=>{
  const lineProgress=Math.max(0,Math.min(1,(local-i*.085)/.48));
  if(lineProgress<=0){y+=lineHeights[i];return}
  const k=1-Math.pow(1-lineProgress,3),fontSize=sizes[i];
  let dx=0,dy=0,rot=0,scale=1;
  if(entrance===0)dx=(1-k)*-w*.72;
  else if(entrance===1)dx=(1-k)*w*.72;
  else if(entrance===2)dy=(1-k)*h*.34;
  else if(entrance===3)dy=(1-k)*-h*.34;
  else if(entrance===4){scale=.55+.45*k;rot=(1-k)*-.18}
  else{dx=(1-k)*w*.2;dy=(1-k)*h*.16;rot=(1-k)*.13;scale=.82+.18*k}
  c.save();c.globalAlpha=k;c.translate(anchorX+dx,y+dy);c.rotate(rot);c.scale(scale,scale);
  c.textAlign=align;c.textBaseline="middle";c.font=(i===0?"950 ":"760 ")+fontSize+"px system-ui";
  const depth=i===0?13:7,tilt=(idx%2===0?.055:-.055)*(1-local*.3);
  c.transform(1,tilt,0,1,0,0);
  for(let z=depth;z>=1;z--){c.fillStyle=z%2?ac+"bb":"#02040add";c.fillText(ln,z*w*.0018,z*w*.0024)}
  c.shadowColor="#000000";c.shadowBlur=w*.03;c.shadowOffsetX=w*.009;c.shadowOffsetY=w*.014;
  c.fillStyle=i===0?ac:fg;c.fillText(ln,0,0);
  c.shadowColor=ac;c.shadowBlur=w*.018;c.shadowOffsetX=0;c.shadowOffsetY=0;
  c.strokeStyle=(i===0?ac:fg)+"66";c.lineWidth=Math.max(1,w*.001);c.strokeText(ln,0,0);
  c.restore();y+=lineHeights[i];
 });
 // Asosiy sarlavhani ikkilamchi matndan ajratadigan nozik grafik urg‘u.
 c.save();c.globalAlpha=.78;c.fillStyle=ac;
 const ruleY=top+lineHeights[0]*.78,ruleW=Math.min(w*.24,Math.max(w*.09,c.measureText(lines[0]||"").width*.28));
 const ruleX=align==="left"?anchorX:align==="right"?anchorX-ruleW:anchorX-ruleW/2;
 c.fillRect(ruleX,ruleY,ruleW,Math.max(2,w*.004));c.restore();
 c.restore();
 // Account profile reveal as a floating 3D card, only on recommendation scene.
 if(idx===1&&state.mode==="tavsiya"){
  const p=Math.min(1,Math.max(0,(local-.12)*2.4));c.save();
  c.translate(w*.5+Math.sin(t*.65)*w*.012,h*.78+Math.cos(t*.8)*h*.008);c.rotate((1-p)*-.13+Math.sin(t*.45)*.012);c.scale(.82+.18*p,.82+.18*p);c.globalAlpha=p;
  c.shadowColor="#00000099";c.shadowBlur=w*.05;c.fillStyle="#ffffff12";c.strokeStyle=ac;c.lineWidth=w*.004;
  c.beginPath();c.roundRect(-w*.39,-h*.105,w*.78,h*.21,w*.025);c.fill();c.stroke();c.shadowBlur=0;
  if(accountPhoto&&accountPhoto.complete){c.save();c.beginPath();c.arc(-w*.27,0,w*.065,0,Math.PI*2);c.clip();c.drawImage(accountPhoto,-w*.335,-w*.065,w*.13,w*.13);c.restore()}
  c.textAlign="left";c.textBaseline="middle";c.fillStyle=fg;c.font="800 "+w*.036+"px system-ui";c.fillText(state.account.name||"Tavsiya etilgan akkaunt",-w*.16,-h*.025);
  c.font="500 "+w*.025+"px system-ui";c.fillStyle=fg+"cc";c.fillText(state.account.bio||"Foydali sahifa bilan tanishing",-w*.16,h*.025);
  if(state.account.followers)c.fillText(state.account.followers+" obunachi",-w*.16,h*.065);
  c.restore();
 }
 if(local<.22){const q=1-local/.22;c.save();c.globalAlpha=q*.9;c.fillStyle=ac;c.beginPath();c.moveTo(w*(1-q*1.8),0);c.lineTo(w*(1.15-q*1.8),0);c.lineTo(w*(.15-q*1.8),h);c.lineTo(w*(-.0-q*1.8),h);c.closePath();c.fill();c.globalAlpha=q*.45;c.fillStyle=fg;c.fillRect(w*(.92-q*1.8),0,w*.012,h);c.restore()}
 drawBrand(c,w,h,ac,fg);
 c.restore();
}
function drawBrand(c,w,h,ac,fg){
const first=state.elapsed<1250,last=state.elapsed>total-1750;if(!first&&!last)return;
const p=first?Math.min(1,state.elapsed/420):Math.min(1,(state.elapsed-(total-1750))/520);
const fade=first?Math.min(1,state.elapsed/180,(1250-state.elapsed)/220):Math.min(1,(state.elapsed-(total-1750))/240,(total-state.elapsed)/260);c.save();c.globalAlpha=Math.max(0,fade);
c.translate(w*.5,h*(first?.22:.25));const scale=.78+.22*p;c.scale(scale,scale);
c.textAlign="center";c.textBaseline="middle";
c.shadowColor=ac;c.shadowBlur=w*.035;c.fillStyle=fg;c.font="950 "+(w*.19)+"px system-ui";c.fillText("NEX",0,0);c.shadowBlur=0;
// Abstract orbit/play mark, a short animated sweep around the wordmark.
c.strokeStyle=ac;c.lineWidth=w*.009;c.beginPath();c.ellipse(0,0,w*.29,h*.055,-.2,Math.PI*.08,Math.PI*(.25+1.55*p));c.stroke();
c.fillStyle=ac;c.beginPath();c.moveTo(w*.245,-h*.012);c.lineTo(w*.28,0);c.lineTo(w*.245,h*.012);c.closePath();c.fill();
if(last){c.font="600 "+(w*.031)+"px system-ui";c.fillStyle=fg;c.fillText("Fikr va imkoniyatlar makoni",0,h*.085)}
c.restore();
}
function draw(){
const now=performance.now();
if(canvas&&ctx)drawScene(ctx,Number(canvas.width),Number(canvas.height),now);
if(rc&&rctx&&state.recording&&!$("recordOverlay").hidden)drawScene(rctx,Number(rc.width),Number(rc.height),now);
}
function frame(now){if(state.playing){state.elapsed=Math.min(total,now-state.started);if(state.elapsed>=total){state.playing=false;state.elapsed=total}updateSceneUI()}draw();state.raf=requestAnimationFrame(frame)}
function start(){if(total>60000){alert("Reels 60 soniyadan oshib ketdi. Matnni qisqartiring.");return}cancelAnimationFrame(state.raf);state.elapsed=0;state.started=performance.now();state.playing=true;state.raf=requestAnimationFrame(frame);$("startPreview").textContent="Ⅱ Pauza"}
$("startPreview").onclick=()=>{if(!state.playing&&total>60000){alert("Reels 60 soniyadan oshib ketdi. Matnni qisqartiring.");return}if(state.playing){state.playing=false;$("startPreview").textContent="▶ Davom etish"}else{state.started=performance.now()-state.elapsed;state.playing=true;$("startPreview").textContent="Ⅱ Pauza"}};
$("restart").onclick=()=>start();
$("shuffleBackground").onclick=()=>{
 const button=$("shuffleBackground");
 state.backgroundSeed=(state.backgroundSeed+Math.floor(Math.random()*0x7fffffff)+1)>>>0;
 draw();
 button.classList.remove("shuffle-flash");
 void button.offsetWidth;
 button.classList.add("shuffle-flash");
 button.textContent="✓ Yangi fon tayyor!";
 if(button._shuffleTimer)clearTimeout(button._shuffleTimer);
 button._shuffleTimer=setTimeout(()=>{
  button.classList.remove("shuffle-flash");
  button.textContent="✧ Yangi fon kombinatsiyasi";
 },1400);
};
$("recordMode").onclick=()=>{if(total>60000){alert("Reels 60 soniyadan oshib ketdi. Matnni qisqartiring.");return}state.recording=true;$("recordOverlay").hidden=false;state.started=performance.now()-state.elapsed;state.playing=true;draw()};
$("recordPause").onclick=()=>{state.playing=!state.playing;if(state.playing)state.started=performance.now()-state.elapsed;$("recordPause").textContent=state.playing?"Ⅱ":"▶"};
$("recordExit").onclick=()=>{state.recording=false;$("recordOverlay").hidden=true;state.playing=false;$("startPreview").textContent="▶ Davom etish";draw()};
$("finish").onclick=()=>{state.playing=false;state.recording=false;$("recordOverlay").hidden=true;page("home")};
window.addEventListener("resize",draw);
})();