import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlorfrescaService } from '../../services/florfresca.service';
import { Message } from '../../models/message';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  message:Message;
  resetContra: any;
  checkContra: boolean;

  constructor(
    private route: ActivatedRoute,
    private service:FlorfrescaService
    ) {
    this.message = new Message();
    this.resetContra = {
      contra: '',
      validar_contra: ''
    };
    this.checkContra = true;
   }

  ngOnInit() {}

  onSubmit() {
    this.checkContra = this.resetContra.contra === this.resetContra.validar_contra;
    if (this.checkContra) {
      this.service.reboot({token:this.route.snapshot.paramMap.get('id'), password:this.resetContra.contra}).subscribe(r=>{
        this.message = r;
        this.message.class = "bg-success";
        this.message.status = true;
        this.resetContra = {contra: '',validar_contra: ''};
      },e=>{
        let er:any = e
        this.message.message = (er.error.message)?er.error.message:"Lo sentimos ocurrió un error, no se pudo conectar con el servidor";
        this.message.class = "bg-danger";
        this.message.status = true;
      });
    }
  }
}
