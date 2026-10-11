# Roadmap NADYA

Roadmap ini berbasis bukti implementasi, bukan janji tanggal.

## M0 — Foundation
- [x] Repository ownership dan prinsip produk didokumentasikan.
- [x] Responsive PWA shell berbahasa Indonesia.
- [x] Local runtime contract dan capability registry fail-closed.
- [x] Unit tests dan GitHub Actions CI.
- [x] README dan architecture/security docs.

## M1 — Conversation and memory (berjalan)
- [x] Kontrak provider HTTP di client dan tes mock; fallback tetap lokal.
- [x] Endpoint server-side kompatibel chat completions, validasi input, timeout, dan secret server-only.
- [ ] Deploy backend provider, konfigurasi secret, dan uji integrasi live.
- [x] Persetujuan, peninjauan, ekspor, dan penghapusan memori manual lokal.
- [ ] Conversation evaluation fixtures.

## M2 — Agent orchestration (berjalan)
- [x] Agen perencana lokal berbasis aturan dengan langkah kerja yang dapat ditandai selesai.
- [x] Jejak eksekusi lokal terbatas untuk audit/debug.
- [ ] Model AI generatif untuk agen spesialis, bounded retries and timeouts.
- [ ] Permission-aware tool dispatch and trace viewer.
- [ ] Test matrix for refusal, failure, and conflicting agent outputs.

## M3 — Voice and presence
- [ ] Indonesian speech recognition/TTS capability detection.
- [ ] Explicit microphone activation and visible recording state.
- [ ] Avatar/presence layer separated from conversation logic.

## M4 — Device and workflow tools
- [ ] Camera/file/device adapters with per-capability consent.
- [ ] Confirm-before-act policy for external changes.
- [ ] Audit events and recovery behavior.

## M5 — Device releases
- [ ] Android and desktop adapters.
- [ ] Packaging, signing, update strategy, backup/restore, and release QA.

A milestone is complete only when code, tests, docs, and CI evidence agree. Browser-local memory is not cloud sync and does not automatically store chat messages.
