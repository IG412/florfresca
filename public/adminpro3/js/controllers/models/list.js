app.controller('ModelsCtrl', function ($scope,$rootScope,$timeout,$filter,$uibModal,Api) {
  $scope.spinner.on();
  function loadCars(){
      Api.getModels().success(function (data) {
        $rootScope.Models = data;
        $scope.spinner.off();
      })
  }
  loadCars();

  $scope.delete = function (Id) {
    $rootScope.ModelId = Id;
    var modalInstance = $uibModal.open({
      templateUrl: 'tpl/modal.html',
      controller: 'ModelsInstanceCtrl'
    });
      modalInstance.result.then(function () {
    }, function () {
    });
  };

  $scope.cancel = function(){
    $scope.modalInstance.close();
  }
  
})

app.controller('ModelsInstanceCtrl', function ($scope,$rootScope,$uibModalInstance,Api) {
    
    $scope.deleteConfirm = function() {
      $scope.spinner.on();
      Api.deleteModel($rootScope.ModelId).success(function(data) {
          $scope.spinner.off();
          $rootScope.Models = data;
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