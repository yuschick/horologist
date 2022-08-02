const eleventySass = require('eleventy-sass');
const postcss = require('postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const anchors_plugin = require('@orchidjs/eleventy-plugin-ids');

module.exports = function (config) {
    config.addPassthroughCopy('./src/assets');

    config.addPlugin(anchors_plugin);
    config.addPlugin(syntaxHighlight);
    config.addPlugin(eleventySass, {
        postcss: postcss([autoprefixer, cssnano]),
    });

    config.addNunjucksGlobal('getYear', function () {
        return new Date().getFullYear();
    });

    return {
        dir: {
            input: 'src',
            output: '_site',
        },
    };
};
