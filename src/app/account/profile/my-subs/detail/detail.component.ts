import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Subscripcion} from '../../../../models/suscripcion';
import {FlorfrescaService} from '../../../../services/florfresca.service';
import {ApiPayuService} from '../../../../services/api-payu.service';
import { Message } from '../../../../models/message';
import { CreditCards } from '../../../../models/creditcards';
//import { ConsoleReporter } from 'jasmine';

declare var $: any;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
	subscription:Subscripcion;
  eliminar:string;
  messages:Message;
  load:boolean;
  card:CreditCards;
  show:boolean;
  parentesco :Array<string>;
  cat:Array<string>;

  constructor(
  	 private route: ActivatedRoute,
  	private service: FlorfrescaService,
    private apiPayuService: ApiPayuService
  	) {
  	this.subscription = new Subscripcion();
    this.load = false;
    this.messages = new Message();
    this.card = new CreditCards();
    this.show = false;
    this.parentesco = ["Seleccione","Para mi","Primo", "Prima", "Cliente", "Amiga" , "Amigo", "Novio", "Novia", "Abuela", "Abuelo", "Mamá", "Papá", "Hermana", "Hermano", "Hijo", "Hija", "Tío", "Tía", "Esposa", "Esposo"];
    this.cat = ["Seleccione","Casa", "Oficina", "Otro"];
  }

  ngOnInit() {
  	this.service.subs(localStorage.getItem('id')).subscribe(u=>{
      console.log(u)
  		this.subscription = u;
      this.apiPayuService.card(this.subscription.creditCardToken).subscribe(t=>{
        this.card = t;
      },e=>{
        this.messages.message = 'Lo sentimos, No se pudo cargar los datos de la tarjeta, Contactar a soporte';
        this.messages.class = "bg-warning";
        this.messages.status = true;
      })
  	},e=>{
      this.messages.message = 'Lo sentimos, No se pudo conectar con la base de datos, Contactar a soporte';
      this.messages.class = "bg-danger";
      this.messages.status = true;
  	});
  }
  editShow(){
    this.show = true;
  }
  cancelar(){
    $('#myModal').modal('show')
  }
  edit(){
    this.service.subsEditSusc(this.subscription).subscribe(s=>{
      this.show = false;
      this.messages.message = 'Se ha actualizado el suscriptor con éxito';
      this.messages.class = "bg-success";
      this.messages.status = true;
    },e=>{
      this.messages.message = 'Lo sentimos, No se pudo Editar los datos, contactar a soporte';
      this.messages.class = "bg-danger";
      this.messages.status = true;
    });
  }
  confirm(id:string){
    this.load = true;
    this.service.subsEdit(id).subscribe(s=>{
      $('#myModal').modal('hide')
      this.cancelarApi(this.subscription.payuId);
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
