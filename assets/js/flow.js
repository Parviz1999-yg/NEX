(()=>{"use strict";
const $=id=>document.getElementById(id), pages=["home","content","script","style","palette","animation","studio"];
const labels=["01 — YO‘NALISH","02 — MAZMUN","03 — SSENARIY","04 — VIZUAL USLUB","05 — RANG PALETRASI","06 — ANIMATSIYA","07 — STUDIYA"];
const state={mode:"",script:["","","","",""],sceneDurations:[5000,5000,5000,5000,5000],account:{name:"",niche:"",bio:"",benefit:"",audience:"",proof:"",followers:"",link:"",image:""},topicType:"",title:"",tone:"Jiddiy",style:"Cinematic 3D",palette:"Arctic Silver",animation:"Silliq",scene:0,playing:false,started:0,elapsed:0,raf:0,recording:false,backgroundSeed:Math.floor(Math.random()*4294967295),variantIndex:0};
const modes={tavsiya:"Tavsiya akkaunt",manba:"Foydali manba",fakt:"Qiziqarli fakt",ibora:"Maxsus iboralar"};
const scenes=["Kirish","Asosiy fikr","Izoh","Urg‘u","Yakun"];
const paletteMap={"Electric Blue":["#06142F","#F4FAFF","#168CFF","#76D9FF"],"Cobalt Chrome":["#071A3B","#F5FAFF","#287BFF","#A8D9FF"],"Arctic Silver":["#0B1A2B","#F8FCFF","#73C8FF","#C8E8FF"],"Azure Pulse":["#061B35","#F2FAFF","#00A7FF","#59E0FF"],"Royal Violet":["#130E36","#FAF7FF","#8B5CFF","#C1A7FF"],"Crimson Chrome":["#260D24","#FFF7FC","#FF3F78","#FFB4D1"],"Emerald Laser":["#061F24","#F2FFFC","#00D5B2","#8CFFE8"],"Solar Chrome":["#241A08","#FFFCF2","#FFB52E","#FFE49A"]};
let total=25000;
function page(name){pages.forEach((p,i)=>$("page-"+p).classList.toggle("active",p===name));$("stepLabel").textContent=labels[pages.indexOf(name)];window.scrollTo(0,0)}
function selectGroup(id,key){$(id).querySelectorAll("button").forEach(b=>{b.classList.toggle("selected",b.dataset.value===key)});}
function bindOptions(id,prop){$(id).querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{state[prop]=b.dataset.value;selectGroup(id,state[prop]);}));}
function configureTopicType(){
 const select=$("topicType"),label=$("topicTypeLabel"),prompt=$("contentPrompt");
 const recommendation=state.mode==="tavsiya";
 const options=recommendation?["Kreativ","Ilm-fan","Texnologiya","Yumor"]:["Instagram akkaunt","Ta’lim va ilm-fan","Texnologiya","Kitob va adabiyot","Tarix va madaniyat","Hayotiy kuzatuv","Motivatsiya va fikr","Boshqa"];
 label.textContent=recommendation?"Akkaunt yo‘nalishi":"Mavzu turi";
 prompt.textContent=recommendation?"Qanday yo‘nalishdagi akkauntni tavsiya qilamiz?":"Qaysi mavzu haqida Reels tayyorlaymiz?";
 $("topicTitle").previousElementSibling.textContent=recommendation?"Rolik g‘oyasi / asosiy fokus":"Mavzu nomi";
 $("topicTitle").placeholder=recommendation?"Masalan: Yangi boshlovchilar uchun foydali sahifa":"Masalan: Sun’iy intellektni o‘rganish uchun 3 manba";
 select.innerHTML='<option value="">Tanlang</option>'+options.map(value=>'<option>'+value+'</option>').join("");
 state.topicType="";
}
document.querySelectorAll(".direction").forEach(b=>b.addEventListener("click",()=>{state.mode=b.dataset.mode;configureTopicType();page("content")}));
document.querySelectorAll("[data-back]").forEach(b=>b.addEventListener("click",()=>page(b.dataset.back)));
bindOptions("styleOptions","style");bindOptions("paletteOptions","palette");bindOptions("animationOptions","animation");
document.querySelectorAll("#paletteOptions .palette").forEach(b=>{const colors=(b.dataset.colors||"").split(",");b.querySelectorAll(".swatches i").forEach((dot,i)=>dot.style.backgroundColor=colors[i]||"#777")});
$("toScript").onclick=()=>{state.topicType=$("topicType").value;state.title=$("topicTitle").value.trim();state.tone=$("tone").value;if(!state.topicType||!state.title){alert("Mavzu turi va mavzu nomini kiriting.");return}configureScript();page("script")};
$("toStyle").onclick=()=>{state.script=[$("scriptHook").value,$("scriptIntro").value,$("scriptWhy").value,$("scriptDiff").value,$("scriptCta").value];readAccountForm();if(state.mode==="tavsiya"){if(!state.account.name||!state.account.niche||!state.account.bio||!state.account.benefit){alert("Tavsiya uchun akkaunt nomi, yo‘nalishi, tavsifi va foydasini kiriting.");return}generateRecommendationScript()}calculateDurations();if(total>60000){alert("Reels davomiyligi "+Math.ceil(total/1000)+" soniya bo‘ldi. Maksimum 60 soniya. Kartochka matnini qisqartiring.");return}if(state.mode==="tavsiya"&&(!state.script[0].trim()||!state.script[2].trim()||!state.script[3].trim()||!state.script[4].trim())){alert("Hook, Sabab, Ustunlik va Chorlov matnlarini kiriting.");return}if(state.mode!=="tavsiya"&&(!state.script[0].trim()||!state.script[1].trim()||!state.script[4].trim())){alert("Birinchi, ikkinchi va yakuniy matnlarni to‘ldiring.");return}page("style")};
$("toPalette").onclick=()=>page("palette");$("toAnimation").onclick=()=>page("animation");$("toStudio").onclick=()=>{page("studio");try{buildStudio();start()}catch(error){console.error("NEX Studio error:",error);const summary=$("summary");if(summary)summary.textContent="Namoyish oynasini tayyorlashda xatolik yuz berdi: "+(error&&error.message?error.message:"Noma’lum xato");}};
function buildStudio(){calculateDurations();$("sceneTextLabel").hidden=state.mode==="tavsiya";$("sceneText").hidden=state.mode==="tavsiya";state.backgroundSeed=Math.floor(Math.random()*4294967295);state.lastScene=-1;$("summary").innerHTML="<strong>"+modes[state.mode]+"</strong><br>"+escapeHTML(state.topicType)+" · "+escapeHTML(state.title)+"<br>"+escapeHTML(state.tone)+" / "+state.style+" / "+state.palette+" / "+state.animation+"<br><strong>Davomiylik: "+Math.ceil(total/1000)+" soniya</strong>";if(state.webglError){const warning=document.createElement("p");warning.className="webgl-warning";warning.textContent=state.webglError;$("summary").appendChild(warning)}$("sceneList").innerHTML="";scenes.forEach((s,i)=>{const b=document.createElement("button");b.className="scene-chip"+(i===0?" active":"");b.textContent=String(i+1).padStart(2,"0");b.title=sceneTitle(i);b.onclick=()=>{state.scene=i;state.elapsed=sceneStart(i);state.started=performance.now()-state.elapsed;updateSceneUI();};$("sceneList").appendChild(b)});$("sceneText").value=sceneCopy(0);refreshSceneDurationUI();draw(performance.now())}
function configureScript(){
 const labels=state.mode==="manba"?["HOOK — qiziqtirish","RESURSNI TANISHTIRISH","NIMA UCHUN KERAK?","QANDAY FOYDALANISH?","CHORLOV — yakun"]:state.mode==="fakt"?["HOOK — savol yoki kutilmagan fikr","FAKTNI OCHISH","IZOH — sabab va dalil","QIZIQARLI TAFSILOT","YAKUNIY FIKR"]:state.mode==="ibora"?["HOOK — fikrga kirish","ASOSIY IBORA","MA’NO — chuqurroq izoh","HAYOTIY BOG‘LANISH","YAKUNIY FIKR"]:["HOOK — e’tiborni tortish","AKKAUNT KARTOCHKASI","SABAB — nega tavsiya qilinyapti?","USTUNLIK — nimasi bilan foydali?","CHORLOV — yakun"];
 ["introLabel","whyLabel","diffLabel","ctaLabel"].forEach((id,i)=>$(id).textContent=labels[i+1]);
 $("scriptHook").placeholder=labels[0]+"...";
 $("accountFields").hidden=state.mode!=="tavsiya";
 const ids=["scriptHook","scriptIntro","scriptWhy","scriptDiff","scriptCta"];
 ids.forEach((id,i)=>$(id).value=state.script[i]||"");
 document.querySelectorAll("#page-script .script-step").forEach((el,i)=>{
  el.hidden=state.mode==="tavsiya"?(i===1):false;
 });
}

