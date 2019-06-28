const path = require('path');

module.exports = {
    mode: 'development',
    entry: './js/index.js',
    devtool: 'inline-source-map',
    output: {
        filename: 'dist/main.js',
    },
    resolve: {
        alias: {
            /* eslint-disable key-spacing */
            js: path.resolve(__dirname, 'js'),
            classes: path.resolve(__dirname, 'js', 'classes'),
            utility: path.resolve(__dirname, 'js', 'utility')
            /* eslint-enable key-spacing */
        }
    }
};