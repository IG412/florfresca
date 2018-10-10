app.controller('NavCtrl', function ($scope,$rootScope,$state,AuthService,$http) {
	$rootScope.spinner = {
	    active: false,
	    on: function () {
	      this.active = true;
	    },
	    off: function () {
	      this.active = false;
	    }
  	};
  	$scope.logout = function() {
    AuthService.logout();
    	$state.go('login');
  	};
  	$scope.payu = function(){
  		//$scope.spinner.on();
  		var array = {demo:'1', data:'2'}
	    $http.post('/api/payu', array)
	    .success(function(data) {
	        $scope.spinner.off(); 
	        console.log(data);
	    })
	    .error(function(data) {
	        console.log('Error:' + data);
	    });
	    
  	}
});