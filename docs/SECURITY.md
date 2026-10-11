# Model Keamanan NADYA

## Default deny
- Integrasi cloud, kamera, mikrofon, akses file, browser automation, shell, dan kontrol perangkat **mati secara default**.
- Jangan menaruh API key, token, password, atau data pribadi di repository, client bundle, logs, atau contoh konfigurasi.
- Tidak ada aksi eksternal yang berjalan hanya karena teks model memintanya; semua tindakan melewati capability registry dan permission gate.

## Izin dan persetujuan
- Jelaskan tujuan akses sebelum meminta izin sensor atau file.
- Indikator mikrofon/kamera harus jelas dan sesi dapat dihentikan pengguna.
- Tindakan berdampak nyata memerlukan konfirmasi eksplisit sebelum eksekusi.
- Tolak akses yang belum dikonfigurasi; jangan fallback diam-diam ke provider lain.

## Memori
- Memori permanen harus opt-in dan dapat ditinjau, diekspor, serta dihapus.
- Pisahkan konteks sesi dari memori jangka panjang.
- Jangan simpan rahasia atau inferensi sensitif sebagai memori otomatis.
- Versi awal menyimpan preferensi demo di browser lokal saja; jangan gunakan untuk autentikasi atau data rahasia.

## Logging
Catat metadata minimum untuk audit: waktu, capability, status, dan alasan penolakan. Hindari menyimpan isi percakapan penuh secara default.

## Pelaporan kerentanan
Jangan mempublikasikan credential atau data pengguna dalam issue. Reproduksi masalah dengan data sintetis dan dokumentasikan dampaknya.