/*
 * Build the public knowledge snapshot used by the Safari Assistant.
 *
 * This intentionally reads only the approved, local public pages listed below.
 * Run it before deployment so content edits are reflected in the assistant
 * without copying private or unpublished material into the model context.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const approvedPages = [
  ['index.html', 'Home'],
  ['safaris.html', 'Safari tours'],
  ['packages.html', 'Safari packages and itineraries'],
  ['destinations.html', 'Tanzania destinations'],
  ['serengeti.html', 'Serengeti National Park'],
  ['ngorongoro.html', 'Ngorongoro Conservation Area'],
  ['tarangire.html', 'Tarangire National Park'],
  ['manyara.html', 'Lake Manyara National Park'],
  ['nyerere.html', 'Nyerere National Park'],
  ['ruaha.html', 'Ruaha National Park'],
  ['mikumi.html', 'Mikumi National Park'],
  ['katavi.html', 'Katavi National Park'],
  ['gombe.html', 'Gombe Stream National Park'],
  ['family.html', 'Family trips'],
  ['honeymoon.html', 'Honeymoon trips'],
  ['migration.html', 'Great Migration trips'],
  ['volunteer.html', 'Volunteer programmes'],
  ['kilimanjaro.html', 'Kilimanjaro experiences'],
  ['zanzibar.html', 'Zanzibar holidays'],
  ['gallery.html', 'Photo gallery'],
  ['vehicles.html', 'Safari vehicles'],
  ['travel-guide.html', 'Tanzania travel guide'],
  ['health-safety.html', 'Health and safety'],
  ['booking-payment.html', 'Booking and payment'],
  ['contact.html', 'Contact Century Expeditions'],
  ['about.html', 'About Century Expeditions'],
];

const entities = {
  '&amp;': '&', '&nbsp;': ' ', '&quot;': '"', '&#39;': "'", '&lt;': '<', '&gt;': '>',
  '&ndash;': '-', '&mdash;': '-', '&bull;': '•', '&rarr;': '→', '&times;': '×',
};

function decode(value) {
  return value.replace(/&(?:amp|nbsp|quot|#39|lt|gt|ndash|mdash|bull|rarr|times);/gi, token => entities[token.toLowerCase()] || token);
}

function cleanHtml(raw) {
  let html = raw.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || raw.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] || raw;
  html = html.replace(/<!--[\s\S]*?-->/g, ' ');
  html = html.replace(/<(script|style|svg|noscript|template|form|footer|header|nav)\b[\s\S]*?<\/\1>/gi, ' ');
  html = html.replace(/<img\b[^>]*>/gi, ' ');
  html = html.replace(/<[^>]+>/g, ' ');
  const text = decode(html)
    .replace(/[\u0000-\u001f]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.slice(0, 9000);
}

function titleOf(raw, fallback) {
  const title = raw.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || fallback;
  return decode(title.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

function externalLinks(raw) {
  return [...new Set([...raw.matchAll(/<a\b[^>]*href=["'](https?:\/\/[^"']+)["']/gi)].map(match => match[1]))]
    .filter(href => /cdc\.gov|gov\.uk\/foreign-travel-advice\/tanzania/i.test(href));
}

function loadPackages() {
  const source = fs.readFileSync(path.join(root, 'packages-data.js'), 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox, { filename: 'packages-data.js' });
  return sandbox.window.SAFARI_PACKAGES || [];
}

const pages = approvedPages.map(([file, label]) => {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  return {
    file,
    label,
    title: titleOf(source, label),
    href: file,
    sourcePage: file,
    lastUpdateDate: new Date().toISOString().slice(0, 10),
    approvalStatus: 'approved-public',
    links: externalLinks(source),
    content: cleanHtml(source),
  };
});

const knowledge = {
  generatedAt: new Date().toISOString(),
  sourcePolicy: 'Approved public Century Expeditions pages and the published safari package catalogue only.',
  contact: {
    phone: '+255 747 115 390',
    whatsapp: 'https://wa.me/255747115390',
    adminEmail: 'admin@century-adventures.com',
    bookingsEmail: 'bookings@century-adventures.com',
    generalEmail: 'visit@century-adventures.com',
    supportEmail: 'support@century-adventures.com',
    address: 'Asasi Tower, 4th Floor, Ohio Street, Dar es Salaam, Tanzania',
    departments: {
      general: 'admin@century-adventures.com',
      bookings: 'bookings@century-adventures.com',
      salesAndQuotations: 'visit@century-adventures.com',
      support: 'support@century-adventures.com',
    },
  },
  pages,
  packages: loadPackages().map(packageRecord => ({
    ...packageRecord,
    sourcePage: 'packages.html',
    lastUpdateDate: new Date().toISOString().slice(0, 10),
    approvalStatus: 'approved-public',
  })),
};

fs.writeFileSync(path.join(root, 'assistant-knowledge.json'), JSON.stringify(knowledge, null, 2) + '\n');
console.log(`Built assistant knowledge from ${pages.length} approved pages and ${knowledge.packages.length} packages.`);
