# Roadmap NADYA

Roadmap ini berbasis bukti implementasi, bukan janji tanggal.

## M0 — Foundation (sedang dibangun)
- [x] Repository ownership dan prinsip produk didokumentasikan.
- [ ] Responsive PWA shell berbahasa Indonesia.
- [ ] Local runtime contract dan capability registry fail-closed.
- [ ] Unit tests dan GitHub Actions CI.
- [ ] README dan architecture/security docs.

## M1 — Conversation and memory
- [ ] Provider interface dengan provider lokal/dummy untuk tes.
- [ ] Provider AI nyata di server-side; secret tidak pernah dikirim ke browser.
- [ ] Consent, review, export, and delete for memory.
- [ ] Conversation evaluation fixtures.

## M2 — Agent orchestration
- [ ] Task plan, specialist-agent contract, bounded retries and timeouts.
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

A milestone is complete only when code, tests, docs, and CI evidence agree.