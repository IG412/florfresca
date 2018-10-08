var mongoose 	= require( 'mongoose' );

var Flower = new mongoose.Schema({
    _id: String,
    nombre: String,
    desc: String,
    img: String,
})

var Size = new mongoose.Schema({
    _id: String,
    nombre: String,
})

var Plans 	= new mongoose.Schema({
    flower:Flower,
    size:Size,
    period: String,
    payuId: String,
    values: Number,
    iva:String,
    f_creacion:  { type:Date, default: Date.now },
    f_upd: Date,
});

module.exports = mongoose.model('plans', Plans);