import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../../models/usuario';
import {FlorfrescaService} from '../../../services/florfresca.service';
import {Subscripcion} from '../../../models/suscripcion';
import { Message } from '../../../models/message';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
	usuario : Usuario;
  show:boolean;
  messages:Message;
  subscriptions:Array<Subscripcion>;
  constructor(
  	private service: FlorfrescaService
  	) {
    this.show = false;
    this.messages = new Message();
  	this.usuario = new Usuario();
    this.subscriptions = new Array(0);
  }

  ngOnInit() {
  	this.service.user(localStorage.getItem('id')).subscribe(u=>{
      
  		this.usuario = u;
  	},e=>{
  		console.log(e);
  	});

    this.service.userSubs(localStorage.getItem('id')).subscribe(u=>{
    console.warn(u);
      this.subscriptions = u;
    },e=>{
      this.messages.message = 'Lo sentimos, No se pudo conectar con la base de datos, Contactar a soporte';
      this.messages.class = "bg-danger";
      this.messages.status = true;
    });

  }
  editar(){
    this.show = true;
  }
  enviar(){
    this.service.userEdit(this.usuario).subscribe(u=>{
      this.messages.message = "Se ha actualizado el usuario con éxito";
      this.messages.class = "bg-success";
      this.messages.status = true;
      this.show = false;
    },e=>{
      let er:any = e
      this.messages.message = (er.error.message)?er.error.message:"Lo sentimos ocurrió un error, no se pudo conectar con el servidor";
      this.messages.class = "bg-danger";
      this.messages.status = true;
    });
  }
  cancelar(){
    this.show = false;
  }

}
