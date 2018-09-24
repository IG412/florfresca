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
  select_tamano:string;
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
    this.plans = new Array(4);
    this.plans[0] = new Plan();
    this.message = new Message();
    this.submitted = false;
  	this.suscriptor = new Suscriptor();
  	this.parentesco = ["Seleccione","Primo", "Prima", "Cliente", "Amiga" , "Amigo", "Novio", "Novia", "Abuela", "Abuelo", "Mamá", "Papá", "Hermana", "Hermano", "Hijo", "Hija", "Tío", "Tía", "Esposa", "Esposo"];
  	this.cat = ["Seleccione","Casa", "Oficina", "Otro"];
  	this.showForm=true;
    this.subscription = new Subscripcion();

  	this.tamanos = [
  	{_id: "1",  precio:1000, nombre:"ORIGINAL", desc: "<strong>10 a 15 tallos</strong>  cuidadosamente seleccionados", icon:"assets/imgs/plans/size-original.png"},
  	{_id: "2", precio:1000,  nombre:"DELUXE", desc: "<strong>18 a 14 tallos</strong>  cuidadosamente seleccionados", icon:"assets/imgs/plans/size-delux.png"},
  	{_id: "3",  precio:1000, nombre:"GRANDE", desc: "<strong>36 a 48 tallos</strong>  cuidadosamente seleccionados", icon:"assets/imgs/plans/size-original.png"}
  	];

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
      console.log(d)
      this.plans = d;
    },e=>{
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
    if(localStorage.getItem('subscription')){
      this.showForm = false;
    }
    // this.select_plan = (localStorage.getItem('plan')) ? JSON.parse(localStorage.getItem('plan')) : new Plan();
    // this.select_tamano = (localStorage.getItem('tamano')) ? JSON.parse(localStorage.getItem('tamano')) : new Tamano();
    // this.select_frecuencia = (localStorage.getItem('frecuencia')) ? JSON.parse(localStorage.getItem('frecuencia')) : new Frecuencia();
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
    this.subscription.plan = {nombre:plan.nombre,img:plan.img}
    this.select_plan = plan._id;
  }
  addTamano(tamano:Tamano){
    this.subscription.plan.tamano = tamano.nombre;
  	this.select_tamano = tamano._id;
  }
  addTipo(frecuencia:Frecuencia){
    this.subscription.plan.frecuencia = frecuencia.nombre;
  	this.select_frecuencia = frecuencia._id;
  }

  goToSummary(){
    if(!this.acept_entrega && !this.acept_term){
      this.alert = "Debe Aceptar los terminos y condiciones y/o entrega de la suscripción";
    }else{
      console.log($("#fecha_entrega").val());
      if($("#fecha_entrega").val() != ''){
        if(!this.showForm && this.select_frecuencia != undefined && this.select_tamano != undefined && this.select_plan != undefined){
          this.alert = "";
          localStorage.setItem('subscription', JSON.stringify(this.subscription));
          this.router.navigate(['subscription/summary']);
        }else{
          this.alert = "Debe completar todos los datos";
        }
      }else{
        this.alert = "Debe Ingresar el día que desea la entrega";
      } 
    }
  }
}
