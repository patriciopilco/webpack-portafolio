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

## Loader de imágenes

Añadir regla de module configuracion en webpack.config.js

```bash
        {
            test: /\.png/,
            type: 'asset/resource'
        }
```

Realizar los import de las imágenes en el Template.js

```bash
import github from '../assets/images/github.png';
```
Utilizarlo de manera directa, se recomienda usar esta forma para que sea mas dinámico.

```bash
            <a href="https://github.com/gndx">
            <img src="${github}" />
          </a>
```


## Loaders de fuentes

* Optimizar llamado de fuentes para realizarlo de manera local.
* Las fuentes se las puede descargar desde el sitio *google-webfonts-helper.herokuapp.com/fonts*

1. Configurar en el archivo */src/styles/main.css*

```bash
#Quitar el import hacia una url

@import "https://fonts.googleapis.com/css?family=Ubuntu:300,400,500";

#Remplazar por la fuente de manera local

@font-face {
	font-family: 'Ubuntu';
	src: url('../assets/fonts/ubuntu-regular.woff2') format('woff2'),
		url('../assets/fonts/ubuntu-regular.woff') format('woff');
	font-weight: 400;		
	font-style: normal;
}
```

2. Copiar de assets a la carpeta de dist

* Instalar dos recursos que nos va permir leer archivos y moverlos.
```bash
npm install url-loader file-loader -D
```

3. Añadir regla dentro de module en *webpack.config.js*

```bash
        {
            test:/\.(woff|woff2)$/,
            use:{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: "application/font-woff",
                    name: "[name].[ext]",
                    outputPath: "./assets/fonts/",
                    publicPath: "./assets/fonts/",
                    esModule: false
                },
            }
        }

```

## Compresion y Minificación de archivos

Instalar dependencias para minimizar el css y minimizar el javascript

```bash
npm install css-minimizer-webpack-plugin terser-webpack-plugin -D
```

Editar el archivo *webpack.config.js*
* Añadir las constantes CssMinimizerPlugin, TerserPlugin
```bash
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
```

* Añadir la parte de optimizacion *optimization* para la optimizacion Css y javascript

```bash
optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    }
```
* Personalizar los filename 

```bash
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),      
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'   //Configuración para mover nuestras imagenes
    }
```
  * Habilitar el formato hash para las fonts

  ```bash
 test:/\.(woff|woff2)$/,
            use:{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: "application/font-woff",
                    name: "[name].[contenthash].[ext]",  //Se añade contenthash
                    outputPath: "./assets/fonts/",
                    publicPath: "./assets/fonts/",
                    esModule: false
                },

  ```  
* Configuración al MiniCssExtractPlugin

```bash
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
```

* Probar los cambios
```bash
npm run build
```

## Webpack Alias

Es utilizado cuando se desconoce donde se encuentra ubicado nuestro recurso por ejemplo.

```bash
import '../../../../'
```
 Para poder ubicar este tipo de archivos utilizar alias

 1. configurar *webpack.config.js* en la sección resolve se debe crear un objeto alias.

 ```bash
  resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@templates': path.resolve(__dirname, 'src/templates'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@images': path.resolve(__dirname, 'src/images')
        }
    },
 ```

 2. Cambiar las rutas en los import del *index.js*

 ```bash
 import Template from '@templates/Template.js';
 import '@styles/main.css';
 import '@styles/vars.styl';
 ```

3. Probar la configuracion 

```bash
npm run build
```
## Variables de entorno

```bash
npm install dotenv-webpack -D
``` 
Añadir la configuración 

1. Crear archivo .env (Este directorio no se sube al repositorio por ende se debe solicitar estas variables al lider de equipo)
```bash
API=https://api.com
```
2. Crear archivo .env-example (Va tener los elementos ejemplo de que variables va tener el proyecto).
```bash
API=
```
3. Editar el archivo webpack.config.js

```bash
const Dotenv = require('dotenv-webpack');
```

4. Agregar nuevo plugin

```bash
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),   //Nuevo plugin
    ],
```

5. Utilizar la variable 

```bash
const API = process.env.API;
```
6. Probar 

```bash

npm run build
```

## Webpack Modo Desarrollo

1. Crear un nuevo archivo de configuración *webpack.config.dev.js*
2. Copiar los archivos de *webpack.config.js* sin la sección *optimization*
3. Añadir la sección *mode: 'development',* de esta manera se configura de manera específica para modo desarrollo

```bash
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),      
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'   
        imagenes
    },
    mode: 'development',  // Se añade para configuración modo desarrollo
    
```
4. Configurar el archivo *package.json* en la sección scripts

```bash
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --mode production",
    "dev": "webpack --config webpack.config.dev.js"   // Se añade para configuración modo desarrollo
  },
```

5. Ejecutar en la terminal el comando

```bash
npm run dev
```

## Webpack Modo Producción

1. Instalar plugin clean
```bash
npm install clean-webpack-plugin -D
```
2. Aplicar la configuración en *webpack.config.js*
```bash
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
```
3. Añadir plugin en las sección *plugins* en *webpack.config.js*

```bash
                }
            ]
        }),
        new Dotenv(),
        new CleanWebpackPlugin(),   //Se añade el plugin
    ],
```

4. Completar el modo producción en el archivo *package.json*

```bash
"build": "webpack --mode production --config webpack.config.js",
```

5. Ejecutar en la consola 

```bash
npm run build
```

## Webpack Watch
Permite estar observando los cambios del proyecto y que se compilen de forma automática.

1. (Primera Forma) Configuración *watch* en modo desarrollo *webpack.config.dev.js*

```bash
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),      
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'   
    },
    mode: 'development',
    watch: true, // Esta linea se agrega para la configuracón en modo watch
```
 Ejecutar en consola

```bash
npm run dev

```

2. (Segunta Forma) Editanto el archivo *package.json* y añadiendo un elemento en script

```bash
"build:watch": "webpack --watch --config webpack.config.js"
```
 Ejecutar en consola

 ```bash
 npm run build:watch
 ```
## Deploy Netlify

1. Crear el archivo *netlify.toml*

```bash
[build]
    publish = "dist"
    command = "npm run build"
```