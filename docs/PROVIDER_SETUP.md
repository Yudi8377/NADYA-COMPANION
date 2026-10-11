# Menyiapkan backend AI NADYA dengan Supabase

NADYA hanya menggunakan GitHub/GitHub Pages untuk repositori, CI, dan frontend statis serta Supabase untuk backend. Fungsi AI berada di `supabase/functions/nadya-chat/index.ts`; fungsi tersebut tidak berjalan di GitHub Pages.

## 1. Pilih proyek Supabase khusus NADYA

Jangan menggunakan proyek aplikasi lain tanpa persetujuan. Setelah proyek NADYA dipilih, masukkan URL proyek dan publishable key-nya ke `src/config.js`. Publishable key memang digunakan di frontend; jangan pernah menaruh secret key, service-role key, atau `OPENAI_API_KEY` di sana.

## 2. Secrets Edge Function

Simpan secrets di Supabase Edge Functions:

- `NADYA_PUBLISHABLE_KEY` — nilai yang sama dengan publishable key pada konfigurasi frontend; fungsi membandingkannya sebelum menerima permintaan.
- `OPENAI_API_KEY` — wajib, rahasia provider AI.
- `OPENAI_MODEL` — opsional; default `gpt-4o-mini`.
- `OPENAI_BASE_URL` — opsional; default `https://api.openai.com/v1`, gunakan hanya endpoint tepercaya yang kompatibel dengan Chat Completions.
- `NADYA_ALLOWED_ORIGINS` — opsional, daftar origin dipisahkan koma; default mengizinkan GitHub Pages NADYA dan localhost untuk pengembangan.

Deploy fungsi `nadya-chat` dari Supabase Dashboard/CLI. Atur fungsi dengan `verify_jwt = false` karena versi awal tidak mewajibkan login; fungsi menerapkan pemeriksaan publishable key, CORS/origin, validasi payload, timeout, dan rate limit dasar. Publishable key bukan rahasia dan pemeriksaan Origin bukan mekanisme autentikasi yang kuat. Rate limit in-memory bersifat best-effort; sebelum trafik publik, tambahkan kuota per pengguna/perangkat yang tahan distribusi dan pemantauan biaya.

## Privasi dan batasan

- Kunci provider tidak pernah dikirim ke browser.
- Catatan memori hanya dikirim bila pengguna mengaktifkan memori lokal; pesan chat diproses provider eksternal.
- Fungsi tidak menyimpan riwayat chat ke database. Memori tetap lokal sampai sinkronisasi Supabase dirancang dengan persetujuan eksplisit dan kebijakan akses.
- Sampai proyek Supabase NADYA dipilih, fungsi dideploy, dan secrets diatur, aplikasi menggunakan runtime lokal. Jangan mengklaim model AI sudah aktif.
