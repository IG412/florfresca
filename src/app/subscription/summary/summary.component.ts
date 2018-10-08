import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Suscriptor } from '../../models/suscriptor';
import { Subscripcion } from '../../models/suscripcion';
import { Plan } from '../../models/plan';
import { Size } from '../../models/size';
import { Period } from '../../models/period';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  subscripcion: Subscripcion;
  plan: Plan;
  tamano: Size;
  frecuencia: Period;

  show: boolean;
  textoBoton: string;
  showDir: boolean;

  parentesco: Array<string>;
  cat: Array<any>;
  precio:Number;

  constructor( private route: ActivatedRoute, private router: Router) {
    this.subscripcion = new Subscripcion();
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
    if(localStorage.getItem('subscription')) {
      this.subscripcion = JSON.parse(localStorage.getItem('subscription'));
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

  isLogin():boolean{
    return (localStorage.getItem('id'))? true:false;
  }

}
