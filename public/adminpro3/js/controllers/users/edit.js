app.controller('EditUserCtrl', function ($scope,$stateParams,$window,Api) {


  $scope.spinner.on();
  Api.getUser($stateParams.id).success(function (user) {  
    $scope.user = user;
    $scope.spinner.off();
  })
  .error(function(data) {
    console.log('Error:' + data);
  });
 
  $scope.edit = function(user){
    console.log(user);
    $scope.spinner.on();
    Api.putUser(user).success(function(data) {
      $scope.spinner.off();
      $window.location.href = '#/app/users/premium';
    })
    .error(function(data) {
      console.log('Error:' + data);
    });
  }

 
});