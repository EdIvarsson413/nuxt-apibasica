import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler( async (event) => {
    const { id } = getRouterParams( event )
    const { nombre, correo } = await readBody( event )
    let respuesta, type, msg;

    await prisma.usuario.update({
        where: {
            id: parseInt(id)
        },
        data: {
            nombre: nombre,
            correo: correo
        }
    })
        .then( response => {
            // Devuelve el usuario modificado
            type = 'success'
            msg = 'Usuario editado correctamente'
        })
        .catch( error => {
            console.log(error)
            type = 'error'
            msg = 'Error al modificar datos'
        })


    return {
        type: type,
        msg: msg
    }
})