require('esbuild').buildSync({
    entryPoints: ['./src/scripts/index.ts'],
    bundle: true,
    minify: true,
    outdir: '_site/js',
    external: ['horologist'],
    format: 'esm',
});
