import { CreditCards } from './creditcards';

export class Customer {
      fullName: string;
      email: string;
      creditCards: Array<CreditCards>
      constructor(){
      	this.creditCards = new Array();
      }
   }