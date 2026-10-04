(() => {
 const cards = [...document.querySelectorAll('.pg-card')];
 const filters = [...document.querySelectorAll('[data-filter]')];
 const more = document.getElementById('load-photos');
 const count = document.getElementById('photo-count');
 const dialog = document.getElementById('photo-lightbox');
 const image = document.getElementById('lightbox-image');
 const caption = document.getElementById('lightbox-caption');
 let category = 'All', limit = 12, active = 0, opener;
 const matching = () => cards.filter(card => category === 'All' || card.dataset.category === category);
 function render() {
   const matches = matching();
   cards.forEach(card => { card.hidden = !matches.includes(card) || matches.indexOf(card) >= limit; });
   more.hidden = matches.length <= limit;
   count.textContent = 'Showing ' + Math.min(limit,matches.length) + ' of ' + matches.length + ' photos';
 }
 filters.forEach(button => button.addEventListener('click', () => {
   category = button.dataset.filter; limit = 12;
   filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
   render();
 }));
 more.addEventListener('click', () => {
   const previous = limit; limit += 12; render();
   matching()[previous]?.querySelector('button').focus();
 });
 function show(index) {
   const visible = cards.filter(card => !card.hidden);
   active = (index + visible.length) % visible.length;
   const card = visible[active], source = card.querySelector('img');
   image.src = source.src; image.alt = source.alt;
   caption.textContent = card.querySelector('figcaption').textContent + ' · ' + (active+1) + ' / ' + visible.length;
 }
 cards.forEach(card => card.querySelector('button').addEventListener('click', event => {
   opener = event.currentTarget;
   show(cards.filter(card => !card.hidden).indexOf(card));
   dialog.showModal(); document.body.style.overflow = 'hidden';
 }));
 dialog.querySelector('.pg-close').addEventListener('click', () => dialog.close());
 dialog.querySelector('.pg-prev').addEventListener('click', () => show(active-1));
 dialog.querySelector('.pg-next').addEventListener('click', () => show(active+1));
 dialog.addEventListener('keydown', event => {
   if(event.key === 'ArrowLeft') { event.preventDefault(); show(active-1); }
   if(event.key === 'ArrowRight') { event.preventDefault(); show(active+1); }
 });
 dialog.addEventListener('click', event => { if(event.target === dialog) dialog.close(); });
 dialog.addEventListener('close', () => { document.body.style.overflow = ''; opener?.focus(); });
 render();
})();