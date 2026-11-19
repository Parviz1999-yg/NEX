(()=>{"use strict";
async function render({duration,draw}){
 if(!HTMLCanvasElement.prototype.captureStream||!window.MediaRecorder)throw Error("Bu brauzer avtomatik video eksportini qo‘llab-quvvatlamaydi. Ekran yozuv rejimidan foydalaning.");
 const candidates=["video/webm;codecs=vp9","video/webm;codecs=vp8","video/webm","video/mp4;codecs=avc1.42E01E","video/mp4"];
 let mime="";
 for(const type of candidates){try{if(MediaRecorder.isTypeSupported(type)){mime=type;break;}}catch(e){}}
 if(!mime)throw Error("Brauzer mos video kodekini topmadi. Ekran yozuv rejimidan foydalaning.");
 const canvas=document.createElement("canvas");canvas.width=1080;canvas.height=1920;
 const ctx=canvas.getContext("2d",{alpha:false});if(!ctx)throw Error("Canvas kontekstini yaratib bo‘lmadi.");
 const stream=canvas.captureStream(30);let recorder;
 try{recorder=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:5000000});}
 catch(e){stream.getTracks().forEach(t=>t.stop());throw Error("Video yozuvchisini ishga tushirib bo‘lmadi: "+(e.message||"kodek xatosi"));}
 const chunks=[];
 const finished=new Promise((resolve,reject)=>{
  recorder.ondataavailable=e=>{if(e.data&&e.data.size)chunks.push(e.data);};
  recorder.onerror=e=>reject(new Error("Brauzer video yozishda xato berdi."));
  recorder.onstop=()=>{const blob=new Blob(chunks,{type:recorder.mimeType||mime});blob.size?resolve(blob):reject(new Error("Video fayli bo‘sh hosil bo‘ldi."));};
 });
 const sceneDuration=Math.max(1,Number(duration)||4)*1000,total=sceneDuration*5,start=performance.now();
 try{
  recorder.start(1000);
  await new Promise((resolve,reject)=>{
   let lastScene=-1;
   function frame(now){
    if(recorder.state!=="recording"){reject(new Error("Video yozish kutilmaganda to‘xtadi."));return;}
    const elapsed=now-start,index=Math.min(4,Math.floor(elapsed/sceneDuration));
    const sceneElapsed=Math.max(0,elapsed-index*sceneDuration),progress=Math.min(1,sceneElapsed/sceneDuration);
    try{draw(ctx,now,index,progress);}catch(error){reject(error);return;}
    lastScene=index;
    if(elapsed>=total){try{recorder.requestData();recorder.stop();resolve();}catch(error){reject(error);}return;}
    requestAnimationFrame(frame);
   }
   requestAnimationFrame(frame);
  });
  const blob=await finished;
  const actualMime=blob.type||mime,ext=actualMime.toLowerCase().includes("mp4")?"mp4":"webm";
  return{blob,mime:actualMime,ext,filename:"nex-reels-"+Date.now()+"."+ext};
 }catch(error){if(recorder.state==="recording")recorder.stop();throw error;}
 finally{stream.getTracks().forEach(t=>t.stop());}
}
window.NEXExport={render};
})();