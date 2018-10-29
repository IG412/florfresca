var mongoose 	= require( 'mongoose' ),
  crypto     	= require('crypto');
var users = mongoose.model('users');
var Plan = new mongoose.Schema({
  _id:String,
  flor:String,
  img_flor:String,
  tamano:String,
  periodo:String,
  precio:String,
  payuId:String
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
  cliente: { type: mongoose.Schema.ObjectId, ref: "users" },
  plan: Plan,
  estado: {type:String, default:"pendiente"},
  suscriptor: Suscriptor,
  f_creacion:  { type:Date, default: Date.now },
  f_entrega: Date,
  f_upd: { type:Date, default: Date.now },
  payuId:String,
  creditCardToken:String,
  cuotas:Number
});

module.exports =  mongoose.model('subscriptions', Suscripciones);