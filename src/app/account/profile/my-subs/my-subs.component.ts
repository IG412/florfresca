import { Component, OnInit } from '@angular/core';
import {Subscripcion} from '../../../models/suscripcion';
import {FlorfrescaService} from '../../../services/florfresca.service';
import {ApiPayuService} from '../../../services/api-payu.service';
import { Message } from '../../../models/message';

declare var $: any;

@Component({
  selector: 'app-my-subs',
  templateUrl: './my-subs.component.html',
  styleUrls: ['./my-subs.component.css']
})
export class MySubsComponent implements OnInit {
	subscriptions:Array<Subscripcion>;
  subs:Subscripcion;
  eliminar:string;
  messages:Message;
  load:boolean;

  constructor(
  	private service: FlorfrescaService,
    private apiPayuService: ApiPayuService
  	) {
    this.load = false;
  	this.subscriptions = new Array(0);
    this.subs = new Subscripcion();
    this.messages = new Message();
  }

  ngOnInit() {
  	this.service.userSubs(localStorage.getItem('id')).subscribe(u=>{
      console.log(u)
  		this.subscriptions = u;
  	},e=>{
      this.messages.message = 'Lo sentimos, No se pudo conectar con la base de datos, Contactar a soporte';
      this.messages.class = "bg-danger";
      this.messages.status = true;
  	});
  }
  addEliminar(id:string){
    this.eliminar = id;
  }
  cancelar(){
    this.load = true;
    this.service.subsEdit(this.eliminar).subscribe(s=>{
      this.subs= s;
      $('#myModal').modal('hide')
      this.cancelarApi(this.subs.payuId);
    },e=>{
      let er:any = e
      console.log(e);
      $('#myModal').modal('hide')
      this.messages.message = er.message;
      this.messages.class = "bg-danger";
      this.messages.status = true;
      this.load = false;
    });
    
  }

  cancelarApi(id:string){
    this.apiPayuService.delSubscription(id).subscribe(u=>{
      this.messages = u;
      this.messages.class = "bg-success";
      this.messages.status = true;
      this.load = false;
    },e=>{
      let er:any = e
      console.log(e);
      this.messages.message = er.error.message;
      this.messages.class = "bg-danger";
      this.messages.status = true;
      this.load = false;
    });
  }

}
