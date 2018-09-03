import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Suscriptor } from '../../models/suscriptor';
import { Suscripcion } from '../../models/suscripcion';
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
  newDireccion: string;
  showDir: boolean;

  parentesco: Array<string>;
  cat: Array<any>;

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
    this.newDireccion = '';
    this.showDir = false;
  }

  ngOnInit() {

    if(localStorage.getItem('suscriptor') && localStorage.getItem('plan') && localStorage.getItem('tamano') && localStorage.getItem('frecuencia')){
      this.suscriptor = JSON.parse(localStorage.getItem('suscriptor'));
      this.plan = JSON.parse(localStorage.getItem('plan'));
      this.tamano = JSON.parse(localStorage.getItem('tamano'));
      this.frecuencia = JSON.parse(localStorage.getItem('frecuencia'));
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

  addDireccion() {
    /*console.log(this.suscriptor.dir);
    if ( this.newDireccion !== '') {
      console.log(this.suscriptor.dir.push(this.newDireccion));
      this.newDireccion = '';
    }
    this.showDireccion();*/
  }

}
