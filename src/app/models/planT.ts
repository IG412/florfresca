import { Customer } from './customer';

class value{
        name: string;
        value: Number;
        currency: string;
     }

export class PlanT {
  planCode: String;
  description: String;
  accountId: number;
  intervalCount: number;
  interval: string;
  maxPaymentsAllowed: number;
  maxPaymentAttempts: number;
  paymentAttemptsDelay: number;
  maxPendingPayments: number;
  trialDays: number;
  additionalValues: Array<value>;
  constructor(){
    this.accountId = 744488;
    this.intervalCount = 1;
    this.interval = "MONTH";
    this.maxPaymentsAllowed = 12;
    this.maxPaymentAttempts = 3;
    this.paymentAttemptsDelay = 1;
    this.maxPendingPayments = 1;
    this.trialDays = 0;
    this.additionalValues = new Array();
  }
}