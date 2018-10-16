import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../../models/usuario';
import {FlorfrescaService} from '../../../services/florfresca.service';

class CreditCards  {
   token: string;
   customerId: string;
   number: string;
   type: string;
   name: string;
   document: number;
}
	

@Component({
  selector: 'app-my-cards',
  templateUrl: './my-cards.component.html',
  styleUrls: ['./my-cards.component.css']
})
export class MyCardsComponent implements OnInit {
  cards : Array<any>;
  creditcards: Array<CreditCards>;
  constructor(
  	private service: FlorfrescaService
  	) {

  	this.cards = new Array();
  	this.creditcards = new Array();
  }

  ngOnInit() {
  	this.service.userCards(localStorage.getItem('id')).subscribe(u=>{
  		this.cards = u;
  		for (var i = 0; i < this.cards.length; ++i) {
  			console.log(this.cards[i]);
  		}
  	},e=>{
  		console.log(e);
  	});
  }

}
