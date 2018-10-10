app.controller('slidesCtrl', function ($scope,$rootScope,Upload,Cloud,Api,$uibModal,$sce) {
  
  function loadPlaces(){
    $scope.spinner.on();
    Api.getSlides().then(function (data){
      $rootScope.slides = data.data;
      $scope.spinner.off();
    }).catch(function (error) {
      
    })
    Api.getVideos().then(function (data){
      $scope.videos = data.data;
    }).catch(function (error) {
      
    })
  }

  $scope.loadVideos = function(video){
    return $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+video+"?rel=0&amp;showinfo=0");
  }

  loadPlaces();
  $scope.loadFiles = function(img){
    return Cloud.load(img);
  }
  $scope.delete = function (slideId, slideImg) {
    $rootScope.slideDelete = {id: slideId, img: slideImg};
    var modalInstance = $uibModal.open({
      templateUrl: 'tpl/modal.html',
      controller: 'slideInstanceCtrl'
    });
      modalInstance.result.then(function () {
    }, function () {
    });
  };

  $scope.cancel = function(){
    $scope.modalInstance.close();
  }
  
})

app.controller('slideInstanceCtrl', function ($scope,$rootScope,$uibModalInstance,Api,Cloud) {
    
    $scope.deleteConfirm = function() {
      $scope.spinner.on();
      if($rootScope.slideDelete.img !== "" || $rootScope.slideDelete.img === undefined ){
        Cloud.delete({
                  url: '/api/upload', //webAPI exposed to upload the file
                  data:{
                    folder:'home/', //Carpeta donde se guardará en cloudinary
                    file:$rootScope.slideDelete.img} //pass file as data, should be user ng-model
        }).then(function(){
                  Api.deleteSlide($rootScope.slideDelete.id).success(function (data) {
                    $scope.spinner.off(); 
                    $rootScope.slides = data;
                    $uibModalInstance.close();
                  }).error(function(err) {
                    console.log('Error:' + err);
                  });
        });
      }else{
          Api.deleteSlide($rootScope.slideDelete.id).success(function (data) {
            $scope.spinner.off(); 
            $rootScope.slides = data;
            $uibModalInstance.close();
          }).error(function(err) {
            console.log('Error:' + err);
          });
      }
      
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
});