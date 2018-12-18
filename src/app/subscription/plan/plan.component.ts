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
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
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

  abrePicker(){
    
    $(".datepicker" ).datepicker('show');
    $(".datepicker" ).datepicker({ startDate: ""+d.getDay() , daysOfWeekDisabled: "0,1,3,5,6", }); 
  }
  
  ngOnInit() {
    console.log('debio ejecutar picker')
    let d = new Date();
    setTimeout(() => {
      $(".datepicker" ).datepicker({ startDate: ""+d.getDay() , daysOfWeekDisabled: "0,1,3,5,6", });
    },1000);
    
    window.scrollTo(0,0);
    this.service.flowers().subscribe(d=>{
      this.Flowers = d;
      this.service.sizes().subscribe(s=>{this.Sizes=s;},e=>{});
      if(localStorage.getItem('subscription')){
        this.subscription = JSON.parse(localStorage.getItem('subscription'));
        this.suscriptor = (this.subscription.suscriptor)?this.subscription.suscriptor:null;
        this.select_flower = (this.subscription.plan.flor)? this.subscription.plan.flor : '';
        this.fecha_entrega = this.subscription.f_entrega;
        this.select_tamano = (this.subscription.plan.tamano)? this.subscription.plan.tamano : '';
        this.select_frecuencia = (this.subscription.plan.periodo)? this.subscription.plan.periodo : '';

        
        this.showForm = false;
        this.load = false;
      }
    },e=>{
      this.load = false;
      this.message = e;
      this.message.status = true;
      this.message.class = "bg-danger";
    });
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
  ficon(n:number){
    return new Array(n);
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

  addPlan(f:Flower){
     let el = document.getElementById("size");
    this.subscription.plan.flor = f.nombre;
    this.subscription.plan.img_flor = f.img;
    this.select_flower = f.nombre;
    el.scrollIntoView();
    // this.tamanos = plan.tamano;
  }
  addTamano(t:Size){
    let el = document.getElementById("periodo");
    this.subscription.plan.tamano = t.nombre;
  	this.select_tamano = t.nombre;
    el.scrollIntoView();
  }
  addTipo(f:Period){
    
    this.subscription.plan.periodo = f.nombre;
  	this.select_frecuencia = f.nombre;
    
  }

  goToSummary(){
    //this.addSuscriptor();
    
    if(!this.acept_entrega || !this.acept_term){
      this.alert = "Debe Aceptar los terminos y condiciones y/o entrega de la suscripción";
      return;
    }else{  

      if($("#fecha_entrega").val() != ''){
        this.subscription.f_entrega = $("#fecha_entrega").val();
        //!this.showForm && 
        if(this.select_frecuencia != undefined && this.select_tamano != undefined && this.select_flower != undefined){
          this.alert = "";
          this.find({"flower.nombre":this.select_flower,"size.nombre":this.select_tamano,period:this.select_frecuencia});
          setTimeout(()=>{
            let el = document.getElementById("registro");    
            el.scrollIntoView(true);

            document.getElementById("nombre").focus();

          }, 500);
        }else{
          this.alert = "Debe completar los datos del suscriptor y seleccionar el plan";
        }


        
      }
      else{
        this.alert = "Debe Ingresar el día que desea la entrega";
      } 
    }
  }
  
  find(query:any):void{
    this.service.plans(query).subscribe(d=>{
      let p:Plan[] = d;
      if(p.length > 0){
        this.subscription.plan._id = p[0]._id;
        this.subscription.plan.precio = p[0].values;
        this.subscription.plan.payuId = (p[0].payuId)? p[0].payuId: null;
        localStorage.setItem('subscription', JSON.stringify(this.subscription));
        if(this.validSession){
          this.addSuscriptor();
        }else{
          this.showForm = true;
        }
        
         //this.router.navigate(['subscription/summary']);
      }else{
        alert("No hay plan");
      }
    },e=>{console.log(e)});
  }



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
}
