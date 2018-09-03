import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  resetContra: any;
  checkContra: boolean;

  constructor() {
    this.resetContra = {
      contra: '',
      validar_contra: ''
    };
    this.checkContra = true;
   }

  ngOnInit() {
  }

  onSubmit() {
    this.checkContra = this.resetContra.contra === this.resetContra.validar_contra;
    console.log(this.checkContra);
    if (!this.checkContra) {
      return;
    }
    alert('SUCCESS!!\n\n' + JSON.stringify(this.resetContra));
  }
}
