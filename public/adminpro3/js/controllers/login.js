'use strict';

angular.module('app')
.controller('LoginCtrl', function ($scope,$state,$http,AuthService) {

	$scope.spinner = {
	    active: false,
	    on: function () {
	      this.active = true;
	    },
	    off: function () {
	      this.active = false;
	    }
  	};

  	$scope.login= function(user){
		$scope.spinner.on()
		AuthService.login(user.username, user.password).then(function (authenticated) {
			console.log(authenticated)
      		$scope.spinner.off();
      		$state.go('app.home');
      		$scope.setCurrentUsername(user.username);
    	}, function (err) {
      		$scope.authError = true;
      		$scope.errormsj = 'Revise sus datos';
      		$scope.spinner.off();
    	});
	}
});
