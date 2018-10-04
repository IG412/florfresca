import { CreditCards } from './creditcards';

export class Usuario {
    _id?:string;
    nombre?: string;
    apellido?: string;
    correo: string;
    telefono?: string;
    celular?: number;
    tipo_doc?: string;
    documento?:  number;
    pass?:string;
    dir?:string;
    payuId?:string;
    tarjeta: Array<CreditCards>;
    constructor(){
        this.tarjeta = new Array();
    }

}
