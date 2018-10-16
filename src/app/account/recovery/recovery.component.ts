import { Component, OnInit } from '@angular/core';
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

  constructor(
    private service:FlorfrescaService
  ) {
    this.correo = '';
    this.boton = false;
    this.messages = new Message();
   }

  ngOnInit() {}

  onSubmit() {
    this.service.recovery({correo: this.correo}).subscribe(
        d=>{
          this.messages = d;
          this.messages.class = "bg-success";
          this.messages.status = true;   
        },
        e=>{
          let er:any = e
          this.messages.message = er.error.message;
          this.messages.class = "bg-danger";
          this.messages.status = true;
        }
      );
  }

}
