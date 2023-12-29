import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default defineEventHandler( async (event) => {
    const { nombre, correo } = await readBody( event )
    let usuario, msg;

    if( nombre && correo ) {    
        await prisma.usuario.create({
            data: {
                nombre: nombre,
                correo: correo
            }
        })
            .then( response => {
                usuario = response
                msg = 'Registro completo'
                console.log(usuario)
            })
            .catch( response => {
                console.log(response)
            })
    } else {
        msg = 'Nombre o correo vacio'
    }

    return {
        msg: msg
    }
})