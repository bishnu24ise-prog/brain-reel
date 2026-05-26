// ===== GROQ API =====
async function callGroq(messages){
  const key=$('apiKey').value.trim();
  if(!key){alert('Please enter your Groq API key');throw new Error('No API key');}
  const res=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+key},body:JSON.stringify({model:'llama3-70b-8192',messages,temperature:0.7,max_tokens:2048})});
  if(!res.ok)throw new Error('API error: '+res.status);
  const data=await res.json();return data.choices[0].message.content;
}

// ===== GENERATE LESSON =====
$('btnGenerate').onclick=async()=>{
  const topic=$('topicText').value.trim();
  if(!topic){alert('Please enter a topic or content');return;}
  const lang=$('langSelect').options[$('langSelect').selectedIndex].text;
  const style=$('styleSelect').value;
  log('Calling Groq API...');
  $('btnGenerate').disabled=true;$('btnGenerate').textContent='⏳ Generating...';
  try{
    const sysPrompt=`You are an expert teacher. Respond ONLY with valid JSON. No markdown, no backticks, no explanation outside the JSON.\nFormat:\n{"title":"string","language":"string","sections":[{"heading":"string","bulletPoints":["string","string","string"],"teacherScript":"string (what the teacher says aloud, in the selected language)","drawingInstructions":"boxes|timeline|cycle|comparison|none"}]}\nGenerate 4 sections. Style: ${style}. Keep teacherScript under 60 words per section. Respond in: ${lang}.`;
    let raw=await callGroq([{role:'system',content:sysPrompt},{role:'user',content:topic}]);
    raw=raw.replace(/```json\s*/gi,'').replace(/```\s*/g,'').trim();
    lesson=JSON.parse(raw);
    log('Script generated. '+lesson.sections.length+' sections ready.');
    saveHistory(topic.slice(0,100));
    currentSection=0;qaMode=false;$('qaSection').style.display='none';
    playLesson();
  }catch(e){log('ERROR: '+e.message);}
  finally{$('btnGenerate').disabled=false;$('btnGenerate').textContent='▶ Generate Lesson Video';}
};

// ===== PLAY LESSON =====
async function playLesson(){
  if(!lesson)return;
  for(let i=0;i<lesson.sections.length;i++){
    currentSection=i;
    const sec=lesson.sections[i];
    sec._typedHeading='';sec._shownBullets=0;sec._bulletAlpha=[];sec._diagramReady=false;
    log('Playing section '+(i+1)+'/'+lesson.sections.length+': '+sec.heading);
    emitParticles();
    // type heading
    for(let j=0;j<sec.heading.length;j++){sec._typedHeading+=sec.heading[j];await wait(40);}
    // show bullets
    for(let j=0;j<sec.bulletPoints.length;j++){sec._shownBullets=j+1;sec._bulletAlpha[j]=0;for(let a=0;a<=1;a+=0.1){sec._bulletAlpha[j]=a;await wait(30);}sec._bulletAlpha[j]=1;}
    sec._diagramReady=true;
    // speak
    await speak(sec.teacherScript);
    await wait(400);
  }
  // Q&A mode
  qaMode=true;$('qaSection').style.display='block';
  log('Q&A mode active. Ask a question below.');
}

function wait(ms){return new Promise(r=>setTimeout(r,ms));}

// ===== SPEECH =====
function speak(text){
  return new Promise(resolve=>{
    if(!window.speechSynthesis){log('WARNING: speechSynthesis not supported');resolve();return;}
    const u=new SpeechSynthesisUtterance(text);
    u.rate=parseFloat($('speedSlider').value);
    u.lang=$('langSelect').value;
    u.onstart=()=>{playing=true;};
    u.onend=()=>{playing=false;resolve();};
    u.onerror=()=>{playing=false;resolve();};
    speechSynthesis.speak(u);
  });
}

// ===== Q&A =====
$('qaInput').addEventListener('keydown',async e=>{
  if(e.key!=='Enter'||!qaMode)return;
  const q=$('qaInput').value.trim();if(!q)return;
  $('qaInput').value='';log('[Q&A] Student: '+q);
  try{
    const sysP='You are the teacher from this lesson. Answer the student\'s question in 2-3 sentences, in the same language as the lesson. Return plain text only.\n\nLesson context: '+JSON.stringify(lesson);
    const ans=await callGroq([{role:'system',content:sysP},{role:'user',content:q}]);
    log('[Q&A] Teacher: '+ans);
    await speak(ans);
  }catch(e){log('ERROR: '+e.message);}
});

// ===== RECORDING =====
$('btnRecord').onclick=()=>{
  if(!recording){
    try{
      const stream=canvas.captureStream(30);
      mediaRecorder=new MediaRecorder(stream,{mimeType:'video/webm'});
      recordedChunks=[];
      mediaRecorder.ondataavailable=e=>{if(e.data.size>0)recordedChunks.push(e.data);};
      mediaRecorder.onstop=()=>{const blob=new Blob(recordedChunks,{type:'video/webm'});blobUrl=URL.createObjectURL(blob);$('btnDownload').disabled=false;log('Recording stopped. File ready to download.');};
      mediaRecorder.start();recording=true;
      $('btnRecord').textContent='■ Stop Recording';log('Recording started.');
    }catch(e){log('ERROR: Recording not supported. '+e.message);}
  } else {
    mediaRecorder.stop();recording=false;$('btnRecord').textContent='● Start Recording';
  }
};

$('btnDownload').onclick=()=>{
  if(!blobUrl)return;
  const a=document.createElement('a');a.href=blobUrl;a.download='lesson-video.webm';a.click();
};

// ===== EXPORT SCRIPT =====
$('btnExport').onclick=()=>{
  if(!lesson){alert('Generate a lesson first');return;}
  let txt=lesson.title+'\n'+'='.repeat(40)+'\n\n';
  lesson.sections.forEach((s,i)=>{txt+='Section '+(i+1)+': '+s.heading+'\n';s.bulletPoints.forEach(b=>txt+='  • '+b+'\n');txt+='\nScript: '+s.teacherScript+'\n\n';});
  const blob=new Blob([txt],{type:'text/plain'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='lesson-script.txt';a.click();
};

// ===== QR CODE =====
$('btnQR').onclick=()=>{
  const topic=$('topicText').value.trim().slice(0,100);
  if(!topic){alert('Enter a topic first');return;}
  $('qrTarget').innerHTML='';
  new QRCode($('qrTarget'),{text:'AI Lesson: '+topic,width:200,height:200});
  $('qrPopup').style.display='flex';
};
$('qrPopup').onclick=e=>{if(e.target===$('qrPopup'))$('qrPopup').style.display='none';};

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown',e=>{
  const tag=document.activeElement.tagName;
  if(tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT')return;
  if(e.code==='Space'){e.preventDefault();if(speechSynthesis.speaking){speechSynthesis.paused?speechSynthesis.resume():speechSynthesis.pause();}}
  if(e.code==='KeyR')$('btnRecord').click();
  if(e.code==='KeyD'&&!$('btnDownload').disabled)$('btnDownload').click();
  if(e.code==='KeyQ'&&qaMode){$('qaInput').focus();e.preventDefault();}
});

// ===== MEDIA RECORDER CHECK =====
if(!window.MediaRecorder){$('btnRecord').style.display='none';$('btnDownload').style.display='none';log('WARNING: MediaRecorder not supported.');}
