export class Usuario {
    _id?:string;
    nombre?: string;
    apellido?: string;
    email: string;
    telefono?: string;
    celular?: number;
    tipo_doc?: string;
    documento?:  string;
    contra?: string;
    activo?: boolean;
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
