# Menyiapkan backend AI NADYA

Frontend statis GitHub Pages tidak dapat menjalankan secret server. Endpoint `api/chat.js` ditujukan untuk deployment serverless Node.js (misalnya Vercel) dari repositori ini.

## Secret server

Atur variabel berikut di dashboard hosting backend; jangan menaruh kunci di `src/`, HTML, commit, atau pesan chat.

- `OPENAI_API_KEY` — wajib, simpan sebagai secret/encrypted variable.
- `OPENAI_MODEL` — opsional; default `gpt-4o-mini`.
- `OPENAI_BASE_URL` — opsional; default `https://api.openai.com/v1`, gunakan hanya endpoint provider yang tepercaya dan kompatibel dengan API chat completions.

Deploy backend setelah variabel disimpan. Uji `POST /api/chat` dengan JSON berisi `messages` (role hanya `user` atau `assistant`) dan opsional `memories`. Endpoint menerapkan validasi ukuran, batas jumlah pesan, timeout, respons generik untuk kesalahan provider, dan rate limit in-memory dasar.

## Catatan keamanan

- Rate limit in-memory bersifat best-effort dan tidak terdistribusi; sebelum penggunaan publik, tambahkan rate limit di gateway/WAF atau penyimpanan bersama.
- API key tidak pernah dikirim ke browser. Jangan pernah mengaktifkan logging body chat di hosting.
- Catatan memori hanya dikirim ke provider bila memori lokal aktif. Pesan yang dikirim ke model eksternal diproses oleh provider; jangan sertakan informasi sensitif yang tidak diperlukan.
- Static GitHub Pages tidak menjalankan `api/chat.js`. Sampai backend terdeploy dan endpoint tersedia pada origin aplikasi, aplikasi tetap menggunakan runtime lokal dan menunjukkan status yang jujur.
