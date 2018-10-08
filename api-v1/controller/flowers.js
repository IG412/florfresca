var mongoose    = require('mongoose'),
    Flowers      = require('../model/flower');

module.exports  = {
  	all : function(req,res){
    	Flowers.find(req.query , function (e,d){
        if(e){
          res.status(501).json({error:'501',msg:'Error interno del servidor'});
        }else{
          res.status(200).json(d);
        }
    	}).sort('-number');
  	},
  	get: function(req,res){
  		Flowers.findById(req.params.id,{ position:1}, function (e,d){
        if(e){
          res.status(400).json({error:'400',msg:'Error interno del servidor'});
        }else{
          res.status(200).json(d);
        }
    	});
  	},
  	post: function(req,res){
      res.status(401).json({error:'401',msg:'Lo sentimos, error 401 No autorizado'});
      // Flowers.create(req.body,function (e,d){
      //   if(e){
      //     res.status(400).json({error:'501',msg:'Error interno del servidor'});
      //   }else{
      //     res.status(201).json(d);
      //   }
      // });
  	},
  	put: function(req,res){
      Flowers.update({ _id: req.params }, req.body , function (e, d){
              if(e){
                res.status(400).json({error:'501',msg:'Error interno del servidor'});
              }else{
                res.status(200).json(d);
              }
      });
  	}
  	// delete: function(req,res){
  	// 	Flowers.findById("5a80c8b66b35a0040058253e").remove(function (e,d){
   //      if(e){
   //        res.status(400).json({error:'501',msg:'Error interno del servidor'});
   //      }else{
   //        if(d){
   //          res.status(200).json(d);
   //        }else{
   //          res.status(404).json({error:'501',msg:'Error No hay un recurso'});
   //        }
   //      }
   //    });
  	// }
};