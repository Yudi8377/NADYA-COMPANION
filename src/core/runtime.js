import { CapabilityRegistry, CAPABILITY_STATES } from './capabilities.js';

export class NadyaRuntime {
  constructor({ name = 'NADYA', maxHistory = 24 } = {}) {
    this.name = name;
    this.maxHistory = maxHistory;
    this.history = [];
    this.capabilities = new CapabilityRegistry();
    this.capabilities.register({ id: 'ai-provider', label: 'Penyedia AI', description: 'Model percakapan eksternal; belum dikonfigurasi.', state: CAPABILITY_STATES.UNCONFIGURED, requiresConsent: true });
    this.capabilities.register({ id: 'microphone', label: 'Mikrofon', description: 'Input suara; perlu adapter perangkat dan izin eksplisit.', state: CAPABILITY_STATES.DISABLED });
    this.capabilities.register({ id: 'camera', label: 'Kamera', description: 'Pemrosesan visual; perlu adapter perangkat dan izin eksplisit.', state: CAPABILITY_STATES.DISABLED });
    this.capabilities.register({ id: 'automation', label: 'Otomatisasi', description: 'Aksi eksternal; harus memiliki allowlist dan konfirmasi.', state: CAPABILITY_STATES.DISABLED });
  }

  respond(rawMessage) {
    const message = String(rawMessage ?? '').trim();
    if (!message) return { text: 'Silakan tulis pesan terlebih dahulu.', intent: 'empty', mode: 'local' };
    const normalized = message.toLocaleLowerCase('id-ID');
    let text;
    let intent = 'conversation';
    if (/(apa yang kamu lihat pada saya|kamu melihat apa|lihat saya|lihat wajah saya|apa yang kamu lihat|bisa melihat saya)/.test(normalized)) {
      intent = 'visual-privacy'; text = 'Saat ini aku belum bisa melihat atau menilai dirimu. Fitur kamera hanya menampilkan pratinjau setelah kamu memberi izin; belum ada analisis wajah, ekspresi, atau kelelahan yang aktif. Kalau kamu ingin aku memahami keadaanmu, ceritakan apa yang sedang kamu rasakan atau aktifkan kamera secara sadar jika fitur analisis yang teruji tersedia.';
    } else if (/(deteksi keadaan saya|deteksi kondisi saya|bagaimana keadaan saya|tebak perasaan saya|baca ekspresi|deteksi ekspresi|mata saya lelah|saya terlihat lelah)/.test(normalized)) {
      intent = 'wellbeing-check'; text = 'Aku belum bisa memastikan keadaan fisik atau perasaanmu hanya dari chat, dan kamera NADYA sekarang belum menganalisis ekspresi atau kelelahan. Aku bisa membantumu mengecek keadaan lewat pertanyaan sederhana: sekarang kamu merasa lebih dekat ke tenang, senang, lelah, sedih, cemas, atau sulit menjelaskannya? Kamu boleh menjawab dengan kata-katamu sendiri.';
    } else if (/(apa kabar|bagaimana kabarmu|gimana kabarmu|kabar hari ini|how are you)/.test(normalized)) {
      intent = 'small-talk'; text = 'Aku baik dan siap menemanimu ngobrol hari ini 😊 Aku tidak mengalami hari seperti manusia, tetapi aku senang bisa membantu. Kalau kamu sendiri, bagaimana kabarmu hari ini?';
    } else if (/(bagaimana kabar hari ini|gimana hari ini|hari ini bagaimana|apa kabar hari ini)/.test(normalized)) {
      intent = 'small-talk'; text = 'Hari ini aku siap menemanimu ngobrol 😊 Aku tidak punya pengalaman pribadi seperti manusia. Bagaimana harimu sejauh ini—ada hal menyenangkan atau yang sedang mengganggu pikiranmu?';
    } else if (/^(halo|hai|hello|pagi|siang|sore|malam)\\b/.test(normalized)) {
      intent = 'greeting'; text = `Halo, aku ${this.name}. Aku siap menemani percakapanmu. Saat ini aku berjalan dalam mode lokal, jadi belum terhubung ke model AI eksternal.`;
    } else if (/(siapa kamu|kamu siapa|tentang nadya)/.test(normalized)) {
      intent = 'identity'; text = 'Aku NADYA AI COMPANION. Fondasiku dirancang untuk percakapan berbahasa Indonesia, memori yang dikendalikan pengguna, agen spesialis, dan kapabilitas yang aman secara default.';
    } else if (/(fitur|kapabilitas|bisa apa|kemampuan)/.test(normalized)) {
      intent = 'capabilities'; text = 'Fondasi ini menyiapkan kontrak untuk percakapan, memori, orkestrasi agen, suara, kamera, dan otomatisasi. Integrasi perangkat/cloud masih nonaktif sampai benar-benar dikonfigurasi dan diuji.';
    } else if (/(terima kasih|makasih|thanks)/.test(normalized)) {
      intent = 'gratitude'; text = 'Sama-sama. Kamu bisa lanjut bercerita atau menjelaskan hal yang ingin kamu kerjakan.';
    } else {
      text = 'Aku menerima pesanmu. Runtime yang aktif sekarang masih versi fondasi lokal dan belum memakai model AI generatif. Aku belum bisa menyusun jawaban mendalam dengan model eksternal, tetapi struktur ini disiapkan agar penyedia AI dapat ditambahkan melalui gerbang izin yang jelas.';
    }
    const item = { role: 'user', text: message, at: new Date().toISOString() };
    this.history.push(item, { role: 'assistant', text, intent, at: new Date().toISOString() });
    this.history = this.history.slice(-this.maxHistory);
    return { text, intent, mode: 'local' };
  }

  clearSession() { this.history = []; }
}
