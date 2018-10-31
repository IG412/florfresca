import { Address } from './address';

export class CreditCards{
            token?:string;
            name: string;
            document: number;
            number: number;
            expMonth?: number;
            expYear?: number;
            type: string;
            address: Address;
            constructor(){
               this.address = new Address();
            }
         }