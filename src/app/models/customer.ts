import { CreditCards } from './creditcards';

export class Customer {
	  id?:string;
      fullName: string;
      email: string;
      creditCards: Array<CreditCards>
      constructor(){
      	this.creditCards = new Array();
      }
   }