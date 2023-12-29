# Enrutamiento de Nuxt
+ ## Temas
    - [Determinar rutas](#determinar-rutas)
    - [Tips para páginas](#tips-en-páginas)
    - [Tips para servidor](#tips-en-servidor)
        - [Recibir Datos](#recibir-datos)
        - [Nombres de archivos](#nombre-de-archivos)
        - [Pruebas de API](#pruebas-de-api)


La forma de crear rutas, tanto para servidor como páginas, es por medio de directorios. Eso significa si se tiene esta estructura de carpetas: 

```
+.raiz
|--pages
|   |-index.vue
|   |-about.vue
|--server
|   |-api
|       |-saludo.ts
|-nuxt.config.ts
|-README.md
```

Se tendran estas urls:
+ localhost:3000/      -         (index.vue)
+ localhost:3000/about  -        (about.vue)
+ localhost:3000/api/saludo -    (saludo.ts)

## Determinar rutas
Nuxt no sabe como determinar que archivos son parte del enrutamiento, es por eso aqui se definen los parámetros para ello:

+ ### Páginas
    - En app.vue tener el componente `<NuxtPage/>`
    - Tener el directorio `pages`
    - Cualquier archivo dentro de `pages` debe tener `<template> y <script>`
+ ### Servidor
    - Tener un archivo js/ts
    - El archivo debe tener un manejador de eventos:
    ```js
    export default defineEventHandler( async (event) => {
        return {
            // Devuelve un JSON
        }
    }
    ```

## Tips en páginas
Para modificar el `<head>` del HTML, se usa un composable `useHead`. Ejemplo:

```html
<!-- En app.vue -->
<script>
    useHead({
        title: 'Api Básica',
        meta: [{ name: 'description', content: 'Bienvenido a API BÁSICA' }],
        link: [{ rel: 'icon', type: 'image/x-icon', href: './public/favicon.ico' }],
    })
</script>
```

## Tips en servidor
### Recibir Datos
Para obtener datos del cuerpo y obtener parametros de la péticion:

```js
// En un archivo js/ts 
export default defineEventHandler( async (event) => {
    const { id } = getRouterParams( event )
    const { nombre, correo } = await readBody( event )
})
```

### Nombre de archivos
Por medio del enrutamiento tambien se pueden definir que tipo de método HTTP corresponde el contenido del archivo, también se muestra como definir parametros (util para páginas o archivos de servidor):

```
+.raiz
|--pages
|   |-index.vue
|   |-about.vue
|   |-articulo
|       |-[id].vue
|--server
|   |-api
|       |-saludo.ts
|       |-autor
|           |-[id].<get, put, post, delete>.ts
|-nuxt.config.ts
|-README.md
```

Nota: get puede quedarse implicito, ya que por defecto se manejan métodos get.

### Pruebas de API
Postman o Thunder client son formas de probar endpoints, pero Nuxt maneja IPv6 (generalmente IPv4). Por ello aquí esta el ejemplo de como sería la URL para realizar pruebas: `http://[::1]:3000/api`