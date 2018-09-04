import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Suscriptor } from '../../models/suscriptor';
import { Suscripcion } from '../../models/suscripcion';
import { Plan } from '../../models/plan';
import { Tamano } from '../../models/tamano';
import { Frecuencia } from '../../models/frecuencia';

declare var $: any;

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

  select_plan: Plan;
  select_tamano:Tamano;
  select_frecuencia:Frecuencia;

  fecha_entrega:String;
  acept_term:Boolean;
  acept_entrega:Boolean;
  alert:String;

  constructor(
  	private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
    ) { 
    this.submitted = false;
  	this.suscriptor = new Suscriptor();
  	this.parentesco = ["Primo", "Prima", "Cliente", "Amiga" , "Amigo", "Novio", "Novia", "Abuela", "Abuelo", "Mamá", "Papá", "Hermana", "Hermano", "Hijo", "Hija", "Tío", "Tía", "Esposa", "Esposo"];
  	this.cat = ["Casa", "Oficina", "Otro"];
  	this.showForm=true;
  	this.plans = [
  	{_id: "1", numero:1, precio: 1000, nombre:"FRESCAS DE CULTIVO", desc: "La más cuidadosa selección de tallos de rosas frescas de nuestro cultivo", img:"assets/imgs/item-frescas.jpg"},
  	{_id: "2", numero:2, precio: 1000, nombre:"ROSAS", desc: "La más cuidadosa selección de tallos de rosas frescas de nuestro cultivo", img:"assets/imgs/item-rosas.jpg"},
  	{_id: "3", numero:3, precio: 1000, nombre:"CLÁSICAS", desc: "La más cuidadosa selección de tallos de rosas frescas de nuestro cultivo", img:"assets/imgs/item-clasica.jpg"},
  	{_id: "4", numero:4, precio: 1000, nombre:"EXÓTICAS", desc: "La más cuidadosa selección de tallos de rosas frescas de nuestro cultivo", img:"assets/imgs/item-exoticas.jpg"}
  	];

  	this.tamanos = [
  	{_id: "1",  nombre:"ORIGINAL", desc: "<strong>10 a 15 tallos</strong>  cuidadosamente seleccionados", icon:"assets/imgs/plans/size-original.png"},
  	{_id: "2",  nombre:"DELUXE", desc: "<strong>18 a 14 tallos</strong>  cuidadosamente seleccionados", icon:"assets/imgs/plans/size-delux.png"},
  	{_id: "3",  nombre:"GRANDE", desc: "<strong>36 a 48 tallos</strong>  cuidadosamente seleccionados", icon:"assets/imgs/plans/size-original.png"}
  	];

  	this.frecuencia = [
  	{_id: "1", precio:1000,nombre:"SEMANAL", desc: "<strong>12 a 15 tallos</strong>  cuidadosamente seleccionados", icon:"assets/imgs/icons/icon-flores.png"},
  	{_id: "2", precio:1000,nombre:"QUINCENAL", desc: "<strong>De 12 a 15 tallos</strong> cuidadosamente seleccionados", icon:"assets/imgs/icons/icon-flores.png"},
  	{_id: "3", precio:1000,nombre:"MENSUAL", desc: "<strong>De 12 a 15 tallos</strong> cuidadosamente seleccionados", icon:"assets/imgs/icons/icon-flores.png"}
  	];
    this.select_plan = new Plan();
    this.select_tamano = new Tamano();
    this.select_frecuencia = new Frecuencia();
    this.acept_term = false;
    this.acept_entrega = false;
    this.alert = "";
    // console.log(localStorage.getItem('plan'),
    // localStorage.getItem('tamano'),
    // localStorage.getItem('frecuencia'));
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
            nombre: ['', Validators.required],
            rela_paren: ['', Validators.required],
            catego: ['', [Validators.required]],
            direccion: [ [''], [Validators.required, Validators.minLength(6)]],
            ciudad: ['', Validators.required],
            tel: ['', Validators.required],
            gatos:[]
        });
    $( ".datepicker" ).datepicker({daysOfWeekDisabled: "0,1,3,5,6"});
    if(localStorage.getItem('suscriptor')){
      this.showForm = false;
    }
    this.select_plan = (localStorage.getItem('plan')) ? JSON.parse(localStorage.getItem('plan')) : new Plan();
    this.select_tamano = (localStorage.getItem('tamano')) ? JSON.parse(localStorage.getItem('tamano')) : new Tamano();
     this.select_frecuencia = (localStorage.getItem('frecuencia')) ? JSON.parse(localStorage.getItem('frecuencia')) : new Frecuencia();
  }
  
  addSuscriptor(){
    this.submitted = true;
    if(!this.registerForm.invalid){
      localStorage.setItem('suscriptor', JSON.stringify(this.suscriptor));
      this.showForm = false;
    }else{
      console.log('error')
    }
  }
  addPlan(plan:Plan){
  	this.select_plan = plan;
  }
  addTamano(tamano:Tamano){
  	this.select_tamano = tamano;
  }
  addTipo(frecuencia:Frecuencia){
  	this.select_frecuencia = frecuencia;
  }

  goToSummary(){
    if(!this.acept_entrega && !this.acept_term){
      this.alert = "Debe Aceptar los terminos y condiciones y/o entrega de la suscripción";
    }else{
      console.log($("#fecha_entrega").val());
      if($("#fecha_entrega").val() != ''){
        if(!this.showForm && this.select_frecuencia._id != undefined && this.select_tamano._id != undefined && this.select_plan._id != undefined){
          this.alert = "";
          localStorage.setItem('tamano', JSON.stringify(this.select_tamano));
          localStorage.setItem('plan', JSON.stringify(this.select_plan));
          localStorage.setItem('frecuencia', JSON.stringify(this.select_frecuencia));

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
