(()=> {
"use strict";
const $=id=>document.getElementById(id);
const defaults=[
["HOOK · DIQQATNI TORTING","Raqamli dunyoni yangicha kashf eting.","Texnologiya, kreativ loyihalar va foydali g‘oyalar bir joyda.","TECHNOLOGY, IDEAS"],
["CONTEXT · KONTEKST","Har bir g‘oyaning o‘z sababi bor.","Mavzuning kelib chiqishi va nima uchun muhimligini qisqacha oching.","CONTEXT, DISCOVERY"],
["INSIGHT · ASOSIY FIKR","Muhim jihatni ko‘rish vaqti keldi.","Eng qiziqarli fakt, imkoniyat yoki farqli xususiyatni tushuntiring.","INSIGHT, KNOWLEDGE"],
["VALUE · FOYDA","Bu ma’lumot sizga nima beradi?","Amaliy xulosa, foyda yoki foydalanish usulini ko‘rsating.","VALUE, PRACTICAL"],
["CTA · KEYINGI QADAM","Yana foydali kashfiyotlar uchun kuzating.","Fikr bildiring, saqlab qo‘ying yoki keyingi mavzuni tavsiya qiling.","FOLLOW, SHARE"]
];
let scenes=defaults.map(s=>({kicker:s[0],title:s[1],body:s[2],tags:s[3]}));
let scene=0,photo=null,photoUrl=null,playing=false,raf=0,playStart=0,playElapsed=0,accent="#b6ff4a",seed=2026,recordingMode=false,activeStudio="recommendation";
const colors=["#b6ff4a","#65d9ff","#b69cff","#ff8c70","#ffffff"];
const sceneNames=["HOOK","CONTEXT","INSIGHT","VALUE","CTA"];
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function saveCurrent(){scenes[scene]={kicker:$("kicker").value,title:$("headline").value,body:$("bodyText").value,tags:$("tags").value};}
function render(){
 const s=scenes[scene],words=s.title.trim().split(/\s+/),pivot=Math.max(1,Math.ceil(words.length/2));
 $("previewTitle").innerHTML=esc(words.slice(0,pivot).join(" "))+(words.length>pivot?"<br><em>"+esc(words.slice(pivot).join(" "))+"</em>":"");
 $("previewBody").textContent=s.body;$("previewKicker").textContent=s.kicker;
 $("previewHandle").textContent=$("handle").value||"@youraccount";$("previewRole").textContent=$("role").value||"CREATOR";
 $("previewAuthor").textContent=$("author").value||"NEX CREATIVE STUDIO";
 $("previewTags").innerHTML=s.tags.split(",").map(x=>x.trim()).filter(Boolean).slice(0,4).map(x=>"<span>"+esc(x)+"</span>").join("");
 $("sceneNo").textContent="NEX / "+String(scene+1).padStart(2,"0");
 $("sceneLabel").textContent=(scene+1)+" / 5 · "+sceneNames[scene];
 document.querySelectorAll(".scene-strip button").forEach((b,i)=>b.classList.toggle("active",i===scene));
 const frame=$("preview");frame.dataset.motion=$("motion").value;frame.dataset.studio=activeStudio;frame.dataset.scene=String(scene+1);
 const choreography={
 recommendation:[[-120,0,-8,.82,8],[0,90,0,.92,10],[120,0,8,.82,6],[0,-100,-4,1.08,10],[0,45,0,.76,14]],
 resources:[[0,-140,0,.9,12],[-140,0,-5,.95,8],[100,0,7,.85,6],[0,110,0,1.12,12],[80,-60,4,.8,10]],
 facts:[[0,0,-18,.55,16],[0,130,0,.9,10],[0,0,0,1.5,18],[-120,0,-12,.9,6],[0,-80,10,.7,14]],
 phrases:[[0,70,0,.9,18],[90,0,0,1.1,14],[0,0,0,.7,20],[0,-90,0,1.15,10],[0,0,0,.82,22]]
 };
 const [mx,my,mr,ms,mb]=(choreography[activeStudio]||choreography.recommendation)[scene];
 frame.style.setProperty("--enter-x",mx+"px");frame.style.setProperty("--enter-y",my+"px");
 frame.style.setProperty("--enter-rotate",mr+"deg");frame.style.setProperty("--enter-scale",ms);
 frame.style.setProperty("--enter-blur",mb+"px");
 frame.classList.remove("scene-enter");void frame.offsetWidth;frame.classList.add("scene-enter");
}
function loadScene(i){saveCurrent();scene=(i+5)%5;const s=scenes[scene];$("kicker").value=s.kicker;$("headline").value=s.title;$("bodyText").value=s.body;$("tags").value=s.tags;render();}
function status(t){$("statusText").textContent=t;}
["headline","bodyText","kicker","tags"].forEach(id=>$(id).addEventListener("input",()=>{saveCurrent();render();}));
["handle","role","author"].forEach(id=>$(id).addEventListener("input",render));
document.querySelectorAll(".scene-strip button").forEach(b=>b.addEventListener("click",()=>{stop();loadScene(Number(b.dataset.scene));}));
function setAccent(c){accent=c;document.documentElement.style.setProperty("--accent",c);document.querySelectorAll(".swatch").forEach(b=>b.classList.toggle("active",b.dataset.color===c));}
document.querySelectorAll(".swatch").forEach(b=>b.addEventListener("click",()=>setAccent(b.dataset.color||"#b6ff4a")));
function design(){ $("preview").className="preview-frame bg-"+$("bg").value+" theme-"+$("style").value;}
$("bg").addEventListener("change",design);$("style").addEventListener("change",design);$("motion").addEventListener("change",render);
$("photoInput").addEventListener("change",e=>{const f=e.target.files&&e.target.files[0];if(!f)return;if(!f.type.startsWith("image/")){status("Profil rasmi uchun rasm faylini tanlang.");return;}if(photoUrl)URL.revokeObjectURL(photoUrl);photoUrl=URL.createObjectURL(f);photo=new Image();photo.onload=()=>{ $("previewPhoto").src=photoUrl;$("previewPhoto").hidden=false;$("fallback").hidden=true;status("Profil rasmi yuklandi.");};photo.onerror=()=>status("Rasmni o‘qib bo‘lmadi.");photo.src=photoUrl;});
function randomFromSeed(){let x=(Number($("seed").value)||2026)>>>0;return()=>{x+=0x6D2B79F5;let t=x;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}
$("randomBtn").onclick=()=>{const rnd=randomFromSeed();setAccent(colors[Math.floor(rnd()*colors.length)]);$("style").selectedIndex=Math.floor(rnd()*6);$("bg").selectedIndex=Math.floor(rnd()*6);$("motion").selectedIndex=Math.floor(rnd()*4);$("intensity").value=String(2+Math.floor(rnd()*8));design();status("Seed "+$("seed").value+" asosida dizayn yaratildi. Matnlar saqlandi.");};
function stop(){playing=false;playElapsed=0;cancelAnimationFrame(raf);$("playBtn").textContent="▶ Ko‘rish";$("playState").textContent="TAYYOR";if($("recordStartBtn"))$("recordStartBtn").textContent="▶ Boshlash";}
function pausePlayback(){if(!playing)return;playElapsed+=performance.now()-playStart;playing=false;cancelAnimationFrame(raf);$("playBtn").textContent="▶ Davom ettirish";$("playState").textContent="PAUZA";if($("recordStartBtn"))$("recordStartBtn").textContent="▶ Davom ettirish";}
function playbackFrame(now){if(!playing)return;const dur=Number($("duration").value)*1000,total=dur*5,elapsed=playElapsed+(now-playStart);if(elapsed>=total){stop();loadScene(0);return;}const idx=Math.floor(elapsed/dur);if(idx!==scene)loadScene(idx);raf=requestAnimationFrame(playbackFrame);}
function startPlayback(){if(playing){pausePlayback();return;}saveCurrent();playing=true;playStart=performance.now();$("playBtn").textContent="Ⅱ Pauza";$("playState").textContent="KO‘RILMOQDA";if($("recordStartBtn"))$("recordStartBtn").textContent="Ⅱ Pauza";raf=requestAnimationFrame(playbackFrame);}
$("playBtn").onclick=startPlayback;
function setRecordingMode(enabled){recordingMode=enabled;document.body.classList.toggle("recording-mode",enabled);$("recordingControls").hidden=!enabled;if(enabled){stop();window.scrollTo({top:0,behavior:"instant"});$("recordingStatus").textContent="RECORDING MODE · 9:16 · NEX v1.6.0";}else{stop();}}
$("recordingModeBtn").addEventListener("click",()=>setRecordingMode(true));
$("recordExitBtn").addEventListener("click",()=>setRecordingMode(false));
$("recordStartBtn").addEventListener("click",startPlayback);
$("resetBtn").onclick=()=>{stop();scenes=defaults.map(s=>({kicker:s[0],title:s[1],body:s[2],tags:s[3]}));$("handle").value="@youraccount";$("role").value="CREATOR · DIGITAL STORYTELLER";$("author").value="NEX CREATIVE STUDIO";$("style").value="neon";$("bg").value="aurora";$("motion").value="float";$("seed").value="2026";$("intensity").value="5";setAccent("#b6ff4a");design();
loadScene(0);status("Loyiha boshlang‘ich holatga qaytarildi.");};
function wrap(ctx,text,maxWidth){const lines=[];let line="";for(const word of String(text).split(/\s+/)){const test=line?line+" "+word:word;if(line&&ctx.measureText(test).width>maxWidth){lines.push(line);line=word;}else line=test;}if(line)lines.push(line);return lines;}
function rounded(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);}
function draw(ctx,now,index,progress=1){
 const s=scenes[index],w=1080,h=1920,t=now/1000,rnd=randomFromSeed(),motion=$("motion").value,intensity=Number($("intensity").value),amp=intensity*3;
 const studio=activeStudio,p=Math.max(0,Math.min(1,progress)),easeOut=1-Math.pow(1-p,3),clamp=v=>Math.max(0,Math.min(1,v));
 const bg=$("bg").value,gradient=ctx.createLinearGradient(0,0,w,h);
 gradient.addColorStop(0,bg==="fire"?"#51251b":bg==="aurora"?"#263d55":bg==="stars"?"#18223b":"#17253a");gradient.addColorStop(1,"#080b12");ctx.fillStyle=gradient;ctx.fillRect(0,0,w,h);
 const accentNow=accent;ctx.save();ctx.globalAlpha=.18;ctx.fillStyle=accentNow;let ox=790,oy=670;
 if(motion==="orbit"){ox+=Math.cos(t*1.2)*amp*9;oy+=Math.sin(t*1.2)*amp*9;}else if(motion==="float"){oy+=Math.sin(t*1.5)*amp*5;}else if(motion==="pulse"){ctx.globalAlpha=.1+(.08*Math.sin(t*Number($("bpm").value)/10));}
 ctx.beginPath();ctx.arc(ox,oy,360+Math.sin(t*2)*amp,0,Math.PI*2);ctx.fill();ctx.restore();
 if(bg==="grid"){ctx.strokeStyle="#ffffff18";ctx.lineWidth=2;for(let x=0;x<w;x+=70){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}for(let y=0;y<h;y+=70){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}}
 if(bg==="stars"||bg==="bubbles"){for(let j=0;j<45;j++){const x=(j*193+Math.sin(t+j)*13)%w,y=(j*317)%h;ctx.globalAlpha=.2+(j%4)*.12;ctx.fillStyle=accentNow;ctx.beginPath();ctx.arc(x,y,bg==="stars"?2:5+(j%4)*3,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;}
 if(bg==="rain"){ctx.strokeStyle="#9bd7ff55";for(let j=0;j<38;j++){let x=(j*37+t*70)%w,y=(j*83+t*230)%h;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-12,y+50);ctx.stroke();}}
 // Har bir kontent studiyasi uchun alohida eksport animatsiyasi.
 if(studio==="recommendation"){
  const q=easeOut;ctx.save();ctx.globalAlpha=q;ctx.translate((1-q)*190,0);
  ctx.shadowColor="#b69cff55";ctx.shadowBlur=35;ctx.fillStyle="#171c2b";rounded(ctx,575,405,420,210,30);ctx.fill();
  ctx.shadowBlur=0;ctx.strokeStyle="#b69cff";ctx.lineWidth=3;rounded(ctx,575,405,420,210,30);ctx.stroke();
  ctx.fillStyle="#b69cff";ctx.beginPath();ctx.arc(665,510,48,0,Math.PI*2);ctx.fill();
  ctx.fillStyle="#171c2b";ctx.font="bold 36px Arial";ctx.textAlign="center";ctx.fillText("N",665,522);ctx.textAlign="left";
  ctx.fillStyle="#fff";ctx.font="bold 27px Arial";ctx.fillText("ACCOUNT SPOTLIGHT",735,485);
  ctx.fillStyle="#aeb8ca";ctx.font="21px Arial";ctx.fillText("PROFILE · REVIEW · VALUE",735,525);
  ctx.fillStyle="#b69cff";rounded(ctx,735,550,160*q,8,4);ctx.fill();ctx.restore();
 }else if(studio==="resources"){
  const labels=["DISCOVER","LEARN","APPLY"];ctx.save();
  labels.forEach((label,j)=>{const q=clamp((p-j*.16)/.62);const x=615+(1-q)*145;ctx.globalAlpha=q;ctx.fillStyle="#10283a";rounded(ctx,x,420+j*86,370,62,16);ctx.fill();ctx.strokeStyle="#65d9ff";ctx.lineWidth=2;rounded(ctx,x,420+j*86,370,62,16);ctx.stroke();ctx.fillStyle="#65d9ff";ctx.beginPath();ctx.arc(x+32,451+j*86,9,0,Math.PI*2);ctx.fill();ctx.fillStyle="#f0f7ff";ctx.font="bold 23px Arial";ctx.fillText(label,x+58,459+j*86);});ctx.restore();
 }else if(studio==="facts"){
  const q=easeOut,angle=t*.55;ctx.save();ctx.globalAlpha=q;ctx.translate(835,525);ctx.rotate(angle);
  ctx.strokeStyle="#ff8c70";ctx.lineWidth=5;ctx.setLineDash([18,12]);ctx.beginPath();ctx.arc(0,0,135,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);
  ctx.beginPath();ctx.arc(0,0,105,0,Math.PI*2);ctx.stroke();ctx.restore();
  ctx.save();ctx.globalAlpha=q;ctx.fillStyle="#ff8c70";ctx.font="bold 26px Arial";ctx.textAlign="center";ctx.fillText("FACT",835,515);
  ctx.fillStyle="#fff";ctx.font="bold 64px Arial";ctx.fillText("0"+(index+1),835,580);ctx.textAlign="left";ctx.restore();
 }else if(studio==="phrases"){
  const q=clamp(p/.72),scale=.82+.18*easeOut;ctx.save();ctx.globalAlpha=q*.42;ctx.translate(835,555);ctx.scale(scale,scale);
  ctx.fillStyle="#e7c98a";ctx.font="bold 310px Georgia";ctx.textAlign="center";ctx.fillText("“",0,95);ctx.textAlign="left";ctx.restore();
  ctx.save();ctx.globalAlpha=q;ctx.fillStyle="#e7c98a";ctx.fillRect(700,690,220*q,4);ctx.restore();
 }
 ctx.fillStyle=accentNow;ctx.font="bold 30px Arial";ctx.fillText("NEX / "+String(index+1).padStart(2,"0"),80,115);
 ctx.fillStyle="#fff";ctx.font="bold 34px Arial";ctx.fillText(($("handle").value||"@youraccount").slice(0,28),165,250);
 ctx.fillStyle="#9daabd";ctx.font="22px Arial";ctx.fillText(($("role").value||"CREATOR").slice(0,42),165,287);
 if(photo){ctx.save();ctx.beginPath();ctx.arc(112,250,48,0,Math.PI*2);ctx.clip();ctx.drawImage(photo,64,202,96,96);ctx.restore();}
 ctx.save();ctx.globalAlpha=clamp(p/.35);ctx.fillStyle=accentNow;ctx.font="bold 28px Arial";ctx.fillText(s.kicker.toUpperCase().slice(0,45),80,690);ctx.restore();
 const titleLines=wrap(ctx,s.title,900).slice(0,5);ctx.font="bold 88px Arial";let y=840;
 titleLines.forEach((line,j)=>{const q=clamp((p-.12-j*.075)/.48);ctx.save();ctx.globalAlpha=q;ctx.fillStyle=j%2===1?accentNow:"#f4f6fa";const jitter=motion==="shake"?(rnd()-.5)*amp*3:0;const enter=studio==="resources"?(1-q)*125:studio==="facts"?(1-q)*55:studio==="phrases"?(1-q)*8:(1-q)*75;ctx.translate(enter,studio==="phrases"?(1-q)*18:0);ctx.fillText(line,80+jitter,y+jitter);ctx.restore();y+=112;});
 ctx.save();ctx.globalAlpha=clamp((p-.34)/.5);ctx.fillStyle="#c5cfdb";ctx.font="36px Arial";wrap(ctx,s.body,850).slice(0,4).forEach((line,j)=>ctx.fillText(line,80,y+65+j*58));ctx.restore();
 let px=80;const py=1580;ctx.font="bold 20px Arial";s.tags.split(",").map(x=>x.trim()).filter(Boolean).slice(0,4).forEach(tag=>{const tw=ctx.measureText(tag.toUpperCase()).width+42;ctx.strokeStyle="#ffffff70";rounded(ctx,px,py,tw,48,24);ctx.stroke();ctx.fillStyle="#e7edf5";ctx.fillText(tag.toUpperCase(),px+21,py+31);px+=tw+14;});
 ctx.fillStyle="#aab5c4";ctx.font="bold 22px Arial";ctx.fillText(($("author").value||"NEX CREATIVE STUDIO").toUpperCase().slice(0,36),80,1790);ctx.fillStyle=accentNow;ctx.textAlign="right";ctx.fillText("SWIPE ↗",1000,1790);ctx.textAlign="left";
}
const angleProfiles={
 editorial:{name:"EDITORIAL",style:"Ink",bg:"grid",color:"#e7c98a",direction:"Aniq ierarxiya, katta sarlavha, sokin kompozitsiya va tahririy ohang."},
 cinematic:{name:"CINEMATIC",style:"Glass",bg:"aurora",color:"#65d9ff",direction:"Kuchli kontrast, chuqur fon, kadrlar orasida dramatik ritm va yumshoq harakat."},
 tech:{name:"TECH MINIMAL",style:"Neon",bg:"grid",color:"#65d9ff",direction:"Toza geometriya, ixcham matn, texnologik detallar va funksional animatsiya."},
 experimental:{name:"EXPERIMENTAL",style:"Glitch",bg:"stars",color:"#b69cff",direction:"Kutilmagan tipografik urg‘u, dinamik qatlamlar va nazorat qilingan vizual tajriba."}
};
$("analyzeStyleBtn").addEventListener("click",()=>{
 const url=$("referenceUrl").value.trim();
 const notes=$("referenceStyle").value.trim();
 const angle=angleProfiles[$("creativeAngle").value]||angleProfiles.editorial;
 if(!notes){$("styleBrief").innerHTML="<strong>Uslub tavsifi kerak</strong><span>Akkauntdan sizga yoqqan 2–3 ta vizual xususiyatni yozing. NEX shundan kelib chiqib original ijodiy yo‘nalish taklif qiladi.</span>";$("referenceStyle").focus();return;}
 $("style").value=Object.keys(angleProfiles).find(k=>angleProfiles[k]===angle)==="editorial"?"ink":angle.style.toLowerCase();
 $("bg").value=angle.bg;
 setAccent(angle.color);
 design();
 const source=url?url:"Havola kiritilmagan";
 $("styleBrief").innerHTML="";
 const title=document.createElement("strong");title.textContent="NEX CREATIVE BRIEF · "+angle.name;
 const sourceLine=document.createElement("span");sourceLine.textContent="Ilhom manbasi: "+source;
 const notesLine=document.createElement("span");notesLine.textContent="Siz tanlagan xususiyatlar: "+notes;
 const directionLine=document.createElement("span");directionLine.textContent="Vizual yo‘nalish: "+angle.direction;
 const ruleLine=document.createElement("span");ruleLine.textContent="Originallik qoidasi: manbadagi logotip, matn, kadr yoki kompozitsiyani ko‘chirmang. Faqat umumiy kayfiyat va dizayn tamoyillaridan ilhomlanib, NEX uchun yangi ssenariy va vizual yechim yarating.";
 [$("styleBrief").append(title,sourceLine,notesLine,directionLine,ruleLine)];
 status("Ijodiy brif tayyor. Tanlangan vizual yo‘nalish previewga qo‘llandi.");
});

const studioProfiles={
 recommendation:{style:"glass",bg:"aurora",motion:"orbit",accent:"#b69cff",name:"TAVSIYA AKKAUNT"},
 resources:{style:"neon",bg:"grid",motion:"float",accent:"#65d9ff",name:"FOYDALI MANBALAR"},
 facts:{style:"comix",bg:"stars",motion:"pulse",accent:"#ff8c70",name:"QIZIQARLI FAKTLAR"},
 phrases:{style:"ink",bg:"rain",motion:"float",accent:"#e7c98a",name:"MAXSUS IBORALAR"}
};
const contentBuilders={
 recommendation:t=>[
 ["HOOK · TAVSIYA","Bu akkauntni ko‘rishga arziydimi?","Bugun e’tiborimizni tortgan sahifa: "+t+".","AKKAUNT, TAVSIYA"],
 ["TANISHUV · PROFIL",t+" qanday sahifa?","Profil nimaga ixtisoslashgani va unda qanday kontent berilishini ko‘rsating.","PROFIL, YO‘NALISH"],
 ["TAHLIL · O‘ZIGA XOSLIK","Uni boshqalardan nima ajratadi?","Aniq post, loyiha yoki yondashuv misolida farqli jihatini ochib bering.","USLUB, FARQ"],
 ["KIM UCHUN · QIYMAT","Kimlar uchun foydali bo‘lishi mumkin?","Auditoriyasini va kuzatishdan olinadigan aniq foydani tushuntiring.","AUDITORIYA, FOYDA"],
 ["YAKUN · TAVSIYA","Kuzatish-kuzatmaslik — sizning tanlovingiz.","Profilni o‘zingiz baholang. Keyingi tavsiya uchun fikringizni yozing.","KASHFIYOT, FIKR"]
 ],
 resources:t=>[
 ["HOOK · FOYDALI MANBA",t+" — nimasi bilan foydali?","Bir resursni shunchaki ko‘rsatmaymiz: uning amaliy qiymatini tekshiramiz.","MANBA, FOYDA"],
 ["TANISHUV · VAZIFA","Bu manba nima beradi?","Sayt, kanal, kitob yoki ilovaning asosiy vazifasini sodda tushuntiring.","NIMA, UCHUN"],
 ["IMKONIYAT · NAMOYISH","Undan qanday foydalaniladi?","Eng muhim imkoniyatini yoki foydalanish jarayonini real misolda ko‘rsating.","QO‘LLANMA, MISOL"],
 ["BAHO · CHEKLOV","Kimga mos va nimaga e’tibor berish kerak?","Maqsadli foydalanuvchi, bepul/pullik jihati va muhim cheklovlarni tekshirib ayting.","KIM UCHUN, TAHLIL"],
 ["YAKUN · MANBA","Sinab ko‘rishdan oldin manbani tekshiring.","Rasmiy havolani saqlang va tajribangizni ulashing.","RESURS, SAQLASH"]
 ],
 facts:t=>[
 ["HOOK · SAVOL","Siz "+t+" haqida buni bilarmidingiz?","Javob odatiy tasavvuringizdan farq qilishi mumkin.","SAVOL, FAKT"],
 ["KONTEKST · TUSHUNCHA","Avval hodisani tushunib olaylik.","Atamalar va zarur kontekstni ortiqcha tafsilotlarsiz tushuntiring.","KONTEKST, IZOH"],
 ["FAKT · DALIL","Asosiy fakt mana shu.","Tekshirilgan raqam, kuzatuv yoki ilmiy xulosani aniq manbaga tayangan holda ko‘rsating.","DALIL, MANBA"],
 ["IZOH · VIZUAL","Bu qanday sodir bo‘ladi va nega muhim?","Jarayonni bosqichma-bosqich vizual tushuntiring; sabab va natijani ajrating.","SABAB, NATIJA"],
 ["YAKUN · XULOSA","Endi bu hodisaga boshqacha qaraysizmi?","Qisqa xulosa bering. Manbani captionda ko‘rsating va savol qoldiring.","BILIM, MULOHAZA"]
 ],
 phrases:t=>[
 ["HOOK · IBORA","Bir jumla. Bir to‘xtash. Bir fikr.","Bugungi ibora: "+t+".","IBORA, FIKR"],
 ["MA’NO · TALQIN","Bu so‘zlar nimani anglatadi?","Iborani sodda tilda, o‘z talqiningiz bilan ochib bering.","MA’NO, TALQIN"],
 ["URG‘U · ASOSIY G‘OYA","Eng muhim so‘zga e’tibor bering.","Matndagi kalit so‘zni ajratib, uning mazmunga ta’sirini ko‘rsating.","ASOSIY G‘OYA, URG‘U"],
 ["HAYOT · QO‘LLANISH","Bu fikr hayotimizda qayerda namoyon bo‘ladi?","Iborani hayotiy vaziyat yoki qisqa misol bilan bog‘lang.","HAYOT, MISOL"],
 ["SUKUT · YAKUN","Ba’zi fikrlar javob emas, savol qoldiradi.","Tomoshabinga o‘ylash uchun joy qoldiring. O‘z talqinini izohlarda so‘rang.","MULOHAZA, SAVOL"]
 ]
};
$("buildContentBtn").addEventListener("click",()=>{
 const topic=$("topicInput").value.trim();
 if(!topic){$("briefHint").textContent="Avval mavzu yoki loyiha nomini kiriting."; $("topicInput").focus();return;}
 const type=$("contentType").value;
 const built=contentBuilders[type](topic);
 const profile=studioProfiles[type];
 activeStudio=type;
 if(profile){
  $("style").value=profile.style;$("bg").value=profile.bg;$("motion").value=profile.motion;
  setAccent(profile.accent);design();
 }
 saveCurrent();
 stop();
 scenes=built.map(s=>({kicker:s[0],title:s[1],body:s[2],tags:s[3]}));
 scene=0;
 $("kicker").value=scenes[0].kicker;
 $("headline").value=scenes[0].title;
 $("bodyText").value=scenes[0].body;
 $("tags").value=scenes[0].tags;
 render();
 $("briefHint").textContent="5 sahnali ssenariy tayyor. Bu boshlang‘ich matnlar: fakt, manba va tavsiyalarni nashrdan oldin tekshiring.";
 status("Kontent ssenariysi yaratildi. Har bir sahnani tahrirlashingiz mumkin.");
});
loadScene(0);
})();