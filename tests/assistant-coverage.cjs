const fs = require('fs');
const path = require('path');
const knowledge = require('../assistant-knowledge.json');

const required = [
  'packages.html', 'destinations.html', 'family.html', 'honeymoon.html', 'migration.html',
  'volunteer.html', 'kilimanjaro.html', 'zanzibar.html', 'vehicles.html', 'travel-guide.html',
  'health-safety.html', 'booking-payment.html', 'contact.html', 'serengeti.html', 'ngorongoro.html',
  'tarangire.html', 'manyara.html', 'nyerere.html', 'ruaha.html', 'mikumi.html', 'katavi.html', 'gombe.html',
];
const indexed = new Set(knowledge.pages.map(page => page.href));
const missing = required.filter(page => !indexed.has(page) || !knowledge.pages.find(item => item.href === page).content);
if (missing.length) {
  console.error('Missing assistant coverage:', missing.join(', '));
  process.exit(1);
}

const records = [...knowledge.pages, ...knowledge.packages];
const missingMetadata = records.filter(record => !record.sourcePage || !record.lastUpdateDate || record.approvalStatus !== 'approved-public');
if (missingMetadata.length) {
  console.error('Knowledge provenance metadata missing:', missingMetadata.map(record => record.label || record.title || record.id).join(', '));
  process.exit(1);
}

const questions = JSON.parse(fs.readFileSync(path.join(__dirname, 'assistant-questions.json'), 'utf8'));
const failedQuestions = questions.filter(item => {
  const page = knowledge.pages.find(candidate => candidate.href === item.page);
  return !page || item.terms.some(term => !page.content.toLowerCase().includes(term.toLowerCase()));
});
if (failedQuestions.length) {
  console.error('Knowledge question coverage failed:', failedQuestions.map(item => item.question).join(' | '));
  process.exit(1);
}

const behavior = JSON.parse(fs.readFileSync(path.join(__dirname, 'assistant-behavior.json'), 'utf8'));
const assistantSource = fs.readFileSync(path.join(__dirname, '..', 'assistant.js'), 'utf8');
const missingBehavior = behavior.filter(item => {
  const expected = item.expectedText || item.canonical;
  return expected && !assistantSource.toLowerCase().includes(expected.toLowerCase());
});
if (missingBehavior.length) {
  console.error('Assistant behavior coverage failed:', missingBehavior.map(item => item.type).join(', '));
  process.exit(1);
}

console.log(`Assistant coverage OK: ${knowledge.pages.length} pages, ${knowledge.packages.length} packages, ${questions.length} service questions and ${behavior.length} behavior cases checked.`);
