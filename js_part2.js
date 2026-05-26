// ===== DRAW CHARACTER PREVIEW =====
function drawCharPreview(c,type){
  const x=c.getContext('2d');x.clearRect(0,0,50,50);
  if(type==='professor'){x.fillStyle='#2c3e50';x.fillRect(17,22,16,18);x.fillStyle='#f5cba7';x.beginPath();x.arc(25,16,10,0,Math.PI*2);x.fill();x.strokeStyle='#333';x.lineWidth=1.5;x.beginPath();x.arc(21,15,3,0,Math.PI*2);x.stroke();x.beginPath();x.arc(29,15,3,0,Math.PI*2);x.stroke();x.beginPath();x.moveTo(24,15);x.lineTo(26,15);x.stroke();x.fillStyle='#c0392b';x.beginPath();x.moveTo(25,25);x.lineTo(23,32);x.lineTo(27,32);x.fill();}
  else if(type==='robot'){x.fillStyle='#95a5a6';x.fillRect(15,20,20,20);x.fillRect(18,10,14,12);x.fillStyle='#00e5ff';x.fillRect(21,14,3,3);x.fillRect(27,14,3,3);x.fillStyle='#e74c3c';x.beginPath();x.arc(25,6,2,0,Math.PI*2);x.fill();x.strokeStyle='#95a5a6';x.lineWidth=2;x.beginPath();x.moveTo(25,10);x.lineTo(25,6);x.stroke();}
  else{x.fillStyle='#ecf0f1';x.fillRect(17,22,16,20);x.fillStyle='#bdc3c7';x.beginPath();x.arc(25,16,12,0,Math.PI*2);x.fill();x.fillStyle='rgba(52,152,219,0.3)';x.beginPath();x.arc(25,16,9,0,Math.PI*2);x.fill();x.fillStyle='#f5cba7';x.beginPath();x.arc(25,16,6,0,Math.PI*2);x.fill();}
}
document.querySelectorAll('.char-option').forEach(el=>drawCharPreview(el.querySelector('canvas'),el.dataset.char));

