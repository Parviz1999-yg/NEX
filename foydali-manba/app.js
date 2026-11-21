let THREE=null;

const $ = id => document.getElementById(id);
const state = {
  category:"", name:"", seed:1, variantIndex:0, tone:"Jiddiy", visual:"cinematic",
  palette:"silver", motion:"Silliq", renderer:null, scene:null,
  camera:null, group:null, fluid:null, logoGroup:null, logoStrokes:[], recordRenderer:null, raf:0, animationStarted:0,
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
  const canvas=$("reel3D");
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
    state.renderer.setPixelRatio(1);
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
    state.camera=new THREE.PerspectiveCamera(34,9/16,.1,100);
    state.camera.position.set(0,0,9);
    state.scene.add(new THREE.HemisphereLight(0xf8fbff,0x30445d,3.35));
    const key=new THREE.DirectionalLight(0xffffff,8.0);key.position.set(-4,6,7);state.scene.add(key);
    const rim=new THREE.PointLight(0x168cff,95,22);rim.position.set(4,1,3);state.scene.add(rim);
    const fill=new THREE.PointLight(0xb9eaff,88,22);fill.position.set(-4,-3,2);state.scene.add(fill);
    const topLight=new THREE.PointLight(0xffffff,72,20);topLight.position.set(0,5,1);state.scene.add(topLight);
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
  const canvas=$("reel3D"),box=canvas.getBoundingClientRect();
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
  state.fluid=null;state.logoGroup=null;
}
function createFlowSurface(segments,widthSegments,material,seed){
  const positions=[],indices=[],base=[];
  for(let iy=0;iy<=widthSegments;iy++){
    const v=iy/widthSegments*2-1;
    for(let ix=0;ix<=segments;ix++){
      const u=ix/segments,x=(u-.5)*8.4;
      positions.push(x,v*.55,0);base.push(x,v,u);
    }
  }
  for(let iy=0;iy<widthSegments;iy++)for(let ix=0;ix<segments;ix++){
    const a=iy*(segments+1)+ix,b=a+1,c=a+segments+1,d=c+1;
    indices.push(a,b,c,b,d,c);
  }
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute("position",new THREE.Float32BufferAttribute(positions,3));
  geometry.setIndex(indices);geometry.computeVertexNormals();
  const mesh=new THREE.Mesh(geometry,material);
  mesh.userData.flowBase=new Float32Array(base);mesh.userData.flowSeed=seed;
  return mesh;
}
function updateFlowSurface(time,profile,energy){
  if(!state.fluid)return;
  const attr=state.fluid.geometry.attributes.position,base=state.fluid.userData.flowBase;
  const phase=time*profile.speed*energy+state.fluid.userData.flowSeed;
  const scene=state.sceneIndex,style=state.visual;
  const local=Math.max(0,Math.min(1,(performance.now()-state.sceneVisualStarted)/Math.max(700,state.sceneDurations[scene])));
  const reveal=1-Math.pow(1-Math.min(1,local/.34),3);
  for(let i=0;i<attr.count;i++){
    const k=i*3,x=base[k],v=base[k+1],u=base[k+2],edge=Math.pow(Math.sin(Math.PI*u),.55);
    let px=x,py=0,pz=0;
    if(scene===0){
      const wave=Math.sin(u*Math.PI*2.15-phase*.72),curl=Math.cos(u*Math.PI*3.1-phase);
      px=x+Math.sin(u*6.283+phase*.35)*.28+v*.12;
      py=wave*(.62+.18*Math.sin(phase))+v*(.22+edge*.32);
      pz=curl*.72+Math.sin(u*12+phase)*.16+v*.22;
    }else if(scene===1){
      const a=u*Math.PI*2+phase*.34;
      px=Math.cos(a)*2.35+v*.24;py=Math.sin(a)*1.52+v*.2;pz=Math.sin(a*2+phase*.28)*.52+v*.38;
    }else if(scene===2){
      const fan=(u-.5)*8.1,spread=(.16+u*.92)*(1+.22*Math.sin(phase));
      px=fan+Math.sin(u*17-phase)*.16;py=v*spread+Math.sin(u*10-phase*1.3)*.32;
      pz=Math.sin(u*14-phase)*(.38+Math.abs(v)*.38)+v*.26;
    }else if(scene===3){
      const dx=(u-.5)*8.1,impact=Math.exp(-Math.pow(dx*.92,2));
      px=dx+Math.sin(phase+v*3)*.12;
      py=v*(.28+impact*1.08)+Math.sin(dx*1.8-phase)*.22+impact*Math.sin(phase*1.8)*.65;
      pz=impact*(.8+Math.cos(phase*1.7+v*4)*.52)+Math.sin(dx*1.25+phase)*.3+v*.22;
    }else{
      const a=u*Math.PI*3.1+phase*.48;
      px=Math.cos(a)*(1.15+v*.35)+Math.sin(phase*.4)*.3;
      py=(u-.5)*5.1+v*.28;pz=Math.sin(a)*(1.05+v*.24)+Math.cos(u*8-phase)*.2;
    }
    if(style==="kinetic"){
      const snap=Math.sin(u*Math.PI*7.5-phase*1.35);
      px+=Math.sin(u*Math.PI*4.2+phase)*.16*edge;py+=snap*.19*edge;pz+=Math.cos(u*Math.PI*9-phase*1.1)*.22*edge;
    }else if(style==="editorial"){
      py=py*.82+Math.sin(u*Math.PI*1.65+phase*.42)*.13*edge;pz*=.68;
      px+=Math.sin(u*Math.PI*2.1-phase*.25)*.075*edge;
    }else if(style==="future"){
      const pulse=Math.sin(u*Math.PI*11-phase*1.6);
      py+=pulse*.24*edge;pz+=Math.cos(u*Math.PI*8+phase*1.25)*.28*edge;
      px+=Math.sin(u*Math.PI*6+phase*.7)*.12*edge;
    }
    if(state.category==="youtube")py+=Math.sin(u*Math.PI*4+phase*.7)*.18*edge;
    else if(state.category==="telegram")pz+=Math.cos(u*Math.PI*3-phase*.55)*.2*edge;
    else if(state.category==="kitob")py*=.82;
    else px+=Math.sin(u*Math.PI*2+phase)*.08*edge;
    const styleBoost=style==="kinetic"?1.18:style==="editorial"?.82:style==="future"?1.34:1;
    px*=.49;
    const flatY=v*.13;
    py=flatY+(py-flatY)*reveal;
    pz*=reveal;
    px*=.58+.42*reveal;
    attr.setXYZ(i,px,py*profile.flow*styleBoost,pz*profile.flow*styleBoost);
  }
  attr.needsUpdate=true;state.fluid.geometry.computeVertexNormals();
}
function rebuildScene(){
  if(!state.scene)return;
  disposeGroup();
  state.group=new THREE.Group();state.scene.add(state.group);
  const paletteForFluid=palettes[state.palette]||palettes.silver;
  const fluidMaterial=new THREE.MeshPhysicalMaterial({color:0xd9dde3,metalness:.985,roughness:.115,clearcoat:1,clearcoatRoughness:.022,envMapIntensity:4.8,emissive:0x171b20,emissiveIntensity:.035,side:THREE.DoubleSide});
  state.fluid=createFlowSurface(112,28,fluidMaterial,(state.seed||1)*.0001);
  state.fluid.position.set(0,0,.42);
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
  buildNexLogo();
  for(let i=0;i<34;i++){const dot=new THREE.Mesh(new THREE.SphereGeometry(.018+rand()*.028,8,8),glow);dot.position.set((rand()-.5)*6,(rand()-.5)*9,-1-rand()*2);state.group.add(dot);}
}
function buildNexLogo(){
  if(!state.group)return;
  state.logoGroup=new THREE.Group();state.logoStrokes=[];
  const chrome=new THREE.MeshPhysicalMaterial({color:0xdfe4e8,metalness:1,roughness:.055,clearcoat:1,clearcoatRoughness:.012,envMapIntensity:7.5,emissive:0x171c22,emissiveIntensity:.12});
  const paths=[
    [[-1.72,-.62,0],[-1.72,.68,0]],[[-1.72,.68,0],[-.72,-.62,0]],[[-.72,-.62,0],[-.72,.68,0]],
    [[-.42,-.62,0],[-.42,.68,0]],[[-.42,.68,0],[.38,.68,0]],[[-.42,.03,0],[.28,.03,0]],[[-.42,-.62,0],[.38,-.62,0]],
    [[.62,.68,0],[1.62,-.62,0]],[[.62,-.62,0],[1.62,.68,0]]
  ];
  paths.forEach((points,index)=>{
    const curve=new THREE.CatmullRomCurve3(points.map(point=>new THREE.Vector3(...point)),false,"centripetal");
    const geometry=new THREE.TubeGeometry(curve,32,index===0||index===2||index===3||index>=7?.082:.068,12,false);
    const count=geometry.index?geometry.index.count:geometry.attributes.position.count;
    geometry.setDrawRange(0,0);
    const mesh=new THREE.Mesh(geometry,chrome);mesh.userData.indexCount=count;
    state.logoGroup.add(mesh);state.logoStrokes.push(mesh);
  });
  state.logoGroup.position.set(0,0,.35);state.logoGroup.scale.setScalar(.78);
  state.logoGroup.visible=false;state.group.add(state.logoGroup);
}
function updateNexLogo(progress,visible,time){
  if(!state.logoGroup)return;
  state.logoGroup.visible=visible;if(!visible)return;
  const reveal=Math.max(0,Math.min(1,progress));
  state.logoGroup.rotation.y=Math.sin(reveal*Math.PI)*.16;
  state.logoGroup.rotation.x=-.04+Math.sin(reveal*Math.PI*2)*.025;
  state.logoStrokes.forEach((mesh,index)=>{
    const local=Math.max(0,Math.min(1,(reveal-index*.045)/.48));
    mesh.geometry.setDrawRange(0,Math.floor(mesh.userData.indexCount*local));
  });
  state.logoGroup.scale.setScalar(.78*(1+.025*Math.sin(reveal*Math.PI*2)));
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
    updateFlowSurface(t,profile,energy);
    const total=state.sceneDurations.reduce((sum,value)=>sum+value,0);
    const elapsed=state.playbackElapsed;
    const introEnd=2600,outroStart=total-2300;
    let logoVisible=false,logoProgress=0;
    if(elapsed<introEnd){logoVisible=true;logoProgress=Math.min(1,elapsed/2050);}
    else if(elapsed>outroStart){logoVisible=true;logoProgress=Math.min(1,(total-elapsed)/2050);}
    updateNexLogo(logoProgress,logoVisible,t);
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
  syncRecordText(state.recording);
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
    button.addEventListener("click",()=>{
       const wasPlaying=state.playing;
       state.playbackElapsed=state.sceneDurations.slice(0,index).reduce((sum,value)=>sum+value,0);
       if(wasPlaying)state.playbackStarted=performance.now()-state.playbackElapsed;
       showScene(index);
       $("studioProgress").style.width=(state.playbackElapsed/state.sceneDurations.reduce((sum,value)=>sum+value,0)*100)+"%";
       updateSceneTime();
     });
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
    const canvas=$("record3D");
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
function syncRecordText(recordToo=true){
  const value=id=>$(id)?.textContent?.trim()||"";
  const accentMap={silver:"#8ed8ff",blue:"#168cff",violet:"#9876ff",emerald:"#00d5b2",solar:"#ffb52e"};
  const accent=accentMap[state.palette]||accentMap.silver;
  const render=canvas=>{
    if(!canvas)return;
    const ctx=canvas.getContext("2d",{alpha:true});if(!ctx)return;
    ctx.setTransform(canvas.width/1080,0,0,canvas.height/1920,0,0);
    const now=performance.now(),duration=({Silliq:820,Dinamik:300,Kinematik:1050,Ijodiy:520,Aralash:650})[state.motion]||820;
    const p=Math.max(0,Math.min(1,(now-state.sceneVisualStarted)/duration));
    const ease=p*p*(3-2*p),scene=state.sceneIndex,style=state.visual;
    const wrap=(text,font,color,y,maxLines=5,lineHeight=94,align="center",x=540,maxWidth=880)=>{
      if(!text)return;
      ctx.font=font;ctx.fillStyle=color;ctx.textAlign=align;ctx.textBaseline="middle";
      const words=text.split(/\s+/),lines=[];let line="";
      for(const word of words){
        const test=line?line+" "+word:word;
        if(line&&ctx.measureText(test).width>maxWidth){lines.push(line);line=word;}else line=test;
      }
      if(line)lines.push(line);
      const shown=lines.slice(0,maxLines);
      if(lines.length>maxLines)shown[maxLines-1]=shown[maxLines-1].replace(/[.,;:]?$/,"")+"…";
      const first=y-(shown.length-1)*lineHeight/2;
      shown.forEach((item,index)=>ctx.fillText(item,x,first+index*lineHeight,maxWidth));
    };
    ctx.clearRect(0,0,1080,1920);ctx.save();
    // Visual-language-specific frame and background graphics.
    ctx.strokeStyle=accent;ctx.fillStyle=accent;ctx.lineWidth=2;
    if(style==="editorial"){
      ctx.globalAlpha=.5;ctx.beginPath();ctx.moveTo(86,250);ctx.lineTo(994,250);ctx.moveTo(86,1665);ctx.lineTo(994,1665);ctx.stroke();
      ctx.globalAlpha=.12;for(let x=120;x<1000;x+=220){ctx.beginPath();ctx.moveTo(x,290);ctx.lineTo(x,1620);ctx.stroke();}
      ctx.globalAlpha=.75;ctx.font="700 22px Georgia";ctx.textAlign="left";ctx.fillText("RESOURCE / FIELD NOTES",88,218);
    }else if(style==="kinetic"){
      ctx.globalAlpha=.8;ctx.fillRect(86,330,12,1160);ctx.globalAlpha=.22;
      for(let y=360;y<1500;y+=150)ctx.fillRect(118,y,850,2);
      ctx.globalAlpha=.9;ctx.font="900 24px system-ui";ctx.textAlign="left";ctx.fillText("NEX / IMPACT SERIES",132,218);
    }else if(style==="future"){
      ctx.globalAlpha=.35;for(let x=90;x<=990;x+=90){ctx.beginPath();ctx.moveTo(x,280);ctx.lineTo(x,1640);ctx.stroke();}
      for(let y=300;y<=1620;y+=90){ctx.beginPath();ctx.moveTo(90,y);ctx.lineTo(990,y);ctx.stroke();}
      ctx.globalAlpha=.9;ctx.strokeRect(78,270,924,1370);
      ctx.font="700 22px monospace";ctx.textAlign="left";ctx.fillText("NEX // RESOURCE_NODE",92,218);
      ctx.textAlign="right";ctx.fillText("SYS 09:16",988,218);
    }else{
      ctx.globalAlpha=.22;ctx.beginPath();ctx.arc(540,960,360,0,Math.PI*2);ctx.arc(540,960,440,0,Math.PI*2);ctx.stroke();
      ctx.globalAlpha=.55;ctx.beginPath();ctx.moveTo(540,250);ctx.lineTo(540,1670);ctx.stroke();
      ctx.font="800 24px system-ui";ctx.textAlign="center";ctx.fillText("NEX / RESOURCE",540,218);
    }
    ctx.globalAlpha=style==="future"?.35+.65*ease:ease;
    const scale=style==="kinetic"?.84+.16*ease:style==="editorial"?.97+.03*ease:.92+.08*ease;
    ctx.translate(540,960);ctx.scale(scale,scale);ctx.translate(-540,-960);
    const slide=style==="editorial"?(1-ease)*24:style==="kinetic"?(1-ease)*-46:(1-ease)*18;
    ctx.translate(0,slide);
    const mainFont=style==="editorial"?"italic 76px Georgia":style==="future"?"800 70px monospace":style==="kinetic"?"900 88px system-ui":"800 78px system-ui";
    const mainAlign=style==="kinetic"||style==="future"?"left":"center";
    const mainX=mainAlign==="left"?132:540;
    const mainColor=style==="future"?accent:"#ffffff";
    if(scene===0){
      wrap(value("reelHook"),mainFont,mainColor,960,6,style==="kinetic"?112:96,mainAlign,mainX,style==="kinetic"||style==="future"?820:900);
    }else if(scene===1){
      wrap(value("reelHook"),style==="editorial"?"italic 38px Georgia":"650 36px system-ui","#b9c8d8",690,3,52,mainAlign,mainX,820);
      wrap(value("reelTitle"),mainFont,mainColor,960,5,style==="kinetic"?112:96,mainAlign,mainX,820);
      wrap(value("reelReason"),"600 34px system-ui",accent,1240,3,48,mainAlign,mainX,820);
    }else if(scene===2){
      wrap(value("reelReason"),mainFont,mainColor,960,6,style==="kinetic"?112:96,mainAlign,mainX,820);
    }else if(scene===3){
      wrap(value("reelBenefit"),mainFont,mainColor,960,6,style==="kinetic"?112:96,mainAlign,mainX,820);
    }else{
      wrap(value("reelCta"),mainFont,mainColor,960,6,style==="kinetic"?112:96,mainAlign,mainX,820);
    }
    ctx.globalAlpha=.8;ctx.fillStyle="#d7e5f1";ctx.font=style==="editorial"?"700 22px Georgia":"700 22px system-ui";ctx.textAlign="left";ctx.fillText("NEX / RESOURCE",78,1800);
    ctx.textAlign="right";ctx.fillText("9:16",1002,1800);
    if(style==="future"){
      const scan=280+((now-state.sceneVisualStarted)%1400)/1400*1360;
      ctx.globalAlpha=.38;ctx.fillStyle=accent;ctx.fillRect(90,scan,900,3);
    }
    ctx.restore();
  };
  render($("reelCanvas"));
  if(recordToo)render($("recordCanvas"));
}
function revealRecordControls(){
  const overlay=$("recordOverlay");overlay.classList.add("controls-visible");
  clearTimeout(state.recordControlsTimer);
  state.recordControlsTimer=setTimeout(()=>overlay.classList.remove("controls-visible"),1800);
}
async function startRecordMode(){
  try{
    if(document.documentElement.requestFullscreen&&!document.fullscreenElement){
      const fullscreen=document.documentElement.requestFullscreen({navigationUI:"hide"});
      fullscreen?.catch(()=>{});
    }
  }catch{}
  if(!state.renderer||state.webglFailed){
    const ready=await setupWebGL();
    if(!ready){setStatus("studioStatus","WebGL ishga tushmadi. Internet yoki brauzer grafik imkoniyatini tekshiring.");return;}
  }
  const recordReady=setupRecordRenderer();
  if(!recordReady)setStatus("studioStatus","Yozuv oynasining 3D qatlami ishga tushmadi; matn qatlami saqlanadi.");
  state.recording=true;$("recordOverlay").hidden=false;
  state.sceneVisualFrom=state.sceneIndex;state.sceneVisualStarted=performance.now();
  state.playing=true;state.playbackStarted=performance.now()-state.playbackElapsed;
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
  if(document.fullscreenElement&&document.exitFullscreen)document.exitFullscreen().catch(()=>{});
}
$("recordMode").addEventListener("click",startRecordMode);
$("recordPause").addEventListener("click",()=>{
  if(state.playing){pausePlayback();$("recordPause").textContent="▶";}
  else{
    const total=state.sceneDurations.reduce((sum,value)=>sum+value,0);
    if(state.playbackElapsed>=total){state.playbackElapsed=0;showScene(0);updateSceneTime();}
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
  state.sceneVisualFrom=0;state.sceneVisualStarted=performance.now();
  showStep(7);
  updatePreview();
  showScene(0);
  setupWebGL();
});
$("startPreview").addEventListener("click",startPlayback);
$("sceneDuration").addEventListener("input",()=>{
  const wasPlaying=state.playing;
  const before=state.sceneDurations.slice(0,state.sceneIndex).reduce((sum,value)=>sum+value,0);
  const offset=Math.max(0,state.playbackElapsed-before);
  state.sceneDurations[state.sceneIndex]=Number($("sceneDuration").value)*1000;
  state.playbackElapsed=before+Math.min(offset,state.sceneDurations[state.sceneIndex]);
  if(wasPlaying)state.playbackStarted=performance.now()-state.playbackElapsed;
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
  pausePlayback();state.playbackElapsed=0;state.sceneVisualFrom=state.sceneIndex;state.sceneVisualStarted=performance.now();$("studioProgress").style.width="0%";updateSceneTime();showScene(0);startPlayback();
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
