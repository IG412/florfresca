require('../model/user');
require('../model/admin');

var mongoose    = require('mongoose'),
    crypto      = require('crypto'),
    tokener     = require('../service/tokener'),
    User        = mongoose.model('users'),
    Admin       = mongoose.model('admins');
    const sgMail = require('@sendgrid/mail');
    //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
    sgMail.setApiKey("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");

module.exports  = {
  register : function(req, res) {
        var user    = new User();
        user.correo  = req.body.correo;
        user.email  = req.body.correo;
        user.nombre = req.body.nombre;
        user.apellido= req.body.apellido;
        
        if(req.body.correo && req.body.pass){
          User.findOne({correo:req.body.correo}, function (e, d){
            if(!e){
              if(d){
                console.log("Ya existe")
                res.status(401).json({message:'El email '+req.body.correo+ ' ya se encuentra registrado.'});
              }else{
                  var t = crypto.randomBytes(25).toString('hex');
                  var expires = Date.now() + 3600000; // 1 hour
                  user.setPass(req.body.pass);
                  user.reset = t;
                  user.expires = expires;
                  user.save(function (e,d) {
                      if(e){
                        res.status(500).json({message:'Error, 500 insterno del servidor. contactar con el grupo de soporte'});
                      }else{
                        
                        var link_ = 'http://' + req.headers.host + '/activate/' + t +'';
                        const msg = {
                            to: req.body.correo,
                            from: 'florfresca@florfresca.com',
                            subject: 'Bienvenido a  Florfresca',
                            text: 'Bienvenida',
                            html: html_welcome(link_)
                        };
                        sgMail.send(msg);
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
              from: 'florfresca@florfresca.com',
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
  activate : function(req,res){
    console.log(req.body.token, Date.now());
    User.findOne({reset:req.body.token}, function (error,user){
      if(error){
        res.status(500).json({message:'Lo sentimos, Error 500 Interno del servidor contactar con soporte'});
      }else{
        if(user){
          if(Date.now() < user.expires ){
            token = tokener.generateJwt(user);
            user.reset= null;
            user.expires = null;
            user.activo = true;
            user.save(function (e,d) {
              if(e){
                console.log("error");
              }else{
                console.log("ok");
              }
            })
            res.status(200).json({token : token, id:user._id,message:'Redireccionando...'}); 
          }else{
            res.status(401).json({message:'Lo sentimos el link no es válido'});
          }
        }else{
          res.status(401).json({message:'Lo sentimos el link no es válido'});
        }
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
  var html_message  = '<div style="font-size:16px;background-color:#f;margin:0;gin:0;pad;fon;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;-serif;line-height:1.5;height:100%!important;width:100%!important;"><table bgcolor="#fdfdfd" style="box-sizing:border-box;border-spacing:0;width:100%;background-color:#fdfdfd;border-collapse:separate!important;" width="100%"><tbody><tr><td style="box-sizing:border-box;padding:0;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top">&nbsp;</td><td  style="box-sizing:border-box;padding:0;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;display:block;width:600px;max-width:600px;margin:0 auto!important" valign="top" width="600"><div  style="box-sizing:border-box;display:block;max-width:600px;margin:0 auto;padding:10px"><span  style="color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;width:0">Confirma tu dirección de correo electrónico.</span><div style="box-sizing:border-box;width:100%;margin-bottom:30px;margin-top:15px"><table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%"><tbody><tr><td align="left"  style="box-sizing:border-box;padding:0;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;text-align:left" valign="top"><span ><a href="https://florfresca.herokuapp.com/" style="box-sizing:border-box;color:#00778C;font-weight:400;text-decoration:none" target="_blank"  style="max-width:100%;border-style:none;width:175px;height:99px" ><img alt="SendGrid" src="https://florfresca.herokuapp.com/assets/imgs/logo.png" style="max-width:100%;border-style:none;width:175px;height:99px" ></a></span></td></tr></tbody></table></div><div style="box-sizing:border-box;width:100%;margin-bottom:30px;background:#ffffff;border:1px solid #f0f0f0"><table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%"><tbody><tr><td  style="box-sizing:border-box;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding:30px" valign="top"><table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%"><tbody><tr><td style="box-sizing:border-box;padding:0;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top"><h2 style="margin:0;margin-bottom:30px;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-weight:300;line-height:1.5;font-size:24px;color:#294661!important">¡Hola desde flor fresca!<br>Recuperar tu contraseña.</h2><p style="margin:0;margin-bottom:30px;color:#294661;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;font-weight:300">Para recuperar tu contraseña dar click en el boton de abajo (El link expira en 1 hora).</p></td></tr><tr><td style="box-sizing:border-box;padding:0;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top"><table cellpadding="0" cellspacing="0"  style="box-sizing:border-box;border-spacing:0;width:100%;border-collapse:separate!important" width="100%"><tbody><tr><td align="center" style="box-sizing:border-box;padding:0;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding-bottom:15px" valign="top"><table cellpadding="0" cellspacing="0" style="box-sizing:border-box;border-spacing:0;width:auto;border-collapse:separate!important"><tbody><tr><td align="center" bgcolor="#348eda" style="box-sizing:border-box;padding:0;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;background-color:#348eda;border-radius:2px;text-align:center" valign="top"><a href="'+arg.link+'" style="box-sizing:border-box;border-color:#00778C;font-weight:400;text-decoration:none;display:inline-block;margin:0;color:#ffffff;background-color:#348eda;border:solid 1px #348eda;border-radius:2px;font-size:14px;padding:12px 45px" target="_blank">Recuperar Contraseña</a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></div><div style="box-sizing:border-box;clear:both;width:100%"><table style="box-sizing:border-box;width:100%;border-spacing:0;font-size:12px;border-collapse:separate!important" width="100%"><tbody><tr><td style="font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif;padding:24px 0;text-align:center" ><div style="color:#666666;font-weight:400;font-size:13px;line-height:18px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif;font-weight:300;padding-bottom:6px"><a style="text-decoration:none;color:#0f90ba;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif" href="http:/flrofresca.herokuapp.com/" target="_blank" >Flor Fresca</a></div><div style="color:#666666;font-weight:400;font-size:13px;line-height:18px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif;font-weight:300;padding-bottom:6px;"><span>Este mensaje de correo electrónico se envió desde: <a style="text-decoration:none;color:#0f90ba;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif" >florfresca@florfresca.com.co</a></span></div><div style="color:#666666;font-weight:400;font-size:13px;line-height:18px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif;font-weight:300">Copyright © 2018 | Flor Fresca. Todos los derechos reservados.</div></td></tr></tbody></table></div></div></td><td style="box-sizing:border-box;padding:0;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top">&nbsp;</td></tr></tbody></table></div>';
  return html_message;
}
function html_welcome(link_){
  var html = '<div style="font-size:16px;background-color:#f;margin:0;gin:0;pad;fon;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;-serif;line-height:1.5;height:100%!important;width:100%!important;"><table bgcolor="#fdfdfd" style="box-sizing:border-box;border-spacing:0;width:100%;background-color:#fdfdfd;border-collapse:separate!important;" width="100%"><tbody><tr><td style="box-sizing:border-box;padding:0;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top">&nbsp;</td><td  style="box-sizing:border-box;padding:0;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;display:block;width:600px;max-width:600px;margin:0 auto!important" valign="top" width="600"><div  style="box-sizing:border-box;display:block;max-width:600px;margin:0 auto;padding:10px"><span  style="color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;width:0">Confirme tu dirección de correo electrónico.</span><div style="box-sizing:border-box;width:100%;margin-bottom:30px;margin-top:15px"><table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%"><tbody><tr><td align="left"  style="box-sizing:border-box;padding:0;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;text-align:left" valign="top"><span ><a href="https://florfresca.herokuapp.com/" style="box-sizing:border-box;color:#348eda;font-weight:400;text-decoration:none" target="_blank"  style="max-width:100%;border-style:none;width:175px;height:99px" ><img alt="SendGrid" src="https://florfresca.herokuapp.com/assets/imgs/logo.png" style="max-width:100%;border-style:none;width:175px;height:99px" ></a></span></td></tr></tbody></table></div><div style="box-sizing:border-box;width:100%;margin-bottom:30px;background:#ffffff;border:1px solid #f0f0f0"><table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%"><tbody><tr><td  style="box-sizing:border-box;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding:30px" valign="top"><table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%"><tbody><tr><td style="box-sizing:border-box;padding:0;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top"><h2 style="margin:0;margin-bottom:30px;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-weight:300;line-height:1.5;font-size:24px;color:#294661!important">¡Bienvenido a Flor fresca!<br>Estamos encantado de tenerte.</h2><p style="margin:0;margin-bottom:30px;color:#294661;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;font-weight:300">Puedes visitarnos y solicitar en el siguiente botón</p></td></tr><tr><td style="box-sizing:border-box;padding:0;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top"><table cellpadding="0" cellspacing="0"  style="box-sizing:border-box;border-spacing:0;width:100%;border-collapse:separate!important" width="100%"><tbody><tr><td align="center" style="box-sizing:border-box;padding:0;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding-bottom:15px" valign="top"><table cellpadding="0" cellspacing="0" style="box-sizing:border-box;border-spacing:0;width:auto;border-collapse:separate!important"><tbody><tr><td align="center" bgcolor="#348eda" style="box-sizing:border-box;padding:0;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;background-color:#348eda;border-radius:2px;text-align:center" valign="top"><a href="http://www.florfresca.com.co/" style="box-sizing:border-box;border-color:#348eda;font-weight:400;text-decoration:none;display:inline-block;margin:0;color:#ffffff;background-color:#348eda;border:solid 1px #348eda;border-radius:2px;font-size:14px;padding:12px 45px" target="_blank">Ir a Florefresca</a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></div><div style="box-sizing:border-box;clear:both;width:100%"><table style="box-sizing:border-box;width:100%;border-spacing:0;font-size:12px;border-collapse:separate!important" width="100%"><tbody><tr><td style="font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif;padding:24px 0;text-align:center" ><div style="color:#666666;font-weight:400;font-size:13px;line-height:18px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif;font-weight:300;padding-bottom:6px"><a style="text-decoration:none;color:#0f90ba;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif" href="http:/flrofresca.com.co/" target="_blank" >Flor Fresca</a></div><div style="color:#666666;font-weight:400;font-size:13px;line-height:18px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif;font-weight:300;padding-bottom:6px;"><span>Este mensaje de correo electrónico se envió desde: <a style="text-decoration:none;color:#0f90ba;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif" >florfresca@florfresca.com.co</a></span></div><div style="color:#666666;font-weight:400;font-size:13px;line-height:18px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif;font-weight:300">Copyright © 2018 | Flor Fresca. Todos los derechos reservados.</div></td></tr></tbody></table></div></div></td><td style="box-sizing:border-box;padding:0;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top">&nbsp;</td></tr></tbody></table></div>';
  return html;
}