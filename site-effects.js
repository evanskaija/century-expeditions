(() => {
const root=document.documentElement, motion=matchMedia('(prefers-reduced-motion: reduce)'), device=matchMedia('(prefers-color-scheme: dark)');
const saved=()=>{try{return localStorage.getItem('century-theme');}catch{return null;}};
function sync(){const mode=saved();root.dataset.theme=['light','dark'].includes(mode)?mode:device.matches?'dark':'light';document.querySelectorAll('.theme-toggle').forEach(b=>{b.setAttribute('aria-label',root.dataset.theme==='dark'?'Switch to light mode':'Switch to dark mode');b.setAttribute('aria-pressed',String(root.dataset.theme==='dark'));});}
sync();device.addEventListener('change',()=>{if(!saved()){sync();document.querySelectorAll('.theme-toggle').forEach(b=>b.innerHTML='<i class="fas fa-'+(root.dataset.theme==='dark'?'sun':'moon')+'" aria-hidden="true"></i>');}});
// Classify existing light surfaces without replacing photographs or dark image overlays.
const classified=new WeakSet();
function classify(scope){const all=[scope,...scope.querySelectorAll('*')];all.forEach(el=>{if(!(el instanceof HTMLElement)||classified.has(el)||el.closest('script,style,svg'))return;classified.add(el);const cs=getComputedStyle(el),rgb=cs.backgroundColor.match(/[\d.]+/g);if(rgb&&rgb.length>=3&&(rgb.length<4||Number(rgb[3])>.15)&&(Number(rgb[0])+Number(rgb[1])+Number(rgb[2]))/3>155)el.classList.add('site-light-surface');if(cs.backgroundImage.includes('gradient')&&!cs.backgroundImage.includes('url(')&&/rgba?\((?:2[0-5]\d|1[6-9]\d)/.test(cs.backgroundImage))el.classList.add('site-light-gradient');});}
// Classify against light styles even when arriving with a saved dark preference.
const previous=root.dataset.theme;root.dataset.theme='light';classify(document.body);root.dataset.theme=previous;
const targets='main h1,main h2,main h3,main img,main article,main section,main details,main [class*="card"],.section h2,.section img,.section [class*="card"],.footer-col';
const observed=new WeakSet();let sequence=0;
const io='IntersectionObserver'in window?new IntersectionObserver(entries=>entries.forEach(e=>{if(motion.matches){e.target.classList.remove('site-entering');return;}const current=e.target.getBoundingClientRect();if(current.bottom>0&&current.top<innerHeight){e.target.classList.add('site-in-view');e.target.classList.remove('site-entering');}else{const rect=current;if(rect.bottom<0||rect.top>innerHeight){e.target.classList.remove('site-in-view');e.target.classList.add('site-entering');}}}),{threshold:0,rootMargin:'0px'}):null;
function enhance(scope){classify(scope);if(!io)return;const elements=[...(scope.matches?.(targets)?[scope]:[]),...scope.querySelectorAll(targets)];elements.forEach(el=>{if(observed.has(el)||el.closest('header,nav,dialog,[role="dialog"],form,.tg-hero,.bp-hero,.sg-hero,[class*="marquee"],[class*="slider"],[class*="carousel"]')||el.matches('section')&&el.getBoundingClientRect().height>innerHeight*.75)return;observed.add(el);el.classList.add('site-reveal');el.dataset.enter=el.matches('section')?'bottom':['bottom','left','right','top'][sequence++%4];const rect=el.getBoundingClientRect();if(!motion.matches&&(rect.top>innerHeight||rect.bottom<0))el.classList.add('site-entering');io.observe(el);});}
enhance(document.body);
// Keep visibility in sync during programmatic jumps as well as ordinary scrolling.
let scrollFrame;
function refreshVisibility(){scrollFrame=null;document.querySelectorAll('.site-reveal').forEach(el=>{const rect=el.getBoundingClientRect();const visible=rect.bottom>0&&rect.top<innerHeight;el.classList.toggle('site-entering',!motion.matches&&!visible);el.classList.toggle('site-in-view',visible);});}
window.addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=setTimeout(refreshVisibility,40);},{passive:true});
window.addEventListener('resize',refreshVisibility,{passive:true});
new MutationObserver(records=>records.forEach(r=>r.addedNodes.forEach(n=>{if(n instanceof HTMLElement)enhance(n);}))).observe(document.body,{childList:true,subtree:true});
motion.addEventListener('change',()=>{if(motion.matches)document.querySelectorAll('.site-entering').forEach(el=>el.classList.remove('site-entering'));});
})();
