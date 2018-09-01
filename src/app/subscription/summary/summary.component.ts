import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  suscriptor: any;
  plan: String;
  tam: String;
  tipo: String;
  show: boolean;
  textoBoton: string;
  parentesco: Array<string>;
  cat: Array<any>;
  newDireccion: string;
  showDir: boolean;


  constructor( private route: ActivatedRoute, private router: Router) {
    this.suscriptor = {nombre: '', ryp: '', cdir: '', dir: [''], ciudad: '', tel: ''};
    this.textoBoton = 'Editar';
    this.show = false;
    this.parentesco = ['Primo', 'Prima',
    'Cliente', 'Amiga' , 'Amigo', 'Novio',
    'Novia', 'Abuela', 'Abuelo', 'Mamá', 'Papá',
    'Hermana', 'Hermano', 'Hijo', 'Hija', 'Tío', 'Tía',
    'Esposa', 'Esposo'];
    this.cat = ['Casa', 'Oficina', 'Otro'];
    this.newDireccion = '';
    this.showDir = false;
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        if (!params['nombre']) {
            console.log('netro');
            this.router.navigate(['subscription/plan'], {});
        }
        this.suscriptor['nombre'] = params['nombre'];
        this.suscriptor['ryp'] = params['ryp'];
        this.suscriptor['cdir'] = params['cdir'];
        this.suscriptor['dir'][0] = params['dir'];
        this.suscriptor['ciudad'] = params['ciudad'];
        this.suscriptor['tel'] = params['tel'];
        this.plan = 'FRESCAS DE CULTIVO';
        this.tam = params['tam'];
        this.tipo = params['tipo'];
      })
  }

  editSuscriptor() {
    // console.log(this.suscriptor);
    this.show = !this.show;
    if ( this.textoBoton === 'Editar') {
      this.textoBoton = 'Guardar';
    } else {
      this.textoBoton = 'Editar';
    }

  }

  showDireccion() {
    this.showDir = !this.showDir;
  }

  addDireccion() {
    console.log(this.suscriptor.dir);
    if ( this.newDireccion !== '') {
      console.log(this.suscriptor.dir.push(this.newDireccion));
      this.newDireccion = '';
    }
    this.showDireccion();
  }

}
