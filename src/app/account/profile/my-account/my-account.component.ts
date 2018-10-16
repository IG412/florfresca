import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../../models/usuario';
import {FlorfrescaService} from '../../../services/florfresca.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
	usuario : Usuario;
  constructor(
  	private service: FlorfrescaService
  	) {

  	this.usuario = new Usuario();
  }

  ngOnInit() {
  	this.service.user(localStorage.getItem('id')).subscribe(u=>{
  		this.usuario = u;
  	},e=>{
  		console.log(e);
  	});
  }

}
