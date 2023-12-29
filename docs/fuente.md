# Agregar alguna fuente en Nuxt
1. Descargar el archivo de la fuente
2. Llevar el archivo al directorio `public/`
3. En el archivo css:
```css
/* Ranga es una fuente descargada para el proyecto */
@font-face {
    font-family: 'Ranga';
    src: url('/Ranga-Regular.ttf');
}

body {
    font-family: 'Ranga', sans-serif;
}
```

Nota: No habrá choque con algún framework como Tailwind