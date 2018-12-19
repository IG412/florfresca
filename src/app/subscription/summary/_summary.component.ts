import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FlorfrescaService } from 'src/app/services/florfresca.service';

import { Message } from '../../models/message';
import { Usuario } from '../../models/usuario';
import { Suscriptor } from '../../models/suscriptor';
import { Subscripcion } from '../../models/suscripcion';
import { Plan } from '../../models/plan';
import { Flower } from '../../models/flower';
import { Size } from '../../models/size';
import { Period } from '../../models/period';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class _SummaryComponent implements OnInit {
  subscripcion: Subscripcion;
  plan: Plan;
  tamano: Size;
  frecuencia: Period;

  show: boolean;
  textoBoton: string;
  showDir: boolean;

  parentesco: Array<string>;
  cat: Array<any>;
  precio:Number;
  id;

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

  constructor( private route: ActivatedRoute, private router: Router, private servFlor: FlorfrescaService) {
   
  }

  ngOnInit() {
    
  }

  

}
