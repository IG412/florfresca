var express 	= require('express'),
	jwt 		= require('express-jwt'),
	token 		= require('../config/token'),
	auth		= require('../controller/auth'),
	slides		= require('../controller/slides'),
	subs		= require('../controller/subscriptions'),
	plan		= require('../controller/plans'),
	flowers		= require('../controller/flowers'),
	sizes		= require('../controller/sizes'),
	user		= require('../controller/users'),
	// upload 		= require('../controller/upload'),
	// autho 		= jwt({secret: token.TOKEN_SECRET, userProperty:'payload'}),
	router 		= express.Router();

router.route('/auth/tokens').post(auth.login);
router.route('/auth/admin/tokens').post(auth.admin);
router.route('/auth/register').post(auth.register);

router.route('/subscriptions').get(subs.all).post(subs.post);
router.route('/flowers').get(flowers.all).post(flowers.post);
router.route('/sizes').get(sizes.all).post(sizes.post);
router.route('/plans').get(plan.all).post(plan.post);

router.route('/user/:id').get(user.get).put(user.put);
// router.route('/slides').get(slides.all).post(slides.post);
// router.route('/slides/:id').get(slides.get).put(slides.put).delete(slides.delete);

module.exports 	= router;