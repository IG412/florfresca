import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlorfrescaService } from '../../services/florfresca.service';

import { Usuario } from '../../models/usuario';
import { Subscripcion } from '../../models/suscripcion';
import { Plan } from '../../models/plan';
import { Customer } from '../../models/customer';
import { CreditCards } from '../../models/creditcards';

import { Transaction } from './../../models/transaction';

declare interface Month { name:string; number:number; };

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  subscripcion: Subscripcion;
  tipoDoc: Array<any>;
  custumer:Customer;
  card: CreditCards;
  usuario: Usuario;
  emailConfirmacion: string;
  tarjetas: Array<any>;
  mensajeError: string;
  transaction: Transaction;
  months: Array<Month>;
  year: Array<number>;

  constructor(
    private service: FlorfrescaService,
    private route: ActivatedRoute, 
    private router: Router
  ) {
    this.subscripcion = new Subscripcion();
    this.custumer = new Customer();
    this.usuario = new Usuario();
    this.card = new CreditCards();
    this.getMonths();
    this.getYear();
    this.getTipoDoc();
    this.getTarjetas();
    this.emailConfirmacion = '';
    this.mensajeError = '';
    this.transaction = new Transaction();
    // this.transaction.order['buyer'].fullName = 'prueba de nombre';
    // this.transaction.order.buyer.fullName='fa';
    // console.log('Datos Transaction', this.transaction.order['buyer'].buyer.fullName);

  }

  ngOnInit() {
    if (localStorage.getItem('subscription')) {
      this.subscripcion = JSON.parse(localStorage.getItem('subscription'));
      console.log(this.subscripcion);
      if(localStorage.getItem('id')){
        this.service.user(localStorage.getItem('id')).subscribe(d=>{
          this.usuario = d;
        },e=>{
          console.log(e);
        });
      }else{
        this.router.navigateByUrl("subscription/plan?from=payment")
      }
    } else {
      this.router.navigate(['subscription/plan'], {});
    }
  }

  // goToSummary() {
  //   if (true) {
  //     this.mensajeError = '';
  //     // {nombre:'',ryp:'',cdir:'',dir:'',ciudad:'',tel:'' }
  //     // this.router.navigate(['----'], {
  //     //   queryParams: {
  //     //     nombre: this.datosPago['nombre'],
  //     //     apellidos: this.datosPago['apellidos'],
  //     //     email: this.datosPago['email'],
  //     //     telefono: this.datosPago['telefono'],
  //     //     celular: this.datosPago['celular'],
  //     //     tipoDocumento: this.datosPago['tipoDocumento'],
  //     //     numeroDocumento: this.datosPago['numeroDocumento'],
  //     //     tarjeta: tarjetas._id =this.datosPago['tarjetaId']
  //     //   }
  //     // });
  //     // this.transaction.order.buyer.fullName = this.datosPago.nombre + ' ' + this.datosPago.apellidos;
  //     // this.llenarJsonTransaction();
  //   } else {
  //     this.mensajeError = 'Debe completar todos los datos';
  //   }
  // }

  validarString(texto: string) {
    console.log(texto);
    console.log(texto !== '');
    return texto !== '';

  }
  validarNumber(numero) {
    console.log(!isNaN(numero) && numero !== '');
    // console.log(numero !== '' + ' {{{{{{ ¿ ' + Number.isNaN(numero) );
    // return numero !== '' && isNaN(numero);
    return !isNaN(numero) && numero !== '';
  }
  validarEmail(email1: string, email2: string) {
    // console.log(email1 + '¿----¿  ' + email2);
    console.log('igualdad de emails: ');
    if (this.validarString(email1) && this.validarString(email2)) {
      console.log('email no vacios');
      return email1 === email2;
    }
    return false;
  }
  addCard(nombreTarjeta: string) {
    // this.datosPago['tarjeta'] = nombreTarjeta;
    // console.log(nombreTarjeta);
    // console.log(this.tarjetas[0].nombre);
    // console.log(this.datosPago.tarjeta);
    // console.log(this.tarjetas[0].nombre == this.datosPago.tarjeta);
  }
  private getPrice(val: String, price:any):Number{
    let valor:Number = 0;
    switch (val) {
      case "SEMANAL":
        valor= price*4;
        break;
      case "QUINCENAL":
        valor= price*2;
        break;
      case "MENSUAL":
        valor= price*1;
        break;
      default:
        valor= price;
        break;
    }
    return valor;
  }
  getYear():void{
    this.year = new Array();
    let date = new Date();
    for(let i= date.getFullYear(); i < (date.getFullYear()+10) ; i++ ){
      this.year.push(i);
    }
  }
  getTarjetas(){
    this.tarjetas = [
      { _id: 1, nombre: 'Visa' },
      { _id: 2, nombre: 'Mastercard' },
      { _id: 3, nombre: 'Amex' },
      { _id: 4, nombre: 'Diners' }
    ];
  }
  getTipoDoc(){
    this.tipoDoc = [
    {iso:"CC", desc:"Cédula de ciudadanía"},
    {iso:"CE", desc:"Cédula de extranjería"},
    {iso:"NIT", desc:"Número de Identificación Tributario."},
    {iso:"TI", desc:"Cédula de ciudadanía"},
    {iso:"PP", desc:"Pasaporte"},
    {iso:"RC", desc:"Registro civil de nacimiento"},
    {iso:"DE", desc:"Documento de identificación extranjero"}
    ];
  }
  getMonths():void{
    this.months = [
    {name:"Ene",number:1},
    {name:"Feb",number:2},
    {name:"Mar",number:3},
    {name:"Abr",number:4},
    {name:"May",number:5},
    {name:"Jun",number:6},
    {name:"Jul",number:7},
    {name:"ago",number:8},
    {name:"sep",number:9},
    {name:"oct",number:10},
    {name:"nov",number:11},
    {name:"dic",number:12}];
  }
}
