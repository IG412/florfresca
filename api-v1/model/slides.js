var mongoose  	= require('mongoose'),
    Schema     	= mongoose.Schema;

var schema   	= mongoose.Schema({
    src: String,
    text:String,
    position: Number,
    update:  { type:Date, default: Date.now }
});
module.exports = mongoose.model('slides', schema);