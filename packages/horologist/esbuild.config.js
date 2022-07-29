require('esbuild').buildSync({
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    outdir: 'dist',
    external: ['date-fns', 'date-fns-tz', 'suntimes', 'lunarphase-js'],
    format: 'esm',
});
