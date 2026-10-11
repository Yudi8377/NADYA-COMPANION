import test from 'node:test';
import assert from 'node:assert/strict';
import { HttpChatProvider } from '../src/core/provider.js';

test('provider rejects empty messages before network call', async () => {
  const provider = new HttpChatProvider();
  await assert.rejects(() => provider.respond({ messages: [] }), /Tambahkan pesan/);
});
test('provider normalizes roles and bounds memory context', async () => {
  const originalFetch = globalThis.fetch;
  let captured;
  globalThis.fetch = async (_url, options) => {
    captured = JSON.parse(options.body);
    return { ok: true, json: async () => ({ reply: ' Halo! ', model: 'test-model' }) };
  };
  try {
    const provider = new HttpChatProvider({ endpoint: '/api/chat' });
    const result = await provider.respond({
      messages: [{ role: 'system', content: 'untrusted system' }, { role: 'assistant', content: 'hai' }, { role: 'user', content: 'halo' }],
      memories: ['prefer Bahasa Indonesia']
    });
    assert.equal(result.text, 'Halo!');
    assert.deepEqual(captured.messages.map((item) => item.role), ['user', 'assistant', 'user']);
    assert.deepEqual(captured.memories, ['prefer Bahasa Indonesia']);
  } finally { globalThis.fetch = originalFetch; }
});
