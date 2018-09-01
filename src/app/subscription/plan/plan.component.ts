import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import * as datepicker from "src/assets/js/jquery-ui.min.js";

declare var $: any;


@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  parentesco: Array<String>;
  cat:Array<String>;
  suscriptor:any;
  showForm:boolean;
  plans: Array<any>;
  tamanos:Array<any>;
  tipos:Array<any>;
  susciption:any;
  alert:String;

  constructor(
  	private route: ActivatedRoute,
    private router: Router
    ) { 
  	this.suscriptor = {nombre:'',ryp:'',cdir:'',dir:'',ciudad:'',tel:'' }
  	this.parentesco = ["Primo", "Prima", "Cliente", "Amiga" , "Amigo", "Novio", "Novia", "Abuela", "Abuelo", "Mamá", "Papá", "Hermana", "Hermano", "Hijo", "Hija", "Tío", "Tía", "Esposa", "Esposo"];
  	this.cat = ["Casa", "Oficina", "Otro"];
  	this.showForm=true;
  	this.plans = [
  	{_id: 1, nombre:"FRESCAS DE CULTIVO", desc: "La más cuidadosa selección de tallos de rosas frescas de nuestro cultivo", img:"assets/imgs/item-4.jpg"},
  	{_id: 2, nombre:"ROSAS", desc: "La más cuidadosa selección de tallos de rosas frescas de nuestro cultivo", img:"assets/imgs/item-4.jpg"},
  	{_id: 3, nombre:"CLÁSICAS", desc: "La más cuidadosa selección de tallos de rosas frescas de nuestro cultivo", img:"assets/imgs/item-4.jpg"},
  	{_id: 4, nombre:"EXÓTICAS", desc: "La más cuidadosa selección de tallos de rosas frescas de nuestro cultivo", img:"assets/imgs/item-4.jpg"}
  	];
  	this.tamanos = [
  	{_id: 1, nombre:"ORIGINAL", desc: "<strong>10 a 15 tallos</strong>  cuidadosamente seleccionados", icon:"assets/imgs/plans/size-original.png"},
  	{_id: 2, nombre:"DELUXE", desc: "<strong>18 a 14 tallos</strong>  cuidadosamente seleccionados", icon:"assets/imgs/plans/size-delux.png"},
  	{_id: 3, nombre:"GRANDE", desc: "<strong>36 a 48 tallos</strong>  cuidadosamente seleccionados", icon:"assets/imgs/plans/size-original.png"}
  	];
  	this.tipos = [
  	{_id: 1, nombre:"SEMANAL", desc: "<strong>12 a 15 tallos</strong>  cuidadosamente seleccionados", img:"assets/imgs/icons/icon-flores.png"},
  	{_id: 2, nombre:"QUINCENAL", desc: "<strong>De 12 a 15 tallos</strong> cuidadosamente seleccionados", img:"assets/imgs/icons/icon-flores.png"},
  	{_id: 3, nombre:"MENSUAL", desc: "<strong>De 12 a 15 tallos</strong> cuidadosamente seleccionados", img:"assets/imgs/icons/icon-flores.png"}
  	];
  	this.susciption= {plan:0,tamano:0,tipo:0};
  	this.alert = "";
  }

  ngOnInit() {
    $( ".datepicker" ).datepicker({daysOfWeekDisabled: "0,1,3,5,6"});
  }

  addSuscriptor(){
  	this.showForm = false;
  }
  addPlan(id){
  	this.susciption["plan"] = id;
  }
  addTamano(id){
  	this.susciption["tamano"] = id;
  }
  addTipo(id){
  	this.susciption["tipo"] = id;
  }

  goToSummary(){
  	if(!this.showForm && this.susciption["tipo"] != 0 && this.susciption["plan"] != 0 && this.susciption["tamano"] != 0){
  		this.alert = "";
  		// {nombre:'',ryp:'',cdir:'',dir:'',ciudad:'',tel:'' }
  		this.router.navigate(['subscription/summary'], { queryParams: { 
  			nombre:  this.suscriptor['nombre'],
  			ryp: this.suscriptor['ryp'],
  			cdir: this.suscriptor['cdir'],
  			dir: this.suscriptor['dir'],
  			ciudad: this.suscriptor['ciudad'],
  			tel: this.suscriptor['tel'],
  			plan: this.susciption['plan'],
  			tam: this.suscriptor['tamano'],
  			tipo: this.susciption['tipo']
  			} });
  	}else{
  		this.alert = "Debe completar todos los datos";
  	}
  }
}
