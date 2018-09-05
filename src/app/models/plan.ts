import { Tamano } from './tamano';

export class Plan {
	_id:String;
	nombre:String;
	desc:String;
	img:String;
	numero:Number;
	tamano?:[Tamano];
	size?:[String];
}
