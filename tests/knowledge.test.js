import test from 'node:test';
import assert from 'node:assert/strict';
import { LocalKnowledgeBase } from '../src/core/knowledge.js';

class MemoryStorage {
  #data = new Map();
  getItem(key) { return this.#data.has(key) ? this.#data.get(key) : null; }
  setItem(key, value) { this.#data.set(key, String(value)); }
  removeItem(key) { this.#data.delete(key); }
}

test('starter knowledge finds Indonesian topics without network access', () => {
  const kb = new LocalKnowledgeBase(new MemoryStorage());
  assert.match(kb.search('Bagaimana NADYA menjaga privasi dan memori?')[0].text, /Memori NADYA bersifat opsional/i);
  assert.match(kb.search('apakah bisa mode offline')[0].text, /mode lokal/i);
});

test('knowledge search returns no fabricated result for unrelated query', () => {
  const kb = new LocalKnowledgeBase(new MemoryStorage());
  assert.deepEqual(kb.search('qzxv random unknown words'), []);
});

test('user knowledge requires source and can be exported', () => {
  const kb = new LocalKnowledgeBase(new MemoryStorage());
  assert.throws(() => kb.addApproved({ topic: 'Sains', text: 'Isi' }), /sumber wajib/i);
  kb.addApproved({ topic: 'Sains', text: 'Air tersusun dari hidrogen dan oksigen.', source: 'Catatan belajar pengguna' });
  assert.match(kb.search('Sains air hidrogen oksigen')[0].text, /hidrogen dan oksigen/i);
  assert.equal(JSON.parse(kb.exportJSON()).userEntries.length, 1);
});
