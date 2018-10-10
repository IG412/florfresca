app.controller('OrdersCtrl', function ($scope,Api) {

  function loadOwners(){
    $scope.spinner.on();
    Api.getOrders().success(function (data){
        $scope.Orders = data;
        $scope.spinner.off();
    });
  }
  $scope.change = function (Id, status){
  	Api.putOrder(Id,{status:status}).success(function (data){
  		console.log('ok');
  	});
  } 
  loadOwners();
  
})
