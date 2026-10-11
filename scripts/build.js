import { cp, mkdir, rm } from 'node:fs/promises';

const rootFiles = ['index.html', 'styles.css', 'manifest.webmanifest', 'sw.js', 'icon.svg'];
await rm('dist', { recursive: true, force: true });
await mkdir('dist/src/core', { recursive: true });
for (const file of rootFiles) await cp(file, `dist/${file}`);
await cp('src/app.js', 'dist/src/app.js');
await cp('src/core/runtime.js', 'dist/src/core/runtime.js');
await cp('src/core/capabilities.js', 'dist/src/core/capabilities.js');
await cp('src/core/memory.js', 'dist/src/core/memory.js');
await cp('src/core/orchestrator.js', 'dist/src/core/orchestrator.js');
await cp('src/core/provider.js', 'dist/src/core/provider.js');
console.log('NADYA static production bundle created in dist/.');
