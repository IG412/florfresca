import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FlorfrescaService } from '../../services/florfresca.service';

import { Message } from '../../models/message';
import { Suscriptor } from '../../models/suscriptor';
import { Subscripcion } from '../../models/suscripcion';
import { Plan } from '../../models/plan';
import { Tamano } from '../../models/tamano';
import { Frecuencia } from '../../models/frecuencia';

declare var $: any;
declare class Plans  {
  nombre:String;
  img:String;
  tamano:String;
  frecuencia:String;
  precio?:Number;
}

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  load:boolean;
  submitted:Boolean;
  registerForm: FormGroup;
  parentesco: Array<String>;
  cat:Array<String>;
  suscriptor:Suscriptor;
  showForm:boolean;
  plans: Array<Plan>;
  tamanos:Array<Tamano>;
  frecuencia:Array<Frecuencia>;
  subscription: Subscripcion;
  message: Message;

  select_plan: String;
  select_tamano:String;
  select_frecuencia:String;

  fecha_entrega:String;
  acept_term:Boolean;
  acept_entrega:Boolean;
  alert:String;

  constructor(
  	private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private service: FlorfrescaService
    ) { 
    this.plans = new Array();
    this.message = new Message();
    this.submitted = false;
  	this.suscriptor = new Suscriptor();
  	this.parentesco = ["Seleccione","Primo", "Prima", "Cliente", "Amiga" , "Amigo", "Novio", "Novia", "Abuela", "Abuelo", "Mamá", "Papá", "Hermana", "Hermano", "Hijo", "Hija", "Tío", "Tía", "Esposa", "Esposo"];
  	this.cat = ["Seleccione","Casa", "Oficina", "Otro"];
  	this.showForm=true;
    this.subscription = new Subscripcion();
  	this.tamanos = new Array();
    this.load = false;
  	this.frecuencia = [
  	{_id: "1", nombre:"SEMANAL", desc: "<strong>12 a 15 tallos</strong>  cuidadosamente seleccionados", icon:"assets/imgs/icons/icon-flores.png"},
  	{_id: "2", nombre:"QUINCENAL", desc: "<strong>De 12 a 15 tallos</strong> cuidadosamente seleccionados", icon:"assets/imgs/icons/icon-flores.png"},
  	{_id: "3", nombre:"MENSUAL", desc: "<strong>De 12 a 15 tallos</strong> cuidadosamente seleccionados", icon:"assets/imgs/icons/icon-flores.png"}
  	];
    
    this.acept_term = false;
    this.acept_entrega = false;
    this.alert = "";
  }

  ngOnInit() {
    this.service.plans().subscribe(d=>{
      this.plans = d;
      if(localStorage.getItem('subscription')){
        this.subscription = JSON.parse(localStorage.getItem('subscription'));
        this.suscriptor = (this.subscription.suscriptor)?this.subscription.suscriptor:null;
        this.select_plan = (this.subscription.plan._id)? this.subscription.plan._id : '';
        this.find(this.subscription.plan._id);
        this.select_tamano = (this.subscription.plan.tamano)? this.subscription.plan.tamano : '';
        this.select_frecuencia = (this.subscription.plan.frecuencia)? this.subscription.plan.frecuencia : '';
        this.showForm = false;
        this.load = false;
      }
    },e=>{
      this.load = false;
      this.message = e;
      this.message.status = true;
      this.message.class = "bg-danger";
    });
    this.registerForm = this.formBuilder.group({
            nombre: ['', Validators.required],
            rela_paren: ['', Validators.required],
            catego: ['', [Validators.required]],
            direccion: [ '', [Validators.required, Validators.minLength(6)]],
            ciudad: ['', Validators.required],
            tel: ['', Validators.required],
            gatos:[]
        });
    $( ".datepicker" ).datepicker({daysOfWeekDisabled: "0,1,3,5,6"});
    this.suscriptor.ciudad = "Bogotá";
  }
  
  addSuscriptor(){
    this.submitted = true;
    if(!this.registerForm.invalid){
      this.subscription.suscriptor = this.suscriptor;
      localStorage.setItem('subscription', JSON.stringify(this.subscription));
      this.showForm = false;
    }else{
      console.log('error')
    }
  }
  addPlan(plan:Plan){
    this.subscription.plan = {_id:plan._id,nombre:plan.nombre,img:plan.img}
    this.select_plan = plan._id;
    this.tamanos = plan.tamano;
  }
  addTamano(tamano:Tamano){
    this.subscription.plan.tamano = tamano.nombre;
    this.subscription.plan.precio = tamano.precio;
  	this.select_tamano = tamano.nombre;
  }
  addTipo(frecuencia:Frecuencia){
    this.subscription.plan.frecuencia = frecuencia.nombre;
  	this.select_frecuencia = frecuencia.nombre;
  }

  goToSummary(){
    if(!this.acept_entrega && !this.acept_term){
      this.alert = "Debe Aceptar los terminos y condiciones y/o entrega de la suscripción";
    }else{
      if($("#fecha_entrega").val() != ''){
        if(!this.showForm && this.select_frecuencia != undefined && this.select_tamano != undefined && this.select_plan != undefined){
          this.alert = "";
          localStorage.setItem('subscription', JSON.stringify(this.subscription));
          this.router.navigate(['subscription/summary']);
        }else{
          this.alert = "Debe completar los datos del suscriptor y seleccionar el plan";
        }
      }else{
        this.alert = "Debe Ingresar el día que desea la entrega";
      } 
    }
  }

  getPrice(val: String, price:any):Number{
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

  find(id:String):void{
    this.plans.forEach((value)=>{
      let plan:Plan = value;
      if(plan._id == id){
        this.tamanos = plan.tamano;
      } 
    });
  }
}
