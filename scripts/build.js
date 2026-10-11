import { cp, mkdir, rm } from 'node:fs/promises';

const rootFiles = ['index.html', 'styles.css', 'manifest.webmanifest', 'sw.js', 'icon.svg'];
await rm('dist', { recursive: true, force: true });
await mkdir('dist/src/core', { recursive: true });
for (const file of rootFiles) await cp(file, `dist/${file}`);
await cp('src/config.js', 'dist/src/config.js');
await cp('src/app.js', 'dist/src/app.js');
for (const file of ['runtime.js', 'capabilities.js', 'memory.js', 'orchestrator.js', 'provider.js', 'chat-contract.js']) await cp(`src/core/${file}`, `dist/src/core/${file}`);
console.log('NADYA static production bundle created in dist/.');
