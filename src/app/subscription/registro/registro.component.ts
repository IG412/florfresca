import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FlorfrescaService } from '../../services/florfresca.service';

import { Message } from '../../models/message';
import { Usuario } from '../../models/usuario';
import { Suscriptor } from '../../models/suscriptor';
import { Subscripcion } from '../../models/suscripcion';
import { Plan } from '../../models/plan';
import { Flower } from '../../models/flower';
import { Size } from '../../models/size';
import { Period } from '../../models/period';


declare var $: any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  // registro 
  messages: Message;
  usuario:Usuario;
  usuarioNuevo: any;
  checkPasswords: boolean;
  passConfi: string;
  formErrors=false;
  FormularioError=false;
  chPasswords = false;
  registerExist=false;

  load:boolean;
  submitted:Boolean;
  registerForm: FormGroup;
  parentesco: Array<String>;
  cat:Array<String>;
  suscriptor:Suscriptor;
  showForm:boolean=false;
  Flowers: Array<Flower>;
  Sizes:Array<Size>;
  period:Array<Period>;
  subscription: Subscripcion;
  message: Message;

  select_flower: String;
  select_tamano:String;
  select_frecuencia:String;

  fecha_entrega:String;
  acept_term:Boolean;
  acept_entrega:Boolean;
  alert:String;
  showFormComplete=false;
  validSession = false;
  constructor(
  	private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private service: FlorfrescaService
    ) { 
      this.validSession = (localStorage.getItem('token'))? true: false;
    this.Flowers = new Array();
    this.message = new Message();
    this.submitted = false;
  	this.suscriptor = new Suscriptor();
  	this.parentesco = ["Seleccione","Para mi","Primo", "Prima", "Cliente", "Amiga" , "Amigo", "Novio", "Novia", "Abuela", "Abuelo", "Mamá", "Papá", "Hermana", "Hermano", "Hijo", "Hija", "Tío", "Tía", "Esposa", "Esposo"];
  	this.cat = ["Seleccione","Casa", "Oficina", "Otro"];
  	this.showForm=false;
    this.subscription = new Subscripcion();
  	this.Sizes = new Array();
    this.load = false;
  	this.period = [
  	{ nombre:"SEMANAL", desc: "4 entregas de flores al mes (segun plan)*", icon:"assets/imgs/icons/icon-flores.png", number:4,class:'<div class="col-xs-3 col-sm-1 title hotel-middle clearfix cell-view" ><img class="period" src="assets/imgs/icons/icon-flores.png" alt=""></div><div class="col-xs-3 col-sm-1 title hotel-middle clearfix cell-view"><img class="period" src="assets/imgs/icons/icon-flores.png" alt=""></div><div class="col-xs-3 col-sm-1 title hotel-middle clearfix cell-view"><img class="period" src="assets/imgs/icons/icon-flores.png" alt=""></div><div class="col-xs-3 col-sm-1 title hotel-middle clearfix cell-view"><img class="period" src="assets/imgs/icons/icon-flores.png" alt="">'},
  	{ nombre:"QUINCENAL", desc: "2 entregas de flores al mes (segun plan)*", icon:"assets/imgs/icons/icon-flores.png", number:2,class:'<div class="col-xs-3 col-sm-1 title hotel-middle clearfix cell-view"></div><div class="col-xs-3 col-sm-1 title hotel-middle clearfix cell-view"><img class="period" src="assets/imgs/icons/icon-flores.png" alt=""></div><div class="col-xs-3 col-sm-1 title hotel-middle clearfix cell-view"><img class="period" src="assets/imgs/icons/icon-flores.png" alt=""></div><div class="col-xs-3 col-sm-1 title hotel-middle clearfix cell-view"></div>'},
  	{ nombre:"MENSUAL", desc: "1 entregas de flores al mes (segun plan)*", icon:"assets/imgs/icons/icon-flores.png", number:1, class:'<div class="col-xs-12 col-sm-4 title hotel-middle clearfix cell-view text-center"><img class="period" src="assets/imgs/icons/icon-flores.png" alt=""></div>'}
  	];
    
    this.acept_term = false;
    this.acept_entrega = false;
    this.alert = "";
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.required],
      pass: ['', Validators.required],
      passConfi: ['', Validators.required],

      // rela_paren: ['', Validators.required],
      // catego: ['', [Validators.required]],
      // direccion: [ '', [Validators.required, Validators.minLength(6)]],
      // ciudad: ['', Validators.required],
      telefono: ['', Validators.required],
      gatos:[]
  });

    this.suscriptor.ciudad = "Bogotá";

    this.usuario = new Usuario();
    this.checkPasswords = false;
    this.passConfi = "";
    this.messages = new Message();
  }

  tempData;
  registrar() {
    
    if(this.usuario.nombre == undefined || this.usuario.apellido == undefined || this.usuario.telefono == undefined || this.usuario.correo == undefined || this.usuario.pass == undefined ||this.usuario.passConfi == undefined){
      this.formErrors = true ;
      this.FormularioError = true;
      return false;  
    }else{
      this.FormularioError = false;
    this.messages = new Message();

    if(this.usuario.pass != this.usuario.passConfi){
      this.formErrors = true
      this.chPasswords = true;
      return false;
    }
    console.log('paso reg')
    this.tempData ={
      correo: this.usuario.correo,
      pass: this.usuario.pass
    }
      this.service.create_user(this.usuario).subscribe(
        d=>{
          this.messages = d;
          this.messages.class = "bg-success";
          this.messages.status = true;
          setTimeout(() => {
            console.log('Success!!');
            this.usuario = new Usuario();
            // setTimeout(()=>{ this.login();},1500)
            //this.showFormComplete = true;
            this.showForm = true;
            this.addSuscriptor();
            //this.router.navigateByUrl("/login"); 
          }, 1000); 
        },
        e=>{
          
          let er:any = e
          this.messages.message = (er.error.message)? er.error.message: "Lo sentimos error 500 interno del servidor, contactar con Soporte de Flor fresca";
          this.messages.class = "bg-danger";
          this.messages.status = true;
        }
      );
    
    }    
  }

  compararContra(contra1, contra2) {
    return contra1 === contra2;
  }

  cambiaLado($event) {
    this.checkPasswords = this.compararContra(this.usuario.pass, this.passConfi);
  }

  //  Login 

  login(){
    
    this.messages = new Message();
    this.usuario = new Usuario();

    this.usuario.correo = this.tempData.correo;
    this.usuario.pass = this.tempData.pass;

    this.service.Auth0(this.usuario).subscribe(
      d=>{
        console.log('entro al exito')
        this.messages = d;
        this.messages.class = "bg-success";
        this.messages.status = true;
        let msg:any = d;
        localStorage.setItem('token', msg.token);
        localStorage.setItem('id', msg.id);
        this.router.navigate(['subscription/summary']);
        // this.usuario = { correo: '',pass: ''};
        
      },
      e=>{
        
          let er:any = e
          this.messages.message = (er.error.message)?er.error.message:"Lo sentimos ocurrió un error, no se pudo conectar con el servidor";
          this.messages.class = "bg-danger";
          this.messages.status = true;
      }
    );


  }

  addSuscriptor(){
    
    this.submitted = true;
    //console.log(this.registerForm)
    if(this.validSession){
      this.router.navigate(['subscription/summary']);
      return false;
    }

    if(!this.registerForm.invalid){
      this.subscription.suscriptor = this.suscriptor;
      localStorage.setItem('subscription', JSON.stringify(this.subscription));
      
      this.showForm = true;
      //this.showFormComplete = true;
      setTimeout(()=>{ this.login();},1000)
      
    }else{
      console.log('error')
    }
  }
}
