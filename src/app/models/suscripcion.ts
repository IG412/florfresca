import { Suscriptor } from './suscriptor';
import { Usuario } from './usuario';	
// import { Plan } from './plan';

class Plan  {
	_id:String;
	nombre:String;
	img:String;
	tamano?:String;
	frecuencia?:String;
	precio?:Number;
	payuId?:string;
}

export class Subscripcion {
	estado:String;
	suscriptor: Suscriptor;
	plan:Plan;
	cliente:Usuario;
	payuId:string;
}
