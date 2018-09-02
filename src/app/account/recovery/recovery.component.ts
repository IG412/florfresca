import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

  usuario: any;

  constructor() {
    this.usuario = {
      email: ''
    };
   }

  ngOnInit() {
  }

  onSubmit() {
    alert('SUCCESS!!\n\n' + JSON.stringify(this.usuario));
  }

}
