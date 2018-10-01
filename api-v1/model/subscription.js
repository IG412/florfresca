var mongoose 	= require( 'mongoose' ),
  crypto     	= require('crypto');

var Plan = new mongoose.Schema({
  nombre:String,
  img:String,
  tamano:String,
  frecuencia:String,
  precio:String,
  payu:{
   accountId: String,
   planCode: String,
   description: String,
   interval: {type:String,default:"MONTH"},
   intervalCount: {type:String,default:"1"},
   maxPaymentsAllowed: {type:String,default:"12"},
   paymentAttemptsDelay: {type:String,default:"1"},
   additionalValues: [
      {
         name: String,
         value: String,
         currency: {type:String,default:"COP"}
      }
   ]
},

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
  estado: {type:Boolean, default:false},
  suscriptor: Suscriptor,
  f_creacion:  { type:Date, default: Date.now },
  f_entrega: Date,
  f_upd: Date,
  payu:{
   quantity: {type:String, default:"1"},
   installments: {type:String, default:"1"},
   trialDays: {type:String, default:"15"},
   immediatePayment: Boolean,
   extra1: {type:String, default:"Extra 1"},
   extra2: {type:String,default:"Extra 2"},
   deliveryAddress: {
      line1: String,
      line2: String,
      line3: String,
      postalCode: String,
      city: {type:String, default:"Bogotá"},
      state: String,
      country:{type:String, default:"CO"},
      phone: String
      } ,
   notifyUrl: String
}
});

module.exports =  mongoose.model('subscriptions', Suscripciones);