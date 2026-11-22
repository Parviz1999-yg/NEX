(()=>{
"use strict";
const $=id=>document.getElementById(id);
const notes={
"Ilmiy fakt":"Ilmiy dalil va tekshiriladigan manbaga tayangan da’vo. Manbani ko‘rsatish zarur.",
"Postulat (isbotsiz qabul qilinadigan)":"Muayyan nazariya yoki tizim doirasida boshlang‘ich asos sifatida qabul qilinadi; uni empirik isbotlangan fakt sifatida ko‘rsatmaslik kerak.",
"100 foiz ishonchli":"Bu belgi mutlaq aniqlik kafolati emas. Da’vo dalil va manbalar bilan ehtiyotkorlik bilan asoslanishi kerak.",
"Tekshiruvda":"Hali tasdiqlanmagan ma’lumot. Videoda tekshiruv jarayonida ekani ochiq aytilishi shart."
};
$("kind").addEventListener("change",()=>{$("kindHint").textContent=notes[$("kind").value]||"Tasnif tanlanganda uning mazmuniy izohi ko‘rsatiladi."});
$("field").addEventListener("change",()=>{$("customField").hidden=$("field").value!=="Boshqa";});
const val=id=>$(id).value.trim();
$("build").addEventListener("click",()=>{
 const field=$("field").value==="Boshqa"?val("customField"):$("field").value;
 const required=["kind","field","title","hook","announce","bodyText","statusText","ending"];
 if(required.some(id=>!val(id))||!field){alert("Fakt tasnifi, fan sohasi, sarlavha va besh ssenariy bosqichini to‘ldiring.");return;}
 if(val("sourceUrl")&&!/^https?:\/\//i.test(val("sourceUrl"))){alert("Manba havolasi http:// yoki https:// bilan boshlanishi kerak.");return;}
 const lines=["NEX — QIZIQARLI FAKT","Tasnif: "+val("kind"),"Fan sohasi: "+field,"Fakt: "+val("title"),"Manba: "+(val("source")||"Kiritilmagan"),"Havola: "+(val("sourceUrl")||"Kiritilmagan"),"Dalil: "+(val("evidence")||"Kiritilmagan"),"Tekshiruv qaydi: "+val("review"),"","HOOK: "+val("hook"),"FAKT E’LONI: "+val("announce"),"MAZMUNI: "+val("bodyText"),"HOLATI: "+val("statusText"),"FIKR SO‘RASH / CHORLOV: "+val("ending")];
 $("result").textContent=lines.join("\n");
});
$("clear").addEventListener("click",()=>{
 document.querySelectorAll("input,textarea").forEach(x=>x.value="");
 document.querySelectorAll("select").forEach(x=>x.selectedIndex=0);
 $("customField").hidden=true;
 $("kindHint").textContent="Tasnif tanlanganda uning mazmuniy izohi ko‘rsatiladi.";
 $("result").textContent="Tayyorlangan ssenariy shu yerda ko‘rinadi.";window.qfSceneCue="UMUMIY SAHNA";
});
let THREE=null,renderer=null,scene=null,camera=null,root=null,raf=0,resizeObserver=null,paused=false,motionSpeed=1,activeStage=0,currentSubject="";
const colors={Fizika:0x62d8ff,Biologiya:0x70e0b2,Tarix:0xd9b27a,Matematika:0xb9a1ff,Astronomiya:0x7c9cff,Kimyo:0x74e5ef,Geografiya:0x78c6a3,Texnologiya:0x5edbff,Psixologiya:0xe39bc8,Boshqa:0x78cfff};
function material(color,roughness=.48,metalness=.12){return new THREE.MeshStandardMaterial({color,roughness,metalness});}
function mesh(geometry,mat,x=0,y=0,z=0){const m=new THREE.Mesh(geometry,mat);m.position.set(x,y,z);root.add(m);return m;}
function clearRootContents(){if(!root)return;root.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose());}});root.clear();}
function lineBetween(a,b,radius,mat){const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b),d=new THREE.Vector3().subVectors(end,start);const obj=mesh(new THREE.CylinderGeometry(radius,radius,d.length(),10),mat);obj.position.copy(start).add(end).multiplyScalar(.5);obj.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return obj;}
function sphere(x,y,z,r,color,detail=32){return mesh(new THREE.SphereGeometry(r,detail,detail),material(color),x,y,z);}
function makeOrbit(radius,tilt,color){const o=mesh(new THREE.TorusGeometry(radius,.012,8,100),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.7}));o.rotation.x=tilt;return o;}
function makeScene(subject){
 root=new THREE.Group();scene.add(root);
 const accent=colors[subject]||colors.Boshqa;
 if(subject==="Astronomiya"){
  sphere(0,0,0,.72,0x2674c9,48);sphere(-.2,.3,.56,.16,0x62bfff);sphere(.35,-.22,.53,.11,0x1b4c91);
  const ring=makeOrbit(1.12,.28,0x8bcfff);root.userData.spin=ring;
  const moon=sphere(1.48,0,0,.13,0xd8e8ff,20);moon.userData.orbit=true;
  makeOrbit(1.5,.28,0x527fbb);
 }else if(subject==="Biologiya"){
  sphere(0,0,0,.95,0x3a9f91,40);
  const membrane=mesh(new THREE.SphereGeometry(1.02,40,40),new THREE.MeshPhysicalMaterial({color:0x8af0d1,transparent:true,opacity:.16,roughness:.2,side:THREE.DoubleSide}));
  sphere(.12,.05,.48,.34,0x9d83ed);sphere(-.48,.35,.2,.13,0xf0b66e);sphere(.48,-.38,.18,.16,0xf0b66e);sphere(-.42,-.35,.28,.1,0x75d6ef);
  for(let i=0;i<18;i++){const a=i*2.399; sphere(Math.cos(a)*.72,Math.sin(a)*.72,.1,.035,0xc5fff0,10);}
 }else if(subject==="Kimyo"){
  const pts=[[0,0,0],[.75,.15,0],[-.65,.55,.1],[-.45,-.65,.25],[.25,-.55,-.25],[.1,.65,-.55]];
  for(let i=1;i<pts.length;i++)lineBetween(pts[0],pts[i],.045,material(0x8bbbd8,.35,.5));
  pts.forEach((p,i)=>sphere(...p,i===0?.23:.16,[0x6bd5ff,0xf3f6ff,0xf3f6ff,0xff8c7a,0xff8c7a,0xf3f6ff][i],24));
 }else if(subject==="Fizika"){
  sphere(0,0,0,.28,0xff9b69,28);
  [0,.75,1.5].forEach((rot,i)=>{const o=makeOrbit(.8,rot,0x7acfff);o.rotation.y=rot;});
  for(let i=0;i<3;i++){const a=i*2.1;sphere(Math.cos(a)*.8,Math.sin(a)*.8,0,.085,0x7be2ff,18);}
 }else if(subject==="Geografiya"){
  sphere(0,0,0,1,0x2476c7,48);
  for(let i=0;i<5;i++){const lat=(-.65+i*.32);const r=Math.cos(lat);const y=Math.sin(lat);const band=mesh(new THREE.TorusGeometry(r,.025,6,80),new THREE.MeshBasicMaterial({color:0x79d6a5}));band.position.y=y;band.rotation.x=Math.PI/2;}
  const mer=mesh(new THREE.TorusGeometry(1.015,.012,6,80),new THREE.MeshBasicMaterial({color:0xb2e7ff,transparent:true,opacity:.7}));mer.rotation.y=.7;
 }else if(subject==="Texnologiya"){
  const board=mesh(new THREE.BoxGeometry(1.65,.16,1.35),material(0x164d60,.35,.65));board.position.y=-.18;
  const chip=mesh(new THREE.BoxGeometry(.7,.25,.7),material(0x25384e,.25,.8));chip.position.y=.08;
  for(let i=-2;i<=2;i++){lineBetween([i*.2,.08,-.55],[i*.2,.08,-.9],.018,material(accent));lineBetween([i*.2,.08,.55],[i*.2,.08,.9],.018,material(accent));}
  for(let i=0;i<4;i++){const led=sphere(-.58+i*.38,.16,.48,.055,0x73e9ff,12);}
 }else if(subject==="Tarix"){
  const stone=material(0xd6b989,.82,0);
  mesh(new THREE.BoxGeometry(1.9,.18,.9),stone,0,-.62,0);
  for(let i=-2;i<=2;i++)mesh(new THREE.CylinderGeometry(.105,.13,.95,20),stone,i*.34,-.05,0);
  mesh(new THREE.ConeGeometry(1.2,.48,4),stone,0,.68,0).rotation.y=Math.PI/4;
  mesh(new THREE.BoxGeometry(2.1,.12,1.05),stone,0,.4,0);
 }else if(subject==="Matematika"){
  const tor=mesh(new THREE.TorusKnotGeometry(.62,.18,120,16,2,3),new THREE.MeshStandardMaterial({color:accent,metalness:.55,roughness:.25}));
  root.userData.spin=tor;
  sphere(0,0,0,.08,0xffffff,16);
 }else if(subject==="Psixologiya"){
  const left=sphere(-.28,0,0,.58,0xd77db8,32);left.scale.set(.72,1,.72);
  const right=sphere(.28,0,0,.58,0x8c8ce5,32);right.scale.set(.72,1,.72);
  for(let i=0;i<7;i++){const y=-.42+i*.14;const ridge=mesh(new THREE.TorusGeometry(.28,.018,6,40),new THREE.MeshBasicMaterial({color:0xffd4ed}));ridge.position.set(-.3,y,.25);ridge.scale.set(.75,.55,1);}
 }else{
  sphere(0,0,0,.72,accent,40);makeOrbit(1.08,.7,0x9bdfff);
  for(let i=0;i<6;i++){const a=i*Math.PI/3;sphere(Math.cos(a)*1.05,Math.sin(a)*.72,.1,.09,0xd9f4ff,16);}
 }
}

