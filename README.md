# acollier

> acollier.ca

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

### Encoding `.webm`

I've included a script to convert videos to `.webm`. To use it, install `ffmpeg`. Then run:

```bash
# make sure output path ends with `.webm` extension
$ sh scripts/encode-webm.sh <./path/to/input.file> <./path/to/output.webm>
```
