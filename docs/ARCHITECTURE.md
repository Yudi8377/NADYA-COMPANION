# Arsitektur NADYA AI COMPANION

## Sasaran
NADYA adalah companion yang terasa konsisten lintas perangkat, bukan sekadar chatbot atau dashboard. UI menjadi pintu masuk ke runtime; kapabilitas harus berupa fungsi yang benar-benar dapat dipanggil, diuji, diaudit, dan dibatasi izinnya.

## Lapisan

1. **Experience layer** — web/PWA awal; nantinya adapter Android dan desktop. Bahasa utama: Indonesia.
2. **Conversation runtime** — normalisasi pesan, konteks sesi, pemilihan intent, respons, dan event observabilitas.
3. **Orchestrator** — mengarahkan pekerjaan ke agen spesialis berdasarkan tugas, izin, batas waktu, dan hasil yang diharapkan. Agen tidak mendapat hak akses otomatis hanya karena dipanggil.
4. **Specialist agents** — conversation, knowledge/research, planning, learning, device interaction, and workflow. Tiap agen memiliki kontrak input/output dan izin eksplisit.
5. **Capability registry** — daftar tindakan seperti speech, camera, files, web, automation, and integrations; status `unconfigured`, `disabled`, `ready`, or `error`.
6. **Memory & knowledge** — short-term session context, user-approved durable memory, and source-grounded knowledge. User can inspect, export, and delete memory.
7. **Governance & security** — consent, permission checks, secret handling, audit events, tool allowlists, and fail-closed execution.

## Prinsip multi-agent
Multi-agent dipakai ketika tugas memang perlu spesialisasi atau pekerjaan paralel. Orchestrator tetap bertanggung jawab atas rencana, validasi hasil, konflik, dan jawaban akhir. Agen tidak boleh mengklaim tindakan eksternal selesai jika tool belum mengonfirmasi keberhasilan.

## Integrasi AURA
AURA menjadi referensi untuk mengevaluasi ide runtime, memori sesi, intent routing, affect/personality, self/world model, agent orchestration, suara Indonesia, dan avatar. Tidak ada kode AURA yang dianggap terintegrasi sebelum source, lisensi, dependensi, keamanan, dan tes ditinjau. NADYA mempertahankan identitas dan kontraknya sendiri.

## Tahapan
- M0: repository foundation, responsive shell, local runtime contract, tests, CI.
- M1: memory consent/export/delete, conversation providers, adapter interface.
- M2: orchestration dan specialist-agent contracts, evaluations, traces.
- M3: voice input/output dan avatar dengan pemeriksaan dukungan perangkat.
- M4: camera/device tools behind explicit permissions; no silent capture.
- M5: Android/desktop packaging, sync options, backups, release pipeline.

## Status kejujuran
UI demo atau placeholder bukan bukti AI model, suara, kamera, sinkronisasi, atau otomatisasi telah aktif. Setiap fitur harus punya implementasi, tes, status kapabilitas, dan dokumentasi konfigurasi.