export interface Usuario {
    nombre: String
    correo: String
}

export interface Respuesta {
    type: 'error' | 'warning' | 'success' 
    msg: String
}

export interface UsuariosRespuesta {
    type: 'success' | 'error'
    msg: String
    usuarios: UsuarioRespuesta[]
}

export interface UsuarioRespuesta {
    id: Number
    nombre: String
    correo: String
    fecha_registro: Date,
    fecha_updated: Date
}