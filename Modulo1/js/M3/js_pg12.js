/* Datos */
const items = [
  'Flujo másico de mineral',
  'Nivel de pulpa',
  'Presión',
  'Densidad de pulpa',
  'Temperatura de aceite',
  'Flujo de agua'
];

const sampleAnswers = {
  'Flujo másico de mineral': {
    def: 'Cantidad de masa de mineral que pasa por un punto del circuito por unidad de tiempo (t/h o kg/s).',
    safe: 'Evitar sobrecarga de fajas y usar protecciones; si el flujo aumenta inesperadamente, detener alimentación y revisar equipos.'
  },
  'Nivel de pulpa': {
    def: 'Altura de la mezcla sólido-líquido en un tanque o pulper expresada en mm o porcentaje del volumen útil.',
    safe: 'Mantener niveles dentro de rango para evitar desbordes o falta de carga; activar alarmas y procedimientos de parada si el nivel es crítico.'
  },
  'Presión': {
    def: 'Fuerza por unidad de área ejercida por un fluido; en tuberías y recipientes se mide en bar o MPa.',
    safe: 'No exceder la presión máxima de diseño; usar válvulas de alivio y revisar manómetros antes de operar.'
  },
  'Densidad de pulpa': {
    def: 'Relación entre masa y volumen de la pulpa (kg/m³), influye en transporte y separación.',
    safe: 'Controlar para evitar bloqueo o sedimentación en bombas; usar bombas y tuberías adecuadas para la densidad medida.'
  },
  'Temperatura de aceite': {
    def: 'Temperatura del aceite en sistemas hidráulicos o de lubricación; afecta viscosidad y rendimiento.',
    safe: 'Mantener dentro de rango; temperatura alta puede indicar falla de enfriamiento — detener y revisar; evitar contacto con aceite caliente.'
  },
  'Flujo de agua': {
    def: 'Volumen de agua que circula por unidad de tiempo (m³/h o L/s).',
    safe: 'Garantizar caudal suficiente para enfriamiento y transporte; revisar válvulas y detectar fugas para prevenir inundaciones.'
  }
};

/* Canvas y dibujo (responsive) */
const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
let W = canvas.width, H = canvas.height;
let cx = W/2, cy = H/2, radius = Math.min(W,H)/2 - 10;
const sector = 360 / items.length;
const colors = ['#2A5BDF','#031794','#FF0000','#2A9D8F','#d7a321ff','#8A2BE2'];

// usado para marcar sectores ya salidos
const used = new Set();

function updateCanvasSize(){
  // tamaño basado en contenedor ancho, manteniendo cuadrado
  const container = canvas.parentElement;
  const maxSize = Math.min(520, container.clientWidth - 10);
  const size = Math.max(240, Math.floor(maxSize));
  canvas.width = size;
  canvas.height = size;
  W = canvas.width; H = canvas.height; cx = W/2; cy = H/2; radius = Math.min(W,H)/2 - 10;
  drawWheel(lastAngle);
}

window.addEventListener('resize', ()=>{
  updateCanvasSize();
});

function drawWheel(angleDeg=0){
  ctx.clearRect(0,0,W,H);
  ctx.save();
  ctx.translate(cx,cy);
  ctx.rotate(angleDeg * Math.PI/180);

  for(let i=0;i<items.length;i++){
    const start = (i * sector - sector/2) * Math.PI/180;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.arc(0,0,radius,start,start + sector*Math.PI/180,false);
    ctx.closePath();
    ctx.fillStyle = used.has(i) ? getComputedStyle(document.documentElement).getPropertyValue('--disabled').trim() : colors[i % colors.length];
    ctx.fill();

    // texto
    ctx.save();
    const textAngle = start + sector*Math.PI/180/2;
    ctx.rotate(textAngle);
    ctx.translate(radius*0.6,0);
    ctx.rotate(Math.PI/2);
    ctx.fillStyle = used.has(i) ? getComputedStyle(document.documentElement).getPropertyValue('--disabled-text').trim() : '#ffffff';
    ctx.font = `${Math.max(12, Math.round(radius/14))}px Arial`;
    ctx.textAlign = 'center';
    wrapText(ctx, items[i], 0, 0, Math.round(radius*0.9), Math.max(12, Math.round(radius/8)) + 2);
    ctx.restore();
  }

  // centro círculo
  ctx.beginPath();
  ctx.arc(0,0,Math.max(40, radius*0.18),0,2*Math.PI);
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fill();

  ctx.restore();

  // centro etiqueta
  ctx.fillStyle = 'var(--text)';
  ctx.font = `600 ${Math.max(12, Math.round(radius/10))}px Arial`;
  ctx.textAlign = 'center';
  ctx.fillText('Gira', cx, cy+Math.max(6, radius*0.03));
}

