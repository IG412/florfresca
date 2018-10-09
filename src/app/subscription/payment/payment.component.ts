import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlorfrescaService } from '../../services/florfresca.service';
import { ApiPayuService } from '../../services/api-payu.service';

import { Usuario } from '../../models/usuario';
import { Subscripcion } from '../../models/suscripcion';
import { Plan } from '../../models/plan';
import { PlanT } from '../../models/planT';
import { Customer } from '../../models/customer';
import { CreditCards } from '../../models/creditcards';
import { Address } from '../../models/address';
import { Transaction } from './../../models/transaction';
import { Alert } from '../../models/alert';

declare var $: any;
declare interface Month { name:string; number:number; };
// declare interface Alert{message: String;status: Boolean;code?: String;class?: String;}
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  loading:boolean;
  load:boolean;
  submitted:boolean;
  subscripcion: Subscripcion;
  tipoDoc: Array<any>;
  custumer:Customer;
  card: CreditCards;
  usuario: Usuario;
  address:Address;
  emailConfirmacion: string;
  tarjetas: Array<any>;
  mensajeError: string;
  transaction: Transaction;
  months: Array<Month>;
  years: Array<number>;
  planT:PlanT;
  month:string;
  year:string;
  cuotas:Array<number>;
  alert:Alert;
  pay:boolean

  constructor(
    private service: FlorfrescaService,
    private Api: ApiPayuService,
    private route: ActivatedRoute, 
    private router: Router
  ) {
    this.load = false;
    this.pay = false;
    this.submitted = false;
    this.subscripcion = new Subscripcion();
    this.custumer = new Customer();
    this.usuario = new Usuario();
    this.card = new CreditCards();
    this.planT = new PlanT();
    this.getMonths();
    this.getYear();
    this.getCuotas();
    this.getTipoDoc();
    this.getTarjetas();
    this.emailConfirmacion = '';
    this.mensajeError = '';
    this.transaction = new Transaction();
    this.month = "-Mes-";
    this.year = "-Año-";
    this.address = new Address();
    this.loading = false;
    this.alert = {status :false , message:'', class:''};
  }
  ngOnInit() {
    if (localStorage.getItem('subscription')) {
      this.subscripcion = JSON.parse(localStorage.getItem('subscription'));
      if(localStorage.getItem('id')){
        this.service.user(localStorage.getItem('id')).subscribe(d=>{
          this.usuario = d;
          this.drop();
        },e=>{
          console.log(e);
        });
      }else{
        this.router.navigateByUrl("login?from=payment")
      }
    } else {
      this.router.navigate(['subscription/plan'], {});
    }
  }

  goToSummary(valid:boolean) {
    this.submitted = true;
    if (valid && this.validar()) {
      this.mensajeError = '';
      if(this.validarNumber(this.usuario.telefono) && 
        this.validarNumber(this.usuario.celular) &&
        this.validarNumber(this.usuario.documento) &&
        this.validarNumber(this.card.number)
        ){
        if(this.card.type){
          this.alert = {status :false , message:'', class:''};
          this.sendPayment();
        }else{
          this.alert = {status :true , message:'Debe seleccionar el tipo de tarjeta de crédito', class:'alert alert-warning'};
        }
      }else{
        this.alert = {status :true , message:'Algunos datos no son válidos', class:'alert alert-warning'};
      }
    } else {
      this.alert = {status :true , message:'Debe completar todos los datos', class:'alert alert-warning'};
    }
  }
  
  addCard(tarjeta:string) {
    this.card.type = tarjeta;
  }
  getYear():void{
    this.years = new Array();
    let date = new Date();
    for(let i= date.getFullYear(); i < (date.getFullYear()+10) ; i++ ){
      this.years.push(i);
    }
  }
  getCuotas(){
    this.cuotas = new Array();
    for (var i = 1; i <= 12; ++i) {
      this.cuotas.push(i);
    }
  }
  getTarjetas(){
    this.tarjetas = [
      { _id: 1, nombre: 'VISA' },
      { _id: 2, nombre: 'MASTERCARD' },
      { _id: 3, nombre: 'AMEX' },
      { _id: 4, nombre: 'DINERS' }
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
  setMonth(m:string){
        this.month = m;
  }
  setYear(y:string){
       this.year = y;
  }
  setTipo(arg:string){
    this.usuario.tipo_doc = arg;
  }
  setCuotas(c:number){
     this.transaction.installments = c;
  }
  drop(){
    $('.drop').on( "click", function() {
      if($(this).find('.drop-list').hasClass('act')){
        $(this).find('.drop-list').removeClass('act');
        $(this).find('span').slideUp(300);
      }else{
        $('.drop span').slideUp(300);
        $('.drop .act').removeClass('act');
        $(this).find('.drop-list').addClass('act');
        $(this).find('span').slideDown(300);
      }
      $('.drop span a').on( "click", function() {
          $(this).parent().parent().find('b').text($(this).text());
          $('.drop').find('span').slideUp(300);
      });
      return false;
    });
  }

  validar():boolean{
    let cuotas:boolean=(this.transaction.installments == undefined)?false:true;
    let tipo:boolean = (this.usuario.tipo_doc == undefined)?false:true;
    let mes:boolean = (this.month == '-Mes-')?false:true;
    let año:boolean = (this.year == '-Año-')?false:true;
    return (cuotas && tipo && mes && año)
  }
  validarNumber(numero):boolean {
    return !isNaN(numero) && numero !== '';
  }
  sendPayment(){
    this.loading = true;
    this.loadAddres();
    this.loadCard();
    this.usuario.tarjeta.push(this.card);
    this.loadUser();
    this.loadPlanT();
    this.transaction.plan = this.planT;
    this.transaction.deliveryAddress = this.address;
    this.transaction.customer = this.custumer;
    this.subscripcion.cliente = this.usuario;
    this.load = true;
    this.Api.susbcriptions(this.transaction).subscribe(d=>{
      let t:any = d 
      this.load = false;
      this.alert = {status :false , message:'La transacción se ha realizado con exito', class:'alert alert-success'};
      this.subscripcion.payuId = t.id;
      this.subscripcion.plan.payuId = (this.subscripcion.plan.payuId == null)? t.plan.id: this.subscripcion.plan.payuId;
      this.subscripcion.cliente.payuId = (this.subscripcion.cliente.payuId == null)? t.customer.id :this.subscripcion.cliente.payuId;
      this.service.susbcriptions(this.subscripcion).subscribe(d=>{
        this.load = false;
        this.pay = true;
        this.alert = {status :false , message:'La transacción se ha realizado con exito', class:'alert alert-success'};
      },e=>{
        console.log(e);
        this.load = false;
        this.alert = {status :true , message:e, class:'alert alert-warning'};
      });
    },e=>{
      let er:any = e
      this.load = false;
      console.log(er);
      this.alert = {status :true , message:er.error, class:'alert alert-danger'};
    });
  }

  loadUser(){
    if(this.usuario.payuId == null){
      this.custumer.fullName = this.usuario.nombre+' '+this.usuario.apellido;
      this.custumer.email = this.usuario.correo;
    }else{
      this.custumer.id = this.usuario.payuId;
    }
    this.custumer.creditCards = [this.card];
  }
  loadAddres(){
    this.address.line1 = this.usuario.dir;
    this.address.line2 = "";
    this.address.line3 = "";
    this.address.phone = this.usuario.celular;
  }
  loadCard(){
    this.card.expMonth = parseInt(this.month);
    this.card.expYear = parseInt(this.year);
    this.card.document = this.usuario.documento;
    this.card.address = this.address;
  }
  loadPlanT(){
    this.planT.planCode = this.subscripcion.plan._id;
    if(this.subscripcion.plan.payuId == null){
      this.planT.description = this.subscripcion.plan.flor+"-"+this.subscripcion.plan.tamano+"-"+this.subscripcion.plan.periodo ;
      this.planT.additionalValues = [
        {name:"PLAN_VALUE",value:this.subscripcion.plan.precio,currency:"COP"},
        {name:"PLAN_TAX_RETURN_BASE",value:0,currency:"COP"},
        {name:"PLAN_TAX",value:0,currency:"COP"}
      ]
    }
  }

  // addTokenCard(){
  //   this.subscripcion.cliente.tarjeta.length
  // }
}
