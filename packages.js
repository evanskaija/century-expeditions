(() => {
const trips=window.SAFARI_PACKAGES||[], $=id=>document.getElementById(id);
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=n=>'$'+Number(n).toLocaleString('en-US');
const choice=$('package-choice'),form=$('package-form');let viewed=null,panel='overview';
const enquirySource=new URLSearchParams(location.search).get('source')==='Tanzania Travel Guide'?'Tanzania Travel Guide':'Safari Packages & Itineraries';
const sourceField=document.createElement('input');sourceField.type='hidden';sourceField.name='enquiry_source';sourceField.value=enquirySource;form.append(sourceField);
const list=values=>'<ul>'+values.map(v=>'<li>'+escape(v)+'</li>').join('')+'</ul>';
const missing=label=>'<p class="pk-pending">'+label+' have not been supplied for this listing. Our reservations team will provide these in your written proposal.</p>';
function cards(){
 const type=$('filter-type').value,duration=$('filter-duration').value,budget=Number($('filter-budget').value);
 const filtered=trips.filter(p=>(!type||p.category===type)&&(!budget||p.price<=budget)&&(!duration||(duration==='short'?p.days<=7:duration==='medium'?p.days>=8&&p.days<=10:p.days>=11)));
 $('package-cards').innerHTML=filtered.map(p=>'<article class="pk-card"><img src="'+escape(p.image)+'" alt="'+escape(p.title)+'" loading="lazy"><div><div class="pk-category">'+escape(p.category)+'</div><h3>'+escape(p.title)+'</h3><p>'+p.days+' days · '+escape(p.category)+'</p><p>'+escape(p.highlights.join(' · '))+'</p><p class="pk-price">From '+money(p.price)+' / person</p><div class="pk-actions"><button type="button" data-view="'+p.id+'">View Trip</button><button type="button" data-select="'+p.id+'">Select Trip</button></div></div></article>').join('')+'<article class="pk-card pk-custom"><i class="fa-solid fa-tree" aria-hidden="true"></i><h3>Create Your Own Journey</h3><p>Choose your destinations, duration and travel style.</p><button class="sg-button" type="button" data-select="custom">Customise My Trip</button></article>';
 $('filter-status').textContent=filtered.length+' listed '+(filtered.length===1?'trip':'trips')+' match your filters. Custom Journey is always available.';
}
function summary(){
 const p=trips.find(t=>t.id===choice.value),custom=!p;
 $('summary-title').textContent=p?p.title:'Custom Journey';
 $('summary-photo').src=p?p.image:'assets/Zebla.jpg';$('summary-photo').alt=p?p.title:'Safari landscape';
 $('summary-duration').textContent=p?p.days+' days':($('custom-duration').value?$('custom-duration').value+' days':'Your dates. Your pace.');
 $('summary-price').textContent=p?'Indicative starting price: '+money(p.price)+' / person':'Personalised quotation';
 $('summary-highlights').textContent=p?p.highlights.join(' · '):($('custom-destinations').value||'Choose the places and experiences you love.');
 $('custom-fields').hidden=!custom;
 for(const id of ['custom-destinations','custom-duration']){$(id).disabled=!custom;$(id).required=custom;}
}
function select(id){choice.value=id;summary();$('package-enquiry').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});choice.focus({preventScroll:true});}
function detail(){
 const p=viewed;if(!p)return;
 let html='';
 if(panel==='overview')html='<p>'+escape(p.overview)+'</p><h3>Destinations</h3>'+list(p.destinations)+'<h3>Activities</h3>'+list(p.activities);
 if(panel==='itinerary')html=p.itinerary?'<ol>'+p.itinerary.map((day,i)=>'<li><strong>Day '+(i+1)+': '+escape(day.title)+'</strong><p>'+escape(day.description)+'</p></li>').join('')+'</ol>':missing('Daily itinerary details');
 if(panel==='stays')html='<h3>Accommodation</h3>'+(p.accommodation?list(p.accommodation):missing('Named accommodation and overnight arrangements'))+'<h3>Transport</h3>'+(p.transport?'<p>'+escape(p.transport)+'</p>':missing('Transport arrangements'));
 if(panel==='included')html='<h3>Inclusions</h3>'+(p.inclusions?list(p.inclusions):missing('Included services'))+'<h3>Exclusions</h3>'+(p.exclusions?list(p.exclusions):missing('Excluded services'))+'<h3>Pricing conditions</h3><p>Existing listing: from '+money(p.price)+' per person.</p>'+(p.priceConditions?'<p>'+escape(p.priceConditions)+'</p>':'<p class="pk-pending">The original listing does not specify travel season, occupancy, group size, included services or price validity. This starting price is indicative and is not a bookable quotation. Confirm all conditions with reservations.</p>');
 $('detail-content').innerHTML=html;
 document.querySelectorAll('[data-panel]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.panel===panel)));
}
function view(id){viewed=trips.find(t=>t.id===id);panel='overview';$('detail-title').textContent=viewed.title;$('detail-subtitle').textContent=viewed.days+' days · '+viewed.category;$('detail-photo').src=viewed.image;$('detail-photo').alt=viewed.title;$('trip-details').hidden=false;detail();$('trip-details').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
trips.forEach(p=>{const option=document.createElement('option');option.value=p.id;option.textContent=p.title+' — '+p.days+' days';choice.append(option);});
$('package-cards').addEventListener('click',e=>{const b=e.target.closest('button');if(b?.dataset.view)view(b.dataset.view);if(b?.dataset.select)select(b.dataset.select);});
$('detail-select').addEventListener('click',()=>select(viewed.id));
document.querySelectorAll('[data-panel]').forEach(b=>b.addEventListener('click',()=>{panel=b.dataset.panel;detail();}));
choice.addEventListener('change',summary);$('custom-destinations').addEventListener('input',summary);$('custom-duration').addEventListener('input',summary);
['filter-type','filter-duration','filter-budget'].forEach(id=>$(id).addEventListener('change',cards));
$('reset-filters').addEventListener('click',()=>{['filter-type','filter-duration','filter-budget'].forEach(id=>$(id).value='');cards();});
const date=new Date(),today=[date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');
$('package-arrival').min=today;$('package-departure').min=today;
$('package-arrival').addEventListener('change',()=>{$('package-departure').min=$('package-arrival').value||today;$('package-departure').setCustomValidity('');});
$('package-departure').addEventListener('change',()=>{$('package-departure').setCustomValidity('');});
$('package-children').addEventListener('input',()=>{$('children-ages').required=Number($('package-children').value)>0;$('children-ages').setCustomValidity('');});
$('children-ages').addEventListener('input',()=>{$('children-ages').setCustomValidity('');});
function persist(record){
 const records=JSON.parse(localStorage.getItem('century-package-enquiries')||'[]');
 const i=records.findIndex(r=>r.reference===record.reference);
 if(i>=0)records[i]=record;else records.push(record);
 localStorage.setItem('century-package-enquiries',JSON.stringify(records));
}
form.addEventListener('submit',async e=>{
 e.preventDefault();e.stopPropagation();
 const children=Number($('package-children').value),ages=$('children-ages').value.split(/[ ,]+/).filter(Boolean);
 $('children-ages').setCustomValidity(children>0&&(ages.length!==children||ages.some(age=>!/^\d+$/.test(age)||Number(age)>17))?'Enter one age from 0 to 17 for each child.':'');
 $('package-departure').setCustomValidity($('package-arrival').value&&$('package-departure').value&&$('package-departure').value<$('package-arrival').value?'End date must be on or after the start date.':'');
 if(!form.reportValidity())return;
 const data=new FormData(form),payload=Object.fromEntries(data.entries()),p=trips.find(t=>t.id===choice.value);
 const reference='CE-'+new Date().toISOString().slice(0,10).replaceAll('-','')+'-'+crypto.randomUUID().slice(0,8).toUpperCase();
 payload.package_title=p?p.title:'Custom Journey';payload.extensions=data.getAll('extensions').join(', ')||'None';
 payload.reference=reference;payload.form_name='Safari Package Enquiry';payload.replyto=payload.email;payload.source_page=location.href;
 if(!payload.botcheck)delete payload.botcheck;
 const record={reference,createdAt:new Date().toISOString(),status:'pending',details:{...payload}};
 delete record.details.access_key;
 const status=$('package-status'),button=form.querySelector('button[type="submit"]'),original=button.innerHTML;
 try{persist(record);}catch{status.textContent='This browser could not save your enquiry. Please allow local storage or contact bookings@century-adventures.com. Your details remain in the form.';return;}
 button.disabled=true;button.textContent='Sending your enquiry…';status.textContent='Sending your request to reservations…';
 try{
  const response=await fetch(form.action,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload)});
  const result=await response.json();if(!response.ok||!result.success)throw new Error('Delivery failed');
  record.status='submitted';try{persist(record);}catch{}
  form.reset();summary();
  status.textContent='Your enquiry has been sent. Reference: '+reference+'. Keep this reference. This is an enquiry, not a confirmed booking.';
 }catch{
  record.status='delivery_failed';try{persist(record);}catch{}
  status.textContent='Your enquiry was saved in this browser, but delivery failed. Please retry or contact bookings@century-adventures.com. Your form details have been kept.';
 }finally{button.disabled=false;button.innerHTML=original;}
});
cards();summary();
})();
