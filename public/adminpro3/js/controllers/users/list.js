app.controller('usersCtrl', function ($scope,$stateParams,$rootScope,$uibModal,$http,Api) {

  function loadUsers(){

    $scope.spinner.on();
    Api.getUsers().success(function (users){
      $rootScope.users = users;
      $scope.spinner.off();
    })
  }
  loadUsers();
  $scope.bond = function (Id,type){
    $scope.spinner.on();
    console.log(type)
    Api.putUser(Id,{type:type}).success(function (users){
      $scope.spinner.off();
      $rootScope.users = users;
    }).error(function (e){
      $scope.spinner.off();
      $scope.Error = e.message;
    });
  }
  $scope.delete = function (userId) {
    $rootScope.userDelete = userId;
    var modalInstance = $uibModal.open({
      templateUrl: 'tpl/modal.html',
      controller: 'UserInstanceCtrl'
    });
      modalInstance.result.then(function () {
    }, function () {
    });
  };

  $scope.cancel = function(){
    $scope.modalInstance.close();
  }
  
})

app.controller('UserInstanceCtrl', function ($scope,$rootScope,$uibModalInstance,Api) {
    
    $scope.deleteConfirm = function() {
      $scope.spinner.on();
      console.log($rootScope.userDelete);
      Api.deleteUser($rootScope.userDelete).success(function(data) {
          $scope.spinner.off(); 
          $rootScope.users = data;
          $uibModalInstance.close();
      })
      .error(function(data) {
        console.log('Error:' + data);
      });
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
});