// Curated Indonesian-first knowledge pack for local/offline retrieval.
// Summaries are original educational material, not a substitute for current specialist guidance.
export const ADDITIONAL_KNOWLEDGE = [
  {
    id: 'critical-thinking',
    topic: 'Berpikir kritis dan memeriksa informasi',
    keywords: ['berpikir kritis', 'hoaks', 'misinformasi', 'cek fakta', 'bias', 'logika', 'validitas informasi'],
    answer: 'Untuk memeriksa klaim, pisahkan fakta, tafsiran, dan opini. Cari sumber asli, siapa penulisnya, kapan diterbitkan, bukti yang disertakan, dan apakah sumber independen menguatkannya. Waspadai judul sensasional, bukti anekdotal, korelasi yang dianggap sebab-akibat, serta pilihan informasi yang hanya mendukung keyakinan awal. Untuk klaim penting, jangan bergantung pada satu unggahan atau satu jawaban AI; catat apa yang belum diketahui.',
    sources: ['https://www.unesco.org/en/media-information-literacy']
  },
  {
    id: 'scientific-method',
    topic: 'Metode ilmiah dan membaca penelitian',
    keywords: ['metode ilmiah', 'hipotesis', 'eksperimen', 'penelitian', 'sampel', 'korelasi', 'sebab akibat'],
    answer: 'Metode ilmiah adalah proses berulang untuk merumuskan pertanyaan, menyusun hipotesis yang dapat diuji, mengumpulkan data dengan cara yang jelas, menganalisis hasil, lalu melaporkan keterbatasan agar orang lain dapat menilai atau mengulanginya. Korelasi berarti dua hal berubah bersama, tetapi belum membuktikan salah satunya menyebabkan yang lain. Perhatikan ukuran sampel, cara memilih peserta, kelompok pembanding, ukuran efek, konflik kepentingan, dan apakah temuan direplikasi.',
    sources: ['https://www.nationalacademies.org/our-work/science-literacy']
  },
  {
    id: 'learning-how-to-learn',
    topic: 'Strategi belajar efektif',
    keywords: ['belajar efektif', 'active recall', 'spaced repetition', 'pengulangan berkala', 'catatan', 'ujian', 'konsentrasi'],
    answer: 'Belajar lebih kuat jika kamu mencoba mengingat tanpa melihat catatan, mengulang materi dalam beberapa sesi yang terpisah, mengerjakan soal, dan menjelaskan konsep dengan kata-kata sendiri. Setelah latihan, periksa jawaban dan pahami alasan kesalahan. Campurkan latihan yang relevan setelah dasar dipahami. Catatan yang rapi saja tidak menjamin pemahaman. Sesuaikan waktu belajar dengan kebutuhan, tidur, akses, dan kondisi masing-masing; tidak ada satu metode yang selalu terbaik untuk semua orang.',
    sources: ['https://www.apa.org/topics/learning-memory']
  },
  {
    id: 'math-problem-solving',
    topic: 'Pemecahan masalah matematika',
    keywords: ['matematika', 'persamaan', 'rumus', 'soal cerita', 'aljabar', 'geometri', 'statistika'],
    answer: 'Saat mengerjakan soal matematika, tulis apa yang diketahui dan ditanyakan, ubah informasi menjadi gambar, tabel, persamaan, atau model yang sesuai, lalu pilih strategi. Kerjakan langkah demi langkah dan periksa satuan serta tanda. Uji hasil dengan substitusi, perkiraan, atau cara kedua jika memungkinkan. Jika buntu, cari bagian terkecil yang belum dipahami dan pelajari prasyaratnya. Jangan hanya menghafal rumus; pahami kapan dan mengapa rumus berlaku.',
    sources: []
  },
  {
    id: 'computer-and-coding',
    topic: 'Komputer, algoritma, dan pemrograman',
    keywords: ['komputer', 'coding', 'koding', 'pemrograman', 'algoritma', 'debugging', 'javascript', 'python'],
    answer: 'Algoritma adalah urutan langkah yang jelas untuk menyelesaikan masalah. Dalam pemrograman, pecah kebutuhan menjadi input, proses, output, dan kondisi gagal; buat versi kecil yang dapat diuji; gunakan nama variabel yang bermakna; lalu periksa hasil dengan contoh normal, batas, dan input yang tidak valid. Debugging berarti menemukan penyebab masalah melalui bukti, bukan menebak terus. Jangan menaruh kata sandi, token, atau kunci API di kode publik. Sebelum memakai pustaka open-source, periksa lisensi, pemeliharaan, dependensi, dan risikonya.',
    sources: ['https://developer.mozilla.org/en-US/docs/Learn']
  },
  {
    id: 'digital-safety',
    topic: 'Keamanan digital dan privasi',
    keywords: ['keamanan digital', 'phishing', 'kata sandi', 'password', 'privasi online', 'akun diretas', '2fa'],
    answer: 'Gunakan kata sandi unik untuk setiap akun dan pengelola kata sandi bila tersedia; aktifkan autentikasi multifaktor; perbarui perangkat lunak; serta periksa alamat situs sebelum masuk atau mengunduh. Jangan membagikan kode OTP, kata sandi, token, atau kode pemulihan kepada siapa pun. Pesan mendesak, hadiah tidak masuk akal, tautan mirip alamat resmi, dan permintaan rahasia adalah tanda bahaya. Bagikan data pribadi seminimal mungkin dan tinjau izin aplikasi secara berkala.',
    sources: ['https://www.cisa.gov/secure-our-world']
  },
  {
    id: 'ai-literacy',
    topic: 'Literasi AI dan penggunaan yang bertanggung jawab',
    keywords: ['kecerdasan buatan', 'artificial intelligence', 'AI', 'halusinasi AI', 'prompt', 'etika AI'],
    answer: 'AI dapat membantu merangkum, menyusun ide, belajar, dan membuat draf, tetapi jawabannya bisa keliru, usang, bias, atau terdengar yakin tanpa bukti. Verifikasi fakta penting dengan sumber tepercaya, jangan memasukkan data rahasia, dan ungkapkan penggunaan AI jika aturan sekolah atau pekerjaan memintanya. Gunakan AI untuk memperkuat penilaian manusia, bukan menggantikan tanggung jawab. Model, aplikasi, dan fitur memiliki kemampuan berbeda; jangan menganggap suatu tindakan telah dilakukan tanpa bukti hasilnya.',
    sources: ['https://www.unesco.org/en/artificial-intelligence']
  },
  {
    id: 'financial-literacy',
    topic: 'Literasi keuangan pribadi dasar',
    keywords: ['literasi keuangan', 'menabung', 'anggaran', 'utang', 'bunga', 'investasi', 'uang'],
    answer: 'Mulailah dengan mencatat pemasukan dan pengeluaran, membedakan kebutuhan dan keinginan tanpa menghakimi, menetapkan tujuan realistis, dan menyisihkan tabungan sesuai kemampuan. Sebelum mengambil pinjaman atau membeli produk keuangan, pahami total biaya, bunga, denda, risiko, dan syaratnya. Waspadai janji keuntungan pasti atau sangat tinggi, tekanan untuk segera transfer, serta permintaan kode rahasia. Investasi selalu memiliki risiko; pelajari legalitas penyedia dan minta bantuan orang dewasa tepercaya untuk keputusan yang belum kamu pahami.',
    sources: ['https://sikapiuangmu.ojk.go.id/']
  },
  {
    id: 'pancasila-civic-literacy',
    topic: 'Pancasila, konstitusi, dan kewargaan Indonesia',
    keywords: ['pancasila', 'uud 1945', 'konstitusi', 'kewargaan', 'demokrasi', 'hak dan kewajiban', 'musyawarah'],
    answer: 'Pancasila adalah dasar negara Indonesia dan menjadi landasan nilai kehidupan berbangsa. UUD Negara Republik Indonesia Tahun 1945 adalah konstitusi; aturan pelaksanaannya mencakup peraturan perundang-undangan sesuai hierarki dan kewenangannya. Dalam kehidupan warga, hormati martabat manusia, keberagaman, hukum, hak dan kewajiban, partisipasi, serta penyelesaian perbedaan melalui dialog dan mekanisme yang sah. Untuk pasal, aturan, atau kebijakan terbaru, periksa naskah resmi karena hukum dapat berubah dan penerapannya bergantung konteks.',
    sources: ['https://www.mpr.go.id/', 'https://peraturan.bpk.go.id/']
  },
  {
    id: 'nusantara-culture',
    topic: 'Budaya Nusantara dan kearifan lokal',
    keywords: ['nusantara', 'budaya indonesia', 'adat', 'leluhur', 'gotong royong', 'keraton', 'kearifan lokal', 'bahasa daerah'],
    answer: 'Nusantara memiliki banyak tradisi, bahasa, tata nilai, seni, dan bentuk pengetahuan lokal yang hidup dalam masyarakat berbeda. Nilai seperti gotong royong, musyawarah, penghormatan, tanggung jawab, dan menjaga alam dapat dipelajari bersama konteks sejarahnya. Jangan menyamakan semua adat atau menganggap satu sumber mewakili seluruh masyarakat. Bedakan naskah sejarah, tradisi lisan, tafsir modern, dan klaim yang belum terverifikasi; libatkan sumber komunitas serta hormati hak budaya dan perbedaan pandangan.',
    sources: ['https://kebudayaan.kemdikbud.go.id/']
  },
  {
    id: 'environment-climate',
    topic: 'Lingkungan, iklim, dan keberlanjutan',
    keywords: ['lingkungan', 'perubahan iklim', 'sampah', 'daur ulang', 'energi', 'keanekaragaman hayati', 'konservasi'],
    answer: 'Lingkungan mencakup udara, air, tanah, makhluk hidup, dan hubungan di antaranya. Perubahan iklim terutama berkaitan dengan peningkatan gas rumah kaca dari aktivitas manusia; dampak dan risikonya berbeda menurut wilayah. Tindakan seperti mengurangi pemborosan, memakai barang lebih lama, memilah sampah sesuai fasilitas setempat, menghemat energi dan air, serta menjaga habitat dapat membantu, tetapi solusi sistemik dan kebijakan juga penting. Periksa data lokal dan sumber ilmiah; hindari menyalahkan individu atas masalah yang membutuhkan tindakan bersama.',
    sources: ['https://www.ipcc.ch/', 'https://www.unep.org/']
  },
  {
    id: 'communication-conflict',
    topic: 'Komunikasi, negosiasi, dan menyelesaikan konflik',
    keywords: ['negosiasi', 'mediasi', 'menyelesaikan konflik', 'berdebat', 'komunikasi asertif', 'minta maaf'],
    answer: 'Dalam konflik, jelaskan kejadian spesifik dan dampaknya tanpa menghina karakter orang. Sampaikan kebutuhan atau batas secara langsung, dengarkan tanggapan, dan rumuskan pilihan yang dapat diterima bersama bila aman. Minta maaf dengan menyebut tindakan, dampak, dan perbaikan yang akan dilakukan, bukan sekadar menuntut masalah selesai. Tidak semua konflik dapat diselesaikan sendiri; bila ada ancaman, kekerasan, ketimpangan kuasa, atau rasa tidak aman, cari bantuan orang tepercaya atau pihak berwenang yang sesuai.',
    sources: ['https://www.unicef.org/adolescentkit/']
  },
  {
    id: 'decision-making',
    topic: 'Pengambilan keputusan dan pemecahan masalah',
    keywords: ['mengambil keputusan', 'decision making', 'memilih', 'pro kontra', 'risiko', 'rencana aksi'],
    answer: 'Tentukan keputusan yang perlu dibuat dan kapan harus diputuskan. Kumpulkan fakta yang relevan, pisahkan asumsi, buat beberapa pilihan termasuk menunda bila memungkinkan, lalu bandingkan manfaat, risiko, biaya, dampak pada orang lain, dan kesesuaian dengan nilai. Untuk keputusan yang sulit dibatalkan, cari informasi tambahan dan pendapat tepercaya. Pilih langkah berikutnya yang dapat diuji, tentukan tanda keberhasilan, dan tinjau kembali jika bukti berubah.',
    sources: []
  },
  {
    id: 'indonesian-writing',
    topic: 'Bahasa Indonesia, menulis, dan merangkum',
    keywords: ['bahasa indonesia', 'menulis', 'paragraf', 'merangkum', 'esai', 'ejaan', 'kalimat efektif'],
    answer: 'Tulisan yang jelas memiliki tujuan dan pembaca yang terarah. Susun gagasan utama, urutkan alasan atau bukti, gunakan paragraf yang fokus, dan pilih kata yang sesuai konteks. Ringkasan harus mempertahankan gagasan inti dengan kata-kata sendiri tanpa menambahkan klaim baru. Bedakan kutipan langsung dari parafrasa dan cantumkan sumber saat memakai gagasan atau data orang lain. Untuk ejaan dan aturan resmi, periksa pedoman kebahasaan yang berlaku.',
    sources: ['https://ejaan.kemdikbud.go.id/']
  },
  {
    id: 'history-source-literacy',
    topic: 'Sejarah dan cara membaca sumber sejarah',
    keywords: ['sejarah', 'sumber primer', 'prasasti', 'naskah kuno', 'kronologi', 'sejarah nusantara'],
    answer: 'Belajar sejarah berarti menilai sumber, konteks, kronologi, dan perbedaan penafsiran. Sumber primer berasal dari masa atau pelaku yang diteliti, tetapi tetap perlu diuji: siapa pembuatnya, untuk siapa, dengan tujuan apa, dan bagian mana yang mungkin tidak tercatat. Bandingkan sumber primer dengan penelitian sejarawan dan bukti arkeologi. Tradisi lisan penting, tetapi perlu dijelaskan cara pengumpulan dan konteksnya. Jika para ahli berbeda pendapat, terangkan perbedaannya alih-alih membuat kepastian palsu.',
    sources: ['https://kebudayaan.kemdikbud.go.id/']
  },
  {
    id: 'health-information-literacy',
    topic: 'Memahami informasi kesehatan secara aman',
    keywords: ['informasi kesehatan', 'gejala', 'obat', 'dokter', 'kesehatan', 'diagnosis', 'pengobatan'],
    answer: 'Materi kesehatan umum dapat membantu menyiapkan pertanyaan, tetapi tidak cukup untuk mendiagnosis seseorang atau memilih pengobatan secara pasti. Gejala yang sama dapat memiliki penyebab berbeda. Gunakan sumber lembaga kesehatan tepercaya, perhatikan tanggal dan kelompok yang dibahas, serta tanyakan tenaga kesehatan untuk keputusan pribadi. Jangan menghentikan obat atau mengubah dosis hanya berdasarkan saran AI. Bila terjadi keadaan darurat atau kondisi memburuk cepat, cari bantuan medis langsung.',
    sources: ['https://www.who.int/health-topics']
  },
  {
    id: 'knowledge-quality',
    topic: 'Bagaimana NADYA menambah pengetahuan',
    keywords: ['tambah pengetahuan', 'knowledge base', 'basis pengetahuan', 'update pengetahuan', 'kurasi', 'riset online', 'sumber pengetahuan'],
    answer: 'Paket lokal NADYA adalah kumpulan ringkasan edukatif yang dapat dicari tanpa internet; paket ini bukan model bahasa besar dan tidak otomatis mengetahui peristiwa terbaru. Saat online, sumber baru harus diperiksa asal, tanggal, bukti, lisensi, konteks, dan keterbatasannya; klaim penting dibandingkan dengan sumber independen. Ringkasan ditulis ulang dengan kata-kata sendiri dan dicatat sumbernya. Persetujuan lokal berarti materi disimpan untuk pencarian, bukan bukti bahwa isi ilmiahnya telah diverifikasi otomatis. Aturan keselamatan, izin, dan privasi tidak boleh diubah oleh proses pembaruan pengetahuan.',
    sources: ['https://www.unesco.org/en/media-information-literacy']
  }
];
