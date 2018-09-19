import { Component, OnInit } from '@angular/core';
import { Router }  from "@angular/router";
import { FlorfrescaService } from '../../services/florfresca.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usuario: Usuario;
  usuarioNuevo: any;
  checkPasswords: boolean;
  passConfi: string;

  constructor(
    private service:FlorfrescaService,
    private router:Router
  ) {
    this.usuario = new Usuario();
    this.checkPasswords = false;
    this.passConfi = "";
  }

  ngOnInit() {
  }

  onSubmit() {
    this.checkPasswords = this.compararContra(this.usuario.contra, this.passConfi);
    if ( !this.checkPasswords ) {
      this.service.create_user(this.usuario).subscribe(
        d=>{
          // this.router.navigateByUrl("/login");   
        },
        e=>{
          console.log(e);
        }
      );
    }

  }

  compararContra(contra1, contra2) {
    return contra1 === contra2;
  }

  cambiaLado($event) {
    this.checkPasswords = this.compararContra(this.usuario.contra, this.passConfi);
  }

}
