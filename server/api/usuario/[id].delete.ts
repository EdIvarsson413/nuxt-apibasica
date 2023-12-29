import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const { id } =  getRouterParams( event )
    let type, msg;
    
    await prisma.usuario.delete({
        where: {
            id: parseInt(id)
        }
    })
        .then( response => {
            // Devuelve el usuario pero fue eliminado
            msg = 'Usuario eliminado'
            type = 'success'
        })
        .catch( error => {
            console.log(error)
            msg = 'Error al eliminar usuario'
            type = 'error'
        })

    return {
        type: type,
        msg: msg
    }
})