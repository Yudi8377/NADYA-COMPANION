// Additional Indonesian-first knowledge cards bundled for local search.
// Original educational summaries with source links; not a live-updating database.
export const EXPANDED_KNOWLEDGE = [
  {
    id: 'climate-adaptation',
    topic: 'Adaptasi perubahan iklim dan ketahanan komunitas',
    keywords: ['adaptasi iklim', 'perubahan iklim', 'gelombang panas', 'banjir', 'kekeringan', 'ketahanan komunitas'],
    answer: 'Adaptasi iklim berarti mengurangi dampak risiko yang sudah terjadi atau diperkirakan, misalnya memperbaiki drainase, melindungi mangrove, menyiapkan peringatan dini, menghemat air, dan merancang ruang yang lebih teduh. Pilihan terbaik bergantung pada risiko setempat, kelompok rentan, biaya perawatan, serta dampak pada ekosistem. Bedakan adaptasi dari mitigasi, yang mengurangi emisi penyebab pemanasan. Gunakan data resmi dan pengetahuan warga; satu solusi tidak cocok untuk semua wilayah.',
    sources: ['https://www.ipcc.ch/report/ar6/syr/']
  },
  {
    id: 'disaster-preparedness',
    topic: 'Kesiapsiagaan bencana keluarga dan sekolah',
    keywords: ['kesiapsiagaan bencana', 'gempa', 'tsunami', 'banjir', 'evakuasi', 'tas siaga'],
    answer: 'Kenali bahaya utama di daerahmu, jalur dan titik kumpul resmi, cara menerima peringatan, serta kontak keluarga yang disepakati. Simpan kebutuhan penting dan obat pribadi yang memang diperlukan, air minum, lampu, baterai, serta salinan dokumen dalam tempat yang mudah dijangkau. Latihan harus mengikuti arahan lembaga kebencanaan setempat dan tidak menggantikan instruksi petugas saat kejadian. Setelah bencana, hindari bangunan rusak dan kabel jatuh, serta jangan menyebarkan kabar yang belum diverifikasi.',
    sources: ['https://www.bnpb.go.id/']
  },
  {
    id: 'database-fundamentals',
    topic: 'Dasar basis data dan SQL',
    keywords: ['database', 'basis data', 'sql', 'tabel', 'primary key', 'foreign key', 'query'],
    answer: 'Basis data menyimpan informasi secara terstruktur. Dalam model relasional, tabel berisi baris dan kolom; primary key mengidentifikasi baris secara unik, sedangkan foreign key menghubungkan data antartabel. Gunakan tipe data yang sesuai, batasan untuk menjaga konsistensi, indeks berdasarkan pola pencarian, dan cadangan yang diuji pemulihannya. Query harus memakai parameter saat menerima input pengguna agar mengurangi risiko SQL injection. Terapkan hak akses minimum dan jangan menyimpan rahasia dalam tabel tanpa perlindungan yang sesuai.',
    sources: ['https://www.postgresql.org/docs/current/tutorial.html', 'https://owasp.org/www-project-top-ten/']
  },
  {
    id: 'web-accessibility',
    topic: 'Aksesibilitas web praktis',
    keywords: ['aksesibilitas web', 'wcag', 'screen reader', 'kontras', 'keyboard', 'alt text'],
    answer: 'Aksesibilitas membuat situs dapat digunakan oleh lebih banyak orang, termasuk pengguna keyboard, pembaca layar, atau pembesaran teks. Beri struktur heading yang logis, label formulir yang jelas, teks alternatif bermakna untuk gambar informatif, fokus keyboard yang terlihat, kontras memadai, dan pesan kesalahan yang menjelaskan cara memperbaiki input. Jangan mengandalkan warna saja untuk menyampaikan status. Uji dengan keyboard dan alat bantu; pemeriksaan otomatis membantu tetapi tidak menggantikan pengujian manusia.',
    sources: ['https://www.w3.org/WAI/fundamentals/accessibility-intro/']
  },
  {
    id: 'api-design',
    topic: 'Dasar API dan integrasi sistem',
    keywords: ['api', 'rest', 'endpoint', 'http', 'json', 'integrasi aplikasi'],
    answer: 'API adalah kontrak agar sistem dapat bertukar data. Dokumentasikan endpoint, format input dan output, autentikasi, kode kesalahan, batas penggunaan, serta versi. Gunakan metode HTTP sesuai tujuan, validasi semua input di server, hindari mengirim data pribadi yang tidak diperlukan, dan jangan pernah menaruh kunci rahasia di aplikasi browser. Untuk operasi yang dapat diulang, pertimbangkan idempotensi; untuk kegagalan jaringan, gunakan timeout dan penanganan error yang jelas. Uji perilaku normal, batas, dan kegagalan.',
    sources: ['https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Introduction']
  },
  {
    id: 'software-testing',
    topic: 'Pengujian perangkat lunak dan debugging',
    keywords: ['software testing', 'unit test', 'integration test', 'debugging', 'regresi', 'bug'],
    answer: 'Pengujian memeriksa apakah perangkat lunak memenuhi perilaku yang diharapkan. Unit test memeriksa bagian kecil, integration test memeriksa kerja antarbagian, dan end-to-end test memeriksa alur pengguna. Buat contoh untuk kondisi normal, nilai batas, input tidak valid, serta kegagalan layanan. Saat menemukan bug, catat langkah reproduksi, hasil yang diharapkan, hasil aktual, dan log yang tidak memuat rahasia. Setelah memperbaiki masalah, tambahkan tes regresi agar kesalahan yang sama lebih mudah terdeteksi.',
    sources: ['https://testing.googleblog.com/']
  },
  {
    id: 'project-planning',
    topic: 'Perencanaan proyek dan manajemen risiko',
    keywords: ['manajemen proyek', 'project planning', 'roadmap', 'risiko', 'milestone', 'prioritas'],
    answer: 'Mulai proyek dengan menjelaskan masalah, siapa yang terdampak, hasil yang dapat diamati, batas lingkup, dan cara mengukur keberhasilan. Pecah pekerjaan menjadi keluaran kecil dengan penanggung jawab dan kriteria selesai yang jelas. Catat risiko, kemungkinan, dampak, tanda awal, serta rencana mitigasi. Sisihkan waktu untuk pengujian, dokumentasi, aksesibilitas, keamanan, dan pemeliharaan. Tinjau asumsi secara berkala dan ubah prioritas berdasarkan bukti, bukan hanya banyaknya fitur yang selesai.',
    sources: ['https://www.pmi.org/about/learn-about-pmi/what-is-project-management']
  },
  {
    id: 'financial-scams',
    topic: 'Mengenali penipuan keuangan dan investasi',
    keywords: ['penipuan investasi', 'scam', 'keuntungan pasti', 'pinjol', 'phishing keuangan', 'rekening'],
    answer: 'Waspadai janji keuntungan tinggi tanpa risiko, tekanan agar segera mentransfer, bonus karena merekrut orang, permintaan kode OTP, serta pihak yang melarang pemeriksaan independen. Verifikasi izin dan identitas melalui kanal resmi regulator, bukan tautan yang diberikan penjual. Jangan meminjamkan rekening atau identitas untuk menerima uang orang lain. Jika sudah mengirim uang atau data, segera hubungi bank atau penyedia layanan melalui kanal resmi dan simpan bukti komunikasi. Materi ini bersifat umum, bukan rekomendasi investasi atau nasihat hukum.',
    sources: ['https://www.ojk.go.id/', 'https://iasc.ojk.go.id/']
  },
  {
    id: 'personal-budgeting',
    topic: 'Menyusun anggaran pribadi sederhana',
    keywords: ['anggaran', 'budget', 'uang saku', 'pengeluaran', 'menabung', 'prioritas keuangan'],
    answer: 'Anggaran membantu memahami arus uang, bukan menghakimi pengeluaran. Catat pemasukan yang benar-benar tersedia, kelompokkan kebutuhan, kewajiban, tabungan bila memungkinkan, dan pengeluaran pilihan. Tinjau beberapa minggu untuk melihat pola dan sisakan ruang bagi biaya tak terduga. Tujuan tabungan sebaiknya realistis dan sesuai keadaan keluarga; tidak semua orang memiliki pendapatan atau kesempatan yang sama. Jangan membagikan PIN, OTP, atau detail rekening dalam percakapan publik.',
    sources: ['https://sikapiuangmu.ojk.go.id/']
  },
  {
    id: 'english-learning',
    topic: 'Belajar Bahasa Inggris dengan praktik bertahap',
    keywords: ['bahasa inggris', 'english learning', 'vocabulary', 'speaking', 'listening', 'grammar'],
    answer: 'Latihan bahasa lebih efektif bila menggabungkan pemahaman dan penggunaan: dengarkan atau baca materi yang sedikit menantang, catat frasa dalam konteks, lalu gunakan untuk menulis atau berbicara. Ulangi kosakata pada hari berbeda dan minta umpan balik yang spesifik. Kesalahan adalah data untuk belajar; perbaiki satu atau dua pola terlebih dahulu, bukan semuanya sekaligus. Pilih materi yang sesuai minat dan tingkat kemampuan. Aksen bukan ukuran tunggal kefasihan atau kecerdasan.',
    sources: ['https://learnenglish.britishcouncil.org/']
  },
  {
    id: 'public-speaking',
    topic: 'Presentasi dan berbicara di depan umum',
    keywords: ['public speaking', 'presentasi', 'pidato', 'berbicara di depan umum', 'slide'],
    answer: 'Presentasi yang baik berpusat pada satu pesan utama dan kebutuhan pendengar. Susun pembuka yang menjelaskan mengapa topik penting, beberapa gagasan dengan bukti atau contoh, lalu kesimpulan yang merangkum tindakan atau pemahaman. Gunakan slide sebagai penunjang, bukan naskah penuh; tulisan harus terbaca dan visual memiliki tujuan. Latihan dengan waktu nyata, rekam bila nyaman, dan perbaiki satu aspek setiap kali. Gugup adalah hal umum dan tidak berarti presentasi pasti gagal.',
    sources: ['https://owl.purdue.edu/owl/general_writing/academic_writing/visual_rhetoric/index.html']
  },
  {
    id: 'copyright-and-remix',
    topic: 'Hak cipta, atribusi, dan penggunaan ulang karya',
    keywords: ['hak cipta', 'copyright', 'creative commons', 'atribusi', 'lisensi gambar', 'remix'],
    answer: 'Jangan menganggap karya yang mudah ditemukan di internet otomatis bebas digunakan. Periksa pemegang hak, lisensi, izin, batas penggunaan, dan kewajiban atribusi. Lisensi Creative Commons memiliki ketentuan berbeda; beberapa membatasi penggunaan komersial atau karya turunan. Catat pencipta, judul, sumber, lisensi, dan perubahan yang dibuat. Aturan hukum berbeda menurut yurisdiksi dan konteks, sehingga kasus penting perlu diperiksa melalui sumber resmi atau bantuan hukum yang kompeten.',
    sources: ['https://creativecommons.org/share-your-work/cclicenses/']
  },
  {
    id: 'ai-literacy',
    topic: 'Literasi AI dan pemeriksaan jawaban model',
    keywords: ['literasi ai', 'halusinasi', 'prompt', 'model bahasa', 'ai generatif', 'verifikasi ai'],
    answer: 'Model AI generatif dapat menghasilkan penjelasan yang lancar tetapi salah, sumber yang tidak tepat, atau informasi yang sudah usang. Minta model menyatakan asumsi dan ketidakpastian, lalu periksa klaim penting pada sumber primer atau lembaga tepercaya. Jangan memasukkan data pribadi, kredensial, dokumen rahasia, atau informasi pihak lain tanpa dasar yang sah. Gunakan AI sebagai alat bantu berpikir dan draf, bukan pengganti penilaian manusia untuk keputusan penting. Kualitas jawaban juga bergantung pada konteks dan sistem yang digunakan.',
    sources: ['https://www.unesco.org/en/digital-education/artificial-intelligence']
  },
  {
    id: 'team-collaboration',
    topic: 'Kolaborasi tim dan umpan balik yang sehat',
    keywords: ['kerja tim', 'kolaborasi', 'feedback', 'umpan balik', 'konflik tim', 'delegasi'],
    answer: 'Kerja tim lebih jelas bila tujuan, peran, tenggat, definisi selesai, dan saluran komunikasi disepakati. Beri umpan balik pada perilaku atau hasil yang spesifik, jelaskan dampaknya, dan tawarkan langkah perbaikan yang dapat dilakukan. Tanyakan kebutuhan anggota tim, catat keputusan, dan angkat hambatan lebih awal. Perbedaan pendapat dapat membantu kualitas keputusan jika dibahas dengan hormat; penghinaan, diskriminasi, dan intimidasi bukan bentuk umpan balik yang sehat.',
    sources: ['https://www.atlassian.com/team-playbook']
  },
  {
    id: 'systems-thinking',
    topic: 'Berpikir sistem dan memahami sebab-akibat',
    keywords: ['berpikir sistem', 'systems thinking', 'umpan balik', 'causal loop', 'efek samping', 'sistem kompleks'],
    answer: 'Berpikir sistem melihat hubungan antarkomponen, bukan hanya satu kejadian. Tanyakan siapa yang terlibat, aliran informasi atau sumber daya, umpan balik, jeda waktu, dan dampak tak langsung. Solusi cepat dapat memindahkan masalah ke tempat lain atau menimbulkan efek samping. Buat peta sederhana, tulis asumsi, cari bukti yang bertentangan, dan uji perubahan dalam skala kecil bila aman. Model sistem membantu menalar, tetapi tetap menyederhanakan kenyataan dan perlu diperbarui dengan data.',
    sources: ['https://thesystemsthinker.com/']
  }
  ,
  {
    id: 'trend-literacy',
    topic: 'Literasi isu viral dan tren secara kritis',
    keywords: ['tren viral', 'isu viral', 'trending', 'berita viral', 'cek fakta tren', 'sumber asli', 'sumber aslinya'],
    answer: 'Sebelum percaya atau membagikan isu viral, berhenti sejenak dan periksa sumber aslinya, penulis/lembaga, tanggal, konteks penuh, bukti, serta apakah sumber independen menguatkan klaim. Bedakan fakta, opini, satire, promosi, dan hal yang belum diketahui. Popularitas, jumlah tayangan, dan jawaban AI bukan bukti kebenaran. Untuk isu yang cepat berubah, cari pembaruan dari sumber resmi dan pemeriksa fakta yang transparan.',
    sources: ['https://www.unesco.org/en/media-information-literacy', 'https://www.reuters.com/fact-check/']
  },
  {
    id: 'deepfake-literacy',
    topic: 'Mengenali deepfake dan media sintetis',
    keywords: ['deepfake', 'video palsu', 'suara tiruan', 'media sintetis', 'video AI', 'verifikasi video'],
    answer: 'Video, gambar, atau suara dapat dibuat atau diubah dengan AI sehingga tampak meyakinkan. Jangan menyimpulkan keaslian hanya dari tampilan atau suara. Cari unggahan asli, periksa konteks dan tanggal, lalu konfirmasi melalui kanal lain yang sudah dikenal—terutama sebelum mengirim uang, membagikan tuduhan, atau meneruskan pesan darurat. Ketidakwajaran visual dapat menjadi petunjuk, tetapi ketiadaan petunjuk bukan bukti bahwa media asli.',
    sources: ['https://www.cisa.gov/secure-our-world', 'https://www.nist.gov/artificial-intelligence']
  },
  {
    id: 'rage-bait-literacy',
    topic: 'Rage bait, polarisasi, dan manipulasi emosi',
    keywords: ['rage bait', 'konten pemancing amarah', 'polarisasi', 'provokasi online', 'konten provokatif'],
    answer: 'Sebagian konten sengaja dirancang untuk membuat orang marah, saling menyerang, dan terus berinteraksi. Sebelum bereaksi, baca konteks lengkap, periksa apakah judul cocok dengan isi, dan tanyakan apakah membagikannya membantu atau hanya memperluas provokasi. Kritik gagasan dan perilaku secara spesifik; jangan menyerang identitas, mengancam, atau menyebarkan data pribadi. Berhenti mengikuti akun yang berulang kali memanipulasi emosi adalah pilihan yang wajar.',
    sources: ['https://www.unesco.org/en/media-information-literacy']
  },
  {
    id: 'viral-challenge-safety',
    topic: 'Menilai keamanan tantangan viral',
    keywords: ['tantangan viral', 'viral challenge', 'challenge berbahaya', 'ikut tren berbahaya'],
    answer: 'Popularitas bukan bukti bahwa tantangan aman. Hindari tantangan yang melibatkan cedera, zat berbahaya, tindakan ilegal, gangguan terhadap orang lain, pelanggaran privasi, atau tekanan untuk merahasiakannya. Jangan mencoba hanya demi penerimaan sosial atau jumlah tayangan. Kamu boleh menolak, meninggalkan grup, dan meminta bantuan orang dewasa tepercaya jika ada tekanan atau risiko nyata.',
    sources: ['https://www.unicef.org/parenting/child-care/keeping-children-safe-online']
  },
  {
    id: 'social-comparison-and-self-worth',
    topic: 'FOMO, perbandingan sosial, dan harga diri',
    keywords: ['fomo', 'membandingkan diri', 'doomscrolling', 'harga diri media sosial', 'kecanduan scroll'],
    answer: 'Linimasa biasanya menampilkan pilihan momen, bukan gambaran utuh kehidupan seseorang. Jika konten membuatmu cemas, iri, atau terdorong terus menggulir, jeda dan tanyakan kebutuhan yang sebenarnya—informasi, hiburan, atau hubungan sosial. Atur notifikasi dan waktu penggunaan sesuai kebutuhan, pilih akun yang memberi manfaat, dan kembalilah ke kegiatan serta hubungan nyata yang penting bagimu. Nilai diri tidak ditentukan oleh likes, pengikut, atau tren.',
    sources: ['https://www.unicef.org/adolescentmentalhealthhub/resources/adolescents']
  },
  {
    id: 'scam-trends-and-urgency',
    topic: 'Penipuan digital yang memanfaatkan tren dan rasa mendesak',
    keywords: ['scam viral', 'penipuan tren', 'phishing', 'otp', 'giveaway palsu', 'lowongan palsu'],
    answer: 'Waspadai hadiah mendadak, lowongan yang meminta biaya, tautan tiruan, permintaan OTP, dan pesan yang memaksa bertindak segera atau merahasiakan sesuatu. Verifikasi lewat aplikasi atau alamat resmi yang kamu ketik sendiri; jangan gunakan kontak dari pesan mencurigakan. Jangan meminjamkan rekening, identitas, atau kode akses. Jika telanjur membagikan data atau mengirim uang, hubungi penyedia layanan atau bank melalui kanal resmi dan simpan bukti.',
    sources: ['https://www.cisa.gov/secure-our-world', 'https://www.ojk.go.id/']
  },
  {
    id: 'ai-hype-and-critical-use',
    topic: 'Hype AI dan penggunaan kecerdasan buatan secara kritis',
    keywords: ['hype AI', 'tren AI', 'AI terbaru', 'klaim AI', 'halusinasi AI', 'literasi kecerdasan buatan'],
    answer: 'Klaim tentang AI dapat melebih-lebihkan kemampuan, akurasi, atau manfaat suatu produk. Periksa demonstrasi independen, batasan, kebutuhan data, biaya berulang, privasi, dan siapa yang bertanggung jawab jika hasil salah. Uji pada tugas kecil dengan kriteria yang jelas dan bandingkan dengan cara lain. Jangan menyerahkan keputusan penting sepenuhnya kepada AI; jawaban yang lancar tetap perlu diverifikasi.',
    sources: ['https://www.unesco.org/en/digital-education/artificial-intelligence', 'https://www.nist.gov/artificial-intelligence']
  },
  {
    id: 'financial-hype-and-fomo',
    topic: 'FOMO finansial dan klaim cepat kaya',
    keywords: ['fomo finansial', 'cepat kaya', 'investasi viral', 'keuntungan pasti', 'crypto hype', 'trading viral'],
    answer: 'Jangan mengambil keputusan keuangan hanya karena tren, testimoni, influencer, atau takut ketinggalan. Janji keuntungan pasti atau tinggi tanpa risiko adalah tanda bahaya. Pahami produk, risiko, biaya, likuiditas, dan izin pihak terkait melalui kanal resmi regulator. Hindari utang atau penggunaan uang kebutuhan pokok demi mengikuti tren. Materi ini bersifat edukasi umum, bukan rekomendasi membeli aset.',
    sources: ['https://www.ojk.go.id/', 'https://sikapiuangmu.ojk.go.id/']
  },
  {
    id: 'privacy-and-digital-footprint',
    topic: 'Privasi, doxxing, dan jejak digital',
    keywords: ['doxxing', 'jejak digital', 'privasi online', 'sebar alamat', 'data pribadi viral'],
    answer: 'Unggahan, foto, lokasi, dan komentar dapat disalin atau disebarkan di luar konteks awal. Hindari membagikan alamat, sekolah, nomor telepon, dokumen, atau lokasi real-time yang tidak perlu. Jangan ikut menyebarkan identitas orang lain sebagai hukuman atau berdasarkan rumor. Tinjau pengaturan privasi, minta izin sebelum mengunggah orang lain, dan simpan bukti serta minta bantuan jika terjadi ancaman atau penyebaran data pribadi.',
    sources: ['https://www.cisa.gov/secure-our-world', 'https://www.unicef.org/parenting/child-care/keeping-children-safe-online']
  },
  {
    id: 'constructive-response-to-current-events',
    topic: 'Merespons isu sosial secara konstruktif',
    keywords: ['isu sosial', 'berita terkini', 'debat online', 'konflik viral', 'diskusi publik'],
    answer: 'Ketika menanggapi isu sosial, pisahkan fakta yang sudah terverifikasi dari dugaan dan pendapat. Baca sumber dengan perspektif berbeda yang dapat dipertanggungjawabkan, akui ketidakpastian, dan koreksi kesalahan bila ada bukti baru. Kritik tindakan atau kebijakan secara spesifik tanpa menghasut, mengancam, atau menyebarkan data pribadi. Jika ingin membantu, pilih tindakan yang aman dan nyata—misalnya dukungan komunitas atau informasi dari lembaga tepercaya.',
    sources: ['https://www.unesco.org/en/media-information-literacy']
  },
  {
    id: 'trend-checklist',
    topic: 'Checklist sebelum percaya, membagikan, membeli, atau mengikuti tren',
    keywords: ['checklist tren', 'cek sebelum share', 'sebelum ikut tren', 'sebelum membeli viral', 'verifikasi isu'],
    answer: 'Gunakan lima pertanyaan: (1) siapa sumber aslinya dan kapan diterbitkan? (2) apa bukti serta konteks lengkapnya? (3) apakah sumber independen menguatkannya? (4) apa risiko terhadap keselamatan, privasi, uang, dan orang lain? (5) apakah tindakan ini sejalan dengan tujuan jangka panjangku? Jika jawabannya belum jelas, tunda keputusan, jangan menyebarkan klaim sebagai fakta, dan cari informasi tepercaya. Berubah pikiran setelah melihat bukti adalah tanda belajar.',
    sources: ['https://www.unesco.org/en/media-information-literacy', 'https://www.cisa.gov/secure-our-world']
  }
];
