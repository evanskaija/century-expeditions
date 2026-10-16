(() => {
  'use strict';

  if (window.__centuryAssistantLoaded) return;
  window.__centuryAssistantLoaded = true;

  const CONTACT = {
    whatsapp: 'https://wa.me/255747115390',
    phone: '+255 747 115 390',
    adminEmail: 'admin@century-adventures.com',
    bookingEmail: 'bookings@century-adventures.com',
    generalEmail: 'visit@century-adventures.com',
    supportEmail: 'support@century-adventures.com',
  };

  const FALLBACK_PACKAGES = [
    { id: 'wildlife-safari', title: 'Tanzania Wildlife Safari', days: 12, category: 'Wildlife', price: 4134, highlights: ['Big 5', 'Luxury lodge', 'Maasai culture'], overview: 'A twelve-day Tanzania wildlife safari combining Big 5 viewing, luxury lodge stays and cultural highlights.' },
    { id: 'southern', title: 'Ultimate Southern Tanzania Safari', days: 9, category: 'Wildlife', price: 3209, highlights: ['Rufiji River', 'Boat safari', 'Ruaha Park'], overview: 'A nine-day southern Tanzania journey focused on the Rufiji River, boat safari experiences and Ruaha National Park.' },
    { id: 'northern-beach', title: 'Best of Northern Parks', days: 11, category: 'Safari & Beach', price: 3729, highlights: ['Serengeti', 'Zanzibar', 'Tarangire'], overview: 'An eleven-day comfort journey through Tanzania’s northern parks followed by time in Zanzibar.' },
    { id: 'short-safari', title: 'Tanzania Short Safari', days: 5, category: 'Wildlife', price: 1850, highlights: ['Crater floor', 'Big 5 focus', 'Game drives'], overview: 'A five-day Tanzania adventure focused on Serengeti and Ngorongoro.' },
    { id: 'luxury-beach', title: 'Safari & Zanzibar', days: 10, category: 'Safari & Beach', price: 3450, highlights: ['Savanna drive', 'Turquoise ocean', 'Luxury resort'], overview: 'A ten-day bush-to-beach experience combining Tanzanian safari landscapes with a Zanzibar island stay.' },
    { id: 'culture', title: 'Cultural Heritage Safari', days: 7, category: 'Culture', price: 2100, highlights: ['Hadzabe hunters', 'Maasai boma', 'Lake Eyasi'], overview: 'A seven-day Maasai culture and wildlife journey featuring Hadzabe hunter experiences, Maasai communities and Lake Eyasi.' },
    { id: 'great-migration', title: 'Great Migration Safari', days: 10, category: 'Wildlife', price: 3772, highlights: ['River crossing', 'Predator action', 'Mara plains'], overview: 'A ten-day Tanzania Great Migration safari built around river crossings, predator action and the open Mara plains.' },
    { id: 'luxury-safari-zanzibar', title: 'Luxury Safari & Zanzibar', days: 10, category: 'Safari & Beach', price: 8522, highlights: ['Fly-in safari', '5-star tented camps', 'Butler service'], overview: 'A ten-day luxury safari and Zanzibar retreat with fly-in travel, five-star tented stays and personal service.' },
    { id: 'south-north', title: 'Best of South & North', days: 12, category: 'Wildlife', price: 5221, highlights: ['All top parks', 'Custom 4x4', 'Maximum wildlife'], overview: 'A twelve-day journey across the best of southern and northern Tanzania.' },
  ];

  const FALLBACK_PAGES = [
    ['packages.html', 'Safari packages and itineraries', 'Compare published safari packages and request a tailored proposal. Listed rates are per person and final details are confirmed in writing.'],
    ['destinations.html', 'Tanzania destinations', 'Explore northern and southern parks, Kilimanjaro and Zanzibar.'],
    ['family.html', 'Family trips', 'Family journeys can be shaped around ages, interests and pace, with family-friendly stays, flexible safari days and attention to dietary or accessibility needs.'],
    ['honeymoon.html', 'Honeymoon trips', 'Private safari experiences, Zanzibar escapes and safari-and-beach combinations can be shaped around a couple’s interests, pace and special celebrations.'],
    ['migration.html', 'Great Migration trips', 'Migration planning follows the seasonal movement of the herds: calving is typically January–March and river-crossing possibilities are typically July–October. Rainfall affects movements and sightings are not guaranteed.'],
    ['volunteer.html', 'Volunteer programmes', 'Volunteer opportunities are locally guided and matched to project priorities, skills, interests and availability. Roles, screening, accommodation, meals, transfers and fees are confirmed before placement.'],
    ['kilimanjaro.html', 'Kilimanjaro experiences', 'Kilimanjaro is a guided trek through changing landscapes from forest to alpine terrain, with preparation, patience and respect for conditions.'],
    ['zanzibar.html', 'Zanzibar holidays', 'Zanzibar combines white-sand beaches, Stone Town, spice gardens, island culture and beach stays, and can be combined with a mainland safari.'],
    ['gallery.html', 'Photo gallery', 'Browse photographs of Century Expeditions wildlife, landscapes, safari and Tanzania travel experiences.'],
    ['vehicles.html', 'Safari 4x4 vehicles', 'Purpose-built safari 4x4s support wildlife viewing and comfortable travel. Vehicle suitability, pop-up roof, seating and luggage space are discussed around the group and itinerary.'],
    ['travel-guide.html', 'Tanzania travel guide', 'The guide covers arrival and documents, money, packing, culture and getting around. Confirm nationality-specific and date-specific requirements.'],
    ['health-safety.html', 'Health and safety', 'The published guidance recommends consulting a qualified travel-health professional, arranging suitable insurance and preparing medicines, documents and emergency contacts.'],
    ['booking-payment.html', 'Booking and payment', 'The published process is enquiry, proposal, agreement of details, required payment using official invoice instructions, then written confirmation. An enquiry is not a confirmed booking.'],
    ['contact.html', 'Contact Century Expeditions', `The team can help with safari bookings, Kilimanjaro, groups, volunteer placements, airport transfers, family trips, accommodation, honeymoons and Zanzibar. WhatsApp ${CONTACT.phone}.`],
    ['serengeti.html', 'Serengeti National Park', 'Open plains, extraordinary wildlife, the Great Migration and regions such as Seronera and the Mara River area.'],
    ['ngorongoro.html', 'Ngorongoro Conservation Area', 'The volcanic crater, wildlife, Maasai communities, Olduvai Gorge and highland scenery can be combined with Serengeti.'],
    ['tarangire.html', 'Tarangire National Park', 'Ancient baobabs, the Tarangire River and elephant herds make this a strong northern-circuit stop, often paired with Ngorongoro and Serengeti.'],
    ['manyara.html', 'Lake Manyara National Park', 'A varied landscape of groundwater forest, grassland, lakeside scenery, wildlife and birdwatching beneath the Rift Valley escarpment.'],
    ['nyerere.html', 'Nyerere National Park', 'Southern Tanzania wilderness shaped by the Rufiji River, with game drives and river experiences where available.'],
    ['ruaha.html', 'Ruaha National Park', 'A quieter southern wilderness of rolling hills, baobabs, open woodland and the Great Ruaha River.'],
    ['mikumi.html', 'Mikumi National Park', 'Open grasslands, woodland, scenic horizons and accessible southern Tanzania game drives.'],
    ['katavi.html', 'Katavi National Park', 'Remote western Tanzania with seasonal floodplains, waterways and unhurried wildlife exploration.'],
    ['gombe.html', 'Gombe Stream National Park', 'Forest trails, guided chimpanzee experiences and Lake Tanganyika scenery in western Tanzania.'],
  ].map(([href, label, summary]) => ({ href, label, title: label, content: summary }));

  let knowledge = { pages: FALLBACK_PAGES, packages: FALLBACK_PACKAGES, contact: CONTACT };
  let state = {
    lang: readLanguage(),
    open: false,
    messages: [],
    planner: {},
    plannerStage: -1,
    busy: false,
  };

  function readLanguage() {
    try {
      const saved = localStorage.getItem('century-lang');
      if (saved === 'sw' || saved === 'en') return saved;
    } catch (_) {}
    return document.documentElement.lang === 'sw' ? 'sw' : 'en';
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  }

  function formatText(value) {
    return escapeHtml(value).replace(/\n+/g, '<br>');
  }

  function money(value) {
    return '$' + Math.round(Number(value) || 0).toLocaleString('en-US');
  }

  function isSafeHref(href) {
    const internalPath = String(href || '').split('?')[0].split('#')[0];
    return /^(?:[a-z]+:|\/\/)/i.test(href) || knowledge.pages.some(page => page.href === internalPath);
  }

  function packageById(id) {
    return knowledge.packages.find(item => item.id === id);
  }

  function plannerQuery(packageId) {
    const params = new URLSearchParams({ assistant: '1' });
    if (packageId) params.set('trip', packageId);
    const planner = state.planner;
    if (planner.date || planner.timing) params.set('arrival_date', planner.date || planner.timing.match(/\d{4}-\d{2}-\d{2}/)?.[0] || '');
    const guestNumber = String(planner.guests || planner.travellers || '').match(/\d+/)?.[0];
    if (guestNumber) params.set('adults', guestNumber);
    if (planner.budget) params.set('budget_per_person', planner.budget.replace(/[^0-9.]/g, ''));
    if (planner.accommodation) params.set('accommodation', planner.accommodation);
    const preferences = [planner.interest, planner.timing, planner.travellers, planner.accommodation && `Accommodation: ${planner.accommodation}`, planner.budget && `Budget: ${planner.budget}`, planner.priorities].filter(Boolean).join('. ');
    if (preferences) params.set('message', `Planned with the Century Expeditions Safari Assistant. Interests: ${preferences}`);
    return `packages.html?${params.toString()}`;
  }

  function contactQuery(message, type) {
    const params = new URLSearchParams({ assistant: '1', message: message || '' });
    if (type) params.set('safari_type', type);
    return `contact.html?${params.toString()}`;
  }

  function initMarkup() {
    const legacy = document.querySelectorAll('.tanapa-chat-pill, .ce-float-ai');
    legacy.forEach(button => {
      button.classList.add('ce-ai-legacy-hook');
      button.addEventListener('click', event => { event.preventDefault(); open(); });
    });

    const launcher = document.createElement('button');
    launcher.type = 'button';
    launcher.className = 'ce-ai-launcher';
    launcher.setAttribute('aria-controls', 'ce-ai-panel');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.setAttribute('aria-label', state.lang === 'sw' ? 'Fungua Msaidizi wa Safari' : 'Open Safari Assistant');
    launcher.innerHTML = `<span class="ce-ai-launcher-icon"><i class="fa-solid fa-compass-drafting" aria-hidden="true"></i></span><span class="ce-ai-launcher-text"><span>${state.lang === 'sw' ? 'Uliza Msaidizi wa Safari' : 'Ask Safari Assistant'}</span><small>${state.lang === 'sw' ? 'Msaidizi wa kupanga safari' : 'Safari planning assistant'}</small></span>`;

    const panel = document.createElement('section');
    panel.id = 'ce-ai-panel';
    panel.className = 'ce-ai-panel';
    panel.setAttribute('aria-label', state.lang === 'sw' ? 'Msaidizi wa Safari wa Century Expeditions' : 'Century Expeditions Safari Assistant');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-live', 'polite');
    panel.hidden = true;
    panel.innerHTML = `
      <header class="ce-ai-header">
        <div class="ce-ai-mark"><i class="fa-solid fa-compass" aria-hidden="true"></i></div>
        <div class="ce-ai-heading"><h2>${state.lang === 'sw' ? 'Msaidizi wa Safari' : 'Safari Assistant'}</h2><p class="ce-ai-status">${state.lang === 'sw' ? 'Msaidizi wa safari wa Century Expeditions' : 'Century Expeditions Safari Assistant'}</p></div>
        <button type="button" class="ce-ai-language" aria-label="${state.lang === 'sw' ? 'Badili lugha' : 'Switch language'}">${state.lang === 'sw' ? 'EN' : 'SW'}</button>
        <button type="button" class="ce-ai-close" aria-label="${state.lang === 'sw' ? 'Funga msaidizi' : 'Close assistant'}">×</button>
      </header>
      <div class="ce-ai-messages" id="ce-ai-messages"></div>
      <form class="ce-ai-planner" id="ce-ai-planner-form" hidden>
        <p class="ce-ai-planner-title" id="ce-ai-planner-title">${state.lang === 'sw' ? 'Tupange safari hatua kwa hatua' : 'Let’s plan this one step at a time'}</p>
        <div class="ce-ai-planner-question" id="ce-ai-planner-question"></div>
        <div class="ce-ai-planner-control" id="ce-ai-planner-control"></div>
        <div class="ce-ai-planner-actions"><button class="ce-ai-plan-skip" id="ce-ai-plan-skip" type="button">${state.lang === 'sw' ? 'Ruka' : 'Skip'}</button><button class="ce-ai-plan-submit" id="ce-ai-plan-submit" type="submit">${state.lang === 'sw' ? 'Endelea' : 'Continue'}</button></div>
      </form>
      <footer class="ce-ai-footer">
        <div class="ce-ai-composer"><textarea class="ce-ai-input" rows="1" maxlength="1200" placeholder="${state.lang === 'sw' ? 'Uliza kuhusu Tanzania, safari au uhifadhi...' : 'Ask about Tanzania, trips or booking...'}"></textarea><button type="button" class="ce-ai-send" aria-label="${state.lang === 'sw' ? 'Tuma swali' : 'Send question'}"><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button></div>
        <p class="ce-ai-privacy">${state.lang === 'sw' ? 'Kwa faragha yako, tafadhali usishiriki nambari ya pasipoti au taarifa za kina za matibabu.' : 'For your privacy, please do not share passport numbers or detailed medical records.'}</p>
      </footer>`;
    document.body.append(launcher, panel);

    launcher.addEventListener('click', () => state.open ? close() : open());
    panel.querySelector('.ce-ai-close').addEventListener('click', close);
    panel.querySelector('.ce-ai-language').addEventListener('click', toggleLanguage);
    panel.querySelector('.ce-ai-send').addEventListener('click', submitInput);
    const input = panel.querySelector('.ce-ai-input');
    input.addEventListener('input', () => resizeInput(input));
    input.addEventListener('keydown', event => {
      if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); submitInput(); }
    });
    panel.querySelector('#ce-ai-planner-form').addEventListener('submit', submitPlanner);
    panel.querySelector('#ce-ai-plan-skip').addEventListener('click', () => advancePlanner(''));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && state.open) close();
    });

    window.CenturyAssistant = { open, close, ask: question => { open(); submitQuestion(question); } };
    prefillContactFromAssistant();
    addWelcome();
  }

  function resizeInput(input) {
    if (!input) return;
    input.style.height = 'auto';
    input.style.height = `${Math.min(input.scrollHeight, 112)}px`;
  }

  function messagesEl() { return document.getElementById('ce-ai-messages'); }
  function panelEl() { return document.getElementById('ce-ai-panel'); }

  function addWelcome() {
    if (state.messages.length) return;
    const text = state.lang === 'sw'
      ? 'Karibu. Naweza kukusaidia kuchagua safari, kuelewa maeneo na vifurushi, au kupata taarifa za afya, usalama na uhifadhi.'
      : 'Welcome. I can help you choose a safari, explore destinations and packages, or understand health, safety and booking information.';
    addBot(text, { chips: state.lang === 'sw' ? ['Nisaidie kuchagua safari', 'Ni lini Uhamiaji Mkuu?', 'Safari za familia'] : ['Find a safari for me', 'When is the Great Migration?', 'Family trips'] });
  }

  function addMessage(role, text, meta) {
    state.messages.push({ role, content: text });
    const wrapper = document.createElement('div');
    wrapper.className = `ce-ai-message ${role}`;
    wrapper.innerHTML = `<div class="ce-ai-bubble"><p>${formatText(text)}</p></div>`;
    if (meta) wrapper.querySelector('.ce-ai-bubble').insertAdjacentHTML('beforeend', renderMeta(meta));
    messagesEl().append(wrapper);
    messagesEl().scrollTop = messagesEl().scrollHeight;
  }

  function addBot(text, meta) { addMessage('assistant', text, meta); }

  function renderMeta(meta) {
    let html = '';
    if (Array.isArray(meta.chips) && meta.chips.length) {
      html += '<div class="ce-ai-chips">' + meta.chips.map(chip => `<button type="button" class="ce-ai-chip" data-ai-chip="${escapeHtml(chip)}">${escapeHtml(chip)}</button>`).join('') + '</div>';
    }
    if (Array.isArray(meta.links) && meta.links.length) {
      html += '<div class="ce-ai-links">' + meta.links.filter(link => link && isSafeHref(link.href)).map(link => `<a class="ce-ai-link" href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`).join('') + '</div>';
    }
    if (Array.isArray(meta.recommendedPackages) && meta.recommendedPackages.length) {
      html += '<div class="ce-ai-recommendations">' + meta.recommendedPackages.map(id => packageById(id)).filter(Boolean).map(trip => `<div class="ce-ai-trip"><strong>${escapeHtml(trip.title)}</strong><span>${trip.days} days · ${escapeHtml(trip.category)} · listed from ${money(trip.price)} / person</span><span>${escapeHtml((trip.highlights || []).join(' · '))}</span><a href="${escapeHtml(plannerQuery(trip.id))}">${state.lang === 'sw' ? 'Angalia na omba nukuu →' : 'View package & request quote →'}</a></div>`).join('') + '</div>';
    }
    return html;
  }

  function bindChips() {
    document.querySelectorAll('[data-ai-chip]').forEach(button => {
      button.onclick = () => {
        const question = button.getAttribute('data-ai-chip');
        if (/find a safari|chagua safari|nisaidie/i.test(question)) return openPlanner();
        submitQuestion(question);
      };
    });
  }

  function open() {
    state.open = true;
    document.body.classList.add('ce-ai-open');
    const panel = panelEl();
    const launcher = document.querySelector('.ce-ai-launcher');
    panel.hidden = false;
    requestAnimationFrame(() => panel.classList.add('is-open'));
    launcher.setAttribute('aria-expanded', 'true');
    setTimeout(() => {
      const input = panel.querySelector('.ce-ai-input');
      resizeInput(input);
      input.focus();
    }, 120);
    bindChips();
  }

  function close() {
    state.open = false;
    document.body.classList.remove('ce-ai-open');
    const panel = panelEl();
    panel.classList.remove('is-open');
    document.querySelector('.ce-ai-launcher').setAttribute('aria-expanded', 'false');
    setTimeout(() => { if (!state.open) panel.hidden = true; }, 220);
  }

  function refreshAssistantLanguage() {
    const sw = state.lang === 'sw';
    const panel = panelEl();
    if (!panel) return;
    panel.setAttribute('aria-label', sw ? 'Msaidizi wa Safari wa Century Expeditions' : 'Century Expeditions Safari Assistant');
    const heading = panel.querySelector('.ce-ai-heading h2');
    const status = panel.querySelector('.ce-ai-status');
    const language = panel.querySelector('.ce-ai-language');
    const closeButton = panel.querySelector('.ce-ai-close');
    const input = panel.querySelector('.ce-ai-input');
    const sendButton = panel.querySelector('.ce-ai-send');
    const plannerTitle = panel.querySelector('.ce-ai-planner-title');
    const skip = panel.querySelector('.ce-ai-plan-skip');
    const submit = panel.querySelector('.ce-ai-plan-submit');
    if (heading) heading.textContent = sw ? 'Msaidizi wa Safari' : 'Safari Assistant';
    if (status) status.textContent = sw ? 'Msaidizi wa safari wa Century Expeditions' : 'Century Expeditions Safari Assistant';
    if (language) {
      language.textContent = sw ? 'EN' : 'SW';
      language.setAttribute('aria-label', sw ? 'Badili lugha' : 'Switch language');
    }
    if (closeButton) closeButton.setAttribute('aria-label', sw ? 'Funga msaidizi' : 'Close assistant');
    if (input) input.placeholder = sw ? 'Uliza kuhusu Tanzania, safari au uhifadhi...' : 'Ask about Tanzania, trips or booking...';
    if (sendButton) sendButton.setAttribute('aria-label', sw ? 'Tuma swali' : 'Send question');
    if (plannerTitle) plannerTitle.textContent = sw ? 'Tupange safari hatua kwa hatua' : 'Let’s plan this one step at a time';
    if (skip) skip.textContent = sw ? 'Ruka' : 'Skip';
    if (submit && state.plannerStage < 0) submit.textContent = sw ? 'Endelea' : 'Continue';
    const privacy = panel.querySelector('.ce-ai-privacy');
    if (privacy) privacy.textContent = sw ? 'Kwa faragha yako, tafadhali usishiriki nambari ya pasipoti au taarifa za kina za matibabu.' : 'For your privacy, please do not share passport numbers or detailed medical records.';
    const launcher = document.querySelector('.ce-ai-launcher');
    if (launcher) {
      launcher.setAttribute('aria-label', sw ? 'Fungua Msaidizi wa Safari' : 'Open Safari Assistant');
      const launcherLabel = launcher.querySelector('.ce-ai-launcher-text span');
      const launcherHint = launcher.querySelector('.ce-ai-launcher-text small');
      if (launcherLabel) launcherLabel.textContent = sw ? 'Uliza Msaidizi wa Safari' : 'Ask Safari Assistant';
      if (launcherHint) launcherHint.textContent = sw ? 'Msaidizi wa kupanga safari' : 'Safari planning assistant';
    }
    if (state.plannerStage >= 0) renderPlannerQuestion();
  }

  function toggleLanguage() {
    state.lang = state.lang === 'sw' ? 'en' : 'sw';
    try { localStorage.setItem('century-lang', state.lang); } catch (_) {}
    refreshAssistantLanguage();
    if (typeof window.applyCenturyLanguage === 'function') window.applyCenturyLanguage(state.lang);
  }

  window.addEventListener('century-language-change', event => {
    const nextLanguage = event.detail && event.detail.lang;
    if (nextLanguage !== 'sw' && nextLanguage !== 'en') return;
    if (state.lang === nextLanguage) return;
    state.lang = nextLanguage;
    refreshAssistantLanguage();
  });

  function setLoading(show) {
    const existing = document.getElementById('ce-ai-loading');
    if (show && !existing) {
      const wrapper = document.createElement('div');
      wrapper.id = 'ce-ai-loading';
      wrapper.className = 'ce-ai-message assistant';
      wrapper.innerHTML = '<div class="ce-ai-bubble"><span class="ce-ai-loading"><i></i><i></i><i></i> Thinking from our published pages…</span></div>';
      messagesEl().append(wrapper);
      messagesEl().scrollTop = messagesEl().scrollHeight;
    } else if (!show && existing) existing.remove();
  }

  function submitInput() {
    const input = panelEl().querySelector('.ce-ai-input');
    const question = input.value.trim();
    if (!question || state.busy) return;
    input.value = '';
    resizeInput(input);
    submitQuestion(question);
  }

  function openPlanner() {
    const form = panelEl().querySelector('#ce-ai-planner-form');
    state.planner = {};
    state.plannerStage = 0;
    form.hidden = false;
    renderPlannerQuestion();
    addBot(state.lang === 'sw'
      ? 'Tupange hatua kwa hatua. Kwanza, unavutiwa zaidi na nini?'
      : 'Let’s plan this step by step. First, what are you most interested in?');
  }

  function plannerStages() {
    const sw = state.lang === 'sw';
    return [
      { key: 'interest', question: sw ? 'Unavutiwa zaidi na nini?' : 'What are you most interested in?', type: 'select', options: sw ? [['wildlife', 'Safari ya wanyamapori'], ['beach', 'Safari na Zanzibar'], ['mountain', 'Kilimanjaro'], ['culture', 'Utamaduni'], ['volunteer', 'Kujitolea'], ['combination', 'Mchanganyiko']] : [['wildlife', 'Wildlife safari'], ['beach', 'Safari & Zanzibar'], ['mountain', 'Kilimanjaro'], ['culture', 'Culture'], ['volunteer', 'Volunteering'], ['combination', 'A combination']] },
      { key: 'timing', question: sw ? 'Ungependa kusafiri lini, na kwa muda gani?' : 'When would you like to travel, and for how long?', type: 'text', placeholder: sw ? 'Mfano: Oktoba 2026, siku 7–10' : 'For example: October 2026, 7–10 days' },
      { key: 'travellers', question: sw ? 'Ni nani watakaosafiri?' : 'Who will be travelling?', type: 'text', placeholder: sw ? 'Mfano: watu wazima 2, watoto 2 wenye miaka 6 na 10' : 'For example: 2 adults and 2 children aged 6 and 10' },
      { key: 'budget', question: sw ? 'Una bajeti gani, na ni kwa mtu au kwa kundi lote?' : 'What is your approximate budget, and is it per person or for the whole group?', type: 'text', placeholder: sw ? 'Mfano: USD 3,000 kwa mtu' : 'For example: USD 3,000 per person' },
      { key: 'accommodation', question: sw ? 'Unapendelea aina gani ya malazi na mwendo gani wa safari?' : 'What accommodation and travel pace do you prefer?', type: 'select', options: sw ? [['Need advice', 'Nahitaji ushauri'], ['Comfort', 'Starehe'], ['Premium', 'Premium'], ['Luxury', 'Kifahari']] : [['Need advice', 'I need advice'], ['Comfort', 'Comfort'], ['Premium', 'Premium'], ['Luxury', 'Luxury']] },
      { key: 'priorities', question: sw ? 'Kuna maeneo, wanyamapori, sherehe au mahitaji maalum unayotanguliza?' : 'Any priority destinations, wildlife interests, celebrations or practical needs?', type: 'text', placeholder: sw ? 'Mfano: Serengeti, Zanzibar, chakula maalum' : 'For example: Serengeti, Zanzibar, dietary needs' },
    ];
  }

  function renderPlannerQuestion() {
    const form = panelEl().querySelector('#ce-ai-planner-form');
    const stage = plannerStages()[state.plannerStage];
    if (!stage) return;
    const question = form.querySelector('#ce-ai-planner-question');
    const control = form.querySelector('#ce-ai-planner-control');
    const submit = form.querySelector('#ce-ai-plan-submit');
    const skip = form.querySelector('#ce-ai-plan-skip');
    question.textContent = stage.question;
    if (stage.type === 'select') {
      control.innerHTML = `<select name="planner-answer" required><option value="">${state.lang === 'sw' ? 'Chagua' : 'Choose one'}</option>${stage.options.map(([value, label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`).join('')}</select>`;
    } else {
      control.innerHTML = `<input name="planner-answer" type="text" maxlength="220" placeholder="${escapeHtml(stage.placeholder || '')}" required>`;
    }
    submit.textContent = state.plannerStage === plannerStages().length - 1 ? (state.lang === 'sw' ? 'Onyesha safari' : 'Show suitable trips') : (state.lang === 'sw' ? 'Endelea' : 'Continue');
    skip.textContent = state.lang === 'sw' ? 'Ruka' : 'Skip';
    control.querySelector('[name="planner-answer"]').focus();
  }

  function advancePlanner(value) {
    const stages = plannerStages();
    const stage = stages[state.plannerStage];
    if (!stage) return;
    state.planner[stage.key] = String(value || '').trim();
    if (value) addMessage('user', value);
    if (state.plannerStage < stages.length - 1) {
      state.plannerStage += 1;
      renderPlannerQuestion();
      return;
    }
    const form = panelEl().querySelector('#ce-ai-planner-form');
    form.hidden = true;
    const summary = `Interest: ${state.planner.interest || 'not specified'}; timing and duration: ${state.planner.timing || 'not specified'}; travellers: ${state.planner.travellers || 'not specified'}; budget: ${state.planner.budget || 'not specified'}; accommodation and pace: ${state.planner.accommodation || 'not specified'}; priorities: ${state.planner.priorities || 'not specified'}.`;
    addMessage('user', state.lang === 'sw' ? `Maslahi: ${state.planner.interest || 'sijabainisha'}; muda: ${state.planner.timing || 'sijabainisha'}; wasafiri: ${state.planner.travellers || 'sijabainisha'}; bajeti: ${state.planner.budget || 'sijabainisha'}; malazi na mwendo: ${state.planner.accommodation || 'sijabainisha'}; vipaumbele: ${state.planner.priorities || 'sijabainisha'}.` : summary);
    submitQuestion(`Please recommend suitable published Century Expeditions options using these preferences: ${summary}`, true, state.lang);
  }

  function submitPlanner(event) {
    event.preventDefault();
    event.stopPropagation();
    const answer = event.currentTarget.querySelector('[name="planner-answer"]')?.value.trim();
    if (!answer) return;
    advancePlanner(answer);
  }

  function languageForQuestion(question) {
    const q = canonicalQuestion(question);
    const swahili = /\b(mambo|habari|shikamoo|hujambo|asante|sijaelewa|nawezaje|nataka|tunataka|ni lini|bei|gharama|malipo|kuhifadhi|safari ya familia|pwani|mlima|wapi|nini|gani|nanyi|nisaidie|sawa|ndio)\b/.test(q);
    const english = /\b(hello|hi|hey|good morning|good afternoon|good evening|what|where|when|which|how|can|do you|tell me|price|cost|booking|package|family|honeymoon|migration|please)\b/.test(q);
    if (swahili) return 'sw';
    if (english) return 'en';
    return state.lang;
  }

  async function submitQuestion(question, alreadyAdded, forcedLanguage) {
    if (state.busy) return;
    state.busy = true;
    state.lang = forcedLanguage || languageForQuestion(question);
    if (!alreadyAdded) addMessage('user', question);
    setLoading(true);
    panelEl().querySelector('.ce-ai-send').disabled = true;
    let result;
    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ question, messages: state.messages.slice(-11, -1), locale: state.lang, page: location.pathname, website: '' }),
      });
      if (!response.ok) throw new Error('assistant unavailable');
      result = await response.json();
    } catch (_) {
      result = localReply(question);
    }
    setLoading(false);
    state.busy = false;
    panelEl().querySelector('.ce-ai-send').disabled = false;
    addBot(result.answer, result);
    bindChips();
  }

  function canonicalQuestion(value) {
    return String(value || '').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/\bserengetti\b/g, 'serengeti').replace(/\bngorogoro\b/g, 'ngorongoro').replace(/\bzanzabar\b/g, 'zanzibar').replace(/\bkilimanjarro\b/g, 'kilimanjaro').replace(/\btarrangire\b/g, 'tarangire').replace(/\bnjerere\b/g, 'nyerere').replace(/\bbookng\b/g, 'booking').replace(/\bhoneymon\b/g, 'honeymoon').replace(/\bvehcles\b/g, 'vehicles').replace(/\bfamly\b/g, 'family').replace(/\bmigraiton\b/g, 'migration').replace(/\s+/g, ' ').trim();
  }

  function lastAssistantMessage() {
    return [...state.messages].reverse().find(message => message.role === 'assistant')?.content || '';
  }

  function smallTalk(question) {
    const q = canonicalQuestion(question);
    const sw = state.lang === 'sw';
    if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(q)) {
      if (/good morning/.test(q)) return sw ? 'Habari za asubuhi! Unatafuta safari, likizo ya pwani, au uzoefu mwingine Tanzania?' : 'Good morning! Are you looking for a safari, a beach holiday, or another Tanzania experience?';
      if (/good afternoon/.test(q)) return sw ? 'Habari za mchana! Nikusaidieje kuhusu mipango yako ya safari?' : 'Good afternoon! How can I help with your travel plans?';
      if (/good evening/.test(q)) return sw ? 'Habari za jioni! Naweza kukusaidia kuchunguza maeneo, vifurushi na taarifa za uhifadhi.' : 'Good evening! I can help you explore our destinations, packages and booking information.';
      return sw ? 'Karibu Century Expeditions! Ungependa kuchunguza nini Tanzania?' : 'Hello! Welcome to Century Expeditions. What would you like to explore in Tanzania?';
    }
    if (/^mambo\b/.test(q)) return 'Poa! Karibu Century Expeditions. Nikusaidie kupanga safari gani?';
    if (/^habari\b/.test(q)) return 'Nzuri! Karibu. Ungependa kujua kuhusu safari, Zanzibar, Kilimanjaro, au namna ya kuweka nafasi?';
    if (/^shikamoo\b/.test(q)) return 'Marahaba! Karibu Century Expeditions. Nikusaidie nini kuhusu safari yako?';
    if (/^hujambo\b/.test(q)) return 'Sijambo! Karibu. Una swali gani kuhusu huduma zetu?';
    if (/thank|thanks|asante\b/.test(q)) return sw ? 'Karibu! Ukiwa na swali jingine kuhusu safari yako, niko hapa kukusaidia.' : 'You’re welcome! Let me know if you need anything else.';
    if (/^(bye|goodbye|kwaheri)\b/.test(q)) return sw ? 'Asante kwa kutembelea Century Expeditions. Furahia kupanga safari yako Tanzania!' : 'Thank you for visiting Century Expeditions. Enjoy planning your Tanzania adventure!';
    if (/how are you|are you there|can you help|help me/.test(q)) return sw ? 'Niko tayari kukusaidia kupanga safari yako! Ungependa kujua nini?' : 'I’m ready to help you plan your adventure! What would you like to know?';
    if (/are you a real person|real person|who are you/.test(q)) return sw ? 'Mimi ni msaidizi wa AI wa Century Expeditions. Naweza kueleza huduma zetu na kukusaidia kuwasiliana na timu yetu ya safari.' : 'I’m Century Expeditions’ AI assistant. I can explain our services and help you contact our travel team.';
    if (/sijaelewa|i do not understand|i don't understand/.test(q)) return sw ? 'Hakuna shida. Nitakueleza kwa maneno rahisi zaidi. Unauliza kuhusu bei, huduma, au kupanga safari?' : 'No problem. I’ll explain it in simpler words. Are you asking about the price, the service, or planning a trip?';
    return '';
  }

  function localReply(question) {
    let q = canonicalQuestion(question);
    const sw = state.lang === 'sw';
    const links = [];
    const addLink = (label, href) => links.push({ label, href });
    const planner = state.planner;
    const greeting = smallTalk(q);
    if (greeting) return { answer: greeting, links: [], recommendedPackages: [], ask: sw ? ['Nisaidie kuchagua safari'] : ['Find a safari for me'] };
    if (/passport|password|credit card|card details|medical record|pasipoti|nenosiri|kadi|taarifa za kina za kitabibu/.test(q)) {
      return { answer: sw ? 'Kwa usalama wako, usishiriki namba za pasipoti, nenosiri, taarifa za kadi au rekodi za kitabibu kwenye chat. Kwa mahitaji ya safari, tumia fomu ya maombi au WhatsApp ya timu.' : 'For your safety, please do not share passport numbers, passwords, card details or detailed medical records in chat. For trip needs, use the enquiry form or WhatsApp the team.', links: [{ label: sw ? 'Wasiliana na timu' : 'Contact the team', href: contactQuery(sw ? 'Nahitaji msaada wa safari; sitatuma taarifa nyeti kwenye chat.' : 'I need trip planning help; I will not send sensitive information in chat.') }, { label: sw ? 'WhatsApp timu' : 'WhatsApp the team', href: CONTACT.whatsapp }], recommendedPackages: [], ask: [] };
    }
    if (/^(yes|yeah|okay|ok|continue|that one|tell me more|ndio|sawa|endelea|hiyo)\b/.test(q)) {
      const previous = lastAssistantMessage();
      if (previous) q = canonicalQuestion(previous);
    }
    const isRecommendation = Boolean(planner.interest) || /recommend|suitable|find a safari|choose a safari|budget|suit my|fit my interest|nisaidie|chagua safari|pendekeza/i.test(q);

    if (/difference between|compare|versus|\bvs\b|tofauti|linganisha/.test(q) && /serengeti/.test(q) && /tarangire/.test(q)) {
      addLink(sw ? 'Serengeti' : 'Read Serengeti', 'serengeti.html');
      addLink(sw ? 'Tarangire' : 'Read Tarangire', 'tarangire.html');
      return { answer: sw ? 'Kwa ufupi:\n• Serengeti: tambarare pana, wanyamapori wengi na Great Migration.\n• Tarangire: Mto Tarangire, mibuyu na makundi makubwa ya tembo.\nZote zinaweza kuunganishwa katika ratiba ya kaskazini; chaguo bora hutegemea muda na vipaumbele vyako.' : 'In short:\n• Serengeti: vast open plains, exceptional wildlife and the Great Migration.\n• Tarangire: the Tarangire River, ancient baobabs and large elephant herds.\nThey can be combined in a northern itinerary; the best choice depends on your time and priorities.', links, recommendedPackages: [], ask: [] };
    }

    if (isRecommendation && !planner.interest) {
      return { answer: sw ? 'Naweza kupendekeza safari, lakini kwanza niambie unapendelea wanyamapori, pwani, Kilimanjaro, utamaduni, kujitolea, au mchanganyiko.' : 'I can recommend a trip. First, are you most interested in wildlife, the beach, Kilimanjaro, culture, volunteering, or a combination?', links: [], recommendedPackages: [], ask: sw ? ['Nisaidie kuchagua safari'] : ['Find a safari for me'] };
    }

    if (isRecommendation && planner.interest) {
      const scores = knowledge.packages.map(trip => {
        let score = 0;
        const interest = planner.interest.toLowerCase();
        if (interest === 'migration' && trip.id === 'great-migration') score += 8;
        if (interest === 'family' && ['short-safari', 'northern-beach', 'wildlife-safari'].includes(trip.id)) score += 5;
        if (interest === 'honeymoon' && ['luxury-beach', 'luxury-safari-zanzibar'].includes(trip.id)) score += 8;
        if (interest === 'beach' && ['luxury-beach', 'northern-beach', 'luxury-safari-zanzibar'].includes(trip.id)) score += 7;
        if (interest === 'culture' && trip.id === 'culture') score += 8;
        if (interest === 'wildlife' && trip.category === 'Wildlife') score += 4;
        if (interest === 'combination' && trip.category === 'Safari & Beach') score += 6;
        if (interest === 'mountain') score -= 2;
        const budgetAmount = Number(String(planner.budget || '').replace(/[^0-9.]/g, ''));
        if (budgetAmount && budgetAmount >= trip.price) score += 3;
        if (budgetAmount && budgetAmount < trip.price) score -= 3;
        if (planner.accommodation === 'Luxury' && trip.price >= 5000) score += 2;
        return { trip, score };
      }).sort((a, b) => b.score - a.score).slice(0, 3).map(item => item.trip.id);
      if (planner.interest === 'mountain') {
        addLink(sw ? 'Kilimanjaro' : 'Kilimanjaro experiences', 'kilimanjaro.html');
        return { answer: sw ? 'Kwa kupanda Kilimanjaro, ukurasa wa uzoefu unaeleza njia yenye mandhari inayobadilika na mwongozo wa kitaalamu. Tarehe na upatikanaji wa njia uthibitishwe na timu.' : 'For a Kilimanjaro trek, the experience page explains a guided journey through changing landscapes with expert support. Ask the team to confirm route and availability for your dates.', links, recommendedPackages: [], ask: [] };
      }
      if (planner.interest === 'volunteer') {
        addLink(sw ? 'Programu za kujitolea' : 'Volunteer programmes', 'volunteer.html');
        addLink(sw ? 'Wasiliana na timu' : 'Talk to the team', contactQuery(sw ? 'Ninapenda programu za kujitolea. Tafadhali nisaidie kuhusu ujuzi, muda na gharama.' : 'I am interested in volunteering. Please advise on skills, duration and costs.'));
        return { answer: sw ? 'Programu za kujitolea hazijawekwa kama kifurushi cha bei kwenye katalogi. Ukurasa wa programu unaeleza kuwa mradi, ujuzi, muda, gharama, malazi na usafiri vitathibitishwa kabla ya placement.' : 'Volunteer programmes are not listed as fixed-price safari packages. The programme page explains that project fit, skills, timing, costs, accommodation and transfers are confirmed before placement.', links, recommendedPackages: [], ask: [] };
      }
      addLink(sw ? 'Vifurushi vya safari' : 'Browse all packages', 'packages.html');
      return { answer: sw ? 'Kwa maelezo uliyotoa, hivi ni vifurushi vilivyo karibu zaidi. Bei zilizoonyeshwa ni za kuanzia kwa mtu; ratiba, huduma za mwisho na upatikanaji vitathibitishwa kwa maandishi na timu ya bookings.' : 'Based on what you shared, these published packages are the closest matches. Listed rates are starting figures per person; the final itinerary, inclusions and availability are confirmed in writing by reservations.', links, recommendedPackages: scores, ask: [] };
    }

    if (/what.*include|included|inclusions|flights? included|accommodation|what costs extra|vilivyojumuishwa|malazi/.test(q)) {
      addLink(sw ? 'Kagua vifurushi' : 'Review packages', 'packages.html');
      addLink(sw ? 'Soma booking na malipo' : 'Read booking and payment', 'booking-payment.html');
      return { answer: sw ? 'Kurasa za vifurushi zinaonyesha muhtasari, lakini huduma zilizo ndani au nje ya kila orodha, malazi yaliyotajwa, ndege na gharama za ziada hazijapewa kwa ukamilifu katika kila rekodi. Timu ya bookings itathibitisha vipengele hivi katika nukuu yako ya maandishi.' : 'The package pages show published summaries, but complete inclusions, exclusions, named accommodation, flights and extra costs are not supplied for every listing. Reservations will confirm these details in your written quotation.', links, recommendedPackages: [], ask: [] };
    }

    if (/packages?|itinerar|shortest|five[- ]day|show me.*safari|vifurushi|ratiba/.test(q)) {
      const listed = [...knowledge.packages].sort((a, b) => a.days - b.days).slice(0, /shortest|five[- ]day/.test(q) ? 1 : 6);
      addLink(sw ? 'Fungua vifurushi vyote' : 'Open all packages', 'packages.html');
      return { answer: (sw ? 'Vifurushi vilivyochapishwa kwa sasa:\n' : 'Published packages currently listed:\n') + listed.map(trip => `• ${trip.title} — ${trip.days} days — from ${money(trip.price)} / person`).join('\n') + (sw ? '\nBei ni za kuanzia; nukuu ya mwisho inategemea tarehe, kundi, malazi na upatikanaji.' : '\nRates are starting figures; the final quotation depends on dates, group size, accommodation and availability.'), links, recommendedPackages: listed.slice(0, 3).map(trip => trip.id), ask: [] };
    }

    const services = [
      { match: /family|famil|familia/, href: 'family.html', en: 'Family trips are shaped around your family’s ages, interests and pace. The published family page highlights family-friendly stays, flexible safari days, age-appropriate activities, and space for dietary or accessibility needs.', sw: 'Safari za familia hupangwa kulingana na umri, maslahi na mwendo wa familia yako. Ukurasa wa familia unaeleza malazi rafiki kwa familia, siku zinazobadilika, shughuli zinazofaa umri, na mahitaji ya chakula au ufikivu.' },
      { match: /honeymoon|fungate/, href: 'honeymoon.html', en: 'Century Expeditions can shape a honeymoon around private experiences, comfortable stays and a balanced safari-and-beach pace. The published options include safari for two, Zanzibar escapes and a safari-and-beach combination.', sw: 'Century Expeditions inaweza kupanga fungate yenye uzoefu wa faragha, malazi ya starehe na mchanganyiko wa safari na pwani. Chaguo zilizochapishwa ni safari ya wawili, Zanzibar na safari pamoja na pwani.' },
      { match: /migration|uhamiaji|nyumbu|river crossing/, href: 'migration.html', en: 'Migration planning follows the movement of the herds. Calving is typically January–March and river-crossing possibilities are typically July–October. Rainfall changes the timing, and crossings or sightings cannot be guaranteed.', sw: 'Mipango ya Uhamiaji Mkuu hufuata mwendo wa makundi. Msimu wa kuzaa huwa Januari–Machi na uwezekano wa kuvuka mto huwa Julai–Oktoba. Mvua hubadilisha muda, na vivuko au kuonekana kwa wanyama hakuhakikishwi.' },
      { match: /volunteer|kujito|community project/, href: 'volunteer.html', en: 'Volunteer opportunities are locally guided and matched to project priorities, your skills, interests and availability. The team explains fees, accommodation, meals, transfers and any screening before placement is confirmed.', sw: 'Fursa za kujitolea zinaongozwa na wenyeji na huendana na vipaumbele vya mradi, ujuzi, maslahi na muda wako. Timu itaeleza ada, malazi, chakula, usafiri na uchunguzi kabla ya nafasi kuthibitishwa.' },
      { match: /kilimanjaro|mountain|mlima/, href: 'kilimanjaro.html', en: 'Kilimanjaro is a guided trek through changing landscapes, from forest to alpine terrain. The published experience emphasizes preparation, patience, expert support and respect for conditions.', sw: 'Kilimanjaro ni safari ya kupanda yenye mwongozo kupitia mandhari zinazobadilika, kutoka msituni hadi eneo la alpine. Uzoefu uliyochapishwa unasisitiza maandalizi, subira, msaada wa wataalamu na kuheshimu hali.' },
      { match: /zanzibar|beach|pwani/, href: 'zanzibar.html', en: 'Zanzibar combines white-sand beaches, Stone Town, spice gardens, island culture and relaxed beach stays. It can be added to a mainland safari.', sw: 'Zanzibar ina fukwe za mchanga mweupe, Stone Town, bustani za viungo, utamaduni wa kisiwa na malazi ya pwani. Inaweza kuunganishwa na safari ya bara.' },
      { match: /vehicle|4x4|gari|magari/, href: 'vehicles.html', en: 'Purpose-built safari 4x4s support wildlife viewing and comfortable travel. The team will discuss pop-up roof options, seating, luggage space and vehicle suitability around your route and group size.', sw: 'Magari maalum ya safari ya 4x4 husaidia kutazama wanyamapori na kusafiri kwa starehe. Timu itajadili paa la kutazamia, viti, nafasi ya mizigo na gari linalofaa kulingana na njia na idadi ya wageni.' },
      { match: /health|safety|afya|usalama|vaccin|insurance/, href: 'health-safety.html', en: 'The published guidance recommends speaking with a qualified travel-health professional, arranging insurance for treatment, evacuation and planned activities, and carrying medicines, documents and emergency contacts. Do not send detailed medical records here.', sw: 'Mwongozo uliyochapishwa unapendekeza kuzungumza na mtaalamu wa afya ya safari, kupanga bima ya matibabu, uokoaji na shughuli, na kubeba dawa, nyaraka na mawasiliano ya dharura. Usitume taarifa za kina za kitabibu hapa.' },
      { match: /booking|payment|malipo|kuhifadhi|reservation/, href: 'booking-payment.html', en: 'The booking path is: send an enquiry, review the itinerary and quotation, agree the details, pay using the official invoice instructions, then keep your written confirmation. An enquiry alone is not a confirmed booking.', sw: 'Hatua za kuhifadhi ni: tuma maombi, kagua ratiba na nukuu, kubaliana maelezo, lipa kwa maelekezo ya ankara rasmi, kisha hifadhi uthibitisho wa maandishi. Maombi pekee si uhifadhi uliothibitishwa.' },
      { match: /guide|packing|visa|documents|mwongozo|mizigo/, href: 'travel-guide.html', en: 'The Tanzania Travel Guide covers arrival and documents, money, packing, culture and getting around. Requirements can depend on your nationality, route and dates, so confirm current details before travel.', sw: 'Mwongozo wa Tanzania unahusu kuwasili na nyaraka, fedha, mizigo, utamaduni na usafiri. Mahitaji yanaweza kutegemea uraia, njia na tarehe zako, kwa hiyo thibitisha taarifa za sasa kabla ya kusafiri.' },
      { match: /photograph|photography|custom|tailor|binafsi|maalum/, href: 'packages.html', en: 'The approved pages support custom and tailor-made journeys: choose a published package and share preferences, or choose Custom Journey to provide destinations and duration. I could not find a separate published photography package, so photography-focused routes should be requested as a custom itinerary and confirmed by the team.', sw: 'Kurasa zilizoidhinishwa zinaunga mkono safari maalum: chagua kifurushi na shiriki mapendeleo, au chagua Custom Journey uweke maeneo na muda. Sijaona kifurushi maalum cha photography kilichochapishwa; njia ya photography iombwe kama safari maalum na ithibitishwe na timu.' },
      { match: /price|cost|budget|bei|gharama/, href: 'packages.html', en: `The published package catalogue currently shows per-person rates such as ${knowledge.packages.slice(0, 4).map(trip => `${trip.title} ${money(trip.price)}`).join(', ')}. These are indicative listing rates; dates, group size, accommodation and availability affect the final written quotation.`, sw: `Katalogi ya vifurushi inaonyesha bei za kila mtu, kwa mfano ${knowledge.packages.slice(0, 3).map(trip => `${trip.title} ${money(trip.price)}`).join(', ')}. Hizi ni bei za orodha za kuanzia; tarehe, idadi ya wageni, malazi na upatikanaji huathiri nukuu ya mwisho ya maandishi.` },
      { match: /serengeti|ngorongoro|tarangire|manyara|nyerere|ruaha|mikumi|katavi|gombe|destination|hifadhi|park/, href: 'destinations.html', en: 'Century Expeditions publishes destination pages for Serengeti, Ngorongoro, Tarangire, Lake Manyara, Nyerere, Ruaha, Mikumi, Katavi and Gombe, as well as Zanzibar and Kilimanjaro. Tell me which place interests you and I can open its page.', sw: 'Century Expeditions ina kurasa za Serengeti, Ngorongoro, Tarangire, Ziwa Manyara, Nyerere, Ruaha, Mikumi, Katavi na Gombe, pamoja na Zanzibar na Kilimanjaro. Niambie eneo linalokuvutia nikufungulie ukurasa wake.' },
      { match: /airport|transfer|pickup|private tour|group tour|accommodation|corporate|education/, href: 'contact.html', en: 'The published contact page lists safari bookings, Kilimanjaro climbing, group and private tours, volunteer placements, airport transfers, family vacations, accommodation, honeymoon packages, Zanzibar holidays and corporate or education tours. Arrangements and pricing need a quotation.', sw: 'Ukurasa wa mawasiliano unaorodhesha bookings za safari, Kilimanjaro, safari za makundi na binafsi, kujitolea, airport transfers, likizo za familia, malazi, fungate, Zanzibar na ziara za kampuni au elimu. Mipango na bei zinahitaji nukuu.' },
      { match: /contact|whatsapp|email|team|wasiliana/, href: 'contact.html', en: `The team can help with bookings, custom itineraries and practical questions. General enquiries: ${CONTACT.adminEmail}; bookings: ${CONTACT.bookingEmail}; sales and quotations: ${CONTACT.generalEmail}; support: ${CONTACT.supportEmail}. WhatsApp ${CONTACT.phone}, or open the enquiry form.`, sw: `Timu inaweza kusaidia uhifadhi, ratiba maalum na maswali ya safari. Maswali ya jumla: ${CONTACT.adminEmail}; bookings: ${CONTACT.bookingEmail}; mauzo na nukuu: ${CONTACT.generalEmail}; msaada: ${CONTACT.supportEmail}. WhatsApp ${CONTACT.phone}, au fungua fomu ya maombi.` },
    ];
    const service = services.find(item => item.match.test(q));
    if (service) {
      addLink(sw ? 'Fungua ukurasa husika' : 'Open the relevant page', service.href);
      if (service.href === 'health-safety.html') {
        addLink(sw ? 'Mwongozo wa afya wa CDC' : 'CDC Tanzania health guidance', 'https://wwwnc.cdc.gov/travel/destinations/traveler/none/tanzania');
        addLink(sw ? 'Mahitaji ya kuingia' : 'Current entry requirements', 'https://www.gov.uk/foreign-travel-advice/tanzania/entry-requirements');
      }
      addLink(sw ? 'WhatsApp timu' : 'WhatsApp the team', CONTACT.whatsapp);
      return { answer: sw ? service.sw : service.en, links, recommendedPackages: [], ask: [] };
    }
    addLink(sw ? 'Vifurushi na ratiba' : 'Packages and itineraries', 'packages.html');
    addLink(sw ? 'Maeneo ya Tanzania' : 'Tanzania destinations', 'destinations.html');
    addLink(sw ? 'Wasiliana na timu' : 'Contact the team', contactQuery(sw ? 'Nahitaji msaada wa kupanga safari.' : 'I would like help planning a trip.'));
    return { answer: sw ? 'Naweza kusaidia kuhusu vifurushi, maeneo, safari za familia, fungate, Uhamiaji Mkuu, kujitolea, Kilimanjaro, Zanzibar, magari, mwongozo, afya, usalama na malipo. Ungependa kuanza na lipi?' : 'I can help with packages, destinations, family trips, honeymoons, the Great Migration, volunteering, Kilimanjaro, Zanzibar, vehicles, travel guidance, health, safety and booking. Which would you like to explore?', links, recommendedPackages: [], ask: sw ? ['Nisaidie kuchagua safari'] : ['Find a safari for me'] };
  }

  function prefillContactFromAssistant() {
    const params = new URLSearchParams(location.search);
    if (params.get('assistant') !== '1') return;
    const message = document.querySelector('#contact-form #message, #message');
    const text = params.get('message');
    if (message && text && !message.value) message.value = text;
    const type = document.querySelector('#contact-form #safari_type, #safari_type');
    const requestedType = params.get('safari_type');
    if (type && requestedType && Array.from(type.options).some(option => option.value === requestedType)) type.value = requestedType;
  }

  async function loadKnowledge() {
    try {
      const response = await fetch('assistant-knowledge.json', { cache: 'no-store' });
      if (!response.ok) return;
      const data = await response.json();
      if (Array.isArray(data.pages) && Array.isArray(data.packages)) knowledge = data;
    } catch (_) { /* local fallback keeps the widget useful before a server is configured */ }
  }

  function start() {
    initMarkup();
    if (typeof window.applyCenturyLanguage === 'function') window.applyCenturyLanguage(state.lang);
    loadKnowledge();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
