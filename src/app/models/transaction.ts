import { Customer } from './customer';
import { PlanT } from './planT';
import { Address } from './address';

export class Transaction {
   quantity: number;
   installments: number;
   trialDays: number;
   immediatePayment: boolean;
   extra1: string;
   extra2: string;
   customer: Customer;
   plan: PlanT ;
   deliveryAddress: Address;
   notifyUrl: string;
   constructor(){
     this.notifyUrl = "";
     this.extra1 = "Extra 1";
     this.extra2 = "Extra 2";
     this.immediatePayment = true;
     this.trialDays = 0;
     this.quantity  = 1;
     this.deliveryAddress = new Address();
   }
}