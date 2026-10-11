import { NadyaRuntime } from './core/runtime.js';
import { LocalMemoryStore } from './core/memory.js';

const runtime = new NadyaRuntime();
const memory = new LocalMemoryStore();
const $ = (selector) => document.querySelector(selector);
const navItems = [...document.querySelectorAll('[data-view]')];
const views = [...document.querySelectorAll('[data-panel]')];
const chat = $('#chat-messages');
const form = $('#chat-form');
const input = $('#message-input');
const status = $('#runtime-status');
const memoryToggle = $('#memory-toggle');
const memoryForm = $('#memory-form');
const memoryInput = $('#memory-input');
const memoryList = $('#memory-list');
const memoryStatus = $('#memory-status');
const exportMemoryButton = $('#export-memory');
const clearMemoryButton = $('#clear-memory');

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
  addMessage('assistant', 'Sesi percakapan lokal telah dibersihkan. Catatan memori yang kamu simpan secara manual tidak ikut dihapus.');
});

function renderMemory() {
  const enabled = memory.isEnabled();
  memoryToggle.checked = enabled;
  memoryList.replaceChildren();
  exportMemoryButton.disabled = !enabled;
  const items = memory.list();
  if (!enabled) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = 'Memori sedang nonaktif. Aktifkan persetujuan untuk melihat dan mengelola catatan yang tersimpan di browser ini.';
    memoryList.append(empty);
    memoryStatus.textContent = 'Memori nonaktif. Data yang sudah tersimpan tetap berada di perangkat sampai kamu menghapusnya.';
    return;
  }
  if (!items.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = 'Belum ada catatan. Tambahkan hanya hal yang memang ingin NADYA ingat di perangkat ini.';
    memoryList.append(empty);
  }
  for (const item of items) {
    const article = document.createElement('article');
    article.className = 'memory-item';
    const content = document.createElement('div');
    const note = document.createElement('p');
    note.textContent = item.text;
    const date = document.createElement('small');
    date.textContent = new Date(item.createdAt).toLocaleString('id-ID');
    content.append(note, date);
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'outline-button danger-button';
    remove.textContent = 'Hapus';
    remove.setAttribute('aria-label', 'Hapus catatan memori');
    remove.addEventListener('click', () => {
      memory.remove(item.id);
      memoryStatus.textContent = 'Catatan memori dihapus dari browser ini.';
      renderMemory();
    });
    article.append(content, remove);
    memoryList.append(article);
  }
  memoryStatus.textContent = `${items.length} catatan tersimpan hanya di browser/perangkat ini. Pesan chat tidak disimpan otomatis.`;
}

memoryToggle.addEventListener('change', () => {
  memory.setConsent(memoryToggle.checked);
  memoryStatus.textContent = memoryToggle.checked
    ? 'Persetujuan aktif. Memori tetap manual: hanya catatan yang kamu tambahkan yang akan disimpan.'
    : 'Persetujuan dinonaktifkan. Catatan lama tetap tersimpan di perangkat tetapi disembunyikan sampai persetujuan diaktifkan kembali.';
  renderMemory();
});

memoryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  try {
    memory.add(memoryInput.value);
    memoryInput.value = '';
    memoryStatus.textContent = 'Catatan disimpan secara lokal.';
    renderMemory();
    memoryInput.focus();
  } catch (error) {
    memoryStatus.textContent = error.message;
  }
});

exportMemoryButton.addEventListener('click', () => {
  try {
    const blob = new Blob([memory.exportJSON()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'nadya-memory-export.json';
    anchor.click();
    URL.revokeObjectURL(url);
    memoryStatus.textContent = 'Ekspor memori dibuat di perangkat ini.';
  } catch (error) {
    memoryStatus.textContent = error.message;
  }
});

clearMemoryButton.addEventListener('click', () => {
  if (!window.confirm('Hapus semua catatan memori NADYA yang tersimpan di browser ini? Tindakan ini tidak dapat dibatalkan.')) return;
  memory.clear();
  memoryStatus.textContent = 'Semua catatan memori dihapus dari browser ini.';
  renderMemory();
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
renderMemory();

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {
    status.textContent = 'Runtime lokal aktif · mode offline belum tersedia di origin ini';
  }));
}
