import { Component, OnInit } from '@angular/core';
import { Router }  from "@angular/router";
import { FlorfrescaService } from '../../services/florfresca.service';
import { Usuario } from '../../models/usuario';
import { Message } from '../../models/message';

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
  messages:Message;

  constructor(
    private service:FlorfrescaService,
    private router:Router
  ) {
    this.usuario = new Usuario();
    this.checkPasswords = false;
    this.passConfi = "";
    this.messages = new Message();
  }

  ngOnInit() {}

  onSubmit() {
    this.checkPasswords = this.compararContra(this.usuario.pass, this.passConfi);
    if (!this.checkPasswords) {
      this.service.create_user(this.usuario).subscribe(
        d=>{
          this.messages = d;
          this.messages.class = "bg-success";
          this.messages.status = true;
          // this.router.navigateByUrl("/login");   
        },
        e=>{
          this.messages = e;
          this.messages.class = "bg-danger";
          this.messages.status = true;
        }
      );
    }else{
      console.log("contra no son iguales")
    }

  }

  compararContra(contra1, contra2) {
    return contra1 === contra2;
  }

  cambiaLado($event) {
    this.checkPasswords = this.compararContra(this.usuario.pass, this.passConfi);
  }

}
