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

  {
    id: 'biology-basics',
    topic: 'Biologi dasar dan tubuh manusia',
    keywords: ['biologi', 'sel', 'organ', 'organisme', 'peredaran darah', 'jantung', 'sistem tubuh'],
    answer: 'Biologi mempelajari makhluk hidup dari tingkat molekul, sel, jaringan, organ, sistem organ, hingga organisme dan ekosistem. Sel adalah unit dasar kehidupan; organ tersusun dari beberapa jaringan yang bekerja bersama. Sistem tubuh saling berhubungan, sehingga gejala atau proses biologis jarang berdiri sendiri. Materi ini untuk belajar umum, bukan diagnosis atau pengganti pemeriksaan tenaga kesehatan.',
    sources: ['https://www.khanacademy.org/science/biology', 'https://medlineplus.gov/']
  },
  {
    id: 'physics-basics',
    topic: 'Fisika dasar: gaya, energi, dan gerak',
    keywords: ['fisika', 'gaya', 'energi', 'gerak', 'kecepatan', 'percepatan', 'newton'],
    answer: 'Fisika membangun model untuk menjelaskan materi, energi, gerak, dan interaksi. Kecepatan menyatakan perubahan posisi per waktu; percepatan menyatakan perubahan kecepatan per waktu. Gaya resultan berkaitan dengan perubahan gerak, sedangkan energi dapat berpindah atau berubah bentuk dan jumlah totalnya kekal dalam sistem tertutup sesuai model yang digunakan. Selalu tulis satuan, periksa asumsi, dan bedakan model ideal dari kondisi nyata.',
    sources: ['https://www.khanacademy.org/science/physics']
  },
  {
    id: 'chemistry-basics',
    topic: 'Kimia dasar dan keselamatan laboratorium',
    keywords: ['kimia', 'atom', 'molekul', 'reaksi kimia', 'asam basa', 'laboratorium'],
    answer: 'Kimia mempelajari susunan, sifat, dan perubahan materi. Atom dapat bergabung membentuk molekul atau senyawa; reaksi kimia menyusun ulang atom dan melibatkan perubahan energi. Persamaan reaksi harus setara karena atom dipertahankan. Di laboratorium, ikuti instruksi guru, label bahan, gunakan perlindungan yang diwajibkan, jangan mencicipi atau mencampur bahan tanpa arahan, dan jangan menghirup zat untuk mengenalinya. Bila label atau prosedur tidak jelas, hentikan dan tanyakan kepada pengawas.',
    sources: ['https://www.acs.org/education.html', 'https://www.khanacademy.org/science/chemistry']
  },
  {
    id: 'earth-and-climate',
    topic: 'Bumi, cuaca, iklim, dan lingkungan',
    keywords: ['bumi', 'cuaca', 'iklim', 'pemanasan global', 'perubahan iklim', 'ekosistem', 'sampah'],
    answer: 'Cuaca menggambarkan kondisi atmosfer dalam waktu singkat, sedangkan iklim adalah pola statistik dalam periode panjang. Sistem iklim dipengaruhi energi Matahari, atmosfer, lautan, daratan, es, dan kehidupan. Gas rumah kaca tertentu menahan sebagian panas; peningkatan konsentrasinya akibat aktivitas manusia menjadi penyebab utama pemanasan global modern. Tindakan lingkungan yang masuk akal mencakup mengurangi pemborosan energi dan bahan, memperbaiki penggunaan ulang serta daur ulang sesuai fasilitas setempat, dan mendukung keputusan berbasis data.',
    sources: ['https://climate.nasa.gov/', 'https://www.ipcc.ch/']
  },
  {
    id: 'astronomy-basics',
    topic: 'Astronomi dan tata surya',
    keywords: ['astronomi', 'tata surya', 'planet', 'bintang', 'galaksi', 'bulan', 'gerhana'],
    answer: 'Astronomi mempelajari benda dan fenomena di luar Bumi. Tata surya terdiri dari Matahari, planet, satelit alami, planet kerdil, asteroid, komet, dan benda kecil lainnya. Fase Bulan terjadi karena kita melihat bagian permukaan Bulan yang diterangi Matahari dari sudut berbeda, bukan karena bayangan Bumi kecuali saat gerhana Bulan. Model ilmiah terus diperbarui saat pengamatan baru tersedia; untuk penemuan terbaru, periksa sumber astronomi resmi.',
    sources: ['https://science.nasa.gov/solar-system/']
  },
  {
    id: 'world-geography',
    topic: 'Geografi dunia dan peta',
    keywords: ['geografi', 'peta', 'benua', 'samudra', 'lintang', 'bujur', 'skala peta'],
    answer: 'Geografi mempelajari tempat, lingkungan, ruang, dan hubungan manusia dengan wilayah. Peta adalah representasi terpilih, bukan salinan sempurna permukaan Bumi. Perhatikan legenda, skala, orientasi, proyeksi, tanggal data, dan batas ketelitian. Proyeksi peta dapat mengubah ukuran atau bentuk; karena itu, bandingkan peta sesuai tujuan. Data batas wilayah dan nama tempat dapat berubah atau diperdebatkan, jadi gunakan sumber resmi dan jelaskan konteksnya.',
    sources: ['https://education.nationalgeographic.org/']
  },
  {
    id: 'history-source-literacy',
    topic: 'Cara menilai sumber sejarah',
    keywords: ['sejarah', 'sumber primer', 'sumber sekunder', 'historiografi', 'kronologi', 'arsip'],
    answer: 'Sumber primer berasal dari masa atau pelaku peristiwa, misalnya surat, arsip, foto, benda, atau kesaksian; sumber sekunder menganalisis sumber lain. Sumber primer tidak otomatis benar atau lengkap: pembuatnya memiliki sudut pandang, tujuan, dan batas pengetahuan. Periksa asal-usul, tanggal, pembuat, audiens, kondisi penyimpanan, konteks, dan kesesuaiannya dengan sumber independen. Bedakan fakta yang didukung bukti, interpretasi sejarawan, dan cerita populer.',
    sources: ['https://www.loc.gov/programs/teachers/']
  },
  {
    id: 'web-development',
    topic: 'Dasar pengembangan web',
    keywords: ['website', 'html', 'css', 'javascript', 'frontend', 'backend', 'web development'],
    answer: 'HTML memberi struktur dokumen, CSS mengatur tampilan, dan JavaScript menambahkan perilaku interaktif. Browser menjalankan kode sisi klien; layanan sisi server dapat menangani data dan autentikasi. Validasi pada browser membantu pengalaman pengguna, tetapi aturan keamanan penting harus ditegakkan di server juga. Uji tampilan pada ukuran layar berbeda, dukung keyboard dan pembaca layar, jangan menyimpan rahasia di kode publik, serta periksa dependensi dan lisensi sebelum digunakan.',
    sources: ['https://developer.mozilla.org/en-US/docs/Learn']
  },
  {
    id: 'git-version-control',
    topic: 'Git, version control, dan kolaborasi kode',
    keywords: ['git', 'github', 'commit', 'branch', 'pull request', 'version control', 'konflik merge'],
    answer: 'Version control mencatat perubahan proyek agar pekerjaan dapat ditinjau dan dipulihkan. Dalam Git, commit adalah snapshot perubahan, branch membantu mengerjakan fitur terpisah, dan pull request memudahkan pemeriksaan sebelum penggabungan. Buat perubahan kecil dengan pesan commit yang jelas, jalankan tes sebelum menggabungkan, dan baca diff. Jangan commit token, kata sandi, file rahasia, atau data pribadi; jika rahasia terlanjur terunggah, cabut atau rotasi rahasia tersebut.',
    sources: ['https://git-scm.com/doc', 'https://docs.github.com/en']
  },
  {
    id: 'data-literacy',
    topic: 'Literasi data dan statistik',
    keywords: ['statistik', 'data', 'rata-rata', 'median', 'sampel', 'grafik', 'probabilitas'],
    answer: 'Sebelum menafsirkan data, periksa siapa yang dikumpulkan, bagaimana pengukuran dilakukan, data yang hilang, ukuran sampel, dan kemungkinan bias. Rata-rata sensitif terhadap nilai ekstrem, sedangkan median menunjukkan nilai tengah. Grafik dapat menyesatkan jika sumbu dipotong, skala berubah, atau kategori tidak sebanding. Hubungan statistik tidak otomatis menunjukkan sebab-akibat. Laporkan ketidakpastian dan jangan membuat kesimpulan yang lebih kuat daripada bukti.',
    sources: ['https://www.khanacademy.org/math/statistics-probability']
  },
  {
    id: 'english-learning',
    topic: 'Strategi belajar bahasa Inggris',
    keywords: ['bahasa inggris', 'english', 'grammar', 'kosakata', 'speaking', 'listening', 'vocabulary'],
    answer: 'Belajar bahasa lebih efektif bila mendengarkan, membaca, berbicara, dan menulis secara teratur dengan tingkat kesulitan yang sesuai. Pelajari kosakata dalam frasa dan konteks, bukan daftar terpisah saja; gunakan pengulangan berkala dan cobalah mengingat tanpa melihat. Kesalahan adalah informasi untuk perbaikan. Periksa contoh dari kamus atau sumber bahasa tepercaya, dan ingat bahwa aksen serta ragam bahasa berbeda menurut penutur dan situasi.',
    sources: ['https://learnenglish.britishcouncil.org/']
  },
  {
    id: 'writing-and-argument',
    topic: 'Menulis argumen dan esai yang kuat',
    keywords: ['esai', 'argumen', 'paragraf', 'tesis', 'menulis', 'struktur tulisan', 'kutipan'],
    answer: 'Tulisan argumentatif yang kuat memiliki pertanyaan atau tesis yang jelas, alasan yang runtut, bukti yang relevan, penjelasan hubungan bukti dengan klaim, serta pengakuan terhadap batasan atau pandangan alternatif. Satu paragraf sebaiknya memiliki fokus utama. Bedakan kutipan langsung, parafrasa, dan gagasan sendiri; cantumkan sumber sesuai aturan tugas. Setelah draf selesai, revisi isi dan logika terlebih dahulu, lalu periksa struktur kalimat, ejaan, dan format.',
    sources: ['https://owl.purdue.edu/owl/general_writing/']
  },
  {
    id: 'entrepreneurship-basics',
    topic: 'Kewirausahaan dan validasi ide',
    keywords: ['wirausaha', 'bisnis', 'pelanggan', 'model bisnis', 'produk', 'validasi pasar', 'umkm'],
    answer: 'Ide bisnis perlu diuji melalui masalah pelanggan yang nyata, bukan hanya asumsi pembuatnya. Wawancarai calon pengguna dengan pertanyaan netral, buat versi sederhana untuk diuji, hitung biaya dan harga secara realistis, lalu catat umpan balik. Bedakan minat verbal dari perilaku nyata. Hindari menjanjikan hasil pasti atau mengambil utang besar sebelum memahami risiko, kewajiban, dan kebutuhan pasar. Data pelanggan harus dikumpulkan seperlunya dan dijaga privasinya.',
    sources: ['https://www.sba.gov/business-guide']
  },
  {
    id: 'open-source-literacy',
    topic: 'Open-source, lisensi, dan atribusi',
    keywords: ['open source', 'lisensi', 'mit license', 'apache', 'gpl', 'hak cipta', 'atribusi'],
    answer: 'Kode yang terlihat publik tidak otomatis bebas digunakan untuk tujuan apa pun. Periksa lisensi proyek dan dependensi, ketentuan atribusi, distribusi perubahan, paten, merek dagang, serta kewajiban menyertakan pemberitahuan. Catat sumber dan versi yang dipakai, hindari menghapus lisensi, dan mintalah bantuan yang kompeten jika kewajiban hukum tidak jelas. Penjelasan umum ini bukan nasihat hukum untuk kasus tertentu.',
    sources: ['https://choosealicense.com/', 'https://opensource.org/licenses']
  },
  {
    id: 'accessibility-basics',
    topic: 'Aksesibilitas digital dan desain inklusif',
    keywords: ['aksesibilitas', 'disabilitas', 'wcag', 'keyboard', 'screen reader', 'kontras warna', 'inclusive design'],
    answer: 'Desain digital yang aksesibel membantu orang dengan kemampuan dan perangkat berbeda. Gunakan struktur heading yang logis, label yang jelas untuk formulir, navigasi keyboard, fokus yang terlihat, teks alternatif yang bermakna, kontras memadai, dan pesan kesalahan yang dapat dipahami. Jangan menyampaikan informasi hanya melalui warna. Uji dengan keyboard dan teknologi bantu bila memungkinkan, serta libatkan pengguna dengan kebutuhan berbeda dalam evaluasi.',
    sources: ['https://www.w3.org/WAI/standards-guidelines/wcag/']
  },
  {
    id: 'decision-making',
    topic: 'Pengambilan keputusan dan manajemen risiko',
    keywords: ['keputusan', 'risiko', 'prioritas', 'trade off', 'pilihan', 'analisis keputusan'],
    answer: 'Untuk keputusan penting, tulis tujuan, pilihan yang tersedia, batasan, manfaat, biaya, risiko, dan hal yang belum diketahui. Bedakan keputusan yang mudah dibatalkan dari yang sulit dibalik; uji pilihan kecil terlebih dahulu bila aman. Cari bukti yang dapat mengubah pikiran, bukan hanya mendukung pilihan favorit. Tetapkan kapan keputusan akan ditinjau ulang dan siapa yang perlu dilibatkan. Tidak semua keputusan membutuhkan analisis panjang—sesuaikan dengan besarnya dampak.',
    sources: ['https://www.nist.gov/itl/ai-risk-management-framework']
  }

];
