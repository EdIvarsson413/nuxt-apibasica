<template>
  <article class="grid w-full grid-cols-2 gap-5 p-5 mx-auto">
    <!-- Registrar usuarios -->
    <section>
      <div class="py-6 bg-gray-300 rounded-lg shadow-lg">
        <h2 class="mb-5 font-mono text-2xl font-bold text-center">Registrar Usuarios</h2>
        
        <form class="grid w-3/4 grid-flow-row mx-auto space-y-4">
          <input
            type="text" 
            placeholder="Nombre" 
            v-model="usuario.nombre"
            class="p-2 border-2 border-green-400 focus:ring-2 focus:ring-green-400 focus:outline-none"
          >
          <input 
            type="text" 
            placeholder="Correo" 
            v-model="usuario.correo"
            class="p-2 border-2 border-green-400 focus:ring-2 focus:ring-green-400 focus:outline-none"
          >
          
          <button 
            v-if="!editando" 
            type="button" 
            @click="registrar"
            class="py-3 text-lg rounded-md bg-gradient-to-tr from-green-400 via-cyan-200 to-blue-400 hover:font-bold"
          >
            Registrar
          </button>
          
          <button 
            v-else 
            type="button" 
            @click="realizarEdicion"
            class="py-3 text-lg rounded-md bg-gradient-to-tr from-green-400 via-cyan-200 to-blue-400 hover:font-bold"
          >
            Editar
          </button>
        </form>
        <p class="mt-3 text-xl font-semibold text-center">{{ respuestaPOST }}</p>
      </div>
    </section>

    <!-- Usuarios actuales -->
    <section>
      <div class="px-3 py-6 overflow-auto bg-gray-300 rounded-lg shadow-lg h-[635px]">
        <h2 class="mb-5 font-mono text-2xl font-bold text-center">Usuarios</h2>
        <div v-if="usuarios.length > 0">
          <section class="p-3 mb-5 bg-gray-400 rounded-md" v-for=" usuario in usuarios" :key="usuario.id.toString">
            <pre>
              {{ usuario }}
            </pre>
            <div class="flex justify-between">
              <button class="w-2/5 px-2 py-3 rounded-md bg-gradient-to-tr from-yellow-200 via-yellow-400 to-yellow-500 hover:font-bold" @click="editar(usuario.id)">Editar {{ usuario.nombre }}</button>
              <button class="w-2/5 px-2 py-3 rounded-md bg-gradient-to-tr from-red-200 via-red-400 to-red-500 hover:font-bold" @click="eliminar(usuario.id)">Eliminar {{ usuario.nombre }}</button>
            </div>
          </section>
        </div>

        <p v-else class="mt-3 text-xl font-semibold text-center">{{ respuestaGET }}</p>
        <p class="mt-3 text-xl font-semibold text-center">{{ respuestaDELETE }}</p>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import type { Usuario, Respuesta, UsuarioRespuesta, UsuariosRespuesta } from '~/types/tipos'

const router = useRouter()

const respuestaPOST = ref <String> ('');
const respuestaGET = ref <String> ('');
const respuestaDELETE = ref <String> ('');
const editando = ref <Boolean> (false);
const usuarioID = ref <Number> (-1);
const usuarios = ref <UsuarioRespuesta[]> ([]);

const usuario : Usuario = reactive({
  nombre: '',
  correo: ''
})

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

  respuestaPOST.value = data.msg
}

function editar( id: Number) {
  const index = usuarios.value.findIndex( usuario => usuario.id === id )
  usuario.correo = usuarios.value[index].correo
  usuario.nombre = usuarios.value[index].nombre
  editando.value = true
  usuarioID.value = id
  console.log(usuario, usuarioID.value, editando.value)
}

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

  if( data.type === 'success' )
    router.go(0)

  if( data.type === 'error' )
    respuestaPOST.value = data.msg

  usuario.nombre = ''
  usuario.correo = ''
  editando.value = false
  usuarioID.value = -1
}

async function eliminar( id: Number ) {
  const data = await $fetch <Respuesta> (`/api/usuario/${id}`, { 
    method: 'delete',
    headers: { "client-platform": "browser" } 
  })

  if( data.type === 'success' )
    router.go(0)

  if( data.type === 'error' )
    respuestaDELETE.value = data.msg
}

onMounted( async () => {
  const data = await $fetch <UsuariosRespuesta> ('/api/usuario/obtener', { headers: { "client-platform": "browser" } })

  if( data.type === 'success' ) {
    usuarios.value = data.usuarios
  }

  if( data.type === 'error' ) {
    respuestaGET.value = data.msg
  }
})
</script>