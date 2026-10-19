(() => {
'use strict';
const cfg=window.ULIDO_CONFIG||{};
const $=id=>document.getElementById(id);
const pages=(cfg.pages||[]).filter(x=>typeof x==='string'&&x.trim());
document.documentElement.style.setProperty('--accent',cfg.accentColor||'#d7b47a');
document.documentElement.style.setProperty('--bg',cfg.backgroundColor||'#330e1d');
$('brand').textContent=cfg.brand||'ULIDO Digital Flipbook';$('title').textContent=cfg.title||'Undangan Digital';document.title=(cfg.title||'Flipbook')+' | ULIDO';$('subtitle').textContent=cfg.subtitle||'';
$('customer').textContent=cfg.customer||'Undangan Spesial';$('guestLabel').textContent=cfg.guestLabel||'Kepada Yth.';
const params=new URLSearchParams(location.search);$('guestName').textContent=(params.get('to')||cfg.defaultGuest||'Bapak/Ibu/Saudara/i').slice(0,160);
const wa=(cfg.whatsappNumber||'').replace(/\D/g,'');$('waLink').hidden=!wa;if(wa)$('waLink').href='https://wa.me/'+wa+'?text='+encodeURIComponent(cfg.whatsappMessage||'Halo');
let maps=cfg.mapsUrl||'';if(!/^https:\/\//i.test(maps))maps='';$('mapsLink').hidden=!maps;if(maps)$('mapsLink').href=maps;
const audio=$('bgMusic');if(cfg.backgroundMusic)audio.src=cfg.backgroundMusic;
let playing=false;function setMusicUi(){ $('musicBtn').innerHTML=playing?'♫ <span>Jeda</span>':'♫ <span>Musik</span>'; }
async function toggleMusic(force){if(!audio.src)return;try{if(force===false||playing&&force!==true){audio.pause();playing=false;}else{await audio.play();playing=true;}}catch(e){playing=false;console.info('Musik belum dapat diputar:',e.message);}setMusicUi();}
$('musicBtn').addEventListener('click',()=>toggleMusic());
$('openBtn').addEventListener('click',()=>{$('coverOverlay').classList.add('closed');if(cfg.autoplayMusicAfterOpen!==false)toggleMusic(true);});
$('shareBtn').addEventListener('click',async()=>{let url=location.href;try{if(navigator.share){await navigator.share({title:document.title,url});return;}if(navigator.clipboard){await navigator.clipboard.writeText(url);alert('Link berhasil disalin.');return;}}catch(e){if(e.name==='AbortError')return;}prompt('Salin link ini:',url);});
const book=$('book');let sheets=[],current=0,layout='double',busy=false,unlockTimer;
function pageFace(src,type){let f=document.createElement('div');f.className='face '+type+(src?'':' blank');if(src){let img=document.createElement('img');img.src=src;img.alt='Halaman buku';img.loading='eager';img.onerror=()=>{img.alt='Gambar tidak ditemukan';f.textContent='Gambar tidak ditemukan: '+src;f.style.color='#532';f.style.padding='18px';};f.appendChild(img);}return f;}
function build(){book.textContent='';sheets=[];const count=Math.ceil(pages.length/2);for(let i=0;i<count;i++){let sheet=document.createElement('div');sheet.className='sheet';sheet.append(pageFace(pages[2*i],'front'),pageFace(pages[2*i+1],'back'));sheet.addEventListener('click',()=>{if(i===current)next();else if(i===current-1)prev();});book.appendChild(sheet);sheets.push(sheet);}if(!pages.length){book.textContent='Belum ada halaman. Tambahkan gambar di config.js';return;}current=0;render();resize();}
function render(){sheets.forEach((s,i)=>{const flipped=i<current;s.classList.toggle('flipped',flipped);s.style.zIndex=flipped?i+1:sheets.length-i+1;});// Pusatkan halaman tunggal pada posisi awal dan akhir.
const pageWidth=parseFloat(getComputedStyle(book).getPropertyValue('--page-width'))||310;
const offset=current===0?-pageWidth/2:current===sheets.length?pageWidth/2:0;
book.style.transform=`translateX(${offset}px)`;
$('counter').textContent=(Math.min(current*2+1,pages.length))+'–'+Math.min(current*2+2,pages.length)+' / '+pages.length;$('prevBtn').disabled=current===0;$('nextBtn').disabled=current===sheets.length;}
function move(delta){if(busy)return;const nextIndex=Math.max(0,Math.min(sheets.length,current+delta));if(nextIndex===current)return;current=nextIndex;render();busy=true;clearTimeout(unlockTimer);unlockTimer=setTimeout(()=>busy=false,740);}
function next(){move(1)}function prev(){move(-1)}$('nextBtn').addEventListener('click',next);$('prevBtn').addEventListener('click',prev);
function resize(){if(!pages.length)return;const viewer=document.querySelector('.viewer');const maxW=Math.max(220,window.innerWidth-34),maxH=Math.max(240,viewer.clientHeight-12);const sampleRatio=0.707; // proporsi halaman A-series; gambar Anda mengikuti ukuran ini secara otomatis
let h=Math.min(maxH,maxW/(2*sampleRatio)),w=h*sampleRatio;book.style.setProperty('--page-width',w+'px');book.style.setProperty('--page-height',h+'px');render();}
let startX=null;book.addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX;},{passive:true});book.addEventListener('touchend',e=>{if(startX===null)return;const diff=e.changedTouches[0].clientX-startX;if(Math.abs(diff)>40){diff<0?next():prev();}startX=null;},{passive:true});
document.addEventListener('keydown',e=>{if(!$('zoomOverlay').hidden){if(e.key==='Escape')closeZoom();return;}if(!$('coverOverlay').classList.contains('closed'))return;if(e.key==='ArrowRight')next();if(e.key==='ArrowLeft')prev();});
$('fullBtn').addEventListener('click',()=>{if(!document.fullscreenElement){document.documentElement.requestFullscreen?.().catch(()=>{});}else document.exitFullscreen?.();});
function closeZoom(){$('zoomOverlay').hidden=true;document.body.style.overflow='';} $('zoomClose').addEventListener('click',closeZoom);$('zoomOverlay').addEventListener('click',e=>{if(e.target===$('zoomOverlay'))closeZoom();});
$('zoomBtn').addEventListener('click',()=>{if(!pages.length)return;let idx=Math.min(current*2,pages.length-1);$('zoomImage').src=pages[idx];$('zoomOverlay').hidden=false;document.body.style.overflow='hidden';});
window.addEventListener('resize',resize);build();
})();
