var mongoose 	= require( 'mongoose' );

var Flower 	= new mongoose.Schema({
    // flower: { type: mongoose.Schema.ObjectId, ref: "flowers" },
    flower:String,
    size:String,
    // size: { type: mongoose.Schema.ObjectId, ref: "sizes" },
    period: String,
    payuId: String,
    values: Number,
    iva:String,
    f_creacion:  { type:Date, default: Date.now },
    f_upd: Date
});

module.exports = mongoose.model('flowers', Flower);