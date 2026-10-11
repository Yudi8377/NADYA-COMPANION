const MAX_TEXT = 4000;

function clean(value, max = MAX_TEXT) { return String(value ?? '').trim().slice(0, max); }
function words(text) { return clean(text).toLocaleLowerCase('id-ID').match(/[\p{L}\p{N}]+/gu) || []; }

export class NadyaAgentTeam {
  constructor({ maxTraces = 50 } = {}) { this.maxTraces = maxTraces; this.traces = []; }

  run({ task, agent = 'auto', context = '', consent = false } = {}) {
    const goal = clean(task, 1200);
    if (!goal) return { ok: false, code: 'EMPTY_TASK', message: 'Tuliskan tugas terlebih dahulu.' };
    if (!['auto', 'conversation', 'research', 'planning', 'workflow'].includes(agent)) {
      return { ok: false, code: 'UNKNOWN_AGENT', message: 'Agen tidak dikenal.' };
    }
    const lower = goal.toLocaleLowerCase('id-ID');
    const selected = agent === 'auto'
      ? (/\b(riset|sumber|bukti|bandingkan|referensi|penelitian|fakta)\b/.test(lower) ? 'research'
        : /\b(kirim|hapus|buka|ubah|jalankan|instal|publish|deploy|eksekusi|otomatisasi)\b/.test(lower) ? 'workflow'
          : /\b(rencana|langkah|target|jadwal|belajar|proyek|project|buat|bangun)\b/.test(lower) ? 'planning' : 'conversation')
      : agent;
    let result;
    if (selected === 'conversation') result = this.conversation(goal, context);
    else if (selected === 'research') result = this.research(goal, context);
    else if (selected === 'planning') result = this.planning(goal);
    else result = this.workflow(goal, consent);
    const trace = { at: new Date().toISOString(), agentId: selected, mode: result.mode, ok: result.ok !== false, task: goal.slice(0, 180) };
    this.traces.push(trace); this.traces = this.traces.slice(-this.maxTraces);
    return { ...result, agentId: selected, agentLabel: ({ conversation: 'Conversation Agent', research: 'Knowledge & Research Agent', planning: 'Planning Agent', workflow: 'Device & Workflow Agent' })[selected], trace };
  }

  conversation(task, context) {
    const ctx = clean(context, 1800);
    const questions = /\?$/.test(task) || /\b(kenapa|bagaimana|apa|siapa|kapan|di mana|mengapa)\b/i.test(task);
    return { ok: true, mode: 'local-context', title: 'Pemahaman percakapan', answer: ctx
      ? 'Aku membaca tugas ini bersama konteks yang kamu berikan. Aku akan memisahkan kebutuhan yang jelas dari hal yang belum diketahui, tanpa menganggap konteks sebagai fakta terverifikasi.'
      : 'Aku menangkap pesanmu sebagai titik awal. Karena agen ini berjalan lokal berbasis aturan, ia belum memiliki pemahaman semantik setara model AI generatif; beri konteks tambahan bila dibutuhkan.',
      findings: [`Tujuan/pesan: ${task}`, questions ? 'Jenis pesan: pertanyaan atau permintaan penjelasan.' : 'Jenis pesan: pernyataan atau permintaan tindakan.', ctx ? `Konteks yang disertakan: ${ctx}` : 'Konteks tambahan: belum diberikan.'],
      next: 'Periksa apakah ringkasan ini sesuai maksudmu sebelum melanjutkan.' };
  }

