app.controller('EditStoreCtrl', function ($scope,$state,Cloud,$stateParams,Api) {

  function loadData(){
    $scope.spinner.on();
    Api.getStore($stateParams.id).success(function (data) {
        $scope.Store = data;
        $scope.spinner.off();
    })
    .error(function(data) {
      console.log('Error:' + data);
    });
  }
  
  loadData();
  $scope.loadFiles = function(img){
    return Cloud.load(img);
  }
  $scope.edit = function(store, file){
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
                Api.putStore(store).success(function (){
                  $scope.spinner.off();
                  $state.go('app.stores');
                })    
              });
      }else{
        Api.putStore(store).success(function (){
          $scope.spinner.off();
          $state.go('app.stores');
        }) 
      }
    
  }
 
});