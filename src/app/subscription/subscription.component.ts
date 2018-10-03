import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  load:boolean;

  constructor() {
  	this.load = true;
  }

  ngOnInit() {
  	this.load = false;
  }

  getPath(){
  	return location.pathname;
  }

}
