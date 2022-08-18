const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'

        })
    ]
}