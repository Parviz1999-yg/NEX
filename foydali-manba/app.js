import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const $ = id => document.getElementById(id);
const state = { category:"", name:"", seed:1, renderer:null, scene:null, camera:null, group:null, clock:new THREE.Clock() };
const categoryNames = {sayt:"SAYT",youtube:"YOUTUBE",telegram:"TELEGRAM",kitob:"KITOB"};
const categoryHints = {
  sayt:"Sayt nomi va havolasi. Masalan: Khan Academy.",
  youtube:"YouTube kanal yoki video nomi va havolasi.",
  telegram:"Telegram kanal, guruh yoki bot nomi va havolasi.",
  kitob:"Kitob nomi, muallifi va mavjud bo‘lsa elektron havolasi."
};
const palettes = {
  silver:{bg:0x080e18,accent:0x8ed8ff,light:0xdcecff},
  blue:{bg:0x06142c,accent:0x168cff,light:0x9bdcff},
  violet:{bg:0x160e30,accent:0x9876ff,light:0xd4c7ff},
  emerald:{bg:0x061e20,accent:0x00d5b2,light:0xa6ffed},
  solar:{bg:0x211706,accent:0xffb52e,light:0xffe6a5}
};

function hash(text){let h=2166136261;for(const ch of text)h=Math.imul(h^ch.charCodeAt(0),16777619);return h>>>0;}
function randomFrom(seed){let x=seed||1;return()=>{x^=x<<13;x^=x>>>17;x^=x<<5;return(x>>>0)/4294967296;};}
function setupWebGL(){
  const canvas=$("webgl");
  try{
    state.renderer=new THREE.WebGLRenderer({canvas,alpha:false,antialias:true,powerPreference:"high-performance"});
    state.renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.7));
    state.renderer.outputColorSpace=THREE.SRGBColorSpace;
    state.renderer.toneMapping=THREE.ACESFilmicToneMapping;
    state.scene=new THREE.Scene();
    state.camera=new THREE.PerspectiveCamera(38,9/16,.1,100);
    state.camera.position.set(0,0,8);
    state.scene.add(new THREE.HemisphereLight(0xeaf5ff,0x142238,2.2));
    const key=new THREE.DirectionalLight(0xffffff,4.5);key.position.set(-3,5,6);state.scene.add(key);
    const rim=new THREE.PointLight(0x72caff,85,18);rim.position.set(3,1,4);state.scene.add(rim);
    rebuildScene();
    resize();
    window.addEventListener("resize",resize);
    animate();
  }catch(error){$("sourceHint").textContent="WebGL ishga tushmadi: "+error.message;}
}
function resize(){
  if(!state.renderer)return;
  const box=$("webgl").getBoundingClientRect();
  const w=Math.max(1,Math.round(box.width* Math.min(devicePixelRatio||1,1.7)));
  const h=Math.max(1,Math.round(box.height* Math.min(devicePixelRatio||1,1.7)));
  state.renderer.setSize(w,h,false);
  state.camera.aspect=w/h;state.camera.updateProjectionMatrix();
}
function disposeGroup(){
  if(!state.group)return;
  state.scene.remove(state.group);
  state.group.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){if(Array.isArray(o.material))o.material.forEach(m=>m.dispose());else o.material.dispose();}});
}
function rebuildScene(){
  if(!state.scene)return;
  disposeGroup();
  state.group=new THREE.Group();state.scene.add(state.group);
  const palette=palettes[$("palette").value]||palettes.silver;
  state.scene.background=new THREE.Color(palette.bg);
  const rand=randomFrom(state.seed);
  const metal=new THREE.MeshPhysicalMaterial({color:0xcbd5df,metalness:.96,roughness:.17,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:1.5});
  const glow=new THREE.MeshStandardMaterial({color:palette.accent,emissive:palette.accent,emissiveIntensity:1.1,metalness:.45,roughness:.3});
  const type=state.category;
  if(type==="kitob"){
    for(let i=0;i<5;i++){
      const page=new THREE.Mesh(new THREE.BoxGeometry(2.4,.055,1.55),i===4?glow:metal);
      page.position.set((i-2)*.045,(i-2)*.075,0);page.rotation.z=-.16;page.rotation.y=-.16;state.group.add(page);
    }
    const cover=new THREE.Mesh(new THREE.BoxGeometry(2.5,.12,1.62),metal);cover.position.set(-.08,-.23,.08);cover.rotation.z=-.16;cover.rotation.y=-.16;state.group.add(cover);
  }else if(type==="youtube"){
    const ring=new THREE.Mesh(new THREE.TorusGeometry(1.22,.16,20,100),metal);state.group.add(ring);
    const play=new THREE.Mesh(new THREE.ConeGeometry(.72,1.05,3),glow);play.rotation.z=-Math.PI/2;play.position.z=.22;state.group.add(play);
    const orbit=new THREE.Mesh(new THREE.TorusGeometry(1.75,.018,8,100),glow);orbit.rotation.set(.9,.2,.4);state.group.add(orbit);
  }else if(type==="telegram"){
    const sphere=new THREE.Mesh(new THREE.IcosahedronGeometry(1.28,2),metal);sphere.scale.set(1.05,.78,.42);sphere.rotation.z=-.24;state.group.add(sphere);
    const signal=new THREE.Mesh(new THREE.TorusGeometry(1.75,.025,8,120),glow);signal.rotation.set(.45,.2,.3);state.group.add(signal);
    for(let i=0;i<3;i++){const dot=new THREE.Mesh(new THREE.SphereGeometry(.07,16,12),glow);dot.position.set((rand()-.5)*3,(rand()-.5)*3,.4);state.group.add(dot);}
  }else{
    const globe=new THREE.Mesh(new THREE.TorusKnotGeometry(1.05,.23,160,18,2,5),metal);globe.rotation.set(.4,.2,0);state.group.add(globe);
    for(let i=0;i<3;i++){const orb=new THREE.Mesh(new THREE.SphereGeometry(.09,18,12),glow);const a=rand()*Math.PI*2;orb.position.set(Math.cos(a)*2,Math.sin(a)*2,(rand()-.5)*1.2);state.group.add(orb);}
  }
  for(let i=0;i<34;i++){
    const dot=new THREE.Mesh(new THREE.SphereGeometry(.018+rand()*.028,8,8),glow);
    dot.position.set((rand()-.5)*6,(rand()-.5)*9,-1-rand()*2);state.group.add(dot);
  }
  state.group.userData.seed=state.seed;
}
function animate(){
  requestAnimationFrame(animate);
  if(!state.renderer||!state.scene)return;
  const t=state.clock.getElapsedTime();
  if(state.group){
    state.group.rotation.y=Math.sin(t*.24)*.28;
    state.group.rotation.x=Math.cos(t*.19)*.12;
    state.group.position.y=Math.sin(t*.55)*.12;
  }
  state.renderer.render(state.scene,state.camera);
}
function updatePreview(){
  $("reelCategory").textContent=categoryNames[state.category]||"FOYDALI MANBA";
  $("reelTitle").textContent=state.name||"Manba nomi";
  $("reelHook").textContent=$("hook").value||"Manba tanlang va Hook matnini kiriting.";
  $("reelReason").textContent=$("reason").value;
  $("reelBenefit").textContent=$("benefit").value;
  $("reelCta").textContent=$("cta").value;
}
function selectCategory(category){
  state.category=category;
  document.querySelectorAll(".category").forEach(button=>button.classList.toggle("selected",button.dataset.category===category));
  $("sourceFields").hidden=false;
  $("sourceHint").textContent=categoryHints[category];
  $("reelCategory").textContent=categoryNames[category];
  state.seed=hash(category+"|"+(state.name||""));
  if(!state.renderer)setupWebGL();else rebuildScene();
  $("stepLabel").textContent="02 — MA’LUMOTLAR";
}
document.querySelectorAll(".category").forEach(button=>button.addEventListener("click",()=>selectCategory(button.dataset.category)));
$("sourceName").addEventListener("input",()=>{
  state.name=$("sourceName").value.trim();
  $("reelTitle").textContent=state.name||"Manba nomi";
  if(state.category){state.seed=hash(state.category+"|"+state.name);rebuildScene();}
});
["hook","reason","benefit","cta"].forEach(id=>$(id).addEventListener("input",updatePreview));
$("palette").addEventListener("change",()=>{if(state.category){state.seed=hash(state.category+"|"+state.name+"|"+$("palette").value);rebuildScene();}});
$("previewBtn").addEventListener("click",()=>{
  const missing=[];
  if(!state.category)missing.push("manba turi");
  if(!$("sourceName").value.trim())missing.push("manba nomi");
  ["hook","reason","benefit","cta"].forEach(id=>{if(!$ (id).value.trim())missing.push($(id).previousElementSibling?.querySelector("label")?.textContent||id);});
  if(missing.length){$("formStatus").textContent="To‘ldirilishi kerak: "+missing.join(", ")+".";
    return;}
  updatePreview();
  $("formStatus").textContent="Ma’lumotlar tayyor. Keyingi bosqichda sahna va yozuv rejimini ulaymiz.";
  $("stepLabel").textContent="03 — KO‘RIB CHIQISH";
});
updatePreview();