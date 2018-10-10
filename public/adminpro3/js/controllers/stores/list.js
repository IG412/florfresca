app.controller('StoresCtrl', function ($scope,$state,$rootScope,$uibModal,Api,Cloud) {

  function loadStore(){
    $scope.spinner.on();
    Api.getStores().success(function (data) {
        $rootScope.Stores = data;
        $scope.spinner.off();
      })
      .error(function(data) {
        console.log('Error:' + data);
    });
  }
  loadStore();

  $scope.loadFiles = function(img){
    return Cloud.load(img);
  }
  $scope.delete = function (storeId,storeImg) {
    $rootScope.storeDelete = {id: storeId, img: storeImg};
    var modalInstance = $uibModal.open({
      templateUrl: 'tpl/modal.html',
      controller: 'storeInstanceCtrl'
    });
      modalInstance.result.then(function () {
    }, function () {
    });
  };

  $scope.cancel = function(){
    $scope.modalInstance.close();
  }
  
})

app.controller('storeInstanceCtrl', function ($scope,$rootScope,$uibModalInstance,Api,Cloud) {
    
    $scope.deleteConfirm = function() {
      $scope.spinner.on();
      if($rootScope.storeDelete.img !== "" || $rootScope.storeDelete.img === undefined ){
        Cloud.delete({
                  url: '/api/upload', //webAPI exposed to upload the file
                  data:{
                    folder:'store/', //Carpeta donde se guardará en cloudinary
                    file:$rootScope.storeDelete.img} //pass file as data, should be user ng-model
        }).then(function(){
            Api.deleteStore($rootScope.storeDelete.id).success(function (data) {
              $scope.spinner.off(); 
              $rootScope.Stores = data;
              $uibModalInstance.close();
            }).error(function(err) {
              console.log('Error:' + err);
            });
        });
      }else{
          Api.deleteStore($rootScope.storeDelete.id).success(function (data) {
            $scope.spinner.off(); 
            $rootScope.Stores = data;
            $uibModalInstance.close();
          })
          .error(function(err) {
            console.log('Error:' + err);
          });
      }
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
});