function readAccountForm(){
 state.account={name:$("accountName").value.trim(),niche:$("accountNiche").value.trim(),bio:$("accountBio").value.trim(),benefit:$("accountBenefit").value.trim(),audience:$("accountAudience").value.trim(),proof:$("accountProof").value.trim(),followers:$("accountFollowers").value.trim(),link:$("accountLink").value.trim(),image:state.account.image};
 return state.account;
}
function generateRecommendationScript(){
 const a=readAccountForm();
 if(!a.name||!a.niche||!a.bio||!a.benefit){alert("Avval akkaunt nomi, yo‘nalishi, tavsifi va foydasini to‘ldiring.");return}
 // Faqat akkaunt kartochkasi ma’lumotlari yangilanadi; muallif yozgan Hook, Sabab, Ustunlik va Chorlovga tegilmaydi.
 state.script[1]=a.name+" — "+a.niche+". "+a.bio;
 const button=$("generateAccountScript");button.textContent="✓ Akkaunt kartochkasi yangilandi";
 calculateDurations();
}
function getTopicProfile(){
 const profiles={
  "Kreativ":{id:"creative",flow:1.18,twist:.22,rotation:.16,cameraX:.24,cameraY:.12,scaleX:1.04,scaleY:1.08},
  "Ilm-fan":{id:"science",flow:.88,twist:.04,rotation:.02,cameraX:-.12,cameraY:.06,scaleX:.96,scaleY:1.04},
  "Texnologiya":{id:"technology",flow:1.12,twist:.34,rotation:.12,cameraX:.18,cameraY:-.08,scaleX:1.08,scaleY:.94},
  "Yumor":{id:"humor",flow:1.32,twist:.48,rotation:.2,cameraX:.08,cameraY:.2,scaleX:1.1,scaleY:1.12}
 };
 if(state.mode!=="tavsiya")return {id:"neutral",flow:1,twist:0,rotation:0,cameraX:0,cameraY:0,scaleX:1,scaleY:1,seed:0,focus:"general"};
 const base=profiles[state.topicType]||profiles["Kreativ"],title=String(state.title||"").trim().toLowerCase();
 let seed=2166136261;
 for(let i=0;i<title.length;i++)seed=Math.imul(seed^title.charCodeAt(i),16777619);
 const focus=/dizayn|rasm|san.?at|video|kontent|ijod/.test(title)?"visual":/ilm|fan|fizik|kimyo|biolog|koinot|tajriba/.test(title)?"discovery":/texnolog|dastur|python|sun.?iy|robot|kompyuter|ai/.test(title)?"systems":/hazil|kulgi|mem|yumor/.test(title)?"playful":"general";
 return {...base,seed:seed>>>0,focus};
}
function getNarrativeProfile(){
 const profiles={
  "Jiddiy":{font:"system-ui",weight:"850",scale:1,line:1.22,energy:.88},
  "Ilmiy":{font:"Georgia,serif",weight:"750",scale:.96,line:1.34,energy:.78},
  "Sodda va tushunarli":{font:"system-ui",weight:"750",scale:.98,line:1.28,energy:.94},
  "Yumor":{font:"system-ui",weight:"900",scale:1.045,line:1.16,energy:1.2},
  "Tahliliy":{font:"ui-monospace,monospace",weight:"780",scale:.94,line:1.26,energy:.84},
  "Motivatsion":{font:"system-ui",weight:"900",scale:1.06,line:1.18,energy:1.14},
  "Sirli va qiziqarli":{font:"Georgia,serif",weight:"850",scale:1.02,line:1.3,energy:1.08},
  "Falsafiy":{font:"Georgia,serif",weight:"700",scale:.98,line:1.38,energy:.72}
 };
 return profiles[state.tone]||profiles["Jiddiy"];
}
function getMotionProfile(){
 const profiles={
  "Silliq":{speed:.72,flow:.78,camera:.68,entrance:"soft",wipe:.78},
  "Dinamik":{speed:1.72,flow:1.3,camera:1.12,entrance:"snap",wipe:1.35},
  "Kinematik":{speed:.88,flow:.96,camera:1.62,entrance:"dolly",wipe:.62},
  "Ijodiy":{speed:1.24,flow:1.18,camera:1.16,entrance:"scene",wipe:1.08},
  "Aralash":{speed:1.02,flow:1.06,camera:1.2,entrance:"mix",wipe:.92}
 };
 const p=profiles[state.animation]||profiles["Silliq"],tone=state.mode==="tavsiya"?getNarrativeProfile().energy:1,i=state.scene%5;
 const mixed=state.animation==="Aralash"?{speed:[.78,1.34,1.72,.96,1.42][i],flow:[.82,1.22,1.42,.94,1.3][i],camera:[.72,1.12,1.48,.9,1.32][i],entrance:["soft","snap","dolly","scene","mix"][i],wipe:[.72,1.28,1.46,.88,1.16][i]}:p;
 return {...mixed,speed:mixed.speed*tone,flow:mixed.flow*tone,camera:mixed.camera*(.9+tone*.1)};
}
function sceneTitle(i){return state.mode==="tavsiya"?["HOOK","AKKAUNT TAVSIYASI","SABAB","USTUNLIK","CHORLOV"][i]:scenes[i]}function sceneCopy(i){return state.script[i]||""}function wordCount(text){return String(text||"").trim().split(/\s+/).filter(Boolean).length}
function calculateDurations(){state.sceneDurations=state.script.map((v,i)=>i===1&&state.mode==="tavsiya"?6500:Math.min(12000,Math.max(3500,Math.ceil(wordCount(v)/2.5*1000)+1100)));total=state.sceneDurations.reduce((a,b)=>a+b,0);refreshDurationInfo()}
function sceneStart(i){return state.sceneDurations.slice(0,i).reduce((a,b)=>a+b,0)}
function refreshSceneDurationUI(){const slider=$("sceneDuration"),value=$("sceneDurationValue"),summary=$("durationSummary");if(!slider)return;const seconds=state.sceneDurations[state.scene]/1000;slider.value=String(seconds);if(value)value.textContent=seconds.toFixed(1).replace(".",",")+" soniya";if(summary)summary.textContent="Jami rolik: "+(total/1000).toFixed(1).replace(".",",")+" soniya · 5 sahna · har birini alohida sozlang.";}
function sceneIndexAt(ms){let t=0;for(let i=0;i<state.sceneDurations.length;i++){t+=state.sceneDurations[i];if(ms<t)return i}return 4}
function refreshDurationInfo(){const duration=(total/1000).toFixed(1).replace(".",",");const el=$("durationSummary");if(el)el.textContent="Jami rolik: "+duration+" soniya · 5 kartochka · har birining vaqtini alohida sozlang."}
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
$("sceneText").addEventListener("input",()=>{state.script[state.scene]=$("sceneText").value;const ids=["scriptHook","scriptIntro","scriptWhy","scriptDiff","scriptCta"];$(ids[state.scene]).value=$("sceneText").value;draw(performance.now())});
$("sceneDuration").addEventListener("input",()=>{const oldStart=sceneStart(state.scene);state.sceneDurations[state.scene]=Math.round(Number($("sceneDuration").value)*2)*500;total=state.sceneDurations.reduce((a,b)=>a+b,0);state.elapsed=oldStart;state.started=performance.now()-state.elapsed;refreshSceneDurationUI();updateSceneUI();});
["scriptHook","scriptIntro","scriptWhy","scriptDiff","scriptCta"].forEach((id,i)=>$(id).addEventListener("input",()=>{state.script[i]=$(id).value}));
$("accountImage").addEventListener("change",e=>{const file=e.target.files&&e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{state.account.image=reader.result;accountPhoto=new Image();accountPhoto.onload=()=>draw();accountPhoto.src=reader.result};reader.readAsDataURL(file)});
$("generateAccountScript").addEventListener("click",generateRecommendationScript);
function updateSceneUI(){state.scene=sceneIndexAt(state.elapsed);document.querySelectorAll(".scene-chip").forEach((b,i)=>b.classList.toggle("active",i===state.scene));$("sceneCounter").textContent="SAHNA "+String(state.scene+1).padStart(2,"0")+" / 05";$("sceneTime").textContent="00:"+String(Math.floor(state.elapsed/1000)).padStart(2,"0");$("progress").style.width=(state.elapsed/total*100)+"%";if(state.lastScene!==state.scene){$("sceneText").value=sceneCopy(state.scene);refreshSceneDurationUI();state.lastScene=state.scene}draw(performance.now())}
const canvas=$("reelCanvas"),ctx=canvas.getContext("2d",{alpha:true}),rc=$("recordCanvas"),rctx=rc.getContext("2d",{alpha:true}),threeCanvas=$("reel3D"),recordThreeCanvas=$("record3D");
let accountPhoto=null,THREE=null,threeReady=false,threeFailed=false,threeScene=null,threeCamera=null,threeRenderer=null,recordRenderer=null,threeGroup=null,threeLogo=null,logoStrokes=[],threeSeed=-1,threeSceneIndex=-1;
async function initThreeEngine(){
 try{
  const modules=await Promise.all([import("https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js"),import("https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/environments/RoomEnvironment.js")]);
  THREE=modules[0];const RoomEnvironment=modules[1].RoomEnvironment;
  const makeRenderer=target=>{const r=new THREE.WebGLRenderer({canvas:target,antialias:true,alpha:false,powerPreference:"high-performance"});r.setPixelRatio(1);r.setSize(target.width,target.height,false);r.outputColorSpace=THREE.SRGBColorSpace;r.toneMapping=THREE.ACESFilmicToneMapping;r.toneMappingExposure=1.55;return r};
  threeRenderer=makeRenderer(threeCanvas);recordRenderer=makeRenderer(recordThreeCanvas);
  threeScene=new THREE.Scene();threeCamera=new THREE.PerspectiveCamera(34,360/640,.1,100);threeCamera.position.set(0,0,9);
  const pmrem=new THREE.PMREMGenerator(threeRenderer);pmrem.compileEquirectangularShader();
  const room=new RoomEnvironment(threeRenderer);threeScene.environment=pmrem.fromScene(room,.04).texture;room.dispose();pmrem.dispose();
  threeScene.add(new THREE.HemisphereLight(0xf8fbff,0x30445d,3.35));
  const key=new THREE.DirectionalLight(0xffffff,8.0);key.position.set(-4,6,7);threeScene.add(key);
  const rim=new THREE.PointLight(0x168cff,95,22);rim.position.set(4,1,3);threeScene.add(rim);
  const fill=new THREE.PointLight(0xb9eaff,88,22);fill.position.set(-4,-3,2);threeScene.add(fill);
  threeScene.userData.rimLight=rim;threeScene.userData.fillLight=fill;
  const topLight=new THREE.PointLight(0xffffff,72,20);topLight.position.set(0,5,1);threeScene.add(topLight);
  buildNexLogo();
  threeReady=true;state.webglReady=true;buildThreeObjects();draw();
 }catch(error){threeFailed=true;state.webglReady=false;state.webglError="3D dvigatel yuklanmadi: "+(error&&error.message?error.message:"noma’lum xato")+". Internetni tekshirib, sahifani yangilang.";console.error("NEX WebGL initialization failed:",error);const n=document.createElement("p");n.className="webgl-warning";n.textContent=state.webglError;$("summary").appendChild(n)}
}
function buildThreeObjects(){
 if(!threeReady)return;
 // Release old GPU resources whenever a scene is rebuilt; important on mobile WebGL.
 if(threeGroup){
  threeScene.remove(threeGroup);
  threeGroup.traverse(object=>{
   if(object.geometry)object.geometry.dispose();
   if(object.material){if(Array.isArray(object.material))object.material.forEach(material=>material.dispose());else object.material.dispose()}
  });
 }
 threeGroup=new THREE.Group();threeScene.add(threeGroup);
 const topic=getTopicProfile(),rand=seededRandom((state.backgroundSeed^Math.imul(state.scene+53,0x9E3779B1)^topic.seed)|0),style=state.style;
 const chrome=new THREE.MeshPhysicalMaterial({color:0xd9dde3,metalness:.985,roughness:.115,clearcoat:1,clearcoatRoughness:.022,envMapIntensity:4.8,emissive:0x171b20,emissiveIntensity:.035,side:THREE.DoubleSide});
 const main=new THREE.Group();threeGroup.add(main);const flows=[];
 // Monoxrom kompozitsiya: bitta keng, uzluksiz xrom-suyuqlik tasmasi.
 const flow=createFlowSurface(112,28,chrome,(rand()-.5)*6.2);
 flow.userData.flowLayer=0;
 const variant=state.variantIndex%6;
 const variantRotation=[-.62,-.34,-.08,.22,.48,.72][variant];
 const variantScale=[1.82,2.02,2.28,1.94,2.16,1.88][variant];
 flow.rotation.set(.08+variant*.025+topic.rotation,-.12+topic.twist*.22,variantRotation+(style==="Kinetic Typography"?.12:style==="Editorial / Magazine"?.04:style==="Futuristic Motion"?-.1:0)+topic.twist);
 flow.scale.set(variantScale*.86*topic.scaleX,variantScale*.78*topic.scaleY,1);flow.position.set([-.22,.12,.02,-.1,.2,-.16][variant],[.08,-.06,.02,.12,-.1,0][variant],.42);
 main.add(flow);flows.push(flow);
 threeGroup.userData={main,flows,phase:rand()*Math.PI*2};
 threeSeed=state.backgroundSeed;threeSceneIndex=state.scene;
}
function createFlowSurface(segments,widthSegments,material,seed){
 const positions=[],indices=[],base=[];
 for(let iy=0;iy<=widthSegments;iy++){const v=iy/widthSegments*2-1;for(let ix=0;ix<=segments;ix++){const u=ix/segments,x=(u-.5)*8.4;positions.push(x,v*.55,0);base.push(x,v,u)}}
 for(let iy=0;iy<widthSegments;iy++)for(let ix=0;ix<segments;ix++){const a=iy*(segments+1)+ix,b=a+1,c=a+segments+1,d=c+1;indices.push(a,b,c,b,d,c)}
 const geometry=new THREE.BufferGeometry();geometry.setAttribute("position",new THREE.Float32BufferAttribute(positions,3));geometry.setIndex(indices);geometry.computeVertexNormals();
 const mesh=new THREE.Mesh(geometry,material);mesh.userData.flowBase=new Float32Array(base);mesh.userData.flowSeed=seed;return mesh;
}
function updateFlowSurfaces(flows,time,intensity=1){
 const sceneLocal=Math.max(0,Math.min(1,(state.elapsed-sceneStart(state.scene))/Math.max(1,state.sceneDurations[state.scene])));
 const reveal=1-Math.pow(1-Math.min(1,sceneLocal/.34),3);
 for(const mesh of flows){
  const attr=mesh.geometry.attributes.position,base=mesh.userData.flowBase,seed=mesh.userData.flowSeed;
  const style=state.style,scene=state.scene,topic=getTopicProfile();
  const speed=(style==="Kinetic Typography"?1.55:style==="Editorial / Magazine"?.58:style==="Futuristic Motion"?1.28:.92)*topic.flow;
  const phase=time*speed+seed,transition=Math.max(0,1-Math.min(1,(state.elapsed-sceneStart(scene))/Math.max(700,state.sceneDurations[scene])/.28));
  for(let i=0;i<attr.count;i++){
   const k=i*3,x=base[k],v=base[k+1],u=base[k+2],edge=Math.pow(Math.sin(Math.PI*u),.55);
   let px=x,py=0,pz=0;
   if(scene===0){
    // Logo intro: a liquid S-curve sweeps around and under the NEX lettering.
    const wave=Math.sin(u*Math.PI*2.15-phase*.72),curl=Math.cos(u*Math.PI*3.1-phase);
    px=x+Math.sin(u*6.283+phase*.35)*.28+v*.12;
    py=wave*(.62+.18*Math.sin(phase))+v*(.22+edge*.32);
    pz=curl*.72+Math.sin(u*12+phase)*.16+v*.22;
   }else if(scene===1){
    // Profile scene: the stream wraps around the profile like a moving orbit.
    const a=u*Math.PI*2+phase*.34;
    px=Math.cos(a)*2.35+v*.24;
    py=Math.sin(a)*1.52+v*.2;
    pz=Math.sin(a*2+phase*.28)*.52+v*.38;
   }else if(scene===2){
    // Benefit scene: liquid opens into a fast fan, then gathers toward the text.
    const fan=(u-.5)*8.1,spread=(.16+u*.92)*(1+.22*Math.sin(phase));
    px=fan+Math.sin(u*17-phase)*.16;
    py=v*spread+Math.sin(u*10-phase*1.3)*.32;
    pz=Math.sin(u*14-phase)*(.38+Math.abs(v)*.38)+v*.26;
   }else if(scene===3){
    // Difference scene: two-sided flow collides at the center and throws a crest upward.
    const dx=(u-.5)*8.1,impact=Math.exp(-Math.pow(dx*.92,2));
    px=dx+Math.sin(phase+v*3)*.12;
    py=v*(.28+impact*1.08)+Math.sin(dx*1.8-phase)*.22+impact*Math.sin(phase*1.8)*.65;
    pz=impact*(.8+Math.cos(phase*1.7+v*4)*.52)+Math.sin(dx*1.25+phase)*.3+v*.22;
   }else{
    // CTA scene: a vertical liquid spiral pulls the viewer into the closing frame.
    const a=u*Math.PI*3.1+phase*.48;
    px=Math.cos(a)*(1.15+v*.35)+Math.sin(phase*.4)*.3;
    py=(u-.5)*5.1+v*.28;
    pz=Math.sin(a)*(1.05+v*.24)+Math.cos(u*8-phase)*.2;
   }
   const entranceKick=transition*Math.sin(u*Math.PI*5+phase*1.8)*.48;
   py+=entranceKick*(scene===4?-.8:1);
   pz+=transition*Math.cos(u*Math.PI*4-phase)*.32;
   // The liquid surface itself adopts a distinct motion signature for each visual direction.
   if(style==="Kinetic Typography"){
    const snap=Math.sin(u*Math.PI*7.5-phase*1.35);
    px+=Math.sin(u*Math.PI*4.2+phase)*.16*edge;
    py+=snap*.19*edge;
    pz+=Math.cos(u*Math.PI*9-phase*1.1)*.22*edge;
   }else if(style==="Editorial / Magazine"){
    py=py*.82+Math.sin(u*Math.PI*1.65+phase*.42)*.13*edge;
    pz*=.68;
    px+=Math.sin(u*Math.PI*2.1-phase*.25)*.075*edge;
   }else if(style==="Futuristic Motion"){
    const pulse=Math.sin(u*Math.PI*11-phase*1.6);
    py+=pulse*.24*edge;
    pz+=Math.cos(u*Math.PI*8+phase*1.25)*.28*edge;
    px+=Math.sin(u*Math.PI*6+phase*.7)*.12*edge;
   }
   if(topic.id==="science"){py+=Math.sin(u*Math.PI*4+phase*.7)*.22*edge;pz+=Math.cos(u*Math.PI*3-phase*.55)*.18*edge}
   else if(topic.id==="technology"){const pulse=Math.sin(u*Math.PI*12-phase*1.45);py+=pulse*.16*edge;pz+=Math.sign(pulse)*.11*edge}
   else if(topic.id==="humor"){const bounce=Math.sin(phase*1.8+u*Math.PI*2);py+=bounce*bounce*.22*edge;pz+=Math.sin(phase*1.25+u*9)*.2*edge}
   else if(topic.id==="creative"){const curl=Math.sin(u*Math.PI*3.2+phase*.8);py+=curl*.18*edge;pz+=Math.cos(u*Math.PI*2+phase)*.24*edge}
   const styleBoost=(style==="Kinetic Typography"?1.18:style==="Editorial / Magazine"?.82:style==="Futuristic Motion"?1.34:1)*(topic.id==="humor"?1.08:topic.id==="science"?.94:1);
   // Portrait framing: the chrome ribbon now crosses the foreground instead of sitting as a narrow backdrop.
   px*=.49;
   const flatY=v*.13;
   py=flatY+(py-flatY)*reveal;
   pz*=reveal;
   px*=.58+.42*reveal;
   attr.setXYZ(i,px,py*intensity*styleBoost,pz*intensity*styleBoost);
  }
  attr.needsUpdate=true;mesh.geometry.computeVertexNormals();
 }
}

