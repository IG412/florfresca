var mongoose    = require('mongoose'),
    Slides      = require('../model/slides');

module.exports  = {
  	all : function(req,res){
    	Slides.find(req.query , function (e,d){
        if(e){
          res.status(501).json({error:'501',msg:'Error interno del servidor'});
        }else{
          res.status(200).json(d);
        }
    	}).sort(req.query);
  	},
  	get: function(req,res){
  		Slides.findById(req.params.id,{ position:1}, function (e,d){
        if(e){
          res.status(400).json({error:'501',msg:'Error interno del servidor'});
        }else{
          res.status(200).json(d);
        }
    	});
  	},
  	post: function(req,res){
      Slides.create(req.body,function (e,d){
        if(e){
          res.status(400).json({error:'501',msg:'Error interno del servidor'});
        }else{
          res.status(201).json(d);
        }
      });
  	},
  	put: function(req,res){
      Slides.update({ _id: req.params }, req.body , function (e, d){
              if(e){
                res.status(400).json({error:'501',msg:'Error interno del servidor'});
              }else{
                res.status(200).json(d);
              }
      });
  	},
  	delete: function(req,res){
  		Slides.findById("5a80c8b66b35a0040058253e").remove(function (e,d){
        if(e){
          res.status(400).json({error:'501',msg:'Error interno del servidor'});
        }else{
          if(d){
            res.status(200).json(d);
          }else{
            res.status(404).json({error:'501',msg:'Error No hay un recurso'});
          }
        }
      });
  	}
};