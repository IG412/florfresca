app.controller('UsersCtrl', function ($scope,$rootScope,$state,$modal,db) {

  $rootScope.loadUsers = function(){
    $scope.spinner.on()
    db.readUsers().then(function (data){ 
      $rootScope.users = data.data;
      $scope.spinner.off();
    }) 
  }
    
  $scope.edit = function(user){
		$rootScope.user = user;
		$state.go('app.editUser');
	}
  $scope.delete = function(user){
    $rootScope.userDelete = user;
    var modalInstance = $modal.open({
      templateUrl: 'tpl/modal.html',
      controller: 'UserInstanceCtrl'
    });
    modalInstance.result.then(function (user) {
    }, function () {
    });
  }
  $rootScope.users = null;
  $rootScope.loadUsers(); 

})

app.controller('UserInstanceCtrl', function ($scope,$rootScope,$modalInstance,db) {
    
  $scope.deleteConfirm = function () {
    $modalInstance.close();
    $scope.spinner.on();
    db.deleteUsers($rootScope.userDelete).then(function(){
      $rootScope.loadUsers();
    });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});