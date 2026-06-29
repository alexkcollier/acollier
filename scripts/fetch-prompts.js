#!/usr/bin/env node
// Fetches prompts from the content repo before the Nuxt build.
// Reuses CONTENT_REPO_URL, CONTENT_REPO_USER, and CONTENT_REPO_TOKEN.
// Optionally override with PROMPTS_REPO_URL if prompts live in a separate repo.

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const PROMPTS = [
  { src: 'prompts/system-prompt.md', dest: 'prompts/system-prompt.md' },
];

function parseGithubRepo(url) {
  // Accepts https://github.com/owner/repo or https://github.com/owner/repo.git
  const match = url
    .replace(/\.git$/, '')
    .match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) throw new Error(`Cannot parse GitHub repo URL: ${url}`);
  return { owner: match[1], repo: match[2] };
}

async function fetchFile({
  owner,
  repo,
  path,
  token,
  username,
  branch = 'main',
}) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  const credentials = Buffer.from(`${username}:${token}`).toString('base64');
  const res = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentials}`,
      Accept: 'application/vnd.github.v3.raw',
      'User-Agent': 'acollier-build',
    },
  });

  if (!res.ok) {
    throw new Error(
      `GitHub API ${res.status} for ${path}: ${await res.text()}`,
    );
  }
  return res.text();
}

async function main() {
  const repoUrl = process.env.PROMPTS_REPO_URL ?? process.env.CONTENT_REPO_URL;
  const username = process.env.CONTENT_REPO_USER;
  const token = process.env.CONTENT_REPO_TOKEN;

  if (!repoUrl || !username || !token) {
    console.warn('[fetch-prompts] Missing env vars — skipping prompt fetch.');
    return;
  }

  const { owner, repo } = parseGithubRepo(repoUrl);

  for (const { src, dest } of PROMPTS) {
    const content = await fetchFile({
      owner,
      repo,
      path: src,
      token,
      username,
    });
    const destPath = resolve(ROOT, dest);
    mkdirSync(dirname(destPath), { recursive: true });
    writeFileSync(destPath, content, 'utf8');
    console.log(`[fetch-prompts] Wrote ${dest}`);
  }
}

main().catch((err) => {
  console.error('[fetch-prompts]', err.message);
  process.exit(1);
});