  research(task, context) {
    const supplied = clean(context, 3500);
    if (!supplied) return { ok: true, mode: 'local-evidence-triage', title: 'Pemeriksaan bahan riset', answer: 'Agen riset lokal aktif, tetapi tidak mengakses internet secara otomatis. Tempelkan kutipan/ringkasan sumber dan URL pada kolom konteks untuk pemeriksaan awal.', findings: ['Belum ada bahan sumber yang diberikan.', 'Tidak ada klaim yang dinyatakan benar hanya berdasarkan permintaan.', 'Verifikasi silang memerlukan setidaknya dua sumber independen yang benar-benar dibaca.'], next: 'Masukkan materi sumber, URL, tanggal, dan keterbatasannya ke konteks.' };
    const terms = [...new Set(words(task).filter(w => w.length > 3))];
    const ctxWords = words(supplied);
    const matched = terms.filter(w => ctxWords.includes(w));
    const urlMatches = supplied.match(/https?:\/\/[^\s)]+/g) || [];
    return { ok: true, mode: 'local-evidence-triage', title: 'Pemetaan bukti lokal', answer: 'Analisis ini hanya memeriksa teks yang kamu berikan. Ini bukan penelusuran web, pemeriksaan reputasi penerbit, atau validasi kebenaran ilmiah.', findings: [
      `Kata kunci tugas yang ditemukan dalam materi: ${matched.length ? matched.join(', ') : 'belum ada kecocokan kata kunci yang jelas'}.`,
      `URL yang terdeteksi: ${urlMatches.length ? urlMatches.join(' ; ') : 'tidak ada URL terdeteksi'}.`,
      `Panjang bahan: ${supplied.length} karakter.`,
      'Tandai klaim, tanggal publikasi, metode, konflik kepentingan, dan batasan; cari sumber independen sebelum menyimpulkan.'
    ], next: 'Bandingkan dengan sumber independen dan catat bagian yang sejalan maupun bertentangan.' };
  }

  planning(task) {
    const lower = task.toLocaleLowerCase('id-ID');
    const steps = /(belajar|ujian|osn|materi|sekolah|pelajaran|matematika|informatika)/.test(lower)
      ? ['Tentukan hasil belajar yang bisa diuji dan cek pemahaman awal.', 'Pecah materi menjadi topik kecil berurutan.', 'Buat jadwal realistis beserta jeda istirahat.', 'Kerjakan latihan tanpa melihat jawaban, lalu catat kesulitan.', 'Uji ulang dan tinjau kesalahan untuk mengukur kemajuan.']
      : /(aplikasi|kode|program|website|situs|sistem|produk|fitur|software|platform|deploy)/.test(lower)
        ? ['Tetapkan masalah, pengguna, dan kriteria keberhasilan.', 'Pilih alur minimum yang benar-benar bisa digunakan.', 'Rancang data, izin, kegagalan, dan kriteria selesai.', 'Implementasikan alur dan tambahkan pengujian otomatis.', 'Uji pada lingkungan aman, verifikasi hasil, lalu rilis dengan rollback.']
        : ['Definisikan hasil akhir dan ukuran keberhasilan.', 'Catat batasan, sumber daya, risiko, dan ketidakpastian.', 'Pecah tujuan menjadi langkah kecil yang dapat diverifikasi.', 'Lakukan langkah pertama yang aman dan paling informatif.', 'Tinjau bukti hasil dan sesuaikan rencana.'];
    return { ok: true, mode: 'local-rule-based', title: 'Rencana yang dapat diverifikasi', answer: `Rencana lokal untuk: ${task}`, steps, next: 'Tandai langkah setelah selesai; jangan tandai selesai sebelum ada hasil yang bisa diperiksa.' };
  }

  workflow(task, consent) {
    const risky = /\b(kirim|hapus|buka|ubah|jalankan|instal|publish|deploy|eksekusi|otomatisasi|transaksi|bayar)\b/i.test(task);
    return { ok: true, mode: 'safe-preview-only', title: 'Pratinjau Device & Workflow', answer: risky
      ? 'Permintaan ini dapat memengaruhi perangkat, data, akun, atau layanan eksternal. NADYA belum memiliki konektor eksekusi perangkat yang terpasang, sehingga tidak ada tindakan eksternal yang dijalankan.'
      : 'Agen workflow dapat menyusun pratinjau langkah lokal, tetapi belum menjalankan tindakan eksternal.',
      findings: ['Status eksekusi: PREVIEW_ONLY.', 'Tidak ada perintah yang dikirim ke perangkat atau layanan eksternal.', consent ? 'Persetujuan eksplisit dicatat untuk pratinjau ini saja; bukan izin eksekusi.' : 'Persetujuan eksekusi belum diberikan.'],
      steps: ['Tampilkan tindakan yang diminta dan targetnya.', 'Periksa izin, cakupan data, dan kemungkinan dampak.', 'Minta konfirmasi spesifik tepat sebelum aksi nyata.', 'Jalankan hanya melalui adapter allowlist yang teruji.', 'Catat hasil dan sediakan cara membatalkan bila memungkinkan.'],
      requiresConfirmation: true, next: 'Sambungkan adapter yang sesuai dan uji pada sandbox sebelum mengaktifkan eksekusi nyata.' };
  }

  exportTracesJSON() { return JSON.stringify({ schemaVersion: 1, exportedAt: new Date().toISOString(), traces: this.traces.map(x => ({ ...x })) }, null, 2); }
  clearTraces() { this.traces = []; }
}
