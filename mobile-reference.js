document.addEventListener('DOMContentLoaded',()=>{
const strip=document.querySelector('.strip-new-container');if(strip){const heading=document.createElement('div');heading.className='mobile-destinations-heading';heading.innerHTML='<h2>Popular Destinations</h2><a href="destinations.html">See All <i class="fas fa-arrow-right" aria-hidden="true"></i></a>';strip.prepend(heading);}
const nav=document.getElementById('mobileNavDrawer');if(nav){
const controls=document.createElement('div');controls.className='mobile-panel-controls';
const language=document.querySelector('.header-toggles .lang-toggle')?.innerHTML||'EN / SW';
const dark=document.documentElement.dataset.theme==='dark';
controls.innerHTML='<button type="button" class="lang-toggle" onclick="toggleLang(event)" aria-label="Switch between English and Swahili">'+language+'</button><button type="button" class="theme-toggle" onclick="toggleTheme(event)" aria-label="Switch to '+(dark?'light':'dark')+' mode" aria-pressed="'+dark+'"><i class="fas fa-'+(dark?'sun':'moon')+'" aria-hidden="true"></i><span class="menu-mode-label">'+(dark?'Light mode':'Dark mode')+'</span></button>';nav.append(controls);
const current=location.pathname.split('/').pop()||'index.html';
nav.querySelectorAll('li a').forEach(a=>{const active=a.getAttribute('href')===current&&!a.closest('.book-now-item');a.classList.toggle('menu-current',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
}
});
