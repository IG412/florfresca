var mongoose    = require('mongoose'),
    Slides      = require('../model/slides');
module.exports  = {
  	all : function(req,res){
    	Slides.find(function (e,d){
        if(e){
          res.status(400).json({error:'501',msg:'Error interno del servidor'});
        }else{
          res.status(200).json(d);
        }
    	}).sort('position');
  	},
  	get: function(req,res){
  		Slides.findById(req.params.id, function (e,d){
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
          res.status(200).json(d);
        }
      });
  	},
  	put: function(req,res){
      Slides.update({ _id: req.params.id }, req.body , function (e, d){
              if(e){
                res.status(400).json({error:'501',msg:'Error interno del servidor'});
              }else{
                res.status(200).json(d);
              }
      });
  	},
  	delete: function(req,res){
  		Slides.findById(req.params.id).remove(function (e,d){
        if(e){
          res.status(400).json({error:'501',msg:'Error interno del servidor'});
        }else{
          if(d){
              res.status(200).json(d);
          }else{
            res.status(400).json({error:'501',msg:'Error interno del servidor'});
          }
        }
      });
  	}
};