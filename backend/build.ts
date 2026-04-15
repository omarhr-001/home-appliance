import * as esbuild from 'esbuild'

const production = process.env.NODE_ENV === 'production'

const options: esbuild.BuildOptions = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/index.js',
  platform: 'node',
  target: 'node20',
  sourcemap: !production,
  minify: production,
  external: [
    'express',
    'cors',
    'cookie-parser',
    'dotenv',
  ],
}

async function build() {
  try {
    await esbuild.build(options)
    console.log('Build successful!')
  } catch (error) {
    console.error('Build failed:', error)
    process.exit(1)
  }
}

build()
