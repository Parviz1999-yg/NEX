import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
const $=id=>document.getElementById(id);
const state={step:1,category:"",name:"",link:"",tone:"Jiddiy",visual:"cinematic",palette:"silver",motion:"Silliq",renderer:null,scene:null,camera:null,group:null,clock:new THREE.Clock(),raf:0};
const categoryNames={sayt:"SAYT",youtube:"YOUTUBE",telegram:"TELEGRAM",kitob:"KITOB"};
const hints={sayt:"Sayt nomi va havolasi. Masalan: Khan Academy.",youtube:"YouTube kanal yoki video nomi.",telegram:"Telegram kanal, guruh yoki bot nomi.",kitob:"Kitob nomi va muallifini kiriting."};
const palettes={silver:{bg:0x080e18,accent:0x8ed8ff,light:0xdcecff},blue:{bg:0x06142c,accent:0x168cff,light:0x9bdcff},violet:{bg:0x160e30,accent:0x9876ff,light:0xd4c7ff},emerald:{bg:0x061e20,accent:0x00d5b2,light:0xa6ffed},solar:{bg:0x211706,accent:0xffb52e,light:0xffe6a5}};
const stepLabels=["01 — MANBA","02 — SSENARIY","03 — BAYON","04 — VIZUAL TIL","05 — RANG","06 — ANIMATSIYA","07 — STUDIYA"];
function hash(t){let h=2166136261;for(const ch of t)h=Math.imul(h^ch.charCodeAt(0),16777619);return h>>>0;}
function go(step){state.step=step;document.querySelectorAll(".wizard-page").forEach(p=>p.classList.toggle("active",p.id==="step-"+step));$("stepLabel").textContent=stepLabels[step-1];$("progressFill").style.width=((step-1)/6*100)+"%";document.querySelectorAll("[data-progress]").forEach(el=>{const n=Number(el.dataset.progress);el.classList.toggle("current",n===step);el.classList.toggle("done",n<step);});window.scrollTo({top:0,behavior:"smooth"});if(step===7){prepareStudio();}}
function choose(groupId,callback){$(groupId).querySelectorAll("[data-value]").forEach(btn=>btn.addEventListener("click",()=>{state[callback]=btn.dataset.value;$(groupId).querySelectorAll("[data-value]").forEach(b=>b.classList.toggle("selected",b===btn));}));}
document.querySelectorAll(".category").forEach(btn=>btn.addEventListener("click",()=>{state.category=btn.dataset.category;document.querySelectorAll(".category").forEach(b=>b.classList.toggle("selected",b===btn));$("sourceFields").hidden=false;$("sourceHint").textContent=hints[state.category];$("sourceStatus").textContent="";}));
$("sourceName").addEventListener("input",e=>state.name=e.target.value.trim());
$("sourceLink").addEventListener("input",e=>state.link=e.target.value.trim());
$("nextSource").addEventListener("click",()=>{state.name=$("sourceName").value.trim();state.link=$("sourceLink").value.trim();if(!state.category||!state.name){$("sourceStatus").textContent="Davom etish uchun manba turi va nomini kiriting.";return;}go(2);});
$("nextScript").addEventListener("click",()=>{const ids=["hook","reason","benefit","cta"];const missing=ids.filter(id=>!$(id).value.trim());if(missing.length){$("scriptStatus").textContent="Barcha to‘rtta matn maydonini to‘ldiring.";return;}go(3);});
choose("toneOptions","tone");choose("visualOptions","visual");choose("paletteOptions","palette");choose("motionOptions","motion");
document.querySelectorAll("[data-next]").forEach(b=>b.addEventListener("click",()=>go(Number(b.dataset.next))));
document.querySelectorAll("[data-prev]").forEach(b=>b.addEventListener("click",()=>go(Number(b.dataset.prev))));
$("openStudio").addEventListener("click",()=>go(7));
function prepareStudio(){
const category=categoryNames[state.category];
$("reelCategory").textContent=category;
$("reelTitle").textContent=state.name;
$("reelHook").textContent=$("hook").value.trim();
$("reelReason").textContent=$("reason").value.trim();
$("reelBenefit").textContent=$("benefit").value.trim();
$("reelCta").textContent=$("cta").value.trim();
$("sceneText").value=[$("hook").value.trim(),state.name,$("reason").value.trim(),$("benefit").value.trim(),$("cta").value.trim()].join("\n");
$("summary").innerHTML="<div><strong>Manba:</strong> "+escapeHtml(category+" · "+state.name)+"</div><div><strong>Bayon:</strong> "+escapeHtml(state.tone)+"</div><div><strong>Vizual:</strong> "+escapeHtml(visualName(state.visual))+"</div><div><strong>Rang:</strong> "+escapeHtml(state.palette)+"</div><div><strong>Animatsiya:</strong> "+escapeHtml(state.motion)+"</div>";
if(!state.renderer)setupWebGL();else rebuildScene();
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function visualName(v){return({cinematic:"Cinematic 3D",kinetic:"Kinetic Typography",editorial:"Editorial / Magazine",future:"Futuristic Motion"})[v];}
function setupWebGL(){
try{
const canvas=$("webgl");state.renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:"high-performance"});state.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6));state.renderer.outputColorSpace=THREE.SRGBColorSpace;state.renderer.toneMapping=THREE.ACESFilmicToneMapping;
state.scene=new THREE.Scene();state.camera=new THREE.PerspectiveCamera(38,9/16,.1,100);state.camera.position.set(0,0,8);
state.scene.add(new THREE.HemisphereLight(0xeaf5ff,0x142238,2.2));const key=new THREE.DirectionalLight(0xffffff,4.5);key.position.set(-3,5,6);state.scene.add(key);const rim=new THREE.PointLight(0x72caff,85,18);rim.position.set(3,1,4);state.scene.add(rim);
rebuildScene();resize();window.addEventListener("resize",resize);animate();
}catch(e){$("summary").insertAdjacentHTML("beforeend","<p>3D sahna ishga tushmadi. Brauzeringiz WebGL’ni qo‘llashini tekshiring.</p>");}
}
function resize(){if(!state.renderer)return;const box=$("webgl").getBoundingClientRect();const w=Math.max(1,Math.round(box.width*Math.min(devicePixelRatio||1,1.6)));const h=Math.max(1,Math.round(box.height*Math.min(devicePixelRatio||1,1.6)));state.renderer.setSize(w,h,false);state.camera.aspect=w/h;state.camera.updateProjectionMatrix();}
function disposeGroup(){if(!state.group)return;state.scene.remove(state.group);state.group.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){if(Array.isArray(o.material))o.material.forEach(m=>m.dispose());else o.material.dispose();}});}
function rebuildScene(){
if(!state.scene)return;disposeGroup();state.group=new THREE.Group();state.scene.add(state.group);
const p=palettes[state.palette],metal=new THREE.MeshPhysicalMaterial({color:0xcbd5df,metalness:.96,roughness:.17,clearcoat:1,clearcoatRoughness:.06}),glow=new THREE.MeshStandardMaterial({color:p.accent,emissive:p.accent,emissiveIntensity:1.1,metalness:.45,roughness:.3});
state.scene.background=new THREE.Color(p.bg);const seed=hash(state.category+"|"+state.name+"|"+state.visual),rand=(()=>{let x=seed||1;return()=>{x^=x<<13;x^=x>>>17;x^=x<<5;return(x>>>0)/4294967296;};})();
if(state.visual==="kinetic"){
const bars=[1.9,1.35,.9,.55];bars.forEach((w,i)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,.11,.18),i%2?glow:metal);m.position.set(-.6,(1.1-i*.5),0);state.group.add(m);});
}else if(state.visual==="editorial"){
for(let i=0;i<4;i++){const page=new THREE.Mesh(new THREE.BoxGeometry(2.3,.035,1.45),i===0?glow:metal);page.position.set(i*.05,-i*.08,0);page.rotation.z=-.12;state.group.add(page);}
}else if(state.visual==="future"){
const grid=new THREE.Mesh(new THREE.TorusGeometry(1.35,.025,8,96),glow);grid.rotation.x=1.1;state.group.add(grid);const core=new THREE.Mesh(new THREE.IcosahedronGeometry(.95,2),metal);state.group.add(core);
}else if(state.category==="kitob"){
for(let i=0;i<5;i++){const page=new THREE.Mesh(new THREE.BoxGeometry(2.3,.05,1.5),i===4?glow:metal);page.position.set((i-2)*.04,(i-2)*.07,0);page.rotation.z=-.14;state.group.add(page);}
const cover=new THREE.Mesh(new THREE.BoxGeometry(2.4,.12,1.58),metal);cover.position.y=-.22;cover.rotation.z=-.14;state.group.add(cover);
}else if(state.category==="youtube"){
const ring=new THREE.Mesh(new THREE.TorusGeometry(1.22,.16,20,100),metal);state.group.add(ring);const play=new THREE.Mesh(new THREE.ConeGeometry(.72,1.05,3),glow);play.rotation.z=-Math.PI/2;play.position.z=.2;state.group.add(play);
}else if(state.category==="telegram"){
const sphere=new THREE.Mesh(new THREE.IcosahedronGeometry(1.28,2),metal);sphere.scale.set(1.05,.78,.42);state.group.add(sphere);const signal=new THREE.Mesh(new THREE.TorusGeometry(1.75,.025,8,120),glow);signal.rotation.set(.45,.2,.3);state.group.add(signal);
}else{
const knot=new THREE.Mesh(new THREE.TorusKnotGeometry(1.05,.23,160,18,2,5),metal);state.group.add(knot);
}
for(let i=0;i<34;i++){const dot=new THREE.Mesh(new THREE.SphereGeometry(.018+rand()*.028,8,8),glow);dot.position.set((rand()-.5)*6,(rand()-.5)*9,-1-rand()*2);state.group.add(dot);}
}
function animate(){state.raf=requestAnimationFrame(animate);if(!state.renderer||!state.scene)return;const t=state.clock.getElapsedTime();const speed=state.motion==="Dinamik"?.75:state.motion==="Kinematik"?.12:state.motion==="Ijodiy"?.48:state.motion==="Aralash"?.38:.24;if(state.group){state.group.rotation.y=Math.sin(t*speed)*.32;state.group.rotation.x=Math.cos(t*speed*.8)*.13;state.group.position.y=Math.sin(t*(speed+0.2))*.12;}state.renderer.render(state.scene,state.camera);}
$("sceneText").addEventListener("input",()=>{const lines=$("sceneText").value.split("\n");$("reelHook").textContent=lines[0]||"";$("reelTitle").textContent=lines[1]||state.name;$("reelReason").textContent=lines[2]||"";$("reelBenefit").textContent=lines[3]||"";$("reelCta").textContent=lines.slice(4).join(" ");});
$("restartScene").addEventListener("click",()=>{if(state.group){state.group.rotation.set(0,0,0);state.group.position.set(0,0,0);}state.clock.start();});
$("backSettings").addEventListener("click",()=>go(6));
go(1);
