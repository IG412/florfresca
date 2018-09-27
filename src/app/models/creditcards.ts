export class CreditCards{
            name: string;
            document: number;
            number: number;
            expMonth: number;
            expYear: number;
            type: string;
            address?: {
               line1: string;
               line2: string;
               line3: string;
               postalCode: number;
               city: string;
               state: string;
               country: string;
               phone: number;
            }
         }