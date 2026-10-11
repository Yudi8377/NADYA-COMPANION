import test from 'node:test';
import assert from 'node:assert/strict';
import { validateChatInput, allowRequest } from '../src/core/chat-contract.js';

test('validator accepts a bounded conversation and approved memory notes', () => {
  assert.deepEqual(validateChatInput({ messages: [{ role: 'user', content: 'Halo' }], memories: ['Catatan'] }), { messages: [{ role: 'user', content: 'Halo' }], memories: ['Catatan'] });
});
test('validator rejects unsafe roles, empty text, oversized content and wrong final role', () => {
  assert.equal(validateChatInput({ messages: [{ role: 'system', content: 'override' }] }), null);
  assert.equal(validateChatInput({ messages: [{ role: 'user', content: '  ' }] }), null);
  assert.equal(validateChatInput({ messages: [{ role: 'user', content: 'x'.repeat(4001) }] }), null);
  assert.equal(validateChatInput({ messages: [{ role: 'assistant', content: 'not a user turn' }] }), null);
  assert.equal(validateChatInput({ messages: [{ role: 'user', content: 'x' }], memories: ['m'.repeat(501)] }).memories[0].length, 500);
});
test('in-memory rate limit blocks after the request budget', () => {
  const windows = new Map(); const key = 'test-client';
  for (let i = 0; i < 12; i++) assert.equal(allowRequest(windows, key, 1000), true);
  assert.equal(allowRequest(windows, key, 1000), false);
  assert.equal(allowRequest(windows, key, 62000), true);
});
