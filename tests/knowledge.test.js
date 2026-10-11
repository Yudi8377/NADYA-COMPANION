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


test('bundled mental wellness knowledge is available offline and cites sources', () => {
  const kb = new LocalKnowledgeBase(new MemoryStorage());
  const mentalWealth = kb.search('jelaskan mental wealth dan kesejahteraan')[0];
  assert.ok(mentalWealth);
  assert.match(mentalWealth.text, /bukan diagnosis klinis baku/i);
  assert.ok(mentalWealth.sources.some((source) => source.includes('who.int')));
  const stress = kb.search('cara menghadapi stres dan tekanan')[0];
  assert.ok(stress);
  assert.match(stress.text, /satu langkah kecil/i);
  const boundaries = kb.search('batas pribadi dan hubungan sehat')[0];
  assert.ok(boundaries);
  assert.match(boundaries.text, /menghormati persetujuan/i);
});


test('psychology learning levels and Indonesian language starter knowledge are searchable', () => {
  const kb = new LocalKnowledgeBase(new MemoryStorage());
  assert.match(kb.search('psikologi level expert')[0].text, /pendidikan formal/i);
  assert.match(kb.search('bahasa jawa matur nuwun')[0].text, /unggah-ungguh/i);
  assert.match(kb.search('bahasa sunda punten')[0].text, /hatur nuhun/i);
  assert.match(kb.search('bahasa gaul spill')[0].text, /berubah cepat/i);
});
