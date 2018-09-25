import { Suscriptor } from './suscriptor';
// import { Plan } from './plan';

class Plan  {
	_id:String;
	nombre:String;
	img:String;
	tamano?:String;
	frecuencia?:String;
	precio?:Number;
}

export class Subscripcion {
	estado:String;
	suscriptor: Suscriptor;
	plan:Plan;
	cliente:String;
}
