var mongoose 	= require( 'mongoose' ),
  crypto     	= require('crypto');

var Tarjeta = new mongoose.Schema({
  nombre:String,
  numero:String,
  fecha_ven:String,
  codigo_s:String,
  salt:String
})

var Usuario 	= new mongoose.Schema({
  nombre: String,
  apellido: String,
  correo: {
    type: String,
    unique: true,
    required: true
  },
  telefono: String,
  celular: Number,
  tipo_doc: String,
  documento:  String,
  hash: String,
  salt: String,
  reset: String,
  expires: String,
  activo: {type:Boolean, default:false},
  creado:  { type:Date, default: Date.now },
  tarjeta:[Tarjeta]
});

Usuario.methods.setPass = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64,"sha512").toString('hex');
};

Usuario.methods.validPass = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64,"sha512").toString('hex');
  return this.hash === hash;
};

mongoose.model('users', Usuario);