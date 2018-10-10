app.controller('AddStoreCtrl', function ($scope,$state,Cloud,Api) {

  $scope.create = function(store,file){
    $scope.spinner.on();
    if( file != null || file != undefined){
              Cloud.upload({
                  url: '/api/upload', 
                  data:{
                    folder:'store/', 
                    oldFile: store.img,
                    file:file} 
              })
              .then(function (resp) { 
                store.img = resp.data.message;
                Api.postStore(store).success(function (data){
                  $scope.spinner.off(); 
                  $state.go('app.stores');
                })
                .error(function(data) {
                  alert(data.message);
                  $scope.spinner.off(); 
                });   
              });
      }else{
        Api.postStore(store).success(function (data){
          $scope.spinner.off(); 
          $state.go('app.stores');
        })
        .error(function(data) {
          alert(data.message);
          $scope.spinner.off(); 
        }); 
      }
  };
});