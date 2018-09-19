require('../model/user');
require('../model/admin');

var mongoose    = require('mongoose'),
    crypto      = require('crypto'),
    tokener     = require('../service/tokener'),
    User        = mongoose.model('users'),
    Admin       = mongoose.model('admins');
    // nodemailer  = require('nodemailer'),
    // Email       = require('../model/email'),

module.exports  = {
  register : function(req, res) {
        var user    = new User();
        user.correo  = req.body.correo;
        user.email  = req.body.correo;
        User.findOne({email:req.body.correo}, function (e, d){
          console.log(e)
          if(!e){
            if(d){
              res.status(401).json({message:'El email '+req.body.correo+ ' ya se encuentra registrado.'});
            }else{
                // var html_message = Email.get("server/views/auth.ejs",data);
                user.setPass(req.body.pass);
                user.save(function (e,d) {
                    if(e){
                      res.status(500).json({message:'Error, 500 insterno del servidor. contactar con el grupo de soporte'});
                    }else{
                      // res.status(201).json({message:'El usuario '+req.body.correo+ ' se ha registrado, exitosamente. Se envio un correo para confirmación'});
                      res.status(201).json({message:'El usuario '+req.body.correo+ ' se ha registrado, exitosamente.'});
                    }
                })
            }
          }else{
            res.status(500).json({message:'Error, 500 insterno del servidor. contactar con el grupo de soporte'});
          }
        })
    },
  login : function(req, res) {
    User.findOne({email:req.body.correo}, function (e, d){
      if(!e){
        if(d){
          if (!d.validPass(req.body.pass)) {
            res.status(401).json({message:'Los sentimos, Correo o contraseña son incorrectos'});
          }else{
            token = tokener.generateJwt(d);
            res.status(200).json({token : token, id: d._id});
          }
        }else{
          res.status(404).json({message:'Lo sentimos, Correo o contraseña son incorrectos'});
        }
      }else{
        res.status(500).json({message:'Error, 500 insterno del servidor. contactar con el grupo de soporte'});
      }
    })
  },
  admin : function(req, res) {
    Admin.findOne({email:req.body.correo}, function (e, d){
      if(!e){
        if(d){
          if (!d.validPass(req.body.pass)) {
            res.status(401).json({message:'Los sentimos, Correo o contraseña son incorrectos'});
          }else{
            token = tokener.generateJwt(d);
            res.status(200).json({token : token});
          }
        }else{
          res.status(404).json({message:'Lo sentimos, Correo o contraseña son incorrectos'});
        }
      }else{
        res.status(500).json({message:'Error, 500 insterno del servidor. contactar con el grupo de soporte'});
      }
    });
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
        res.status(401).json({message:'Lo sentimos el link no es válido'});
      }
      else{
        res.stats(200).json({message:'se ha actualizado la nueva contraseña'});  
      }
    })
  },
  reboot : function(req,res){
    User.findOne({reset:req.params.token, expires: {$gt:Date.now()}}).exec(function (error,user){
      if(!user){
        res.status(404).json({message:'Lo sentimos, el link no es válido o há expirado'});
      }
      else{
        // var salt = crypto.randomBytes(16).toString('hex');
        // var hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64).toString('hex');
        var query = {salt:salt,hash:hash,reset:null,expires:null,active:true};
        user.update(query, function (error, data){
          res.status(200).json({message : 'Contraseña ingresada correctamente. Ahora puede iniciar sesión normalmente.'});
        })
      }
    });
  }
}