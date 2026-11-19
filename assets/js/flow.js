(()=>{"use strict";
const $=id=>document.getElementById(id), pages=["home","content","script","style","palette","animation","studio"];
const labels=["01 — YO‘NALISH","02 — MAZMUN","03 — SSENARIY","04 — VIZUAL USLUB","05 — RANG PALETRASI","06 — ANIMATSIYA","07 — STUDIYA"];
const state={mode:"",script:["","","","",""],voice:["","","","",""],sceneDurations:[5000,5000,5000,5000,5000],account:{name:"",bio:"",followers:"",image:""},topicType:"",title:"",tone:"Jiddiy",style:"Minimalistik",palette:"Midnight",animation:"Silliq",scene:0,playing:false,started:0,elapsed:0,raf:0,recording:false};
const modes={tavsiya:"Tavsiya akkaunt",manba:"Foydali manba",fakt:"Qiziqarli fakt",ibora:"Maxsus iboralar"};
const scenes=["Kirish","Asosiy fikr","Izoh","Urg‘u","Yakun"];
const paletteMap={Midnight:["#090d18","#d8e4f5","#8d79ff"],Monochrome:["#101010","#f4f1e9","#999999"],"Warm editorial":["#211812","#fff0d8","#d89a60"],Electric:["#07151b","#e4fbff","#48d8e8"],Burgundy:["#1d1019","#fff0f2","#d86b8a"]};
let total=25000;
function page(name){pages.forEach((p,i)=>$("page-"+p).classList.toggle("active",p===name));$("stepLabel").textContent=labels[pages.indexOf(name)];window.scrollTo(0,0)}
function selectGroup(id,key){$(id).querySelectorAll("button").forEach(b=>{b.classList.toggle("selected",b.dataset.value===key)});}
function bindOptions(id,prop){$(id).querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{state[prop]=b.dataset.value;selectGroup(id,state[prop]);}));}
document.querySelectorAll(".direction").forEach(b=>b.addEventListener("click",()=>{state.mode=b.dataset.mode;page("content")}));
document.querySelectorAll("[data-back]").forEach(b=>b.addEventListener("click",()=>page(b.dataset.back)));
bindOptions("styleOptions","style");bindOptions("paletteOptions","palette");bindOptions("animationOptions","animation");
$("toScript").onclick=()=>{state.topicType=$("topicType").value;state.title=$("topicTitle").value.trim();state.tone=$("tone").value;if(!state.topicType||!state.title){alert("Mavzu turi va mavzu nomini kiriting.");return}configureScript();page("script")};
$("toStyle").onclick=()=>{state.script=[$("scriptHook").value,$("scriptIntro").value,$("scriptWhy").value,$("scriptDiff").value,$("scriptCta").value];state.voice=[$("voiceHook").value,$("voiceIntro").value,$("voiceWhy").value,$("voiceDiff").value,$("voiceCta").value];state.account={name:$("accountName").value,bio:$("accountBio").value,followers:$("accountFollowers").value,image:state.account.image};calculateDurations();if(total>60000){alert("Ovoz matnlari 1 daqiqadan uzun. Iltimos, matnni qisqartiring.");return}if(!state.script[0].trim()||!state.script[1].trim()||!state.script[4].trim()){alert("Hook, E’lon va Chorlov maydonlarini to‘ldiring.");return}page("style")};
$("toPalette").onclick=()=>page("palette");$("toAnimation").onclick=()=>page("animation");$("toStudio").onclick=()=>{buildStudio();page("studio");start()};
function buildStudio(){calculateDurations();state.lastScene=-1;$("summary").innerHTML="<strong>"+modes[state.mode]+"</strong><br>"+escapeHTML(state.topicType)+" · "+escapeHTML(state.title)+"<br>"+escapeHTML(state.tone)+" / "+state.style+" / "+state.palette+" / "+state.animation;$("sceneList").innerHTML="";scenes.forEach((s,i)=>{const b=document.createElement("button");b.className="scene-chip"+(i===0?" active":"");b.textContent=String(i+1).padStart(2,"0");b.title=sceneTitle(i);b.onclick=()=>{state.scene=i;state.elapsed=sceneStart(i);state.started=performance.now()-state.elapsed;updateSceneUI();};$("sceneList").appendChild(b)});$("sceneText").value=sceneCopy(0);$("sceneVoice").value=state.voice[0]||"";draw(performance.now())}
function configureScript(){const labels=state.mode==="manba"?["HOOK — qiziqtirish","RESURSNI TANISHTIRISH","NIMA UCHUN KERAK?","QANDAY FOYDALANISH?","CHORLOV — yakun"]:state.mode==="fakt"?["HOOK — savol yoki kutilmagan fikr","FAKTNI OCHISH","IZOH — sabab va dalil","QIZIQARLI TAFSILOT","YAKUNIY FIKR"]:state.mode==="ibora"?["HOOK — fikrga kirish","ASOSIY IBORA","MA’NO — chuqurroq izoh","HAYOTIY BOG‘LANISH","YAKUNIY FIKR"]:["HOOK — e’tiborni tortish","E’LON — akkauntni tanishtirish","NIMA UCHUN KUZATISH KERAK?","BOSHQA AKKAUNTLARDAN FARQI","CHORLOV — yakun"];["introLabel","whyLabel","diffLabel","ctaLabel"].forEach((id,i)=>$(id).textContent=labels[i+1]);$("scriptHook").placeholder=labels[0]+"...";$("accountFields").hidden=state.mode!=="tavsiya";["scriptHook","scriptIntro","scriptWhy","scriptDiff","scriptCta"].forEach((id,i)=>$(id).value=state.script[i]||"");["voiceHook","voiceIntro","voiceWhy","voiceDiff","voiceCta"].forEach((id,i)=>$(id).value=state.voice[i]||"")}
function sceneTitle(i){return state.mode==="tavsiya"?["HOOK","AKKAUNT TAVSIYASI","NIMA UCHUN?","BOSHQA AKKAUNTLARDAN FARQI","CHORLOV"][i]:scenes[i]}function sceneCopy(i){return state.script[i]||""}function calculateDurations(){const ids=["voiceHook","voiceIntro","voiceWhy","voiceDiff","voiceCta"];state.voice=ids.map(id=>$(id).value.trim());state.sceneDurations=state.voice.map((v,i)=>{const words=(v||state.script[i]||"").trim().split(/\s+/).filter(Boolean).length;return Math.max(3500,Math.ceil(words/2.35*1000)+900)});const sum=state.sceneDurations.reduce((a,b)=>a+b,0);total=sum;ids.forEach((id,i)=>{const el=$(id);if(el)el.addEventListener("input",()=>{state.voice[i]=el.value;refreshVoiceTiming()})});refreshVoiceTiming()}function sceneStart(i){return state.sceneDurations.slice(0,i).reduce((a,b)=>a+b,0)}function sceneIndexAt(ms){let t=0;for(let i=0;i<state.sceneDurations.length;i++){t+=state.sceneDurations[i];if(ms<t)return i}return 4}function refreshVoiceTiming(){const words=state.voice.reduce((a,v)=>a+v.trim().split(/\s+/).filter(Boolean).length,0);const sec=Math.ceil(words/2.35);const el=$("voiceTiming");if(el)el.textContent="Ovoz matni: "+words+" ta so‘z · taxminiy o‘qish vaqti "+sec+" soniya. Sahna vaqti ovoz uzunligiga qarab hisoblanadi."}
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
$("sceneText").addEventListener("input",()=>{state.script[state.scene]=$("sceneText").value;const ids=["scriptHook","scriptIntro","scriptWhy","scriptDiff","scriptCta"];$(ids[state.scene]).value=$("sceneText").value;draw(performance.now())});$("sceneVoice").addEventListener("input",()=>{state.voice[state.scene]=$("sceneVoice").value;const ids=["voiceHook","voiceIntro","voiceWhy","voiceDiff","voiceCta"];$(ids[state.scene]).value=$("sceneVoice").value;calculateDurations();draw(performance.now())});
["scriptHook","scriptIntro","scriptWhy","scriptDiff","scriptCta"].forEach((id,i)=>$(id).addEventListener("input",()=>{state.script[i]=$(id).value}));
$("accountImage").addEventListener("change",e=>{const file=e.target.files&&e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{state.account.image=reader.result;accountPhoto=new Image();accountPhoto.onload=()=>draw();accountPhoto.src=reader.result};reader.readAsDataURL(file)});
function updateSceneUI(){state.scene=sceneIndexAt(state.elapsed);document.querySelectorAll(".scene-chip").forEach((b,i)=>b.classList.toggle("active",i===state.scene));$("sceneCounter").textContent="SAHNA "+String(state.scene+1).padStart(2,"0")+" / 05";$("sceneTime").textContent="00:"+String(Math.floor(state.elapsed/1000)).padStart(2,"0");$("progress").style.width=(state.elapsed/total*100)+"%";if(state.lastScene!==state.scene){$("sceneText").value=sceneCopy(state.scene);$("sceneVoice").value=state.voice[state.scene]||"";state.lastScene=state.scene}draw(performance.now())}
const canvas=$("reelCanvas"),ctx=canvas.getContext("2d"),rc=$("recordCanvas"),rctx=rc.getContext("2d");let accountPhoto=null;
function rounded(c,x,y,w,h,r){c.beginPath();c.roundRect(x,y,w,h,r)}
function drawScene(c,w,h,now){
const pal=paletteMap[state.palette],bg=pal[0],fg=pal[1],ac=pal[2],idx=state.scene;
const local=Math.max(0,Math.min(1,(state.elapsed-sceneStart(idx))/state.sceneDurations[idx]));
const txt=$( "sceneText" ).value||sceneCopy(idx);
const t=now/1000;
c.save();c.fillStyle=bg;c.fillRect(0,0,w,h);
const glow=c.createRadialGradient(w*(idx%2?.78:.2),h*(.24+.08*Math.sin(t)),0,w*.5,h*.48,w*.82);
glow.addColorStop(0,ac+"66");glow.addColorStop(.48,ac+"18");glow.addColorStop(1,bg);
c.fillStyle=glow;c.fillRect(0,0,w,h);
// Deep perspective stage: subtle vanishing-point grid.
c.save();c.globalAlpha=.18;c.strokeStyle=ac;c.lineWidth=Math.max(1,w*.0018);
const horizon=h*.48,vanish=w*.5;
for(let i=-7;i<=7;i++){c.beginPath();c.moveTo(vanish+i*w*.018,horizon);c.lineTo(vanish+i*w*.22,h*1.04);c.stroke()}
for(let j=0;j<9;j++){const y=horizon+Math.pow(j/8,1.8)*h*.56;c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke()}
c.restore();
// Large dimensional abstract forms change by scene.
c.save();c.translate(w*.5,h*.28);c.rotate((idx%2?1:-1)*(.08+local*.12));c.globalAlpha=.24;
for(let k=0;k<3;k++){const z=1+k*.24;c.strokeStyle=k===1?fg:ac;c.lineWidth=w*.008;c.beginPath();c.roundRect(-w*.29*z,-h*.13*z,w*.58*z,h*.26*z,w*.035*z);c.stroke()}
c.restore();
// Distinct replay-like camera move per scene.
const ease=1-Math.pow(1-local,3);
c.save();
if(idx===0){c.translate((1-ease)*w*.42,0);c.rotate((1-ease)*-.16);c.scale(.72+.28*ease,.72+.28*ease)}
else if(idx===1){c.translate(0,(1-ease)*h*.34);c.rotate((1-ease)*.09);c.scale(.82+.18*ease,.82+.18*ease)}
else if(idx===2){c.translate((1-ease)*-w*.34,(1-ease)*h*.08);c.scale(.68+.32*ease,.68+.32*ease)}
else if(idx===3){c.translate((1-ease)*w*.3,(1-ease)*-h*.12);c.rotate((1-ease)*.13);c.scale(.78+.22*ease,.78+.22*ease)}
else{c.translate(0,(1-ease)*-h*.28);c.rotate((1-ease)*-.1);c.scale(.76+.24*ease,.76+.24*ease)}
c.globalAlpha=ease;
const maxW=w*.78,baseSize=idx===3?w*.095:w*.082;
const words=txt.split(/\\s+/),lines=[];let line="";
c.font="900 "+baseSize+"px system-ui";
for(const word of words){const test=line?line+" "+word:word;if(c.measureText(test).width>maxW&&line){lines.push(line);line=word}else line=test}
if(line)lines.push(line);
const shown=lines.slice(0,6),lineH=baseSize*1.22;
const blockH=shown.length*lineH,top=h*.47-blockH*.5;
shown.forEach((ln,i)=>{
 const y=top+i*lineH;
 // Extruded 3D lettering: layered depth, bevel-like highlight, front face.
 c.textAlign="left";c.textBaseline="middle";c.font="900 "+baseSize+"px system-ui";
 for(let d=9;d>=1;d--){c.fillStyle=d%2?ac+"88":"#02040acc";c.fillText(ln,w*.105+d*w*.0018,y+d*w*.0022)}
 c.shadowColor=ac;c.shadowBlur=w*.025;c.fillStyle=fg;c.fillText(ln,w*.09,y);c.shadowBlur=0;
 c.globalAlpha=ease*.72;c.fillStyle=ac;c.fillRect(w*.09,y+baseSize*.56,Math.min(c.measureText(ln).width,w*.7),Math.max(2,w*.004));c.globalAlpha=ease;
});
c.restore();
// Account profile reveal as a floating 3D card, only on recommendation scene.
if(idx===1&&state.mode==="tavsiya"){
 const p=Math.min(1,Math.max(0,(local-.12)*2.4));c.save();
 c.translate(w*.5,h*.78);c.rotate((1-p)*-.13);c.scale(.82+.18*p,.82+.18*p);c.globalAlpha=p;
 c.shadowColor="#00000099";c.shadowBlur=w*.05;c.fillStyle="#ffffff12";c.strokeStyle=ac;c.lineWidth=w*.004;
 c.beginPath();c.roundRect(-w*.39,-h*.105,w*.78,h*.21,w*.025);c.fill();c.stroke();c.shadowBlur=0;
 if(accountPhoto&&accountPhoto.complete){c.save();c.beginPath();c.arc(-w*.27,0,w*.065,0,Math.PI*2);c.clip();c.drawImage(accountPhoto,-w*.335,-w*.065,w*.13,w*.13);c.restore()}
 c.textAlign="left";c.textBaseline="middle";c.fillStyle=fg;c.font="800 "+w*.036+"px system-ui";c.fillText(state.account.name||"Tavsiya etilgan akkaunt",-w*.16,-h*.025);
 c.font="500 "+w*.025+"px system-ui";c.fillStyle=fg+"cc";c.fillText(state.account.bio||"Foydali sahifa bilan tanishing",-w*.16,h*.025);
 if(state.account.followers)c.fillText(state.account.followers+" obunachi",-w*.16,h*.065);
 c.restore();
}
// Replay transition: diagonal broadcast-style wipe at the start of each scene.
if(local<.22){const q=1-local/.22;c.save();c.globalAlpha=q*.9;c.fillStyle=ac;c.beginPath();c.moveTo(w*(1-q*1.8),0);c.lineTo(w*(1.15-q*1.8),0);c.lineTo(w*(.15-q*1.8),h);c.lineTo(w*(-.0-q*1.8),h);c.closePath();c.fill();c.globalAlpha=q*.45;c.fillStyle=fg;c.fillRect(w*(.92-q*1.8),0,w*.012,h);c.restore()}
// Brand signature is deliberately restricted to the opening and final end card.
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
function start(){cancelAnimationFrame(state.raf);state.elapsed=0;state.started=performance.now();state.playing=true;state.raf=requestAnimationFrame(frame);$("startPreview").textContent="Ⅱ Pauza"}
$("startPreview").onclick=()=>{if(state.playing){state.playing=false;$("startPreview").textContent="▶ Davom etish"}else{state.started=performance.now()-state.elapsed;state.playing=true;$("startPreview").textContent="Ⅱ Pauza"}};
$("restart").onclick=()=>start();
$("recordMode").onclick=()=>{state.recording=true;$("recordOverlay").hidden=false;state.started=performance.now()-state.elapsed;state.playing=true;draw()};
$("recordPause").onclick=()=>{state.playing=!state.playing;if(state.playing)state.started=performance.now()-state.elapsed;$("recordPause").textContent=state.playing?"Ⅱ":"▶"};
$("recordExit").onclick=()=>{state.recording=false;$("recordOverlay").hidden=true;state.playing=false;$("startPreview").textContent="▶ Davom etish";draw()};
$("finish").onclick=()=>{state.playing=false;state.recording=false;$("recordOverlay").hidden=true;page("home")};
window.addEventListener("resize",draw);
})();