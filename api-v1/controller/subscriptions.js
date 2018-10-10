var mongoose    = require('mongoose'),
    User        = mongoose.model('users');
    Subscription      = require('../model/subscription');
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey("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");

module.exports  = {
  	all : function(req,res){
    	Subscription.find(req.query).exec(function (e,d){
        if(e){
          res.status(501).json({message:'Los sentimos, Error interno del servidor'});
        }else{
          User.populate(d, {path:"cliente", select:"nombre apellido"},function(er, u){
            res.status(200).json(u);
          })
        }
      });
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
            //   from: 'raman@florfresca.com.co',
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
      Subscription.create(req.body,function (e,d){
        if(e){
          queryUsuario.exec(function (err, docs) {console.log(docs)});
          res.status(400).json({message:'Los sentimos, Error 500 interno del servidor contactar al equipo de soporte'});
        }else{
          res.status(201).json(d);
          queryUsuario.exec(function (err, docs) { });
          var htmlText = html(req.body); 
          const msg = {
              to: (req.body.cliente.correo)?req.body.cliente.correo: 'jmora@if-cs.com' ,
              from: 'raman@florfresca.com.co',
              subject: 'Tienes una subscription en Florfresca',
              text: 'Tienes una subscription',
              html: htmlText,
          };
          sgMail.send(msg);
        }
      });
  	},
  	put: function(req,res){
      Subscription.update({ _id: req.params }, req.body , function (e, d){
              if(e){
                res.status(400).json({message:'Error interno del servidor'});
              }else{
                res.status(200).json(d);
              }
      });
  	},
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
'                  <table align="center" cellpadding="0" cellspacing="0" border="0" bgcolor="#00778c" style="width:599px;max-width:599px">'+
'                    <tbody>'+
'                      <tr>'+
'                        <td width="100%" valign="middle" style="text-align:center; padding:11px 0;">'+
'                          <a href="http://lacamarasinalma.com" target="_blank" >'+
                            '<img src="http://florfresca.herokuapp.com/assets/imgs/logo.png" style="" border="0" alt="Flor Fresca" >'+
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
                         'Este mensaje está sujeto a los <a href="http:/flrofresca.herokuapp.com/legal/terms" style="text-decoration:none;color:#0f90ba" target="_blank" >términos de servicio</a> y la <a href="http:/flrofresca.herokuapp.com/legal/privacy" style="text-decoration:none;color:#0f90ba" target="_blank" >política de privacidad</a> de Flor Fresca '+
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
                                '<a style="text-decoration:none;color:#0f90ba;font-family:Benton Sans,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Tahoma,Arial,sans-serif" >admin@florfresca.com.co</a>'+
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