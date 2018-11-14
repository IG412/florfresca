import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlorfrescaService } from '../../services/florfresca.service';
import { Message } from '../../models/message';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {
  message:Message;
  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
    private service:FlorfrescaService
    ) { 
  	this.message = new Message();
  }

  ngOnInit() {
  	this.service.activate({token:this.route.snapshot.paramMap.get('id')}).subscribe(r=>{
  		let u:any = r;
        this.message = r;
        this.message.class = "bg-success";
        this.message.status = true;
        localStorage.setItem('token', u.token);
        localStorage.setItem('id', u.id);
        setTimeout(() => {
	        console.log('Success!!')
	        this.router.navigateByUrl("/account/profile"); 
	      }, 1000); 
      },e=>{
        let er:any = e
        this.message.message = (er.error.message)?er.error.message:"Lo sentimos ocurrió un error, no se pudo conectar con el servidor";
        this.message.class = "bg-danger";
        this.message.status = true;
      });
  }

}
