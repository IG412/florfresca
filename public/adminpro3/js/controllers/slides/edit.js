app.controller('EditSlideCtrl', function ($scope,$state,Upload,Cloud,$stateParams,Api) {
  
  $scope.spinner.on();
  
  Api.getSlide($stateParams.id).success(function (data){
    $scope.slide = data;
    $scope.spinner.off();
  })
  $scope.loadFiles = function(img){
    return Cloud.load(img);
  }
  
  $scope.edit = function(slide, file){
    $scope.spinner.on();
    if( file != null || file != undefined){
              Cloud.upload({
                  url: '/api/upload', 
                  data:{
                    folder:'home/', 
                    oldFile: slide.img,
                    file:file} 
              })
              .then(function (resp) { 
                slide.img = resp.data.message;
                Api.putSlide(slide).success(function (){
                  $scope.spinner.off();
                  $state.go('app.slides');
                })    
              });
      }else{
        Api.putSlide(slide).success(function (){
          $scope.spinner.off();
          $state.go('app.slides');
        }) 
      }
    
  }

 
});