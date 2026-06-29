#!/usr/bin/env node
// Clones the content repo, runs its build script, then copies the output prompt.
// Reuses CONTENT_REPO_URL, CONTENT_REPO_USER, and CONTENT_REPO_TOKEN.

import { execSync } from 'node:child_process';
import { copyFileSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

function run(cmd, opts = {}) {
  execSync(cmd, { stdio: 'inherit', ...opts });
}

async function main() {
  const repoUrl = process.env.CONTENT_REPO_URL;
  const username = process.env.CONTENT_REPO_USER;
  const token = process.env.CONTENT_REPO_TOKEN;

  if (!repoUrl || !username || !token) {
    console.warn('[fetch-prompts] Missing env vars — skipping prompt fetch.');
    return;
  }

  const cloneUrl = repoUrl.replace('https://', `https://${username}:${token}@`);
  const tmpDir = join(tmpdir(), `acollier-content-${Date.now()}`);

  try {
    run(`git clone --depth 1 --quiet ${cloneUrl} ${tmpDir}`);
    run('node scripts/build-prompt.mts', { cwd: tmpDir });

    mkdirSync(resolve(ROOT, 'prompts'), { recursive: true });
    copyFileSync(
      join(tmpDir, 'dist/system-prompt.md'),
      resolve(ROOT, 'prompts/system-prompt.md'),
    );
    console.log('[fetch-prompts] Wrote prompts/system-prompt.md');
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error('[fetch-prompts]', err.message);
  process.exit(1);
});
