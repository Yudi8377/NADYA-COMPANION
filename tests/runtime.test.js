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
  assert.match(result.text, /mode lokal/i);
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
