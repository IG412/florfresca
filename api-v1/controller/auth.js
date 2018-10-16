require('../model/user');
require('../model/admin');

var mongoose    = require('mongoose'),
    crypto      = require('crypto'),
    tokener     = require('../service/tokener'),
    User        = mongoose.model('users'),
    Admin       = mongoose.model('admins');
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey("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");

module.exports  = {
  register : function(req, res) {
        var user    = new User();
        console.log(req.body);
        user.correo  = req.body.correo;
        user.email  = req.body.correo;
        if(req.body.correo && req.body.pass){
          User.findOne({correo:req.body.correo}, function (e, d){
            if(!e){
              if(d){
                console.log("Ya existe")
                res.status(401).json({message:'El email '+req.body.correo+ ' ya se encuentra registrado.'});
              }else{
                  console.log("log")
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
        }else{
            res.status(400).json({message:'Error, 400 Bad Request. contactar con el grupo de soporte'}); 
        }
    },
  login : function(req, res) {
    User.findOne({correo:req.body.correo}, function (e, d){
      if(!e){
        if(d){
          if (!d.validPass(req.body.pass)) {
            res.status(401).json({message:'Los sentimos, Correo o contraseña son incorrectos'});
          }else{
            token = tokener.generateJwt(d);
            res.status(200).json({token : token, id: d._id, message:"Redireccionando..."});
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
        res.status(401).json({message:'El email '+req.body.correo+' no se encuentra registrado'});
      }
      else{
        var token = crypto.randomBytes(25).toString('hex');
        var expires = Date.now() + 3600000;
        var query = {reset:token,expires:expires};

        var data2= {email: req.body.email,link: 'http://' + req.headers.host + '/reset/' + token + '\n\n'+''};
        
        user.update(query, function (error, data){
          console.log(req.body.correo)
          const msg = {
              to: req.body.correo,
              from: 'raman@florfresca.com.co',
              subject: 'Recuperar contraseña en Florfresca',
              text: 'Password',
              html: html_recovery(data2)
          };
          sgMail.send(msg);
          res.status(201).json({message:'Para recuperar tu contraseña revisa tu correo'});  
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
    User.findOne({reset:req.body.token, expires: {$gt:Date.now()}}).exec(function (e,user){
      if(e){
        res.status(500).json({message:'Lo sentimos, Error 500 Interno del servidor contactar con soporte'});
      }else{
        if(!user){
          res.status(404).json({message:'Lo sentimos, el link no es válido o há expirado'});
        }else{
          var salt = crypto.randomBytes(16).toString('hex');
          var hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64,"sha512").toString('hex');
          var query = {salt:salt,hash:hash,reset:null,expires:null,active:true};
          user.update(query, function (error, data){
            res.status(200).json({message : 'Contraseña ingresada correctamente. Ahora puede iniciar sesión normalmente.'});
          })
        }
      }
    });
  }
}

function html_recovery (arg) {
  var html_message  = '<div style="width:90%;">';
      html_message += '<div style="background-color:#505359;color:#fff;padding:30px;text-align:center;">';
      html_message += '<h1>Tu Cuenta en Flor fresca </h1>';
      html_message += '<p><i>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis lacus vitae.</i></p>';
      html_message += '</div>';
      html_message += '<div style="background-color:#D0EAF5;padding:20px;text-align:center;padding-bottom:60px;">';
      html_message += '<h1>Recuperar contraseña</h1>';
      html_message += '<p>Para generar su nueva contraseña, <a href="'+arg.link+'" >click aqui</a>, o en el boton ubicado abajo. </p>';
      html_message += '<br>';
      html_message += '<br>';
      html_message += '<a href="'+arg.link+'" style="text-decoration: none;text-size:20px;padding:20px;border-radius:10px;background-color:#3AAEE0;color:#fff;cursor:pointer;">';
      html_message += 'Recuperar contraseña</a>';
      html_message += '</div>';
      html_message += '</div>';
      return html_message;
}