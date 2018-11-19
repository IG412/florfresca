import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  }  from "@angular/router";
import { FlorfrescaService } from '../../services/florfresca.service';
import { Message } from '../../models/message';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

  correo: string;
  boton:boolean;
  messages:Message;
  from:string;
  constructor(
    private service:FlorfrescaService,
    private router:Router,
    private active: ActivatedRoute
  ) {
    this.correo = '';
    this.boton = false;
    this.messages = new Message();
   }

  ngOnInit() {
    this.from = this.active.snapshot.queryParamMap.get("from");
  }

  onSubmit() {
    this.service.recovery({correo: this.correo}).subscribe(
        d=>{
          this.messages = d;
          this.messages.class = "bg-success";
          this.messages.status = true;  
          this.goBack();
        },
        e=>{
          let er:any = e
          this.messages.message = (er.error.message)?er.error.message:"Lo sentimos ocurrió un error, no se pudo conectar con el servidor";
          this.messages.class = "bg-danger";
          this.messages.status = true;
        }
      );
  }
  goBack():void{
    if(this.from){
      this.router.navigateByUrl("/subscription/"+this.from);  
    }else{
      setTimeout(() => {
        console.log('Success!!')
        this.router.navigateByUrl("/login"); 
      }, 1000);  
    }
  }

}
