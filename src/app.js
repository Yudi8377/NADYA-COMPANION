import { NadyaRuntime } from './core/runtime.js';
import { LocalMemoryStore } from './core/memory.js';
import { NadyaOrchestrator } from './core/orchestrator.js';
import { HttpChatProvider } from './core/provider.js';

const runtime = new NadyaRuntime();
const memory = new LocalMemoryStore();
const orchestrator = new NadyaOrchestrator();
const provider = new HttpChatProvider();
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

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const message = input.value.trim();
  if (!message) return;
  addMessage('user', message);
  input.value = '';
  input.disabled = true;
  const sendButton = form.querySelector('button[type="submit"]');
  if (sendButton) sendButton.disabled = true;
  status.textContent = 'Menghubungi backend AI yang dikonfigurasi…';
  try {
    const messages = [...runtime.history, { role: 'user', text: message }]
      .slice(-12)
      .map((item) => ({ role: item.role, content: item.text }));
    const approvedMemories = memory.isEnabled() ? memory.list().map((item) => item.text) : [];
    const result = await provider.respond({ messages, memories: approvedMemories });
    const now = new Date().toISOString();
    runtime.history.push({ role: 'user', text: message, at: now });
    runtime.history.push({ role: 'assistant', text: result.text, intent: 'remote', at: new Date().toISOString() });
    runtime.history = runtime.history.slice(-24);
    addMessage('assistant', result.text);
    status.textContent = `Model AI server aktif · ${result.model}`;
  } catch (error) {
    const result = runtime.respond(message);
    addMessage('assistant', result.text);
    status.textContent = `Mode lokal aktif · backend AI belum tersedia (${error.code || 'koneksi gagal'}). Pesan tidak dikirim ke memori lokal otomatis.`;
  } finally {
    input.disabled = false;
    if (sendButton) sendButton.disabled = false;
    input.focus();
  }
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

const planForm = $('#agent-task-form');
const planInput = $('#agent-task-input');
const planOutput = $('#agent-plan');
const planStatus = $('#agent-plan-status');

function renderPlan(result) {
  planOutput.replaceChildren();
  const heading = document.createElement('div');
  heading.className = 'plan-result-heading';
  const title = document.createElement('h3');
  title.textContent = 'Rencana kerja';
  const progress = document.createElement('span');
  progress.className = 'muted-label';
  heading.append(title, progress);
  const list = document.createElement('div');
  list.className = 'plan-steps';
  const updateProgress = () => {
    const checks = [...list.querySelectorAll('input[type="checkbox"]')];
    const done = checks.filter((check) => check.checked).length;
    progress.textContent = `${done}/${checks.length} langkah selesai`;
    planStatus.textContent = 'Agen perencana lokal berbasis aturan; bukan model AI generatif.';
  };
  result.steps.forEach((step) => {
    const label = document.createElement('label');
    label.className = 'plan-step';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', updateProgress);
    const text = document.createElement('span');
    text.textContent = step;
    label.append(checkbox, text);
    list.append(label);
  });
  planOutput.append(heading, list);
  updateProgress();
}

planForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const result = orchestrator.run(planInput.value);
  if (!result.ok) {
    planStatus.textContent = result.message;
    return;
  }
  renderPlan(result);
  renderTraces();
  planStatus.textContent = `Agen ${result.agentLabel} menyusun rencana lokal untuk: ${result.goal}`;
});

const traceList = $('#agent-trace-list');
const exportTracesButton = $('#export-agent-traces');
const clearTracesButton = $('#clear-agent-traces');

function renderTraces() {
  traceList.replaceChildren();
  const traces = [...orchestrator.traces].reverse();
  if (!traces.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = 'Belum ada jejak eksekusi. Jalankan perencana untuk membuat catatan audit lokal.';
    traceList.append(empty);
    return;
  }
  for (const trace of traces) {
    const item = document.createElement('article');
    item.className = 'trace-item';
    const title = document.createElement('strong');
    title.textContent = trace.agentId === 'planner' ? 'Planning Agent' : trace.agentId;
    const meta = document.createElement('small');
    meta.textContent = `${new Date(trace.at).toLocaleString('id-ID')} · ${trace.mode} · ${trace.stepCount} langkah`;
    item.append(title, meta);
    traceList.append(item);
  }
}

exportTracesButton.addEventListener('click', () => {
  const blob = new Blob([orchestrator.exportTracesJSON()], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'nadya-agent-traces.json';
  anchor.click();
  URL.revokeObjectURL(url);
});

clearTracesButton.addEventListener('click', () => {
  if (!window.confirm('Hapus seluruh jejak eksekusi lokal?')) return;
  orchestrator.clearTraces();
  renderTraces();
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
renderTraces();

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {
    status.textContent = 'Runtime lokal aktif · mode offline belum tersedia di origin ini';
  }));
}
