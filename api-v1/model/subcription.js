var mongoose 	= require( 'mongoose' ),
  crypto     	= require('crypto');

var Plan = new mongoose.Schema({
  nombre:String,
  img:String,
  tamano:String,
  frecuencia:String,
  precio:String
})

var Suscriptor = new mongoose.Schema({
  nombre:String,
  rela_paren:String,
  tel:Number,
  catego:String,
  ciudad:String,
  direccion:String,
  gatos: { type:String, default: "no" }
})

var Suscripciones 	= new mongoose.Schema({
  cliente: String,
  plan: Plan,
  estado: {type:Boolean, default:false},
  suscriptor: Suscriptor
  f_creacion:  { type:Date, default: Date.now },
  f_entrega: Date,
  f_upd: Date,
});


mongoose.model('subscriptions', Suscripciones);