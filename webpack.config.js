const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),      //Indica en donde se encuentra nuestro proyecto.
        filename: 'main.js',
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
        {
            test: /\.m?js$/,  //  Saber que tipo de extensiones vamos a utilizar(Utiliza cualquier extensión con mjs o js)
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }
        ]
    },
}