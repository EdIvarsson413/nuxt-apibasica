# Realizar peticiones en el frontend
Nuxt también cuenta con su propia API para realizar el fetch de datos (sin importar que método HTTP ejecuten). Aquí los ejemplos usados en el proyecto.

+ ### GET
```js
onMounted( async () => {
  const data = await $fetch <UsuariosRespuesta> ('/api/usuario/obtener', { headers: { "client-platform": "browser" } })
})
```

+ ### POST
```js
async function registrar() {
  const data = await $fetch <Respuesta> ('/api/usuario/crear', {
    method: 'post',
    headers: {
      "client-platform": "browser"
    },
    body: { 
      nombre: usuario.nombre,
      correo: usuario.correo
    }
  })
}
```

+ ### PUT
```js
async function realizarEdicion() {
  const data = await $fetch <Respuesta> (`/api/usuario/${usuarioID.value}`, {
    method: 'put',
    headers: {
      "client-platform": "browser"
    },
    body: {
      nombre: usuario.nombre,
      correo: usuario.correo
    }
  })
}
```

+ ### DELETE
```js
async function eliminar( id: Number ) {
  const data = await $fetch <Respuesta> (`/api/usuario/${id}`, { 
    method: 'delete',
    headers: { "client-platform": "browser" } 
  })
}
```