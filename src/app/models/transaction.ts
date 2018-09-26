import { Customer } from './customer';

class Plan {
  planCode: string;
  description: string;
  accountId: number;
  intervalCount: number;
  interval: string;
  maxPaymentsAllowed: number;
  maxPaymentAttempts: number;
  paymentAttemptsDelay: number;
  maxPendingPayments: number;
  trialDays: number;
  customer: Customer;
  additionalValues: [
     {
        name: string;
        value: number;
        currency: string;
     }
  ]
  constructor(){
    this.intervalCount = 1;
    this.interval = "MONTH";
    this.maxPaymentsAllowed = 12;
    this.maxPaymentAttempts = 3;
    this.paymentAttemptsDelay = 1;
    this.maxPendingPayments = 1;
    this.trialDays = 30;
  }
}

export class Transaction {
   quantity: string;
   installments: number;
   trialDays: number;
   immediatePayment: boolean;
   extra1: string;
   extra2: string;
   customer: Customer;
   plan: Plan ;
   deliveryAddress: {
      line1: string;
      line2: string;
      line3: string;
      postalCode: number;
      city: string;
      state:string;
      country: string;
      phone: number;
      }
   notifyUrl: string;
   constructor(){
     this.notifyUrl = "";
     this.extra1 = "Extra 1";
     this.extra2 = "Extra 2";
     this.immediatePayment = true;
     this.trialDays = 15;
     this.installments = 1;
   }
}