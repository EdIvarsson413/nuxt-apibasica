# Instalar TailwindCSS
1. Usar los comandos ``` npx nuxi module add @nuxtjs/tailwindcss; npx tailwindcss init ```
    - Esto hará que en el `nuxt.config.ts` se agrege en modules un modulo de tailwind enfocado para Nuxt y también creará el archivo de configuracion de tailwind.

2. Agregar configuración
    ```js
    // En tailwind.config.js

        /** @type {import('tailwindcss').Config} */
        module.exports = {
            content: [
                "./components/**/*.vue",
                "./layouts/**/*.vue",
                "./pages/**/*.vue",
                "./app.vue",
                "./error.vue",
                "./plugins/**/*.{js,ts}",
            ],
        }
    ```

3. Agregar decoradores y a Nuxt
    ```css
        /* En un archivo de css */
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        @tailwind variants; 

    ```

    Y en `nuxt.config.ts`
    ```js
    export default defineNuxtConfig({
        devtools: { enabled: true },

        css: [ './assets/main.css' ],
        modules: ["@nuxtjs/tailwindcss"],
        tailwindcss: {
            exposeConfig: true,
            viewer: true
        },
        postcss: {
            plugins: {
            tailwindcss: {},
            autoprefixer: {},
            },
        },
    })
    ```