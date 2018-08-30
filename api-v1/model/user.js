var mongoose 	= require( 'mongoose' ),
  crypto     	= require('crypto');

var userSchema 	= new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  suscription: {type:Boolean, default:false},
  life: {type:Boolean, default:false},
  date:  Date,
  hash: String,
  salt: String,
  reset: String,
  expires: String,
  active: {type:Boolean, default:false},
  created:  { type:Date, default: Date.now }
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