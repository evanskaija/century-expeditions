(() => {
  'use strict';

  const trips = window.SAFARI_PACKAGES || [];
  const $ = id => document.getElementById(id);
  const escape = value => String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));
  const money = value => '$' + Math.round(Number(value) || 0).toLocaleString('en-US');
  const choice = $('package-choice');
  const form = $('package-form');
  if (!choice || !form) return;

  let viewed = null;
  let panel = 'overview';
  const enquirySource = new URLSearchParams(location.search).get('source') === 'Tanzania Travel Guide'
    ? 'Tanzania Travel Guide'
    : 'Safari Packages & Itineraries';
  const sourceField = document.createElement('input');
  sourceField.type = 'hidden';
  sourceField.name = 'enquiry_source';
  sourceField.value = enquirySource;
  form.append(sourceField);

  const list = values => '<ul>' + values.map(value => '<li>' + escape(value) + '</li>').join('') + '</ul>';
  const missing = label => '<p class="pk-pending">' + label + ' have not been supplied for this listing. Our reservations team will provide these in your written proposal.</p>';

  function ensurePricingFields() {
    let cost = $('package-cost');
    if (!cost) {
      cost = document.createElement('div');
      cost.id = 'package-cost';
      cost.className = 'pk-cost-summary';
      cost.hidden = true;
      cost.innerHTML = '<div><span>Rate / person</span><strong id="summary-price-per-person"></strong></div>' +
        '<div><span>Travellers</span><strong id="summary-travellers"></strong></div>' +
        '<div class="pk-cost-total"><span>Estimated total</span><strong id="summary-total"></strong></div>' +
        '<small>Fixed listed rate x number of travellers.</small>';
      $('summary-price').after(cost);
    }
    [['price_per_person', 'package-price-per-person'], ['traveller_count', 'package-traveller-count'], ['estimated_total', 'package-estimated-total']].forEach(([name, id]) => {
      if (!$('' + id)) {
        const field = document.createElement('input');
        field.type = 'hidden';
        field.name = name;
        field.id = id;
        form.append(field);
      }
    });
  }

  function travellerCount() {
    const adults = Math.max(0, Number(form.querySelector('input[name="adults"]')?.value) || 0);
    const children = Math.max(0, Number($('package-children')?.value) || 0);
    return Math.max(1, adults + children);
  }

  function cards() {
    const type = $('filter-type').value;
    const duration = $('filter-duration').value;
    const budget = Number($('filter-budget').value);
    const filtered = trips.filter(trip =>
      (!type || trip.category === type) &&
      (!budget || trip.price <= budget) &&
      (!duration || (duration === 'short' ? trip.days <= 7 : duration === 'medium' ? trip.days >= 8 && trip.days <= 10 : trip.days >= 11))
    );
    $('package-cards').innerHTML = filtered.map(trip =>
      '<article class="pk-card">' +
        '<img src="' + escape(trip.image) + '" alt="' + escape(trip.title) + '" loading="lazy">' +
        '<div><div class="pk-category">' + escape(trip.category) + '</div>' +
        '<h3>' + escape(trip.title) + '</h3>' +
        '<p>' + trip.days + ' days - ' + escape(trip.category) + '</p>' +
        '<p>' + escape(trip.highlights.join(' - ')) + '</p>' +
        '<p class="pk-price">' + money(trip.price) + ' / person</p>' +
        '<div class="pk-actions"><button type="button" data-view="' + escape(trip.id) + '">View Trip</button>' +
        '<button type="button" data-select="' + escape(trip.id) + '">Select Trip</button></div></div>' +
      '</article>'
    ).join('') +
      '<article class="pk-card pk-custom"><i class="fa-solid fa-tree" aria-hidden="true"></i><h3>Create Your Own Journey</h3><p>Choose your destinations, duration and travel style.</p><button class="sg-button" type="button" data-select="custom">Customise My Trip</button></article>';
    $('filter-status').textContent = filtered.length + ' listed ' + (filtered.length === 1 ? 'trip' : 'trips') + ' match your filters. Custom Journey is always available.';
  }

  function summary() {
    const trip = trips.find(item => item.id === choice.value);
    const custom = !trip;
    const travellers = travellerCount();
    const total = trip ? Number(trip.price) * travellers : 0;
    const cost = $('package-cost');

    $('summary-title').textContent = trip ? trip.title : 'Custom Journey';
    $('summary-photo').src = trip ? trip.image : 'assets/Zebla.jpg';
    $('summary-photo').alt = trip ? trip.title : 'Safari landscape';
    $('summary-duration').textContent = trip ? trip.days + ' days' : ($('custom-duration').value ? $('custom-duration').value + ' days' : 'Your dates. Your pace.');
    $('summary-price').textContent = trip ? 'Fixed listed rate: ' + money(trip.price) + ' / person' : 'Personalised quotation';
    $('summary-highlights').textContent = trip ? trip.highlights.join(' - ') : ($('custom-destinations').value || 'Choose the places and experiences you love.');
    $('custom-fields').hidden = !custom;
    ['custom-destinations', 'custom-duration'].forEach(id => {
      $(id).disabled = !custom;
      $(id).required = custom;
    });

    cost.hidden = custom;
    $('summary-price-per-person').textContent = trip ? money(trip.price) : '';
    $('summary-travellers').textContent = trip ? String(travellers) : '';
    $('summary-total').textContent = trip ? money(total) : '';
    $('package-price-per-person').value = trip ? String(trip.price) : '';
    $('package-traveller-count').value = trip ? String(travellers) : '';
    $('package-estimated-total').value = trip ? String(total) : '';
  }

  function select(id) {
    choice.value = id;
    summary();
    $('package-enquiry').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    choice.focus({ preventScroll: true });
  }

  function detail() {
    const trip = viewed;
    if (!trip) return;
    let html = '';
    if (panel === 'overview') {
      html = '<p>' + escape(trip.overview) + '</p><h3>Destinations</h3>' + list(trip.destinations) + '<h3>Activities</h3>' + list(trip.activities);
    }
    if (panel === 'itinerary') {
      html = trip.itinerary
        ? '<ol>' + trip.itinerary.map((day, index) => '<li><strong>Day ' + (index + 1) + ': ' + escape(day.title) + '</strong><p>' + escape(day.description) + '</p></li>').join('') + '</ol>'
        : missing('Daily itinerary details');
    }
    if (panel === 'stays') {
      html = '<h3>Accommodation</h3>' + (trip.accommodation ? list(trip.accommodation) : missing('Named accommodation and overnight arrangements')) +
        '<h3>Transport</h3>' + (trip.transport ? '<p>' + escape(trip.transport) + '</p>' : missing('Transport arrangements'));
    }
    if (panel === 'included') {
      html = '<h3>Inclusions</h3>' + (trip.inclusions ? list(trip.inclusions) : missing('Included services')) +
        '<h3>Exclusions</h3>' + (trip.exclusions ? list(trip.exclusions) : missing('Excluded services')) +
        '<h3>Pricing</h3><p>Fixed listed rate: ' + money(trip.price) + ' per person. The enquiry summary calculates this rate multiplied by the number of travellers.</p>' +
        (trip.priceConditions ? '<p>' + escape(trip.priceConditions) + '</p>' : '<p class="pk-pending">Final inclusions, travel dates, availability and booking conditions are confirmed by reservations in your written proposal.</p>');
    }
    $('detail-content').innerHTML = html;
    document.querySelectorAll('[data-panel]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.panel === panel)));
  }

  function view(id) {
    viewed = trips.find(trip => trip.id === id);
    if (!viewed) return;
    panel = 'overview';
    $('detail-title').textContent = viewed.title;
    $('detail-subtitle').textContent = viewed.days + ' days - ' + viewed.category + ' - ' + money(viewed.price) + ' / person';
    $('detail-photo').src = viewed.image;
    $('detail-photo').alt = viewed.title;
    $('trip-details').hidden = false;
    detail();
    $('trip-details').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  ensurePricingFields();
  const packageNote = document.querySelector('.pk-note');
  if (packageNote) packageNote.textContent = 'Every listed trip has a fixed displayed rate per traveller. The enquiry summary calculates the estimated total as the rate per person multiplied by adults and children. Included services, price basis and final availability are confirmed in your written proposal.';
  trips.forEach(trip => {
    const option = document.createElement('option');
    option.value = trip.id;
    option.textContent = trip.title + ' - ' + trip.days + ' days';
    choice.append(option);
  });
  $('package-cards').addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.view) view(button.dataset.view);
    if (button.dataset.select) select(button.dataset.select);
  });
  $('detail-select').addEventListener('click', () => viewed && select(viewed.id));
  document.querySelectorAll('[data-panel]').forEach(button => button.addEventListener('click', () => {
    panel = button.dataset.panel;
    detail();
  }));
  choice.addEventListener('change', summary);
  form.querySelector('input[name="adults"]')?.addEventListener('input', summary);
  $('package-children').addEventListener('input', () => {
    $('children-ages').required = Number($('package-children').value) > 0;
    $('children-ages').setCustomValidity('');
    summary();
  });
  $('custom-destinations').addEventListener('input', summary);
  $('custom-duration').addEventListener('input', summary);
  ['filter-type', 'filter-duration', 'filter-budget'].forEach(id => $(id).addEventListener('change', cards));
  $('reset-filters').addEventListener('click', () => {
    ['filter-type', 'filter-duration', 'filter-budget'].forEach(id => $(id).value = '');
    cards();
  });

  const date = new Date();
  const today = [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
  $('package-arrival').min = today;
  $('package-departure').min = today;
  $('package-arrival').addEventListener('change', () => {
    $('package-departure').min = $('package-arrival').value || today;
    $('package-departure').setCustomValidity('');
  });
  $('package-departure').addEventListener('change', () => $('package-departure').setCustomValidity(''));
  $('children-ages').addEventListener('input', () => $('children-ages').setCustomValidity(''));

  const requestedTrip = new URLSearchParams(location.search).get('trip');
  if (trips.some(trip => trip.id === requestedTrip)) choice.value = requestedTrip;

  // Carry Safari Assistant preferences into the enquiry form. Values arrive only from
  // the visitor's own browser query string and are still reviewable before submission.
  const assistantParams = new URLSearchParams(location.search);
  if (assistantParams.get('assistant') === '1') {
    const prefill = (selector, value) => {
      const field = form.querySelector(selector);
      if (field && value) field.value = value;
    };
    prefill('input[name="arrival_date"]', assistantParams.get('arrival_date'));
    prefill('input[name="departure_date"]', assistantParams.get('departure_date'));
    prefill('input[name="adults"]', assistantParams.get('adults'));
    prefill('input[name="budget_per_person"]', assistantParams.get('budget_per_person'));
    prefill('select[name="accommodation"]', assistantParams.get('accommodation'));
    const assistantMessage = assistantParams.get('message');
    const messageField = form.querySelector('textarea[name="message"]');
    if (messageField && assistantMessage && !messageField.value) messageField.value = assistantMessage;
  }

  function persist(record) {
    const records = JSON.parse(localStorage.getItem('century-package-enquiries') || '[]');
    const index = records.findIndex(item => item.reference === record.reference);
    if (index >= 0) records[index] = record;
    else records.push(record);
    localStorage.setItem('century-package-enquiries', JSON.stringify(records));
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    event.stopPropagation();
    const children = Number($('package-children').value);
    const ages = $('children-ages').value.split(/[ ,]+/).filter(Boolean);
    $('children-ages').setCustomValidity(children > 0 && (ages.length !== children || ages.some(age => !/^\d+$/.test(age) || Number(age) > 17)) ? 'Enter one age from 0 to 17 for each child.' : '');
    $('package-departure').setCustomValidity($('package-arrival').value && $('package-departure').value && $('package-departure').value < $('package-arrival').value ? 'End date must be on or after the start date.' : '');
    if (!form.reportValidity()) return;

    summary();
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    const trip = trips.find(item => item.id === choice.value);
    const reference = 'CE-' + new Date().toISOString().slice(0, 10).replaceAll('-', '') + '-' + crypto.randomUUID().slice(0, 8).toUpperCase();
    payload.package_title = trip ? trip.title : 'Custom Journey';
    payload.extensions = data.getAll('extensions').join(', ') || 'None';
    payload.reference = reference;
    payload.form_name = 'Safari Package Enquiry';
    payload.replyto = payload.email;
    payload.source_page = location.href;
    if (!payload.botcheck) delete payload.botcheck;
    const record = { reference, createdAt: new Date().toISOString(), status: 'pending', details: { ...payload } };
    delete record.details.access_key;
    const status = $('package-status');
    const button = form.querySelector('button[type="submit"]');
    const original = button.innerHTML;
    try {
      persist(record);
    } catch {
      status.textContent = 'This browser could not save your enquiry. Please allow local storage or contact bookings@century-adventures.com. Your details remain in the form.';
      return;
    }
    button.disabled = true;
    button.textContent = 'Sending your enquiry...';
    status.textContent = 'Sending your request to reservations...';
    try {
      const response = await fetch(form.action, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error('Delivery failed');
      record.status = 'submitted';
      try { persist(record); } catch {}
      form.reset();
      choice.value = 'custom';
      summary();
      status.textContent = 'Your enquiry has been sent. Reference: ' + reference + '. Keep this reference. This is an enquiry, not a confirmed booking.';
    } catch {
      record.status = 'delivery_failed';
      try { persist(record); } catch {}
      status.textContent = 'Your enquiry was saved in this browser, but delivery failed. Please retry or contact bookings@century-adventures.com. Your form details have been kept.';
    } finally {
      button.disabled = false;
      button.innerHTML = original;
    }
  });

  cards();
  summary();
  if (assistantParams.get('assistant') === '1') {
    setTimeout(() => {
      $('package-enquiry').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 180);
  }
})();
