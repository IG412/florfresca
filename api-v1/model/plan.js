var mongoose 	= require( 'mongoose' );

var Tamano = new mongoose.Schema({
  nombre:String,
  desc:String,
  icon:String,
  precio:String
})

var Plans 	= new mongoose.Schema({
    nombre: String,
    desc: String,
    img: String,
    numero: Number,
    tamano: [Tamano],
    f_creacion:  { type:Date, default: Date.now },
    f_upd: Date,
});

module.exports = mongoose.model('plans', Plans);