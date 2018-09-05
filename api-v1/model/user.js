var mongoose 	= require( 'mongoose' ),
  crypto     	= require('crypto');

var Tarjeta = new mongoose.Schema({
  nombre:String,
  numero:String,
  fecha_ven:String,
  codigo_s:String,
  salt:String
})

var userSchema 	= new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  telefono: String,
  celular: Number,
  tipo_doc: String,
  documento:  String,
  hash: String,
  contra: String,
  reset: String,
  expires: String,
  activo: {type:Boolean, default:false},
  creado:  { type:Date, default: Date.now },
  tarjeta:[Tarjeta]
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

mongoose.model('users', userSchema);