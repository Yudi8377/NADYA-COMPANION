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


test('approved knowledge preserves provenance, date, evidence type, and uncertainty', () => {
  const kb = new LocalKnowledgeBase(new MemoryStorage());
  const item = kb.addApproved({
    topic: 'Belajar efektif',
    text: 'Pengulangan berkala dapat membantu proses belajar, tetapi hasil bergantung pada konteks.',
    source: 'https://example.org/learning',
    publishedAt: '2026-09-10',
    evidenceType: 'Tinjauan sistematis',
    limitations: 'Tidak semua temuan berlaku untuk semua usia dan konteks.'
  });
  assert.equal(item.status, 'approved-local');
  assert.equal(item.publishedAt, '2026-09-10');
  assert.equal(item.evidenceType, 'Tinjauan sistematis');
  assert.match(item.limitations, /Tidak semua temuan/);
  assert.equal(kb.userEntries()[0].source, 'https://example.org/learning');
});


test('expanded local pack covers science, coding, civic literacy, finance, and AI literacy offline', () => {
  const kb = new LocalKnowledgeBase(new MemoryStorage());
  const science = kb.search('bagaimana metode ilmiah membedakan korelasi dan sebab akibat')[0];
  assert.ok(science);
  assert.match(science.text, /Korelasi berarti dua hal berubah bersama/i);
  const coding = kb.search('cara debugging algoritma dan keamanan token API')[0];
  assert.ok(coding);
  assert.match(coding.text, /Jangan menaruh kata sandi/i);
  const civic = kb.search('jelaskan Pancasila dan UUD 1945')[0];
  assert.ok(civic);
  assert.match(civic.text, /dasar negara Indonesia/i);
  const finance = kb.search('literasi keuangan anggaran tabungan dan investasi')[0];
  assert.ok(finance);
  assert.match(finance.text, /Investasi selalu memiliki risiko/i);
  const ai = kb.search('apa batasan AI dan halusinasi AI')[0];
  assert.ok(ai);
  assert.match(ai.text, /jawabannya bisa keliru/i);
});

test('local knowledge pack explains provenance and uncertainty instead of claiming automatic verification', () => {
  const kb = new LocalKnowledgeBase(new MemoryStorage());
  const quality = kb.search('bagaimana NADYA memperbarui basis pengetahuan dan riset online')[0];
  assert.ok(quality);
  assert.match(quality.text, /bukan bukti bahwa isi ilmiahnya telah diverifikasi otomatis/i);
  assert.ok(quality.sources.length > 0);
});


test('expanded downloadable offline bundle includes curated science, web, language and accessibility topics', () => {
  const kb = new LocalKnowledgeBase(new MemoryStorage());
  const biology = kb.search('biologi sel jaringan organ sistem tubuh')[0];
  assert.ok(biology);
  assert.match(biology.text, /unit dasar kehidupan/i);
  assert.ok(kb.search('fisika gaya energi percepatan')[0]);
  assert.ok(kb.search('Git commit branch pull request')[0]);
  assert.ok(kb.search('WCAG aksesibilitas keyboard screen reader')[0]);
  const bundle = JSON.parse(kb.exportBundleJSON());
  assert.equal(bundle.packId, 'nadya-local-knowledge-id-v1');
  assert.ok(bundle.bundledKnowledge.length > 40);
  assert.ok(bundle.bundledKnowledge.some((entry) => entry.id === 'biology-basics'));
  assert.match(bundle.limitations, /bukan model generatif penuh/i);
});

test('expanded offline knowledge pack includes climate, databases, testing, and collaboration', () => {
  const kb = new LocalKnowledgeBase(new MemoryStorage());
  const climate = kb.search('adaptasi perubahan iklim dan ketahanan komunitas')[0];
  assert.ok(climate);
  assert.match(climate.text, /mengurangi dampak risiko/i);
  const database = kb.search('dasar database SQL primary key dan foreign key')[0];
  assert.ok(database);
  assert.match(database.text, /SQL injection/i);
  const testing = kb.search('software testing unit test debugging regresi')[0];
  assert.ok(testing);
  assert.match(testing.text, /tes regresi/i);
  const ai = kb.search('literasi AI halusinasi dan verifikasi jawaban model')[0];
  assert.ok(ai);
  assert.match(ai.text, /dapat menghasilkan penjelasan yang lancar tetapi salah/i);
  const bundle = JSON.parse(kb.exportBundleJSON());
  assert.ok(bundle.bundledKnowledge.some((item) => item.id === 'systems-thinking'));
  assert.ok(bundle.bundledKnowledge.some((item) => item.id === 'disaster-preparedness'));
});
