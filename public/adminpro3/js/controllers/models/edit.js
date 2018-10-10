app.controller('EditModelCtrl', function ($scope,$state,$stateParams,$timeout,Api) {
  
  $scope.spinner.on();
  Api.getModel($stateParams.id).success(function (data) {
    console.log(data);
    $scope.Model = data;
    $scope.spinner.off();  
  })
  .error(function(data) {
    console.log('Error:' + data);
  });
  

  $scope.edit = function(passenger){
    $scope.spinner.on();
    Api.putPassenger(passenger)
    .success(function (data) {
      $scope.spinner.off(); 
      $state.go('app.passengers');  
    })
    .error(function(data) {
      console.log('Error:' + data);
    });
  };



});