import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usuarioNuevo: any;
  checkPasswords: boolean;
  checkCelular: boolean;
  constructor() {
    this.usuarioNuevo = {
      nombre: '',
      apellido: '',
      correo: '',
      contra: '',
      validar_contra: '',
      celular: '',
    };
    this.checkPasswords = false;
    this.checkCelular = true;
  }

  ngOnInit() {
  }

  onSubmit() {
    this.checkPasswords = this.compararContra(this.usuarioNuevo.contra, this.usuarioNuevo.validar_contra);
    this.checkCelular = isNaN(this.usuarioNuevo.celular);
    console.log(this.checkCelular);
    if ( !this.checkPasswords || this.checkCelular ) {
      return;
    }
    alert('SUCCESS!!\n\n' + JSON.stringify(this.usuarioNuevo));

  }

  compararContra(contra1, contra2) {
    return contra1 === contra2;
  }

  cambiaLado($event) {
    this.checkPasswords = this.compararContra(this.usuarioNuevo.contra, this.usuarioNuevo.validar_contra);
  }

  checkCelularNumero() {
   return isNaN(this.usuarioNuevo.celular);
  }
}
