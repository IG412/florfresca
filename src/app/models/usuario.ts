export class Usuario {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    celular: number;
    tipo_doc: string;
    documento:  string;
    salt: string;
    contra: string;
    reset: string;
    expires: string;
    activo: boolean;
    tarjeta: [
         {
            nombre: string,
            numero: string,
            fecha_ven: string,
            codigo_s: string,
            hash: string
        }
    ];

}
