import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler( async (event) => {
    // const usuarios = await prisma.usuario.findMany()

    // if( !usuarios ) {
    //     return {
    //         msg: 'No hay usuarios registrados'
    //     }
    // }

    try {
        const usuarios = await prisma.usuario.findMany()
        
        if( !usuarios || usuarios.length === 0) {
            return {
                type: 'error',
                msg: 'No hay usuarios registrados'
            }
        }

        return {
            type: 'success',
            usuarios: usuarios.map( usuario => ({
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                fecha_registro: usuario.fecha_registro,
                fecha_updated: usuario.fecha_updated
            }))
        }
    } catch ( error ) {
        return {
            type: 'success',
            msg: 'Error al obtener usuarios'
        }
    } finally {
        // await prisma.$disconnect()
    }
})