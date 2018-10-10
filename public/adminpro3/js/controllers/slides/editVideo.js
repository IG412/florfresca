app.controller('EditVideoCtrl', function ($scope,$state,$stateParams,Api) {
  
  $scope.spinner.on();
  
  Api.getVideo($stateParams.id).success(function (data){
    $scope.video = data;
    console.log(data);
    $scope.spinner.off();
  })

  $scope.edit = function(video, file){
    $scope.spinner.on();
        Api.putVideo(video).success(function (){
          $scope.spinner.off();
          $state.go('app.slides');
        })
  }

 
});