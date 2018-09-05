require('../model/user');
require('../service/passport');
var crypto      = require('crypto');
    passport    = require('passport'),
    mongoose    = require('mongoose'),
    // nodemailer  = require('nodemailer'),
    tokener     = require('../service/tokener'),
    // Email       = require('../model/email'),
    User        = mongoose.model('users');

module.exports  = {
    register : function(req, res) {
        var user    = new User();
        user.email  = req.body.email;
        User.findOne(req.body, function (error, email){
            if(email){
                res.status(401).json({message:'El email '+req.body.email+ ' ya se encuentra registrado.'});
            }
            else{
                user.reset   = crypto.randomBytes(25).toString('hex');
                user.expires = Date.now() + 3600000;
                var data = {email: req.body.email,link : 'http://' + req.headers.host + '/activate/' + user.reset + '\n\n'+''};            
                var html_message = Email.get("server/views/auth.ejs",data);

                user.save(function (e) {
                    if (e) throw e;
                    
                })
            }
        })
    },
  login : function(req, res) {
    User.findOne({email:req.body}, function (error, email){
            if(email){
                res.status(401).json({message:'El email '+req.body.email+ ' ya se encuentra registrado.'});
            }
            else{
                token = tokener.generateJwt(user);
                res.status(200);
                res.json({token : token});
            }
        })
    // passport.authenticate('local', function (err, user, info){
    //   var token;
    //   if (err) {
    //     res.status(401).json({message:'Error'});
    //     return;
    //   }
    //   if(user){
        
    //     //Comprobar active user - time
    //   } 
    //   else {
    //     res.status(401).json({message:'Acceso denegado. Revise sus datos'});
    //   }
    // })(req, res);
  },
  admin : function(req, res) {
    User.findOne({$and:[{email:req.query.user}, {role:"admin"}]}, function (error, datos){
        if(datos != null){
              if (!datos.validPassword(req.query.pass)) {
                res.json(null);
              }else{
                token = tokener.generateJwt(datos);
                res.status(200);
                res.json({token : token});
              }
          }else{
               res.json(null);
          }
    });
    // passport.authenticate('local', function(err, user, info){
    //   var token;
    //   if (err) {
    //     res.status(404).json(err);
    //     return;
    //   }
    //   console.log(user,info);
    //   if(user.role && user.role === 'admin'){
    //     token = tokener.generateJwt(user);
    //     res.status(200);
    //     // console.log(token);
    //     res.json({
    //       token : token
    //     });
    //   } else {
    //     res.status(401).json(info);
    //   }
    // })(req, res);
  },
  recovery : function(req,res){ 
    User.findOne(req.body).exec(function (error,user){
      if(!user){
        res.status(401).json({message:'El email '+req.body.email+' no se encuentra registrado'});
      }
      else{
        var token = crypto.randomBytes(25).toString('hex');
        var expires = Date.now() + 3600000;
        var query = {reset:token,expires:expires};

        var data2= {email: req.body.email,link: 'http://' + req.headers.host + '/activate/' + token + '\n\n'+''};
        var html_msg = Email.get("server/views/recovery.ejs",data2);
        
        user.update(query, function (error, data){
          // var mailOptions = {
          //   from    : "La Cámara sin Alma <noreply@lacamarasinalma.com>",
          //   to      : req.body.email,
          //   subject : "Recuperar contraseña",
          //   text    : "Password",
          //   html    : html_msg
          // };
          // transporter.sendMail(mailOptions, function (error, info){
          //   if(error){res.json({message:'Error al enviar el correo'}); }
          //   else{
          //     res.json({message:'Para recuperar tu contraseña revisa tu correo'});  
          //   }
          // })
        });
      }
    })
  },
  reset : function(req,res){
    User.findOne({reset:req.params.token, expires: {$gt:Date.now()}}).exec(function (error,user){
      if(!user){
        res.status(401).json({message:'Link inválido'});
      }
      else{
        res.json({message:'Nueva contraseña'});  
      }
    })
  },
   reboot : function(req,res){
    User.findOne({reset:req.params.token, expires: {$gt:Date.now()}}).exec(function (error,user){
      if(!user){
        res.status(401).json({message:'El link no es válido o há expirado'});
      }
      else{
        var salt = crypto.randomBytes(16).toString('hex');
        var hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64).toString('hex');
        var query = {salt:salt,hash:hash,reset:null,expires:null,active:true};
        user.update(query, function (error, data){
          res.status(200).json({message : 'Contraseña ingresada correctamente. Ahora puede iniciar sesión normalmente.'});
        })
      }
    });
  }
}