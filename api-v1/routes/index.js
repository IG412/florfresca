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
router.route('/auth/recovery').post(auth.recovery);
router.route('/auth/reboot').post(auth.reboot);
router.route('/auth/activate').post(auth.activate);

router.route('/subscriptions').get(subs.all).post(subs.post);
router.route('/subscription/:id').get(subs.get).put(subs.put);
router.route('/flowers').get(flowers.all).post(flowers.post);
router.route('/flower/:id').get(flowers.get).put(flowers.put);
router.route('/sizes').get(sizes.all).post(sizes.post);
router.route('/size/:id').get(sizes.get).put(sizes.put);
router.route('/plans').get(plan.all).post(plan.post);
router.route('/plan/:id').get(plan.get).put(plan.put);

router.route('/users').get(user.all).post(user.post);
router.route('/user/:id').get(user.get).put(user.put);
router.route('/user/:id/creditCards').get(user.cards);
router.route('/user/:id/subscriptions').get(user.subscriptions);
router.route('/subscriptions/send').post(subs.send);
// router.route('/user/:id/subscription/:oid').get(user.subscription).delete(user.deleteSubscription);
// router.route('/slides').get(slides.all).post(slides.post);/rest/v4.9/customers/{customerID}/creditCards
// router.route('/slides/:id').get(slides.get).put(slides.put).delete(slides.delete);

module.exports 	= router;