function addFactSpecificObject(subject){
 const words=(val("title")+" "+val("announce")+" "+val("bodyText")+" "+val("evidence")).toLocaleLowerCase("uz");
 const addLabel=(s)=>{window.qfSceneCue=s;};
 const glow=(color)=>new THREE.MeshStandardMaterial({color,emissive:color,emissiveIntensity:.45,metalness:.3,roughness:.28});
 if(subject==="Astronomiya"){
  if(/qora tuynuk|black hole/.test(words)){
   clearRootContents();sphere(0,0,0,.42,0x02040b,48);
   const disk=mesh(new THREE.TorusGeometry(.92,.16,16,120),glow(0xff9c54));disk.rotation.x=.25;
   const halo=mesh(new THREE.TorusGeometry(.63,.035,8,100),new THREE.MeshBasicMaterial({color:0x7ddfff,transparent:true,opacity:.85}));halo.rotation.x=.25;addLabel("QORA TUYNUK");
  }else if(/oy|oyning|luna/.test(words)){
   clearRootContents();sphere(0,0,0,.78,0xb8c4d2,48);
   for(let i=0;i<12;i++){const a=i*2.4;const crater=sphere(Math.cos(a)*.53,Math.sin(a)*.48,.53,.09+(i%3)*.025,0x75869b,16);crater.scale.z=.25;}
   addLabel("OY SATHI");
  }else if(/quyosh|solar/.test(words)){
   clearRootContents();sphere(0,0,0,.76,0xffb43d,48);
   const corona=mesh(new THREE.TorusGeometry(.98,.045,8,100),new THREE.MeshBasicMaterial({color:0xffd47a,transparent:true,opacity:.65}));corona.rotation.x=.8;addLabel("QUYOSH");
  }else addLabel("SAYYORA VA ORBITA");
 }else if(subject==="Biologiya"){
  if(/dnk|dna|dezoksiribo/.test(words)){
   clearRootContents();const bond=material(0xc4d9ef,.5,.2);
   for(let i=0;i<15;i++){const t=i*.42,y=-1.25+i*.18,x=Math.cos(t)*.48,z=Math.sin(t)*.48; sphere(x,y,z,.075,0x6edcff,14);sphere(-x,y,-z,.075,0xf09bc9,14);lineBetween([x,y,z],[-x,y,-z],.018,bond);}
   addLabel("DNK QO‘SH SPIRALI");
  }else addLabel("HUJAYRA TUZILISHI");
 }else if(subject==="Kimyo"){
  if(/suv|h2o|vodorod|kislorod/.test(words)){
   clearRootContents();sphere(0,.1,0,.24,0xf2f7ff,24);sphere(-.48,-.28,0,.16,0xff6d77,24);sphere(.48,-.28,0,.16,0xff6d77,24);lineBetween([0,.1,0],[-.48,-.28,0],.045,material(0xb7d9f2));lineBetween([0,.1,0],[.48,-.28,0],.045,material(0xb7d9f2));addLabel("H₂O MOLEKULASI");
  }else addLabel("MOLEKULA MODELI");
 }else if(subject==="Fizika"){
  if(/magnit|magnet/.test(words)){
   clearRootContents();const north=mesh(new THREE.CylinderGeometry(.22,.22,.8,32),glow(0xff657a),-.48,0,0);north.rotation.z=Math.PI/2;const south=mesh(new THREE.CylinderGeometry(.22,.22,.8,32),glow(0x5e9fff),.48,0,0);south.rotation.z=Math.PI/2;
   for(let i=0;i<5;i++){const curve=new THREE.EllipseCurve(0,0,.6+i*.13,.25+i*.1,0,Math.PI*2,false,0);const pts=curve.getPoints(80).map(p=>new THREE.Vector3(p.x,p.y,.08));const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color:0x7de6ff,transparent:true,opacity:.65}));root.add(line);}
   addLabel("MAGNIT MAYDONI");
  }else addLabel("HARAKAT VA KUCH");
 }else if(subject==="Tarix"){
  if(/piramida|misr|fir'avn/.test(words)){clearRootContents();const stone=material(0xd6b989,.8,0);mesh(new THREE.ConeGeometry(1,.95,4),stone,0,-.05,0).rotation.y=Math.PI/4;mesh(new THREE.BoxGeometry(2.5,.12,1.2),stone,0,-.58,0);addLabel("QADIMGI MISR");}
  else addLabel("TARIXIY ME’MORCHILIK");
 }else if(subject==="Matematika"){
  if(/pi soni|π|aylana|doira/.test(words)){clearRootContents();const ring=mesh(new THREE.TorusGeometry(.8,.055,12,120),glow(0xa98bff));ring.rotation.x=.15;lineBetween([-.9,0,0],[.9,0,0],.012,material(0xe6dcff));addLabel("AYLANA GEOMETRIYASI");}
  else addLabel("GEOMETRIK SHAKL");
 }else if(subject==="Geografiya")addLabel(/vulqon|lava/.test(words)?"VULQON RELYEFI":"YER SHARI");
 else if(subject==="Texnologiya")addLabel(/sun'iy intellekt|ai|neyron/.test(words)?"NEYRON TARMOQ":"MIKROPROTSESSOR");
 else if(subject==="Psixologiya")addLabel(/xotira|memory/.test(words)?"XOTIRA JARAYONI":"IDROK MODELI");
 else addLabel("MAVZUGA MOS UMUMIY MODEL");
}
function applyCameraMode(){
 if(!camera)return;
 const mode=$("cameraMode")?.value||"front";
 const positions={front:[0,0,4.4],orbit:[3.4,2.1,4.5],top:[0,4.6,.01]};
 const p=positions[mode]||positions.front;camera.up.set(0,mode==="top"?0:1,mode==="top"?-1:0);camera.position.set(...p);camera.lookAt(0,0,0);
}
function applyStage(index){
 activeStage=index;
 const poses=[[0,0,4.4],[1.1,.25,4.1],[2,.9,4.4],[-1.2,.5,4.1],[0,0,5.1]];
 if(camera){const p=poses[index]||poses[0];const mode=$("cameraMode")?.value||"front";if(mode==="front")camera.position.set(...p);camera.lookAt(0,0,0);}
 document.querySelectorAll(".stage-step").forEach(b=>b.classList.toggle("active",Number(b.dataset.stage)===index));
 const names=["HOOK — e’tiborni tortish","FAKT — asosiy obyekt","MAZMUN — yaqinroq ko‘rinish","HOLAT — dalil va tafsilot","YAKUN — umumiy ko‘rinish"];
 $("timelineStatus").textContent=names[index]||"Bosqich";
}

async function start3D(){
 const status=$("sceneStatus"),subject=$("field").value==="Boshqa"?val("customField"):$("field").value;
 if(!subject){status.textContent="Avval fan yoki mavzu sohasini tanlang.";return;}
 if(!val("title")||!val("bodyText")){status.textContent="Faktga mos sahna yaratish uchun fakt sarlavhasi va mazmunini kiriting.";return;}
 if(subject==="Boshqa"||!colors[subject]){status.textContent="Bu soha uchun hozircha umumiy 3D obyekt ishlatiladi."; }
 else status.textContent="3D sahna yuklanmoqda…";
 try{
  if(!THREE)THREE=await import("https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js");
  if(!renderer){
   const canvas=$("sceneCanvas");renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
   renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.outputColorSpace=THREE.SRGBColorSpace;
   scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(38,1,.1,100);camera.position.set(0,0,4.4);
   scene.add(new THREE.HemisphereLight(0xb9eaff,0x10213a,2));
   const key=new THREE.DirectionalLight(0xffffff,3);key.position.set(3,4,5);scene.add(key);
   const fill=new THREE.PointLight(0x39bfff,18,10);fill.position.set(-3,-1,2);scene.add(fill);
   resizeObserver=new ResizeObserver(resize3D);resizeObserver.observe($("stage"));
   window.addEventListener("resize",resize3D);
   const animate=()=>{raf=requestAnimationFrame(animate);if(root&&!paused&&motionSpeed>0){root.rotation.y+=.0035*motionSpeed;root.rotation.x=Math.sin(Date.now()*.00035*motionSpeed)*.0015;}renderer.render(scene,camera);};
   animate();
  }
  if(root){scene.remove(root);root.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose());}});}
  makeScene(subject);currentSubject=subject;addFactSpecificObject(subject);resize3D();applyCameraMode();applyStage(activeStage);
  $("sceneLabel").textContent=(subject+" / "+(window.qfSceneCue||"UMUMIY SAHNA")).toLocaleUpperCase("uz");
  status.textContent="Fakt matniga mos sahna profili yaratildi. Kamera va ssenariy bosqichlarini boshqarishingiz mumkin.";
 }catch(error){
  console.error("QF 3D renderer:",error);
  status.textContent="3D dvigatel yuklanmadi. Internet/CDN yoki qurilmadagi WebGL qo‘llab-quvvatlashini tekshiring.";
  $("sceneLabel").textContent="3D YUKLANMADI";
 }
}
function resize3D(){
 if(!renderer||!camera)return;
 const box=$("stage").getBoundingClientRect(),w=Math.max(1,box.width),h=Math.max(1,box.height);
 renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();
}
$("render3d").addEventListener("click",start3D);
$("cameraMode").addEventListener("change",applyCameraMode);
$("motionSpeed").addEventListener("input",e=>{motionSpeed=Number(e.target.value);$("speedValue").textContent=motionSpeed.toFixed(1)+"×";});
$("pause3d").addEventListener("click",()=>{paused=!paused;$("pause3d").textContent=paused?"Animatsiyani davom ettirish":"Animatsiyani to‘xtatish";$("pause3d").setAttribute("aria-pressed",String(paused));});
document.querySelectorAll(".stage-step").forEach(b=>b.addEventListener("click",()=>applyStage(Number(b.dataset.stage))));
$("reset3d").addEventListener("click",()=>{if(root){root.rotation.set(0,0,0);}start3D();});
$("field").addEventListener("change",()=>{if(renderer)start3D();});
})();