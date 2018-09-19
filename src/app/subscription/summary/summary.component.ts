import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Suscriptor } from '../../models/suscriptor';
import { Subscripcion } from '../../models/suscripcion';
import { Plan } from '../../models/plan';
import { Tamano } from '../../models/tamano';
import { Frecuencia } from '../../models/frecuencia';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  suscriptor: Suscriptor;
  plan: Plan;
  tamano: Tamano;
  frecuencia: Frecuencia;

  show: boolean;
  textoBoton: string;
  showDir: boolean;

  parentesco: Array<string>;
  cat: Array<any>;
  precio:Number;

  constructor( private route: ActivatedRoute, private router: Router) {
    this.suscriptor = new Suscriptor();
    this.plan = new Plan();
    this.tamano = new Tamano();
    this.frecuencia = new Frecuencia();

    this.textoBoton = 'Editar';
    this.show = false;
    this.parentesco = ['Primo', 'Prima',
    'Cliente', 'Amiga' , 'Amigo', 'Novio',
    'Novia', 'Abuela', 'Abuelo', 'Mamá', 'Papá',
    'Hermana', 'Hermano', 'Hijo', 'Hija', 'Tío', 'Tía',
    'Esposa', 'Esposo'];
    this.cat = ['Casa', 'Oficina', 'Otro'];
    this.showDir = false;
    this.precio = 0;
  }

  ngOnInit() {

    if(localStorage.getItem('suscriptor') &&
    localStorage.getItem('plan') &&
    localStorage.getItem('tamano') &&
    localStorage.getItem('frecuencia')) {
      this.suscriptor = JSON.parse(localStorage.getItem('suscriptor'));
      this.plan = JSON.parse(localStorage.getItem('plan'));
      this.tamano = JSON.parse(localStorage.getItem('tamano'));
      this.frecuencia = JSON.parse(localStorage.getItem('frecuencia'));
      this.getPrice();
      console.log(this.suscriptor);
    }else{
      this.router.navigate(['subscription/plan'], {});
    }
  }

  editSuscriptor() {
    this.show = !this.show;
    if ( this.textoBoton === 'Editar') {
      this.textoBoton = 'Guardar';
    } else {
      this.textoBoton = 'Editar';
    }

  }

  showDireccion() {
    this.showDir = !this.showDir;
  }

  getPrice(){
    switch(this.plan._id) { 
      case "1": { 
        switch (this.tamano.nombre) {
          case "ORIGINAL":
            this.precio =+ (this.frecuencia.nombre === "SEMANAL")? (30000*4) : this.precio;
            this.precio =+ (this.frecuencia.nombre === "QUINCENAL")? (30000*2) : this.precio;
            this.precio =+ (this.frecuencia.nombre === "MENSUAL")? (30000*1) : this.precio;
            console.log(this.frecuencia.nombre,this.precio);
            break;
          case "DELUXE":
            this.precio = (this.frecuencia.nombre == 'SEMANAL')? (40000*4) : this.precio;
            this.precio = (this.frecuencia.nombre == 'QUINCENAL')? (40000*2) : this.precio;
            this.precio = (this.frecuencia.nombre == 'MENSUAL')? (40000*1) : this.precio;
            break;
          case "GRANDE":
            this.precio = (this.frecuencia.nombre == 'SEMANAL')? (50000*4) : this.precio;
            this.precio = (this.frecuencia.nombre == 'QUINCENAL')? (50000*2) : this.precio;
            this.precio = (this.frecuencia.nombre == 'MENSUAL')? (50000*1) : this.precio;
            break;
          default:
            break;
        }
        break; 
      } 
      case "2": { 
        switch (this.tamano.nombre) {
          case "ORIGINAL":
            this.precio = (this.frecuencia.nombre == 'SEMANAL')? (40000*4) : this.precio;
            this.precio = (this.frecuencia.nombre == 'QUINCENAL')? (40000*2) : this.precio;
            this.precio = (this.frecuencia.nombre == 'MENSUAL')? (40000*1) : this.precio;
            break;
          case "DELUXE":
            this.precio = (this.frecuencia.nombre == 'SEMANAL')? (50000*4) : this.precio;
            this.precio = (this.frecuencia.nombre == 'QUINCENAL')? (50000*2) : this.precio;
            this.precio = (this.frecuencia.nombre == 'MENSUAL')? (50000*1) : this.precio;
            break;
          case "GRANDE":
            this.precio = (this.frecuencia.nombre == 'SEMANAL')? (60000*4) : this.precio;
            this.precio = (this.frecuencia.nombre == 'QUINCENAL')? (60000*2) : this.precio;
            this.precio = (this.frecuencia.nombre == 'MENSUAL')? (60000*1) : this.precio;
            break;
          default:
            break;
        }
        break; 
      } 
      case "3": { 
        switch (this.tamano.nombre) {
          case "ORIGINAL":
            this.precio = (this.frecuencia.nombre == 'SEMANAL')? (35000*4) : this.precio;
            this.precio = (this.frecuencia.nombre == 'QUINCENAL')? (35000*2) : this.precio;
            this.precio = (this.frecuencia.nombre == 'MENSUAL')? (35000*1) : this.precio;
            break;
          case "DELUXE":
            this.precio = (this.frecuencia.nombre == 'SEMANAL')? (45000*4) : this.precio;
            this.precio = (this.frecuencia.nombre == 'QUINCENAL')? (45000*2) : this.precio;
            this.precio = (this.frecuencia.nombre == 'MENSUAL')? (45000*1) : this.precio;
            break;
          case "GRANDE":
            this.precio = (this.frecuencia.nombre == 'SEMANAL')? (55000*4) : this.precio;
            this.precio = (this.frecuencia.nombre == 'QUINCENAL')? (55000*2) : this.precio;
            this.precio = (this.frecuencia.nombre == 'MENSUAL')? (55000*1) : this.precio;
            break;
          default:
            break;
        }
        break; 
      } 
      case "4": { 
        switch (this.tamano.nombre) {
          case "ORIGINAL":
            this.precio = (this.frecuencia.nombre == 'SEMANAL')? (80000*4) : this.precio;
            this.precio = (this.frecuencia.nombre == 'QUINCENAL')? (80000*2) : this.precio;
            this.precio = (this.frecuencia.nombre == 'MENSUAL')? (80000*1) : this.precio;
            break;
          case "DELUXE":
            this.precio = (this.frecuencia.nombre == 'SEMANAL')? (140000*4) : this.precio;
            this.precio = (this.frecuencia.nombre == 'QUINCENAL')? (140000*2) : this.precio;
            this.precio = (this.frecuencia.nombre == 'MENSUAL')? (140000*1) : this.precio;
            break;
          case "GRANDE":
            this.precio = (this.frecuencia.nombre == 'SEMANAL')? (180000*4) : this.precio;
            this.precio = (this.frecuencia.nombre == 'QUINCENAL')? (180000*2) : this.precio;
            this.precio = (this.frecuencia.nombre == 'MENSUAL')? (180000*1) : this.precio;
            break;
          default:
            break;
        }
        break; 
      } 
      default: { 
        this.precio=0; 
        break; 
      } 
    } 


  }

}
