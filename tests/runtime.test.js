import test from 'node:test';
import assert from 'node:assert/strict';
import { NadyaRuntime } from '../src/core/runtime.js';
import { CapabilityRegistry, CAPABILITY_STATES } from '../src/core/capabilities.js';
import { LocalMemoryStore } from '../src/core/memory.js';

class MemoryStorage {
  #data = new Map();
  getItem(key) { return this.#data.has(key) ? this.#data.get(key) : null; }
  setItem(key, value) { this.#data.set(key, String(value)); }
  removeItem(key) { this.#data.delete(key); }
}

test('runtime answers greeting in Indonesian and labels local mode', () => {
  const runtime = new NadyaRuntime();
  const result = runtime.respond('Halo NADYA');
  assert.equal(result.intent, 'greeting');
  assert.equal(result.mode, 'local');
  assert.match(result.text, /kabarmu|apa kabar|cerita/i);
  assert.equal(runtime.history.length, 2);
});

test('runtime bounds session history and clears session', () => {
  const runtime = new NadyaRuntime({ maxHistory: 4 });
  for (let i = 0; i < 5; i++) runtime.respond(`pesan ${i}`);
  assert.equal(runtime.history.length, 4);
  runtime.clearSession();
  assert.equal(runtime.history.length, 0);
});

test('unknown and disabled capabilities fail closed', async () => {
  const registry = new CapabilityRegistry();
  registry.register({ id: 'device', label: 'Perangkat', state: CAPABILITY_STATES.DISABLED, handler: () => 'done' });
  assert.equal((await registry.execute('missing', {})).code, 'UNKNOWN_CAPABILITY');
  assert.equal((await registry.execute('device', {}, { consent: true })).code, 'CAPABILITY_NOT_READY');
});

test('ready capability requires explicit consent by default', async () => {
  const registry = new CapabilityRegistry();
  registry.register({ id: 'safe-demo', label: 'Demo', state: CAPABILITY_STATES.READY, handler: (input) => input.value });
  assert.equal((await registry.execute('safe-demo', { value: 7 })).code, 'CONSENT_REQUIRED');
  assert.deepEqual(await registry.execute('safe-demo', { value: 7 }, { consent: true }), { ok: true, data: 7 });
});

test('memory is opt-in and does not expose notes while disabled', () => {
  const store = new LocalMemoryStore(new MemoryStorage());
  assert.equal(store.isEnabled(), false);
  assert.throws(() => store.add('Preferensi bahasa Indonesia'), /persetujuan/i);
  store.setConsent(true);
  const item = store.add('Preferensi bahasa Indonesia');
  assert.equal(store.list().length, 1);
  assert.equal(store.list()[0].text, 'Preferensi bahasa Indonesia');
  store.setConsent(false);
  assert.deepEqual(store.list(), []);
  store.setConsent(true);
  assert.equal(store.list()[0].id, item.id);
});

test('memory supports deletion, export, and clearing', () => {
  const store = new LocalMemoryStore(new MemoryStorage());
  store.setConsent(true);
  const first = store.add('Catatan pertama');
  store.add('Catatan kedua');
  assert.equal(JSON.parse(store.exportJSON()).items.length, 2);
  assert.equal(store.remove(first.id), true);
  assert.equal(store.list().length, 1);
  store.clear();
  assert.equal(store.list().length, 0);
});

test('memory rejects empty and overlong notes', () => {
  const store = new LocalMemoryStore(new MemoryStorage());
  store.setConsent(true);
  assert.throws(() => store.add('   '), /kosong/i);
  assert.throws(() => store.add('a'.repeat(501)), /500 karakter/i);
});

import { NadyaOrchestrator } from '../src/core/orchestrator.js';

test('local planner returns actionable steps for a learning goal', () => {
  const orchestrator = new NadyaOrchestrator();
  const result = orchestrator.run('Buat rencana belajar Matematika untuk ujian');
  assert.equal(result.ok, true);
  assert.equal(result.agentId, 'planner');
  assert.equal(result.mode, 'local-rule-based');
  assert.ok(result.steps.length >= 4);
  assert.match(result.steps.join(' '), /latihan/i);
});

test('local planner rejects empty goals and bounds trace history', () => {
  const orchestrator = new NadyaOrchestrator({ maxTraces: 2 });
  assert.equal(orchestrator.run(' ').ok, false);
  orchestrator.run('Buat proposal kegiatan');
  orchestrator.run('Rencanakan aplikasi');
  orchestrator.run('Bantu saya menyusun jadwal');
  assert.equal(orchestrator.traces.length, 2);
});

test('planner traces can be exported and cleared', () => {
  const orchestrator = new NadyaOrchestrator();
  orchestrator.run('Buat rencana belajar');
  const exported = JSON.parse(orchestrator.exportTracesJSON());
  assert.equal(exported.schemaVersion, 1);
  assert.equal(exported.traces.length, 1);
  assert.equal(exported.traces[0].agentId, 'planner');
  orchestrator.clearTraces();
  assert.equal(orchestrator.traces.length, 0);
});


test('local social conversation handles varied greetings and follow-ups', () => {
  const runtime = new NadyaRuntime({ name: 'ARYA' });
  const greeting = runtime.respond('Gimana kabarnya?');
  assert.equal(greeting.mode, 'local');
  assert.equal(greeting.intent, 'small-talk');
  assert.match(greeting.text, /kabarnya|gimana|membantu|ceritakan/i);
  assert.equal(runtime.respond('Aku bingung banget').intent, 'confusion');
  assert.equal(runtime.respond('Makasih ya').intent, 'gratitude');
  assert.equal(runtime.respond('Kamu mengulang terus').intent, 'complaint');
});