// ===== MAIN CANVAS DRAWING =====
function drawTeacher(t){
  const cx=canvas.width*0.2, cy=canvas.height*0.55, bounce=Math.sin(t/1000)*3;
  ctx.save();ctx.translate(cx,cy+bounce);
  if(charType==='professor'){
    ctx.fillStyle='#2c3e50';ctx.fillRect(-25,0,50,60);ctx.fillStyle='#3498db';ctx.fillRect(-20,5,40,50);
    ctx.fillStyle='#c0392b';ctx.beginPath();ctx.moveTo(0,5);ctx.lineTo(-6,35);ctx.lineTo(6,35);ctx.fill();
    ctx.fillStyle='#f5cba7';ctx.beginPath();ctx.arc(0,-25,22,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#8B4513';ctx.beginPath();ctx.arc(0,-30,22,Math.PI,2*Math.PI);ctx.fill();
    ctx.strokeStyle='#333';ctx.lineWidth=2;ctx.beginPath();ctx.arc(-8,-25,6,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.arc(8,-25,6,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(-2,-25);ctx.lineTo(2,-25);ctx.stroke();
    ctx.fillStyle='#2c3e50';ctx.fillRect(-30,60,22,40);ctx.fillRect(8,60,22,40);ctx.fillStyle='#1a1a1a';ctx.fillRect(-30,95,22,10);ctx.fillRect(8,95,22,10);
    // pointing arm
    ctx.save();ctx.translate(25,5);ctx.rotate(-0.5+Math.sin(armAngle)*0.3);ctx.fillStyle='#2c3e50';ctx.fillRect(0,-5,50,10);ctx.restore();
    // mouth
    ctx.fillStyle='#c0392b';if(mouthOpen){ctx.beginPath();ctx.ellipse(0,-18,5,4,0,0,Math.PI*2);ctx.fill();}else{ctx.fillRect(-4,-20,8,2);}
  } else if(charType==='robot'){
    ctx.fillStyle='#7f8c8d';ctx.fillRect(-30,0,60,65);ctx.fillStyle='#e74c3c';ctx.beginPath();ctx.arc(-12,20,4,0,Math.PI*2);ctx.fill();ctx.fillStyle='#2ecc71';ctx.beginPath();ctx.arc(0,20,4,0,Math.PI*2);ctx.fill();ctx.fillStyle='#3498db';ctx.beginPath();ctx.arc(12,20,4,0,Math.PI*2);ctx.fill();
    // head
    const r=6;ctx.beginPath();ctx.moveTo(-22,-5);ctx.arcTo(22,-5,22,-45,r);ctx.arcTo(22,-45,-22,-45,r);ctx.arcTo(-22,-45,-22,-5,r);ctx.arcTo(-22,-5,22,-5,r);ctx.fillStyle='#95a5a6';ctx.fill();
    // antenna
    ctx.strokeStyle='#7f8c8d';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,-45);ctx.lineTo(0,-58);ctx.stroke();ctx.fillStyle='#e74c3c';ctx.beginPath();ctx.arc(0,-60,4,0,Math.PI*2);ctx.fill();
    // eyes
    const blink=Math.random()>0.97;ctx.fillStyle='#00e5ff';if(!blink){ctx.fillRect(-14,-35,8,6);ctx.fillRect(6,-35,8,6);}
    // mouth
    if(mouthOpen){ctx.fillStyle='#00e5ff';for(let i=-12;i<=12;i+=6)ctx.fillRect(i,-18,4,4);}else{ctx.fillStyle='#555';ctx.fillRect(-12,-18,24,3);}
    // arm
    ctx.save();ctx.translate(30,10);ctx.rotate(-0.3+Math.sin(armAngle)*0.3);ctx.fillStyle='#7f8c8d';ctx.fillRect(0,-5,45,10);ctx.restore();
  } else {
    ctx.fillStyle='#ecf0f1';ctx.fillRect(-28,0,56,70);ctx.fillStyle='#e74c3c';ctx.fillRect(-28,0,10,15);ctx.fillRect(18,0,10,15);
    ctx.fillStyle='#bdc3c7';ctx.beginPath();ctx.arc(0,-25,28,0,Math.PI*2);ctx.fill();ctx.fillStyle='rgba(52,152,219,0.25)';ctx.beginPath();ctx.arc(0,-25,22,0,Math.PI*2);ctx.fill();ctx.fillStyle='#f5cba7';ctx.beginPath();ctx.arc(0,-22,14,0,Math.PI*2);ctx.fill();
    if(mouthOpen){ctx.fillStyle='#c0392b';ctx.beginPath();ctx.ellipse(0,-16,4,3,0,0,Math.PI*2);ctx.fill();}else{ctx.fillStyle='#c0392b';ctx.fillRect(-3,-17,6,2);}
    ctx.save();ctx.translate(28,10);ctx.rotate(-0.4+Math.sin(armAngle)*0.25);ctx.fillStyle='#ecf0f1';ctx.fillRect(0,-7,45,14);ctx.restore();
  }
  ctx.restore();
}

function drawWhiteboard(t){
  const wx=canvas.width*0.42,wy=20,ww=canvas.width*0.55,wh=canvas.height-40;
  ctx.shadowColor='rgba(0,0,0,0.3)';ctx.shadowBlur=10;ctx.fillStyle='#fff';ctx.fillRect(wx,wy,ww,wh);ctx.shadowBlur=0;
  ctx.strokeStyle='#333';ctx.lineWidth=2;ctx.strokeRect(wx,wy,ww,wh);
  if(!lesson)return;
  const sec=lesson.sections[currentSection];if(!sec)return;
  const px=wx+20,py=wy+30;
  // heading
  ctx.fillStyle='#1a3a2a';ctx.font='bold 20px system-ui';
  const headText=sec._typedHeading||sec.heading;
  ctx.fillText(headText,px,py,ww-40);
  // bullets
  ctx.font='15px system-ui';ctx.fillStyle='#333';
  const shown=sec._shownBullets||0;
  for(let i=0;i<shown&&i<sec.bulletPoints.length;i++){
    const by=py+35+i*28;ctx.globalAlpha=sec._bulletAlpha?sec._bulletAlpha[i]:1;
    ctx.fillText('• '+sec.bulletPoints[i],px+5,by,ww-50);ctx.globalAlpha=1;
  }
  // diagram
  if(sec._diagramReady&&sec.drawingInstructions!=='none') drawDiagram(sec.drawingInstructions,wx+20,py+35+sec.bulletPoints.length*28+15,ww-40,100,sec);
  // progress dots
  for(let i=0;i<lesson.sections.length;i++){
    ctx.beginPath();ctx.arc(wx+ww/2-lesson.sections.length*8+i*16,wy+wh-15,5,0,Math.PI*2);
    ctx.fillStyle=i<=currentSection?'#2d7a4f':'#ccc';ctx.fill();
  }
}

function drawDiagram(type,x,y,w,h,sec){
  ctx.save();ctx.strokeStyle='#2d7a4f';ctx.fillStyle='#2d7a4f';ctx.lineWidth=1.5;ctx.font='12px system-ui';
  const labels=sec.bulletPoints.slice(0,3);
  if(type==='boxes'){
    const bw=w/labels.length-15;
    labels.forEach((l,i)=>{const bx=x+i*(bw+15);ctx.strokeRect(bx,y,bw,35);ctx.fillText(l.slice(0,15),bx+5,y+22,bw-10);if(i<labels.length-1){ctx.beginPath();ctx.moveTo(bx+bw,y+17);ctx.lineTo(bx+bw+15,y+17);ctx.stroke();ctx.beginPath();ctx.moveTo(bx+bw+10,y+12);ctx.lineTo(bx+bw+15,y+17);ctx.lineTo(bx+bw+10,y+22);ctx.fill();}});
  } else if(type==='timeline'){
    ctx.beginPath();ctx.moveTo(x,y+20);ctx.lineTo(x+w,y+20);ctx.stroke();
    labels.forEach((l,i)=>{const dx=x+i*(w/(labels.length-1||1));ctx.beginPath();ctx.arc(dx,y+20,5,0,Math.PI*2);ctx.fill();ctx.fillText(l.slice(0,18),dx-20,y+40,60);});
  } else if(type==='cycle'){
    const cx2=x+w/2,cy2=y+h/2,r=Math.min(w,h)/2.5;
    labels.forEach((l,i)=>{const a=(i/labels.length)*Math.PI*2-Math.PI/2;const lx=cx2+Math.cos(a)*r,ly=cy2+Math.sin(a)*r;ctx.beginPath();ctx.arc(lx,ly,18,0,Math.PI*2);ctx.stroke();ctx.fillText(l.slice(0,12),lx-18,ly+4,36);});
    ctx.beginPath();ctx.arc(cx2,cy2,r,0,Math.PI*2);ctx.strokeStyle='#aaa';ctx.stroke();
  } else if(type==='comparison'){
    ctx.strokeRect(x,y,w/2-5,h);ctx.strokeRect(x+w/2+5,y,w/2-5,h);
    if(labels[0])ctx.fillText(labels[0].slice(0,20),x+5,y+20,w/2-15);
    if(labels[1])ctx.fillText(labels[1].slice(0,20),x+w/2+10,y+20,w/2-15);
  }
  ctx.restore();
}

function drawParticles(){
  particles=particles.filter(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=0.15;p.life-=16;p.alpha=Math.max(0,p.life/600);
    ctx.globalAlpha=p.alpha;ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,3,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;return p.life>0;});
}

function emitParticles(){
  const px=canvas.width*0.2+60,py=canvas.height*0.55-15;
  for(let i=0;i<8;i++) particles.push({x:px,y:py,vx:(Math.random()-0.3)*5,vy:-Math.random()*4-2,life:600,alpha:1,color:['#e74c3c','#f39c12','#2ecc71','#3498db','#9b59b6'][i%5]});
}

// ===== ANIMATION LOOP =====
let lastMouthToggle=0;
function animate(t){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  armAngle+=0.02;
  if(playing&&t-lastMouthToggle>150){mouthOpen=!mouthOpen;lastMouthToggle=t;}
  if(!playing)mouthOpen=false;
  drawTeacher(t);drawWhiteboard(t);drawParticles();
  animFrame=requestAnimationFrame(animate);
}
animFrame=requestAnimationFrame(animate);
