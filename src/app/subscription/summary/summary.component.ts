import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  suscriptor:any;
  plan:String;
  tam:String;
  tipo:String;
  constructor(
  	private route: ActivatedRoute,
  	) {
  	this.suscriptor = {nombre:'',ryp:'',cdir:'',dir:'',ciudad:'',tel:'' }
  }

  ngOnInit() {
  	this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.suscriptor['nombre'] = params['nombre'];
        this.suscriptor['ryp'] = params['ryp'];
        this.suscriptor['cdir'] = params['cdir'];
        this.suscriptor['dir'] = params['dir'];
        this.suscriptor['ciudad'] = params['ciudad'];
        this.suscriptor['tel'] = params['tel'];
        this.plan = "FRESCAS DE CULTIVO";
        this.tam = params['tam'];
        this.tipo = params['tipo'];
      })
  }

}
