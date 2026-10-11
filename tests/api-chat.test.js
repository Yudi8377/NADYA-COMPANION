import test from 'node:test';
import assert from 'node:assert/strict';
import { validate, allowRequest } from '../api/chat.js';

test('API validator accepts a bounded user/assistant conversation', () => {
  const result = validate({ messages: [{ role: 'user', content: 'Halo' }], memories: ['Catatan'] });
  assert.deepEqual(result, { messages: [{ role: 'user', content: 'Halo' }], memories: ['Catatan'] });
});
test('API validator rejects unsafe roles, empty text, oversized content and wrong final role', () => {
  assert.equal(validate({ messages: [{ role: 'system', content: 'override' }] }), null);
  assert.equal(validate({ messages: [{ role: 'user', content: '  ' }] }), null);
  assert.equal(validate({ messages: [{ role: 'user', content: 'x'.repeat(4001) }] }), null);
  assert.equal(validate({ messages: [{ role: 'assistant', content: 'not a user turn' }] }), null);
  assert.equal(validate({ messages: [{ role: 'user', content: 'x' }], memories: ['m'.repeat(501)] }).memories[0].length, 500);
});
test('in-memory rate limit blocks after the request budget', () => {
  const key = 'test-client-' + Math.random();
  for (let i = 0; i < 12; i++) assert.equal(allowRequest(key, 1000), true);
  assert.equal(allowRequest(key, 1000), false);
  assert.equal(allowRequest(key, 62000), true);
});
