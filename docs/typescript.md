# Añadir tipos en Nuxt (al menos en frontend)
1. En la raiz del proyecto, crear `types/`
2. Modificar `tsconfig.json` del proyecto
```json
{
  // ./tsconfig.json
  "extends": "./.nuxt/tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["./*"]
    }
  },
}

```

3. Crear archivo con lso tipos
```
.-raiz
|-pages
|-server
|-types
    |-tipos.ts
```

## Ejemplo de uso
```ts
// tipos.ts
export interface UsuariosRespuesta {
    type: 'success' | 'error'
    msg: String
    usuarios: UsuarioRespuesta[]
}
```

#### En `<script>`:
```ts
import type { Respuesta } from './types/tipos'

const respuesta = ref <String> ('')

onMounted( async () => {
  const data = await $fetch <Respuesta> ('/api/saludo', { headers: { "client-platform": "browser" } })
  respuesta.value = data.msg
})
```