// helper para texto multilinea en canvas
function wrapText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let lines = [];
  for(let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      lines.push(line.trim());
      line = words[n] + ' ';
    }
    else {
      line = testLine;
    }
  }
  lines.push(line.trim());
  const startY = y - (lines.length-1) * (lineHeight/2);
  for(let i=0;i<lines.length;i++){
    context.fillText(lines[i], x, startY + i*lineHeight);
  }
}

// inicializa tamaño responsivo
let lastAngle = 0;
updateCanvasSize();

/* Animación de giro con lógica de bloqueo */
let spinning = false;
let spinRetries = 0;
function spinWheel(fullTurns=4){
  if(spinning) return;
  if(used.size >= items.length){
    alert('Todos los temas ya han salido — reinicia la actividad.');
    return;
  }
  spinning = true;
  spinRetries = 0;
  const extra = Math.random()*360;
  const start = lastAngle;
  const end = start + fullTurns*360 + extra;
  const duration = 2200 + Math.random()*1000;
  const startTime = performance.now();

  function animate(now){
    const t = Math.min(1,(now - startTime)/duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const current = start + (end - start) * eased;
    drawWheel(current);
    if(t < 1){
      requestAnimationFrame(animate);
    } else {
      spinning = false;
      lastAngle = end % 360;
      finishSpin(lastAngle);
    }
  }
  requestAnimationFrame(animate);
}

function finishSpin(angleNorm){
  const n = items.length;
  // puntero arriba = 270° (canvas coordinates)
  const raw = (270 - angleNorm) / sector;
  let idx = Math.round(raw) % n;
  if(idx < 0) idx += n;

  const pickedIndex = idx;
  const picked = items[pickedIndex];

  if(used.has(pickedIndex)){
    spinRetries++;
    const f = document.getElementById('feedback'); f.innerHTML = '';
    const note = document.createElement('div'); note.className='answer';
    note.innerHTML = `<strong>Nota:</strong> El tema "${picked}" ya fue seleccionado. Girando de nuevo para evitarlo...`;
    f.appendChild(note);
    if(spinRetries > 8){
      f.appendChild((() => {const d=document.createElement('div'); d.className='answer'; d.textContent='Intenta reiniciar si el problema persiste.'; return d})());
      return;
    }
    setTimeout(()=> spinWheel(3), 700);
    return;
  }

  used.add(pickedIndex);
  document.getElementById('selected').textContent = picked;
  document.getElementById('feedback').innerHTML = '';
  const hint = document.createElement('div');
  hint.className = 'answer';
  hint.innerHTML = '<strong>Medición:</strong> '+picked+" — di la definición y la condición de seguridad en voz alta antes de revelarlas.";
  document.getElementById('feedback').appendChild(hint);

  // actualizar dibujo con el ángulo final para marcar usado
  drawWheel(angleNorm);

  if(used.size >= items.length){
    console.log("ruleta terminada"); // <-- LÍNEA AÑADIDA
    document.getElementById('spin').disabled = true;
    document.getElementById('quick').disabled = true;
    const done = document.createElement('div'); done.className='answer'; done.innerHTML = '<strong>Todos los temas han salido.</strong> Pulsa Reiniciar para comenzar de nuevo.';
    document.getElementById('feedback').appendChild(done);
  }

  hideBoxes();
}

function hideBoxes(){
  const d = document.getElementById('defBox');
  const s = document.getElementById('safeBox');
  d.style.display = 'none'; d.setAttribute('aria-hidden','true'); d.textContent = '';
  s.style.display = 'none'; s.setAttribute('aria-hidden','true'); s.textContent = '';
  document.getElementById('toggleDef').textContent = 'Mostrar definición';
  document.getElementById('toggleSafe').textContent = 'Mostrar condición';
}

function showDefinitionText(text){
  const box = document.getElementById('defBox');
  box.textContent = text;
  box.style.display = 'block';
  box.setAttribute('aria-hidden','false');
  document.getElementById('toggleDef').textContent = 'Ocultar definición';
}
function showSafeText(text){
  const box = document.getElementById('safeBox');
  box.textContent = text;
  box.style.display = 'block';
  box.setAttribute('aria-hidden','false');
  document.getElementById('toggleSafe').textContent = 'Ocultar condición';
}

/* Eventos UI */
document.getElementById('spin').addEventListener('click', ()=> spinWheel(5));
document.getElementById('quick').addEventListener('click', ()=> spinWheel(2));
document.getElementById('reset').addEventListener('click', ()=>{
  used.clear();
  lastAngle = 0;
  document.getElementById('selected').textContent = '— gira la rueda —';
  document.getElementById('feedback').innerHTML = '';
  hideBoxes();
  document.getElementById('spin').disabled = false;
  document.getElementById('quick').disabled = false;
  drawWheel(0);
});

document.getElementById('toggleDef').addEventListener('click', ()=>{
  const sel = document.getElementById('selected').textContent;
  if(!items.includes(sel)){
    alert('Primero gira la rueda para seleccionar una medición.');
    return;
  }
  const box = document.getElementById('defBox');
  if(box.style.display === 'block') hideBoxes(); else showDefinitionText(sampleAnswers[sel].def);
});

document.getElementById('toggleSafe').addEventListener('click', ()=>{
  const sel = document.getElementById('selected').textContent;
  if(!items.includes(sel)){
    alert('Primero gira la rueda para seleccionar una medición.');
    return;
  }
  const box = document.getElementById('safeBox');
  if(box.style.display === 'block') hideBoxes(); else showSafeText(sampleAnswers[sel].safe);
});

document.getElementById('show').addEventListener('click', ()=>{
  const sel = document.getElementById('selected').textContent;
  if(!items.includes(sel)){
    alert('Primero gira la rueda para seleccionar una medición.');
    return;
  }
  const obj = sampleAnswers[sel];
  const f = document.getElementById('feedback'); f.innerHTML = '';
  const a1 = document.createElement('div'); a1.className='answer'; a1.innerHTML = '<strong>Definición sugerida:</strong> '+obj.def;
  const a2 = document.createElement('div'); a2.className='answer'; a2.innerHTML = '<strong>Condición de seguridad sugerida:</strong> '+obj.safe;
  f.appendChild(a1); f.appendChild(a2);
  showDefinitionText(obj.def);
  showSafeText(obj.safe);
});

document.getElementById('check').addEventListener('click', ()=>{
  const sel = document.getElementById('selected').textContent;
  if(!items.includes(sel)){
    alert('Primero gira la rueda para seleccionar una medición.');
    return;
  }
  const f = document.getElementById('feedback'); f.innerHTML = '';
  const note = document.createElement('div'); note.className='answer';
  note.innerHTML = '<strong>Consejo:</strong> Di la definición y la condición en voz alta. Si quieres comparar con el ejemplo, pulsa "Mostrar definición" o "Mostrar condición" o "Mostrar respuestas".';
  f.appendChild(note);
});

document.getElementById('clear').addEventListener('click', ()=>{
  document.getElementById('feedback').innerHTML = '';
  hideBoxes();
});