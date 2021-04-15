# acollier

> acollier.ca

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000, no netlify functions
$ yarn run dev

# generate static project
$ yarn run generate

# with `netlify-cli` installed globally, hot reload at localhost:8888 with netlify functions
$ netlify dev
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

### Encoding `.webm`

I've included a script to convert videos to `.webm`. To use it, install `ffmpeg`. Then run:

```bash
# make sure output path ends with `.webm` extension
$ sh scripts/encode-webm.sh <./path/to/input.file> <./path/to/output.webm>
```
