import test from 'node:test';
import assert from 'node:assert/strict';
import { NadyaAgentTeam } from '../src/core/agents.js';

test('orchestrator routes tasks to specialist agents', () => {
  const team = new NadyaAgentTeam();
  assert.equal(team.run({task:'Bantu aku memahami percakapan ini'}).agentId, 'conversation');
  assert.equal(team.run({task:'Bandingkan sumber dan bukti penelitian'}).agentId, 'research');
  assert.equal(team.run({task:'Buat rencana belajar matematika'}).agentId, 'planning');
  assert.equal(team.run({task:'Hapus file di perangkat'}).agentId, 'workflow');
});

test('research agent states limitations and does not claim to fetch the web', () => {
  const team = new NadyaAgentTeam();
  const empty = team.run({task:'Riset tentang belajar aktif', agent:'research'});
  assert.match(empty.answer, /tidak mengakses internet secara otomatis/i);
  const result = team.run({task:'Riset tentang belajar aktif', agent:'research', context:'Ringkasan sumber: teknik belajar aktif membantu retensi. https://example.org/study'});
  assert.match(result.answer, /bukan penelusuran web/i);
  assert.ok(result.findings.some((x) => x.includes('https://example.org/study')));
});

test('workflow agent never executes external actions and asks for confirmation', () => {
  const team = new NadyaAgentTeam();
  const result = team.run({task:'Kirim pesan ke semua kontak', agent:'workflow', consent:true});
  assert.equal(result.mode, 'safe-preview-only');
  assert.equal(result.requiresConfirmation, true);
  assert.ok(result.findings.some((x) => x.includes('Tidak ada perintah yang dikirim')));
});

test('empty task is rejected and traces can be cleared', () => {
  const team = new NadyaAgentTeam();
  assert.equal(team.run({task:'  '}).ok, false);
  team.run({task:'Susun rencana', agent:'planning'});
  assert.equal(team.traces.length, 1);
  team.clearTraces();
  assert.equal(team.traces.length, 0);
});
