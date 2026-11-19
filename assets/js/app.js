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
let scene=0,photo=null,photoUrl=null,playing=false,raf=0,playStart=0,accent="#b6ff4a",seed=2026;
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
}
function loadScene(i){saveCurrent();scene=(i+5)%5;const s=scenes[scene];$("kicker").value=s.kicker;$("headline").value=s.title;$("bodyText").value=s.body;$("tags").value=s.tags;render();}
function status(t){$("statusText").textContent=t;}
["headline","bodyText","kicker","tags"].forEach(id=>$(id).addEventListener("input",()=>{saveCurrent();render();}));
["handle","role","author"].forEach(id=>$(id).addEventListener("input",render));
document.querySelectorAll(".scene-strip button").forEach(b=>b.addEventListener("click",()=>{stop();loadScene(Number(b.dataset.scene));}));
function setAccent(c){accent=c;document.documentElement.style.setProperty("--accent",c);document.querySelectorAll(".swatch").forEach(b=>b.classList.toggle("active",b.dataset.color===c));}
document.querySelectorAll(".swatch").forEach(b=>b.addEventListener("click",()=>setAccent(b.dataset.color||"#b6ff4a")));
function design(){ $("preview").className="preview-frame bg-"+$("bg").value+" theme-"+$("style").value;}
$("bg").addEventListener("change",design);$("style").addEventListener("change",design);
$("photoInput").addEventListener("change",e=>{const f=e.target.files&&e.target.files[0];if(!f)return;if(!f.type.startsWith("image/")){status("Profil rasmi uchun rasm faylini tanlang.");return;}if(photoUrl)URL.revokeObjectURL(photoUrl);photoUrl=URL.createObjectURL(f);photo=new Image();photo.onload=()=>{ $("previewPhoto").src=photoUrl;$("previewPhoto").hidden=false;$("fallback").hidden=true;status("Profil rasmi yuklandi.");};photo.onerror=()=>status("Rasmni o‘qib bo‘lmadi.");photo.src=photoUrl;});
function randomFromSeed(){let x=(Number($("seed").value)||2026)>>>0;return()=>{x+=0x6D2B79F5;let t=x;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}
$("randomBtn").onclick=()=>{const rnd=randomFromSeed();setAccent(colors[Math.floor(rnd()*colors.length)]);$("style").selectedIndex=Math.floor(rnd()*6);$("bg").selectedIndex=Math.floor(rnd()*6);$("motion").selectedIndex=Math.floor(rnd()*4);$("intensity").value=String(2+Math.floor(rnd()*8));design();status("Seed "+$("seed").value+" asosida dizayn yaratildi. Matnlar saqlandi.");};
function stop(){playing=false;cancelAnimationFrame(raf);$("playBtn").textContent="▶ Ko‘rish";$("playState").textContent="TAYYOR";}
function playbackFrame(now){if(!playing)return;const dur=Number($("duration").value)*1000,total=dur*5,elapsed=now-playStart;if(elapsed>=total){stop();return;}const idx=Math.floor(elapsed/dur);if(idx!==scene)loadScene(idx);raf=requestAnimationFrame(playbackFrame);}
$("playBtn").onclick=()=>{if(playing){stop();return;}saveCurrent();playing=true;playStart=performance.now();$("playBtn").textContent="Ⅱ To‘xtatish";$("playState").textContent="KO‘RILMOQDA";raf=requestAnimationFrame(playbackFrame);};
$("resetBtn").onclick=()=>{stop();scenes=defaults.map(s=>({kicker:s[0],title:s[1],body:s[2],tags:s[3]}));$("handle").value="@youraccount";$("role").value="CREATOR · DIGITAL STORYTELLER";$("author").value="NEX CREATIVE STUDIO";$("style").value="neon";$("bg").value="aurora";$("motion").value="float";$("seed").value="2026";$("intensity").value="5";setAccent("#b6ff4a");design();
loadScene(0);status("Loyiha boshlang‘ich holatga qaytarildi.");};
function wrap(ctx,text,maxWidth){const lines=[];let line="";for(const word of String(text).split(/\s+/)){const test=line?line+" "+word:word;if(line&&ctx.measureText(test).width>maxWidth){lines.push(line);line=word;}else line=test;}if(line)lines.push(line);return lines;}
function rounded(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);}
function draw(ctx,now,index){
 const s=scenes[index],w=1080,h=1920,t=now/1000,rnd=randomFromSeed(),motion=$("motion").value,intensity=Number($("intensity").value),amp=intensity*3;
 const bg=$("bg").value,gradient=ctx.createLinearGradient(0,0,w,h);
 gradient.addColorStop(0,bg==="fire"?"#51251b":bg==="aurora"?"#263d55":bg==="stars"?"#18223b":"#17253a");gradient.addColorStop(1,"#080b12");ctx.fillStyle=gradient;ctx.fillRect(0,0,w,h);
 const accentNow=accent;ctx.save();ctx.globalAlpha=.18;ctx.fillStyle=accentNow;let ox=790,oy=670;
 if(motion==="orbit"){ox+=Math.cos(t*1.2)*amp*9;oy+=Math.sin(t*1.2)*amp*9;}else if(motion==="float"){oy+=Math.sin(t*1.5)*amp*5;}else if(motion==="pulse"){ctx.globalAlpha=.1+(.08*Math.sin(t*Number($("bpm").value)/10));}
 ctx.beginPath();ctx.arc(ox,oy,360+Math.sin(t*2)*amp,0,Math.PI*2);ctx.fill();ctx.restore();
 if(bg==="grid"){ctx.strokeStyle="#ffffff18";ctx.lineWidth=2;for(let x=0;x<w;x+=70){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}for(let y=0;y<h;y+=70){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}}
 if(bg==="stars"||bg==="bubbles"){for(let j=0;j<45;j++){const x=(j*193+Math.sin(t+j)*13)%w,y=(j*317)%h;ctx.globalAlpha=.2+(j%4)*.12;ctx.fillStyle=accentNow;ctx.beginPath();ctx.arc(x,y,bg==="stars"?2:5+(j%4)*3,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;}
 if(bg==="rain"){ctx.strokeStyle="#9bd7ff55";for(let j=0;j<38;j++){let x=(j*37+t*70)%w,y=(j*83+t*230)%h;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-12,y+50);ctx.stroke();}}
 ctx.fillStyle=accentNow;ctx.font="bold 30px Arial";ctx.fillText("NEX / "+String(index+1).padStart(2,"0"),80,115);
 ctx.fillStyle="#fff";ctx.font="bold 34px Arial";ctx.fillText(($("handle").value||"@youraccount").slice(0,28),165,250);
 ctx.fillStyle="#9daabd";ctx.font="22px Arial";ctx.fillText(($("role").value||"CREATOR").slice(0,42),165,287);
 if(photo){ctx.save();ctx.beginPath();ctx.arc(112,250,48,0,Math.PI*2);ctx.clip();ctx.drawImage(photo,64,202,96,96);ctx.restore();}
 ctx.fillStyle=accentNow;ctx.font="bold 28px Arial";ctx.fillText(s.kicker.toUpperCase().slice(0,45),80,690);
 const titleLines=wrap(ctx,s.title,900).slice(0,5);ctx.font="bold 88px Arial";let y=840;
 titleLines.forEach((line,j)=>{ctx.fillStyle=j%2===1?accentNow:"#f4f6fa";const jitter=motion==="shake"?(rnd()-.5)*amp*3:0;ctx.fillText(line,80+jitter,y+jitter);y+=112;});
 ctx.fillStyle="#c5cfdb";ctx.font="36px Arial";wrap(ctx,s.body,850).slice(0,4).forEach((line,j)=>ctx.fillText(line,80,y+65+j*58));
 let px=80;const py=1580;ctx.font="bold 20px Arial";s.tags.split(",").map(x=>x.trim()).filter(Boolean).slice(0,4).forEach(tag=>{const tw=ctx.measureText(tag.toUpperCase()).width+42;ctx.strokeStyle="#ffffff70";rounded(ctx,px,py,tw,48,24);ctx.stroke();ctx.fillStyle="#e7edf5";ctx.fillText(tag.toUpperCase(),px+21,py+31);px+=tw+14;});
 ctx.fillStyle="#aab5c4";ctx.font="bold 22px Arial";ctx.fillText(($("author").value||"NEX CREATIVE STUDIO").toUpperCase().slice(0,36),80,1790);ctx.fillStyle=accentNow;ctx.textAlign="right";ctx.fillText("SWIPE ↗",1000,1790);ctx.textAlign="left";
}
$("exportBtn").onclick=async()=>{stop();saveCurrent();$("exportBtn").disabled=true;status("Besh sahna video formatiga yig‘ilmoqda…");try{const result=await NEXExport.render({duration:Number($("duration").value),draw});status("Video yuklandi: "+result.filename+" · "+result.mime);}catch(e){status("Eksport xatosi: "+(e.message||"noma’lum xatolik"));}finally{$("exportBtn").disabled=false;}};
const contentBuilders={
 showcase:(t)=>[
 ["HOOK · LOYIHA","Bu loyihani kuzatishga arziydimi?","Bugun e’tiborimni tortgan loyiha: "+t+".","PROJECT, CREATIVE"],
 ["CONTEXT · TANISHUV",t+" nima bilan shug‘ullanadi?","Loyiha qanday muammoni hal qilishi yoki kimlar uchun yaratilganini ko‘rib chiqamiz.","OVERVIEW, DESIGN"],
 ["INSIGHT · FARQLI JIHAT","Uning asosiy ustunligi nimada?","Interfeys, yondashuv yoki foydalanuvchiga beradigan qiymatiga e’tibor qarating.","DETAILS, VALUE"],
 ["VALUE · TAHLIL","Nima uchun e’tiborga loyiq?","Kuchli tomonlari va kimlar uchun foydali bo‘lishi mumkinligini baholang.","ANALYSIS, DISCOVERY"],
 ["CTA · TAVSIYA","Siz ham ko‘rib chiqarmidingiz?","Loyihani o‘rganing va fikringizni izohlarda yozing.","RECOMMEND, COMMENT"]
 ],
 fact:(t)=>[
 ["HOOK · TEXNOLOGIK FAKT",t+" haqida bir muhim fakt.","Ko‘pchilik bilmaydigan, ammo tushunishga arziydigan jihat bor.","TECH FACT, KNOWLEDGE"],
 ["CONTEXT · IZOH","Bu qanday ishlaydi?","Avval mavzuning asosiy tushunchasini sodda va aniq izohlaymiz.","EXPLAIN, CONTEXT"],
 ["INSIGHT · FAKT","Eng qiziq jihati — mana shu.","Bu yerda tekshirilgan fakt, raqam yoki aniq misol keltiriladi.","FACT, DATA"],
 ["VALUE · AHAMIYAT","Bu nimani o‘zgartiradi?","Ushbu ma’lumotning kundalik hayot, internet yoki texnologiyadagi ahamiyatini ko‘rsating.","IMPACT, VALUE"],
 ["CTA · MULOHAZA","Siz bu haqda bilarmidingiz?","Faktni saqlab qo‘ying yoki keyingi mavzu bo‘yicha taklif qoldiring.","DID YOU KNOW, COMMENT"]
 ],
 tool:(t)=>[
 ["HOOK · FOYDALI VOSITA",t+" ishni osonlashtirishi mumkin.","Bugun foydali raqamli vositani qisqacha ko‘rib chiqamiz.","DIGITAL TOOL, PRODUCTIVITY"],
 ["CONTEXT · VAZIFA","U nima uchun kerak?","Vosita qaysi vazifani bajarishi va kimlar uchun mo‘ljallanganini tushuntiring.","PURPOSE, GUIDE"],
 ["INSIGHT · IMKONIYAT","Asosiy imkoniyatlari qanday?","Eng foydali ikki yoki uch funksiyasini aniq misol bilan ko‘rsating.","FEATURES, TOOLS"],
 ["VALUE · AMALIYOT","Undan qanday foydalanish mumkin?","Boshlash uchun kerakli qadamlar va ehtiyot bo‘lish lozim bo‘lgan jihatlarni ayting.","HOW TO, PRACTICAL"],
 ["CTA · SINAB KO‘RISH","Sizga ham foydali bo‘lishi mumkin.","Vositaning rasmiy manbasini tekshiring va tajribangizni izohlarda ulashing.","TRY IT, COMMENT"]
 ],
 personal:(t)=>[
 ["HOOK · SHAXSIY TAJRIBA","Men "+t+" ustida ishlayapman.","Yangi loyiha yoki o‘rganish jarayonimdan bir lavha bilan bo‘lishaman.","BUILD IN PUBLIC, JOURNEY"],
 ["CONTEXT · MAQSAD","Bu g‘oyani nima uchun boshladim?","Muammo, ehtiyoj yoki loyiha oldiga qo‘yilgan maqsadni tushuntiring.","PURPOSE, PROJECT"],
 ["INSIGHT · JARAYON","Jarayonda nimalarni aniqladim?","Ish davomida uchragan muhim qaror, xato yoki yangi bilimni ko‘rsating.","PROCESS, LEARNING"],
 ["VALUE · NATIJA","Hozirgacha qanday natija bor?","Amaldagi natija, ishlayotgan qism va hali yechilmagan vazifalarni ochiq ayting.","PROGRESS, RESULTS"],
 ["CTA · MULOQOT","Keyingi qadamni birga kuzating.","Auditoriyadan fikr, savol yoki taklif so‘rang.","FOLLOW, FEEDBACK"]
 ]
};
$("buildContentBtn").addEventListener("click",()=>{
 const topic=$("topicInput").value.trim();
 if(!topic){$("briefHint").textContent="Avval mavzu yoki loyiha nomini kiriting."; $("topicInput").focus();return;}
 const type=$("contentType").value;
 const built=contentBuilders[type](topic);
 saveCurrent();
 stop();
 scenes=built.map(s=>({kicker:s[0],title:s[1],body:s[2],tags:s[3]}));
 scene=0;
 $("kicker").value=scenes[0].kicker;
 $("headline").value=scenes[0].title;
 $("bodyText").value=scenes[0].body;
 $("tags").value=scenes[0].tags;
 render();
 $("briefHint").textContent="5 sahnali ssenariy tayyor. Matnlar shablon asosida tuzildi — faktlar va misollarni tekshirib, o‘zingizga moslab tahrirlang.";
 status("Kontent ssenariysi yaratildi. Har bir sahnani tahrirlashingiz mumkin.");
});
loadScene(0);
})();