function buildNexLogo(){
 if(!threeScene)return;
 if(threeLogo)threeScene.remove(threeLogo);
 threeLogo=new THREE.Group();logoStrokes=[];
 const chrome=new THREE.MeshPhysicalMaterial({color:0xdfe4e8,metalness:1,roughness:.055,clearcoat:1,clearcoatRoughness:.012,envMapIntensity:7.5,emissive:0x171c22,emissiveIntensity:.12});
 const paths=[
  [[-1.72,-.62,0],[-1.72,.68,0]], [[-1.72,.68,0],[-.72,-.62,0]], [[-.72,-.62,0],[-.72,.68,0]],
  [[-.42,-.62,0],[-.42,.68,0]], [[-.42,.68,0],[.38,.68,0]], [[-.42,.03,0],[.28,.03,0]], [[-.42,-.62,0],[.38,-.62,0]],
  [[.62,.68,0],[1.62,-.62,0]], [[.62,-.62,0],[1.62,.68,0]]
 ];
 paths.forEach((points,i)=>{
  const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)),false,"centripetal");
  const geometry=new THREE.TubeGeometry(curve,32,i===0||i===2||i===3||i>=7?.082:.068,12,false);
  const indexCount=geometry.index?geometry.index.count:geometry.attributes.position.count;
  geometry.setDrawRange(0,0);
  const mesh=new THREE.Mesh(geometry,chrome);
  mesh.userData.indexCount=indexCount;
  threeLogo.add(mesh);logoStrokes.push(mesh);
 });
 threeLogo.position.set(0,1.78,.35);
 threeLogo.scale.setScalar(.78);
 threeLogo.visible=false;
 threeScene.add(threeLogo);
}
function updateNexLogo(progress,visible){
 if(!threeLogo)return;
 threeLogo.visible=visible;
 if(!visible)return;
 const reveal=Math.max(0,Math.min(1,progress));
 threeLogo.rotation.y=Math.sin(reveal*Math.PI)*.16;
 threeLogo.rotation.x=-.04+Math.sin(reveal*Math.PI*2)*.025;
 logoStrokes.forEach((mesh,i)=>{
  const local=Math.max(0,Math.min(1,(reveal-i*.045)/.48));
  mesh.geometry.setDrawRange(0,Math.floor(mesh.userData.indexCount*local));
 });
 const pulse=1+.025*Math.sin(reveal*Math.PI*2);
 threeLogo.scale.setScalar(.78*pulse);
}
function renderThree(now,target=threeRenderer){
 if(!threeReady||!target)return;
 if(threeSeed!==state.backgroundSeed)buildThreeObjects();
 const activePalette=paletteMap[state.palette]||paletteMap["Electric Blue"];
 threeScene.background=new THREE.Color(activePalette[0]);
 if(threeScene.userData.rimLight)threeScene.userData.rimLight.color.set(activePalette[2]);
 if(threeScene.userData.fillLight)threeScene.userData.fillLight.color.set(activePalette[3]||activePalette[2]);
 const t=now/1000,local=Math.max(0,Math.min(1,(state.elapsed-sceneStart(state.scene))/state.sceneDurations[state.scene]));
 const motion=getMotionProfile(),topic=getTopicProfile();
 const phase=t*motion.speed+threeGroup.userData.phase+topic.seed%100*.001;
 const main=threeGroup.userData.main;
 const entranceRaw=Math.min(1,local/(motion.entrance==="snap"?.18:motion.entrance==="soft"?.42:.30));
 const entrance=motion.entrance==="snap"?1-Math.pow(1-entranceRaw,5):motion.entrance==="dolly"?1-Math.pow(1-entranceRaw,2):1-Math.pow(1-entranceRaw,3);
 const sceneTilt=[-.12,.22,-.28,.34,-.18][state.scene];
 main.rotation.y=sceneTilt+Math.sin(phase*.31)*(.14*motion.camera+topic.rotation);
 main.rotation.x=[-.08,.18,-.12,.26,-.22][state.scene]+Math.sin(phase*.48)*(.07*motion.camera+topic.twist*.12);
 main.rotation.z=[-.10,.18,.02,-.22,.28][state.scene]+Math.sin(phase*.27)*(.045*motion.camera+topic.rotation*.16);
 main.position.y=[-.72,.18,-.28,.52,-.42][state.scene]*(1-entrance)+Math.sin(phase*.5)*.16;
 main.position.x=[-.48,.24,.42,-.32,.18][state.scene]*(1-entrance)+Math.sin(phase*.35)*.20;
 main.position.z=.34+[.18,.42,.08,.55,.28][state.scene]+Math.sin(phase*.62)*.12;
 const sceneScale=[1.04,1.18,1.12,1.22,1.10][state.scene];
 main.scale.setScalar(sceneScale*(.82+.18*entrance));
 updateFlowSurfaces(threeGroup.userData.flows,phase,motion.flow);
 const cameraMoves=[
  [0,-.08,7.55],
  [Math.sin(phase*.28)*.34,.18,7.15],
  [-.42+Math.sin(phase*.42)*.24,-.12,7.35],
  [Math.sin(phase*.62)*.26,.28,6.85],
  [0,Math.sin(phase*.36)*.24,7.05]
 ];
 const move=[...cameraMoves[state.scene]];
 move[0]+=topic.cameraX*Math.sin(phase*.24+state.scene);
 move[1]+=topic.cameraY*Math.cos(phase*.31+state.scene*.7);
 const cameraLerp=Math.min(.12,.045*motion.camera);
 threeCamera.position.x+=(move[0]-threeCamera.position.x)*cameraLerp;
 threeCamera.position.y+=(move[1]-threeCamera.position.y)*cameraLerp;
 threeCamera.position.z+=(move[2]-threeCamera.position.z)*cameraLerp;
 threeCamera.lookAt(0,0,0);
 const introEnd=2600,outroStart=total-2300;
 let logoVisible=false,logoProgress=0;
 if(state.elapsed<introEnd){logoVisible=true;logoProgress=Math.min(1,state.elapsed/2050)}
 else if(state.elapsed>outroStart){logoVisible=true;logoProgress=Math.min(1,(total-state.elapsed)/2050)}
 if(state.mode==="tavsiya"){
  const outroStart=Math.max(0,total-5200);
  if(state.elapsed<2600){logoVisible=true;logoProgress=Math.min(1,state.elapsed/2050)}
  else if(state.elapsed>=outroStart){logoVisible=true;logoProgress=Math.min(1,(state.elapsed-outroStart)/2400)}
  else logoVisible=false;
  if(threeLogo)threeLogo.position.y=0;
 }
 updateNexLogo(logoProgress,logoVisible);
 target.render(threeScene,threeCamera);
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
 const motion=getMotionProfile();
 const idx=state.scene,t=now/1000*motion.speed,local=Math.max(0,Math.min(1,(state.elapsed-sceneStart(idx))/state.sceneDurations[idx]*motion.wipe));
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

function getToneVisual(){
 const tones={
  "Jiddiy":{weight:35,size:1.0},
  "Ilmiy":{weight:-45,size:.94},
  "Sodda va tushunarli":{weight:-10,size:1.04},
  "Yumor":{weight:75,size:1.08},
  "Tahliliy":{weight:5,size:.96},
  "Motivatsion":{weight:85,size:1.10},
  "Sirli va qiziqarli":{weight:45,size:1.02},
  "Falsafiy":{weight:-65,size:.98}
 };
 return tones[state.tone]||tones["Jiddiy"];
}
function drawTopicMotif(c,w,h,accent,topic,time,index,style){
 c.save();c.strokeStyle=accent;c.fillStyle=accent;c.lineWidth=Math.max(1,w*.0025);c.globalAlpha=.48;
 const x=w*(style==="Editorial / Magazine"?.84:.86);
 const y=h*(style==="Editorial / Magazine"?.235:style==="Futuristic Motion"?.285:.125);
 const r=w*(style==="Editorial / Magazine"?.026:.03);
 if(topic==="Kreativ"){
  c.save();c.translate(x,y);c.rotate(time*.22);c.strokeRect(-r*.72,-r*.72,r*1.44,r*1.44);c.rotate(-time*.44);c.beginPath();c.arc(0,0,r*.9,0,Math.PI*1.55);c.stroke();c.beginPath();c.moveTo(-r*1.35,r*.9);c.lineTo(r*1.25,-r*.95);c.stroke();c.restore();
 }else if(topic==="Yumor"){
  const bounce=Math.abs(Math.sin(time*2.2))*r*.38;c.beginPath();c.arc(x-r*.62,y-bounce,r*.34,0,Math.PI*2);c.arc(x+r*.58,y-r*.22,r*.25,0,Math.PI*2);c.stroke();c.beginPath();c.arc(x,y+r*.55,r*.62,.12,Math.PI-.12);c.stroke();
 }else if(topic==="Ilm-fan"){
  c.beginPath();c.ellipse(x,y,r*1.25,r*.48,time*.24,0,Math.PI*2);c.ellipse(x,y,r*.48,r*1.25,-time*.18,0,Math.PI*2);c.arc(x,y,r*.18,0,Math.PI*2);c.stroke();c.globalAlpha=.9;c.beginPath();c.arc(x+Math.cos(time)*r*1.25,y+Math.sin(time)*r*.48,r*.12,0,Math.PI*2);c.fill();
 }else if(topic==="Texnologiya"){
  c.strokeRect(x-r,y-r,r*2,r*2);c.beginPath();c.moveTo(x-r*1.4,y);c.lineTo(x+r*1.4,y);c.moveTo(x,y-r*1.4);c.lineTo(x,y+r*1.4);c.stroke();
  c.globalAlpha=.8;c.fillRect(x-r,y-r+((time*18)% (r*2)),r*2,w*.003);
 }else if(topic==="Ta’lim va ilm-fan"){
  for(let n=-2;n<=2;n++){c.beginPath();c.moveTo(x-r,y+n*r*.42);c.lineTo(x+r,y+n*r*.42);c.stroke()}
  c.beginPath();c.arc(x,y,r*.22,0,Math.PI*2);c.fill();
 }else if(topic==="Kitob va adabiyot"){
  c.beginPath();c.moveTo(x,y-r);c.quadraticCurveTo(x-r*1.5,y-r*.65,x-r*1.35,y+r);c.quadraticCurveTo(x,y+r*.55,x,y+r);c.quadraticCurveTo(x+r*1.35,y+r*.55,x+r*1.35,y+r);c.quadraticCurveTo(x+r*1.5,y-r*.65,x,y-r);c.stroke();
  c.beginPath();c.moveTo(x,y-r*.8);c.lineTo(x,y+r*.8);c.stroke();
 }else if(topic==="Tarix va madaniyat"){
  c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.arc(x,y,r*.72,0,Math.PI*2);c.stroke();
  c.font="800 "+(w*.018)+"px Georgia";c.textAlign="center";c.fillText("A",x,y+w*.006);
 }else if(topic==="Motivatsiya va fikr"){
  c.beginPath();c.moveTo(x-r,y+r*.6);c.lineTo(x+r*.65,y-r*.65);c.lineTo(x+r*.65,y-r*.05);c.moveTo(x+r*.65,y-r*.65);c.lineTo(x+r*.05,y-r*.65);c.stroke();
 }else if(topic==="Hayotiy kuzatuv"){
  c.beginPath();c.ellipse(x,y,r*1.35,r*.58,time*.08,0,Math.PI*2);c.stroke();c.beginPath();c.arc(x+Math.cos(time*.8)*r,y+Math.sin(time*.8)*r*.42,r*.18,0,Math.PI*2);c.fill();
 }else{
  c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.stroke();c.beginPath();c.moveTo(x-r*.65,y);c.lineTo(x+r*.65,y);c.moveTo(x,y-r*.65);c.lineTo(x,y+r*.65);c.stroke();
 }
 c.restore();
}
function drawMercuryOutro(c,w,h,progress,now){
 const p=Math.max(0,Math.min(1,progress));
 // Suyuq simob pastdan yuqoriga ko‘tarilib butun kadrni yuvadi, so‘ng chekinib logotipni ochadi.
 const cover=Math.min(1,p/.62),fade=p<.62?1:Math.max(0,1-(p-.62)/.38);
 if(fade<=0)return;
 const edge=h*(1.08-cover*1.2);
 c.save();c.globalAlpha=fade;
 c.beginPath();c.moveTo(0,h);c.lineTo(0,edge);
 for(let x=0;x<=w+8;x+=8){
  const wave=Math.sin(x/w* Math.PI*3.2+now*.003)*h*.018+
              Math.sin(x/w*Math.PI*7.1-now*.0021)*h*.009;
  c.lineTo(x,edge+wave);
 }
 c.lineTo(w,h);c.closePath();
 const metal=c.createLinearGradient(0,Math.max(0,edge-h*.18),w,h);
 metal.addColorStop(0,"#343b43");metal.addColorStop(.16,"#e7edf1");
 metal.addColorStop(.29,"#7f8a94");metal.addColorStop(.43,"#fbfdff");
 metal.addColorStop(.58,"#9da8b1");metal.addColorStop(.76,"#f3f6f8");
 metal.addColorStop(1,"#414b55");
 c.fillStyle=metal;c.shadowColor="#dce7f0";c.shadowBlur=w*.055;c.fill();
 c.shadowBlur=0;
 // Simob yuzasidagi uzun metallik akslar va oqim izlari.
 for(let i=0;i<9;i++){
  const y=edge+h*(.045+i*.028),shift=Math.sin(now*.0018+i*1.7)*w*.08;
  c.beginPath();c.moveTo(-w*.1+shift,y);
  c.bezierCurveTo(w*.22+shift,y-h*.025,w*.64+shift,y+h*.025,w*1.1+shift,y-h*.008);
  c.strokeStyle=i%2?"#ffffff99":"#26313b88";c.lineWidth=Math.max(1,w*(i%3===0?.009:.003));c.stroke();
 }
 // Oldingi kadrni simob ostida qoldiradigan qoramtir, oynadek nam chekka.
 c.beginPath();c.moveTo(0,edge-h*.012);
 for(let x=0;x<=w+8;x+=8){const wave=Math.sin(x/w*Math.PI*3.2+now*.003)*h*.018+Math.sin(x/w*Math.PI*7.1-now*.0021)*h*.009;c.lineTo(x,edge+wave-h*.012)}
 c.strokeStyle="#111820cc";c.lineWidth=h*.012;c.stroke();
 c.restore();
}
function drawTopicMotif(c,w,h,now,accent,secondary,topic){
 const t=now/1000,focusShift={visual:.22,discovery:.6,systems:1.1,playful:1.55,general:0}[topic.focus]||0,phase=((topic.seed||1)%997)/997*Math.PI*2+focusShift;
 c.save();c.lineCap="round";c.lineJoin="round";c.globalAlpha=.34;
 if(topic.id==="creative"){
  c.translate(w*.5,h*.46);c.rotate(Math.sin(t*.18+phase)*.045);
  for(let i=0;i<5;i++){const q=i*.21+phase*.08;c.beginPath();c.moveTo(-w*.62,h*(q-.16));c.bezierCurveTo(-w*.18,-h*(.22+q),w*(.16+Math.sin(t*.3+i)*.08),h*(.28-q),w*.62,h*(q-.12));c.strokeStyle=i%2?secondary:accent;c.lineWidth=Math.max(1,w*(.002+i*.00045));c.stroke()}
  c.globalAlpha=.52;c.strokeStyle=secondary;c.lineWidth=w*.003;
  for(let i=0;i<4;i++){const x=(i%2?1:-1)*w*(.31+i*.035),y=(i<2?-1:1)*h*(.22+i*.018);c.beginPath();c.arc(x,y,w*.025,0,Math.PI*1.5);c.stroke()}
 }else if(topic.id==="science"){
  const cx=w*(.5+Math.sin(t*.16+phase)*.035),cy=h*.43;c.translate(cx,cy);c.rotate(t*.12+phase);
  for(let i=0;i<3+(topic.focus==="discovery"?1:0);i++){c.save();c.rotate(i*Math.PI/3);c.beginPath();c.ellipse(0,0,w*(.17+i*.075),h*(.045+i*.018),0,0,Math.PI*2);c.strokeStyle=i%2?secondary:accent;c.lineWidth=w*.0025;c.stroke();c.beginPath();c.arc(w*(.17+i*.075),0,w*.009,0,Math.PI*2);c.fillStyle=i%2?accent:secondary;c.fill();c.restore()}
  c.beginPath();c.arc(0,0,w*.018,0,Math.PI*2);c.fillStyle=accent;c.fill();
  for(let i=0;i<18;i++){const a=i/18*Math.PI*2+phase,r=w*(.28+(i%3)*.035);c.globalAlpha=.18;c.beginPath();c.arc(Math.cos(a)*r,Math.sin(a)*r*.65,w*.003,0,Math.PI*2);c.fillStyle=i%2?accent:secondary;c.fill()}
 }else if(topic.id==="technology"){
  c.strokeStyle=accent;c.lineWidth=w*.003;
  for(let side=0;side<2;side++)for(let i=0;i<6;i++){const y=h*(.18+i*.105),x=side?w*.96:w*.04,dir=side?-1:1,reach=w*(.12+(i%3)*.045),pulse=(t*34+i*17+phase*20)%(w*.1);c.globalAlpha=.18+(i%2)*.12;c.beginPath();c.moveTo(x,y);c.lineTo(x-dir*reach,y);c.lineTo(x-dir*reach,y+h*.035);c.stroke();c.beginPath();c.arc(x-dir*reach,y+h*.035,w*.006,0,Math.PI*2);c.fillStyle=secondary;c.fill();c.fillRect(x-dir*(pulse+reach*.2),y-w*.003,w*.012,w*.006)}
  c.globalAlpha=.13;c.fillStyle=secondary;c.fillRect(0,h*(.24+(Math.sin(t*1.3+phase)*.5+.5)*.5),w,h*.002);
 }else{
  const bounce=Math.abs(Math.sin(t*2.2+phase)),squash=1-bounce*.16,yy=h*(.42-bounce*.045);
  [[-.28,.02,.105],[.27,-.07,.075],[.02,.22,.055]].forEach(([dx,dy,r],i)=>{c.save();c.translate(w*(.5+dx),yy+h*dy);c.scale(1/squash,squash);c.beginPath();c.arc(0,0,w*r,0,Math.PI*2);c.fillStyle=i%2?secondary:accent;c.globalAlpha=.12;c.fill();c.strokeStyle=i%2?secondary:accent;c.globalAlpha=.42;c.lineWidth=w*.003;c.stroke();c.restore()});
  c.strokeStyle=secondary;c.globalAlpha=.38;c.lineWidth=w*.004;c.beginPath();c.moveTo(w*.16,h*.64);c.quadraticCurveTo(w*(.5+Math.sin(t*1.7+phase)*.08),h*(.7-bounce*.06),w*.84,h*.62);c.stroke();
 }
 c.restore();
}
function drawRecommendationScene(c,w,h,now,pal){
 const a=state.account,idx=state.scene,style=state.style,motion=getMotionProfile(),topic=getTopicProfile(),narrative=getNarrativeProfile();
 const rawLocal=Math.max(0,Math.min(1,(state.elapsed-sceneStart(idx))/state.sceneDurations[idx]));
 const local=Math.max(0,Math.min(1,rawLocal*motion.wipe));
 const t=now/1000*motion.speed;
 const convert=s=>String(s||"").replace(/(sh|ch|o[ʻʼ‘’']|g[ʻʼ‘’'])/gi,m=>{const l=m.toLowerCase(),v=l.startsWith("sh")?"ş":l.startsWith("ch")?"ç":l[0]==="o"?"ö":"ğ";return m[0]===m[0].toUpperCase()?v.toUpperCase():v});
 const name=convert(a.name||"Akkaunt nomi"),niche=convert(a.niche),bio=convert(a.bio),benefit=convert(a.benefit),audience=convert(a.audience),proof=convert(a.proof),followers=convert(a.followers);
 const details=[
  {lead:convert(state.script[0]),body:"",extra:""},
  {lead:name,body:[bio,benefit].filter(Boolean).join(" "),extra:[niche,audience,proof,followers].filter(Boolean).join("  ·  ")},
  {lead:convert(state.script[2]),body:"",extra:""},
  {lead:convert(state.script[3]),body:"",extra:""},
  {lead:convert(state.script[4]),body:"",extra:""}
 ][idx];
 const bg=pal[0],fg=pal[1],accent=pal[2],sub=pal[3]||accent;
 c.save();
 const backdrop=c.createLinearGradient(0,0,w,h);backdrop.addColorStop(0,bg+"38");backdrop.addColorStop(.55,"#05080f66");backdrop.addColorStop(1,bg+"22");c.fillStyle=backdrop;c.fillRect(0,0,w,h);
 const glow=c.createRadialGradient(w*(.5+Math.sin(t*.22)*.12),h*.39,0,w*.5,h*.48,h*.76);glow.addColorStop(0,accent+"38");glow.addColorStop(.52,sub+"18");glow.addColorStop(1,bg+"00");c.fillStyle=glow;c.fillRect(0,0,w,h);
 drawTopicMotif(c,w,h,now,accent,sub,topic);
 if(style==="Kinetic Typography"){
  c.save();c.globalAlpha=.11;c.fillStyle=accent;c.font="950 "+(w*.78)+"px system-ui";c.textAlign="center";c.textBaseline="middle";c.fillText(String(idx+1).padStart(2,"0"),w*.5,h*.47);c.restore();
  for(let n=0;n<6;n++){const yy=h*(.12+n*.13),shift=((t*90+n*137)%(w*1.5))-w*.25;c.fillStyle=accent;c.globalAlpha=.13;c.fillRect(shift,yy,w*.22,h*.006)}
 }
 if(style==="Futuristic Motion"){
  c.save();c.strokeStyle=accent+"38";c.lineWidth=1;
  for(let x=0;x<w;x+=w*.08){c.beginPath();c.moveTo(x,0);c.lineTo(x,h);c.stroke()}
  for(let y=0;y<h;y+=h*.055){c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke()}c.restore();
 }
 const outroStart=Math.max(0,total-5200),cardVisible=state.elapsed>=2600&&state.elapsed<outroStart;
 if(cardVisible){
  const enter=1-Math.pow(1-Math.max(0,Math.min(1,local/.38)),3);
  const x=w*.075,y=h*.205,cw=w*.85,ch=h*.59,r=w*.045;
  const editorial=style==="Editorial / Magazine",ink=editorial?bg:"#f4f7fa",paper=editorial?"#f2eee5":"#101923";
  c.save();c.globalAlpha=.97*enter;c.translate(0,(1-enter)*h*.035);
  c.shadowColor="#000000aa";c.shadowBlur=w*.065;c.shadowOffsetY=h*.018;
  const card=c.createLinearGradient(x,y,x+cw,y+ch);
  if(editorial){card.addColorStop(0,"#fffdf7");card.addColorStop(1,"#ded8cb")}
  else if(style==="Cinematic 3D"){card.addColorStop(0,"#26313c");card.addColorStop(.48,"#111b26");card.addColorStop(1,"#080e17")}
  else if(style==="Kinetic Typography"){card.addColorStop(0,"#101722");card.addColorStop(1,"#05090f")}
  else{card.addColorStop(0,"#0b1a2b");card.addColorStop(1,"#07111e")}
  rounded(c,x,y,cw,ch,r);c.fillStyle=card;c.fill();c.shadowBlur=0;c.shadowOffsetY=0;
  c.strokeStyle=editorial?"#343d45aa":accent+"cc";c.lineWidth=Math.max(1,w*(style==="Futuristic Motion"?.003:.004));rounded(c,x+2,y+2,cw-4,ch-4,r*.88);c.stroke();
  if(style==="Futuristic Motion"){
   c.save();c.strokeStyle=accent;c.lineWidth=w*.006;const q=w*.055;
   [[x,y,1,1],[x+cw,y,-1,1],[x,y+ch,1,-1],[x+cw,y+ch,-1,-1]].forEach(([px,py,sx,sy])=>{c.beginPath();c.moveTo(px,py+sy*q);c.lineTo(px,py);c.lineTo(px+sx*q,py);c.stroke()});c.restore();
  }
  if(style==="Kinetic Typography"){c.fillStyle=accent;c.fillRect(x,y,w*.025,ch);c.fillStyle=sub;c.fillRect(x+w*.04,y+ch-w*.018,cw*.92,w*.006)}
  const pad=cw*.085,tx=x+pad,inner=cw-pad*2;
  let contentTop=y+h*.115;
  if(idx===1){
   const av=w*.18,ax=tx,ay=y+h*.055;
   c.save();c.beginPath();c.arc(ax+av/2,ay+av/2,av/2,0,Math.PI*2);c.clip();
   if(accountPhoto&&accountPhoto.complete&&accountPhoto.naturalWidth)c.drawImage(accountPhoto,ax,ay,av,av);
   else{const g=c.createLinearGradient(ax,ay,ax+av,ay+av);g.addColorStop(0,accent);g.addColorStop(1,bg);c.fillStyle=g;c.fillRect(ax,ay,av,av);c.fillStyle=editorial?ink:"#fff";c.font="900 "+(av*.44)+"px system-ui";c.textAlign="center";c.textBaseline="middle";c.fillText((name.trim()[0]||"N").toUpperCase(),ax+av/2,ay+av/2)}
   c.restore();c.strokeStyle=editorial?ink:accent;c.lineWidth=w*.006;c.beginPath();c.arc(ax+av/2,ay+av/2,av/2,0,Math.PI*2);c.stroke();
   const right=ax+av+w*.045;c.fillStyle=ink;c.textAlign="left";c.textBaseline="top";c.font=(style==="Kinetic Typography"?"950 ":"850 ")+(w*.052)+"px "+(editorial?"Georgia,serif":"system-ui");c.fillText(name.slice(0,30),right,ay+av*.12,inner-av-w*.045);
   c.fillStyle=editorial?"#59616a":"#c0ccd5";c.font="650 "+(w*.03)+"px system-ui";c.fillText(niche.slice(0,40),right,ay+av*.56,inner-av-w*.045);
   contentTop=ay+av+w*.15;
   c.strokeStyle=editorial?"#777":"#ffffff44";c.lineWidth=1;c.beginPath();c.moveTo(tx,contentTop-w*.035);c.lineTo(tx+inner,contentTop-w*.035);c.stroke();
  }
  const textValue=details.lead||"",body=details.body||"",extra=details.extra||"";
  const family=editorial?"Georgia,serif":style==="Futuristic Motion"?"ui-monospace,monospace":narrative.font;
  const maxY=y+ch-w*.105;
  const available=Math.max(w*.12,maxY-contentTop);
  const wrap=(value,font,maxWidth)=>{c.font=font;const lines=[];let line="";for(const word of String(value||"").trim().split(/\s+/).filter(Boolean)){const test=line?line+" "+word:word;if(line&&c.measureText(test).width>maxWidth){lines.push(line);line=word}else line=test}if(line)lines.push(line);return lines};
  const blocks=[{value:textValue,weight:style==="Kinetic Typography"?"950":narrative.weight,size:w*(idx===1?.05:style==="Kinetic Typography"?.073:.061)*narrative.scale,color:ink},{value:body,weight:"550",size:w*.036*narrative.scale,color:editorial?"#4b5055":"#c6d0d8"},{value:extra,weight:"700",size:w*.031*narrative.scale,color:editorial?bg:sub}].filter(b=>b.value);
  let linesByBlock,totalHeight=0;
  for(let attempt=0;attempt<12;attempt++){
   linesByBlock=[];totalHeight=0;
   for(const b of blocks){const fs=b.size*Math.pow(.91,attempt),lines=wrap(b.value,b.weight+" "+fs+"px "+family,inner);const lh=fs*(editorial?1.3:narrative.line);linesByBlock.push({lines,fs,lh,b});totalHeight+=lines.length*lh+w*.018}
   if(totalHeight<=available)break;
  }
  let cy=contentTop+(available-totalHeight)*.35;
  for(const block of linesByBlock){c.font=block.b.weight+" "+block.fs+"px "+family;c.fillStyle=block.b.color;c.textAlign="left";c.textBaseline="top";for(const line of block.lines){c.fillText(line,tx,cy,inner);cy+=block.lh}cy+=w*.018}
  if(style==="Cinematic 3D"){c.save();c.globalAlpha=.6;c.strokeStyle=sub;c.lineWidth=w*.002;c.beginPath();c.moveTo(tx,y+ch-w*.075);c.lineTo(tx+inner,y+ch-w*.075);c.stroke();c.restore()}
  c.restore();
 }
 if(state.elapsed>=outroStart)drawMercuryOutro(c,w,h,(state.elapsed-outroStart)/5200,now);
 c.restore();
}
function drawScene(c,w,h,now){
 c.clearRect(0,0,w,h);
 const pal=paletteMap[state.palette]||paletteMap["Electric Blue"];
 if(state.mode==="tavsiya"){drawRecommendationScene(c,w,h,now,pal);return;}
 if(drawCreativeDirectionScene(c,w,h,now,pal))return;
 const bg=pal[0],fg=pal[1],ac=pal[2],idx=state.scene;
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
if(state.mode==="tavsiya")return;
if(threeReady)return;
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
function start(){if(total>60000){alert("Reels 60 soniyadan oshib ketdi. Kartochka matnlarini qisqartiring.");return}cancelAnimationFrame(state.raf);state.elapsed=0;state.started=performance.now();state.playing=true;state.raf=requestAnimationFrame(frame);$("startPreview").textContent="Ⅱ Pauza"}
$("startPreview").onclick=()=>{if(!state.playing&&total>60000){alert("Reels 60 soniyadan oshib ketdi. Matnni qisqartiring.");return}if(state.playing){state.playing=false;$("startPreview").textContent="▶ Davom etish"}else{state.started=performance.now()-state.elapsed;state.playing=true;$("startPreview").textContent="Ⅱ Pauza"}};
$("restart").onclick=()=>start();
const shuffleButton=$("shuffleBackground");
function createNewCreativeVariant(){
 const button=shuffleButton;
 if(!button)return;
 state.variantIndex=(state.variantIndex+1)%6;
 state.backgroundSeed=(state.backgroundSeed+Math.floor(Math.random()*0x7fffffff)+1)>>>0;
 state.lastScene=-1;
 button.textContent="✓ "+(state.variantIndex+1)+"/6 — yangi kompozitsiya";
 button.classList.remove("shuffle-flash");void button.offsetWidth;button.classList.add("shuffle-flash");
 if(threeReady){
  try{threeSeed=-1;buildThreeObjects();renderThree(performance.now());}
  catch(error){console.error("NEX 3D variant rebuild:",error);button.textContent="3D yangilanishida xatolik";}
 }else{
  button.textContent="✓ Variant "+(state.variantIndex+1)+" tanlandi — 3D yuklanmoqda";
 }
 try{draw()}catch(error){console.error("NEX redraw:",error)}
 if(button._shuffleTimer)clearTimeout(button._shuffleTimer);
 button._shuffleTimer=setTimeout(()=>{button.classList.remove("shuffle-flash");button.textContent="✧ Yangi kreativ variant";},2200);
}
if(shuffleButton){shuffleButton.onclick=createNewCreativeVariant;}
$("recordMode").onclick=()=>{if(total>60000){alert("Reels 60 soniyadan oshib ketdi. Matnni qisqartiring.");return}state.recording=true;$("recordOverlay").hidden=false;state.started=performance.now()-state.elapsed;state.playing=true;draw()};
$("recordPause").onclick=()=>{state.playing=!state.playing;if(state.playing)state.started=performance.now()-state.elapsed;$("recordPause").textContent=state.playing?"Ⅱ":"▶"};
$("recordExit").onclick=()=>{state.recording=false;$("recordOverlay").hidden=true;state.playing=false;$("startPreview").textContent="▶ Davom etish";draw()};
$("finish").onclick=()=>{state.playing=false;state.recording=false;$("recordOverlay").hidden=true;page("home")};
window.addEventListener("resize",draw);
initThreeEngine();
})();