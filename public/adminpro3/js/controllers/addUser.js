app.controller('AddUserCtrl', function ($scope,$rootScope,$location,db) {

	$scope.create = function(newuser){
    $scope.spinner.on();
    newuser.role = 'guest';
    if(newuser){
			db.createUsers(newuser).then(function (data){
        $scope.spinner.off();
        $location.path('/app/users');
			});
		}
  }

});