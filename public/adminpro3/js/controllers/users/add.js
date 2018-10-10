app.controller('AddUserCtrl', function ($scope,$stateParams,$window,Api) {
  
  
  $scope.create = function(user){
    $scope.spinner.on();
    user.type = 'premium';
    Api.postUser(user).success(function() {
      $scope.spinner.off(); 
      $window.location.href = '#/app/users/premium';
    })
    .error(function(error) {
      console.log('Error:' + error.message);
      alert(error.message);
      $scope.spinner.off();
    });
  };

});