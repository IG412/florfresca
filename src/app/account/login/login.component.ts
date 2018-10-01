import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  }  from "@angular/router";
import { FlorfrescaService } from '../../services/florfresca.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: any ;
  from:string;

  constructor(
    private service: FlorfrescaService,
    private router:Router,
    private active: ActivatedRoute
  ) {
    this.usuario = {
      email: '',
      pass: '',
    };
   }

  ngOnInit() {
    this.from = this.active.snapshot.queryParamMap.get("from");
    if(localStorage.getItem('token') && localStorage.getItem('id') ){
       this.router.navigateByUrl("/"); 
    }
  }
  onSubmit() {
    console.log('entro');
    this.service.Auth0(this.usuario).subscribe(
      d=>{
        let msg:any = d;
        localStorage.setItem('token', msg.token);
        localStorage.setItem('id', msg.id);
        this.goBack();
      },
      e=>{
        console.log(e);
      }
    );
  }

  goBack():void{
    if(this.from){
      this.router.navigateByUrl("/subscription/"+this.from);  
    }else{
      // this.router.navigateByUrl("/account");  
      console.log(this.from);
    }
  }
}
