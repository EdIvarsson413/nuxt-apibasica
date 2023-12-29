# Instalar Prisma para MySQL en Nuxt 3
1. Usar los comandos `npm i -D prisma @prisma/client`.

2. Usar `npx prisma init` para crear el archivo .env y el directorio `prisma` para comenzar a crear modelos (represntaciones de tablas).

3. Crear instancia de base de datos de MySQL ya que prisma no la crea por sí sola

4. En schema.prisma
    ```js
    datasource db {
        provider = "mysql"
        url      = env("DATABASE_URL")
    }
    ```

    DATABASE_URL:
    ```env
    DATABASE_URL="mysql://usuario:contraseña@127.0.0.1:3306/<base de datos>"
    ```

5. En schema.prisma se define un modelo (necesario para lograr la conexión entre Nuxt y MySQL)
    ```js
    // Modelo de este proyecto
    model Usuario {
        id              Int       @id @default(autoincrement())
        nombre          String
        correo          String
        fecha_registro  DateTime  @default(now()) @db.DateTime(0)
        fecha_updated   DateTime  @updatedAt
    }
    ```

6. Realizar migración para comenzar la conexión con `npx prisma migrate dev` y dar un commit a la migración efectuada

## Tip
Si se requiere ver los cambios efectuados en los modelos o cuando se vayan consumiendo los modelos, se puede usar el workbench de MySQL o el software visual de la base de datos correspondiente.

O también usar el comando `npx prisma studio`, el cual dará un host local para ver como se reflejan los cambios de una forma sencilla y también deja una interacción básica con los modelos que se están usando.
