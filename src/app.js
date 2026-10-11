import { NadyaRuntime } from './core/runtime.js';
import { LocalMemoryStore } from './core/memory.js';
import { NadyaAgentTeam } from './core/agents.js';
import { HttpChatProvider } from './core/provider.js';
import { LocalKnowledgeBase } from './core/knowledge.js';

const runtime = new NadyaRuntime();
const memory = new LocalMemoryStore();
const orchestrator = new NadyaAgentTeam();
const provider = new HttpChatProvider();
const knowledge = new LocalKnowledgeBase();
const personaDefaults = { role: 'friend', gender: 'feminine', avatar: 'orb', style: 'adaptive', language: 'id', pauses: 'balanced', voiceName: '' };
let persona = { ...personaDefaults };
try { persona = { ...personaDefaults, ...JSON.parse(localStorage.getItem('nadya.persona.v1') || '{}') }; } catch {}
const personaNames = { feminine: 'NADYA', masculine: 'ARYA', neutral: 'NADYA' };\nlet availableVoices = [];\nfunction refreshVoiceOptions() {\n  if (!(\"speechSynthesis\" in window)) return;\n  availableVoices = window.speechSynthesis.getVoices();\n  const select = document.querySelector('#persona-voice-name');\n  if (!select) return;\n  const previous = persona.voiceName || select.value;\n  select.replaceChildren();\n  const automatic = document.createElement('option'); automatic.value = ''; automatic.textContent = 'Otomatis — pilih suara yang cocok'; select.append(automatic);\n  availableVoices.forEach((voice) => { const option = document.createElement('option'); option.value = voice.name; option.textContent = voice.name + ' (' + voice.lang + ')'; select.append(option); });\n  if (availableVoices.some((voice) => voice.name === previous)) select.value = previous;\n}\nif (\"speechSynthesis\" in window) { refreshVoiceOptions(); window.speechSynthesis.onvoiceschanged = refreshVoiceOptions; }
const avatarGlyphs = { orb: '🔵', star: '✨', leaf: '🌿', moon: '🌙', sun: '☀️', cat: '🐱', fox: '🦊', owl: '🦉', robot: '🤖' };
const languageTags = { id: 'id-ID', jv: 'jv-ID', su: 'su-ID', mad: 'id-ID', mixed: 'id-ID' };
function companionName() { return personaNames[persona.gender] || 'NADYA'; }
function applyPersona() {
  document.querySelectorAll('.brand strong').forEach((el) => { el.textContent = companionName(); });
  document.querySelectorAll('.brand small').forEach((el) => { el.textContent = persona.gender === 'masculine' ? 'AI COMPANION · ARYA' : 'AI COMPANION'; });
  document.querySelectorAll('.message-label').forEach((el) => { if (el.textContent === 'NADYA' || el.textContent === 'ARYA') el.textContent = companionName(); });
  const orb = document.querySelector('#nadya-orb');
  if (orb) { orb.dataset.avatar = persona.avatar; orb.setAttribute('aria-label', 'Tekan untuk memulai percakapan suara dengan ' + companionName()); const core = orb.querySelector('.orb-core'); if (core) core.textContent = persona.avatar === 'orb' ? '' : (avatarGlyphs[persona.avatar] || '🔵'); }
  const mini = document.querySelector('#voice-orb-mini');
  if (mini) { mini.dataset.avatar = persona.avatar; const span = mini.querySelector('span'); if (span) span.textContent = persona.avatar === 'orb' ? '' : (avatarGlyphs[persona.avatar] || '🔵'); }
  const title = document.querySelector('.topbar h1'); if (title) title.textContent = 'Ruang ' + companionName();
  const footer = document.querySelector('.footer span'); if (footer) footer.textContent = companionName() + ' AI COMPANION';\n  const welcome = document.querySelector('[data-panel=\"chat\"] .welcome-row h2'); if (welcome) welcome.textContent = 'Halo, aku ' + companionName() + '.';
  if (recognition) recognition.lang = languageTags[persona.language] || 'id-ID';
  const fields = { 'persona-role': persona.role, 'persona-gender': persona.gender, 'persona-avatar': persona.avatar, 'persona-style': persona.style, 'persona-language': persona.language, 'persona-pauses': persona.pauses, 'persona-voice-name': persona.voiceName || '' };
  Object.entries(fields).forEach(([id, value]) => { const el = document.getElementById(id); if (el) el.value = value; });
}

const voiceButton = document.querySelector('#voice-toggle');
const speakButton = document.querySelector('#speak-toggle');
const remoteToggle = document.querySelector('#remote-toggle');
const voiceState = document.querySelector('#voice-state');
const voiceHelp = document.querySelector('#voice-help');
const voiceOrbs = [document.querySelector('#nadya-orb'), document.querySelector('#voice-orb-mini')].filter(Boolean);
let recognition = null;
let speakingEnabled = true;
let voiceSessionActive = false;
let recognitionShouldRestart = false;
const layoutButton = document.querySelector('#layout-toggle');
const mainOrb = document.querySelector('#nadya-orb');
function setVoiceState(state, label, help = '') { voiceOrbs.forEach((orb) => { orb.dataset.state = state; }); if (voiceState) voiceState.textContent = label; if (voiceHelp && help) voiceHelp.textContent = help; }
function speak(text) {
  if (!speakingEnabled || !('speechSynthesis' in window)) { if (voiceSessionActive) startListeningAgain(); return; }
  if (recognition && voiceSessionActive) { recognitionShouldRestart = true; try { recognition.stop(); } catch {} }
  window.speechSynthesis.cancel();
  // Jangan membacakan "hmm" di awal setiap jawaban. Jeda berpikir ditampilkan saat menunggu,
  // sedangkan jeda bicara berasal dari tanda baca dan pemenggalan kalimat.
  let clean = String(text).slice(0, 1800)
    .replace(/NADYA\s+AI\s+COMPANION/gi, 'Nadya AI Companion')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.!?;:])/g, '$1')
    .replace(/([.!?])([A-ZÀ-Ý])/g, '$1 $2');
  if (persona.style === 'casual' || persona.style === 'playful') clean = clean.replace(/^Baik[,!.]?\s+/i, 'Oke, ').replace(/^Tentu[,!.]?\s+/i, 'Bisa banget, ');
  const englishWords = (clean.match(/\b(the|and|you|your|hello|thank|please|what|how|is|are|companion|welcome|good|morning|afternoon|evening|today|tomorrow|because|with|from|about)\b/gi) || []).length;
  const indonesianWords = (clean.match(/\b(dan|yang|aku|kamu|untuk|dengan|dalam|adalah|bisa|tidak|sudah|akan|karena|selamat|terima|kasih|bagaimana|apa|ini|itu)\b/gi) || []).length;
  const lang = persona.language === 'jv' ? 'jv-ID' : persona.language === 'su' || persona.language === 'mad' || persona.language === 'mixed' ? 'id-ID' : (englishWords > indonesianWords ? 'en-US' : 'id-ID');
  const voiceList = availableVoices.length ? availableVoices : window.speechSynthesis.getVoices();
  const malePattern = /male|pria|andika|guy|david|alex|daniel|rishi|jorge|thomas|microsoft ardi|microsoft budi|microsoft reza/i;
  const femalePattern = /female|perempuan|woman|zira|samantha|karen|tessa/i;
  let candidates = voiceList.filter((voice) => voice.lang.toLowerCase().startsWith(lang.split('-')[0].toLowerCase()));
  if (!candidates.length && lang !== 'id-ID') candidates = voiceList.filter((voice) => voice.lang.toLowerCase().startsWith('id'));
  const wanted = persona.gender === 'masculine' ? malePattern : persona.gender === 'feminine' ? femalePattern : null;
  const selected = (persona.voiceName && voiceList.find((voice) => voice.name === persona.voiceName)) || (wanted ? candidates.find((voice) => wanted.test(voice.name)) : null);\n  const genderMismatch = persona.gender === 'masculine' && (!selected || femalePattern.test(selected.name));
  const chunks = clean.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((part) => part.trim()).filter(Boolean) || [clean];
  let chunkIndex = 0;
  const speakNext = () => {
    if (chunkIndex >= chunks.length) {
      setVoiceState('idle', voiceSessionActive ? 'Mode percakapan suara aktif' : companionName() + ' siap', voiceSessionActive ? 'Silakan lanjut berbicara; mikrofon akan aktif kembali.' : 'Tekan mikrofon untuk memulai percakapan suara.');
      if (voiceSessionActive) startListeningAgain();
      return;
    }
    const part = chunks[chunkIndex++];
    const emotional = /maaf|sedih|berat|kecewa|takut|cemas|khawatir|sulit/i.test(part) ? 'gentle' : /selamat|hebat|berhasil|keren|bagus|senang|mantap/i.test(part) ? 'bright' : /\?/.test(part) ? 'curious' : 'calm';
    const utterance = new SpeechSynthesisUtterance(part);
    utterance.lang = lang;
    if (selected) utterance.voice = selected;
    // Rentang kecil membuat suara lebih nyaman; kualitas intonasi tetap mengikuti mesin suara browser.
    utterance.rate = emotional === 'gentle' ? 0.91 : emotional === 'bright' ? 1.0 : persona.style === 'playful' ? 0.99 : 0.95;
    utterance.pitch = persona.gender === 'masculine' ? 0.82 : persona.gender === 'feminine' ? 1.04 : 1.0;
    if (emotional === 'gentle') utterance.pitch *= 0.98;
    if (emotional === 'bright') utterance.pitch *= 1.02;
    utterance.onstart = () => setVoiceState('speaking', companionName() + ' sedang berbicara', selected ? 'Menggunakan suara ' + selected.name + '.' : (genderMismatch ? 'PERINGATAN: suara pria tidak terdeteksi. Pilih suara pria pada Persona & Suara; browser mungkin memakai suara default.' : 'Suara dan intonasi mengikuti dukungan browser/perangkat.'));
    utterance.onend = () => { if (chunkIndex < chunks.length) { window.setTimeout(speakNext, /[,;:]$/.test(part) ? 100 : 170); } else speakNext(); };
    utterance.onerror = () => { if (chunkIndex < chunks.length) speakNext(); else { setVoiceState('idle', companionName() + ' siap', 'Suara browser tidak tersedia; jawaban tetap bisa dibaca.'); if (voiceSessionActive) startListeningAgain(); } };
    window.speechSynthesis.speak(utterance);
  };
  speakNext();
}
function startListeningAgain() {
  if (!recognition || !voiceSessionActive) return;
  recognitionShouldRestart = false;
  try { recognition.start(); } catch { setTimeout(() => { if (voiceSessionActive) { try { recognition.start(); } catch {} } }, 500); }
}
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (Recognition) { recognition = new Recognition(); recognition.lang = 'id-ID'; recognition.interimResults = false; recognition.continuous = true; recognition.maxAlternatives = 1; recognition.onstart = () => { voiceButton.setAttribute('aria-pressed', 'true'); voiceButton.textContent = '■ Akhiri voice'; setVoiceState('listening', companionName() + ' mendengarkan', 'Silakan berbicara; percakapan berlanjut sampai kamu mengakhiri mode voice.'); }; recognition.onresult = (event) => { let transcript = ''; for (let i = event.resultIndex; i < event.results.length; i += 1) { if (event.results[i].isFinal) transcript += `${event.results[i][0]?.transcript || ''} `; } transcript = transcript.trim(); if (transcript) { input.value = transcript; form.requestSubmit(); } }; recognition.onerror = (event) => { if (event.error === 'not-allowed' || event.error === 'service-not-allowed') { voiceSessionActive = false; setVoiceState('idle', 'Mikrofon tidak aktif', 'Izin mikrofon ditolak atau layanan pengenalan suara tidak tersedia.'); } else if (event.error !== 'no-speech' && event.error !== 'aborted') setVoiceState('idle', 'Voice terganggu', 'Kamu tetap bisa mengetik atau mencoba kembali.'); }; recognition.onend = () => { if (voiceSessionActive && recognitionShouldRestart) return; if (voiceSessionActive && !('speechSynthesis' in window && window.speechSynthesis.speaking)) { startListeningAgain(); return; } if (!voiceSessionActive) { voiceButton.setAttribute('aria-pressed', 'false'); voiceButton.textContent = '🎙 Mulai voice'; if (voiceState?.textContent === 'NADYA mendengarkan') setVoiceState('idle', companionName() + ' siap', 'Tekan mikrofon untuk memulai percakapan suara.'); } }; } else { voiceButton.disabled = true; voiceButton.title = 'Browser ini tidak mendukung Web Speech API.'; voiceHelp.textContent = 'Browser tidak mendukung pengenalan suara; pengetikan dan suara keluaran tetap tersedia jika didukung.'; }
voiceButton.addEventListener('click', () => { if (!recognition) return; if (voiceSessionActive) { voiceSessionActive = false; recognitionShouldRestart = false; try { recognition.stop(); } catch {} if ('speechSynthesis' in window) window.speechSynthesis.cancel(); voiceButton.setAttribute('aria-pressed', 'false'); voiceButton.textContent = '🎙 Mulai voice'; setVoiceState('idle', 'Voice dinonaktifkan', 'Tekan tombol untuk memulai percakapan suara lagi.'); } else { voiceSessionActive = true; voiceButton.setAttribute('aria-pressed', 'true'); voiceButton.textContent = '■ Akhiri voice'; startListeningAgain(); } });
layoutButton.addEventListener('click', () => { const compact = document.body.classList.toggle('orb-only'); layoutButton.setAttribute('aria-pressed', String(compact)); layoutButton.textContent = compact ? '▤ Tampilan lengkap' : '◉ Tampilan ikon saja'; });
const personaStatus = document.querySelector('#persona-status');
const personaFields = { role: '#persona-role', gender: '#persona-gender', avatar: '#persona-avatar', style: '#persona-style', language: '#persona-language', pauses: '#persona-pauses' };
function readPersonaForm() { return { ...Object.fromEntries(Object.entries(personaFields).map(([key, selector]) => [key, document.querySelector(selector)?.value || personaDefaults[key]])), voiceName: document.querySelector('#persona-voice-name')?.value || '' }; }
function savePersona() {
  persona = { ...personaDefaults, ...readPersonaForm() };
  try { localStorage.setItem('nadya.persona.v1', JSON.stringify(persona)); } catch {}
  applyPersona();
  if (personaStatus) { const voices = availableVoices.length ? availableVoices : (('speechSynthesis' in window) ? window.speechSynthesis.getVoices() : []); const chosen = persona.voiceName ? voices.find((v) => v.name === persona.voiceName) : null; const maleAvailable = voices.some((v) => /male|pria|andika|guy|david|alex|daniel|rishi|jorge|thomas|microsoft ardi|microsoft budi|microsoft reza/i.test(v.name)); personaStatus.textContent = 'Preferensi tersimpan di browser ini. Nama tampilan: ' + companionName() + '. ' + (persona.gender === 'masculine' && !chosen && !maleAvailable ? 'Peringatan: suara pria tidak terdeteksi. Pilih suara pria jika tersedia; suara bergantung pada OS/browser.' : chosen ? 'Suara dipilih: ' + chosen.name + '.' : 'Suara otomatis mengikuti perangkat.'); }
  setVoiceState('idle', companionName() + ' siap', 'Preferensi persona diterapkan.');
}
document.querySelector('#save-persona')?.addEventListener('click', savePersona);
document.querySelector('#reset-persona')?.addEventListener('click', () => { persona = { ...personaDefaults }; try { localStorage.removeItem('nadya.persona.v1'); } catch {} applyPersona(); if (personaStatus) personaStatus.textContent = 'Preferensi dikembalikan ke pengaturan awal.'; });
document.querySelector('#preview-persona')?.addEventListener('click', () => { savePersona(); speak('Halo, aku ' + companionName() + '. Aku akan menyesuaikan gaya bicara dengan konteks dan pilihanmu.'); });
Object.values(personaFields).forEach((selector) => document.querySelector(selector)?.addEventListener('change', () => { if (personaStatus) personaStatus.textContent = 'Ada perubahan yang belum disimpan.'; }));
applyPersona();
function beginVoiceFromOrb() {
  if (!recognition) { setVoiceState('idle', 'Voice tidak didukung', 'Gunakan tombol ketik atau browser yang mendukung pengenalan suara.'); return; }
  if (voiceSessionActive) return;
  voiceSessionActive = true;
  voiceButton.setAttribute('aria-pressed', 'true');
  voiceButton.textContent = '■ Akhiri voice';
  setVoiceState('listening', 'NADYA mendengarkan', 'Kamu bisa berbicara bergantian; NADYA akan mendengarkan lagi setelah jawabannya selesai.');
  startListeningAgain();
}
if (mainOrb) {
  mainOrb.setAttribute('role', 'button');
  mainOrb.setAttribute('tabindex', '0');
  mainOrb.setAttribute('aria-label', 'Tekan untuk memulai percakapan suara dengan ' + companionName());
  mainOrb.title = 'Tekan untuk memulai percakapan suara dengan ' + companionName();
  mainOrb.addEventListener('click', beginVoiceFromOrb);
  mainOrb.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); beginVoiceFromOrb(); } });
}
speakButton.addEventListener('click', () => { speakingEnabled = !speakingEnabled; speakButton.setAttribute('aria-pressed', String(speakingEnabled)); speakButton.textContent = speakingEnabled ? '🔊 Suara aktif' : '🔇 Suara mati'; if (!speakingEnabled && 'speechSynthesis' in window) window.speechSynthesis.cancel(); setVoiceState('idle', 'NADYA siap', speakingEnabled ? 'Suara jawaban diaktifkan.' : 'Suara jawaban dimatikan.'); });
remoteToggle.addEventListener('change', () => { status.textContent = remoteToggle.checked ? 'AI online diizinkan; penggunaan provider mungkin berbiaya.' : 'Mode lokal aktif · tanpa biaya API.'; });
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
  label.textContent = role === 'assistant' ? companionName() : 'KAMU';
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
  setVoiceState('thinking', companionName() + ' sedang berpikir…', 'Hmm… sebentar ya, aku sedang menyusun jawaban.');
  try {
    let result;
    if (remoteToggle.checked) {
      status.textContent = 'Menghubungi provider AI online sesuai pilihanmu…';
      const messages = [...runtime.history, { role: 'user', text: message }].slice(-8).map((item) => ({ role: item.role, content: item.text }));
      const approvedMemories = memory.isEnabled() ? memory.list().map((item) => item.text) : [];
      result = await provider.respond({ messages, memories: approvedMemories, persona });
      runtime.history.push({ role: 'user', text: message, at: new Date().toISOString() }, { role: 'assistant', text: result.text, intent: 'remote', at: new Date().toISOString() });
      runtime.history = runtime.history.slice(-24);
      status.textContent = `Model AI server aktif · ${result.model}`;
    } else {
      const top = knowledge.search(message)[0];
      if (top && top.score >= 2) {
        result = { text: top.text, mode: 'local-knowledge' };
        runtime.history.push({ role: 'user', text: message, at: new Date().toISOString() }, { role: 'assistant', text: result.text, intent: top.topic, at: new Date().toISOString() });
        runtime.history = runtime.history.slice(-24);
        status.textContent = `Pengetahuan lokal · ${top.topic}`;
      } else {
        result = runtime.respond(message);
        status.textContent = 'Mode lokal aktif · jawaban berbasis aturan; model generatif belum terpasang.';
      }
    }
    addMessage('assistant', result.text);
    speak(result.text);
  } catch (error) {
    const top = knowledge.search(message)[0];
    const result = top && top.score >= 2 ? { text: top.text } : runtime.respond(message);
    addMessage('assistant', result.text);
    status.textContent = `Provider online gagal (${error.code || 'koneksi gagal'}). NADYA kembali ke mode lokal; cek kemungkinan biaya provider.`;
    speak(result.text);
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
const teamAgent = $('#agent-agent-select');
const teamContext = $('#agent-context-input');
const workflowConsent = $('#workflow-preview-consent');

function renderPlan(result) {
  planOutput.replaceChildren();
  const card = document.createElement('article'); card.className = 'agent-result-card';
  const title = document.createElement('h3'); title.textContent = result.title || result.agentLabel;
  const mode = document.createElement('p'); mode.className = 'muted-label'; mode.textContent = result.agentLabel + ' · ' + result.mode;
  const answer = document.createElement('p'); answer.textContent = result.answer || '';
  card.append(title, mode, answer);
  const addList = (headingText, items, checks = false) => {
    if (!items?.length) return;
    const heading = document.createElement('h4'); heading.textContent = headingText; card.append(heading);
    const list = document.createElement('div'); list.className = checks ? 'plan-steps' : 'agent-findings';
    items.forEach((itemText) => {
      if (checks) {
        const label = document.createElement('label'); label.className = 'plan-step';
        const check = document.createElement('input'); check.type = 'checkbox';
        const text = document.createElement('span'); text.textContent = itemText;
        label.append(check, text); list.append(label);
      } else { const p = document.createElement('p'); p.textContent = '• ' + itemText; list.append(p); }
    });
    card.append(list);
  };
  addList('Temuan / batasan', result.findings);
  addList('Langkah kerja', result.steps, true);
  if (result.next) { const next = document.createElement('p'); next.className = 'notice'; next.textContent = 'Langkah berikutnya: ' + result.next; card.append(next); }
  if (result.requiresConfirmation) { const guard = document.createElement('p'); guard.className = 'notice'; guard.textContent = 'PENGAMAN AKTIF: pratinjau saja. Tidak ada aksi perangkat atau layanan eksternal yang dijalankan.'; card.append(guard); }
  planOutput.append(card);
}

planForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const result = orchestrator.run({ task: planInput.value, agent: teamAgent?.value || 'auto', context: teamContext?.value || '', consent: Boolean(workflowConsent?.checked) });
  if (!result.ok) { planStatus.textContent = result.message; return; }
  renderPlan(result); renderTraces();
  planStatus.textContent = result.agentLabel + ' berjalan lokal (' + result.mode + '). ' + (result.requiresConfirmation ? 'Hanya pratinjau aman; tidak ada tindakan eksternal.' : 'Periksa hasil sebelum mengandalkannya.');
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
    title.textContent = ({conversation:'Conversation Agent',research:'Knowledge & Research Agent',planning:'Planning Agent',workflow:'Device & Workflow Agent'})[trace.agentId] || trace.agentId;
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

// Local-only reflection and knowledge curation workspaces.
const JOURNAL_KEY = 'nadya.mental-wealth-journal.v1';
const JOURNAL_CONSENT_KEY = 'nadya.mental-wealth-journal-consent.v1';
const GROWTH_KEY = 'nadya.personal-growth-map.v1';
const KNOWLEDGE_DRAFTS_KEY = 'nadya.knowledge-drafts.v1';
const readLocalArray = (key) => { try { const v = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(v) ? v : []; } catch { return []; } };
const writeLocalArray = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const journalConsent = $('#journal-consent');
const journalForm = $('#journal-form');
const journalStatus = $('#journal-status');
const journalList = $('#journal-list');
function renderJournal() {
  if (!journalList) return;
  const enabled = localStorage.getItem(JOURNAL_CONSENT_KEY) === 'true';
  journalConsent.checked = enabled;
  journalForm.querySelectorAll('input,select,textarea,button[type="submit"]').forEach((el) => { el.disabled = !enabled; });
  journalList.replaceChildren();
  const entries = enabled ? readLocalArray(JOURNAL_KEY) : [];
  if (!enabled) { journalStatus.textContent = 'Jurnal nonaktif. Aktifkan persetujuan terlebih dahulu.'; return; }
  if (!entries.length) { const empty=document.createElement('p'); empty.className='empty-state'; empty.textContent='Belum ada entri jurnal. Isi hanya yang terasa nyaman untukmu.'; journalList.append(empty); }
  entries.forEach((entry) => {
    const card=document.createElement('article'); card.className='memory-item';
    const content=document.createElement('div'); const title=document.createElement('strong'); title.textContent=entry.emotion + ' · ' + new Date(entry.createdAt).toLocaleString('id-ID');
    const body=document.createElement('p'); body.textContent=[entry.need && 'Kebutuhan: '+entry.need,entry.gratitude && 'Disyukuri: '+entry.gratitude,entry.challenge && 'Tantangan: '+entry.challenge,entry.step && 'Langkah kecil: '+entry.step].filter(Boolean).join('\n') || 'Entri tanpa catatan tambahan.';
    content.append(title,body); const remove=document.createElement('button'); remove.className='outline-button danger-button'; remove.type='button'; remove.textContent='Hapus';
    remove.addEventListener('click',()=>{writeLocalArray(JOURNAL_KEY,readLocalArray(JOURNAL_KEY).filter(x=>x.id!==entry.id));renderJournal();});
    card.append(content,remove); journalList.append(card);
  });
  journalStatus.textContent = entries.length + ' entri tersimpan di browser ini saja; tidak dikirim ke provider AI.';
}
journalConsent?.addEventListener('change', () => { localStorage.setItem(JOURNAL_CONSENT_KEY, journalConsent.checked ? 'true' : 'false'); renderJournal(); });
journalForm?.addEventListener('submit',(event)=>{
  event.preventDefault();
  if(localStorage.getItem(JOURNAL_CONSENT_KEY)!=='true'){journalStatus.textContent='Aktifkan jurnal lokal terlebih dahulu.';return;}
  const emotion=$('#journal-emotion').value;
  if(!emotion){journalStatus.textContent='Pilih emosi atau pengalaman yang paling mendekati, bila nyaman.';return;}
  const entries=readLocalArray(JOURNAL_KEY);
  entries.unshift({id:globalThis.crypto?.randomUUID?.()||'journal-'+Date.now(),createdAt:new Date().toISOString(),emotion,need:$('#journal-need').value.trim(),gratitude:$('#journal-gratitude').value.trim(),challenge:$('#journal-challenge').value.trim(),step:$('#journal-step').value.trim()});
  writeLocalArray(JOURNAL_KEY,entries.slice(0,365)); journalForm.reset(); renderJournal();
});
$('#journal-export')?.addEventListener('click',()=>{
  if(localStorage.getItem(JOURNAL_CONSENT_KEY)!=='true'){journalStatus.textContent='Aktifkan persetujuan jurnal untuk mengekspor.';return;}
  const blob=new Blob([JSON.stringify({schemaVersion:1,exportedAt:new Date().toISOString(),entries:readLocalArray(JOURNAL_KEY)},null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='nadya-mental-wealth-journal.json';a.click();URL.revokeObjectURL(url);
});
$('#journal-clear')?.addEventListener('click',()=>{if(!window.confirm('Hapus semua entri Mental Wealth Journal dari browser ini?'))return;localStorage.removeItem(JOURNAL_KEY);renderJournal();});
renderJournal();

const growthForm=$('#growth-form'), growthList=$('#growth-list'), growthStatus=$('#growth-status');
const growthLabels={'self-awareness':'Pengenalan diri',communication:'Komunikasi',habits:'Kebiasaan',learning:'Pembelajaran',values:'Nilai hidup',relationships:'Hubungan'};
function renderGrowth(){
  if(!growthList)return;growthList.replaceChildren();const entries=readLocalArray(GROWTH_KEY);
  if(!entries.length){const p=document.createElement('p');p.className='empty-state';p.textContent='Belum ada refleksi. Kamu bisa mulai dari area yang terasa paling penting.';growthList.append(p);}
  entries.forEach((entry)=>{const card=document.createElement('article');card.className='memory-item';const content=document.createElement('div');const title=document.createElement('strong');title.textContent=(growthLabels[entry.area]||entry.area)+' · '+new Date(entry.createdAt).toLocaleDateString('id-ID');const goal=document.createElement('p');goal.textContent='Fokus: '+(entry.goal||'belum ditentukan');const reflection=document.createElement('p');reflection.textContent=entry.reflection||'Belum ada refleksi tertulis.';content.append(title,goal,reflection);const remove=document.createElement('button');remove.className='outline-button danger-button';remove.type='button';remove.textContent='Hapus';remove.addEventListener('click',()=>{writeLocalArray(GROWTH_KEY,readLocalArray(GROWTH_KEY).filter(x=>x.id!==entry.id));renderGrowth();});card.append(content,remove);growthList.append(card);});
  growthStatus.textContent=entries.length+' refleksi tersimpan lokal. Ini bukan skor atau diagnosis.';
}
growthForm?.addEventListener('submit',(event)=>{event.preventDefault();const area=$('#growth-area').value,goal=$('#growth-goal').value.trim(),reflection=$('#growth-reflection').value.trim();if(!goal&&!reflection){growthStatus.textContent='Isi fokus atau refleksi terlebih dahulu.';return;}const entries=readLocalArray(GROWTH_KEY);entries.unshift({id:globalThis.crypto?.randomUUID?.()||'growth-'+Date.now(),area,goal,reflection,createdAt:new Date().toISOString()});writeLocalArray(GROWTH_KEY,entries.slice(0,200));growthForm.reset();renderGrowth();});
$('#growth-export')?.addEventListener('click',()=>{const blob=new Blob([JSON.stringify({schemaVersion:1,exportedAt:new Date().toISOString(),entries:readLocalArray(GROWTH_KEY)},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='nadya-personal-growth-map.json';a.click();URL.revokeObjectURL(url);});
$('#growth-clear')?.addEventListener('click',()=>{if(!window.confirm('Hapus semua refleksi Personal Growth Map dari browser ini?'))return;localStorage.removeItem(GROWTH_KEY);renderGrowth();});
renderGrowth();

const knowledgeForm=$('#knowledge-form'), knowledgeStatus=$('#knowledge-status'), knowledgeDraftList=$('#knowledge-drafts');
function renderKnowledgeDrafts(){
  if(!knowledgeDraftList)return;knowledgeDraftList.replaceChildren();const drafts=readLocalArray(KNOWLEDGE_DRAFTS_KEY);
  if(!drafts.length){const p=document.createElement('p');p.className='empty-state';p.textContent='Belum ada draf riset. Draf yang dibuat di sini tidak otomatis diverifikasi atau disetujui.';knowledgeDraftList.append(p);}
  drafts.forEach((draft)=>{const card=document.createElement('article');card.className='memory-item';const content=document.createElement('div');const title=document.createElement('strong');title.textContent=draft.topic+' · '+(draft.status==='approved'?'disetujui lokal':'draf menunggu pemeriksaan');const meta=document.createElement('small');meta.textContent='Dicatat '+new Date(draft.createdAt).toLocaleString('id-ID')+' · '+draft.evidenceType+' · '+(draft.publishedAt||'tanggal publikasi tidak diketahui');const text=document.createElement('p');text.textContent=draft.text;const source=document.createElement('p');source.textContent='Sumber: '+draft.source;const limits=document.createElement('p');limits.textContent='Ketidakpastian: '+draft.limitations;content.append(title,meta,text,source,limits);card.append(content);
    if(draft.status!=='approved'){const approve=document.createElement('button');approve.type='button';approve.className='primary-button';approve.textContent='Uji materi & setujui lokal';approve.addEventListener('click',()=>{try{const url=new URL(draft.source);if(!['https:','http:'].includes(url.protocol))throw new Error('Sumber harus URL HTTP/HTTPS.');if(draft.text.trim().length<40)throw new Error('Materi terlalu pendek untuk diperiksa. Tambahkan ringkasan yang bermakna.');if(draft.limitations.trim().length<8)throw new Error('Jelaskan keterbatasan/ketidakpastian sebelum menyetujui.');knowledge.addApproved({topic:draft.topic,text:draft.text,source:draft.source,publishedAt:draft.publishedAt,evidenceType:draft.evidenceType,limitations:draft.limitations});draft.status='approved';draft.approvedAt=new Date().toISOString();writeLocalArray(KNOWLEDGE_DRAFTS_KEY,drafts);knowledgeStatus.textContent='Materi ditambahkan ke basis lokal dengan jejak sumber. Ini pemeriksaan format/kelengkapan, bukan verifikasi ilmiah otomatis.';renderKnowledgeDrafts();}catch(error){knowledgeStatus.textContent=error.message;}});card.append(approve);}
    const remove=document.createElement('button');remove.type='button';remove.className='outline-button danger-button';remove.textContent='Hapus draf';remove.addEventListener('click',()=>{writeLocalArray(KNOWLEDGE_DRAFTS_KEY,readLocalArray(KNOWLEDGE_DRAFTS_KEY).filter(x=>x.id!==draft.id));renderKnowledgeDrafts();});card.append(remove);knowledgeDraftList.append(card);
  });
  knowledgeStatus.textContent=drafts.filter(x=>x.status!=='approved').length+' draf menunggu; '+drafts.filter(x=>x.status==='approved').length+' disetujui lokal.';
}
knowledgeForm?.addEventListener('submit',(event)=>{event.preventDefault();const topic=$('#knowledge-topic').value.trim(),textValue=$('#knowledge-text').value.trim(),source=$('#knowledge-source').value.trim(),publishedAt=$('#knowledge-date').value,evidenceType=$('#knowledge-evidence').value,limitations=$('#knowledge-limits').value.trim();try{const url=new URL(source);if(!['http:','https:'].includes(url.protocol))throw new Error('Masukkan URL HTTP/HTTPS yang dapat diperiksa.');if(textValue.length<40)throw new Error('Ringkasan minimal 40 karakter agar cukup informatif.');if(limitations.length<8)throw new Error('Isi keterbatasan/ketidakpastian.');const drafts=readLocalArray(KNOWLEDGE_DRAFTS_KEY);drafts.unshift({id:globalThis.crypto?.randomUUID?.()||'draft-'+Date.now(),topic,text:textValue,source,publishedAt,evidenceType,limitations,status:'draft',createdAt:new Date().toISOString()});writeLocalArray(KNOWLEDGE_DRAFTS_KEY,drafts.slice(0,100));knowledgeForm.reset();renderKnowledgeDrafts();knowledgeStatus.textContent='Draf disimpan. NADYA belum membuka atau memverifikasi sumber tersebut.';}catch(error){knowledgeStatus.textContent=error.message;}});
$('#knowledge-export')?.addEventListener('click',()=>{const blob=new Blob([JSON.stringify({schemaVersion:1,exportedAt:new Date().toISOString(),drafts:readLocalArray(KNOWLEDGE_DRAFTS_KEY),approvedKnowledge:knowledge.userEntries()},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='nadya-knowledge-curation.json';a.click();URL.revokeObjectURL(url);});
renderKnowledgeDrafts();

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
