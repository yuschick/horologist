require('esbuild').buildSync({
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    outdir: 'dist',
    external: [],
    format: 'esm',
    loader: { '.mp4': 'copy' },
});
