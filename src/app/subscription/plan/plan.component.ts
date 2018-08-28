import { Component, OnInit } from '@angular/core';


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
  constructor() { 
  	this.suscriptor = {nombre:'',ryp:'',cdir:'',dir:'',ciudad:'',tel:'' }
  	this.parentesco = ["Primo", "Prima", "Cliente", "Amiga" , "Amigo", "Novio", "Novia", "Abuela", "Abuelo", "Mamá", "Papá", "Hermana", "Hermano", "Hijo", "Hija", "Tío", "Tía", "Esposa", "Esposo"];
  	this.cat = ["Casa", "Oficina", "Otro"];
  	this.showForm=true;
  }

  ngOnInit() {
  }

  addSuscriptor(){
  	this.showForm = false;
  }
}
