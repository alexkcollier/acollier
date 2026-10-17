# acollier

> acollier.ca

My portfolio site, built in Nuxt with Netlify functions. Content used by `@nuxt/content` and prompts for the chat function are stored in a dedicated content repo.

## Deploys

Changes to `main` (protected) trigger production deploys. PRs will open branch deploy previews. There's also a webhook in the content repo to trigger deploys.

## Requirements

- [mise](https://mise.jdx.dev) (or any Node version manager that reads `.nvmrc`)
- netlify cli
- ollama (for local chat, `qwen2.5:1.5b` is a good small model for testing)

The Node version is pinned in `.nvmrc` and the pnpm version in `package.json`'s `packageManager` field. mise only reads them once enabled:

```bash
mise settings add idiomatic_version_file_enable_tools node
mise settings add idiomatic_version_file_enable_tools pnpm
```

Packages allowed to run build scripts are listed under `allowBuilds` in `pnpm-workspace.yaml`.

## Build Setup

```bash
# install the pinned Node and pnpm versions
mise install

# install dependencies
pnpm install

# dev server at localhost:3000 (no Netlify functions)
pnpm dev

# dev server at localhost:8888 with Netlify env vars and functions (contact form, chat)
netlify dev

# generate static project
pnpm generate
```

Requires `netlify-cli` installed globally for `netlify dev`.

### Chat / LLM

The chat function (`functions/chat.mts`) uses Google Gemini in production. Locally, you can swap to [Ollama](https://ollama.com) by setting environment variables in `.env`:

```bash
LOCAL_LLM_PROVIDER=ollama
OLLAMA_MODEL=llama3.2        # defaults to llama3.2 if unset
OLLAMA_BASE_URL=http://localhost:11434/v1  # defaults to this if unset
```

When `LOCAL_LLM_PROVIDER` is unset, the function falls back to Gemini and requires a `GEMINI_API_KEY`.

### Encoding `.webm`

I've included a script to convert videos to `.webm`. To use it, install `ffmpeg`. Then run:

```bash
# make sure output path ends with `.webm` extension
$ sh scripts/encode-webm.sh <./path/to/input.file> <./path/to/output.webm>
```
