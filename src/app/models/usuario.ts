export class Usuario {
    _id?:string;
    nombre?: string;
    apellido?: string;
    correo: string;
    telefono?: string;
    celular?: number;
    tipo_doc?: string;
    documento?:  string;
    pass?:string;
    dir?:string;
    tarjeta?: [
         {
            nombre: string,
            numero: string,
            fecha_ven: string,
            codigo_s: string,
            hash: string
        }
    ];

}
