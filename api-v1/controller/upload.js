var request = require('request');

var Cloud = {url: "http://cloud.if-cs.com/104/files/" , api_key: "3K0H@NA+PHP_7hE"};

var timestamp = (new Date()).valueOf().toString();
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4()+s4();
}

module.exports = {
	post : function(req,res){
    var name = timestamp+'-'+guid();
    var query ='{"img":"'+req.body.img+'", "name":"'+name+'", "folder":"'+req.body.folder+'"}';
    if(req.body.oldFile != null || req.body.oldFile != undefined){
      img = '{"img":"'+req.body.oldFile+'", "folder":"'+req.body.folder+'"}';
      request.delete({
          headers: {'content-type' : 'application/json','key':Cloud.api_key},
          url:     Cloud.url,
          body:    img
        }, function(error, response, body){
          if(error){
            res.status(400).json({code:"Error", message:error});
          }else{
            request.post({
              headers: {'content-type' : 'application/json','key':Cloud.api_key},
              url:     Cloud.url,
              body:    query
            }, function(error, response, body){
              if(error){
                 res.status(400).json({code:"Error", message:error});
              }else{
                (body)? res.status(200).json(JSON.parse(body)) : res.status(400).json({code:"Error",message:'Error en servidor'});
              }
            });   
          }
        });
    }else{
      request.post({
        headers: {'content-type' : 'application/json','key':Cloud.api_key},
        url:     Cloud.url,
        body:    query
      }, function(error, response, body){
        if(error){
           res.status(400).json({code:"Error", message:error});
        }else{
          (body)? res.status(200).json(JSON.parse(body)) : res.status(400).json({code:"Error",message:'Error en servidor'});
        }
      });
    }
  },
  delete : function(req,res){
    img = '{"img":"'+req.query.img+'", "folder":"'+req.query.folder+'"}';
    request.delete({
          headers: {'content-type' : 'application/json','key':Cloud.api_key},
          url:     Cloud.url,
          body:    img
        }, function(error, response, body){
              if(error){
                 res.status(400).json({code:"Error", message:error});
              }else{
                (body)? res.status(200).json({code:"Success",message:'Imagen Borrada'}) : res.status(400).json({code:"Error",message:'Error en servidor'});
              }
    });
  }
};