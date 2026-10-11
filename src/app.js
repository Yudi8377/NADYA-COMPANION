import { NadyaRuntime } from './core/runtime.js';

const runtime = new NadyaRuntime();
const $ = (selector) => document.querySelector(selector);
const navItems = [...document.querySelectorAll('[data-view]')];
const views = [...document.querySelectorAll('[data-panel]')];
const chat = $('#chat-messages');
const form = $('#chat-form');
const input = $('#message-input');
const status = $('#runtime-status');

function showView(name) {
  navItems.forEach((item) => item.classList.toggle('active', item.dataset.view === name));
  views.forEach((panel) => { panel.hidden = panel.dataset.panel !== name; });
}
navItems.forEach((item) => item.addEventListener('click', () => showView(item.dataset.view)));

function addMessage(role, text) {
  const article = document.createElement('article');
  article.className = `message ${role}`;
  const label = document.createElement('span');
  label.className = 'message-label';
  label.textContent = role === 'assistant' ? 'NADYA' : 'KAMU';
  const body = document.createElement('p');
  body.textContent = text;
  article.append(label, body);
  chat.append(article);
  chat.scrollTop = chat.scrollHeight;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = input.value.trim();
  if (!message) return;
  addMessage('user', message);
  const result = runtime.respond(message);
  addMessage('assistant', result.text);
  status.textContent = 'Runtime lokal aktif · model AI eksternal belum terhubung';
  input.value = '';
  input.focus();
});

$('#clear-chat').addEventListener('click', () => {
  runtime.clearSession();
  chat.replaceChildren();
  addMessage('assistant', 'Sesi percakapan lokal telah dibersihkan. Tidak ada riwayat yang disinkronkan ke cloud.');
});

$('#memory-toggle').addEventListener('change', (event) => {
  const note = $('#memory-note');
  note.textContent = event.target.checked
    ? 'Persetujuan demo aktif: preferensi hanya dapat disimpan lokal setelah fitur memori diimplementasikan. Belum ada data yang disimpan.'
    : 'Memori permanen nonaktif. Versi ini tidak menyimpan pesan ke penyimpanan permanen.';
});

function renderCapabilities() {
  const list = $('#capability-list');
  list.replaceChildren();
  for (const capability of runtime.capabilities.list()) {
    const item = document.createElement('article');
    item.className = 'capability';
    const info = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = capability.label;
    const desc = document.createElement('p');
    desc.textContent = capability.description;
    info.append(title, desc);
    const badge = document.createElement('span');
    badge.className = `state state-${capability.state}`;
    badge.textContent = capability.state;
    item.append(info, badge);
    list.append(item);
  }
}
renderCapabilities();

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {
    status.textContent = 'Runtime lokal aktif · mode offline belum tersedia di origin ini';
  }));
}
