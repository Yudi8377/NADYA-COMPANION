const STARTER_KNOWLEDGE = [
  { id: 'identity', topic: 'Identitas NADYA', keywords: ['siapa kamu', 'tentang nadya', 'identitas'], answer: 'Aku NADYA AI COMPANION. Aku dirancang sebagai pendamping berbahasa Indonesia dengan memori yang dikendalikan pengguna, pengetahuan yang dapat diperluas, interaksi suara, dan batas keamanan yang jelas. Pada versi ini, jawaban lokal berasal dari pengetahuan awal dan aturan yang tersedia di perangkat.' },
  { id: 'offline', topic: 'Mode offline', keywords: ['offline', 'tanpa internet', 'lokal'], answer: 'Dalam mode lokal, aku dapat menggunakan aturan dan pengetahuan yang sudah tersimpan di perangkat. Pencarian sumber baru membutuhkan koneksi internet, sedangkan model bahasa generatif lokal membutuhkan model yang diunduh dan perangkat keras yang sesuai. Aku tidak akan mengaku memiliki kemampuan yang belum terpasang.' },
  { id: 'privacy', topic: 'Privasi dan memori', keywords: ['privasi', 'memori', 'ingat', 'data'], answer: 'Memori NADYA bersifat opsional dan dikelola pengguna. Catatan yang disimpan manual berada di penyimpanan browser ini. Jangan masukkan kata sandi, kunci API, atau data sangat sensitif. Menghapus data browser dapat menghapus memori lokal.' },
  { id: 'learning', topic: 'Belajar dan pengembangan diri', keywords: ['belajar', 'mengembangkan diri', 'kebiasaan', 'tujuan'], answer: 'Untuk mulai berkembang, tentukan satu tujuan yang terukur, pecah menjadi langkah kecil, lakukan secara realistis, lalu tinjau hasil dan kesulitan. Aku dapat membantu membuat rencana dan refleksi, tetapi hasilnya perlu diperiksa dan disesuaikan dengan keadaanmu.' },
  { id: 'knowledge', topic: 'Pengetahuan yang terus berkembang', keywords: ['pengetahuan', 'riset', 'sumber', 'belajar otomatis', 'otonom'], answer: 'Rencana pengembangan pengetahuanku adalah mencari sumber yang relevan ketika online, memeriksa asal dan tanggalnya, membandingkan klaim, mencatat ketidakpastian, lalu menguji hasil sebelum pembaruan digunakan. Pada versi ini, siklus riset online otomatis belum diaktifkan; aku tidak akan berpura-pura sudah melakukan riset.' },
  { id: 'voice', topic: 'Interaksi suara', keywords: ['suara', 'bicara', 'mikrofon', 'voice'], answer: 'Kamu dapat menggunakan tombol mikrofon jika browser mendukung pengenalan suara. Jawaban dapat dibacakan oleh fitur suara bawaan browser. Dukungan pengenalan suara berbeda antar-browser dan tidak selalu berjalan offline.' },
  { id: 'agents', topic: 'Agen spesialis', keywords: ['agen', 'multi-agent', 'orchestrator'], answer: 'Arsitektur NADYA menempatkan satu orchestrator untuk mengarahkan tugas ke modul spesialis seperti percakapan, perencanaan, riset pengetahuan, dan privasi. Dalam fondasi sekarang, perencana lokal aktif; agen riset online dan model generatif belum aktif.' },
  { id: 'cost', topic: 'Anggaran Rp0', keywords: ['gratis', 'rp0', 'biaya', 'open source'], answer: 'Untuk menjaga target Rp0, NADYA memprioritaskan kode terbuka, kemampuan browser, pengetahuan lokal, dan model yang dapat dijalankan pada perangkat. Layanan eksternal dapat memiliki batas atau biaya; karena itu fungsi inti harus tetap punya jalur lokal dan menyatakan keterbatasannya.' }
];

function normalize(value) {
  return String(value ?? '').toLocaleLowerCase('id-ID').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
}

export class LocalKnowledgeBase {
  constructor(storage = globalThis.localStorage) {
    this.storage = storage;
    this.storageKey = 'nadya.knowledge.user.v1';
  }
  starter() { return STARTER_KNOWLEDGE.map((item) => ({ ...item, source: 'bundled-starter' })); }
  userEntries() {
    if (!this.storage) return [];
    try {
      const items = JSON.parse(this.storage.getItem(this.storageKey) || '[]');
      return Array.isArray(items) ? items.filter((item) => item && typeof item.id === 'string' && typeof item.topic === 'string' && typeof item.text === 'string' && typeof item.source === 'string').slice(0, 100) : [];
    } catch { return []; }
  }
  search(query) {
    const q = normalize(query);
    if (!q) return [];
    const terms = new Set(q.split(' ').filter((term) => term.length > 2));
    return [...this.starter(), ...this.userEntries()].map((item) => {
      const haystack = normalize([item.topic, ...(item.keywords || []), item.answer || item.text].join(' '));
      let score = 0;
      for (const term of terms) if (haystack.includes(term)) score += 1;
      for (const keyword of item.keywords || []) if (q.includes(normalize(keyword))) score += 3;
      return { item, score };
    }).filter((entry) => entry.score > 0).sort((a, b) => b.score - a.score).slice(0, 3).map(({ item, score }) => ({ id: item.id, topic: item.topic, text: item.answer || item.text, source: item.source || 'user-approved', score }));
  }
  addApproved({ topic, text, source }) {
    if (!this.storage) throw new Error('Penyimpanan lokal tidak tersedia.');
    const cleanTopic = String(topic || '').trim().slice(0, 120);
    const cleanText = String(text || '').trim().slice(0, 3000);
    const cleanSource = String(source || '').trim().slice(0, 500);
    if (!cleanTopic || !cleanText || !cleanSource) throw new Error('Topik, isi, dan sumber wajib diisi.');
    const entries = this.userEntries();
    const entry = { id: globalThis.crypto?.randomUUID?.() || `knowledge-${Date.now().toString(36)}`, topic: cleanTopic, text: cleanText, source: cleanSource, createdAt: new Date().toISOString() };
    this.storage.setItem(this.storageKey, JSON.stringify([entry, ...entries].slice(0, 100)));
    return entry;
  }
  exportJSON() {
    return JSON.stringify({ schemaVersion: 1, exportedAt: new Date().toISOString(), starterCount: STARTER_KNOWLEDGE.length, userEntries: this.userEntries() }, null, 2);
  }
}
