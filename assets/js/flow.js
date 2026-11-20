(()=>{"use strict";
const $=id=>document.getElementById(id), pages=["home","content","script","style","palette","animation","studio"];
const labels=["01 — YO‘NALISH","02 — MAZMUN","03 — SSENARIY","04 — VIZUAL USLUB","05 — RANG PALETRASI","06 — ANIMATSIYA","07 — STUDIYA"];
const state={mode:"",script:["","","","",""],voice:["","","","",""],sceneDurations:[5000,5000,5000,5000,5000],account:{name:"",niche:"",bio:"",benefit:"",audience:"",proof:"",followers:"",link:"",image:""},topicType:"",title:"",tone:"Jiddiy",style:"Cinematic 3D",palette:"Midnight",animation:"Silliq",scene:0,playing:false,started:0,elapsed:0,raf:0,recording:false,backgroundSeed:Math.floor(Math.random()*4294967295)};
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
$("toStyle").onclick=()=>{state.script=[$("scriptHook").value,$("scriptIntro").value,$("scriptWhy").value,$("scriptDiff").value,$("scriptCta").value];state.voice=[$("voiceHook").value,$("voiceIntro").value,$("voiceWhy").value,$("voiceDiff").value,$("voiceCta").value];readAccountForm();if(state.mode==="tavsiya"&&(!state.account.name||!state.account.niche||!state.account.bio||!state.account.benefit)){alert("Tavsiya uchun akkaunt nomi, yo‘nalishi, tavsifi va foydasini kiriting.");return}calculateDurations();if(total>60000){alert("Reels davomiyligi "+Math.ceil(total/1000)+" soniya bo‘ldi. Maksimum 60 soniya. Ovoz yoki ekran matnini qisqartiring.");return}if(!state.script[0].trim()||!state.script[1].trim()||!state.script[4].trim()){alert("Hook, E’lon va Chorlov maydonlarini to‘ldiring.");return}page("style")};
$("toPalette").onclick=()=>page("palette");$("toAnimation").onclick=()=>page("animation");$("toStudio").onclick=()=>{page("studio");try{buildStudio();start()}catch(error){console.error("NEX Studio error:",error);const summary=$("summary");if(summary)summary.textContent="Namoyish oynasini tayyorlashda xatolik yuz berdi: "+(error&&error.message?error.message:"Noma’lum xato");}};
function buildStudio(){calculateDurations();state.backgroundSeed=Math.floor(Math.random()*4294967295);state.lastScene=-1;$("summary").innerHTML="<strong>"+modes[state.mode]+"</strong><br>"+escapeHTML(state.topicType)+" · "+escapeHTML(state.title)+"<br>"+escapeHTML(state.tone)+" / "+state.style+" / "+state.palette+" / "+state.animation+"<br><strong>Davomiylik: "+Math.ceil(total/1000)+" soniya</strong>";if(state.webglError){const warning=document.createElement("p");warning.className="webgl-warning";warning.textContent=state.webglError;$("summary").appendChild(warning)}$("sceneList").innerHTML="";scenes.forEach((s,i)=>{const b=document.createElement("button");b.className="scene-chip"+(i===0?" active":"");b.textContent=String(i+1).padStart(2,"0");b.title=sceneTitle(i);b.onclick=()=>{state.scene=i;state.elapsed=sceneStart(i);state.started=performance.now()-state.elapsed;updateSceneUI();};$("sceneList").appendChild(b)});$("sceneText").value=sceneCopy(0);$("sceneVoice").value=state.voice[0]||"";draw(performance.now())}
function configureScript(){const labels=state.mode==="manba"?["HOOK — qiziqtirish","RESURSNI TANISHTIRISH","NIMA UCHUN KERAK?","QANDAY FOYDALANISH?","CHORLOV — yakun"]:state.mode==="fakt"?["HOOK — savol yoki kutilmagan fikr","FAKTNI OCHISH","IZOH — sabab va dalil","QIZIQARLI TAFSILOT","YAKUNIY FIKR"]:state.mode==="ibora"?["HOOK — fikrga kirish","ASOSIY IBORA","MA’NO — chuqurroq izoh","HAYOTIY BOG‘LANISH","YAKUNIY FIKR"]:["HOOK — e’tiborni tortish","E’LON — akkauntni tanishtirish","NIMA UCHUN KUZATISH KERAK?","BOSHQA AKKAUNTLARDAN FARQI","CHORLOV — yakun"];["introLabel","whyLabel","diffLabel","ctaLabel"].forEach((id,i)=>$(id).textContent=labels[i+1]);$("scriptHook").placeholder=labels[0]+"...";$("accountFields").hidden=state.mode!=="tavsiya";["scriptHook","scriptIntro","scriptWhy","scriptDiff","scriptCta"].forEach((id,i)=>$(id).value=state.script[i]||"");["voiceHook","voiceIntro","voiceWhy","voiceDiff","voiceCta"].forEach((id,i)=>$(id).value=state.voice[i]||"")}

function readAccountForm(){
 state.account={name:$("accountName").value.trim(),niche:$("accountNiche").value.trim(),bio:$("accountBio").value.trim(),benefit:$("accountBenefit").value.trim(),audience:$("accountAudience").value.trim(),proof:$("accountProof").value.trim(),followers:$("accountFollowers").value.trim(),link:$("accountLink").value.trim(),image:state.account.image};
 return state.account;
}
function generateRecommendationScript(){
 const a=readAccountForm(),name=a.name,niche=a.niche,bio=a.bio,benefit=a.benefit,audience=a.audience,proof=a.proof;
 if(!name||!niche||!bio||!benefit){alert("Avval akkaunt nomi, yo‘nalishi, tavsifi va foydasini to‘ldiring.");return}
 const clean=s=>String(s||"").trim().replace(/[.!?]+$/,"");
 const who=audience?"Ayniqsa "+clean(audience)+" uchun.":"";
 const proofLine=proof?clean(proof)+".":"Bu sahifaning so‘nggi postlarini ko‘rib, sizga mosligini o‘zingiz baholang.";
 const hookOptions=[
  "Sizga "+clean(niche)+" bo‘yicha foydali sahifa kerakmi?",
  clean(niche)+" bilan shug‘ullanasizmi? Bu akkauntga e’tibor bering.",
  "Yangi sahifa izlayapsizmi? "+clean(name)+" bilan tanishing."
 ];
 const ctaOptions=[
  "Agar "+clean(niche)+" sizga qiziq bo‘lsa, "+clean(name)+" profilini ko‘rib chiqing.",
  clean(name)+" sahifasiga o‘ting va so‘nggi postlarini o‘zingiz baholang.",
  "Sizga mos bo‘lsa, "+clean(name)+" akkauntini kuzatib boring."
 ];
 const hook=hookOptions[Math.floor(Math.random()*hookOptions.length)],cta=ctaOptions[Math.floor(Math.random()*ctaOptions.length)];
 const scripts=[
  hook,
  clean(name)+" — "+clean(niche)+" yo‘nalishidagi akkaunt. "+clean(bio),
  "Asosiy foydasi: "+clean(benefit)+". "+who,
  proofLine,
  cta
 ];
 const voices=[
  "Agar siz "+clean(niche)+" mavzusiga qiziqsangiz, mana shu sahifaga e’tibor bering.",
  clean(name)+" sahifasida "+clean(bio.charAt(0).toLowerCase()+bio.slice(1)),
  "Bu akkauntning sizga berishi mumkin bo‘lgan asosiy foydasi — "+clean(benefit).toLowerCase()+". "+(audience?"U ayniqsa "+clean(audience)+" uchun mos bo‘lishi mumkin.":""),
  proof?("Tavsiya qilishimizga sabab: "+clean(proof)+"."):"Shoshilmay, so‘nggi postlarini ko‘rib chiqing va mazmuni sizga mos kelishini tekshiring.",
  "Qiziq bo‘lsa, "+clean(name)+" profiliga o‘ting va kontentini baholab ko‘ring."
 ];
 state.script=scripts;state.voice=voices;
 const textIds=["scriptHook","scriptIntro","scriptWhy","scriptDiff","scriptCta"],voiceIds=["voiceHook","voiceIntro","voiceWhy","voiceDiff","voiceCta"];
 textIds.forEach((id,i)=>$(id).value=scripts[i]);
 voiceIds.forEach((id,i)=>$(id).value=voices[i]);
 const button=$("generateAccountScript");button.textContent="✓ Ssenariy tayyor — tahrirlashingiz mumkin";
 calculateDurations();
}
function sceneTitle(i){return state.mode==="tavsiya"?["HOOK","AKKAUNT TAVSIYASI","NIMA UCHUN?","BOSHQA AKKAUNTLARDAN FARQI","CHORLOV"][i]:scenes[i]}function sceneCopy(i){return state.script[i]||""}function wordCount(text){return String(text||"").trim().split(/\s+/).filter(Boolean).length}
function calculateDurations(){const ids=["voiceHook","voiceIntro","voiceWhy","voiceDiff","voiceCta"];state.voice=ids.map(id=>$(id).value.trim());state.sceneDurations=state.voice.map((v,i)=>{const words=wordCount(v||state.script[i]);return Math.max(2500,Math.ceil(words/2.5*1000)+850)});total=state.sceneDurations.reduce((a,b)=>a+b,0);refreshVoiceTiming()}
function sceneStart(i){return state.sceneDurations.slice(0,i).reduce((a,b)=>a+b,0)}
function sceneIndexAt(ms){let t=0;for(let i=0;i<state.sceneDurations.length;i++){t+=state.sceneDurations[i];if(ms<t)return i}return 4}
function refreshVoiceTiming(){const words=state.voice.reduce((a,v,i)=>a+wordCount(v||state.script[i]),0);const sec=Math.ceil(words/2.5);const duration=Math.ceil(total/1000);const el=$("voiceTiming");if(el)el.textContent="Jami: "+words+" ta so‘z · taxminiy o‘qish: "+sec+" soniya · Reels davomiyligi: "+duration+" soniya (maksimum 60)."+(total>60000?" Matnni qisqartiring.":"")}
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
$("sceneText").addEventListener("input",()=>{state.script[state.scene]=$("sceneText").value;const ids=["scriptHook","scriptIntro","scriptWhy","scriptDiff","scriptCta"];$(ids[state.scene]).value=$("sceneText").value;calculateDurations();draw(performance.now())});$("sceneVoice").addEventListener("input",()=>{state.voice[state.scene]=$("sceneVoice").value;const ids=["voiceHook","voiceIntro","voiceWhy","voiceDiff","voiceCta"];$(ids[state.scene]).value=$("sceneVoice").value;calculateDurations();draw(performance.now())});
["scriptHook","scriptIntro","scriptWhy","scriptDiff","scriptCta"].forEach((id,i)=>$(id).addEventListener("input",()=>{state.script[i]=$(id).value}));
$("accountImage").addEventListener("change",e=>{const file=e.target.files&&e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{state.account.image=reader.result;accountPhoto=new Image();accountPhoto.onload=()=>draw();accountPhoto.src=reader.result};reader.readAsDataURL(file)});
$("generateAccountScript").addEventListener("click",generateRecommendationScript);
function updateSceneUI(){state.scene=sceneIndexAt(state.elapsed);document.querySelectorAll(".scene-chip").forEach((b,i)=>b.classList.toggle("active",i===state.scene));$("sceneCounter").textContent="SAHNA "+String(state.scene+1).padStart(2,"0")+" / 05";$("sceneTime").textContent="00:"+String(Math.floor(state.elapsed/1000)).padStart(2,"0");$("progress").style.width=(state.elapsed/total*100)+"%";if(state.lastScene!==state.scene){$("sceneText").value=sceneCopy(state.scene);$("sceneVoice").value=state.voice[state.scene]||"";state.lastScene=state.scene}draw(performance.now())}
const canvas=$("reelCanvas"),ctx=canvas.getContext("2d",{alpha:true}),rc=$("recordCanvas"),rctx=rc.getContext("2d",{alpha:true}),threeCanvas=$("reel3D"),recordThreeCanvas=$("record3D");
let accountPhoto=null,THREE=null,threeReady=false,threeFailed=false,threeScene=null,threeCamera=null,threeRenderer=null,recordRenderer=null,threeGroup=null,threeSeed=-1,threeSceneIndex=-1;
async function initThreeEngine(){
 try{
  const modules=await Promise.all([import("https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js"),import("https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/environments/RoomEnvironment.js")]);
  THREE=modules[0];const RoomEnvironment=modules[1].RoomEnvironment;
  const makeRenderer=target=>{const r=new THREE.WebGLRenderer({canvas:target,antialias:true,alpha:false,powerPreference:"high-performance"});r.setPixelRatio(1);r.setSize(target.width,target.height,false);r.outputColorSpace=THREE.SRGBColorSpace;r.toneMapping=THREE.ACESFilmicToneMapping;r.toneMappingExposure=1.15;return r};
  threeRenderer=makeRenderer(threeCanvas);recordRenderer=makeRenderer(recordThreeCanvas);
  threeScene=new THREE.Scene();threeCamera=new THREE.PerspectiveCamera(34,360/640,.1,100);threeCamera.position.set(0,0,9);
  const pmrem=new THREE.PMREMGenerator(threeRenderer);pmrem.compileEquirectangularShader();
  const room=new RoomEnvironment(threeRenderer);threeScene.environment=pmrem.fromScene(room,.04).texture;room.dispose();pmrem.dispose();
  threeScene.add(new THREE.HemisphereLight(0xe7efff,0x101521,1.7));
  const key=new THREE.DirectionalLight(0xffffff,3.2);key.position.set(-4,6,7);threeScene.add(key);
  const rim=new THREE.PointLight(0x8b7cff,24,18);rim.position.set(4,1,3);threeScene.add(rim);
  const fill=new THREE.PointLight(0x35d6c5,15,16);fill.position.set(-4,-3,2);threeScene.add(fill);
  threeReady=true;state.webglReady=true;buildThreeObjects();draw();
 }catch(error){threeFailed=true;state.webglReady=false;state.webglError="Haqiqiy 3D dvigatel yuklanmadi. Internet aloqasini tekshirib, sahifani yangilang.";console.error("NEX WebGL initialization failed:",error);const n=document.createElement("p");n.className="webgl-warning";n.textContent=state.webglError;$("summary").appendChild(n)}
}
function buildThreeObjects(){
 if(!threeReady)return;if(threeGroup)threeScene.remove(threeGroup);threeGroup=new THREE.Group();threeScene.add(threeGroup);
 const pal=paletteMap[state.palette]||paletteMap.Midnight,accent=new THREE.Color(pal[2]),secondary=new THREE.Color(pal[3]||pal[2]),rand=seededRandom((state.backgroundSeed^Math.imul(state.scene+53,0x9E3779B1))|0),style=state.style;
 const metal=new THREE.MeshPhysicalMaterial({color:accent,metalness:.78,roughness:.23,clearcoat:.9,clearcoatRoughness:.16}),bright=new THREE.MeshPhysicalMaterial({color:secondary,metalness:.52,roughness:.3,clearcoat:.8}),dark=new THREE.MeshStandardMaterial({color:pal[0],metalness:.68,roughness:.32,wireframe:true});
 const mercury=new THREE.MeshPhysicalMaterial({color:0xd8f6ff,metalness:.24,roughness:.045,transmission:.96,thickness:2.4,ior:1.32,clearcoat:1,clearcoatRoughness:.025,iridescence:.88,iridescenceIOR:1.8,iridescenceThicknessRange:[110,680],envMapIntensity:2.1});
 const neon=new THREE.MeshPhysicalMaterial({color:secondary,metalness:.48,roughness:.12,clearcoat:1,emissive:secondary,emissiveIntensity:1.15});
 const liquidGeometry=new THREE.IcosahedronGeometry(1.12,5),liquidPositions=liquidGeometry.attributes.position;
 for(let i=0;i<liquidPositions.count;i++){const x=liquidPositions.getX(i),y=liquidPositions.getY(i),z=liquidPositions.getZ(i),n=1+.105*Math.sin(x*3.4+y*2.2)*Math.cos(z*3.1)+.045*Math.sin(y*7.2+z*2.8);liquidPositions.setXYZ(i,x*n,y*n,z*n)}
 liquidGeometry.computeVertexNormals();
 const main=new THREE.Group();threeGroup.add(main);
 // NEX signature: suyuq simob tomchisi, shaffof metall va neon orbitasi.
 const liquid=new THREE.Mesh(liquidGeometry,mercury);liquid.position.set(state.scene===0?1.12:state.scene===4?-.95:1.28,.18,-.45);liquid.scale.setScalar(state.scene===1?.82:1.02);main.add(liquid);
 const dropletA=new THREE.Mesh(new THREE.SphereGeometry(.27,32,24),mercury);dropletA.position.set(-1.55,-1.2,.15);dropletA.scale.set(.72,1.25,.72);main.add(dropletA);
 const dropletB=new THREE.Mesh(new THREE.SphereGeometry(.14,24,18),mercury);dropletB.position.set(1.95,1.45,-.3);main.add(dropletB);
 const orbit=new THREE.Mesh(new THREE.TorusGeometry(1.68,.018,12,144),neon);orbit.position.copy(liquid.position);orbit.rotation.set(.72,.18,-.34);main.add(orbit);
 const orbit2=new THREE.Mesh(new THREE.TorusGeometry(1.94,.012,10,144),bright);orbit2.position.copy(liquid.position);orbit2.rotation.set(1.12,.6,.25);main.add(orbit2);
 const add=(g,m,x,y,z,sx=1,sy=sx,sz=sx)=>{const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);o.rotation.set(rand()*Math.PI,rand()*Math.PI,rand()*Math.PI);main.add(o);return o};
 const v=Math.floor(rand()*5);
 if(style==="Cinematic 3D"){
  if(v===0){add(new THREE.TorusKnotGeometry(1.05,.28,180,24,2,3),metal,0,.2,0,1.15);add(new THREE.IcosahedronGeometry(.48,1),bright,-1.55,-1.35,-.7,.7)}
  else if(v===1){add(new THREE.IcosahedronGeometry(1.35,1),metal,0,.1,0);add(new THREE.TorusGeometry(1.9,.035,12,100),bright,0,.1,-.4,1,1,.6)}
  else if(v===2){for(let i=0;i<5;i++)add(new THREE.BoxGeometry(.72,.72,.72),i%2?bright:metal,(i-2)*.72,Math.sin(i*.8)*.55,-i*.24,.92)}
  else if(v===3){add(new THREE.SphereGeometry(1.22,48,32),metal,0,0,0);add(new THREE.TorusGeometry(1.65,.045,16,120),bright,0,0,-.3,1,.68,1)}
  else{add(new THREE.OctahedronGeometry(1.45,1),metal,0,0,0);add(new THREE.TorusKnotGeometry(.7,.07,100,12),bright,0,0,1.15)}
 }else if(style==="Kinetic Typography"){
  for(let i=0;i<7;i++){const bar=add(new THREE.BoxGeometry(.22,2.8,.16),i%2?bright:metal,-2.4+i*.8,0,-i*.18,.8,.45+rand(),1);bar.rotation.z=(rand()-.5)*.7}
  add(new THREE.TorusGeometry(1.3,.055,12,90),bright,.2,.3,-.8,1.15,.6,1);
 }else if(style==="Editorial / Magazine"){
  add(new THREE.BoxGeometry(2.5,3.4,.18),dark,0,0,-.5);add(new THREE.BoxGeometry(2.1,.045,.05),bright,0,1.05,.1);add(new THREE.BoxGeometry(1.45,.055,.05),metal,-.3,.82,.12);add(new THREE.TorusGeometry(.72,.045,12,80),bright,.55,-.35,.25,1,.72,1);add(new THREE.IcosahedronGeometry(.46,1),metal,-.75,-.75,.4);
 }else{
  add(new THREE.TorusKnotGeometry(1.1,.09,160,18,3,5),metal,0,0,0);for(let i=0;i<6;i++){const a=i*Math.PI/3;add(new THREE.BoxGeometry(.38,.38,.38),bright,Math.cos(a)*2,Math.sin(a)*1.7,-.6,.8)}add(new THREE.OctahedronGeometry(.62,1),metal,0,0,1.15);
 }
 const pts=[];for(let i=0;i<90;i++)pts.push((rand()-.5)*8,(rand()-.5)*11,-2-rand()*7);const geo=new THREE.BufferGeometry();geo.setAttribute("position",new THREE.Float32BufferAttribute(pts,3));threeGroup.add(new THREE.Points(geo,new THREE.PointsMaterial({color:secondary,size:.025,sizeAttenuation:true,transparent:true,opacity:.72})));
 threeGroup.userData={main,phase:rand()*Math.PI*2,liquid,dropletA,dropletB,orbit,orbit2};threeSeed=state.backgroundSeed;threeSceneIndex=state.scene;
}
function renderThree(now,target=threeRenderer){
 if(!threeReady||!target)return;const pal=paletteMap[state.palette]||paletteMap.Midnight;if(threeSeed!==state.backgroundSeed||threeSceneIndex!==state.scene)buildThreeObjects();
 threeScene.background=new THREE.Color(pal[0]);const t=now/1000,local=Math.max(0,Math.min(1,(state.elapsed-sceneStart(state.scene))/state.sceneDurations[state.scene])),ease=1-Math.pow(1-local,3),phase=t*(state.animation==="Dinamik"?1.45:state.animation==="Silliq"?.65:1)+threeGroup.userData.phase,main=threeGroup.userData.main;
 main.rotation.y=phase*.24+(state.scene%2)*.35;main.rotation.x=Math.sin(phase*.55)*.16;main.position.y=Math.sin(phase*.7)*.16;
 const signature=threeGroup.userData;signature.liquid.rotation.y=-phase*.32;signature.liquid.rotation.z=Math.sin(phase*.8)*.12;signature.liquid.scale.setScalar((state.scene===1?.82:1.02)*(1+.035*Math.sin(phase*1.4)));signature.dropletA.position.y=-1.2+Math.sin(phase*1.2)*.14;signature.dropletB.position.y=1.45+Math.cos(phase*1.5)*.12;signature.orbit.rotation.z=phase*.18;signature.orbit2.rotation.x=1.12+Math.sin(phase*.42)*.14;
 const cx=[-.7,.65,-.55,.8,0][state.scene],cy=[.2,-.25,.35,-.1,.25][state.scene],z=8.8+(1-ease)*[1.45,1.1,.9,1.25,1][state.scene];
 threeCamera.position.x+=(cx+Math.sin(phase*.4)*.22-threeCamera.position.x)*.035;threeCamera.position.y+=(cy+Math.cos(phase*.35)*.12-threeCamera.position.y)*.035;threeCamera.position.z+=(z-threeCamera.position.z)*.045;threeCamera.lookAt(0,0,0);target.render(threeScene,threeCamera);
}
function rounded(c,x,y,w,h,r){c.beginPath();c.roundRect(x,y,w,h,r)}
function seededRandom(seed){let x=seed|0;return()=>{x=(x+0x6D2B79F5)|0;let t=Math.imul(x^x>>>15,1|x);t^=t+Math.imul(t^t>>>7,61|t);return((t^t>>>14)>>>0)/4294967296}}
function drawProceduralBackground(c,w,h,idx,pal,now){
 const t=now/1000,bg=pal[0],a=pal[2],b=pal[3]||pal[2],fg=pal[1];
 const seed=(state.backgroundSeed^Math.imul(idx+1,0x9E3779B1))|0;
 const rand=seededRandom(seed);
 // Har bir sahnaga mustaqil vizual yo‘nalish. Ketma-ket sahnalarda ayni effekt takrorlanmaydi.
 let family=Math.floor(rand()*10);
 if(idx>0){
  const prev=seededRandom((state.backgroundSeed^Math.imul(idx,0x9E3779B1))|0);
  const previous=Math.floor(prev()*10);
  if(family===previous)family=(family+1+Math.floor(rand()*9))%10;
 }
 const angle=rand()*Math.PI*2+t*.025;
 const gx=w*(.5+Math.cos(angle)*.7),gy=h*(.5+Math.sin(angle)*.7);
 const gradient=c.createLinearGradient(gx,gy,w-gx,h-gy);
 gradient.addColorStop(0,bg);gradient.addColorStop(.42,a+"55");gradient.addColorStop(.78,b+"44");gradient.addColorStop(1,bg);
 c.fillStyle=gradient;c.fillRect(0,0,w,h);
 // Keng yorug‘lik maydonlari.
 for(let n=0;n<3;n++){
  const phase=t*(.16+n*.045)+n*2.4+idx;
  const x=w*(.5+Math.sin(phase)*.4),y=h*(.5+Math.cos(phase*.8)*.38),r=Math.max(w,h)*(.28+.08*Math.sin(phase));
  const glow=c.createRadialGradient(x,y,0,x,y,r),col=n%2?a:b;
  glow.addColorStop(0,col+"66");glow.addColorStop(.5,col+"1d");glow.addColorStop(1,col+"00");
  c.fillStyle=glow;c.fillRect(0,0,w,h);
 }
 c.save();c.lineCap="round";c.lineJoin="round";
 if(family===0){
  // Oqimli suyuq to‘lqinlar.
  for(let k=0;k<13;k++){const y=h*(.2+k*.055),phase=k*.48;
   c.beginPath();for(let x=-20;x<=w+20;x+=8){const yy=y+Math.sin(x/w*5+t*.8+phase)*h*.035+Math.sin(x/w*2.4-t*.45+phase)*h*.022;if(x===-20)c.moveTo(x,yy);else c.lineTo(x,yy)}
   c.strokeStyle=k%2?a:b;c.globalAlpha=.13+(k%4)*.035;c.lineWidth=Math.max(1,w*.003);c.stroke();
  }
 }else if(family===1){
  // Zarralar girdobi — markazga tortiluvchi yulduzsimon oqim.
  const cx=w*(.5+Math.sin(t*.22)*.12),cy=h*(.5+Math.cos(t*.19)*.1);
  for(let i=0;i<115;i++){const q=i/115,phase=q*31+t*(.35+q*.8),radius=(.04+q*.52)*Math.min(w,h),x=cx+Math.cos(phase)*radius,y=cy+Math.sin(phase*1.13)*radius;
   c.globalAlpha=.12+.55*q;c.fillStyle=i%3?a:b;c.beginPath();c.arc(x,y,1+w*q*.006,0,Math.PI*2);c.fill();
  }
 }else if(family===2){
  // Neon lazer yo‘llari va tez siljiydigan yorug‘lik chiziqlari.
  for(let i=0;i<9;i++){const y=h*(.12+i*.1),shift=((t*(55+i*9)+i*97)%(w*1.5))-w*.25;
   c.globalAlpha=.16;c.strokeStyle=i%2?a:b;c.lineWidth=w*(i%3===0?.009:.002);
   c.beginPath();c.moveTo(shift-w*.2,y);c.lineTo(shift+w*.34,y-h*.08);c.lineTo(shift+w*.62,y+h*.035);c.stroke();
  }
 }else if(family===3){
  // Organik suyuqlik shakllari — sekin kengayib, qisqaradi.
  for(let i=0;i<7;i++){const phase=i*1.7+t*(.22+i*.012),x=w*(.5+Math.sin(phase)*.38),y=h*(.5+Math.cos(phase*.73)*.4),rx=w*(.09+.035*Math.sin(phase*1.4)),ry=h*(.055+.025*Math.cos(phase));
   c.save();c.translate(x,y);c.rotate(phase*.23);c.globalAlpha=.13;c.fillStyle=i%2?a:b;c.beginPath();c.ellipse(0,0,rx,ry,0,0,Math.PI*2);c.fill();c.restore();
  }
 }else if(family===4){
  // Yorug‘lik pardasi — vertikal ipakdek nurlar.
  for(let i=0;i<17;i++){const x=w*(i/16),wave=Math.sin(t*.55+i*.43)*w*.055;
   const grad=c.createLinearGradient(x+wave,0,x-wave,h);grad.addColorStop(0,a+"00");grad.addColorStop(.48,i%2?b+"55":a+"66");grad.addColorStop(1,a+"00");
   c.globalAlpha=.55;c.strokeStyle=grad;c.lineWidth=w*(.008+(.5+.5*Math.sin(t+i))*.009);
   c.beginPath();c.moveTo(x+wave,0);c.bezierCurveTo(x-wave*1.8,h*.32,x+wave*1.5,h*.68,x-wave,h);c.stroke();
  }
 }else if(family===5){
  // Perspektiv tunnel — kamera ichkariga uchayotgandek.
  const cx=w*(.5+Math.sin(t*.18)*.08),cy=h*.48,offset=(t*.32)%1;
  for(let i=0;i<13;i++){const q=((i/13+offset)%1),scale=.08+q*1.15,ww=w*scale,hh=h*scale*.52;
   c.globalAlpha=.08+q*.2;c.strokeStyle=i%2?a:b;c.lineWidth=Math.max(1,w*.002);
   c.save();c.translate(cx,cy);c.rotate(Math.sin(t*.2)*.12+q*.04);c.strokeRect(-ww/2,-hh/2,ww,hh);c.restore();
  }
 }else if(family===6){
  // Geometrik shardlar — turli yo‘nalishda suzuvchi ko‘p qirrali bo‘laklar.
  for(let i=0;i<15;i++){const phase=rand()*6.28,x=w*(.08+rand()*.84)+Math.sin(t*.25+phase)*w*.035,y=h*(.08+rand()*.84)+Math.cos(t*.2+phase)*h*.03,r=w*(.018+rand()*.055);
   c.save();c.translate(x,y);c.rotate(t*(i%2?.12:-.1)+phase);c.globalAlpha=.12+rand()*.18;c.strokeStyle=i%2?a:b;c.fillStyle=a;
   c.beginPath();for(let k=0;k<5;k++){const q=k/5*Math.PI*2,rr=r*(.65+((k+i)%3)*.2);if(k===0)c.moveTo(Math.cos(q)*rr,Math.sin(q)*rr);else c.lineTo(Math.cos(q)*rr,Math.sin(q)*rr)}c.closePath();c.stroke();c.restore();
  }
 }else if(family===7){
  // Raqamli yomg‘ir — vertikal oqimlar.
  for(let col=0;col<18;col++){const x=w*(col+.5)/18,head=((t*(.12+col%5*.035)+col*.137)%1.3)-.15;
   for(let j=0;j<8;j++){const y=h*(head+j*.025);if(y<0||y>h)continue;c.globalAlpha=(1-j/8)*.22;c.fillStyle=col%2?a:b;c.fillRect(x,y,w*.003,h*.012)}
  }
 }else if(family===8){
  // Aylanuvchi energiya halqalari, lekin kub va panellarsiz.
  c.save();c.translate(w*.5,h*.5);
  for(let i=0;i<8;i++){c.rotate(.08+Math.sin(t*.25+i)*.012);c.globalAlpha=.1+i*.012;c.strokeStyle=i%2?a:b;c.lineWidth=w*.0025;c.beginPath();c.ellipse(0,0,w*(.12+i*.045),h*(.045+i*.014),t*.08+i*.1,0,Math.PI*2);c.stroke()}
  c.restore();
 }else{
  // Yulduz portlashi — markazdan tashqariga tarqaladigan yorug‘lik nurlari.
  const cx=w*(.5+Math.sin(t*.3)*.08),cy=h*(.48+Math.cos(t*.24)*.06);
  for(let i=0;i<64;i++){const q=i/64*Math.PI*2+t*.08,len=Math.min(w,h)*(.12+.38*(.5+.5*Math.sin(t*.8+i)));
   c.globalAlpha=.08+.12*(.5+.5*Math.sin(t+i));c.strokeStyle=i%2?a:b;c.lineWidth=i%5===0?w*.004:1;
   c.beginPath();c.moveTo(cx+Math.cos(q)*len*.18,cy+Math.sin(q)*len*.18);c.lineTo(cx+Math.cos(q)*len,cy+Math.sin(q)*len);c.stroke();
  }
 }
 c.restore();
 // Mayda zarralar barcha fonlarda juda yengil qatlam sifatida harakatlanadi.
 const dots=seededRandom(seed^0x27D4EB2D);c.save();c.fillStyle=fg;
 for(let i=0;i<34;i++){const x=(dots()*w+Math.sin(t*.3+i)*w*.012+w)%w,y=(dots()*h+t*(7+dots()*16))%h;
  c.globalAlpha=.08+.14*(.5+.5*Math.sin(t+i));c.beginPath();c.arc(x,y,.7+dots()*w*.0015,0,Math.PI*2);c.fill()}
 c.restore();
}

function draw3DStage(c,w,h,idx,pal,now){
 const t=now/1000,accent=pal[2],secondary=pal[3]||pal[2],fg=pal[1];
 const seed=(state.backgroundSeed^Math.imul(idx+37,0x85EBCA6B))|0,rand=seededRandom(seed);
 // 3D bezak turi ham har safar tanlanadi; kub doimiy obyekt emas.
 let kind=Math.floor(rand()*7);
 if(idx>0){const prev=seededRandom((state.backgroundSeed^Math.imul(idx+36,0x85EBCA6B))|0),old=Math.floor(prev()*7);if(kind===old)kind=(kind+1+Math.floor(rand()*6))%7}
 const cx=w*(.5+Math.sin(t*.17+idx)*.06),cy=h*(.48+Math.cos(t*.15+idx)*.035);
 c.save();c.lineWidth=Math.max(1,w*.002);c.strokeStyle=accent;
 if(kind===0){
  // 3D fazoviy poligon — ko‘p qirrali prizma.
  const sides=6,rot=t*.22+idx,points=[];
  for(let z=0;z<2;z++)for(let i=0;i<sides;i++){const q=i/sides*Math.PI*2+rot,r=w*(z?.17:.12);points.push([cx+Math.cos(q)*r,cy+Math.sin(q)*r*.58+(z?h*.08:-h*.08)])}
  c.globalAlpha=.2;for(let i=0;i<sides;i++){const j=(i+1)%sides;c.beginPath();c.moveTo(...points[i]);c.lineTo(...points[j]);c.lineTo(...points[j+sides]);c.lineTo(...points[i+sides]);c.closePath();c.stroke()}
 }else if(kind===1){
  // Hajmli shisha shar.
  const r=w*(.17+.012*Math.sin(t*.6));const g=c.createRadialGradient(cx-r*.35,cy-r*.4,r*.04,cx,cy,r);
  g.addColorStop(0,fg+"55");g.addColorStop(.35,accent+"44");g.addColorStop(1,secondary+"05");
  c.globalAlpha=.75;c.fillStyle=g;c.beginPath();c.arc(cx,cy,r,0,Math.PI*2);c.fill();
  c.globalAlpha=.3;c.strokeStyle=fg;for(let i=0;i<5;i++){c.beginPath();c.ellipse(cx,cy,r*(.35+i*.13),r*(.18+i*.055),t*.25+i*.3,0,Math.PI*2);c.stroke()}
 }else if(kind===2){
  // Suzib yuruvchi 3D shisha panellar.
  for(let i=0;i<4;i++){const phase=t*.3+i*1.57,x=cx+Math.sin(phase)*w*.24,y=cy+Math.cos(phase*.8)*h*.13,ww=w*.13,hh=h*.025,depth=w*.035;
   c.globalAlpha=.15;c.fillStyle=i%2?secondary:accent;c.beginPath();c.moveTo(x-ww,y-hh);c.lineTo(x+ww,y-hh);c.lineTo(x+ww+depth,y-hh+depth*.45);c.lineTo(x-ww+depth,y-hh+depth*.45);c.closePath();c.fill();
   c.globalAlpha=.28;c.strokeStyle=fg;c.stroke();
  }
 }else if(kind===3){
  // 3D aylanuvchi torusga o‘xshash halqa.
  c.translate(cx,cy);c.rotate(Math.sin(t*.22)*.25);
  for(let i=0;i<9;i++){c.globalAlpha=.08+i*.018;c.strokeStyle=i%2?accent:secondary;c.beginPath();c.ellipse(0,0,w*(.12+i*.012),h*(.035+i*.004),t*.2+i*.04,0,Math.PI*2);c.stroke()}
 }else if(kind===4){
  // Perspektiv yo‘lak — kamera chuqurlikka harakatlanadi.
  const vanishY=h*.39,offset=(t*.22)%1;c.globalAlpha=.17;
  for(let i=-5;i<=5;i++){c.beginPath();c.moveTo(cx+i*w*.012,vanishY);c.lineTo(w*(.5+i*.2),h);c.stroke()}
  for(let i=0;i<9;i++){const q=((i/9+offset)%1),y=vanishY+(h-vanishY)*q*q;c.globalAlpha=.06+q*.16;c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke()}
 }else if(kind===5){
  // 3D to‘lqin lentasi — qatlamlar kameraga yaqinlashadi.
  for(let layer=0;layer<8;layer++){c.globalAlpha=.13;c.strokeStyle=layer%2?accent:secondary;c.beginPath();
   for(let x=-10;x<=w+10;x+=8){const q=x/w,yy=cy+(layer-4)*h*.035+Math.sin(q*7+t*.7+layer*.5)*h*.055;if(x===-10)c.moveTo(x,yy);else c.lineTo(x,yy)}c.stroke()
  }
 }else{
  // Aylanayotgan uchburchak kristallar — kub o‘rniga boshqa siluet.
  for(let i=0;i<5;i++){const phase=t*.24+i*1.25,x=cx+Math.cos(phase)*w*.28,y=cy+Math.sin(phase)*h*.19,r=w*(.035+i*.009);
   c.save();c.translate(x,y);c.rotate(-phase);c.globalAlpha=.22;c.beginPath();c.moveTo(0,-r);c.lineTo(r*.85,r*.7);c.lineTo(-r*.85,r*.7);c.closePath();c.stroke();c.restore()
  }
 }
 c.restore();
}

function drawCreativeDirectionScene(c,w,h,now,pal){
 const style=state.style;
 const allowed=["Cinematic 3D","Kinetic Typography","Editorial / Magazine","Futuristic Motion"];
 if(!allowed.includes(style))return false;
 const motionFactor=state.animation==="Silliq"?.72:state.animation==="Dinamik"?1.48:state.animation==="Kinematik"?1.08:state.animation==="Ijodiy"?1.32:state.animation==="Aralash"?.92+((state.backgroundSeed>>>3)%61)/100:1.18;
 const idx=state.scene,t=now/1000*motionFactor,local=Math.max(0,Math.min(1,(state.elapsed-sceneStart(idx))/state.sceneDurations[idx]));
 const bg=pal[0],fg=pal[1],ac=pal[2],sub=pal[3]||ac;
 const seed=(state.backgroundSeed^Math.imul(idx+101,0x9E3779B1))|0,rand=seededRandom(seed);
 const variant=Math.floor(rand()*4),align=variant===0?"left":variant===1?"center":variant===2?"right":"left";
 const x=align==="left"?w*.12:align==="right"?w*.88:w*.5,ta=align==="left"?"left":align==="right"?"right":"center";
 const copy=$("sceneText").value||sceneCopy(idx);
 const title=idx===0?(copy||"Kuzatishga arziydigan yangi sahifa"):idx===1?(state.account.name||copy||"Akkaunt bilan tanishing"):idx===2?(copy||state.account.benefit||"Siz uchun foydali imkoniyat"):idx===3?(copy||state.account.proof||state.account.bio||"Nimasi bilan ajralib turadi?"):(copy||"Keyingi qadamni bugun boshlang.");
 const detail=idx===1?(state.account.niche+" · "+state.account.bio):idx===2?(state.account.audience?"Kimlar uchun: "+state.account.audience:""):idx===3?(state.account.proof||"Tanlash uchun aniq sabab"):idx===4?(state.account.name||"NEX tavsiyasi"):(state.account.niche||"NEX tavsiyasi");
 const ease=1-Math.pow(1-Math.max(0,Math.min(1,(local-.035)/.62)),3);
 const wrap=(value,maxWidth,size,family)=>{c.font="750 "+size+"px "+family;const words=String(value||"").trim().split(/\s+/).filter(Boolean),lines=[];let line="";for(const word of words){const test=line?line+" "+word:word;if(line&&c.measureText(test).width>maxWidth){lines.push(line);line=word}else line=test}if(line)lines.push(line);return lines};
 const text=(value,px,py,maxWidth,size,color,weight="750",alignText="left",maxLines=5,family="system-ui")=>{
  const allLines=wrap(value,maxWidth,size,family),lines=allLines.slice(0,maxLines);if(allLines.length>maxLines&&lines.length)lines[lines.length-1]=lines[lines.length-1].replace(/[.,;:!?…]*$/,"")+"…";c.save();c.textAlign=alignText;c.textBaseline="middle";c.font=weight+" "+size+"px "+family;c.fillStyle=color;
  const lineH=size*1.22;lines.forEach((line,i)=>{const p=Math.max(0,Math.min(1,(local-i*.075)/.42)),k=1-Math.pow(1-p,3);c.save();c.globalAlpha=k;c.translate((1-k)*(alignText==="right"?-w*.12:w*.12),0);c.shadowColor=style==="Cinematic 3D"?"#000000aa":ac+"55";c.shadowBlur=0;c.fillText(line,px,py+i*lineH);c.restore()});c.restore();return lines.length*lineH;
 };
 const pill=(value,px,py)=>{c.save();c.font="800 "+(w*.023)+"px system-ui";const ww=Math.min(w*.76,c.measureText(value).width+w*.06);c.fillStyle=ac+"25";c.strokeStyle=ac+"99";c.lineWidth=1;c.beginPath();c.roundRect(align==="right"?px-ww:px,py,ww,h*.043,h*.018);c.fill();c.stroke();c.fillStyle=fg;c.textBaseline="middle";c.textAlign=align==="right"?"right":"left";c.fillText(value,align==="right"?px-ww+w*.03:px+w*.03,py+h*.0215);c.restore()};
 const profile=(cx,cy,r)=>{c.save();c.shadowColor=ac;c.shadowBlur=0;c.fillStyle="#ffffff18";c.strokeStyle=ac;c.lineWidth=w*.006;c.beginPath();c.arc(cx,cy,r,0,Math.PI*2);c.fill();c.stroke();c.shadowBlur=0;if(accountPhoto&&accountPhoto.complete&&accountPhoto.naturalWidth){c.save();c.beginPath();c.arc(cx,cy,r*.88,0,Math.PI*2);c.clip();c.drawImage(accountPhoto,cx-r*.88,cy-r*.88,r*1.76,r*1.76);c.restore()}else{text((state.account.name||"N").replace(/^@/,"").slice(0,1).toUpperCase(),cx,cy,r*1.4,r*.9,fg,"900","center",1)}c.restore()};
 c.save();c.fillStyle=bg;c.fillRect(0,0,w,h);
 // Four independent art-direction languages. The seed changes layout and object variants per new Reel.
 if(style==="Cinematic 3D"){
  const light=c.createRadialGradient(w*(variant%2?.76:.24),h*.32,0,w*.5,h*.48,w*.78);light.addColorStop(0,ac+"66");light.addColorStop(.42,sub+"22");light.addColorStop(1,bg);c.fillStyle=light;c.fillRect(0,0,w,h);
  c.save();c.translate(w*.72+Math.sin(t*.55+idx)*w*.035,h*.36+Math.cos(t*.42)*h*.025);c.rotate(t*.22+variant);c.globalAlpha=.45;
  const rr=w*(.17+variant*.012);for(let layer=5;layer>=0;layer--){c.save();c.rotate(layer*.08);c.strokeStyle=layer%2?sub:ac;c.lineWidth=w*.003;c.globalAlpha=.1+layer*.035;c.beginPath();c.ellipse(0,0,rr*(1+layer*.045),rr*.62*(1+layer*.045),.2,0,Math.PI*2);c.stroke();c.restore()}
  c.globalAlpha=.28;c.fillStyle=ac;c.beginPath();c.moveTo(0,-rr);c.lineTo(rr*.72,-rr*.18);c.lineTo(rr*.5,rr*.8);c.lineTo(-rr*.58,rr*.64);c.lineTo(-rr*.8,-rr*.2);c.closePath();c.fill();c.restore();
  c.save();c.globalAlpha=.18;c.strokeStyle=fg;for(let i=0;i<12;i++){const yy=h*(.12+i*.065);c.beginPath();c.moveTo(w*.07,yy);c.lineTo(w*.93,yy);c.stroke()}c.restore();
  const y=idx===1?h*.24:idx===2?h*.35:idx===3?h*.36:h*.39;
  if(idx===1){profile(w*.5,h*.25,w*.105);pill("PROFILE REVEAL",w*.12,h*.12);text(title,w*.5,h*.45,w*.76,w*.062,fg,"900","center",2);text(detail,w*.5,h*.58,w*.72,w*.029,sub,"600","center",3);if(state.account.followers)text(state.account.followers+" obunachi",w*.5,h*.73,w*.7,w*.03,ac,"800","center",1)}
  else{pill(["THE DISCOVERY","THE PROFILE","THE VALUE","THE DIFFERENCE","THE NEXT MOVE"][idx],w*.12,h*.2);text(title,x,y,w*.75,w*(idx===0?.095:.078),fg,"900",ta,5);text(detail,x,h*.76,w*.72,w*.031,sub,"650",ta,3)}
  c.save();c.globalAlpha=.45;c.strokeStyle=ac;c.lineWidth=w*.003;c.beginPath();c.arc(w*.5,h*.52,w*(.34+.012*Math.sin(t)),t*.25,t*.25+Math.PI*1.55);c.stroke();c.restore();
 }else if(style==="Kinetic Typography"){
  c.save();c.globalAlpha=.08;c.fillStyle=ac;c.font="950 "+(w*.72)+"px system-ui";c.textAlign=align==="right"?"right":"left";c.fillText(String(idx+1).padStart(2,"0"),align==="right"?w*.94:w*.06,h*.3);c.restore();
  for(let i=0;i<7;i++){const yy=h*(.16+i*.105),shift=((t*90+i*117+state.backgroundSeed%500)%(w*1.4))-w*.2;c.save();c.globalAlpha=.12+(i%3)*.04;c.fillStyle=i%2?ac:sub;c.fillRect(shift,yy,w*(.16+(i%3)*.06),h*.009);c.restore()}
  const markerY=h*(idx===0?.22:idx===1?.16:idx===2?.24:idx===3?.24:.22);pill(["STOP & LOOK","ACCOUNT / 01","YOUR BENEFIT","WHY THIS ONE","FOLLOW / SAVE"][idx],w*.1,markerY);
  if(idx===1){profile(w*.5,h*.43,w*.105);text(title,w*.5,h*.61,w*.82,w*.068,fg,"950","center",2);text(detail,w*.5,h*.77,w*.78,w*.027,ac,"700","center",3)}
  else{const size=idx===0?w*.115:idx===4?w*.095:w*.088;text(title,x,h*(idx===0?.42:.43),w*.8,size,fg,"950",ta,5);c.save();c.fillStyle=ac;c.fillRect(align==="right"?w*.48:w*.1,h*.72,w*.42,h*.014);c.restore();text(detail,x,h*.8,w*.78,w*.03,sub,"700",ta,3)}
  c.save();c.globalAlpha=.7;c.fillStyle=ac;c.fillRect(w*.08,h*.91,w*.84,h*.003);c.restore();
 }else if(style==="Editorial / Magazine"){
  c.fillStyle=fg;c.globalAlpha=.96;c.fillRect(w*.055,h*.065,w*.89,h*.87);c.globalAlpha=1;
  c.strokeStyle=bg+"55";c.lineWidth=1;c.strokeRect(w*.08,h*.09,w*.84,h*.82);
  c.fillStyle=bg;c.textAlign="left";c.textBaseline="middle";c.font="900 "+(w*.025)+"px system-ui";c.fillText("NEX  /  CULTURE & IDEAS",w*.11,h*.125);
  c.font="700 "+(w*.022)+"px system-ui";c.textAlign="right";c.fillText("VOL. 0"+(idx+1)+"   —   2026",w*.89,h*.125);
  c.strokeStyle=bg+"55";c.beginPath();c.moveTo(w*.11,h*.16);c.lineTo(w*.89,h*.16);c.stroke();
  const ink=bg,accentInk=ac;const left=w*.12,right=w*.88;
  if(idx===1){profile(w*.5,h*.35,w*.105);c.fillStyle=ink;text(title,w*.5,h*.52,w*.7,w*.06,ink,"900","center",2,"Georgia, serif");text(detail,w*.5,h*.66,w*.68,w*.028,ink,"500","center",4,"Georgia, serif");if(state.account.followers)text(state.account.followers+" FOLLOWERS",w*.5,h*.8,w*.7,w*.023,accentInk,"800","center",1)}
  else{
   c.fillStyle=accentInk;c.fillRect(left,h*.21,w*.11,h*.009);c.fillStyle=ink;c.font="900 "+(w*.026)+"px system-ui";c.textAlign="left";c.fillText(["THE FIND","PROFILE NOTE","THE VALUE","THE EDITOR'S PICK","TAKE ACTION"][idx],left,h*.25);
   text(title,align==="right"?right:left,h*.38,w*.7,w*(idx===0?.082:.069),ink,"900",ta,6,"Georgia, serif");
   c.strokeStyle=ink+"55";c.beginPath();c.moveTo(left,h*.72);c.lineTo(right,h*.72);c.stroke();
   text(detail,left,h*.78,w*.7,w*.026,ink,"500","left",3,"Georgia, serif");
  }
  c.fillStyle=ink;c.font="800 "+(w*.022)+"px system-ui";c.textAlign="center";c.fillText("NEX  •  FIKR VA IMKONIYATLAR MAKONI",w*.5,h*.89);
 }else{
  // Futuristic Motion: perspective grid, HUD reticle and floating data panels.
  const horizon=h*.43;c.save();c.strokeStyle=ac+"55";c.lineWidth=1;
  for(let i=-7;i<=7;i++){c.beginPath();c.moveTo(w*.5+i*w*.018,horizon);c.lineTo(w*.5+i*w*.14,h);c.stroke()}
  for(let i=0;i<12;i++){const q=i/12,y=horizon+(h-horizon)*q*q;c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke()}c.restore();
  c.save();c.translate(w*.78,h*.3);c.rotate(t*.24);c.strokeStyle=ac;c.lineWidth=w*.004;c.globalAlpha=.55;c.beginPath();c.arc(0,0,w*.13,t*.2,t*.2+Math.PI*1.6);c.stroke();c.strokeStyle=sub;c.beginPath();c.arc(0,0,w*.18,-t*.16,-t*.16+Math.PI*1.2);c.stroke();c.restore();
  const py=idx===1?h*.18:h*.27;c.save();c.strokeStyle=ac;c.fillStyle=ac+"12";c.lineWidth=w*.003;c.beginPath();c.roundRect(w*.08,py,w*.84,h*(idx===1?.62:.48),w*.018);c.fill();c.stroke();c.restore();
  pill("NEX // "+["SIGNAL","IDENTITY","BENEFIT","ANALYSIS","ACTION"][idx],w*.12,h*.16);
  if(idx===1){profile(w*.5,h*.36,w*.09);text(title,w*.5,h*.51,w*.7,w*.055,fg,"850","center",2);text(detail,w*.5,h*.64,w*.7,w*.027,sub,"600","center",4);if(state.account.followers)text("FOLLOWERS  "+state.account.followers,w*.5,h*.76,w*.7,w*.023,ac,"800","center",1)}
  else{text(title,w*.14,h*.43,w*.72,w*.07,fg,"850","left",5);text(detail,w*.14,h*.68,w*.7,w*.027,sub,"600","left",3)}
  c.save();c.globalAlpha=.75;c.fillStyle=ac;c.fillRect(w*.14,h*.84,w*.22,h*.006);c.fillRect(w*.14,h*.86,w*.12,h*.006);c.restore();
  c.fillStyle=ac;c.font="700 "+(w*.02)+"px monospace";c.textAlign="right";c.fillText("SYS.ONLINE  /  0"+(idx+1),w*.88,h*.9);
 }
 // Scene-aware 3D parallax layers and animated entrance; no single template card is reused.
 c.save();c.globalAlpha=.32;c.strokeStyle=ac;c.lineWidth=w*.002;
 const drift=Math.sin(t*.7+variant)*w*.018;
 c.beginPath();c.moveTo(w*.08+drift,h*.08);c.lineTo(w*.08+drift,h*.17);c.moveTo(w*.08+drift,h*.08);c.lineTo(w*.18+drift,h*.08);c.stroke();c.restore();
 const sweep=1-ease;c.save();c.globalAlpha=sweep*.62;c.fillStyle=ac;
 if(style==="Kinetic Typography"){c.fillRect(0,0,w*sweep,h);c.globalAlpha=sweep*.42;c.fillStyle=fg;c.fillRect(w*sweep*.72,0,w*.018,h)}
 else if(style==="Editorial / Magazine"){c.fillStyle=fg;c.fillRect(0,0,w*sweep,h);c.globalAlpha=sweep*.5;c.fillStyle=ac;c.fillRect(w*sweep*.92,0,w*.012,h)}
 else if(style==="Futuristic Motion"){c.fillRect(0,0,w,h*sweep);c.globalAlpha=sweep*.5;c.fillStyle=fg;c.fillRect(0,h*sweep,w,w*.008)}
 else{c.beginPath();c.moveTo(w*(1-sweep*1.7),0);c.lineTo(w*(1.16-sweep*1.7),0);c.lineTo(w*(.16-sweep*1.7),h);c.lineTo(w*(-sweep*1.7),h);c.closePath();c.fill()}
 c.restore();
 drawBrand(c,w,h,ac,fg);
 c.restore();return true;
}

function drawRecommendationScene(c,w,h,now,pal){
 // WebGL 3D is the only volumetric renderer; fallback stays deliberately flat.
 const bg=pal[0],fg=pal[1],ac=pal[2],sub=pal[3]||ac,idx=state.scene,t=now/1000;
 const local=Math.max(0,Math.min(1,(state.elapsed-sceneStart(idx))/state.sceneDurations[idx]));
 const copy=$("sceneText").value||sceneCopy(idx);
 c.save();
 if(!state.webglReady){c.fillStyle=bg;c.fillRect(0,0,w,h);}
 // Har bir post va sahna uchun alohida kamera harakati: bir xil kompozitsiya hissini buzadi.
 const cameraRand=seededRandom((state.backgroundSeed^Math.imul(idx+71,0xC2B2AE35))|0);
 const cameraStyle=Math.floor(cameraRand()*5),cameraEase=1-Math.pow(1-Math.max(0,Math.min(1,(local-.03)/.72)),3);
 const phase=t*.42+idx*1.13,amp= cameraEase;
 const cameraX=cameraStyle===0?Math.sin(phase)*w*.025*amp:cameraStyle===2?Math.cos(phase*.7)*w*.035*amp:cameraStyle===4?Math.sin(phase*1.2)*w*.022*amp:0;
 const cameraY=cameraStyle===1?Math.sin(phase)*h*.026*amp:cameraStyle===3?Math.cos(phase*.8)*h*.03*amp:cameraStyle===4?Math.cos(phase)*h*.018*amp:0;
 const cameraScale=cameraStyle===0?1+.065*amp*Math.sin(phase*.65):cameraStyle===1?.96+.045*amp:cameraStyle===2?1.035-.035*amp:cameraStyle===3?.975+.04*amp:1+.025*amp*Math.sin(phase);
 const cameraRotate=(cameraStyle===1?.018:cameraStyle===4?.027:cameraStyle===3?-.012:0)*amp*Math.sin(phase*.6);

 const text=(value,x,y,maxWidth,fontSize,color,weight="700",align="left",maxLines=4)=>{
  const words=String(value||"").trim().split(/\s+/).filter(Boolean),lines=[];c.font=weight+" "+fontSize+"px system-ui";let line="";
  for(const word of words){const test=line?line+" "+word:word;if(line&&c.measureText(test).width>maxWidth){lines.push(line);line=word}else line=test}
  if(line)lines.push(line);const shown=lines.slice(0,maxLines);if(lines.length>maxLines&&shown.length)shown[shown.length-1]+="…";
  c.save();c.textAlign=align;c.textBaseline="middle";c.fillStyle=color;shown.forEach((ln,i)=>c.fillText(ln,x,y+i*fontSize*1.28));c.restore();return shown.length*fontSize*1.28;
 };
 const pill=(label,x,y)=>{
  c.save();c.font="800 "+(w*.025)+"px system-ui";const ww=Math.min(w*.78,c.measureText(label).width+w*.07);
  c.fillStyle=ac+"25";c.strokeStyle=ac+"99";c.lineWidth=1;c.beginPath();c.roundRect(x,y,ww,h*.045,h*.022);c.fill();c.stroke();
  c.fillStyle=fg;c.textBaseline="middle";c.fillText(label,x+w*.035,y+h*.022);c.restore();
 };
 const avatar=(x,y,r)=>{
  c.save();c.shadowColor="transparent";c.shadowBlur=0;c.fillStyle="#ffffff12";c.strokeStyle=ac;c.lineWidth=w*.006;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.stroke();c.shadowBlur=0;
  if(accountPhoto&&accountPhoto.complete&&accountPhoto.naturalWidth){c.save();c.beginPath();c.arc(x,y,r*.88,0,Math.PI*2);c.clip();c.drawImage(accountPhoto,x-r*.88,y-r*.88,r*1.76,r*1.76);c.restore()}
  else{c.fillStyle=ac;c.font="900 "+(r*.9)+"px system-ui";c.textAlign="center";c.textBaseline="middle";c.fillText((state.account.name||"N").replace(/^@/,"").slice(0,1).toUpperCase(),x,y)}
  c.restore();
 };
 const card=(x,y,ww,hh)=>{c.save();c.shadowColor="transparent";c.shadowBlur=0;c.fillStyle="#ffffff0d";c.strokeStyle=ac+"99";c.lineWidth=w*.003;c.beginPath();c.roundRect(x,y,ww,hh,w*.035);c.fill();c.stroke();c.restore()};
 const enter=Math.max(0,Math.min(1,(local-.04)/.48)),e=1-Math.pow(1-enter,3);
 if(idx===0){
  c.save();c.globalAlpha=.75;c.fillStyle=ac;c.fillRect(w*.09,h*.25,w*.018,h*.45);c.restore();pill("NEX TAVSIYA QILADI",w*.14,h*.22);
  c.save();c.translate((1-e)*w*.16,0);c.globalAlpha=e;text(copy||"Siz izlayotgan foydali sahifa shu bo‘lishi mumkin.",w*.13,h*.39,w*.76,w*.105,fg,"900","left",5);
  c.globalAlpha=.72;text(state.account.niche||"Yangi bilim va foydali kontent",w*.14,h*.78,w*.7,w*.034,ac,"700","left",2);c.restore();
 }else if(idx===1){
  const y=h*.18+((1-e)*h*.2);card(w*.08,y,w*.84,h*.70);avatar(w*.5,y+h*.15,w*.105);
  text(state.account.name||"Akkaunt nomi",w*.5,y+h*.30,w*.72,w*.047,fg,"850","center",2);
  text(state.account.niche||"Akkaunt yo‘nalishi",w*.5,y+h*.365,w*.72,w*.03,ac,"750","center",2);
  text(state.account.bio||copy,w*.5,y+h*.445,w*.68,w*.031,fg,"500","center",3);
  if(state.account.followers){c.save();c.fillStyle=ac+"22";c.beginPath();c.roundRect(w*.2,y+h*.62,w*.6,h*.07,w*.025);c.fill();c.restore();text(state.account.followers+" obunachi",w*.5,y+h*.655,w*.54,w*.03,fg,"800","center",1)}
  pill("AKKAUNT BILAN TANISHING",w*.14,h*.13);
 }else if(idx===2){
  pill("SIZGA QANDAY FOYDA BERADI?",w*.1,h*.2);c.save();c.globalAlpha=.16;c.fillStyle=ac;c.beginPath();c.arc(w*.82,h*.42,w*.24,0,Math.PI*2);c.fill();c.restore();
  text(copy||state.account.benefit,w*.12,h*.37,w*.76,w*.078,fg,"900","left",5);c.save();c.fillStyle=ac;c.fillRect(w*.12,h*.72,w*.17,h*.012);c.restore();
  text(state.account.audience?"Kimlar uchun: "+state.account.audience:"",w*.12,h*.79,w*.75,w*.03,sub,"650","left",3);
 }else if(idx===3){
  pill("NEGA AYNAN SHU SAHIFA?",w*.1,h*.17);card(w*.1,h*.29,w*.8,h*.43);
  c.save();c.fillStyle=ac;c.font="900 "+(w*.19)+"px Georgia";c.textAlign="left";c.fillText("“",w*.17,h*.4);c.restore();
  text(copy||state.account.proof||state.account.bio,w*.18,h*.49,w*.64,w*.064,fg,"750","left",5);
  c.save();c.fillStyle=ac;c.fillRect(w*.18,h*.67,w*.2,h*.009);c.restore();
  text(state.account.proof?"TAVSIYA SABABI":"O‘ZIGA XOS JIHATI",w*.18,h*.76,w*.64,w*.025,sub,"800","left",2);
 }else{
  c.save();c.globalAlpha=.16;c.strokeStyle=ac;c.lineWidth=w*.018;
  for(let r=0;r<5;r++){c.beginPath();c.arc(w*.5,h*.48,w*(.16+r*.075),t*.15+r*.3,t*.15+r*.3+Math.PI*1.5);c.stroke()}c.restore();
  pill("KEYINGI QADAM",w*.1,h*.24);text(copy||"Foydali deb bilsangiz, kuzatib boring.",w*.12,h*.43,w*.76,w*.09,fg,"900","left",4);
  text(state.account.name||"",w*.12,h*.72,w*.76,w*.045,ac,"850","left",2);
  if(state.account.link)text("Havola profil tavsifida",w*.12,h*.81,w*.72,w*.027,sub,"650","left",1);
 }

 c.save();c.globalAlpha=Math.max(0,1-local/.18)*.65;c.fillStyle=ac;c.beginPath();c.moveTo(w*(1-local*5),0);c.lineTo(w*(1.2-local*5),0);c.lineTo(w*(.2-local*5),h);c.lineTo(w*(-local*5),h);c.closePath();c.fill();c.restore();
 drawBrand(c,w,h,ac,fg);c.restore();
}

function drawScene(c,w,h,now){
 c.clearRect(0,0,w,h);
 if(state.mode==="tavsiya"){const pal=paletteMap[state.palette]||paletteMap.Midnight;drawRecommendationScene(c,w,h,now,pal);return;}
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
  for(const word of String(txt).trim().split(/\s+/).filter(Boolean)){
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
 c.save();c.globalAlpha=.24;c.fillStyle=bg;c.shadowColor="#000";c.shadowBlur=0;
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
  c.shadowColor="#000000";c.shadowBlur=0;c.shadowOffsetX=w*.009;c.shadowOffsetY=w*.014;
  c.fillStyle=i===0?ac:fg;c.fillText(ln,0,0);
  c.shadowColor=ac;c.shadowBlur=0;c.shadowOffsetX=0;c.shadowOffsetY=0;
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
  c.shadowColor="#00000099";c.shadowBlur=0;c.fillStyle="#ffffff12";c.strokeStyle=ac;c.lineWidth=w*.004;
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
c.shadowColor="transparent";c.shadowBlur=0;c.fillStyle=fg;c.font="950 "+(w*.19)+"px system-ui";c.fillText("NEX",0,0);c.shadowBlur=0;
// Abstract orbit/play mark, a short animated sweep around the wordmark.
c.strokeStyle=ac;c.lineWidth=w*.009;c.beginPath();c.ellipse(0,0,w*.29,h*.055,-.2,Math.PI*.08,Math.PI*(.25+1.55*p));c.stroke();
c.fillStyle=ac;c.beginPath();c.moveTo(w*.245,-h*.012);c.lineTo(w*.28,0);c.lineTo(w*.245,h*.012);c.closePath();c.fill();
if(last){c.font="600 "+(w*.031)+"px system-ui";c.fillStyle=fg;c.fillText("Fikr va imkoniyatlar makoni",0,h*.085)}
c.restore();
}
function draw(){
 const now=performance.now();if(threeReady){renderThree(now);if(state.recording&&!$("recordOverlay").hidden)renderThree(now,recordRenderer)}
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
 button.textContent="✓ Yangi kreativ tayyor!";
 if(button._shuffleTimer)clearTimeout(button._shuffleTimer);
 button._shuffleTimer=setTimeout(()=>{
  button.classList.remove("shuffle-flash");
  button.textContent="✧ Yangi kreativ variant";
 },1400);
};
$("recordMode").onclick=()=>{if(total>60000){alert("Reels 60 soniyadan oshib ketdi. Matnni qisqartiring.");return}state.recording=true;$("recordOverlay").hidden=false;state.started=performance.now()-state.elapsed;state.playing=true;draw()};
$("recordPause").onclick=()=>{state.playing=!state.playing;if(state.playing)state.started=performance.now()-state.elapsed;$("recordPause").textContent=state.playing?"Ⅱ":"▶"};
$("recordExit").onclick=()=>{state.recording=false;$("recordOverlay").hidden=true;state.playing=false;$("startPreview").textContent="▶ Davom etish";draw()};
$("finish").onclick=()=>{state.playing=false;state.recording=false;$("recordOverlay").hidden=true;page("home")};
window.addEventListener("resize",draw);
initThreeEngine();
})();