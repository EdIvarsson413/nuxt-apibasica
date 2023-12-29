<template>
    <div class="w-full">
      <header class="mb-10">
        <h1 class="text-5xl text-center">Creando API Básica</h1>  
        <h4 class="text-lg text-center">{{ respuesta }}</h4> 
      </header>
      
      <main>
        <NuxtPage />
      </main>
    </div>
</template>

<script setup lang="ts">
import type { Respuesta } from './types/tipos'

const respuesta = ref <String> ('')

onMounted( async () => {
  const data = await $fetch <Respuesta> ('/api/saludo', { headers: { "client-platform": "browser" } })
  respuesta.value = data.msg
})

useHead({
  title: 'Api Básica',
  meta: [{ name: 'description', content: 'Bienvenido a API BÁSICA' }],
  link: [{ rel: 'icon', type: 'image/x-icon', href: './favicon.ico' }]
})
</script>
