// ===== STATE =====
const $ = id => document.getElementById(id);
let lesson = null, currentSection = 0, playing = false, recording = false;
let mediaRecorder, recordedChunks = [], blobUrl = null;
let charType = 'professor', animFrame = 0, mouthOpen = false, armAngle = 0;
let particles = [], qaMode = false;
const canvas = $('mainCanvas'), ctx = canvas.getContext('2d');
const langMap = {'en-US':'English','hi-IN':'Hindi','es-ES':'Spanish','fr-FR':'French','de-DE':'German','ja-JP':'Japanese'};

// ===== LOGGING =====
function log(msg){ const l=$('statusLog'); l.value+=msg+'\n'; l.scrollTop=l.scrollHeight; }
log('Ready. Enter Groq API key and a topic.');

// ===== API KEY =====
$('apiKey').value = sessionStorage.getItem('groqKey')||'';
$('apiKey').addEventListener('input', e=>sessionStorage.setItem('groqKey',e.target.value));

// ===== SPEED SLIDER =====
$('speedSlider').addEventListener('input', e=>$('speedVal').textContent=parseFloat(e.target.value).toFixed(1));

// ===== FILE DROP =====
const dz=$('dropZone'), fi=$('fileInput');
dz.onclick=()=>fi.click();
dz.addEventListener('dragover',e=>{e.preventDefault();dz.classList.add('over')});
dz.addEventListener('dragleave',()=>dz.classList.remove('over'));
dz.addEventListener('drop',e=>{e.preventDefault();dz.classList.remove('over');handleFile(e.dataTransfer.files[0])});
fi.addEventListener('change',e=>{if(e.target.files[0])handleFile(e.target.files[0])});

async function handleFile(f){
  if(!f)return;
  if(f.name.endsWith('.txt')){
    const t=await f.text();
    $('topicText').value=t;
    $('dropInfo').textContent=f.name+' — '+t.length+' chars';
    log('File loaded: '+f.name+'. '+t.length+' characters.');
  } else if(f.name.endsWith('.pdf')){
    try{
      log('Parsing PDF...');
      pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      const pdf=await pdfjsLib.getDocument(URL.createObjectURL(f)).promise;
      let txt='';
      for(let i=1;i<=pdf.numPages;i++){const p=await pdf.getPage(i);const c=await p.getTextContent();txt+=c.items.map(x=>x.str).join(' ')+'\n';}
      $('topicText').value=txt;
      $('dropInfo').textContent=f.name+' — '+txt.length+' chars';
      log('Parsing PDF... done. '+txt.length+' characters extracted.');
    }catch(e){log('ERROR: PDF parse failed. '+e.message);}
  }
}

// ===== CHARACTER SELECT =====
document.querySelectorAll('.char-option').forEach(el=>{
  el.onclick=()=>{document.querySelectorAll('.char-option').forEach(x=>x.classList.remove('active'));el.classList.add('active');charType=el.dataset.char;drawCharPreview(el.querySelector('canvas'),el.dataset.char);}
});

// ===== HISTORY =====
function loadHistory(){
  const h=JSON.parse(sessionStorage.getItem('lessonHistory')||'[]');
  $('historyChips').innerHTML='';
  h.forEach(t=>{const c=document.createElement('div');c.className='chip';c.textContent=t.slice(0,30);c.title=t;c.onclick=()=>$('topicText').value=t;$('historyChips').appendChild(c);});
}
function saveHistory(topic){
  let h=JSON.parse(sessionStorage.getItem('lessonHistory')||'[]');
  h=h.filter(x=>x!==topic);h.unshift(topic);if(h.length>5)h.pop();
  sessionStorage.setItem('lessonHistory',JSON.stringify(h));loadHistory();
}
loadHistory();
