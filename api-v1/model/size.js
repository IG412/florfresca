var mongoose 	= require( 'mongoose' );

var Size 	= new mongoose.Schema({
    nombre: String,
    desc: String,
    icon: String,
    f_creacion:  { type:Date, default: Date.now },
    f_upd: Date
});

module.exports = mongoose.model('sizes', Size);