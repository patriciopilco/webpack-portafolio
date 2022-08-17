const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),      //Indica en donde se encuentra nuestro proyecto.
        filename: 'main.js',
    },
    resolve: {
        extensions: ['.js']
    }
}