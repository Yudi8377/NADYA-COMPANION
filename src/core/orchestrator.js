export class NadyaOrchestrator {
  constructor({ maxTraces = 20 } = {}) { this.maxTraces = Math.max(1, Number(maxTraces) || 20); this.traces = []; }
  run(rawGoal) {
    const goal = String(rawGoal ?? '').trim();
    if (!goal) return { ok: false, code: 'EMPTY_GOAL', message: 'Tuliskan tujuan yang ingin dicapai terlebih dahulu.' };
    if (goal.length > 500) return { ok: false, code: 'GOAL_TOO_LONG', message: 'Tujuan maksimal 500 karakter.' };
    const text = goal.toLocaleLowerCase('id-ID');
    const steps = /(belajar|ujian|osn|materi|sekolah|pelajaran|matematika|informatika)/.test(text)
      ? ['Tentukan target belajar dan cek pemahaman awal.','Pecah materi menjadi topik kecil dari dasar ke lanjutan.','Buat jadwal realistis dengan jeda dan istirahat.','Kerjakan latihan tanpa melihat jawaban, lalu catat kesulitan.','Tinjau kesalahan dan ukur kemajuan secara jujur.']
      : /(aplikasi|kode|program|website|situs|sistem|produk|fitur|software|platform)/.test(text)
        ? ['Tulis masalah utama, pengguna sasaran, dan hasil yang diinginkan.','Pilih satu alur minimum yang benar-benar bisa digunakan.','Rancang data, izin, kondisi gagal, dan kriteria selesai.','Bangun alur dari awal sampai akhir dan tambahkan pengujian.','Deploy ke lingkungan uji, verifikasi, lalu perbaiki berdasarkan bukti.']
        : /(proposal|laporan|dokumen|tulisan|artikel|presentasi|makalah)/.test(text)
          ? ['Tetapkan pembaca, tujuan dokumen, dan hasil yang diharapkan.','Susun kerangka dan daftar bukti yang diperlukan.','Buat draf tanpa mengklaim fakta yang belum diverifikasi.','Periksa sumber, konsistensi, kelengkapan, dan bahasa.','Revisi dan siapkan versi akhir untuk dibagikan.']
          : ['Definisikan hasil akhir dan cara mengukurnya.','Catat batasan, sumber daya, dan hal yang belum diketahui.','Pecah tujuan menjadi langkah kecil yang dapat dilakukan.','Pilih langkah pertama yang aman dan mudah diverifikasi.','Tinjau hasil dan sesuaikan rencana berikutnya.'];
    const result = { ok: true, agentId: 'planner', agentLabel: 'Planning Agent', mode: 'local-rule-based', goal, steps };
    this.traces.push({ at: new Date().toISOString(), agentId: result.agentId, mode: result.mode, stepCount: steps.length });
    this.traces = this.traces.slice(-this.maxTraces);
    return result;
  }
}
