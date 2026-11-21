let THREE=null;

const $ = id => document.getElementById(id);
const state = {
  category:"", name:"", seed:1, variantIndex:0, tone:"Jiddiy", visual:"cinematic",
  palette:"silver", motion:"Silliq", renderer:null, scene:null,
  camera:null, group:null, fluid:null, recordRenderer:null, raf:0, animationStarted:0,
  sceneIndex:0, sceneVisualFrom:0, sceneVisualStarted:0, sceneDurations:[5000,5000,5000,5000,5000], playing:false,
  playbackStarted:0, playbackElapsed:0, playbackRaf:0, recording:false, recordControlsTimer:0, webglLoading:false, webglFailed:false, sceneTexts:["","","","",""],
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
  if(number===7){updatePreview();requestAnimationFrame(()=>{resize();if(state.renderer&&!state.raf)animate();});}
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
  state.seed=hash(category+"|"+read("sourceName")+"|"+state.palette);
  if(state.renderer)rebuildScene();
}
document.querySelectorAll(".category").forEach(button=>button.addEventListener("click",()=>selectCategory(button.dataset.category)));

$("sourceName").addEventListener("input",()=>{
  state.name=read("sourceName");
  state.seed=hash(state.category+"|"+state.name+"|"+state.palette);
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
  if(read("sourceLink")){try{const url=new URL(read("sourceLink"));if(!["http:","https:"].includes(url.protocol))throw new Error("protocol");}catch{setStatus("sourceStatus","Manba havolasi http:// yoki https:// bilan boshlanishi kerak.");return;}}
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
async function setupWebGL(){
  if(state.renderer&&!state.webglFailed)return true;
  if(state.webglFailed)return false;
  if(state.webglLoading){
    return new Promise(resolve=>{
      const wait=()=>{if(state.renderer)resolve(true);else if(!state.webglLoading)resolve(false);else setTimeout(wait,40);};
      wait();
    });
  }
  state.webglLoading=true;
  const canvas=$("webgl");
  try{
    if(!THREE){
      const modules=await Promise.all([
        import("https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js"),
        import("https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/environments/RoomEnvironment.js").catch(()=>null)
      ]);
      THREE=modules[0];
      state.RoomEnvironment=modules[1]?.RoomEnvironment||null;
    }
    state.renderer=new THREE.WebGLRenderer({canvas,alpha:false,antialias:true,powerPreference:"high-performance"});
    state.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.7));
    state.renderer.outputColorSpace=THREE.SRGBColorSpace;
    state.renderer.toneMapping=THREE.ACESFilmicToneMapping;
    state.renderer.toneMappingExposure=1.55;
    state.scene=new THREE.Scene();
    if(state.RoomEnvironment){
      const pmrem=new THREE.PMREMGenerator(state.renderer);
      const room=new state.RoomEnvironment(state.renderer);
      state.scene.environment=pmrem.fromScene(room,.04).texture;
      room.dispose();pmrem.dispose();
    }
    state.camera=new THREE.PerspectiveCamera(38,9/16,.1,100);
    state.camera.position.set(0,0,8);
    state.scene.add(new THREE.HemisphereLight(0xeaf5ff,0x142238,2.2));
    const key=new THREE.DirectionalLight(0xffffff,4.5);key.position.set(-3,5,6);state.scene.add(key);
    const rim=new THREE.PointLight(0x72caff,85,18);rim.position.set(3,1,4);state.scene.add(rim);
    rebuildScene();resize();state.animationStarted=performance.now();animate();
    window.addEventListener("resize",resize);
    canvas.addEventListener("webglcontextlost",event=>{event.preventDefault();state.webglFailed=true;pausePlayback();setStatus("studioStatus","WebGL konteksti uzildi. Brauzer grafikani tiklayotganida kuting.");});
    canvas.addEventListener("webglcontextrestored",()=>{try{state.webglFailed=false;rebuildScene();resize();setStatus("studioStatus","3D sahna qayta tiklandi.");}catch(error){setStatus("studioStatus","3D sahnani tiklashda xatolik: "+error.message);}});
    document.addEventListener("visibilitychange",()=>{
      if(document.hidden){pausePlayback();if(state.raf)cancelAnimationFrame(state.raf);state.raf=0;}
      else if($("step-7")?.classList.contains("active")&&!state.raf)animate();
    });
    state.webglLoading=false;state.webglFailed=false;
    setStatus("studioStatus","3D sahna tayyor. Ekran yozish uchun alohida rejim mavjud.");
    return true;
  }catch(error){
    state.webglLoading=false;state.webglFailed=true;
    setStatus("studioStatus","3D sahna ishga tushmadi: "+error.message);
    return false;
  }
}
function resize(){
  if(!state.renderer)return;
  const canvas=$("webgl"),box=canvas.getBoundingClientRect();
  const w=Math.max(1,Math.round(box.width));
  const h=Math.max(1,Math.round(box.height));
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
  state.fluid=null;
}
function rebuildScene(){
  if(!state.scene)return;
  disposeGroup();
  state.group=new THREE.Group();state.scene.add(state.group);
  const fluidGeometry=new THREE.PlaneGeometry(5.6,4.4,42,30);
  const paletteForFluid=palettes[state.palette]||palettes.silver;
  const fluidMaterial=new THREE.MeshPhysicalMaterial({color:0x9ba9b7,metalness:.94,roughness:.16,clearcoat:1,clearcoatRoughness:.08,emissive:paletteForFluid.accent,emissiveIntensity:.035,side:THREE.DoubleSide});
  state.fluid=new THREE.Mesh(fluidGeometry,fluidMaterial);
  state.fluid.position.set(0,0,-1.35);
  state.group.add(state.fluid);
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
  if(!state.renderer||!state.scene)return;
  if(document.hidden||!$("step-7")?.classList.contains("active")){state.raf=0;return;}
  state.raf=requestAnimationFrame(animate);
  const now=performance.now(),t=(now-state.animationStarted)/1000;
  if(state.group){
    const motionProfiles={Silliq:{speed:.18,turn:.18,bob:.07,camera:.08},Dinamik:{speed:.58,turn:.42,bob:.18,camera:.22},Kinematik:{speed:.1,turn:.12,bob:.045,camera:.3},Ijodiy:{speed:.36,turn:.55,bob:.2,camera:.18},Aralash:{speed:.28,turn:.3,bob:.12,camera:.15}};
    const toneEnergy={"Jiddiy":.86,"Ilmiy":.76,"Sodda va tushunarli":.96,"Yumor":1.2,"Tahliliy":.84,"Motivatsion":1.12,"Sirli va qiziqarli":.94,"Falsafiy":.72};
    const profile=motionProfiles[state.motion]||motionProfiles.Silliq;
    const energy=toneEnergy[state.tone]||1;
    const stages=[
      {x:0,y:0,z:0,scale:1.08,zoom:.3,tilt:-.08},
      {x:0,y:.05,z:-.1,scale:.92,zoom:0,tilt:.12},
      {x:-.34,y:0,z:0,scale:1,zoom:.1,tilt:-.18},
      {x:.28,y:.12,z:0,scale:1.04,zoom:.18,tilt:.16},
      {x:0,y:-.08,z:.12,scale:1.12,zoom:.42,tilt:0}
    ];
    const to=stages[state.sceneIndex]||stages[0],from=stages[state.sceneVisualFrom]||to;
    const blend=Math.min(1,Math.max(0,(now-state.sceneVisualStarted)/650));
    const ease=blend*blend*(3-2*blend);
    const mix=(a,b)=>a+(b-a)*ease;
    if(state.fluid){
      const positions=state.fluid.geometry.attributes.position;
      const wave=t*profile.speed*energy;
      for(let i=0;i<positions.count;i++){
        const x=positions.getX(i),y=positions.getY(i);
        const z=Math.sin(x*1.65+wave*1.2)*.13+Math.cos(y*1.8-wave*.82)*.095+Math.sin((x+y)*1.1-wave*.55)*.045;
        positions.setZ(i,z);
      }
      positions.needsUpdate=true;
      state.fluid.geometry.computeVertexNormals();
    }
    state.group.rotation.y=Math.sin(t*profile.speed*energy)*profile.turn;
    state.group.rotation.x=Math.cos(t*profile.speed*.8*energy)*profile.turn*.45;
    state.group.rotation.z=mix(from.tilt,to.tilt)+Math.sin(t*profile.speed*1.3)*.035;
    state.group.position.set(mix(from.x,to.x)+Math.sin(t*profile.speed*.7)*profile.bob*.35,mix(from.y,to.y)+Math.sin(t*profile.speed*2)*profile.bob,mix(from.z,to.z));
    const scale=mix(from.scale,to.scale)+Math.sin(t*profile.speed*1.6)*.012;
    state.group.scale.setScalar(scale);
    state.camera.position.x=Math.sin(t*profile.speed*.42)*profile.camera+mix(from.x,to.x)*.12;
    state.camera.position.y=Math.cos(t*profile.speed*.36)*profile.camera*.42+mix(from.y,to.y)*.1;
    state.camera.position.z=8-mix(from.zoom,to.zoom);
    state.camera.lookAt(0,0,0);
  }
  state.renderer.render(state.scene,state.camera);
  if(state.recording&&state.recordRenderer)state.recordRenderer.render(state.scene,state.camera);
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
    button.addEventListener("click",()=>{pausePlayback();state.playbackElapsed=state.sceneDurations.slice(0,index).reduce((sum,value)=>sum+value,0);showScene(index);$("studioProgress").style.width=(state.playbackElapsed/state.sceneDurations.reduce((sum,value)=>sum+value,0)*100)+"%";updateSceneTime();});
    list.appendChild(button);
  });
}
function showScene(index){
  const nextIndex=Math.max(0,Math.min(4,index));
  if(nextIndex!==state.sceneIndex){state.sceneVisualFrom=state.sceneIndex;state.sceneVisualStarted=performance.now();}
  state.sceneIndex=nextIndex;
  const text=state.sceneTexts[state.sceneIndex]||"";
  $("sceneText").value=text;
  $("reelCategory").textContent=String(state.sceneIndex+1).padStart(2,"0")+" / "+sceneLabels[state.sceneIndex];
  $("reelHook").textContent=state.sceneIndex===0?text:(state.sceneIndex===1?read("sourceDirection"):"");
  $("reelTitle").textContent=state.sceneIndex===1?text:"";
  $("reelReason").textContent=state.sceneIndex===1&&read("sourceAuthor")?"Muallif: "+read("sourceAuthor"):(state.sceneIndex===2?text:"");
  $("reelBenefit").textContent=state.sceneIndex===3?text:"";
  $("reelCta").textContent=state.sceneIndex===4?text:"";
  syncRecordText();
  $("sceneCounter").textContent="SAHNA "+String(state.sceneIndex+1).padStart(2,"0")+" / 05";
  $("sceneDuration").value=String(state.sceneDurations[state.sceneIndex]/1000);
  $("sceneDurationValue").textContent=(state.sceneDurations[state.sceneIndex]/1000).toFixed(1).replace(".",",")+" soniya";
  renderSceneList();refreshDurationSummary();
}
function refreshDurationSummary(){
  const total=state.sceneDurations.reduce((sum,value)=>sum+value,0);
  $("durationSummary").textContent="Jami rolik: "+(total/1000).toFixed(1).replace(".",",")+" soniya · 5 sahna";
  if($("recordDuration"))$("recordDuration").textContent=(total/1000).toFixed(1).replace(".",",")+" soniya";
}
function updateSceneTime(){
  const seconds=Math.floor(state.playbackElapsed/1000);
  $("sceneTime").textContent=String(Math.floor(seconds/60)).padStart(2,"0")+":"+String(seconds%60).padStart(2,"0");
}
function pausePlayback(){
  if(state.playing)state.playbackElapsed=Math.min(state.sceneDurations.reduce((sum,value)=>sum+value,0),performance.now()-state.playbackStarted);
  state.playing=false;
  updateSceneTime();
  if(state.playbackRaf)cancelAnimationFrame(state.playbackRaf);
  state.playbackRaf=0;
  if($("startPreview"))$("startPreview").textContent=state.playbackElapsed>=state.sceneDurations.reduce((sum,value)=>sum+value,0)?"↺ Qayta ko‘rish":"▶ Davom etish";
  if(state.recording&&$("recordPause"))$("recordPause").textContent=state.playbackElapsed>=state.sceneDurations.reduce((sum,value)=>sum+value,0)?"↺":"▶";
}
function playbackFrame(now){
  if(!state.playing)return;
  const total=state.sceneDurations.reduce((sum,value)=>sum+value,0);
  state.playbackElapsed=Math.min(total,now-state.playbackStarted);
  if(state.playbackElapsed>=total){
    state.playing=false;state.playbackRaf=0;showScene(4);
    $("studioProgress").style.width="100%";
    updateSceneTime();
    $("startPreview").textContent="↺ Qayta ko‘rish";
    if(state.recording)$("recordPause").textContent="↺";
    return;
  }
  let cursor=state.playbackElapsed,scene=0;
  while(scene<4&&cursor>=state.sceneDurations[scene]){cursor-=state.sceneDurations[scene];scene++;}
  if(scene!==state.sceneIndex)showScene(scene);
  $("studioProgress").style.width=(state.playbackElapsed/total*100)+"%";
  updateSceneTime();
  state.playbackRaf=requestAnimationFrame(playbackFrame);
}
function startPlayback(){
  if(state.playing){pausePlayback();return;}
  const total=state.sceneDurations.reduce((sum,value)=>sum+value,0);
  if(state.playbackElapsed>=total){state.playbackElapsed=0;showScene(0);$("studioProgress").style.width="0%";updateSceneTime();}
  state.playing=true;state.playbackStarted=performance.now()-state.playbackElapsed;
  $("startPreview").textContent="Ⅱ To‘xtatish";
  state.playbackRaf=requestAnimationFrame(playbackFrame);
}
function updatePreview(){
  readSceneTexts();
  const category=categoryNames[state.category]||"FOYDALI MANBA";
  const summary=$("summary");
  if(summary){
    const details=[
      read("sourceDirection"),
      read("sourceAuthor")?"Muallif: "+read("sourceAuthor"):"",
      read("sourceAudience")?"Auditoriya: "+read("sourceAudience"):"",
      read("sourceProof")?"Ishonchlilik: "+read("sourceProof"):"",
      read("sourceLink")?"Havola: "+read("sourceLink"):""
    ].filter(Boolean).map(escapeHtml);
    summary.innerHTML="<b>"+category+"</b><br>"+escapeHtml(read("sourceName"))+
      (details.length?"<br>"+details.join("<br>"):"")+
      "<br><small>"+escapeHtml(state.tone)+" · "+escapeHtml(state.visual)+" · "+escapeHtml(state.palette)+" · "+escapeHtml(state.motion)+"</small>";
  }
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

function setupRecordRenderer(){
  if(state.recordRenderer)return true;
  if(!state.renderer||!state.scene||!state.camera)return false;
  try{
    const canvas=$("recordWebgl");
    state.recordRenderer=new THREE.WebGLRenderer({canvas,alpha:false,antialias:true,powerPreference:"high-performance"});
    state.recordRenderer.setPixelRatio(1);
    state.recordRenderer.setSize(1080,1920,false);
    state.recordRenderer.outputColorSpace=THREE.SRGBColorSpace;
    state.recordRenderer.toneMapping=THREE.ACESFilmicToneMapping;
    state.recordRenderer.toneMappingExposure=1.55;
    canvas.addEventListener("webglcontextlost",event=>{event.preventDefault();pausePlayback();setStatus("studioStatus","Yozuv WebGL konteksti uzildi. Tiklanishini kuting yoki oynani qayta oching.");});
    canvas.addEventListener("webglcontextrestored",()=>{try{state.recordRenderer?.setSize(1080,1920,false);setStatus("studioStatus","Yozuv WebGL qatlami qayta tiklandi.");}catch(error){setStatus("studioStatus","Yozuv qatlamini tiklashda xatolik: "+error.message);}});
    return true;
  }catch(error){
    try{state.recordRenderer?.dispose();}catch{}
    state.recordRenderer=null;
    setStatus("studioStatus","Yuqori aniqlikdagi yozuv sahnasi ishga tushmadi: "+error.message);
    return false;
  }
}
function syncRecordText(){
  const canvas=$("recordText"),ctx=canvas?.getContext("2d");
  if(!ctx)return;
  const value=id=>$(id)?.textContent?.trim()||"";
  const wrap=(text,font,color,y,maxLines=5,lineHeight=94)=>{
    if(!text)return;
    ctx.font=font;ctx.fillStyle=color;ctx.textAlign="center";ctx.textBaseline="middle";
    const words=text.split(/\s+/),lines=[];let line="";
    for(const word of words){
      const test=line?line+" "+word:word;
      if(line&&ctx.measureText(test).width>880){lines.push(line);line=word;}
      else line=test;
    }
    if(line)lines.push(line);
    const shown=lines.slice(0,maxLines);
    if(lines.length>maxLines)shown[maxLines-1]=shown[maxLines-1].replace(/[.,;:]?$/,"")+"…";
    const start=y-(shown.length-1)*lineHeight/2;
    shown.forEach((item,index)=>ctx.fillText(item,540,start+index*lineHeight,900));
  };
  ctx.clearRect(0,0,1080,1920);
  ctx.save();
  ctx.fillStyle="#d9f2ff";ctx.font="800 30px system-ui";ctx.textAlign="center";ctx.textBaseline="middle";
  ctx.fillText(value("reelCategory"),540,142);
  ctx.globalAlpha=.48;ctx.fillRect(390,190,300,3);ctx.globalAlpha=1;
  const scene=state.sceneIndex;
  if(scene===0){
    wrap(value("reelHook"),"800 78px system-ui","#ffffff",930,6,102);
  }else if(scene===1){
    wrap(value("reelHook"),"650 36px system-ui","#b9c8d8",680,3,52);
    wrap(value("reelTitle"),"850 82px system-ui","#ffffff",930,5,100);
    wrap(value("reelReason"),"600 34px system-ui","#b9e8ff",1190,3,48);
  }else if(scene===2){
    wrap(value("reelReason"),"800 72px system-ui","#ffffff",940,6,96);
  }else if(scene===3){
    wrap(value("reelBenefit"),"800 72px system-ui","#ffffff",940,6,96);
  }else{
    wrap(value("reelCta"),"850 78px system-ui","#ffffff",930,6,102);
  }
  ctx.fillStyle="#d7e5f1";ctx.font="700 22px system-ui";ctx.textAlign="left";ctx.fillText("NEX / RESOURCE",78,1800);
  ctx.textAlign="right";ctx.fillText("9:16",1002,1800);
  ctx.restore();
}
function revealRecordControls(){
  const overlay=$("recordOverlay");overlay.classList.add("controls-visible");
  clearTimeout(state.recordControlsTimer);
  state.recordControlsTimer=setTimeout(()=>overlay.classList.remove("controls-visible"),1800);
}
async function startRecordMode(){
  if(!state.renderer||state.webglFailed){
    const ready=await setupWebGL();
    if(!ready){setStatus("studioStatus","WebGL ishga tushmadi. Internet yoki brauzer grafik imkoniyatini tekshiring.");return;}
  }
  const recordReady=setupRecordRenderer();
  if(!recordReady)setStatus("studioStatus","Yozuv oynasining 3D qatlami ishga tushmadi; matn qatlami saqlanadi.");
  state.recording=true;$("recordOverlay").hidden=false;
  state.playbackElapsed=0;showScene(0);$("studioProgress").style.width="0%";updateSceneTime();
  state.playing=true;state.playbackStarted=performance.now();
  $("startPreview").textContent="Ⅱ To‘xtatish";$("recordPause").textContent="Ⅱ";
  revealRecordControls();syncRecordText();
  if(!state.playbackRaf)state.playbackRaf=requestAnimationFrame(playbackFrame);
  setStatus("studioStatus",recordReady?"Ekran yozish rejimi faol. Telefoningizning ekran yozish funksiyasini ishga tushiring.":"Ekran yozish oynasi ochildi, lekin 3D yozuv qatlami ishga tushmadi; faqat matn qatlami ko‘rinadi.");
}
function exitRecordMode(){
  clearTimeout(state.recordControlsTimer);
  const overlay=$("recordOverlay");
  if(overlay){overlay.classList.remove("controls-visible");overlay.hidden=true;}
  state.recording=false;pausePlayback();
  if($("recordPause"))$("recordPause").textContent="Ⅱ";
}
$("recordMode").addEventListener("click",startRecordMode);
$("recordPause").addEventListener("click",()=>{
  if(state.playing){pausePlayback();$("recordPause").textContent="▶";}
  else{
    const total=state.sceneDurations.reduce((sum,value)=>sum+value,0);
    if(state.playbackElapsed>=total){state.playbackElapsed=0;showScene(0);}
    state.playing=true;state.playbackStarted=performance.now()-state.playbackElapsed;
    $("recordPause").textContent="Ⅱ";
    if(!state.playbackRaf)state.playbackRaf=requestAnimationFrame(playbackFrame);
  }
  revealRecordControls();
});
$("recordExit").addEventListener("click",exitRecordMode);
$("recordOverlay").addEventListener("click",event=>{if(!event.target.closest(".record-controls"))revealRecordControls();});
$("recordOverlay").querySelector(".record-controls").addEventListener("click",event=>{event.stopPropagation();revealRecordControls();});

$("openStudio").addEventListener("click",()=>{
  readSceneTexts();
  state.playbackElapsed=0;updateSceneTime();
  state.studioOpened=true;
  showStep(7);
  updatePreview();
  showScene(0);
  setupWebGL();
});
$("startPreview").addEventListener("click",startPlayback);
$("sceneDuration").addEventListener("input",()=>{
  pausePlayback();
  const before=state.sceneDurations.slice(0,state.sceneIndex).reduce((sum,value)=>sum+value,0);
  const offset=Math.max(0,state.playbackElapsed-before);
  state.sceneDurations[state.sceneIndex]=Number($("sceneDuration").value)*1000;
  state.playbackElapsed=before+Math.min(offset,state.sceneDurations[state.sceneIndex]);
  updateSceneTime();
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
  syncRecordText();
});
$("restartScene").addEventListener("click",()=>{
  pausePlayback();state.playbackElapsed=0;$("studioProgress").style.width="0%";updateSceneTime();showScene(0);startPlayback();
});
$("shuffleBackground").addEventListener("click",()=>{
  state.variantIndex=(state.variantIndex+1)%6;
  state.seed=(state.seed+Math.floor(Math.random()*0x7fffffff)+1)>>>0;
  if(state.renderer)rebuildScene();
  const button=$("shuffleBackground");button.textContent="✓ Variant "+(state.variantIndex+1)+"/6";
  clearTimeout(state.variantTimer);state.variantTimer=setTimeout(()=>button.textContent="✧ Yangi kreativ variant",1800);
});
$("newProject").addEventListener("click",()=>{
  exitRecordMode();
  ["sourceName","sourceLink","sourceDirection","sourceDescription","sourceBenefit","sourceAudience","sourceProof","sourceAuthor","hook","reason","benefit","cta"].forEach(id=>$(id).value="");
  state.category="";state.name="";state.seed=1;state.variantIndex=0;state.tone="Jiddiy";state.visual="cinematic";state.palette="silver";state.motion="Silliq";
  state.sceneIndex=0;state.sceneVisualFrom=0;state.sceneDurations=[5000,5000,5000,5000,5000];state.sceneTexts=["","","","",""];state.sceneEdited=[false,false,false,false,false];
  state.playbackElapsed=0;state.studioOpened=false;
  document.querySelectorAll(".category").forEach(button=>button.classList.remove("selected"));
  $("sourceFields").hidden=true;
  choose("toneOptions","Jiddiy");choose("visualOptions","cinematic");choose("paletteOptions","silver");choose("motionOptions","Silliq");
  ["sourceStatus","scriptStatus","studioStatus"].forEach(id=>setStatus(id,""));
  $("studioProgress").style.width="0%";$("sceneTime").textContent="00:00";
  $("startPreview").textContent="▶ Ko‘rishni boshlash";$("recordPause").textContent="Ⅱ";
  if(state.renderer)rebuildScene();
  updatePreview();showStep(1);
});
$("backSettings").addEventListener("click",()=>{pausePlayback();exitRecordMode();showStep(6);});
updatePreview();
