import { Transaction } from './../../models/transaction';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Suscriptor } from '../../models/suscriptor';
import { Subscripcion } from '../../models/suscripcion';
import { Plan } from '../../models/plan';
import { Tamano } from '../../models/tamano';
import { Frecuencia } from '../../models/frecuencia';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  subscripcion: Subscripcion;

  tipoDoc: Array<any>;
  datosPago: any;
  emailConfirmacion: string;
  tarjetas: Array<any>;
  mensajeError: string;
  transaction: Transaction;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.subscripcion = new Subscripcion();

    this.datosPago = {
      nombre: '',
      apellidos: '',
      email: '',
      telefono: '',
      celular: '',
      tipoDocumento: '',
      numeroDocumento: '',
      tarjeta: '',
      nombreTarjeta: '',
      tipoDocumentoTarjeta: '',
      numeroDocumentoTarjeta: '',
      numeroTarjeta: '',
      codigoSeguridad: '',
      fechaVencimiento: '',
      cuotas: '',
      celularTarjeta: '',
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
    this.transaction = new Transaction();
    // this.transaction.order['buyer'].fullName = 'prueba de nombre';
    // this.transaction.order.buyer.fullName='fa';
    // console.log('Datos Transaction', this.transaction.order['buyer'].buyer.fullName);
    console.log('Datos Transaction', JSON.stringify(this.transaction));
  }

  ngOnInit() {
    if (localStorage.getItem('subscription')) {
      this.subscripcion = JSON.parse(localStorage.getItem('subscription'));
    } else {
      this.router.navigate(['subscription/plan'], {});
    }
  }

  goToSummary() {
    if (
      this.validarString(this.datosPago.nombre) &&
      this.validarString(this.datosPago.apellidos) &&
      this.validarEmail(this.datosPago.email, this.emailConfirmacion) &&
      this.validarNumber(this.datosPago.telefono) &&
      this.validarNumber(this.datosPago.celular) &&
      this.validarNumber(this.datosPago.numeroDocumento) &&
      this.validarString(this.datosPago.tipoDocumento) &&
      this.validarString(this.datosPago.tarjeta) &&
      this.validarString(this.datosPago.nombreTarjeta) &&
      this.validarString(this.datosPago.tipoDocumentoTarjeta) &&
      this.validarString(this.datosPago.numeroDocumentoTarjeta) &&
      this.validarString(this.datosPago.numeroTarjeta) &&
      this.validarString(this.datosPago.codigoSeguridad) &&
      this.validarString(this.datosPago.fechaVencimiento) &&
      this.validarString(this.datosPago.cuotas) &&
      this.validarString(this.datosPago.celularTarjeta)
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
      // this.transaction.order.buyer.fullName = this.datosPago.nombre + ' ' + this.datosPago.apellidos;
      // this.llenarJsonTransaction();
      console.log('Datos Transaction', JSON.stringify(this.transaction));
      console.log('Datos Validados Correctamente', JSON.stringify(this.datosPago));

      console.log(this.datosPago);
    } else {
      this.mensajeError = 'Debe completar todos los datos';
    }
  }
  llenarJsonTransaction() {
    // this.transaction.order.buyer.merchantBuyerId = '';
    // this.transaction.order.buyer.fullName = '';
    // this.transaction.order.buyer.emailAddress = '';
    // this.transaction.order.buyer.contactPhone = '';
    // this.transaction.order.buyer.dniNumber = '';
    // this.transaction.order.buyer.shippingAddress.street1 = '';
    // this.transaction.order.buyer.shippingAddress.street2 = '';
    // this.transaction.order.buyer.shippingAddress.city = '';
    // this.transaction.order.buyer.shippingAddress.state = '';
    // this.transaction.order.buyer.shippingAddress.country = '';
    // this.transaction.order.buyer.shippingAddress.postalCode = '';
    // this.transaction.order.shippingAddress.phone = '';
    // this.transaction.order.shippingAddress.street1 = '';
    // this.transaction.order.shippingAddress.street2 = '';
    // this.transaction.order.shippingAddress.city = '';
    // this.transaction.order.shippingAddress.state = '';
    // this.transaction.order.shippingAddress.country = '';
    // this.transaction.order.shippingAddress.postalCode = '';
    // this.transaction.order.shippingAddress.phone = '';
    // this.transaction.payer.merchantPayerId = '';
    // this.transaction.payer.fullName = '';
    // this.transaction.payer.emailAddress = '';
    // this.transaction.payer.contactPhone = '';
    // this.transaction.payer.dniNumber = '';
    // this.transaction.payer.billingAddress.street1 = '';
    // this.transaction.payer.billingAddress.street2 = '';
    // this.transaction.payer.billingAddress.city = '';
    // this.transaction.payer.billingAddress.state = '';
    // this.transaction.payer.billingAddress.country = '';
    // this.transaction.payer.billingAddress.postalCode = '';
    // this.transaction.payer.billingAddress.phone = '';
    // this.transaction.creditCard.number = '';
    // this.transaction.creditCard.securityCode = '';
    // this.transaction.creditCard.expirationDate = '';
    // this.transaction.creditCard.name = '';
    // this.transaction.paymentMethod = '';
    // this.transaction.paymentCountry = '';
    // this.transaction.cookie = '';
    // this.transaction.userAgent = '';

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
  private getPrice(val: String, price:any):Number{
    console.log(val,price)
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
}
