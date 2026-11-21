import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const $ = id => document.getElementById(id);
const state = {
  category:"", name:"", seed:1, tone:"Jiddiy", visual:"cinematic",
  palette:"silver", motion:"Silliq", renderer:null, scene:null,
  camera:null, group:null, clock:new THREE.Clock(), raf:0,
  sceneIndex:0, sceneDurations:[5000,5000,5000,5000,5000], playing:false,
  playbackStarted:0, playbackRaf:0, sceneTexts:["","","","",""],
  sceneEdited:[false,false,false,false,false], studioOpened:false
};
const categoryNames={sayt:"SAYT",youtube:"YOUTUBE",telegram:"TELEGRAM",kitob:"KITOB"};
const categoryHints={
  sayt:"Sayt nomi, veb-platforma yo‘nalishi va foydalanuvchiga beradigan imkoniyatlarini yozing.",
  youtube:"YouTube kanal yoki video nomi, muallifi va undagi foydali materiallarni yozing.",
  telegram:"Telegram kanal, guruh yoki bot nomi, yurituvchisi va foydali imkoniyatlarini yozing.",
  kitob:"Kitob nomi, muallifi, mavzusi va o‘quvchiga beradigan bilimini yozing."
};
const palettes={
  silver:{bg:0x080e18,accent:0x8ed8ff},
  blue:{bg:0x06142c,accent:0x168cff},
  violet:{bg:0x160e30,accent:0x9876ff},
  emerald:{bg:0x061e20,accent:0x00d5b2},
  solar:{bg:0x211706,accent:0xffb52e}
};
const read=id=>$(id)?.value?.trim()||"";
function hash(text){let h=2166136261;for(const ch of text)h=Math.imul(h^ch.charCodeAt(0),16777619);return h>>>0;}
function showStep(number){
  document.querySelectorAll(".wizard-page").forEach(page=>page.classList.toggle("active",page.id==="step-"+number));
  document.querySelectorAll("[data-progress]").forEach(item=>{
    const n=Number(item.dataset.progress);
    item.classList.toggle("current",n===number);
    item.classList.toggle("done",n<number);
  });
  const fill=$("progressFill");if(fill)fill.style.width=((number-1)/6*100)+"%";
  const labels=["01 — MANBA","02 — SSENARIY","03 — BAYON USLUBI","04 — VIZUAL TIL","05 — RANG PALETRASI","06 — ANIMATSIYA","07 — REELS STUDIYASI"];
  $("stepLabel").textContent=labels[number-1];
  window.scrollTo({top:0,behavior:"smooth"});
  if(number===7){updatePreview();requestAnimationFrame(resize);}
}
function setStatus(id,message){const el=$(id);if(el)el.textContent=message;}
function choose(groupId,key){
  const group=$(groupId);if(!group)return;
  group.querySelectorAll("[data-value]").forEach(button=>button.classList.toggle("selected",button.dataset.value===key));
}
function selectCategory(category){
  state.category=category;
  document.querySelectorAll(".category").forEach(button=>button.classList.toggle("selected",button.dataset.category===category));
  $("sourceFields").hidden=false;
  $("sourceHint").textContent=categoryHints[category]||"Manba haqida ma’lumot kiriting.";
  state.seed=hash(category+"|"+read("sourceName"));
  if(state.renderer)rebuildScene();
}
document.querySelectorAll(".category").forEach(button=>button.addEventListener("click",()=>selectCategory(button.dataset.category)));

