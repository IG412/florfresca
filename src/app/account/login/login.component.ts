import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  }  from "@angular/router";
import { FlorfrescaService } from '../../services/florfresca.service';
import { Message } from '../../models/message';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:any;
  from:string;
  messages:Message;

  constructor(
    private service: FlorfrescaService,
    private router:Router,
    private active: ActivatedRoute
  ) {
    this.messages = new Message();
    this.usuario = {correo: '',pass: ''};
   }

  ngOnInit() {
    this.from = this.active.snapshot.queryParamMap.get("from");
    if(localStorage.getItem('token') && localStorage.getItem('id') ){
       this.router.navigateByUrl("/account/profile"); 
    }
  }
  onSubmit() {
    this.messages = new Message();
    this.service.Auth0(this.usuario).subscribe(
      d=>{
        this.messages = d;
        this.messages.class = "bg-success";
        this.messages.status = true;
        let msg:any = d;
        localStorage.setItem('token', msg.token);
        localStorage.setItem('id', msg.id);
        // this.usuario = { correo: '',pass: ''};
        this.goBack();
      },
      e=>{
          let er:any = e
          console.log(e);
          this.messages.message = er.error.message;
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
        this.router.navigateByUrl("/account/profile"); 
      }, 1000);  
    }
  }
}
