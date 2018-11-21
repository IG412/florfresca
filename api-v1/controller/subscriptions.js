var mongoose    = require('mongoose'),
    User        = mongoose.model('users');
    Plan        = require('../model/plan'),
    Subscription      = require('../model/subscription');
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey("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");

module.exports  = {
  	all : function(req,res){
      req.query = {estado:{$ne:'eliminado'}};
    	Subscription.find(req.query, function (e,d){
        if(e){
          res.status(501).json({message:'Los sentimos, Error interno del servidor'});
        }else{
          User.populate(d, {path:"cliente", select:"nombre apellido"},function(er, u){
            res.status(200).json(u);
          })
        }
      }).sort("-f_creacion");
  	},
  	get: function(req,res){
  		Subscription.findById(req.params.id, function (e,d){
        if(e){
          res.status(400).json({message:'Error interno del servidor'});
        }else{
          User.populate(d, {path:"cliente", select:"nombre apellido correo telefono celular documento tipo_doc"},function(er, u){
            res.status(200).json(u);
            // var htmlText = html(u); 
            // const msg = {
            //   to: (u.cliente.correo)?u.cliente.correo: 'jmora@if-cs.com' ,
            //   from: 'florfresca@florfresca.com.co',
            //   subject: 'Tienes una subscription en Florfresca',
            //   text: 'Tienes una subscription',
            //   html: htmlText,
            // }
            // sgMail.send(msg);
          });          
        }
    	});
  	},
  	post: function(req,res){
      var queryUsuario = User.update({ _id: req.body.cliente._id }, req.body.cliente);
      var queryPlan = Plan.update({ _id: req.body.plan._id }, req.body.plan);
      Subscription.create(req.body,function (e,d){
        if(e){
          queryUsuario.exec(function (err, docs) {console.log(docs)});
          res.status(400).json({message:'Los sentimos, Error 500 interno del servidor contactar al equipo de soporte'});
        }else{
          queryUsuario.exec(function (err, docs) {console.log('actualizado usuario')});
          queryPlan.exec(function (err, docs) { console.log('actualizado plan')});
          var htmlText = html(req.body); 
          const msg = {
              to: (req.body.cliente.correo)?req.body.cliente.correo: 'jmora@if-cs.com' ,
              from: 'florfresca@florfresca.com.co',
              subject: 'Tienes una subscription en Florfresca',
              text: 'Tienes una subscription',
              html: htmlText,
          };
          sgMail.send(msg);
          res.status(201).json(d);
        }
      });
  	},
  	put: function(req,res){
      Subscription.findByIdAndUpdate(req.params.id, req.body , function (e, d){
        if(e){
          res.status(400).json({message:'Error interno del servidor'});
        }else{
          res.status(200).json(d);
        }
      });
  	},
    send: function(req,res){
      User.findById(req.body.cliente ,function (e,d){
        var htmlText = sendHtml(); 
        const msg = {
                to: d.correo,
                from: 'florfresca@florfresca.com.co',
                subject: 'Tienes una subscription en Florfresca',
                text: 'Tienes una subscription',
              html: htmlText,
        };
            sgMail.send(msg);
            res.status(201).json({message:"El correo fue enviado exitosamente"});
      })
    }
  	// delete: function(req,res){
  	// 	Subscription.findById("5a80c8b66b35a0040058253e").remove(function (e,d){
   //      if(e){
   //        res.status(400).json({message:'Error interno del servidor'});
   //      }else{
   //        if(d){
   //          res.status(200).json(d);
   //        }else{
   //          res.status(404).json({message:'Error No hay un recurso'});
   //        }
   //      }
   //    });
  	// }
};
function sendHtml(){
  var html = '<div style="font-size:16px;background-color:#f;margin:0;gin:0;pad;fon;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;-serif;line-height:1.5;height:100%!important;width:100%!important;"><table bgcolor="#fdfdfd" style="box-sizing:border-box;border-spacing:0;width:100%;background-color:#fdfdfd;border-collapse:separate!important;" width="100%"><tbody><tr><td style="box-sizing:border-box;padding:0;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top">&nbsp;</td><td  style="box-sizing:border-box;padding:0;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;display:block;width:600px;max-width:600px;margin:0 auto!important" valign="top" width="600"><div  style="box-sizing:border-box;display:block;max-width:600px;margin:0 auto;padding:10px"><span  style="color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;width:0">Confirme tu dirección de correo electrónico.</span><div style="box-sizing:border-box;width:100%;margin-bottom:30px;margin-top:15px"><table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%"><tbody><tr><td align="left"  style="box-sizing:border-box;padding:0;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;text-align:left" valign="top"><span ><a href="https://florfresca.com.co/" style="box-sizing:border-box;color:#348eda;font-weight:400;text-decoration:none" target="_blank"  style="max-width:100%;border-style:none;width:175px;height:99px" ><img alt="SendGrid" src="https://florfresca.com.co/assets/imgs/logo.png" style="max-width:100%;border-style:none;width:175px;height:99px" ></a></span></td></tr></tbody></table></div><div style="box-sizing:border-box;width:100%;margin-bottom:30px;background:#ffffff;border:1px solid #f0f0f0"><table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%"><tbody><tr><td  style="box-sizing:border-box;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding:30px" valign="top"><table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%"><tbody><tr><td style="box-sizing:border-box;padding:0;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top"><h2 style="margin:0;margin-bottom:30px;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-weight:300;line-height:1.5;font-size:24px;color:#294661!important">¡Felicitaciones te ha llegado el pedido!<br></h2><p style="margin:0;margin-bottom:30px;color:#294661;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;font-weight:300">Gracias por tu suscripción en Flor fresca, Puedes revisar el estado de tus pedido.</p></td></tr><tr><td style="box-sizing:border-box;padding:0;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top"><table cellpadding="0" cellspacing="0"  style="box-sizing:border-box;border-spacing:0;width:100%;border-collapse:separate!important" width="100%"><tbody><tr><td align="center" style="box-sizing:border-box;padding:0;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding-bottom:15px" valign="top"><table cellpadding="0" cellspacing="0" style="box-sizing:border-box;border-spacing:0;width:auto;border-collapse:separate!important"><tbody><tr><td align="center" bgcolor="#348eda" style="box-sizing:border-box;padding:0;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;background-color:#348eda;border-radius:2px;text-align:center" valign="top"><a href="http://www.florfresca.com.co/login" style="box-sizing:border-box;border-color:#348eda;font-weight:400;text-decoration:none;display:inline-block;margin:0;color:#ffffff;background-color:#348eda;border:solid 1px #348eda;border-radius:2px;font-size:14px;padding:12px 45px" target="_blank">ir a flor fresca</a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></div><div style="box-sizing:border-box;clear:both;width:100%"><table style="box-sizing:border-box;width:100%;border-spacing:0;font-size:12px;border-collapse:separate!important" width="100%"><tbody><tr><td style="font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif;padding:24px 0;text-align:center" ><div style="color:#666666;font-weight:400;font-size:13px;line-height:18px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif;font-weight:300;padding-bottom:6px"><a style="text-decoration:none;color:#0f90ba;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif" href="http:/flrofresca.herokuapp.com/" target="_blank" >Flor Fresca</a></div><div style="color:#666666;font-weight:400;font-size:13px;line-height:18px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif;font-weight:300;padding-bottom:6px;"><span>Este mensaje de correo electrónico se envió desde: <a style="text-decoration:none;color:#0f90ba;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif" >florfresca@florfresca.com.co</a></span></div><div style="color:#666666;font-weight:400;font-size:13px;line-height:18px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif;font-weight:300">Copyright © 2018 | Flor Fresca. Todos los derechos reservados.</div></td></tr></tbody></table></div></div></td><td style="box-sizing:border-box;padding:0;font-family:Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top">&nbsp;</td></tr></tbody></table></div>';
  return html;
}
function html(arg) {
  var h = '<div border="1" cellpadding="0" padding-top:20px; cellspacing="0" height="100%" width="100%" bgcolor="#F7F7F7" style="margin:0;border-color:green;">'+
'  <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" bgcolor="#F7F7F7">'+
 '  <tbody>'+
'      <tr>'+
'        <td>'+
'          <table align="center" cellpadding="0" cellspacing="0" border="0" bgcolor="#fafafa" style="width:599px;max-width:599px">'+
'            <tbody>'+
'              <tr>'+
'                <td>'+
'                  <table align="left" cellpadding="0" cellspacing="0" border="0" style="width:599px;max-width:599px">'+
'                    <tbody>'+
'                      <tr>'+
'                        <td width="100%" valign="middle" style="text-align:center; padding:11px 0;">'+
'                          <a href="http://lacamarasinalma.com" target="_blank" >'+
                            '<img src="http://florfresca.com.co/assets/imgs/logo.png" style="" border="0" alt="Flor Fresca" >'+
                          '</a>'+
                        '</td>'+
                        '<td width="66%" valign="middle" style="font-family:Helvetica Neue,Helvetica,Arial,sans-serif;text-align:right;padding-top:12px;vertical-align:middle">'+
                        '</td>'+
                      '</tr>'+
                    '</tbody>'+
                  '</table>'+
                '</td>'+
              '</tr>'+
              '<tr>'+
                '<td colspan="2" style="background:#fff;border-radius:8px">'+
                  '<table border="0" cellpadding="0" cellspacing="0" width="100%">'+
                    '<tbody>'+
                      '<tr>'+
                        '<td style="font-family:Helvetica neue,Helvetica,Arial,sans-serif;padding:32px 40px;border-radius:6px 6px 0 0" align="">'+  
                          '<h1 style="color:#404040;font-weight:300;margin:0 0 12px 0;font-size:24px;line-height:30px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica neue,Helvetica,Tahoma,Arial,sans-serif">'+
                            '¡Su suscripción se ha realizado con éxito!'+
                          '</h1>'+  
                        '</td>'+
                      '</tr>'+
                      '<tr>'+
                        '<td style="padding:0 40px">'+        
                          '<table cellspacing="0" cellpadding="0" width="100%" style="width:100%;min-width:100%">'+
                            '<tbody>'+
                              '<tr>'+
                                '<td style="background-color:#dedede;width:100%;min-width:100%;font-size:1px;height:1px;line-height:1px">&nbsp;'+
                                '</td>'+
                              '</tr>'+
                            '</tbody>'+
                          '</table>'+
                        '</td>'+
                      '</tr>'+
                      '<tr>'+
                        '<td style="font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica neue,Helvetica,Tahoma,Arial,sans-serif;padding:32px 40px;border-radius:6px 6px 0 0" align="">'+
                          '<h2 style="color:#404040;font-weight:300;margin:0 0 12px 0;font-size:24px;line-height:30px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica neue,Helvetica,Tahoma,Arial,sans-serif">'+
                            'Estimado Cliente <strong style"color:black;">'+arg.cliente.nombre+'</strong>, El resumen de la transacción'+
                          '</h2>'+
                        '</td>'+
                      '</tr>'+
                      '<!-- tabla de datos -->'+
                      '<tr>'+
                        '<td style="font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica neue,Helvetica,Tahoma,Arial,sans-serif;padding:32px 40px;background-color:#ededed">'+
                          '<!--Inicio ticket-->'+
                          '<table cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-bottom:12px">'+
                            '<tbody>'+
                              '<tr>'+
                                '<td style="border-bottom:1px dashed #d3d3d3">'+
                                  '<h2 style="color:#404040;font-weight:300;margin:0 0 12px 0;font-size:24px;line-height:30px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica neue,Helvetica,Tahoma,Arial,sans-serif">'+
                                    'Resumen'+
                                  '</h2>'+
                                  '<p>ESTE ES EL MONTO QUE SE DEBITARA DE TU TARJETA DE CREDITO MENSUALMENTE*</p>'+
                                '</td>'+
                                '<td colspan="2" style="text-align:right;border-bottom:1px dashed #d3d3d3">'+
                                  '<div style="color:#666666;font-weight:400;font-size:13px;line-height:18px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica neue,Helvetica,Tahoma,Arial,sans-serif">'+
                                  '</div>'+
                                '</td>'+
                              '</tr>'+
                              '<tr>'+
                                '<td colspan="3">'+                   
                                  '<p style="color:#666666;font-weight:400;font-size:15px;line-height:21px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica neue,Helvetica,Tahoma,Arial,sans-serif;margin-bottom:18px">'+
                                    '&nbsp;'+
                                  '</p>'+
                                  '<table cellpadding="0" cellspacing="0" border="0" style="width:100%">'+
                                    '<tbody>'+
                                      '<tr>'+
                                        '<td style="padding:12px 0;padding-right:3px">'+
                                          '<div style="color:#666666;font-weight:400;font-size:15px;line-height:21px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica neue,Helvetica,Tahoma,Arial,sans-serif">'+
                                            'PLAN     '+
                                          '</div>'+
                                        '</td>'+
                                        '<td style="padding:12px 0;padding-right:3px">'+                                    
                                          '<div style="color:#666666;font-weight:400;font-size:15px;line-height:21px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica neue,Helvetica,Tahoma,Arial,sans-serif">'+    
                                            ' '+arg.plan.flor+' - '+arg.plan.tamano+' - '+arg.plan.periodo+                        
                                          '</div>'+
                                        '</td>'+                                
                                      '</tr>'+
                                      '<tr>'+
                                        '<td style="padding:12px 0;padding-right:3px">'+
                                          '<div style="color:#666666;font-weight:400;font-size:15px;line-height:21px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica neue,Helvetica,Tahoma,Arial,sans-serif">'+
                                            'CODIGO PLAN:   '+   
                                          '</div>'+
                                        '</td>'+
                                        '<td style="padding:12px 0;padding-right:3px">'+                                    
                                          '<div style="color:#666666;font-weight:400;font-size:15px;line-height:21px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica neue,Helvetica,Tahoma,Arial,sans-serif">'+    
                                           ' '+arg.plan._id+                                
                                          '</div>'+
                                        '</td>'+                                
                                      '</tr>'+
                                      '<tr>'+
                                        '<td style="padding:12px 0;padding-right:3px">'+
                                          '<div style="color:#666666;font-weight:400;font-size:15px;line-height:21px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica neue,Helvetica,Tahoma,Arial,sans-serif">'+
                                            'TRANSACCIÓN '+     
                                          '</div>'+
                                        '</td>'+
                                        '<td style="padding:12px 0;padding-right:3px">'+                                    
                                          '<div style="color:#666666;font-weight:400;font-size:15px;line-height:21px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica neue,Helvetica,Tahoma,Arial,sans-serif">'+    
                                            ' '+arg.payuId+                                
                                          '</div>'+
                                        '</td>'+                                
                                      '</tr>'+
                                      '<tr>'+
                                        '<td style="padding:12px 0;padding-right:3px">'+
                                          '<div style="color:#666666;font-weight:400;font-size:15px;line-height:21px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica neue,Helvetica,Tahoma,Arial,sans-serif">'+
                                            'PRECIO'+      
                                          '</div>'+
                                        '</td>'+
                                        '<td style="padding:12px 0;padding-right:3px">'+                                    
                                          '<div style="color:#666666;font-weight:400;font-size:15px;line-height:21px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica neue,Helvetica,Tahoma,Arial,sans-serif">'+    
                                            ' '+arg.plan.precio+                                
                                          '</div>'+
                                        '</td>'+                                
                                      '</tr>'+
                                      '<tr>'+
                                        '<td style="padding:12px 0;padding-right:3px">'+
                                          '<div style="color:#666666;font-weight:400;font-size:15px;line-height:21px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica neue,Helvetica,Tahoma,Arial,sans-serif">'+
                                            'FECHA DE ENTREGA'+     
                                          '</div>'+
                                        '</td>'+
                                        '<td style="padding:12px 0;padding-right:3px">'+                                    
                                          '<div style="color:#666666;font-weight:400;font-size:15px;line-height:21px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica neue,Helvetica,Tahoma,Arial,sans-serif">'+    
                                            ' '+arg.f_entrega+                                
                                          '</div>'+
                                        '</td>'+                                
                                      '</tr>'+
                                      '<tr>'+
                                        '<td style="padding:12px 0;padding-right:3px">'+
                                          '<div style="color:#666666;font-weight:400;font-size:15px;line-height:21px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica neue,Helvetica,Tahoma,Arial,sans-serif">'+
                                            'SUSCRIPTOR '+     
                                          '</div>'+
                                        '</td>'+
                                        '<td style="padding:12px 0;padding-right:3px">'+                                    
                                          '<div style="color:#666666;font-weight:400;font-size:15px;line-height:21px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica neue,Helvetica,Tahoma,Arial,sans-serif">'+    
                                            ' '+arg.suscriptor.nombre+                                
                                          '</div>'+
                                        '</td>'+                                
                                      '</tr>'+
                                      '<tr>'+
                                        '<td style="padding:12px 0;padding-right:3px">'+
                                          '<div style="color:#666666;font-weight:400;font-size:15px;line-height:21px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica neue,Helvetica,Tahoma,Arial,sans-serif">'+
                                            'CLIENTE'+      
                                          '</div>'+
                                        '</td>'+
                                        '<td style="padding:12px 0;padding-right:3px">'+                                    
                                          '<div style="color:#666666;font-weight:400;font-size:15px;line-height:21px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica neue,Helvetica,Tahoma,Arial,sans-serif">'+    
                                            ' '+arg.cliente.nombre+                                
                                          '</div>'+
                                        '</td>'+                                
                                      '</tr>'+
                                    '</tbody>'+
                                  '</table>'+
                                '</td>'+
                              '</tr>'+
                            '</tbody>'+
                          '</table>'+
                        '</td>'+
                      '</tr>'+
                    '</tbody>'+
                  '</table>'+
                '</td>'+
              '</tr>'+
              '<!-- Final tabla de datos -->'+
              '<tr>'+
                  '<td style="font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif;padding:32px 40px;background-color:#e4e5e6">'+
                      '<!--Politicas de privacidad-->'+
                      '<p style="text-align:center;color:#999;margin-bottom:0; font-size:10px;">'+
                         'Este mensaje está sujeto a los <a href="http:/flrofresca.com.co/legal/terms" style="text-decoration:none;color:#0f90ba" target="_blank" >términos de servicio</a> y la <a href="http:/flrofresca.com.co/legal/privacy" style="text-decoration:none;color:#0f90ba" target="_blank" >política de privacidad</a> de Flor Fresca '+
                     ' </p>'+
                  '</td>'+
              '</tr>'+
              '<tr>'+
                  '<td style="font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif;padding:32px 40px;border-radius:0 0 6px 6px;" >'+
                      '<div style="color:#666666;font-weight:400;font-size:11px;line-height:21px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif; text-align:center">'+
                          '*** NO RESPONDER - Este Mensaje Es Generado Automáticamente ***'+
                      '</div>'+  
                  '</td>'+
              '</tr>'+
            '</tbody>'+
          '</table>'+
          '<table align="center" cellpadding="0" cellspacing="0" border="0" style="width:599px;max-width:599px;font-family:Helvetica,Arial,sans-serif">'+
              '<tbody>'+
                '<tr>'+
                    '<td style="padding-top:24px"></td>'+
                '</tr>'+
                '<tr>'+
                    '<td style="font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif;padding:12px 20px" >'+
                    '</td>'+
                '</tr>'+
                '<tr>'+
                    '<td style="font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif;padding:24px 0;text-align:center" >'+
                        '<div style="color:#666666;font-weight:400;font-size:13px;line-height:18px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif;font-weight:300;padding-bottom:6px">'+
                            '<a style="text-decoration:none;color:#0f90ba;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif" href="http:/flrofresca.herokuapp.com/" target="_blank" >Flor Fresca</a>'+
                        '</div>'+
                        '<div style="color:#666666;font-weight:400;font-size:13px;line-height:18px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif;font-weight:300;padding-bottom:6px;">'+
                            '<span>'+
                                'Este mensaje de correo electrónico se envió desde: '+
                                '<a style="text-decoration:none;color:#0f90ba;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif" >florfresca@florfresca.com.co</a>'+
                            '</span>'+
                        '</div>'+
                        '<div style="color:#666666;font-weight:400;font-size:13px;line-height:18px;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif;font-weight:300">'+
                          'Copyright © 2018 | Flor Fresca. Todos los derechos reservados.'+
                        '</div>'+
                    '</td>'+
                '</tr>'+
              '</tbody>'+
          '</table>'+
        '</td>'+
      '</tr>'+
    '</tbody>'+
  '</table>'+
'</div>';
return h;
}