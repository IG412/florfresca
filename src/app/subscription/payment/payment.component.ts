import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Suscriptor } from '../../models/suscriptor';
import { Suscripcion } from '../../models/suscripcion';
import { Plan } from '../../models/plan';
import { Tamano } from '../../models/tamano';
import { Frecuencia } from '../../models/frecuencia';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  suscriptor: Suscriptor;
  plan: Plan;
  tamano: Tamano;
  frecuencia: Frecuencia;

  tipoDoc: Array<any>;
  datosPago: any;
  emailConfirmacion: string;
  tarjetas: Array<any>;
  mensajeError: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.suscriptor = new Suscriptor();
    this.plan = new Plan();
    this.tamano = new Tamano();
    this.frecuencia = new Frecuencia();

    this.datosPago = {
      nombre: '',
      apellidos: '',
      email: '',
      telefono: '',
      celular: '',
      tipoDocumento: '',
      numeroDocumento: '',
      tarjeta: ''
    };
    this.tipoDoc = ['Cedula Colombiana', 'Cedula de Extranjeria', 'Pasaporte'];
    this.tarjetas = [
      { _id: 1, nombre: 'visa' },
      { _id: 2, nombre: 'mastercard' },
      { _id: 3, nombre: 'american' },
      { _id: 4, nombre: 'colpatria' },
      { _id: 5, nombre: 'other1' }
    ];
    this.emailConfirmacion = '';
    this.mensajeError = '';

    if(localStorage.getItem('suscriptor') && localStorage.getItem('plan') && localStorage.getItem('tamano') && localStorage.getItem('frecuencia')){
      this.suscriptor = JSON.parse(localStorage.getItem('suscriptor'));
      this.plan = JSON.parse(localStorage.getItem('plan'));
      this.tamano = JSON.parse(localStorage.getItem('tamano'));
      this.frecuencia = JSON.parse(localStorage.getItem('frecuencia'));
    }else{
      this.router.navigate(['subscription/plan'], {});
    }

  }

  ngOnInit() {}

  goToSummary() {
    if (
      this.validarString(this.datosPago.nombre) &&
      this.validarString(this.datosPago.apellidos) &&
      this.validarEmail(this.datosPago.email, this.emailConfirmacion) &&
      this.validarNumber(this.datosPago.telefono) &&
      this.validarNumber(this.datosPago.celular) &&
      this.validarNumber(this.datosPago.numeroDocumento) &&
      this.validarString(this.datosPago.tipoDocumento) &&
      this.validarString(this.datosPago.tarjeta)
    ) {
      this.mensajeError = '';
      // {nombre:'',ryp:'',cdir:'',dir:'',ciudad:'',tel:'' }
      // this.router.navigate(['----'], {
      //   queryParams: {
      //     nombre: this.datosPago['nombre'],
      //     apellidos: this.datosPago['apellidos'],
      //     email: this.datosPago['email'],
      //     telefono: this.datosPago['telefono'],
      //     celular: this.datosPago['celular'],
      //     tipoDocumento: this.datosPago['tipoDocumento'],
      //     numeroDocumento: this.datosPago['numeroDocumento'],
      //     tarjeta: tarjetas._id =this.datosPago['tarjetaId']
      //   }
      // });
      console.log('Datos Validados Correctamente');

      console.log(this.datosPago);
    } else {
      this.mensajeError = 'Debe completar todos los datos';
    }
  }

  validarString(texto: string) {
    console.log(texto);
    console.log(texto !== '');
    return texto !== '';

  }
  validarNumber(numero) {
    console.log(!isNaN(numero) && numero !== '');
    // console.log(numero !== '' + ' {{{{{{ ¿ ' + Number.isNaN(numero) );
    // return numero !== '' && isNaN(numero);
    return !isNaN(numero) && numero !== '';
  }
  validarEmail(email1: string, email2: string) {
    // console.log(email1 + '¿----¿  ' + email2);
    console.log('igualdad de emails: ');
    if (this.validarString(email1) && this.validarString(email2)) {
      console.log('email no vacios');
      return email1 === email2;
    }
    return false;
  }
  addCard(nombreTarjeta: string) {
    this.datosPago['tarjeta'] = nombreTarjeta;
    // console.log(nombreTarjeta);
    // console.log(this.tarjetas[0].nombre);
    // console.log(this.datosPago.tarjeta);
    // console.log(this.tarjetas[0].nombre == this.datosPago.tarjeta);
  }
}
