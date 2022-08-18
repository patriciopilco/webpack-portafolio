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


