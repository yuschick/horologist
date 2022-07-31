require('esbuild').buildSync({
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    outdir: 'dist',
    external: ['date-fns', 'suntimes', 'lunarphase-js'],
    format: 'esm',
});
