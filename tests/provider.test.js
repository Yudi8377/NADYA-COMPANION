import test from 'node:test';
import assert from 'node:assert/strict';
import { HttpChatProvider } from '../src/core/provider.js';

test('provider rejects empty messages before network call', async () => {
  const provider = new HttpChatProvider();
  await assert.rejects(() => provider.respond({ messages: [] }), /Tambahkan pesan/);
});
test('provider fails closed when Supabase client configuration is absent', async () => {
  const provider = new HttpChatProvider({ endpoint: '', publishableKey: '' });
  await assert.rejects(() => provider.respond({ messages: [{ role: 'user', content: 'halo' }] }), (error) => error.code === 'BACKEND_NOT_CONFIGURED');
});
test('provider sends bounded messages and publishable key to Supabase Edge Function', async () => {
  const originalFetch = globalThis.fetch;
  let captured;
  globalThis.fetch = async (url, options) => {
    captured = { url, options, body: JSON.parse(options.body) };
    return { ok: true, json: async () => ({ reply: ' Halo! ', model: 'test-model' }) };
  };
  try {
    const provider = new HttpChatProvider({ endpoint: 'https://example.supabase.co/functions/v1/nadya-chat', publishableKey: 'sb_publishable_test' });
    const result = await provider.respond({
      messages: [{ role: 'system', content: 'untrusted system' }, { role: 'assistant', content: 'hai' }, { role: 'user', content: 'halo' }],
      memories: ['prefer Bahasa Indonesia']
    });
    assert.equal(result.text, 'Halo!');
    assert.equal(captured.url, 'https://example.supabase.co/functions/v1/nadya-chat');
    assert.equal(captured.options.headers.apikey, 'sb_publishable_test');
    assert.deepEqual(captured.body.messages.map((item) => item.role), ['user', 'assistant', 'user']);
    assert.deepEqual(captured.body.memories, ['prefer Bahasa Indonesia']);
  } finally { globalThis.fetch = originalFetch; }
});
