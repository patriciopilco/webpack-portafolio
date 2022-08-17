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