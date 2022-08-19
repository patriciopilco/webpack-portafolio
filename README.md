# webpack-portafolio
Webpack permite optimizar los recursos para enviar a producción.

## Instalar webpack
```bach
npm install webpack webpack-cli -D
```

## Ejecutar webpack

. Producción, 
Crea la carpeta dist con el archivo main.js

```bach
npx webpack --mode production
```

## Crear archivos de configuración para el manejo de entradas y salidas.

1. Crear archivo de configuración en la raiz del proyecto **webpack.config.js**
2. Crear configuracion en el archivo
    * Crear constante path 
    * crear modulo que va exportar un objeto con una configuración
        * primera configuracion, es **entry** que define el elemento inicia de la aplicación.
        * segunda configuracion, es **output** a donde envia lo que prepara webp

        ```bash
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
        ```

3. Ejecutar el comando para prepara el proyecto

```bach
npx webpack --mode production --config webpack.config.js
```

4. Ejecutar comando de manera mas amigable
   
* Editar el archivo package.json
* Añadir al objeto scripts *build*, de esta manera ya no tenemos que establecer el archivo de configuración como se realizo en el item(3)

```bach
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --mode production"
  },
```
* De esta namera unicamete se puede ejecutar con las siguientes lineas

```bash
npm run build
``` 

## Babel Loader

Babel permite que la app sea compatible en la mayor parte de navegadores

1. Instalar

* [ preset-env ] nos ayuda a trabajar con javascript moderno.
* [ plugin-transform-runtime ] plugin para trabajar con asincronismo.
* [ D ] , se instala como una dependencia de desarrollo.

```bash
npm install babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime -D

```
**Nota:** Se puede comprobar que las dependencias fueron agregadas, abriendo el archivo *package.json*

2. Crear en la raiz un archivo oculto *.babelrc* , utilizado para añadir configuraciones.
* Crear un objeto con presets, plugins

```bash
{
    "presets": [
        "@babel/preset-env"
    ],
    "plugins": [
        "@babel/plugin-transform-runtime"
    ]
}
```

3. Crear *module* en el archivo *webpack.config.js*

Permite conectar nuestro proyecto con babel

```bash
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
    }
```

4. Probar con babel

```bash
npm run build
```
## HTML Loader

1. Instalar plugin, como dependencia de desarrollo

```bash
npm install html-webpack-plugin -D
```

2. Añadir recurso en la parte superior del archivo *webpack.config.js*

```bash
const HtmlWebpackPlugin = require('html-webpack-plugin')
```

3. Despues de module en el archivo *webpack.config.js* añadir un plugin al proyecto
```bash
  plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'

        })
    ]
```

4. Hacer cambios en el archivo *index.htlm*, ya que webpack nos entrega el html listo para trabajar.

```bash
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../src/styles/main.css">
  <title>JS Portfolio</title>
</head>

<body>
  <div id="main"></div>
</body>

</html>
```
5. Correr el comando en nuestra terminal 
```bash
npm run build
```

**NOTA:** La carpeta *dist* contiene los archivos *index.html, main.js* minimizados.


## CSS Loader

1. Instalar plugin css como dependencia de desarrollo

```bash
npm install mini-css-extract-plugin css-loader -D
```

2. Quitar *stylesheet* de nuestra cabecera dentro del documento html.

```bash
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JS Portfolio</title>
</head>

<body>
  <div id="main"></div>
  
</body>

</html>
```

3. Añadir estilos en el archivo *index.js*

```bash
import './styles/main.css'
```

4. Configurar archivo *webpack.config.js*

* Declarar plugin

```bash
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
```
* Añadir nuevo module

```bash
    {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
    }
```

* Añadir Nuevo plugin

```bash
    new MiniCssExtractPlugin
```

v

## Stylus Loader

```bash
npm install stylus-loader -D
```

Añadir una regala que reconozca stylus en la regla del modulo css del archivo *webpack.config.js*

```bash
        {
            test: /\.css | .styl $/i,
            use: [MiniCssExtractPlugin.loader, 
                'css-loader',
                'stylus-loader'],
        }
```

## Copia de archivos

1. Instalar plugin *copy-webpack*

```bash
npm install copy-webpack-plugin -D
```
2. Configurar que archivos se van a copiar de src a dist

* Añadir soporte para webpack, se debe configurar el archivo *webpack.config.js*

```bash
const CopyPlugin = require('copy-webpack-plugin');
```
* Crear nueva instancia **CopyPlugin** en la sección plugin, indicando cuales son los elementos que se van a utilizar.

```bash
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        })
    ]
```

* Cambiar las referencias de los archivos hacia /assets/images, en nuestro caso de los recursos que se encuentran en el archivo Template.js

Antes
```bash
          <a href="https://twitter.com/gndx">
            <img src="../src/assets/images/twitter.png" />
          </a>

```

Despues
```bash
          <a href="https://twitter.com/gndx">
            <img src="assets/images/twitter.png" />
          </a>

```

* Correr el comando en nuestra terminal 
```bash
npm run build
```
