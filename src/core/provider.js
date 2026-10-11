export class HttpChatProvider {
  constructor({ endpoint = './api/chat', timeoutMs = 20000 } = {}) { this.endpoint = endpoint; this.timeoutMs = Math.min(30000, Math.max(1000, Number(timeoutMs) || 20000)); }
  async respond({ messages, memories = [] } = {}) {
    if (!Array.isArray(messages) || !messages.length) throw new Error('Tambahkan pesan sebelum memanggil penyedia AI.');
    const safeMessages = messages.slice(-12).map((message) => ({ role: message.role === 'assistant' ? 'assistant' : 'user', content: String(message.content ?? '').slice(0, 4000) }));
    const safeMemories = Array.isArray(memories) ? memories.slice(0, 20).map((item) => String(item).slice(0, 500)) : [];
    const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), this.timeoutMs);
    try {
      const response = await fetch(this.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ messages: safeMessages, memories: safeMemories }), signal: controller.signal, credentials: 'same-origin' });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) { const error = new Error(payload.error || 'Penyedia AI belum tersedia.'); error.code = payload.code || 'PROVIDER_UNAVAILABLE'; throw error; }
      if (typeof payload.reply !== 'string' || !payload.reply.trim()) throw new Error('Penyedia AI mengembalikan jawaban kosong.');
      return { text: payload.reply.trim(), mode: 'remote', model: payload.model || 'configured-provider' };
    } catch (error) { if (error.name === 'AbortError') throw new Error('Permintaan AI melewati batas waktu.'); throw error; }
    finally { clearTimeout(timeout); }
  }
}
