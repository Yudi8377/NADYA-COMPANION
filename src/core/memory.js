const MEMORY_KEY = 'nadya.memory.v1';
const CONSENT_KEY = 'nadya.memory.consent.v1';

/**
 * Explicitly user-managed browser memory. Chat messages are never stored here.
 * A storage adapter is injected so behavior can be tested without a browser.
 */
export class LocalMemoryStore {
  constructor(storage = globalThis.localStorage) {
    if (!storage) throw new TypeError('Penyimpanan lokal tidak tersedia.');
    this.storage = storage;
  }

  isEnabled() {
    return this.storage.getItem(CONSENT_KEY) === 'true';
  }

  setConsent(enabled) {
    this.storage.setItem(CONSENT_KEY, enabled ? 'true' : 'false');
    return this.isEnabled();
  }

  list() {
    if (!this.isEnabled()) return [];
    try {
      const parsed = JSON.parse(this.storage.getItem(MEMORY_KEY) || '[]');
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((item) =>
        item && typeof item.id === 'string' &&
        typeof item.text === 'string' &&
        typeof item.createdAt === 'string'
      ).map((item) => ({ id: item.id, text: item.text, createdAt: item.createdAt }));
    } catch {
      return [];
    }
  }

  add(rawText) {
    if (!this.isEnabled()) throw new Error('Aktifkan persetujuan memori terlebih dahulu.');
    const text = String(rawText ?? '').trim();
    if (!text) throw new TypeError('Catatan memori tidak boleh kosong.');
    if (text.length > 500) throw new RangeError('Catatan maksimal 500 karakter.');
    const items = this.#readStored();
    const id = globalThis.crypto?.randomUUID?.() ||
      `mem-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
    const item = { id, text, createdAt: new Date().toISOString() };
    items.unshift(item);
    this.storage.setItem(MEMORY_KEY, JSON.stringify(items.slice(0, 100)));
    return item;
  }

  remove(id) {
    const items = this.#readStored();
    const next = items.filter((item) => item.id !== id);
    this.storage.setItem(MEMORY_KEY, JSON.stringify(next));
    return next.length !== items.length;
  }

  clear() {
    this.storage.removeItem(MEMORY_KEY);
  }

  exportJSON() {
    if (!this.isEnabled()) throw new Error('Aktifkan persetujuan untuk mengekspor memori.');
    return JSON.stringify({
      schemaVersion: 1,
      exportedAt: new Date().toISOString(),
      storage: 'browser-local',
      items: this.list()
    }, null, 2);
  }

  #readStored() {
    try {
      const parsed = JSON.parse(this.storage.getItem(MEMORY_KEY) || '[]');
      return Array.isArray(parsed) ? parsed.filter((item) =>
        item && typeof item.id === 'string' &&
        typeof item.text === 'string' &&
        typeof item.createdAt === 'string'
      ) : [];
    } catch {
      return [];
    }
  }
}
