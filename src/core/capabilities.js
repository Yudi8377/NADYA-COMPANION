/** Capability states are intentionally explicit; unknown capabilities never run. */
export const CAPABILITY_STATES = Object.freeze({
  UNCONFIGURED: 'unconfigured', DISABLED: 'disabled', READY: 'ready', ERROR: 'error'
});

export class CapabilityRegistry {
  #entries = new Map();

  register({ id, label, description = '', state = CAPABILITY_STATES.UNCONFIGURED, handler = null, requiresConsent = true }) {
    if (!id || typeof id !== 'string') throw new TypeError('Capability id wajib berupa string.');
    if (this.#entries.has(id)) throw new Error(`Capability sudah terdaftar: ${id}`);
    if (!Object.values(CAPABILITY_STATES).includes(state)) throw new TypeError('Status capability tidak valid.');
    this.#entries.set(id, { id, label: label || id, description, state, handler, requiresConsent });
  }

  list() { return [...this.#entries.values()].map(({ handler, ...entry }) => ({ ...entry })); }

  setState(id, state) {
    const entry = this.#entries.get(id);
    if (!entry) throw new Error(`Capability tidak dikenal: ${id}`);
    if (!Object.values(CAPABILITY_STATES).includes(state)) throw new TypeError('Status capability tidak valid.');
    entry.state = state;
  }

  async execute(id, input, { consent = false } = {}) {
    const entry = this.#entries.get(id);
    if (!entry) return { ok: false, code: 'UNKNOWN_CAPABILITY', message: 'Kapabilitas tidak dikenal.' };
    if (entry.state !== CAPABILITY_STATES.READY || typeof entry.handler !== 'function') {
      return { ok: false, code: 'CAPABILITY_NOT_READY', message: `${entry.label} belum diaktifkan dan dikonfigurasi.` };
    }
    if (entry.requiresConsent && !consent) return { ok: false, code: 'CONSENT_REQUIRED', message: 'Persetujuan pengguna diperlukan.' };
    try { return { ok: true, data: await entry.handler(input) }; }
    catch { return { ok: false, code: 'CAPABILITY_FAILED', message: `${entry.label} gagal dijalankan.` }; }
  }
}