$("sourceName").addEventListener("input",()=>{
  state.name=read("sourceName");
  state.seed=hash(state.category+"|"+state.name);
  if(state.renderer)rebuildScene();
  updatePreview();
});
["sourceDirection","sourceDescription","sourceBenefit","sourceAudience","sourceProof","sourceAuthor","sourceLink","hook","reason","benefit","cta"].forEach(id=>{
  $(id)?.addEventListener("input",updatePreview);
});
$("nextSource").addEventListener("click",()=>{
  const required=[["sourceName","manba nomi"],["sourceDirection","manba yo‘nalishi"],["sourceDescription","manba tavsifi"],["sourceBenefit","asosiy foyda"]];
  const missing=required.filter(([id])=>!read(id)).map(([,label])=>label);
  if(!state.category)missing.unshift("manba turi");
  if(missing.length){setStatus("sourceStatus","Iltimos, quyidagilarni to‘ldiring: "+missing.join(", ")+".");return;}
  setStatus("sourceStatus","Ma’lumotlar qabul qilindi.");
  showStep(2);
});
$("nextScript").addEventListener("click",()=>{
  const required=[["hook","Hook"],["reason","Sabab"],["benefit","Ustunlik"],["cta","Chorlov"]];
  const missing=required.filter(([id])=>!read(id)).map(([,label])=>label);
  if(missing.length){setStatus("scriptStatus","Iltimos, to‘ldiring: "+missing.join(", ")+".");return;}
  setStatus("scriptStatus","");
  showStep(3);
});
document.querySelectorAll("[data-prev]").forEach(button=>button.addEventListener("click",()=>showStep(Number(button.dataset.prev))));
document.querySelectorAll("[data-next]").forEach(button=>button.addEventListener("click",()=>{
  const n=Number(button.dataset.next);showStep(n);
}));
$("toneOptions").querySelectorAll("[data-value]").forEach(button=>button.addEventListener("click",()=>{
  state.tone=button.dataset.value;choose("toneOptions",state.tone);
}));
$("visualOptions").querySelectorAll("[data-value]").forEach(button=>button.addEventListener("click",()=>{
  state.visual=button.dataset.value;choose("visualOptions",state.visual);
  if(state.renderer)rebuildScene();
}));
$("paletteOptions").querySelectorAll("[data-value]").forEach(button=>button.addEventListener("click",()=>{
  state.palette=button.dataset.value;choose("paletteOptions",state.palette);
  state.seed=hash(state.category+"|"+state.name+"|"+state.palette);
  if(state.renderer)rebuildScene();
}));
$("motionOptions").querySelectorAll("[data-value]").forEach(button=>button.addEventListener("click",()=>{
  state.motion=button.dataset.value;choose("motionOptions",state.motion);
}));
function setupWebGL(){
  if(state.renderer)return true;
  const canvas=$("webgl");
  try{
    state.renderer=new THREE.WebGLRenderer({canvas,alpha:false,antialias:true,powerPreference:"high-performance"});
    state.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.7));
    state.renderer.outputColorSpace=THREE.SRGBColorSpace;
    state.renderer.toneMapping=THREE.ACESFilmicToneMapping;
    state.scene=new THREE.Scene();
    state.camera=new THREE.PerspectiveCamera(38,9/16,.1,100);
    state.camera.position.set(0,0,8);
    state.scene.add(new THREE.HemisphereLight(0xeaf5ff,0x142238,2.2));
    const key=new THREE.DirectionalLight(0xffffff,4.5);key.position.set(-3,5,6);state.scene.add(key);
    const rim=new THREE.PointLight(0x72caff,85,18);rim.position.set(3,1,4);state.scene.add(rim);
    rebuildScene();resize();animate();
    window.addEventListener("resize",resize);
    return true;
  }catch(error){
    setStatus("studioStatus","3D sahna ishga tushmadi: "+error.message);
    return false;
  }
}
function resize(){
  if(!state.renderer)return;
  const canvas=$("webgl"),box=canvas.getBoundingClientRect();
  const w=Math.max(1,Math.round(box.width*Math.min(window.devicePixelRatio||1,1.7)));
  const h=Math.max(1,Math.round(box.height*Math.min(window.devicePixelRatio||1,1.7)));
  state.renderer.setSize(w,h,false);
  state.camera.aspect=w/h;state.camera.updateProjectionMatrix();
}
function disposeGroup(){
  if(!state.group)return;
  state.scene.remove(state.group);
  state.group.traverse(o=>{
    if(o.geometry)o.geometry.dispose();
    if(o.material){if(Array.isArray(o.material))o.material.forEach(m=>m.dispose());else o.material.dispose();}
  });
}
function rebuildScene(){
  if(!state.scene)return;
  disposeGroup();
  state.group=new THREE.Group();state.scene.add(state.group);
  const palette=palettes[state.palette]||palettes.silver;
  state.scene.background=new THREE.Color(palette.bg);
  let seed=state.seed||1;
  const rand=()=>{seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;return(seed>>>0)/4294967296;};
  const metal=new THREE.MeshPhysicalMaterial({color:0xcbd5df,metalness:.96,roughness:.17,clearcoat:1,clearcoatRoughness:.06});
  const glow=new THREE.MeshStandardMaterial({color:palette.accent,emissive:palette.accent,emissiveIntensity:1.1,metalness:.45,roughness:.3});
  if(state.category==="kitob"){
    for(let i=0;i<5;i++){const page=new THREE.Mesh(new THREE.BoxGeometry(2.4,.055,1.55),i===4?glow:metal);page.position.set((i-2)*.045,(i-2)*.075,0);page.rotation.z=-.16;page.rotation.y=-.16;state.group.add(page);}
    const cover=new THREE.Mesh(new THREE.BoxGeometry(2.5,.12,1.62),metal);cover.position.set(-.08,-.23,.08);cover.rotation.z=-.16;cover.rotation.y=-.16;state.group.add(cover);
  }else if(state.category==="youtube"){
    const ring=new THREE.Mesh(new THREE.TorusGeometry(1.22,.16,20,100),metal);state.group.add(ring);
    const play=new THREE.Mesh(new THREE.ConeGeometry(.72,1.05,3),glow);play.rotation.z=-Math.PI/2;play.position.z=.22;state.group.add(play);
    const orbit=new THREE.Mesh(new THREE.TorusGeometry(1.75,.018,8,100),glow);orbit.rotation.set(.9,.2,.4);state.group.add(orbit);
  }else if(state.category==="telegram"){
    const sphere=new THREE.Mesh(new THREE.IcosahedronGeometry(1.28,2),metal);sphere.scale.set(1.05,.78,.42);sphere.rotation.z=-.24;state.group.add(sphere);
    const signal=new THREE.Mesh(new THREE.TorusGeometry(1.75,.025,8,120),glow);signal.rotation.set(.45,.2,.3);state.group.add(signal);
    for(let i=0;i<3;i++){const dot=new THREE.Mesh(new THREE.SphereGeometry(.07,16,12),glow);dot.position.set((rand()-.5)*3,(rand()-.5)*3,.4);state.group.add(dot);}
  }else{
    const globe=new THREE.Mesh(new THREE.TorusKnotGeometry(1.05,.23,160,18,2,5),metal);globe.rotation.set(.4,.2,0);state.group.add(globe);
    for(let i=0;i<3;i++){const orb=new THREE.Mesh(new THREE.SphereGeometry(.09,18,12),glow);const a=rand()*Math.PI*2;orb.position.set(Math.cos(a)*2,Math.sin(a)*2,(rand()-.5)*1.2);state.group.add(orb);}
  }
  if(state.visual==="kinetic"){
    for(let i=0;i<5;i++){const bar=new THREE.Mesh(new THREE.BoxGeometry(.12,1.1+rand()*1.5,.12),glow);bar.position.set(-2+i,((i%2)-.5)*1.2,-.5);bar.rotation.z=(rand()-.5)*.28;state.group.add(bar);}
  }else if(state.visual==="editorial"){
    for(let i=0;i<4;i++){const panel=new THREE.Mesh(new THREE.BoxGeometry(2.9,.035,1.8),i===0?glow:metal);panel.position.set(0,1.7-i*1.05,-.8-i*.08);panel.rotation.z=-.08;state.group.add(panel);}
  }else if(state.visual==="future"){
    for(let i=0;i<3;i++){const ring=new THREE.Mesh(new THREE.TorusGeometry(1.65+i*.32,.018,8,120),glow);ring.rotation.set(.4+i*.35,.2,.15*i);state.group.add(ring);}
    for(let i=0;i<8;i++){const ray=new THREE.Mesh(new THREE.BoxGeometry(.025,3.8,.025),glow);ray.rotation.z=i*Math.PI/4;ray.position.z=-.5;state.group.add(ray);}
  }
  for(let i=0;i<34;i++){const dot=new THREE.Mesh(new THREE.SphereGeometry(.018+rand()*.028,8,8),glow);dot.position.set((rand()-.5)*6,(rand()-.5)*9,-1-rand()*2);state.group.add(dot);}
}
function animate(){
  state.raf=requestAnimationFrame(animate);
  if(!state.renderer||!state.scene)return;
  const t=state.clock.getElapsedTime();
  if(state.group){
    const motionProfiles={Silliq:{speed:.18,turn:.18,bob:.07},Dinamik:{speed:.58,turn:.42,bob:.18},Kinematik:{speed:.1,turn:.12,bob:.045},Ijodiy:{speed:.36,turn:.55,bob:.2},Aralash:{speed:.28,turn:.3,bob:.12}};
    const profile=motionProfiles[state.motion]||motionProfiles.Silliq;
    state.group.rotation.y=Math.sin(t*profile.speed)*profile.turn;
    state.group.rotation.x=Math.cos(t*profile.speed*.8)*profile.turn*.45;
    state.group.position.y=Math.sin(t*profile.speed*2)*profile.bob;
  }
  state.renderer.render(state.scene,state.camera);
}
const sceneLabels=["HOOK","MANBA","SABAB","FOYDA","YAKUN"];
function readSceneTexts(){
  const source=[
    read("hook"),
    read("sourceName"),
    read("reason")||read("sourceDescription"),
    read("benefit")||read("sourceBenefit"),
    read("cta")
  ];
  source.forEach((value,index)=>{
    if(!state.sceneEdited[index])state.sceneTexts[index]=value;
  });
}
function renderSceneList(){
  const list=$("sceneList");if(!list)return;
  list.innerHTML="";
  sceneLabels.forEach((label,index)=>{
    const button=document.createElement("button");
    button.type="button";button.className="scene-chip"+(index===state.sceneIndex?" active":"");
    button.textContent=String(index+1).padStart(2,"0");button.title=label;
    button.addEventListener("click",()=>{pausePlayback();showScene(index);});
    list.appendChild(button);
  });
}
function showScene(index){
  state.sceneIndex=Math.max(0,Math.min(4,index));
  const text=state.sceneTexts[state.sceneIndex]||"";
  $("sceneText").value=text;
  $("reelCategory").textContent=String(state.sceneIndex+1).padStart(2,"0")+" / "+sceneLabels[state.sceneIndex];
  $("reelHook").textContent=state.sceneIndex===0?text:(state.sceneIndex===1?read("sourceDirection"):"");
  $("reelTitle").textContent=state.sceneIndex===1?read("sourceName"):"";
  $("reelReason").textContent=state.sceneIndex===2?text:"";
  $("reelBenefit").textContent=state.sceneIndex===3?text:"";
  $("reelCta").textContent=state.sceneIndex===4?text:"";
  $("sceneCounter").textContent="SAHNA "+String(state.sceneIndex+1).padStart(2,"0")+" / 05";
  $("sceneDuration").value=String(state.sceneDurations[state.sceneIndex]/1000);
  $("sceneDurationValue").textContent=(state.sceneDurations[state.sceneIndex]/1000).toFixed(1).replace(".",",")+" soniya";
  renderSceneList();refreshDurationSummary();
}
function refreshDurationSummary(){
  const total=state.sceneDurations.reduce((sum,value)=>sum+value,0);
  $("durationSummary").textContent="Jami rolik: "+(total/1000).toFixed(1).replace(".",",")+" soniya · 5 sahna";
}
function pausePlayback(){
  state.playing=false;
  if(state.playbackRaf)cancelAnimationFrame(state.playbackRaf);
  state.playbackRaf=0;
  if($("startPreview"))$("startPreview").textContent="▶ Ko‘rishni boshlash";
}
function playbackFrame(now){
  if(!state.playing)return;
  const elapsed=now-state.playbackStarted;
  const total=state.sceneDurations.reduce((sum,value)=>sum+value,0);
  let cursor=elapsed%total,scene=0;
  while(scene<4&&cursor>=state.sceneDurations[scene]){cursor-=state.sceneDurations[scene];scene++;}
  if(scene!==state.sceneIndex)showScene(scene);
  $("studioProgress").style.width=((elapsed%total)/total*100)+"%";
  state.playbackRaf=requestAnimationFrame(playbackFrame);
}
function startPlayback(){
  if(state.playing){pausePlayback();return;}
  state.playing=true;state.playbackStarted=performance.now();
  $("startPreview").textContent="Ⅱ To‘xtatish";
  state.playbackRaf=requestAnimationFrame(playbackFrame);
}
function updatePreview(){
  readSceneTexts();
  const category=categoryNames[state.category]||"FOYDALI MANBA";
  const summary=$("summary");
  if(summary)summary.innerHTML="<b>"+category+"</b><br>"+escapeHtml(read("sourceName"))+"<br><small>"+escapeHtml(state.tone)+" · "+escapeHtml(state.visual)+" · "+escapeHtml(state.palette)+" · "+escapeHtml(state.motion)+"</small>";
  if(state.studioOpened){
    showScene(state.sceneIndex);
    return;
  }
  $("reelCategory").textContent=category;
  $("reelTitle").textContent=read("sourceName")||"Manba nomi";
  $("reelHook").textContent=read("hook")||read("sourceDirection")||"Manba tanlang va ma’lumot kiriting.";
  $("reelReason").textContent=read("reason")||read("sourceDescription");
  $("reelBenefit").textContent=read("benefit")||read("sourceBenefit");
  $("reelCta").textContent=read("cta")||"Saqlab qo‘ying va foydalanib ko‘ring.";
}
function escapeHtml(value){return value.replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}
$("openStudio").addEventListener("click",()=>{
  readSceneTexts();
  state.studioOpened=true;
  showStep(7);
  updatePreview();
  showScene(0);
  setupWebGL();
});
$("startPreview").addEventListener("click",startPlayback);
$("sceneDuration").addEventListener("input",()=>{
  state.sceneDurations[state.sceneIndex]=Number($("sceneDuration").value)*1000;
  $("sceneDurationValue").textContent=Number($("sceneDuration").value).toFixed(1).replace(".",",")+" soniya";
  refreshDurationSummary();
});
$("sceneText").addEventListener("input",()=>{
  const index=state.sceneIndex,value=$("sceneText").value;
  state.sceneTexts[index]=value;
  state.sceneEdited[index]=true;
  if(index===0)$("reelHook").textContent=value;
  if(index===1)$("reelTitle").textContent=value;
  if(index===2)$("reelReason").textContent=value;
  if(index===3)$("reelBenefit").textContent=value;
  if(index===4)$("reelCta").textContent=value;
});
$("restartScene").addEventListener("click",()=>{
  pausePlayback();
  state.sceneEdited=[false,false,false,false,false];
  readSceneTexts();
  state.seed=hash(state.category+"|"+state.name+"|"+state.palette+"|"+Date.now());
  if(state.renderer)rebuildScene();
  state.clock.start();showScene(0);
});
$("backSettings").addEventListener("click",()=>showStep(6));
updatePreview();
