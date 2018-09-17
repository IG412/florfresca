var mongoose 	= require( 'mongoose' ),
  crypto     	= require('crypto');


var Admins 	= new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  telefono: String,
  hash: String,
  salt: String,
  reset: String,
  expires: String,
  activo: {type:Boolean, default:false},
  creado:  { type:Date, default: Date.now }
});

Admins.methods.setPass = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

Admins.methods.validPass = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

mongoose.model('admins', Admins);