import { Component, OnInit } from '@angular/core';
import { FlorfrescaService } from '../../services/florfresca.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

  correo: string;
  boton:boolean;

  constructor(
    private service:FlorfrescaService
  ) {
    this.correo = '';
    this.boton = false;
   }

  ngOnInit() {
  }

  onSubmit() {
    this.service.create_user({correo: this.correo}).subscribe(
        d=>{
          // this.router.navigateByUrl("/login");   
        },
        e=>{
          console.log(e);
        }
      );
  }

}
