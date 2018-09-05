var express 	= require('express'),
	jwt 		= require('express-jwt'),
	token 		= require('../config/token'),
	auth		= require('../controller/auth'),
	slides		= require('../controller/slides'),
	upload 		= require('../controller/upload'),
	// autho 		= jwt({secret: token.TOKEN_SECRET, userProperty:'payload'}),
	router 		= express.Router();

// router.route('/auth/tokens').get(auth.login);

// router.route('/slides').get(slides.all).post(slides.post);
// router.route('/slides/:id').get(slides.get).put(slides.put).delete(slides.delete);

module.exports 	= router;