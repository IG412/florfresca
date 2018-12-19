import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Suscriptor } from '../../models/suscriptor';
import { Subscripcion } from '../../models/suscripcion';
import { Plan } from '../../models/plan';
import { Size } from '../../models/size';
import { Period } from '../../models/period';
import { FlorfrescaService } from 'src/app/services/florfresca.service';

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
  id;
  showFormComplete=false;
  constructor( private route: ActivatedRoute, private router: Router, private servFlor: FlorfrescaService) {
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
    this.getDataUser();
    window.scrollTo(0,0);
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


  isLogin():boolean{
    return (localStorage.getItem('id'))? true:false;
  }

  getDataUser(){
    this.servFlor.user(localStorage.getItem('id')).subscribe(d=>{
      console.log(d);
      
      this.subscripcion.suscriptor.nombre = d.nombre;
      this.subscripcion.suscriptor.apellidos = d.apellido;
      this.subscripcion.suscriptor.correo = d.correo;
      //this.subscripcion.suscriptor.direccion = d
    },e=>{
      console.log(e);
    });

    
  }

}
