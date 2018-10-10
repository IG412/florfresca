app.controller('EditOrderCtrl', function ($scope,$state,$filter,$stateParams,Api) {
  $scope.spinner.on();
  Api.getOrder($stateParams.id).success(function (data){
      $scope.Report = data;
      $scope.Client = data.client[0];
  		console.log($scope.Report);
      $scope.spinner.off();
    })

  $scope.filter = function (valor){
  	if(valor != undefined )
  		return  $filter('currency')(valor, '', '0').replace('Â','')
  	return valor;
  }
});