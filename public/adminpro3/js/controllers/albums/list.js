app.controller('AlbumsCtrl', function ($scope,$rootScope,$uibModal,$timeout,$filter,Api,Cloud) {
$scope.spinner.on();
  function loadData(){
    Api.getAlbums().success(function (data) {
      $rootScope.Albums = data;
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
  $scope.delete = function (albumId, Images, audio, audio2, cover) {
    $rootScope.AlbumDelete = {id: albumId, img: Images, audio: audio, audio_en : audio2, cover: cover};
    var modalInstance = $uibModal.open({
      templateUrl: 'tpl/modal.html',
      controller: 'AlbumInstanceCtrl'
    });
    modalInstance.result.then(function () { }, function () { });
  };

  $scope.cancel = function(){
    $scope.modalInstance.close();
  }
  
})

app.controller('AlbumInstanceCtrl', function ($scope,$rootScope,$uibModalInstance,$filter,Api,Cloud) {
    
  $scope.deleteConfirm = function() {
    $scope.spinner.on();
    $uibModalInstance.close();
    Api.deleteAlbum($rootScope.AlbumDelete.id).success(function (){
      console.log('Entro borrar');
        if($rootScope.AlbumDelete.img != undefined && $rootScope.AlbumDelete.img.length > 0){
          console.log('Entro imagenes');
           angular.forEach($rootScope.AlbumDelete.img, function(value, key){
              Cloud.delete({
                          url: '/api/upload', //webAPI exposed to upload the file
                          data:{
                            folder:'album/', //Carpeta donde se guardará en cloudinary
                            file:value.img} //pass file as data, should be user ng-model
              }).then(function(e){
                console.log(e);
              })
           });
        }
        if($rootScope.AlbumDelete.audio != undefined){
          console.log('Entro audio');
          Cloud.delete({
                        url: '/api/upload', //webAPI exposed to upload the file
                        data:{
                          folder:'audio/', //Carpeta donde se guardará en cloudinary
                          file:$rootScope.AlbumDelete.audio} //pass file as data, should be user ng-model
              }).then(function(e){
                console.log(e);
              })
        }
        if($rootScope.AlbumDelete.audio_en != undefined){
          console.log('Entro audio');
          Cloud.delete({
                        url: '/api/upload', //webAPI exposed to upload the file
                        data:{
                          folder:'audio/', //Carpeta donde se guardará en cloudinary
                          file:$rootScope.AlbumDelete.audio_en} //pass file as data, should be user ng-model
              }).then(function(e){
                console.log(e);
              })
        }
        if($rootScope.AlbumDelete.cover != undefined){
          console.log('Entro cover');
          Cloud.delete({
                        url: '/api/upload', //webAPI exposed to upload the file
                        data:{
                          folder:'portfolio/', //Carpeta donde se guardará en cloudinary
                          file:$rootScope.AlbumDelete.cover} //pass file as data, should be user ng-model
              }).then(function(e){
                console.log(e);
              })
        }
       Api.getAlbums().success(function (data){
          $rootScope.Albums = data;
          $scope.spinner.off();
        })
    }).error(function(data) {
      console.log('Error:' + data);
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});