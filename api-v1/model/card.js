var mongoose 	= require( 'mongoose' );

var Card 	= new mongoose.Schema({
    toke:String
});

module.exports = mongoose.model('cards', Card);